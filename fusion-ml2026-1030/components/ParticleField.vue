<script setup lang="ts">
// Ambient background: drifting points joined by fading links when close.
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { INK, dotTexture, mountStage, rng } from '../utils/three-kit'

const props = withDefaults(defineProps<{ tone?: 'dark' | 'light'; seed?: number; count?: number }>(), { tone: 'dark', seed: 1, count: 150 })
const host = ref<HTMLDivElement>()
let stop: (() => void) | undefined

onMounted(() => {
  const dark = props.tone === 'dark'
  stop = mountStage(host.value!, { fov: 50, pos: [0, 0, 10] }, ({ scene }) => {
    const rand = rng(props.seed * 97 + 3)
    const N = props.count, W = 11, H = 6.4, D = 4
    const pos = new Float32Array(N * 3), vel: number[] = []
    for (let i = 0; i < N; i++) {
      pos.set([(rand() - 0.5) * W * 2, (rand() - 0.5) * H * 2, (rand() - 0.5) * D * 2], i * 3)
      vel.push((rand() - 0.5) * 0.18, (rand() - 0.5) * 0.18, (rand() - 0.5) * 0.08)
    }
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const color = dark ? 0xcfe0f5 : INK.ink
    const blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending
    const points = new THREE.Points(pg, new THREE.PointsMaterial({ size: dark ? 0.16 : 0.15, map: dotTexture(0.3), color, transparent: true, opacity: dark ? 0.9 : 0.5, depthWrite: false, blending }))
    scene.add(points)

    // Links: preallocated segment buffer, alpha baked into vertex colour.
    const MAX = 900, lpos = new Float32Array(MAX * 6), lcol = new Float32Array(MAX * 6)
    const lg = new THREE.BufferGeometry()
    lg.setAttribute('position', new THREE.BufferAttribute(lpos, 3))
    lg.setAttribute('color', new THREE.BufferAttribute(lcol, 3))
    const lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: dark ? 0.55 : 0.45, depthWrite: false, blending }))
    scene.add(lines)
    const c = new THREE.Color(color), bg = new THREE.Color(dark ? 0x000000 : INK.paper)
    const tmp = new THREE.Color()
    const LINK = 2.2

    return (t, dt) => {
      for (let i = 0; i < N; i++) {
        for (let k = 0; k < 3; k++) {
          const lim = [W, H, D][k]
          let v = pos[i * 3 + k] + vel[i * 3 + k] * dt
          if (v > lim) v -= 2 * lim; else if (v < -lim) v += 2 * lim
          pos[i * 3 + k] = v
        }
      }
      pg.attributes.position.needsUpdate = true
      let n = 0
      for (let i = 0; i < N && n < MAX; i++) for (let j = i + 1; j < N && n < MAX; j++) {
        const dx = pos[i * 3] - pos[j * 3], dy = pos[i * 3 + 1] - pos[j * 3 + 1], dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (d > LINK) continue
        tmp.copy(bg).lerp(c, (1 - d / LINK) ** 1.5)
        lpos.set([pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2], pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]], n * 6)
        lcol.set([tmp.r, tmp.g, tmp.b, tmp.r, tmp.g, tmp.b], n * 6)
        n++
      }
      lg.setDrawRange(0, n * 2)
      lg.attributes.position.needsUpdate = true; lg.attributes.color.needsUpdate = true
      scene.rotation.y = Math.sin(t * 0.05) * 0.12
      return true
    }
  })
})
onUnmounted(() => stop?.())
</script>

<template>
  <div ref="host" class="particle-field" aria-hidden="true" />
</template>

<style scoped>
.particle-field { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
</style>
