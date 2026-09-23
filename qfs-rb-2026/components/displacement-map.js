/**
 * Generate an SVG feDisplacementMap source for the CSS tier of Liquid Glass.
 *
 * The map encodes the same height field the WebGL tier uses, but stores its
 * gradient instead of its height: R holds the x displacement and G holds the
 * y displacement, both biased around neutral.
 *
 * SIGN CONVENTION, and it is easy to get backwards.
 * SVG defines the filter as a pull, not a push:
 *
 *     P'(x,y) = P( x + scale * (R/255 - 0.5), y + scale * (G/255 - 0.5) )
 *
 * so a channel above neutral makes the output sample from FARTHER ALONG the
 * axis, that is outward at the right rim. The WebGL trace does the opposite.
 * Working through refract() with front normal N (N.x > 0 at the right rim),
 * incident I = (0,0,-1) and eta = 1/n < 1:
 *
 *     T.x = -( sqrt(k) - eta*N.z ) * N.x ,   k - eta^2 N.z^2 = 1 - eta^2 > 0
 *
 * so sqrt(k) > eta*N.z, the bracket is positive, and T.x < 0. The ray samples
 * INWARD, which is what makes a plano-convex slab magnify.
 *
 * Therefore the encoded value must fall below neutral at the right rim, and
 * since dh/dx < 0 there, the correct encoding is the POSITIVE gradient:
 *
 *     R = neutral + (dh/dx) * gain
 *
 * Encoding the negative gradient (copying the sign from the shader's
 * vec3(-grad, 1) normal) double-flips and gives a pincushion instead of a
 * lens. That was a real bug in an earlier version of this file.
 *
 * What this tier approximates away: one interface instead of two, no
 * wavelength dependence, no separate rim routes. It keeps the rim
 * compression, which is most of what the eye reads.
 *
 * Browser only, uses a 2D canvas. Returns a data URL.
 *
 *   import { makeDisplacementMap } from './displacement-map.js';
 *   const url = makeDisplacementMap({ width: 320, height: 120, radius: 28 });
 */

// feDisplacementMap divides the channel by 255, so the exact neutral is
// 127.5, not 128. At scale = 42 the difference is about 0.08 px, invisible
// but free to get right.
const NEUTRAL = 127.5;

export function makeDisplacementMap({
  width,
  height,
  radius = 24,          // CSS corner radius in px
  bevel = 18,           // width of the curved rim band in px
  strength = 1.0,       // 0..1, scales the encoded gradient
} = {}) {
  const w = requirePositiveInt(width, 'width');
  const h = requirePositiveInt(height, 'height');

  // Signed distance to a rounded rectangle, positive outside.
  const hx = w / 2, hy = h / 2;
  const r = Math.min(Math.max(radius, 0), hx, hy);
  const sdf = (x, y) => {
    const qx = Math.abs(x - hx) - hx + r;
    const qy = Math.abs(y - hy) - hy + r;
    return Math.min(Math.max(qx, qy), 0)
         + Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - r;
  };

  // Same profile as the shader: quintic ramp across the bevel, then flat.
  const b = Math.max(bevel, 1);
  const heightAt = (x, y) => {
    const t = Math.min(Math.max(-sdf(x, y) / b, 0), 1);
    return t * t * t * (t * (t * 6 - 15) + 10);
  };

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('makeDisplacementMap: 2D canvas context unavailable');
  const img = ctx.createImageData(w, h);

  // The quintic smootherstep 6t^5-15t^4+10t^3 has derivative 30t^2(t-1)^2,
  // peaking at 1.875 at t = 0.5, so dh/dx peaks at 1.875/b per pixel. With
  // gain = 127 * strength * b * 0.5 the peak encoded excursion is
  // 1.875/b * 127 * strength * b * 0.5 = 119 * strength, which sits just
  // inside the 127 the byte range allows. The 0.5 is that headroom, nothing
  // more principled.
  const gain = 127 * strength * b * 0.5;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const gx = (heightAt(x + 1, y) - heightAt(x - 1, y)) * 0.5;
      const gy = (heightAt(x, y + 1) - heightAt(x, y - 1)) * 0.5;
      const i = (y * w + x) * 4;
      img.data[i]     = clamp8(NEUTRAL + gx * gain);   // positive gradient, see header
      img.data[i + 1] = clamp8(NEUTRAL + gy * gain);
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;                            // opaque, alpha is not a channel here
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}

function clamp8(v) {
  return v < 0 ? 0 : v > 255 ? 255 : Math.round(v);
}

function requirePositiveInt(v, name) {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n) || n < 1) {
    throw new Error(`makeDisplacementMap: ${name} must be a positive finite number, got ${v}`);
  }
  return n;
}

/**
 * Build the SVG filter and install it, returning the filter id for use as
 * `backdrop-filter: blur(...) url(#id) saturate(...)`.
 *
 * The filter deliberately does DISPLACEMENT ONLY. Blur stays in the CSS
 * backdrop-filter list, for one reason that matters: a browser that parses
 * `url()` but does not execute the referenced filter (Safari, see
 * references/css-svg-fallback.md) silently drops everything the filter would
 * have done. Keeping blur in CSS means that browser still gets blur, and the
 * engines that do run the filter do not blur twice.
 */
export function installGlassFilter({
  id = 'liquid-glass-filter',
  width, height, radius, bevel, strength,
  scale = 42,           // displacement strength in px, the main dial
  margin = 0.25,        // filter region expansion, as a fraction of the box
} = {}) {
  const w = requirePositiveInt(width, 'width');
  const h = requirePositiveInt(height, 'height');
  const map = makeDisplacementMap({ width: w, height: h, radius, bevel, strength });

  document.getElementById(id)?.closest('svg')?.remove();

  // The filter region must be larger than the element box, or displaced
  // samples near the boundary are clipped and the rim goes flat exactly
  // where the effect lives.
  const pct = (v) => `${(v * 100).toFixed(1)}%`;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none';
  svg.innerHTML = `
    <filter id="${id}"
            x="${pct(-margin)}" y="${pct(-margin)}"
            width="${pct(1 + 2 * margin)}" height="${pct(1 + 2 * margin)}"
            filterUnits="objectBoundingBox"
            color-interpolation-filters="sRGB">
      <feImage href="${map}" result="map" preserveAspectRatio="none"
               x="0" y="0" width="${w}" height="${h}"/>
      <feDisplacementMap in="SourceGraphic" in2="map" scale="${scale}"
                         xChannelSelector="R" yChannelSelector="G"/>
    </filter>`;
  document.body.appendChild(svg);
  return id;
}
