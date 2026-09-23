<script setup>
// Where x sits relative to b: density clouds of a deeply bound and a weakly bound orbital around the
// residue b, sampled from schematic radial densities, with the region where b absorbs shaded.
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { makeNucleus, makeRenderer, studioLights } from './nucleus.js'

const props = defineProps({ height: { type: Number, default: 300 } })
const host = ref(null)
let renderer, raf, ro

function sampleRadius(kind, rnd) {
  // deep: compact, peaked inside b; weak: long exponential tail outside b
  for (;;) {
    const r = rnd() * 11
    const p = kind === 'deep'
      ? r * r * r * r * Math.exp(-Math.pow(r / 1.35, 2)) / 3.5
      : r * r * Math.exp(-2 * 0.32 * Math.max(0, r - 2.6)) * Math.exp(-Math.pow(Math.max(0, 2.6 - r) / 1.2, 2)) / 7.0
    if (rnd() < p) return r
  }
}

onMounted(() => {
  const el = host.value
  const W = el.clientWidth, H = props.height
  renderer = makeRenderer(el, W, H)
  const scene = new THREE.Scene()
  const cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 200)
  cam.position.set(0, 4, 34); cam.lookAt(0, 0, 0)
  studioLights(scene)
  let s = 12345
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  const groups = []
  ;[['deep', -9.5, 0xb53333], ['weak', 9.5, 0x1B365D]].forEach(([kind, cx, col]) => {
    const g = new THREE.Group(); g.position.x = cx; scene.add(g); groups.push(g)
    // b: a packed nucleus; the dashed shell marks where b absorbs
    g.add(makeNucleus(8, 8, 0.5, kind === 'deep' ? 5 : 9))
    g.add(new THREE.Mesh(new THREE.SphereGeometry(2.3, 48, 32),
      new THREE.MeshBasicMaterial({ color: 0xb53333, transparent: true, opacity: 0.06, depthWrite: false })))
    // the x cloud
    const N = 2600, pos = new Float32Array(3 * N)
    for (let i = 0; i < N; i++) {
      const r = sampleRadius(kind, rnd), u = rnd() * 2 - 1, ph = rnd() * 2 * Math.PI, st = Math.sqrt(1 - u * u)
      pos[3 * i] = r * st * Math.cos(ph); pos[3 * i + 1] = r * u; pos[3 * i + 2] = r * st * Math.sin(ph)
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: col, size: 0.2, transparent: true, opacity: 0.6, depthWrite: false, depthTest: false })))
  })
  const clock = new THREE.Clock()
  const loop = () => {
    const t = clock.getElapsedTime()
    groups.forEach(g => { g.rotation.y = 0.25 * t; g.rotation.x = 0.18 })
    renderer.render(scene, cam); raf = requestAnimationFrame(loop)
  }
  loop()
  ro = new ResizeObserver(() => { const w = el.clientWidth; renderer.setSize(w, props.height); cam.aspect = w / props.height; cam.updateProjectionMatrix() })
  ro.observe(el)
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); ro && ro.disconnect(); renderer && renderer.dispose() })
</script>

<template>
  <div ref="host" :style="{ height: height + 'px', width: '100%', borderRadius: '10px', overflow: 'hidden' }"></div>
</template>
