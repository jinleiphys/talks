<script setup lang="ts">
// Slide 11: every sentence of the summary is tied by a thread to a page or an
// equation of the paper; the inferred sentence has no thread and says so.
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { INK, mountStage } from '../utils/three-kit'

const host = ref<HTMLDivElement>()
const tags = ref<{ key: string; text: string; cls: string; left: string; top: string }[]>([])
let stop: (() => void) | undefined

const CLAIMS = [
  { text: '解决什么问题', page: 1, cls: '' },
  { text: '式 (12) 第二项', page: 4, cls: '' },
  { text: '计算的适用范围', page: 7, cls: '' },
  { text: '与实验的偏差来源', page: -1, cls: 'infer' },
]

onMounted(() => {
  stop = mountStage(host.value!, { fov: 30, pos: [0.3, 1.4, 8.6], look: [0.1, -0.1, -0.6], env: 0.9 }, ({ scene, camera, renderer }) => {
    // Paper: eight pages fanned in depth on the right.
    const pageGeo = new RoundedBoxGeometry(1.5, 2.0, 0.03, 2, 0.015)
    const lineGeo = new THREE.BoxGeometry(1, 0.035, 0.005)
    const pages: THREE.Group[] = []
    for (let i = 0; i < 8; i++) {
      const g = new THREE.Group()
      g.add(new THREE.Mesh(pageGeo, new THREE.MeshPhysicalMaterial({ color: INK.ivory, roughness: 0.6, clearcoat: 0.3 })))
      for (let j = 0; j < 9; j++) {
        const l = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({ color: j === 0 ? INK.ink : INK.edge }))
        l.scale.x = j === 0 ? 0.6 : 1.1 - ((j * 37) % 5) * 0.08; l.position.set(-0.04, 0.78 - j * 0.17, 0.02); g.add(l)
      }
      g.position.set(1.1 + i * 0.36, 0.05 - i * 0.03, -i * 0.32)
      g.rotation.y = -0.3
      scene.add(g); pages.push(g)
    }
    // Claims: chips on the left.
    const chips = CLAIMS.map((c, i) => {
      const m = new THREE.Mesh(new RoundedBoxGeometry(2.2, 0.46, 0.14, 4, 0.06), new THREE.MeshPhysicalMaterial({ color: c.page < 0 ? 0xf6ebe6 : INK.ivory, roughness: 0.35, clearcoat: 1 }))
      m.position.set(-2.5, 1.15 - i * 0.78, 0.3); scene.add(m)
      return m
    })
    // Threads with travelling beads.
    const beadGeo = new THREE.SphereGeometry(0.045, 12, 8)
    const threads = CLAIMS.map((c, i) => {
      const a = chips[i].position.clone().add(new THREE.Vector3(1.12, 0, 0))
      const b = c.page >= 0 ? pages[c.page].position.clone().add(new THREE.Vector3(-0.6, 0.45 - (i % 2) * 0.5, 0.05)) : new THREE.Vector3(0.6, a.y - 0.35, 0.6)
      const mid = a.clone().lerp(b, 0.5).add(new THREE.Vector3(0, 0.45, 0.6))
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
      const infer = c.page < 0
      if (infer) {
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)), new THREE.LineDashedMaterial({ color: INK.red, dashSize: 0.09, gapSize: 0.07 }))
        line.computeLineDistances(); scene.add(line)
      } else {
        scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 50, 0.014, 8, false), new THREE.MeshBasicMaterial({ color: INK.inkSoft })))
      }
      const mat = new THREE.MeshBasicMaterial({ color: infer ? INK.red : INK.ink })
      const beads = infer ? [] : [0, 1, 2].map(() => { const m = new THREE.Mesh(beadGeo, mat); scene.add(m); return m })
      const pin = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), new THREE.MeshPhysicalMaterial({ color: infer ? INK.red : INK.ink, clearcoat: 1 }))
      pin.position.copy(b); scene.add(pin)
      return { curve, beads, b, infer, pin }
    })
    const key = new THREE.DirectionalLight(0xffffff, 2); key.position.set(-3, 5, 8); scene.add(key)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0bc, 1.1))
    const v = new THREE.Vector3()
    const proj = (p: THREE.Vector3) => { v.copy(p).project(camera); const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight; return { left: `${(v.x + 1) * w / 2}px`, top: `${(1 - v.y) * h / 2}px` } }

    return (t) => {
      threads.forEach((th, i) => {
        th.beads.forEach((b, j) => b.position.copy(th.curve.getPoint((t * 0.28 + j / 3 + i * 0.13) % 1)))
        th.pin.scale.setScalar(1 + 0.25 * Math.max(0, Math.sin(t * 2.2 - i)))
      })
      pages.forEach((p, i) => { p.position.y = 0.05 - i * 0.03 + 0.03 * Math.sin(t * 0.9 + i * 0.6) })
      const out: typeof tags.value = []
      CLAIMS.forEach((c, i) => {
        out.push({ key: 'c' + i, text: c.text, cls: 'chip ' + c.cls, ...proj(chips[i].position) })
        const th = threads[i]
        out.push({ key: 'p' + i, text: c.page >= 0 ? (i === 1 ? '式 (12)，第 5 页' : `第 ${c.page + 1} 页`) : '推断，原文未说明', cls: 'cite ' + c.cls + (i === 1 ? ' below' : ''), ...proj(th.b.clone().add(new THREE.Vector3(0, i === 1 ? -0.15 : 0.2, 0))) })
      })
      tags.value = out
      return true
    }
  })
})
onUnmounted(() => stop?.())
</script>

<template>
  <div class="trace">
    <div ref="host" class="scene-canvas" />
    <div v-for="tg in tags" :key="tg.key" class="tag" :class="tg.cls" :style="{ left: tg.left, top: tg.top }">{{ tg.text }}</div>
  </div>
</template>

<style scoped>
.trace { position: relative; width: 100%; height: 100%; }
.scene-canvas { position: absolute; inset: 0; }
.tag { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none; }
.chip { font: 600 14px 'PingFang SC', sans-serif; color: #1d1c1a; }
.chip.infer { color: #a83a32; }
.cite { font: 600 12px 'PingFang SC', sans-serif; color: #fff; background: #1B365D; padding: 2px 7px; border-radius: 4px; transform: translate(-50%, -100%); }
.cite.infer { background: #a83a32; }
.cite.below { transform: translate(-50%, 0); }
</style>
