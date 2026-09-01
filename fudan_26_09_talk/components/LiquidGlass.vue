<template>
  <canvas ref="cv" class="lg-canvas"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
// Liquid glass, WebGL2 tier, adapted from the liquid-glass skill template.
// Props are in aspect-corrected plane coordinates: x in [-aspect/2, aspect/2], y in [-0.5, 0.5], y up.
const props = defineProps({
  rect:   { type: Object, default: () => ({ x: -0.22, y: -0.11, hw: 0.51, hh: 0.06, r: 0.05 }) },
  circle: { type: Object, default: () => ({ x: 0.42, y: -0.05, r: 0.075, orbit: 0.10 }) },
})
const cv = ref(null)
let raf = 0, gl = null, stop = false

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`
const FRAG_BG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform vec2  uResolution;
uniform float uTime;
vec3 blob(vec2 p, vec2 c, float r, vec3 col) { float d = length(p - c); return col * smoothstep(r, 0.0, d); }
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
  float t = uTime * 0.12;
  // Light ground with the two nuclei as colour washes (plasma blue, core orange) plus a lavender third.
  vec3 col = mix(vec3(0.933, 0.949, 0.976), vec3(0.969, 0.973, 0.988), vUv.y);
  col = mix(col, vec3(0.32, 0.72, 1.00), 0.55 * smoothstep(0.62, 0.0, length(p - vec2(-0.58 + cos(t) * 0.05, 0.26 + sin(t * 0.9) * 0.04))));
  col = mix(col, vec3(1.00, 0.63, 0.16), 0.42 * smoothstep(0.55, 0.0, length(p - vec2( 0.62 + cos(t * 1.3 + 2.1) * 0.05, -0.32 + sin(t * 0.7 + 1.2) * 0.04))));
  col = mix(col, vec3(0.71, 0.55, 1.00), 0.28 * smoothstep(0.42, 0.0, length(p - vec2( 0.22 + cos(t * 0.6 + 4.0) * 0.07, 0.40))));
  col = mix(col, vec3(0.32, 0.72, 1.00), 0.22 * smoothstep(0.40, 0.0, length(p - vec2(-0.15, -0.44))));
  // Fine, faint detail so the rims have something to refract; a plain gradient makes the glass invisible.
  vec2 g = vUv * vec2(aspect, 1.0) * 120.0;
  float dots = smoothstep(0.62, 0.72, length(fract(g) - 0.5));
  col *= 1.0 - 0.035 * (1.0 - dots);
  outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`
const FRAG_GLASS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform sampler2D uBackground;
uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uRectCenter;
uniform vec2  uRectHalf;
uniform vec2  uCircleCenter;
uniform float uCircleRadius;
uniform float uRectRotation;
uniform float uCornerRadius;
uniform float uIor;
uniform float uThickness;
uniform float uBgDistance;
uniform float uBevel;
uniform float uBlur;
uniform float uDispersion;
uniform float uSpecular;
uniform float uRoughness;
uniform float uTint;
uniform float uDeform;
uniform float uMaxLod;
uniform int   uDebug;

const float PI = 3.141592653589793;

float aspectRatio() { return uResolution.x / max(uResolution.y, 1.0); }

/* uv -> aspect corrected plane. Every shape and every derivative lives
   here, otherwise a resize squashes the circle into an ellipse. */
vec2 toPlane(vec2 uv) { return (uv - 0.5) * vec2(aspectRatio(), 1.0); }
vec2 toUv(vec2 p)     { return p / vec2(aspectRatio(), 1.0) + 0.5; }

/* ---------------- chapter 02: signed distance field ---------------- */

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float valueNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), u.x),
             mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * valueNoise(p); p *= 2.02; a *= 0.5; }
  return v;
}

float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}
/* Polynomial smooth minimum. Shapes are fused in the field, never
   recovered from the rendered result. */
float smoothMin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}

float sceneSdf(vec2 p, float noiseWeight) {
  float c = cos(-uRectRotation), s = sin(-uRectRotation);
  vec2 rp = mat2(c, -s, s, c) * (p - uRectCenter);
  float dRect = sdRoundBox(rp, uRectHalf, uCornerRadius);

  vec2 cp = p - uCircleCenter;
  float dCircle = length(cp) - uCircleRadius;

  // Time continuous, never per frame random, or the rim boils.
  dRect   += (fbm(rp * 12.0 + vec2(uTime * 0.10, -uTime * 0.08)) - 0.5) * 0.009 * uDeform * noiseWeight;
  dCircle += (fbm(cp * 13.5 + vec2(-uTime * 0.09, uTime * 0.11)) - 0.5) * 0.008 * uDeform * noiseWeight;

  return smoothMin(dRect, dCircle, 0.04);
}
/* Full noise drives the silhouette. */
float glassSdf(vec2 p)        { return sceneSdf(p, 1.0); }
/* Nearly clean copy drives height and normals. Differentiating the
   noisy field is what puts a hard inner frame inside the face. */
float glassSurfaceSdf(vec2 p) { return sceneSdf(p, 0.12); }

/* ------------- chapter 03: height field and normals --------------- */

float heightAt(vec2 p) {
  float interior = max(-glassSurfaceSdf(p), 0.0);
  float bevel = max(uBevel * 0.82, 0.001);
  float t = clamp(interior / bevel, 0.0, 1.0);
  // Quintic smootherstep, then constant. Constant is the important half:
  // it makes the face genuinely flat so the centre stays readable.
  float profile = t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  return max(uThickness, 0.0) * profile;
}

vec3 surfaceNormalAt(vec2 p, out float height) {
  float e = clamp(uBevel * 0.13, 0.003, 0.012);
  height = heightAt(p);
  float hL = heightAt(p - vec2(e, 0.0));
  float hR = heightAt(p + vec2(e, 0.0));
  float hD = heightAt(p - vec2(0.0, e));
  float hU = heightAt(p + vec2(0.0, e));
  vec2 grad = vec2(hR - hL, hU - hD) / (2.0 * e);
  return normalize(vec3(-grad, 1.0));
}

/* -------------- chapter 04: two interface refraction -------------- */

vec2 traceToBackground(vec2 p, float height, vec3 n, float ior) {
  vec3 incident = vec3(0.0, 0.0, -1.0);

  vec3 inside = refract(incident, n, 1.0 / max(ior, 1.001));
  inside = dot(inside, inside) < 1e-4 ? incident : normalize(inside);

  vec3 front = vec3(p, height);
  vec3 back  = front + inside * (height / max(-inside.z, 0.025));

  vec3 exitRay = refract(inside, vec3(0.0, 0.0, 1.0), max(ior, 1.001));
  if (dot(exitRay, exitRay) < 1e-4) {
    // Total internal reflection at the back face. Reachable only at extreme
    // thickness / bevel ratios (see references/webgl-pipeline.md for the
    // threshold), and the transmitted ray genuinely does not exist, so there
    // is no correct sample. Fall back to the last valid traced point, which
    // is bounded and continuous, instead of inventing a grazing ray.
    return back.xy;
  }
  exitRay = normalize(exitRay);

  float zBackground = -max(uBgDistance, 0.001);
  float travel = max((zBackground - back.z) / min(exitRay.z, -0.001), 0.0);
  return (back + exitRay * travel).xy;
}

/* ----------------- chapter 05: three optical routes ---------------- */

vec3 sampleBg(vec2 p, float lod) {
  // Clamp to the chain that actually exists. Note this makes the blur dial
  // resolution dependent: the same uBlur is a different physical radius on a
  // 640 px and a 2560 px canvas, because a mip level is a fraction of the
  // texture, not a fixed number of pixels.
  return textureLod(uBackground, clamp(toUv(p), 0.002, 0.998),
                    clamp(lod, 0.0, max(uMaxLod, 0.0))).rgb;
}
vec3 sampleRim(vec2 p, vec2 dR, vec2 dB, float lod) {
  return vec3(sampleBg(p + dR, lod).r, sampleBg(p, lod).g, sampleBg(p + dB, lod).b);
}

/* ------------------- chapter 06: dielectric BRDF ------------------- */

float pow5(float x) { float s = x * x; return s * s * x; }
float dielectricF0(float ior) { float r = (max(ior,1.001)-1.0)/(max(ior,1.001)+1.0); return r*r; }
float ggx(float nh, float rough) {
  float a = max(rough * rough, 0.0025), a2 = a * a;
  float d = nh * nh * (a2 - 1.0) + 1.0;
  return a2 / max(PI * d * d, 1e-6);
}
float smithVisibility(float nv, float nl, float rough) {
  float a2 = pow(max(rough * rough, 0.0025), 2.0);
  float v = nl * sqrt(nv * nv * (1.0 - a2) + a2);
  float l = nv * sqrt(nl * nl * (1.0 - a2) + a2);
  return 0.5 / max(v + l, 1e-5);
}
vec3 brdf(vec3 n, vec3 v, vec3 l, vec3 radiance, float ior, float rough) {
  float nv = clamp(dot(n, v), 0.0, 1.0);
  float nl = clamp(dot(n, l), 0.0, 1.0);
  if (nv <= 1e-4 || nl <= 1e-4) return vec3(0.0);
  vec3 h = normalize(v + l);
  float f0 = dielectricF0(ior);
  vec3 fresnel = vec3(f0) + (vec3(1.0) - vec3(f0)) * pow5(1.0 - clamp(dot(v, h), 0.0, 1.0));
  return radiance * fresnel * ggx(clamp(dot(n, h), 0.0, 1.0), rough)
       * smithVisibility(nv, nl, rough) * nl;
}
vec3 environment(vec3 n, vec3 v, float ior, float rough) {
  float nv = clamp(dot(n, v), 0.0, 1.0);
  float f0 = dielectricF0(ior);
  vec3 grazing = max(vec3(1.0 - rough), vec3(f0));
  vec3 fresnel = vec3(f0) + (grazing - vec3(f0)) * pow5(1.0 - nv);
  return mix(vec3(0.20, 0.15, 0.12), vec3(0.58, 0.72, 0.82), n.y * 0.5 + 0.5) * fresnel;
}

/* ---------------------------- composite ---------------------------- */

void main() {
  vec2 p = toPlane(vUv);

  float sdf = glassSdf(p);
  float surfaceSdf = glassSurfaceSdf(p);
  float aa = max(fwidth(sdf) * 1.25, 0.0014);
  float mask = smoothstep(aa, -aa, sdf);

  float height;
  vec3 n = surfaceNormalAt(p, height);

  if (uDebug == 1) { outColor = vec4(vec3(mask), 1.0); return; }
  if (uDebug == 2) { outColor = vec4(vec3(height / max(uThickness, 1e-4)) * mask, 1.0); return; }
  if (uDebug == 3) { outColor = vec4(n * 0.5 + 0.5, 1.0); return; }
  if (uDebug == 4) { outColor = vec4(sampleBg(p, 0.0), 1.0); return; }

  float bevel = clamp(uBevel, 0.014, 0.085);
  float transition = smoothstep(0.018, 0.085, bevel);
  vec2 edgeDir = n.xy / sqrt(dot(n.xy, n.xy) + 1e-4);
  float edgeProfile = pow(clamp(length(n.xy) * 1.18, 0.0, 1.0), mix(1.7, 1.12, transition)) * mask;
  float rimBand = smoothstep(-bevel * 0.58, -bevel * 0.16, surfaceSdf)
                * (1.0 - smoothstep(-0.003, 0.007, sdf));

  // Spectral split comes from three real ray traces, not an RGB offset.
  float d = uDispersion * 0.8;
  vec2 rP = traceToBackground(p, height, n, max(uIor - d, 1.001));
  vec2 gP = traceToBackground(p, height, n, uIor);
  vec2 bP = traceToBackground(p, height, n, uIor + d);
  const float spectralGain = 10.0;
  vec2 dR = (rP - gP) * spectralGain;
  vec2 dB = (bP - gP) * spectralGain;

  // FACE: nearly flat, slight magnification about the shape centre,
  // only lightly mixed with the physical path. Readability beats purity
  // here, and users notice a smeared centre immediately.
  vec2 opticalCentre = mix(uRectCenter, uCircleCenter, 0.5);
  vec2 faceP = mix(opticalCentre + (p - opticalCentre) * 0.975, gP, 0.28 + edgeProfile * 0.16);

  float rimPush = (0.006 + max(uThickness, 0.0) * 0.62 + max(uBgDistance, 0.0) * 0.12)
                * (0.42 + edgeProfile * 0.88);
  vec2 innerP = gP - edgeDir * rimPush;          // main compression
  vec2 outerP = p + edgeDir * rimPush * 1.28;    // reverse roll, reads outside the shape

  float lod = clamp(log2(max(uBlur, 0.0) + 1.0), 0.0, 5.5);
  vec3 faceCol  = sampleBg(faceP, lod * 0.7);
  vec3 innerCol = sampleRim(innerP, dR, dB, lod * 0.2);
  vec3 outerCol = sampleRim(outerP, dR, dB, min(lod * 1.08 + 0.3, 6.0));

  float outerBias = smoothstep(-bevel * 0.3, -0.001, surfaceSdf);
  float wFace  = 1.0 - rimBand * 0.88;
  float wInner = rimBand * mix(0.68, 0.34, outerBias);
  float wOuter = rimBand * mix(0.20, 0.54, outerBias);
  float wSum = max(wFace + wInner + wOuter, 0.001);
  wFace /= wSum; wInner /= wSum; wOuter /= wSum;

  vec3 refracted = faceCol * wFace + innerCol * wInner + outerCol * wOuter;
  refracted = clamp((refracted - 0.5) * 1.075 + 0.5, 0.0, 1.0);

  // Four grazing key lights slowly orbiting the camera, slight warm to
  // cool spread, so every part of the rim catches something.
  vec3 view = vec3(0.0, 0.0, 1.0);
  float orbit = uTime * 0.085;
  vec2 axis = vec2(cos(orbit), sin(orbit));
  vec2 tangent = vec2(-axis.y, axis.x);
  float rough = clamp(uRoughness, 0.06, 0.58);
  vec3 spec =
      brdf(n, view, normalize(vec3( axis    * 0.94, 0.34)), vec3(1.00, 0.965, 0.90) * 1.65, uIor, rough)
    + brdf(n, view, normalize(vec3( tangent * 0.90, 0.42)), vec3(0.84, 0.92,  1.00) * 1.28, uIor, rough)
    + brdf(n, view, normalize(vec3(-axis    * 0.96, 0.28)), vec3(1.00, 0.88,  0.76) * 0.98, uIor, min(rough * 1.18, 0.62))
    + brdf(n, view, normalize(vec3(-tangent * 0.92, 0.38)), vec3(0.70, 0.84,  1.00) * 1.12, uIor, min(rough * 1.12, 0.62));
  vec3 highlight = vec3(1.0) - exp(-spec * max(uSpecular, 0.0) * 2.20);

  // Keep every specular lobe on the outer half of the bevel. On the flat
  // face a lobe would render as a raised inner box, the classic tell.
  float curvature = smoothstep(0.035, 0.30, edgeProfile);
  float bevelSupport = smoothstep(-bevel * 0.45, -bevel * 0.12, surfaceSdf);
  highlight *= mask * curvature * bevelSupport;
  vec3 envRefl = environment(n, view, uIor, rough) * mask * curvature * bevelSupport
               * (0.35 + 0.65 * rimBand);

  // Order matters: refraction, then tint, then bleed, then reflection,
  // then highlight. Painting a white veil first is what makes plastic.
  vec3 glass = refracted;
  glass += (vec3(1.0) - glass) * clamp(uTint, 0.0, 0.3);
  float lum = dot(outerCol, vec3(0.2126, 0.7152, 0.0722));
  glass += (vec3(1.0) - glass) * mix(vec3(lum), outerCol, 0.62) * wOuter * 0.075;
  glass += (vec3(1.0) - glass) * envRefl * 0.32;
  glass += (vec3(1.0) - glass) * highlight * 0.68;

  vec3 base = sampleBg(p, 0.0);
  float contact = smoothstep(0.045, 0.0, sdf) * smoothstep(-0.003, 0.008, sdf);
  float drop = smoothstep(0.045, -0.002, glassSdf(p - vec2(0.012, -0.016))) * (1.0 - mask);
  base *= 1.0 - contact * 0.07 - drop * 0.085;

  outColor = vec4(mix(base, glass, mask), 1.0);
}`

const params = { ior: 1.46, thickness: 0.048, bgDistance: 0.068, bevel: 0.040, blur: 7.0,
                 dispersion: 0.024, specular: 1.6, roughness: 0.34, tint: 0.10, deform: 0.18 }

onMounted(() => {
  const canvas = cv.value
  gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' })
  if (!gl) { console.warn('[LiquidGlass] WebGL2 unavailable, canvas left blank'); canvas.style.display = 'none'; return }
  const compile = (type, s) => { const sh = gl.createShader(type); gl.shaderSource(sh, s); gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh)); return sh }
  const program = (fs) => { const p = gl.createProgram(); gl.attachShader(p, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs)); gl.bindAttribLocation(p, 0, 'aPos'); gl.linkProgram(p)
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p)); return p }
  let progBg, progGlass
  try { progBg = program(FRAG_BG); progGlass = program(FRAG_GLASS) }
  catch (e) { console.error('[LiquidGlass] shader failed', e); canvas.style.display = 'none'; return }

  const vao = gl.createVertexArray(); gl.bindVertexArray(vao)
  const vbo = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
  const bgTex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, bgTex)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  const fbo = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, bgTex, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  const uni = (p, names) => Object.fromEntries(names.map(n => [n, gl.getUniformLocation(p, n)]))
  const U_BG = uni(progBg, ['uResolution', 'uTime'])
  const U_GL = uni(progGlass, ['uBackground','uResolution','uTime','uRectCenter','uRectHalf','uCircleCenter','uCircleRadius',
    'uRectRotation','uCornerRadius','uIor','uThickness','uBgDistance','uBevel','uBlur','uDispersion','uSpecular','uRoughness','uTint','uDeform','uMaxLod','uDebug'])

  let maxLod = 0, allocated = false
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const rect = canvas.getBoundingClientRect()
    const w = Math.max(1, Math.round(rect.width * dpr)), h = Math.max(1, Math.round(rect.height * dpr))
    if (allocated && w === canvas.width && h === canvas.height) return
    canvas.width = w; canvas.height = h
    gl.bindTexture(gl.TEXTURE_2D, bgTex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    maxLod = Math.floor(Math.log2(Math.max(w, h))); allocated = true
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    const st = gl.checkFramebufferStatus(gl.FRAMEBUFFER); gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    if (st !== gl.FRAMEBUFFER_COMPLETE) console.error('[LiquidGlass] framebuffer incomplete', st)
  }
  let contextLost = false
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); contextLost = true })
  canvas.addEventListener('webglcontextrestored', () => location.reload())
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let last = performance.now() / 1000, time = 0
  function frame(now) {
    if (stop) return
    raf = requestAnimationFrame(frame)
    const t = now / 1000, dt = Math.min(Math.max(t - last, 0), 1 / 15); last = t
    if (document.hidden || contextLost) return
    resize(); if (!reduced) time += dt
    const c = props.circle, r = props.rect
    const cx = c.x + Math.cos(time * 0.45) * c.orbit, cy = c.y + Math.sin(time * 0.45) * c.orbit * 0.6
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo); gl.viewport(0, 0, canvas.width, canvas.height)
    gl.useProgram(progBg); gl.uniform2f(U_BG.uResolution, canvas.width, canvas.height); gl.uniform1f(U_BG.uTime, time)
    gl.bindVertexArray(vao); gl.drawArrays(gl.TRIANGLES, 0, 3)
    gl.bindTexture(gl.TEXTURE_2D, bgTex); gl.generateMipmap(gl.TEXTURE_2D)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, canvas.width, canvas.height)
    gl.useProgram(progGlass); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, bgTex)
    gl.uniform1i(U_GL.uBackground, 0); gl.uniform2f(U_GL.uResolution, canvas.width, canvas.height); gl.uniform1f(U_GL.uTime, time)
    gl.uniform2f(U_GL.uRectCenter, r.x, r.y); gl.uniform2f(U_GL.uRectHalf, r.hw, r.hh)
    gl.uniform2f(U_GL.uCircleCenter, cx, cy); gl.uniform1f(U_GL.uCircleRadius, c.r)
    gl.uniform1f(U_GL.uRectRotation, 0.0); gl.uniform1f(U_GL.uCornerRadius, r.r)
    gl.uniform1f(U_GL.uIor, params.ior); gl.uniform1f(U_GL.uThickness, params.thickness); gl.uniform1f(U_GL.uBgDistance, params.bgDistance)
    gl.uniform1f(U_GL.uBevel, params.bevel); gl.uniform1f(U_GL.uBlur, params.blur); gl.uniform1f(U_GL.uDispersion, params.dispersion)
    gl.uniform1f(U_GL.uSpecular, params.specular); gl.uniform1f(U_GL.uRoughness, params.roughness); gl.uniform1f(U_GL.uTint, params.tint)
    gl.uniform1f(U_GL.uDeform, params.deform); gl.uniform1f(U_GL.uMaxLod, maxLod); gl.uniform1i(U_GL.uDebug, 0)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    const err = gl.getError(); if (err) console.error('[LiquidGlass] gl error', err)
  }
  resize(); raf = requestAnimationFrame(frame)
})
onBeforeUnmount(() => { stop = true; cancelAnimationFrame(raf) })
</script>

<style scoped>
.lg-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: 0; }
</style>
