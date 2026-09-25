<script setup>
// Small inline illustrations for the three boxes of slide 2, transparent so the box colour shows through.
//   shells  a level stack whose shell gap narrows and reopens: a magic number dissolving far from stability
//   hidden  a nucleus inside a frosted shell; the valence orbital only glimmers through: spectra see the whole
//   remove  one nucleon (x, gold) leaves the residue b and b stays: what knockout measures
//   weak    x on a wide orbit, mostly outside b (small separation energy)
//   deep    x on a tight orbit inside b's surface (large separation energy)
//   nnp     three nucleons, pair links always on; a central glow pulses: the three-nucleon force
//   dA      n + p above a target; the target lights up (A*) and n, p couple through it: induced V_3B
//   bxA     b + x above a target; the target lights up and so does b (b*): two eliminations
// Fixed pixel size (no clientWidth), so a slide mounted while hidden renders correctly when shown.
import { useIsSlideActive } from '@slidev/client'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { COL, makeNucleus, makeRenderer, studioLights, glow, releaseRenderer } from './nucleus.js'

const props = defineProps({ mode: { type: String, default: 'remove' }, size: { type: Number, default: 88 } })
const host = ref(null)
const active = useIsSlideActive()
let renderer, raf, drawn = false
const INK = 0x1B365D, RED = 0xb53333, MOSS = 0x4a6b3a
const ss = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u) }

function buildShells(scene) {
  // six levels; the gap between the 3rd and 4th opens and closes
  const bars = [], mat = new THREE.MeshPhysicalMaterial({ color: INK, roughness: 0.35, clearcoat: 0.8 })
  const geo = new THREE.BoxGeometry(2.4, 0.12, 0.45)
  const base = [-1.7, -1.2, -0.72, 0.72, 1.2, 1.7]
  base.forEach((y, i) => { const m = new THREE.Mesh(geo, mat); m.position.y = y; m.position.x = (i % 2) * 0.12 - 0.06; scene.add(m); bars.push(m) })
  const gap = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1, 0.3),
    new THREE.MeshBasicMaterial({ color: RED, transparent: true, opacity: 0.16, depthWrite: false }))
  scene.add(gap)
  return (t) => {
    const w = ss(-0.9, -0.2, Math.cos(2 * Math.PI * t / 7))   // open about 55% of the cycle, closed about 15%
    const half = 0.22 + 0.50 * w
    bars.forEach((m, i) => { m.position.y = i < 3 ? base[i] + (0.72 - half) : base[i] - (0.72 - half) })
    gap.scale.y = 2 * half - 0.13; gap.material.opacity = 0.32 * w
    scene.rotation.y = 0.35 * Math.sin(2 * Math.PI * t / 12) - 0.35
  }
}

function buildHidden(scene) {
  scene.add(makeNucleus(6, 6, 0.4, 4))
  // the valence orbital: a ring of dots, visible only as a glimmer through the frost
  const ring = new THREE.Group(), dm = new THREE.MeshBasicMaterial({ color: 0xe0a13a, transparent: true })
  for (let i = 0; i < 18; i++) {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), dm)
    d.position.set(1.35 * Math.cos(2 * Math.PI * i / 18), 0, 1.35 * Math.sin(2 * Math.PI * i / 18)); ring.add(d)
  }
  ring.rotation.x = 0.5; scene.add(ring)
  const frost = new THREE.Mesh(new THREE.SphereGeometry(1.75, 48, 32), new THREE.MeshPhysicalMaterial({
    color: 0xf3e6e0, roughness: 0.55, transmission: 0.9, thickness: 1.2, transparent: true, opacity: 0.9 }))
  scene.add(frost)
  return (t) => {
    ring.rotation.y = 0.6 * t; dm.opacity = 0.15 + 0.5 * (0.5 + 0.5 * Math.sin(2 * Math.PI * t / 5))
    scene.rotation.y = 0.2 * t
  }
}

function buildRemove(scene) {
  const b = makeNucleus(7, 7, 0.36, 6); scene.add(b)
  const x = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 16), new THREE.MeshPhysicalMaterial({ color: COL.x, roughness: 0.3, clearcoat: 0.6 }))
  const xg = glow(COL.x, 1.1, 0.7); xg.material.depthTest = false; x.add(xg); scene.add(x)
  const home = new THREE.Vector3(1.0, 0.35, 0.2), away = new THREE.Vector3(2.3, 1.5, 0.4)
  return (t) => {
    const u = t % 4.5, f = ss(0.6, 2.2, u), fade = 1 - ss(3.6, 4.3, u)
    x.position.copy(home).lerp(away, f)
    x.material.opacity = fade; x.material.transparent = true; xg.material.opacity = 0.7 * fade
    x.visible = fade > 0.02 || u < 0.6
    b.rotation.y = 0.25 * t
  }
}

function buildOrbit(scene, deep) {
  const b = makeNucleus(8, 8, 0.36, deep ? 5 : 9); scene.add(b)
  const x = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 16), new THREE.MeshPhysicalMaterial({ color: COL.x, roughness: 0.3, clearcoat: 0.6 }))
  const xg = glow(COL.x, deep ? 1.3 : 1.2, deep ? 0.8 : 0.7); xg.material.depthTest = false; x.add(xg); scene.add(x)
  // the orbit as a faint ring of dots
  const R = deep ? 0.9 : 1.9, dm = new THREE.MeshBasicMaterial({ color: COL.x, transparent: true, opacity: 0.7, depthTest: !deep })
  const ring = new THREE.Group(); ring.rotation.x = 1.15
  for (let i = 0; i < 40; i++) {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), dm)
    d.position.set(R * Math.cos(2 * Math.PI * i / 40), 0, R * Math.sin(2 * Math.PI * i / 40)); ring.add(d)
  }
  scene.add(ring)
  const v = new THREE.Vector3()
  return (t) => {
    const a = (deep ? 1.1 : 0.55) * t
    v.set(R * Math.cos(a), 0, R * Math.sin(a)).applyEuler(ring.rotation); x.position.copy(v)
    b.rotation.y = 0.2 * t
  }
}

// a row of small glows from a to b (positions in scene coordinates), opacity set per frame
function linkDots(scene, n, color, size = 0.22) {
  return Array.from({ length: n }, () => { const g = glow(color, size, 0); g.material.depthTest = false; scene.add(g); return g })
}
function setLink(dots, a, b, op, t, phase = 0) {
  dots.forEach((g, i) => {
    const f = (i + 1) / (dots.length + 1)
    g.position.copy(a).lerp(b, f)
    g.material.opacity = op * (0.55 + 0.45 * Math.sin(7 * t - 5 * f + phase))
  })
}
function nucleon(isP, r = 0.34) {
  return new THREE.Mesh(new THREE.SphereGeometry(r, 28, 18), new THREE.MeshPhysicalMaterial({
    color: isP ? COL.proton : COL.neutron, roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.25 }))
}

function buildNNP(scene) {
  const g = new THREE.Group(); scene.add(g)
  const ns = [nucleon(false), nucleon(false), nucleon(true)]
  const home = [0, 1, 2].map(i => new THREE.Vector3(1.05 * Math.cos(Math.PI / 2 + 2 * Math.PI * i / 3), 1.05 * Math.sin(Math.PI / 2 + 2 * Math.PI * i / 3) - 0.1, 0))
  ns.forEach((m, i) => { m.position.copy(home[i]); g.add(m) })
  const pairs = [[0, 1], [1, 2], [2, 0]].map(() => linkDots(g, 5, 0x6f86a0, 0.26))
  const core = glow(0xf2c14e, 1.9, 0); core.position.set(0, -0.1, 0); core.material.depthTest = false; g.add(core)
  const tri = [0, 1, 2].map(() => linkDots(g, 4, 0xf2c14e, 0.26))
  return (t) => {
    const u = t % 4, w = ss(1.2, 1.8, u) * (1 - ss(2.8, 3.4, u))
    ns.forEach((m, i) => m.position.copy(home[i]).multiplyScalar(1 - 0.06 * w))
    ;[[0, 1], [1, 2], [2, 0]].forEach(([a, b], k) => setLink(pairs[k], ns[a].position, ns[b].position, 0.7, t, k))
    tri.forEach((d, k) => setLink(d, ns[k].position, core.position, 0.95 * w, t, k))
    core.material.opacity = 0.85 * w
    g.rotation.z = 0.12 * Math.sin(0.5 * t); g.rotation.y = 0.3 * Math.sin(0.35 * t)
  }
}

function buildTargetPair(scene, composite) {
  const A = makeNucleus(6, 6, 0.3, 11); A.position.set(0, -1.15, 0); scene.add(A)
  const Ag = glow(0xe9674f, 3.0, 0); Ag.position.copy(A.position); scene.add(Ag)
  const left = composite ? makeNucleus(5, 4, 0.26, 5) : nucleon(false, 0.3)
  const right = composite ? new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 16),
    new THREE.MeshPhysicalMaterial({ color: COL.x, roughness: 0.3, clearcoat: 0.6 })) : nucleon(true, 0.3)
  const lHome = new THREE.Vector3(-0.75, 1.0, 0), rHome = new THREE.Vector3(0.75, 1.05, 0)
  left.position.copy(lHome); right.position.copy(rHome); scene.add(left, right)
  if (composite) { const xg = glow(COL.x, 0.9, 0.6); xg.material.depthTest = false; right.add(xg) }
  const bg = glow(0xe9674f, 2.2, 0); bg.material.depthTest = false; scene.add(bg)
  const pair = linkDots(scene, 5, 0x6f86a0, 0.26)
  const down = linkDots(scene, 5, 0xf2c14e, 0.26), up = linkDots(scene, 5, 0xf2c14e, 0.26)
  const top = new THREE.Vector3()
  return (t) => {
    const u = t % 5
    const a = ss(0.8, 1.3, u) * (1 - ss(3.4, 3.9, u))                    // A* alive
    const d = ss(0.6, 1.1, u) * (1 - ss(1.9, 2.3, u))                    // right fragment excites A
    const r = ss(1.9, 2.4, u) * (1 - ss(3.2, 3.7, u))                    // A* couples back to the left fragment
    const bx = composite ? ss(2.3, 2.9, u) * (1 - ss(3.9, 4.5, u)) : 0   // b lifted to b* and back
    left.position.copy(lHome).add(new THREE.Vector3(0, 0.05 * Math.sin(1.3 * t), 0))
    right.position.copy(rHome).add(new THREE.Vector3(0, 0.05 * Math.sin(1.3 * t + 1.5), 0))
    setLink(pair, left.position, right.position, 0.65, t)
    top.copy(A.position).add(new THREE.Vector3(0, 0.75, 0))
    setLink(down, right.position, top, 0.95 * d, t)
    setLink(up, top, left.position, 0.95 * r, t, 1)
    Ag.material.opacity = 0.7 * a
    const q = 0.06 * a * Math.sin(15 * t); A.scale.set(1 + q, 1 - q, 1)
    bg.position.copy(left.position); bg.material.opacity = 0.75 * bx
    if (composite) left.scale.setScalar(1 + 0.14 * bx + 0.04 * bx * Math.sin(14 * t))
    A.rotation.y = 0.15 * t
  }
}

onMounted(() => {
  const S = props.size
  renderer = makeRenderer(host.value, S, S, { alpha: true })
  const scene = new THREE.Scene(); studioLights(scene)
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
  cam.position.set(0, 0.4, { shells: 8.5, hidden: 7.6, remove: 8.2, weak: 10.0, deep: 10.0, nnp: 8.0, dA: 9.0, bxA: 9.0 }[props.mode]); cam.lookAt(props.mode === 'remove' ? 0.7 : 0, props.mode === 'remove' ? 0.5 : 0, 0)
  const step = { shells: buildShells, hidden: buildHidden, remove: buildRemove,
                  weak: (sc) => buildOrbit(sc, false), deep: (sc) => buildOrbit(sc, true),
                  nnp: buildNNP, dA: (sc) => buildTargetPair(sc, false), bxA: (sc) => buildTargetPair(sc, true) }[props.mode](scene)
  const clock = new THREE.Clock()
  const loop = () => {
    step(clock.getElapsedTime())
    if (active.value || !drawn) { renderer.render(scene, cam); drawn = true }   // off-slide: keep one frame
    raf = requestAnimationFrame(loop)
  }
  loop()
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); releaseRenderer(renderer) })
</script>

<template>
  <div ref="host" class="mini-icon" :style="{ width: size + 'px', height: size + 'px' }"></div>
</template>

<style scoped>
.mini-icon { flex: none; }
</style>
