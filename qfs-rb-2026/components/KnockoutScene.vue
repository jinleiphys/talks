<script setup>
// High-energy one-nucleon knockout a = b + x on a light target A (80 MeV/nucleon to GeV/nucleon).
// The collision is sudden: the projectile arrives at about 0.4c, x's orbit is frozen during the contact,
// x is knocked out hard at a large angle, and b flies on at the beam velocity.
// mode: "spectator"    b is a rigid spectator: it leaves exactly as it came in
//       "nonspectator" x had polarised b inside a; its sudden removal leaves b out of its ground state,
//                      b rings and may emit a nucleon
//       "kick"         picture B: the struck x is sent across b afterwards
import { useIsSlideActive } from '@slidev/client'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { COL, makeNucleus, makeRenderer, studioLights, glow, releaseRenderer } from './nucleus.js'

const props = defineProps({
  mode: { type: String, default: 'spectator' },
  height: { type: Number, default: 320 },
  bZ: { type: Number, default: 8 }, bN: { type: Number, default: 5 },
  bLabel: { type: String, default: 'b' },
})
const host = ref(null), lb = ref(null), lx = ref(null), lt = ref(null), note = ref('')
const active = useIsSlideActive()
let drawn = false
let renderer, raf, ro

onMounted(() => {
  const el = host.value, W = el.clientWidth, H = props.height
  renderer = makeRenderer(el, W, H)
  const scene = new THREE.Scene(); studioLights(scene)
  const cam = new THREE.PerspectiveCamera(34, W / H, 0.1, 200)
  cam.position.set(0, 1.0, 14.5); cam.lookAt(0, -0.2, 0)

  const target = makeNucleus(4, 5, 0.5, 11); target.position.set(0, -2.05, 0); scene.add(target)
  const tGlow = glow(0xe9674f, 4.6, 0); tGlow.position.copy(target.position); scene.add(tGlow)
  const proj = new THREE.Group(); scene.add(proj)
  const b = makeNucleus(props.bZ, props.bN, 0.5, 5); proj.add(b)
  const bGlow = glow(0xe9674f, 5.8, 0); proj.add(bGlow)
  const x = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 20),
    new THREE.MeshPhysicalMaterial({ color: COL.neutron, roughness: 0.3, clearcoat: 0.6 }))
  const xGlow = glow(COL.x, 3.0, 0.9); xGlow.material.depthTest = false; xGlow.renderOrder = -1; x.renderOrder = 2
  x.add(xGlow); scene.add(x)
  const flash = glow(0xfff3c4, 1, 0); flash.material.depthTest = false; scene.add(flash)
  const leaver = b.children[b.children.length - 1]
  // speed streaks trailing the projectile
  const streaks = new THREE.Group(); proj.add(streaks)
  for (let i = 0; i < 9; i++) {
    const y = -1.3 + 2.6 * i / 8, len = 2.5 + 2.5 * ((i * 37) % 5) / 5
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.8, y, 0), new THREE.Vector3(-1.8 - len, y, 0)])
    streaks.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x8a8981, transparent: true, opacity: 0.5 })))
  }
  // x's (frozen) place in a, on b's upper-front side, facing the target
  const xHome = new THREE.Vector3(0.3, -1.75, 0.5)
  // polarisation of b toward x (nonspectator): b is stretched along the b-x axis before the collision
  const axis = xHome.clone().normalize()

  const T = 4.6, clock = new THREE.Clock(), v = new THREE.Vector3()
  const place = (elr, obj, dy = 0, show = true) => {
    if (!elr.value) return
    obj.getWorldPosition(v); v.y += dy; v.project(cam)
    elr.value.style.left = ((v.x + 1) / 2 * el.clientWidth) + 'px'
    elr.value.style.top = ((1 - v.y) / 2 * props.height) + 'px'
    elr.value.style.opacity = show ? 1 : 0
  }
  const loop = () => {
    const t = (typeof window.__koT === 'number') ? window.__koT : clock.getElapsedTime() % T   // __koT: freeze for inspection
    const hw = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * 14.5 * cam.aspect
    const L = 1.15 * hw
    // time map: fast in, slow motion through the contact (1.6 s to 3.0 s), fast out, a pause at the end
    const tc = 1.6, tslow = 1.4
    let s   // path parameter, s = 0 at the contact
    if (t < tc) s = -1 + t / tc
    else if (t < tc + tslow) s = 0.06 * (t - tc) / tslow
    else s = 0.06 + (t - tc - tslow) / 1.7
    const X = s * L
    proj.position.set(X, 1.75, 0)
    const contact = s >= 0
    const k = contact ? Math.min(1, (t - tc) / tslow) : 0         // progress through the slow-motion window
    streaks.visible = !contact || s > 0.06
    // b's shape: polarised toward x before; after the sudden removal, ringing (nonspectator) or unchanged
    const pol = props.mode === 'nonspectator' ? 0.16 : 0
    let exc = 0
    if (!contact) {
      b.scale.set(1 + pol * Math.abs(axis.x), 1 + pol * Math.abs(axis.y), 1 + pol * Math.abs(axis.z))
      note.value = props.mode === 'nonspectator' ? 'inside a, x polarises b' : 'about 0.4c: the contact is sudden'
    } else {
      const ring = props.mode === 'spectator' ? 0 : Math.min(1, 1.5 * k) * (props.mode === 'kick' ? 0.9 : 1)
      exc = ring
      const q = 0.14 * ring * Math.sin(14 * t)
      b.scale.set(1 + q, 1 - q, 1 + 0.5 * q)
      note.value = props.mode === 'spectator' ? 'x taken by the target; b flies on unchanged'
                 : props.mode === 'nonspectator' ? 'x removed suddenly: b left out of its ground state'
                 : 'the struck x is sent across b'
    }
    bGlow.material.opacity = 0.55 * exc
    // x: rides with a, then is knocked out hard at a large angle (or across b in picture B)
    if (!contact) { x.position.copy(xHome).add(proj.position); x.visible = true }
    else if (props.mode === 'kick') {
      // picture B: the struck x is sent forward along the beam and across b
      const p0 = new THREE.Vector3(0.3, 0.0, 0.5)
      x.position.copy(p0.lerp(proj.position.clone().add(new THREE.Vector3(1.6, 0.2, 0.5)), Math.min(1, 0.4 + 1.2 * k)))
    } else {
      // x is knocked out of a and absorbed by the target
      const d = Math.min(1, 1.8 * k)
      x.position.set(0.3 - 0.3 * d, 0.0 - 2.0 * d, 0.5 - 0.3 * d)
      x.visible = d < 0.95
    }
    // stripping: the target absorbs x and is left excited (its final state is summed over, not measured)
    tGlow.material.opacity = contact ? 0.6 * Math.min(1, 2 * k) * Math.max(0.35, 1 - (s - 0.06) * 1.2) : 0
    const tq = contact ? 0.08 * Math.sin(16 * t) : 0
    target.scale.set(1 + tq, 1 - tq, 1)
    // flash at the contact
    const f = contact ? Math.max(0, 1 - k * 1.3) : 0
    flash.position.set(0.3, -0.35, 0.5); flash.scale.setScalar(1 + 5 * k); flash.material.opacity = 0.95 * f
    // a nucleon leaving b once it rings (nonspectator and kick)
    if (props.mode !== 'spectator' && s > 0.3) {
      const d = (s - 0.3) * 6
      leaver.position.set(leaver.userData.home.x + 0.2 * d, leaver.userData.home.y + 0.9 * d, leaver.userData.home.z + 0.3 * d)
    } else leaver.position.copy(leaver.userData.home)
    place(lb, b, 1.9); place(lx, x, 0.95, x.visible && x.position.y < 6); place(lt, target, -2.1)
    if (active.value || !drawn) { renderer.render(scene, cam); drawn = true }   // off-slide: keep one frame, stop drawing
    raf = requestAnimationFrame(loop)
  }
  loop()
  ro = new ResizeObserver(() => { const w = el.clientWidth; renderer.setSize(w, props.height); cam.aspect = w / props.height; cam.updateProjectionMatrix() })
  ro.observe(el)
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); ro && ro.disconnect(); releaseRenderer(renderer) })
</script>

<template>
  <div class="ko-wrap">
    <div ref="host" class="ko-host" :style="{ height: height + 'px' }"></div>
    <div ref="lb" class="ko-lab">{{ bLabel }}</div>
    <div ref="lx" class="ko-lab ko-x">x</div>
    <div ref="lt" class="ko-lab ko-t">target A</div>
    <div class="ko-key"><span class="dot p"></span>proton <span class="dot n"></span>neutron</div>
    <div class="ko-note">{{ note || '\u00a0' }}</div>
  </div>
</template>

<style scoped>
.ko-wrap { position: relative; width: 100%; border-radius: 10px; overflow: hidden; }
.ko-host { width: 100%; }
.ko-lab { position: absolute; transform: translate(-50%, -50%); font-family: Newsreader, Georgia, serif;
  font-size: 1.15rem; color: #141413; pointer-events: none; white-space: nowrap; transition: opacity .15s; }
.ko-x { color: #9a6a12; font-weight: 600; }
.ko-t { color: #4d4c48; font-size: 1rem; }
.ko-note { text-align: center; font-family: Newsreader, Georgia, serif; font-size: 1.05rem; color: #b53333; margin-top: 4px; }
.ko-key { position: absolute; right: 12px; top: 8px; font-size: .78rem; color: #66655f; font-family: Inter, sans-serif; }
.dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin: 0 3px 0 10px; vertical-align: middle; }
.dot.p { background: #c0433c; } .dot.n { background: #2f5d8c; }
</style>
