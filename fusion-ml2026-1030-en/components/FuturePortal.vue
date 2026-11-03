<script setup lang="ts">
// Closing slide backdrop: a hyperspace starfield streaming out of a glowing portal, over a perspective grid floor.
// Canvas 2D, no WebGL. In print mode the canvas draws one still frame.
import { onMounted, onUnmounted, ref } from 'vue'
import { useNav } from '@slidev/client'

const cv = ref<HTMLCanvasElement>()
const { isPrintMode } = useNav()
let raf = 0

onMounted(() => {
  const c = cv.value!, g = c.getContext('2d')!
  const fit = () => { const r = c.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); c.width = r.width * d; c.height = r.height * d }
  fit(); addEventListener('resize', fit)
  const N = 520, S: { x: number; y: number; z: number; h: number }[] = []
  const seed = (i: number) => { const a = Math.sin(i * 12.9898) * 43758.5453; return a - Math.floor(a) }
  for (let i = 0; i < N; i++) S.push({ x: seed(i) * 2 - 1, y: seed(i + 777) * 2 - 1, z: seed(i + 1555), h: seed(i + 3333) })
  const frame = (dt: number) => {
    const W = c.width, H = c.height, cx = W / 2, cy = H * 0.268
    g.fillStyle = 'rgba(2,4,14,0.34)'; g.fillRect(0, 0, W, H)
    for (const s of S) {
      const pz = s.z
      s.z -= dt * (0.16 + 0.22 * s.h)
      if (s.z <= 0.02) { s.z = 1; s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; continue }
      const k = 0.55 * W, x0 = cx + s.x / pz * k * 0.5, y0 = cy + s.y / pz * k * 0.5, x1 = cx + s.x / s.z * k * 0.5, y1 = cy + s.y / s.z * k * 0.5
      if (x1 < 0 || x1 > W || y1 < 0 || y1 > H) continue
      const b = Math.min(1, (1 - s.z) * 1.4), hue = s.h < 0.15 ? '255,206,110' : s.h < 0.55 ? '120,220,255' : '190,170,255'
      const edge = Math.min(1, Math.hypot(x1 - cx, y1 - cy) / (0.5 * W)); g.strokeStyle = `rgba(${hue},${Math.min(1, b * (0.6 + edge))})`; g.lineWidth = ((1 - s.z) * 2.2 + edge * 2.4) * (W / 1600) + 0.4
      g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke()
    }
  }
  if (isPrintMode.value) { for (let i = 0; i < 90; i++) frame(0.03); return }
  let last = performance.now()
  const loop = (t: number) => { const dt = Math.min(0.05, (t - last) / 1000); last = t; frame(dt); raf = requestAnimationFrame(loop) }
  raf = requestAnimationFrame(loop)
  onUnmounted(() => { cancelAnimationFrame(raf); removeEventListener('resize', fit) })
})
</script>

<template>
<div class="fp">
<canvas ref="cv" class="fp-stars"></canvas>
<div class="fp-grid"></div>
<div class="fp-portal">
<div class="fp-ring r1"></div><div class="fp-ring r3"></div>
<div class="fp-core"></div><div class="fp-bloom"></div>
</div>
<div class="fp-horizon"></div>
<div class="fp-scrim"></div>
<div class="fp-qmask"></div>
</div>
</template>

<style scoped>
.fp { position: absolute; inset: 0; overflow: hidden; background: radial-gradient(ellipse at 50% 40%, #0b1636 0%, #050a1c 45%, #01020a 100%); }
.fp-stars { position: absolute; inset: 0; width: 100%; height: 100%; }
/* perspective grid floor, scrolling toward the viewer */
.fp-grid { position: absolute; left: -50%; right: -50%; bottom: -8%; height: 46%; transform-origin: 50% 0; transform: perspective(380px) rotateX(64deg);
  background-image: linear-gradient(rgba(90,210,255,.5) 1.2px, transparent 1.2px), linear-gradient(90deg, rgba(90,210,255,.36) 1.2px, transparent 1.2px);
  background-size: 64px 64px; animation: fpScroll 2.4s linear infinite;
  mask-image: linear-gradient(to bottom, transparent 0%, #000 22%, rgba(0,0,0,.15) 100%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 22%, rgba(0,0,0,.15) 100%); }
.fp-scrim { position: absolute; left: 0; right: 0; top: 57%; bottom: 0; background: radial-gradient(ellipse 45% 70% at 50% 50%, rgba(1,2,10,.82), rgba(1,2,10,0) 100%); }
@keyframes fpScroll { to { background-position: 0 64px, 0 0; } }
.fp-horizon { position: absolute; left: 0; right: 0; top: 58.2%; height: 2px; background: linear-gradient(90deg, transparent, rgba(120,220,255,.9) 30%, rgba(255,214,120,1) 50%, rgba(120,220,255,.9) 70%, transparent); box-shadow: 0 0 22px 4px rgba(110,200,255,.55); }
/* the portal */
.fp-portal { position: absolute; left: 50%; top: 26.8%; width: 292px; height: 292px; transform: translate(-50%, -50%); }
.fp-ring { position: absolute; inset: 0; border-radius: 50%; }
.fp-ring.r1 { background: conic-gradient(from 0deg, #4de3ff, #6f7bff 30%, #b38cff 50%, #ffd36e 70%, #4de3ff); -webkit-mask: radial-gradient(circle, transparent 63%, #000 64%, #000 67%, transparent 68%); mask: radial-gradient(circle, transparent 63%, #000 64%, #000 67%, transparent 68%); filter: drop-shadow(0 0 12px #4de3ff) drop-shadow(0 0 28px #8a5cff); animation: fpSpin 9s linear infinite; }
.fp-ring.r2 { inset: 7%; background: conic-gradient(from 180deg, transparent 0 20%, rgba(77,227,255,.9) 25%, transparent 32% 60%, rgba(244,198,61,.9) 66%, transparent 72%); -webkit-mask: radial-gradient(circle, transparent 66%, #000 67%, #000 69%, transparent 70%); mask: radial-gradient(circle, transparent 66%, #000 67%, #000 69%, transparent 70%); animation: fpSpin 5s linear infinite reverse; }
.fp-ring.r3 { inset: -3%; border: 1px dashed rgba(120,220,255,.35); animation: fpSpin 40s linear infinite; }
.fp-core { position: absolute; inset: 12%; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,.18) 0%, rgba(120,200,255,.12) 35%, rgba(40,60,140,.0) 70%); animation: fpPulse 3.2s ease-in-out infinite alternate; }
.fp-bloom { position: absolute; inset: -45%; border-radius: 50%; background: radial-gradient(circle, rgba(77,227,255,.30) 0%, rgba(111,123,255,.16) 28%, rgba(77,227,255,0) 60%); filter: blur(4px); animation: fpPulse 4s ease-in-out infinite alternate; }
.fp-qmask { position: absolute; left: 50%; top: 55%; width: 860px; height: 64px; transform: translate(-50%, -50%); background: radial-gradient(ellipse at center, rgba(1,2,10,.78) 0%, rgba(1,2,10,.45) 55%, rgba(1,2,10,0) 100%); }
@keyframes fpSpin { to { transform: rotate(360deg); } }
@keyframes fpPulse { from { transform: scale(.96); opacity: .75; } to { transform: scale(1.03); opacity: 1; } }
</style>
