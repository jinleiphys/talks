<script setup>
// Small inline illustrations for the three boxes of slide 2, transparent so the box colour shows through.
//   shells  a level stack whose shell gap narrows and reopens: a magic number dissolving far from stability
//   hidden  a nucleus inside a frosted shell; the valence orbital only glimmers through: spectra see the whole
//   remove  one nucleon (x, gold) leaves the residue b and b stays: what knockout measures
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

onMounted(() => {
  const S = props.size
  renderer = makeRenderer(host.value, S, S, { alpha: true })
  const scene = new THREE.Scene(); studioLights(scene)
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
  cam.position.set(0, 0.4, { shells: 8.5, hidden: 7.6, remove: 8.2 }[props.mode]); cam.lookAt(props.mode === 'remove' ? 0.7 : 0, props.mode === 'remove' ? 0.5 : 0, 0)
  const step = { shells: buildShells, hidden: buildHidden, remove: buildRemove }[props.mode](scene)
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
