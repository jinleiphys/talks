<script setup>
// The two eliminations behind H_eff, as physical pictures (slide "What H_3^(0) leaves out").
// mode "target": x excites the target (A*); while A* lives, the x-b coupling still acts on b; b de-excites the
//                target. The piece that needs both fragments at once: in U^(nonadd), not in U_xA or U_bA.
// mode "core":   the target stays in its ground state; the x-b coupling lifts b to b* and back. The piece that
//                changes b's internal state: in U^(pol), not in V_bx acting on b's ground state.
// The projectile moves in slow motion so each stage can be read; the stage text runs under the scene.
import { useIsSlideActive } from '@slidev/client'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { COL, makeNucleus, makeRenderer, studioLights, glow, releaseRenderer } from './nucleus.js'

const props = defineProps({ mode: { type: String, default: 'target' }, height: { type: Number, default: 240 } })
const host = ref(null), lb = ref(null), lx = ref(null), lt = ref(null), note = ref('')
const active = useIsSlideActive()
let renderer, raf, ro, drawn = false
const ss = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u) }

onMounted(() => {
  const el = host.value, W = el.clientWidth, H = props.height
  renderer = makeRenderer(el, Math.max(W, 1), H)
  const scene = new THREE.Scene(); studioLights(scene)
  const cam = new THREE.PerspectiveCamera(34, W > 0 ? W / H : 1.9, 0.1, 200)
  cam.position.set(0, 0.8, 14); cam.lookAt(0, -0.1, 0)
  // registered first: a slide mounted while hidden has clientWidth 0 until shown
  ro = new ResizeObserver(() => {
    const w = el.clientWidth; if (w === 0) return
    renderer.setSize(w, props.height); cam.aspect = w / props.height; cam.updateProjectionMatrix()
  })
  ro.observe(el)

  const target = makeNucleus(4, 5, 0.5, 11); target.position.set(0, -2.1, 0); scene.add(target)
  const tGlow = glow(0xe9674f, 4.4, 0); tGlow.position.copy(target.position); scene.add(tGlow)
  const proj = new THREE.Group(); scene.add(proj)
  const b = makeNucleus(8, 5, 0.5, 5); proj.add(b)
  const bGlow = glow(0xe9674f, 5.6, 0); proj.add(bGlow)
  const x = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 20),
    new THREE.MeshPhysicalMaterial({ color: COL.neutron, roughness: 0.3, clearcoat: 0.6 }))
  const xGlow = glow(COL.x, 2.8, 0.85); xGlow.material.depthTest = false; x.add(xGlow); proj.add(x)
  const xHome = new THREE.Vector3(0.4, -1.55, 0.5); x.position.copy(xHome)
  // the x-b coupling: a row of small glows between x and the centre of b
  const link = Array.from({ length: 9 }, () => { const g = glow(0xf2c14e, 0.5, 0); g.material.depthTest = false; proj.add(g); return g })
  // the de-excitation handed from the target to b (mode "target")
  const packet = glow(0xe9674f, 1.4, 0); packet.material.depthTest = false; scene.add(packet)

  const T = 7.0, clock = new THREE.Clock(), v = new THREE.Vector3(), w = new THREE.Vector3()
  const place = (elr, obj, dy = 0, dx = 0) => {
    if (!elr.value || el.clientWidth === 0) return
    obj.getWorldPosition(v); v.y += dy; v.x += dx; v.project(cam)
    elr.value.style.left = ((v.x + 1) / 2 * el.clientWidth) + 'px'
    elr.value.style.top = ((1 - v.y) / 2 * props.height) + 'px'
  }
  const loop = () => {
    const t = clock.getElapsedTime() % T
    // slow drift across the target, centred at t = 3.5
    const hw = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * 14 * cam.aspect
    proj.position.set((t - 3.5) / 3.5 * 0.55 * hw, 1.7, 0)
    const out = 1 - ss(6.4, 6.9, t)
    let tg = 0, bx = 0, pk = -1, bex = 0
    if (props.mode === 'target') {
      tg = ss(1.6, 2.0, t) * (1 - ss(4.2, 4.6, t))                  // A* alive between contact and de-excitation
      bx = ss(2.2, 2.6, t) * (1 - ss(3.8, 4.2, t))                  // x-b coupling during A*
      pk = t > 3.9 && t < 4.6 ? (t - 3.9) / 0.7 : -1                // packet: target -> b
      bex = pk >= 0 ? 0.5 * Math.sin(Math.PI * pk) : 0.25 * bx     // b jolts when it takes the excitation
      note.value = t < 1.6 ? 'b + x approach the target'
                 : t < 2.3 ? 'x excites the target: A*'
                 : t < 3.9 ? 'while A* lives, x and b are still coupled: b can change'
                 : t < 4.7 ? 'b de-excites the target'
                 : 'x in, b out: needs both fragments at once'
    } else {
      bx = ss(1.8, 2.3, t) * (1 - ss(4.6, 5.1, t))
      bex = ss(2.2, 2.9, t) * (1 - ss(4.3, 5.0, t))                  // b lifted to b* and back
      note.value = t < 1.8 ? 'the target stays in its ground state'
                 : t < 2.9 ? 'the x-b coupling lifts b out of its ground state'
                 : t < 4.4 ? 'b*: b excited (or broken)'
                 : t < 5.1 ? 'and back to b'
                 : 'b\'s internal state changed by x, not by the target'
    }
    tGlow.material.opacity = 0.6 * tg * out
    const tq = 0.07 * tg * Math.sin(16 * t); target.scale.set(1 + tq, 1 - tq, 1)
    bGlow.material.opacity = 0.6 * bex * out
    const bs = 1 + 0.16 * bex * (props.mode === 'core' ? 1 : 0.5) + 0.05 * bex * Math.sin(14 * t)
    b.scale.setScalar(bs)
    link.forEach((g, i) => {
      const f = (i + 1) / (link.length + 1)
      g.position.copy(xHome).multiplyScalar(1 - f)
      g.material.opacity = 0.9 * bx * out * (0.6 + 0.4 * Math.sin(8 * t - 6 * f))
    })
    if (pk >= 0) {
      target.getWorldPosition(v); b.getWorldPosition(w)
      packet.position.copy(v).lerp(w, ss(0, 1, pk)); packet.material.opacity = 0.9 * Math.sin(Math.PI * pk)
    } else packet.material.opacity = 0
    place(lb, b, 1.85); place(lx, x, -0.1, 1.0); place(lt, target, -2.0)
    if (lt.value) lt.value.textContent = props.mode === 'target' && tg > 0.4 ? 'A*' : 'target A'
    if (lb.value) lb.value.textContent = props.mode === 'core' && bex > 0.4 ? 'b*' : 'b'
    if (active.value || !drawn) { renderer.render(scene, cam); drawn = true }   // off-slide: keep one frame
    raf = requestAnimationFrame(loop)
  }
  loop()
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); ro && ro.disconnect(); releaseRenderer(renderer) })
</script>

<template>
  <div class="el-wrap">
    <div ref="host" class="el-host" :style="{ height: height + 'px' }"></div>
    <div ref="lb" class="el-lab">b</div>
    <div ref="lx" class="el-lab el-x">x</div>
    <div ref="lt" class="el-lab el-t">target A</div>
    <div class="el-note">{{ note || ' ' }}</div>
  </div>
</template>

<style scoped>
.el-wrap { position: relative; width: 100%; border-radius: 10px; overflow: hidden; }
.el-host { width: 100%; }
.el-lab { position: absolute; transform: translate(-50%, -50%); font-family: Newsreader, Georgia, serif;
  font-size: 1.1rem; color: #141413; pointer-events: none; white-space: nowrap; }
.el-x { color: #9a6a12; font-weight: 600; }
.el-t { color: #4d4c48; font-size: 0.95rem; }
.el-note { text-align: center; font-family: Newsreader, Georgia, serif; font-size: 0.98rem; color: #b53333; margin-top: 2px; min-height: 1.4em; }
</style>
