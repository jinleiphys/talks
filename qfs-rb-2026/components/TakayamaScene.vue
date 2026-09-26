<script setup>
// Takayama as a light-ochre shanshui (浅绛山水) along the bottom of the cover and the thank-you slide.
// Asymmetric composition: the main peaks rise at the left edge behind an old pine on a rock, the middle stays low and
// open (the text sits above it), the right trails off into pale far ranges under a faint vermilion sun.
// Each range is a shader layer: ridged-noise crest drawn with a dry-brush line (飞白), ink bleeding downward with stroke
// texture, indigo in the far range and an ochre wash at the foot of the middle one; mist bands between the ranges.
// The Miyagawa is bare paper with ripple strokes and a small boat; Sanmachi roofs on its banks; the vermilion
// Nakabashi and the seal are the only strong colour. Slow motion: far ranges drift, mist moves, birds, boat.
import { useIsSlideActive } from '@slidev/client'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { sharedRender } from './nucleus.js'

const props = defineProps({ width: { type: Number, default: 980 }, height: { type: Number, default: 300 } })
const host = ref(null), sealOn = ref(false)
const ss = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u) }
const active = useIsSlideActive()
let canvas, raf, drawn = false

const NOISE = `
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y); }
float fbm(vec2 p){ float s = 0., a = .5; for (int i = 0; i < 5; i++){ s += a*noise(p); p *= 2.03; a *= .5; } return s; }
float ridged(float x, float seed){ float s = 0., a = .5, f = 1.;
  for (int i = 0; i < 5; i++){ float n = 1. - abs(noise(vec2(x*f + seed, seed*1.7))*2. - 1.); s += a*n*n; f *= 2.1; a *= .5; } return s; }`

const vert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`

// one mountain range; env() shapes the composition: high at the left, low in the middle, moderate at the right
const rangeFrag = `
uniform float uAspect, uSeed, uBase, uAmp, uFreq, uInk, uFade, uShift, uGapX, uGapW, uPow, uOchre, uEnvM, uEnvL, uEnvR, uReveal, uEnvC, uEnvS;
uniform vec3 uCol;
varying vec2 vUv;
${NOISE}
void main(){
  float x = vUv.x * uAspect, y = vUv.y, xn = vUv.x;
  float env = uEnvM + uEnvL * exp(-pow((xn - uEnvC) / uEnvS, 2.)) + uEnvR * exp(-pow((xn - .9) / .13, 2.));
  float h = uBase + uAmp * env * pow(min(ridged(x * uFreq + uShift, uSeed) / .9, 1.), uPow);
  if (uGapW > 0.) h *= mix(.15, 1., smoothstep(uGapW * .5, uGapW, abs(x - uGapX)));
  float d = h - y; if (d < 0.) discard;
  float w = .004 + .010 * noise(vec2(x * 5. + uSeed, 1.));                                  // brush width varies
  float dry = .45 + .55 * smoothstep(.2, .6, noise(vec2(x * 90., y * 6. + uSeed)));        // flying-white breaks
  float edge = smoothstep(w, 0., d) * dry;
  float wash = exp(-d / uFade);
  float cun = fbm(vec2(x * 18. + uShift * 18., y * 55.));                                  // texture strokes
  float dens = uInk * (.85 * edge + wash * (.3 + .7 * cun));
  float foot = smoothstep(.015, .16, d);
  vec3 col = mix(uCol, vec3(.66, .47, .30), uOchre * foot);                                // ochre wash below the crest
  dens = mix(dens, max(dens, .22 * uOchre * foot * (.6 + .4 * cun)), uOchre);
  dens *= smoothstep(-.02, .18, y);                                                       // the foot dissolves in mist
  float front = uReveal * (uAspect + .9) - .45 + .3 * (fbm(vec2(y * 5., uSeed)) - .5);      // the scroll opens left to right
  float rv = smoothstep(front, front - .4, x); if (rv <= 0.) discard;
  dens *= rv * (1. + .5 * smoothstep(.25, 0., front - x) * step(x, front));                  // wet ink darker at the front
  gl_FragColor = vec4(col, clamp(dens, 0., 1.));
}`

const mistFrag = `
uniform float uAspect, uT, uY, uW, uA;
varying vec2 vUv;
${NOISE}
void main(){
  float x = vUv.x * uAspect, y = vUv.y;
  float band = exp(-pow((y - uY) / uW, 2.));
  float m = band * uA * (.5 + .5 * fbm(vec2(x * 1.1 - uT * .025, y * 5.)));
  gl_FragColor = vec4(.961, .957, .929, clamp(m, 0., 1.));
}`

// canvas textures: a pine-needle fan (松针) and a soft disc
function needleTex() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128; const g = c.getContext('2d')
  g.strokeStyle = 'rgba(22,22,20,0.75)'; g.lineCap = 'round'
  for (let k = 0; k < 3; k++) {
    const cx = 128 + (k - 1) * 34, cy = 112 - (k % 2) * 8
    for (let i = 0; i < 26; i++) {
      const a = Math.PI * (1.08 + 0.84 * i / 25) + 0.05 * Math.sin(i * 7), L = 60 + 26 * Math.sin(i * 1.7 + k)
      g.lineWidth = 1.1 + 0.6 * ((i + k) % 3 === 0)
      g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + L * Math.cos(a), cy + L * Math.sin(a)); g.stroke()
    }
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t
}
function discTex() {
  const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d')
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.72, 'rgba(255,255,255,0.95)'); r.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = r; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c)
}

onMounted(() => {
  const W = props.width, H = props.height, dpr = Math.min(window.devicePixelRatio, 2), asp = W / H
  const px = (v) => v / H                                            // detail sizes in slide pixels
  canvas = document.createElement('canvas'); canvas.width = W * dpr; canvas.height = H * dpr
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px'; host.value.appendChild(canvas)
  const scene = new THREE.Scene()
  const cam = new THREE.OrthographicCamera(0, asp, 1, 0, -10, 10)
  const plane = new THREE.PlaneGeometry(asp, 1)
  let order = 0
  const put = (o) => { o.traverse(m => { m.renderOrder = order }); scene.add(o); return o }
  const layer = (frag, uniforms) => {
    const m = new THREE.Mesh(plane, new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms,
      transparent: true, depthWrite: false, depthTest: false }))
    m.position.set(asp / 2, 0.5, 0); m.renderOrder = order++; scene.add(m); return m.material.uniforms
  }
  const RX = asp * 0.63, RW = px(90)
  const range = (o) => layer(rangeFrag, {
    uAspect: { value: asp }, uSeed: { value: o.seed }, uBase: { value: o.base }, uAmp: { value: o.amp }, uFreq: { value: o.freq },
    uInk: { value: o.ink }, uFade: { value: o.fade }, uPow: { value: o.pow }, uShift: { value: 0 }, uOchre: { value: o.ochre || 0 },
    uGapX: { value: RX }, uGapW: { value: o.gap || 0 }, uEnvM: { value: o.env[0] }, uEnvL: { value: o.env[1] }, uEnvR: { value: o.env[2] }, uReveal: { value: 1 }, uEnvC: { value: o.envC ?? .07 }, uEnvS: { value: o.envS ?? .11 },
    uCol: { value: new THREE.Color(...o.col) } })
  const mist = (y, w, a) => layer(mistFrag, { uAspect: { value: asp }, uT: { value: 0 }, uY: { value: y }, uW: { value: w }, uA: { value: a } })
  const inkM = (o, color = 0x1e1c1a) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: o, depthTest: false, depthWrite: false })

  // a faint vermilion sun behind everything, upper right
  const sun = new THREE.Mesh(new THREE.PlaneGeometry(px(46), px(46)),
    new THREE.MeshBasicMaterial({ map: discTex(), color: 0xc9573f, transparent: true, opacity: 0.32, depthTest: false }))
  sun.position.set(asp * 0.84, 0.66, 0); put(sun); order++

  const far = range({ seed: 3.1, base: .14, amp: .95, freq: .55, ink: .34, fade: .28, pow: 2.2, env: [.22, .85, .45], col: [.34, .42, .52] })
  const m1 = mist(.26, .09, .85)
  const mid = range({ seed: 7.7, base: .07, amp: .62, freq: .95, ink: .66, fade: .16, pow: 1.8, ochre: .6, env: [.24, .72, .38], col: [.18, .19, .20] })
  const m2 = mist(.10, .06, .9)

  // Sanmachi roofs on both banks
  const roofShape = (w) => { const s = new THREE.Shape(), e = px(8), r = px(8)
    s.moveTo(-w / 2 - e, 0); s.quadraticCurveTo(-w / 2, px(2), -w / 2 + px(3), r); s.lineTo(w / 2 - px(3), r)
    s.quadraticCurveTo(w / 2, px(2), w / 2 + e, 0); s.lineTo(-w / 2 - e, 0); return s }
  const houseG = []
  const houses = [[-270, 16, .9], [-214, 13, .7], [-164, 18, .85], [-118, 12, .6], [112, 13, .8], [162, 18, .7], [214, 14, .9]]
  for (const [dx, y, sc] of houses) {
    const w = px(46 * sc), h = px(14 * sc), g = new THREE.Group(); g.position.set(RX + px(dx), px(y), 0)
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(w, h), inkM(.26)); wall.position.y = h / 2; g.add(wall)
    const roof = new THREE.Mesh(new THREE.ShapeGeometry(roofShape(w)), inkM(.85)); roof.position.y = h; roof.scale.y = sc; g.add(roof)
    put(g); houseG.push(g)
  }
  order++

  // old pine on the rock at the left: tapered leaning trunk, two branches, tiers of needle fans
  const strip = (pts, w0, w1, op) => {
    const pos = [], idx = []
    pts.forEach((p, i) => { const q = pts[Math.min(i + 1, pts.length - 1)], r = pts[Math.max(i - 1, 0)]
      const t = new THREE.Vector2(q.x - r.x, q.y - r.y).normalize(), w = (w0 + (w1 - w0) * i / (pts.length - 1)) / 2
      pos.push(p.x - t.y * w, p.y + t.x * w, 0, p.x + t.y * w, p.y - t.x * w, 0)
      if (i) idx.push(2 * i - 2, 2 * i - 1, 2 * i, 2 * i - 1, 2 * i + 1, 2 * i) })
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx)
    return new THREE.Mesh(g, inkM(op))
  }
  const bez = (a, b, c, n = 24) => new THREE.QuadraticBezierCurve(new THREE.Vector2(...a), new THREE.Vector2(...b), new THREE.Vector2(...c)).getPoints(n)
  const x0 = asp * 0.085
  const pine = new THREE.Group(), fans = []
  const trunk = bez([x0, .3], [x0 + px(40), .58], [x0 + px(18), .86]); pine.add(strip(trunk, px(8), px(2.5), .72))
  pine.add(strip(bez([x0 + px(24), .6], [x0 + px(60), .64], [x0 + px(104), .6], 16), px(5), px(1.5), .78))
  pine.add(strip(bez([x0 + px(20), .44], [x0 - px(18), .5], [x0 - px(46), .47], 16), px(4), px(1.2), .75))
  const nt = needleTex()
  const fan = (x, y, s, rot = 0) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(px(90 * s), px(45 * s)),
      new THREE.MeshBasicMaterial({ map: nt, transparent: true, depthTest: false, depthWrite: false }))
    m.position.set(x, y, 0); m.rotation.z = rot; m.userData.rot = rot; pine.add(m); fans.push(m) }
  fan(x0 + px(20), .9, .95); fan(x0 + px(52), .87, .7, -.1)
  fan(x0 + px(78), .64, .95, -.05); fan(x0 + px(108), .62, .7, -.12)
  fan(x0 - px(36), .51, .8, .1); fan(x0 + px(38), .73, .75, .05)
  const pineW = new THREE.Group(); pineW.position.set(x0, .3, 0); pine.position.set(-x0, -.3, 0); pineW.add(pine); put(pineW)
  // the rock the pine stands on: the same brushwork as the ranges, one narrow peak under the root
  const rock = range({ seed: 21.3, base: 0, amp: .40, freq: 2.2, ink: .95, fade: .1, pow: .7, env: [0, 1, 0], envC: x0 / asp + .01, envS: .06, col: [.09, .08, .08] })

  const near = range({ seed: 12.4, base: .03, amp: .46, freq: 1.3, ink: .92, fade: .07, pow: 1.0, env: [.10, 1.0, .16], col: [.09, .08, .08], gap: RW })

  // river: ripple strokes and a small boat with a figure
  const ripples = Array.from({ length: 8 }, (_, i) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(px(14 + 10 * (i % 3)), px(1)), inkM(.3))
    m.position.set(RX, px(4 + 4 * (i % 3)), 0); put(m); return m
  })
  const boat = new THREE.Group()
  const hull = new THREE.Shape(); hull.moveTo(-px(16), px(3)); hull.quadraticCurveTo(0, -px(3), px(16), px(3)); hull.quadraticCurveTo(0, px(1), -px(16), px(3))
  boat.add(new THREE.Mesh(new THREE.ShapeGeometry(hull), inkM(.85)))
  const hat = new THREE.Shape(); hat.moveTo(-px(4), px(7)); hat.lineTo(px(4), px(7)); hat.lineTo(0, px(10)); hat.lineTo(-px(4), px(7))
  boat.add(new THREE.Mesh(new THREE.ShapeGeometry(hat), inkM(.85)))
  const body = new THREE.Mesh(new THREE.PlaneGeometry(px(2.5), px(5)), inkM(.8)); body.position.set(0, px(4.5), 0); boat.add(body)
  const pole = new THREE.Mesh(new THREE.PlaneGeometry(px(0.8), px(18)), inkM(.7)); pole.position.set(px(6), px(6), 0); pole.rotation.z = -.5; boat.add(pole)
  put(boat)
  order++

  // Nakabashi
  const verm = new THREE.MeshBasicMaterial({ color: 0xb8352b, depthTest: false })
  const span = px(150), rise = px(20), y0 = px(10)
  const pts = Array.from({ length: 40 }, (_, i) => { const u = i / 39; return new THREE.Vector3(RX - span / 2 + span * u, y0 + rise * Math.sin(Math.PI * u), 0) })
  const curve = new THREE.CatmullRomCurve3(pts)
  const br = new THREE.Group()
  const deck = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, px(1.4), 5), verm)
  const rail = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => p.clone().setY(p.y + px(6)))), 80, px(0.7), 5), verm)
  br.add(deck, rail)
  const posts = []
  for (let i = 1; i < 12; i++) { const p = curve.getPoint(i / 12), b = new THREE.Mesh(new THREE.PlaneGeometry(px(0.8), px(6)), verm)
    b.position.set(p.x, p.y + px(3), 0); br.add(b); posts.push(b) }
  put(br); order++

  // geese in a loose line
  const birds = Array.from({ length: 5 }, (_, i) => {
    const g = new THREE.Group(), wl = new THREE.Mesh(new THREE.PlaneGeometry(px(7), px(0.9)), inkM(.7)), wr = wl.clone()
    wl.position.x = -px(3); wr.position.x = px(3); g.add(wl, wr)
    g.position.set(asp * 0.64 + px(16 * i), 0.5 - px(6 * i) + px(3 * (i % 2)), 0); put(g); return { g, wl, wr, ph: i * 0.9 }
  })

  const clock = new THREE.Clock()
  let t0 = 0
  watch(active, v => { if (v) { t0 = clock.getElapsedTime(); sealOn.value = false } }, { immediate: true })
  const fade = (obj, k) => obj.traverse(m => { if (m.material) { if (m.userData.op === undefined) m.userData.op = m.material.opacity; m.material.transparent = true; m.material.opacity = m.userData.op * k } })
  const nDeck = deck.geometry.index.count, nRail = rail.geometry.index.count
  const loop = () => {
    const t = clock.getElapsedTime(), a = active.value ? t - t0 : 99       // intro clock; inactive: finished state
    far.uReveal.value = ss(0, 2.6, a); mid.uReveal.value = ss(.6, 3.2, a); near.uReveal.value = ss(1.1, 3.6, a)
    const pg = ss(2.4, 3.8, a); pineW.scale.set(1, .2 + .8 * pg, 1); fade(pineW, pg); rock.uReveal.value = ss(1.4, 2.6, a)
    fans.forEach((m, i) => { m.rotation.z = m.userData.rot + .045 * Math.sin(.9 * t + 1.3 * i) + .02 * Math.sin(2.3 * t + i) })
    houseG.forEach((g, i) => { const k = ss(3.0 + .12 * i, 3.6 + .12 * i, a); fade(g, k); g.position.y = g.userData.y0 ??= g.position.y; g.position.y = g.userData.y0 - px(6) * (1 - k) })
    const bp = ss(3.8, 5.0, a); deck.geometry.setDrawRange(0, Math.floor(nDeck * bp / 6) * 6); rail.geometry.setDrawRange(0, Math.floor(nRail * bp / 6) * 6)
    posts.forEach((b, i) => { b.visible = bp > (i + 1) / 12 })
    fade(boat, ss(4.4, 5.4, a)); birds.forEach(b => fade(b.g, ss(4.8, 5.8, a))); fade(sun, ss(.3, 2.5, a))
    if (a > 5.2 && !sealOn.value) sealOn.value = true
    far.uShift.value = t * .003; mid.uShift.value = t * .006
    m1.uT.value = t * 2.2; m2.uT.value = t * 3.0
    ripples.forEach((m, i) => { m.position.x = RX - px(70) + ((px(19 * i) + t * px(3)) % px(140)); m.material.opacity = .15 + .15 * Math.sin(.8 * t + i) })
    boat.position.set(RX - px(50) + px(40) * Math.sin(t / 14), px(2) + px(0.8) * Math.sin(1.3 * t), 0)
    birds.forEach(({ g, wl, wr, ph }) => { const f = .45 * Math.sin(3.2 * t + ph); wl.rotation.z = -f; wr.rotation.z = f
      g.position.x = asp * 0.64 + px(16 * birds.indexOf(birds.find(b => b.g === g))) + px(30) * Math.sin(t / 20) })
    if (active.value || !drawn) { sharedRender(scene, cam, canvas, W, H); drawn = true }
    raf = requestAnimationFrame(loop)
  }
  loop()
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); canvas?.remove() })
</script>

<template>
  <div class="tk-band" :style="{ height: height + 'px' }">
    <div ref="host"></div>
    <div class="tk-seal" :class="{ on: sealOn }"><span>飛驒</span><span>高山</span></div>
  </div>
</template>

<style scoped>
.tk-band { position: absolute; left: 0; bottom: 0; width: 100%; pointer-events: none; z-index: 0; }
.tk-seal { position: absolute; right: 5%; bottom: 30%; width: 2.1rem; height: 2.1rem; background: #b8352b; border-radius: 3px;
  display: flex; flex-direction: row-reverse; justify-content: center; align-items: center; gap: 1px; transform: rotate(-2deg);
  box-shadow: inset 0 0 0 2px #b8352b, inset 0 0 0 3px rgba(245, 244, 237, 0.55); opacity: 0.88; }
.tk-seal span { writing-mode: vertical-rl; color: #f5f4ed; font-family: 'Songti SC', 'Source Han Serif SC', serif;
  font-size: 0.72rem; line-height: 1; font-weight: 600; }
.tk-seal { opacity: 0; transform: rotate(-2deg) scale(1.9); transition: opacity .25s ease-out, transform .35s cubic-bezier(.3, 1.6, .5, 1); }
.tk-seal.on { opacity: .88; transform: rotate(-2deg) scale(1); }
</style>
