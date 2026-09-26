<script setup>
// U_xx = P dv_xA R [G_A]_RR R dv_xA P, read right to left, one process per click (step 1 to 5).
// Colours name the PROCESS, shared by the formula, the caption and the scene:
//   P ink blue (initial and final state: target g.s., b bound), right dv_xA red (N excites the target),
//   R [G_A]_RR R amber (propagation with the target excited; b goes R -> D -> R through the N-b coupling),
//   left dv_xA purple (N de-excites the target).
// Never drawn as N hitting b: the coupling is a glow chain N-b while b trembles, then b settles back bound.
import { useIsSlideActive } from '@slidev/client'
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'
import katex from 'katex'
import * as THREE from 'three'
import { COL, makeNucleus, studioLights, glow, sharedRender } from './nucleus.js'

const props = defineProps({ step: { type: Number, default: 0 }, height: { type: Number, default: 240 } })
const C = { P: '#1B365D', ex: '#b53333', G: '#b87514', de: '#6b4c9a' }
// factor, process, click at which it is the current one
const pieces = [
  { tex: 'P', k: 'P', s: 5 }, { tex: '\\Delta v_{xA}', k: 'de', s: 4 },
  { tex: 'R', k: 'G', s: 3 }, { tex: '[G_A]_{RR}', k: 'G', s: 3 }, { tex: 'R', k: 'G', s: 3 },
  { tex: '\\Delta v_{xA}', k: 'ex', s: 2 }, { tex: 'P', k: 'P', s: 1 },
].map(p => ({ ...p, html: katex.renderToString(p.tex, { throwOnError: false }) }))
const lhs = katex.renderToString('U_{xx} =', { throwOnError: false })
const captions = [
  { k: null, t: 'Read right to left.' },
  { k: 'P', t: 'Start in P: target in its ground state, b bound.' },
  { k: 'ex', t: 'N excites the target. Δv<sub>xA</sub> does not act on b, so the system enters R.' },
  { k: 'G', t: 'Propagate with the target excited: R at both ends, but the N-b coupling takes b into D and back. <b>b is not frozen.</b>' },
  { k: 'de', t: 'N de-excites the target and leaves R.' },
  { k: 'P', t: 'End in P: target in its ground state, b bound.' },
]
const cap = computed(() => captions[Math.min(props.step, 5)])

const host = ref(null), wrap = ref(null), lab = ref(null), labD = ref(null), onR = ref(0), onD = ref(0)
const active = useIsSlideActive()
let canvas, raf, drawn = false, tEnter = 0
const ss = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u) }
const clock = new THREE.Clock()
watch(() => props.step, () => { tEnter = clock.getElapsedTime() })

onMounted(() => {
  const W = wrap.value.clientWidth || 860, H = props.height, dpr = Math.min(window.devicePixelRatio, 2)
  canvas = document.createElement('canvas'); canvas.width = W * dpr; canvas.height = H * dpr
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px'; host.value.appendChild(canvas)
  const scene = new THREE.Scene(); studioLights(scene)
  const cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 100); cam.position.set(0, -0.3, 10); cam.lookAt(0, -0.3, 0)

  const A = makeNucleus(7, 7, 0.34, 11); A.position.set(0, -1.35, 0); scene.add(A)
  const Ag = glow(0xe9674f, 3.6, 0); Ag.position.copy(A.position); scene.add(Ag)
  const proj = new THREE.Group(); scene.add(proj)
  const b = makeNucleus(5, 4, 0.3, 5); b.position.set(0, 0.35, 0); proj.add(b)
  const bG = glow(0xf2a93b, 2.8, 0); bG.material.depthTest = false; bG.position.copy(b.position); proj.add(bG)
  const x = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 16), new THREE.MeshPhysicalMaterial({ color: COL.neutron, roughness: 0.3, clearcoat: 0.6 }))
  const xg = glow(COL.x, 1.1, 0.7); xg.material.depthTest = false; x.add(xg); x.position.set(0.55, -0.55, 0.3); proj.add(x)
  const chain = (n, col) => Array.from({ length: n }, () => { const g = glow(col, 0.5, 0); g.material.depthTest = false; scene.add(g); return g })
  const lA = chain(8, 0xd9544a), lB = chain(6, 0xf2c14e)       // N-target (dv_xA, red), N-b coupling (amber)
  const home = b.children.map(m => m.userData.home.clone())
  const xs = [-7.5, -7.5, -2.6, 2.6, 2.6, 7.5]                     // projectile x per step
  const wx = new THREE.Vector3(), wb = new THREE.Vector3(), v = new THREE.Vector3()
  const chainTo = (arr, p, q, op, t, col) => arr.forEach((g, i) => { const f = (i + 1) / (arr.length + 1)
    if (col !== undefined) g.material.color.setHex(col)
    g.position.copy(p).lerp(q, f); g.material.opacity = op * (0.55 + 0.45 * Math.sin(8 * t - 6 * f)) })
  const put = (el, dx, dy) => { if (!el) return; v.copy(wb); v.x += dx; v.y += dy; v.project(cam)
    el.style.left = ((v.x + 1) / 2 * W) + 'px'; el.style.top = ((1 - v.y) / 2 * H) + 'px' }

  const loop = () => {
    const t = clock.getElapsedTime(), st = Math.min(props.step, 5), u = t - tEnter
    proj.position.x += (xs[st] - proj.position.x) * (st === 3 ? 0.012 : 0.06)
    x.getWorldPosition(wx); b.getWorldPosition(wb)
    // dv_xA: N-target link while exciting (2, red) or de-exciting (4, purple)
    const link = (st === 2 || st === 4) ? ss(0.2, 0.6, u) : 0
    chainTo(lA, wx, A.position, 0.95 * link, t, st === 4 ? 0x8a6bc0 : 0xd9544a)
    // target excitation: on during 2 (after the link) and 3; off during 4
    const ex = st === 2 ? ss(0.6, 1.2, u) : st === 3 ? 1 : st === 4 ? 1 - ss(0.8, 1.6, u) : 0
    Ag.material.opacity = 0.75 * ex
    const q = 0.05 * ex * Math.sin(14 * t); A.scale.set(1 + q, 1 - q, 1)
    // [G_A]_RR: N-b coupling takes b into D (excited, glowing) and back to R, periodically
    const dn = st === 3 ? ss(0.3, 0.9, u) * (0.5 - 0.5 * Math.cos(2.4 * (u - 0.3))) : 0
    chainTo(lB, wx, wb, 0.9 * (st === 3 ? ss(0.3, 0.9, u) : 0) * (0.4 + 0.6 * dn), t)
    bG.material.opacity = 0.75 * dn
    b.children.forEach((m, i) => m.position.copy(home[i]).multiplyScalar(1 + 0.14 * dn * (0.5 + 0.5 * Math.sin(9 * t + i))))
    b.rotation.y = 0.3 * t; A.rotation.y = 0.12 * t
    // sector labels: R while the target is excited and b bound, D while b is excited
    onR.value = ex * (1 - 0.7 * dn); onD.value = dn
    put(lab.value, -0.35, 1.05); put(labD.value, 0.45, 1.05)
    if (active.value || !drawn) { sharedRender(scene, cam, canvas, W, H); drawn = true }
    raf = requestAnimationFrame(loop)
  }
  loop()
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); canvas?.remove() })
</script>

<template>
  <div class="ss-eq">
    <span v-html="lhs"></span>
    <span v-for="(p, i) in pieces" :key="i" class="ss-f" v-html="p.html"
      :class="{ on: step >= p.s, cur: step === p.s }" :style="{ color: C[p.k] }"></span>
  </div>
  <div class="ss-legend">
    <span :style="{ color: C.P }">final state</span>
    <span :style="{ color: C.de }">N de-excites the target</span>
    <span :style="{ color: C.G }">propagation, target excited</span>
    <span :style="{ color: C.ex }">N excites the target</span>
    <span :style="{ color: C.P }">initial state</span>
  </div>
  <div class="ss-def">
    <span><b>P</b> = P<sub>A</sub>P<sub>b</sub>: target g.s., b bound</span>
    <span><b>R</b> = Q<sub>A</sub>P<sub>b</sub>: target excited, b bound</span>
    <span><b>D</b> = Q<sub>A</sub>Q<sub>b</sub>: target excited, b excited or broken</span>
  </div>
  <div ref="wrap" class="ss-wrap" :style="{ height: height + 'px' }">
    <div ref="host"></div>
    <div ref="lab" class="ss-R" :style="{ opacity: onR }">R</div>
    <div ref="labD" class="ss-R ss-D" :style="{ opacity: onD }">D</div>
    <div class="ss-A" :style="{ color: '#66655f' }">target</div>
  </div>
  <div class="ss-cap" :style="{ color: cap.k ? C[cap.k] : '#66655f' }" v-html="cap.t"></div>
</template>

<style scoped>
.ss-eq { text-align: center; font-size: 2.0rem; margin-top: 0.2rem; }
.ss-f { display: inline-block; margin: 0 0.12em; padding: 0 0.08em; opacity: 0.28; border-bottom: 3px solid transparent;
  transition: opacity 0.35s, border-color 0.35s; }
.ss-f.on { opacity: 1; }
.ss-f.cur { border-bottom-color: currentColor; }
.ss-legend { display: flex; justify-content: center; gap: 1.6rem; font-size: 0.85rem; margin-top: 0.1rem; }
.ss-def { display: flex; justify-content: center; gap: 1.8rem; font-size: 0.85rem; margin-top: 0.5rem; color: #3d3d3a; }
.ss-wrap { position: relative; width: 100%; }
.ss-R { position: absolute; transform: translate(-50%, -50%); font-family: Newsreader, Georgia, serif; font-style: italic;
  font-size: 1.3rem; font-weight: 600; color: #3d3d3a; pointer-events: none; }
.ss-D { color: #b53333; }
.ss-A { position: absolute; left: 50%; bottom: 2%; transform: translateX(-50%); font-family: Newsreader, Georgia, serif;
  font-size: 0.85rem; pointer-events: none; }
.ss-cap { text-align: center; font-family: Newsreader, Georgia, serif; font-size: 1.1rem; min-height: 1.6rem; }
</style>
