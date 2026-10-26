<script setup lang="ts">
// Cover: a slowly turning nucleus with three probe orbits and a dust field.
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { INK, dotTexture, mountStage, rng } from '../utils/three-kit'

const host = ref<HTMLDivElement>()
let stop: (() => void) | undefined

onMounted(() => {
  stop = mountStage(host.value!, { fov: 32, pos: [0, 0, 11], env: 0.55, exposure: 1.05 }, ({ scene }) => {
    const rand = rng(7)
    const root = new THREE.Group(); root.position.y = 1.0; root.position.x = 0.25; root.rotation.x = 0.25; scene.add(root)

    // Nucleons: greedy packing inside a sphere, alternating proton / neutron.
    const r = 0.25, R = 1.08, base: THREE.Vector3[] = []
    for (let tries = 0; tries < 20000 && base.length < 58; tries++) {
      const p = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).multiplyScalar(R)
      if (p.length() > R) continue
      if (base.every(q => q.distanceTo(p) > r * 1.82)) base.push(p)
    }
    const geo = new THREE.SphereGeometry(r, 40, 28)
    const mat = (color: number) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.18, sheen: 0.4, sheenColor: new THREE.Color(0xffffff) })
    const proton = mat(INK.red), neutron = mat(0xefe9da)
    const nucleons = base.map((p, i) => {
      const m = new THREE.Mesh(geo, i % 2 ? neutron : proton)
      m.position.copy(p); root.add(m)
      return { m, p, phase: rand() * 6.28 }
    })

    // Probe orbits with fading trails.
    const dot = dotTexture(0.35)
    const orbits = [0, 1, 2].map((k) => {
      const g = new THREE.Group()
      g.rotation.set(1.15 + k * 0.42, k * 1.05, k * 0.6)
      const radius = 1.75 + k * 0.17
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.006, 6, 160), new THREE.MeshBasicMaterial({ color: INK.inkSoft, transparent: true, opacity: 0.45 }))
      g.add(ring)
      const n = 34, pos = new Float32Array(n * 3), col = new Float32Array(n * 3)
      for (let i = 0; i < n; i++) { const f = (1 - i / n) ** 1.6; col.set([f, f * 0.95, f * 0.85], i * 3) }
      const tg = new THREE.BufferGeometry()
      tg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      tg.setAttribute('color', new THREE.BufferAttribute(col, 3))
      const trail = new THREE.Points(tg, new THREE.PointsMaterial({ size: 0.13, map: dot, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
      g.add(trail); root.add(g)
      return { radius, pos, tg, speed: 0.55 - k * 0.12, off: k * 2.1 }
    })

    // Dust.
    const N = 420, dpos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const v = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize().multiplyScalar(2.6 + rand() * 5)
      dpos.set([v.x, v.y, v.z - 2], i * 3)
    }
    const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dpos, 3))
    const dust = new THREE.Points(dg, new THREE.PointsMaterial({ size: 0.05, map: dot, color: INK.inkSoft, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending }))
    scene.add(dust)

    const key = new THREE.DirectionalLight(0xfff0d8, 2.6); key.position.set(-4, 5, 6); scene.add(key)
    const rim = new THREE.DirectionalLight(0x9cc0ff, 3.2); rim.position.set(5, 1, -4); scene.add(rim)
    scene.add(new THREE.AmbientLight(0x2d4a74, 0.6))

    return (t) => {
      root.rotation.y = t * 0.16
      for (const n of nucleons) n.m.position.set(n.p.x + 0.018 * Math.sin(t * 1.7 + n.phase), n.p.y + 0.018 * Math.cos(t * 1.3 + n.phase), n.p.z)
      for (const o of orbits) {
        for (let i = 0; i < 34; i++) {
          const a = (t * o.speed + o.off) - i * 0.045
          o.pos.set([o.radius * Math.cos(a), o.radius * Math.sin(a), 0], i * 3)
        }
        o.tg.attributes.position.needsUpdate = true
      }
      dust.rotation.y = t * 0.02
      return true
    }
  })
})
onUnmounted(() => stop?.())
</script>

<template>
  <div ref="host" class="hero-nucleus" aria-label="原子核示意动画" />
</template>

<style scoped>
.hero-nucleus { position: absolute; inset: 0; }
</style>
