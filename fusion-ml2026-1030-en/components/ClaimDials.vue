<script setup lang="ts">
// Slide 21: one dial per row of the table. Each click swings one needle from
// the original wording to the polished one.
import { computed, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { INK, ease, mountStage } from '../utils/three-kit'

const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const DIALS = [
  { title: '结论强度', left: '吻合', right: '证明', from: 0.3, to: 0.95 },
  { title: '说的是哪个量', left: '精度', right: '准确度', from: 0.04, to: 0.96 },
  { title: '适用范围', left: '本模型内', right: '自然规律', from: 0.12, to: 0.95 },
]
const k = computed(() => Math.max(0, Math.min(3, Math.floor(props.step))))
const host = ref<HTMLDivElement>()
const tags = ref<{ key: string; text: string; cls: string; left: string; top: string }[]>([])
let stop: (() => void) | undefined

onMounted(() => {
  stop = mountStage(host.value!, { fov: 26, pos: [0, 0.9, 6.6], look: [0, -0.05, 0], env: 0.9 }, ({ scene, camera, renderer }) => {
    const phys = (color: number, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.35, clearcoat: 1, ...o })
    const R = 0.95
    const dials = DIALS.map((d, i) => {
      const g = new THREE.Group(); g.position.set((i - 1) * 4.3, -0.2, 0); scene.add(g)
      // arc: neutral left part, warm right part
      const a1 = new THREE.Mesh(new THREE.TorusGeometry(R, 0.07, 14, 64, Math.PI * 0.55), phys(INK.sand)); a1.rotation.z = Math.PI * 0.45; g.add(a1)
      const a2 = new THREE.Mesh(new THREE.TorusGeometry(R, 0.07, 14, 64, Math.PI * 0.45), phys(0xe7b7a8)); g.add(a2)
      for (let j = 0; j <= 10; j++) {
        const a = Math.PI - (j / 10) * Math.PI
        const tick = new THREE.Mesh(new THREE.BoxGeometry(0.02, j % 5 ? 0.09 : 0.16, 0.02), phys(INK.edge)); tick.position.set((R - 0.2) * Math.cos(a), (R - 0.2) * Math.sin(a), 0); tick.rotation.z = a - Math.PI / 2; g.add(tick)
      }
      const nmat = phys(INK.ink)
      const needle = new THREE.Mesh(new THREE.ConeGeometry(0.05, R * 0.95, 16), nmat); needle.geometry.translate(0, R * 0.475, 0); g.add(needle)
      const ghost = new THREE.Mesh(needle.geometry, new THREE.MeshBasicMaterial({ color: INK.ink, transparent: true, opacity: 0 })); g.add(ghost)
      g.add(new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 16), phys(INK.ink)))
      const angle = (v: number) => Math.PI / 2 - v * Math.PI
      needle.rotation.z = angle(d.from); ghost.rotation.z = angle(d.from)
      return { g, needle, nmat, ghost, angle, d }
    })
    const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-3, 5, 8); scene.add(key)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0bc, 1.1))
    const v = new THREE.Vector3(), red = new THREE.Color(INK.red), ink = new THREE.Color(INK.ink)
    const proj = (p: THREE.Vector3) => { v.copy(p).project(camera); const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight; return { left: `${(v.x + 1) * w / 2}px`, top: `${(1 - v.y) * h / 2}px` } }

    return (t, dt) => {
      const out: typeof tags.value = []
      dials.forEach((x, i) => {
        const moved = k.value > i
        const wob = moved ? 0.015 * Math.sin(t * 6) : 0
        x.needle.rotation.z = ease(x.needle.rotation.z, x.angle(moved ? x.d.to : x.d.from) + wob, dt, 3.5)
        x.nmat.color.lerp(moved ? red : ink, 1 - Math.exp(-dt * 4))
        const gm = x.ghost.material as THREE.MeshBasicMaterial
        gm.opacity = ease(gm.opacity, moved ? 0.22 : 0, dt, 4)
        const c = x.g.position
        out.push({ key: 't' + i, text: x.d.title, cls: 'title' + (moved ? ' on' : ''), ...proj(new THREE.Vector3(c.x, c.y + R + 0.32, 0)) })
        out.push({ key: 'l' + i, text: x.d.left, cls: 'end', ...proj(new THREE.Vector3(c.x - R - 0.45, c.y + 0.05, 0)) })
        out.push({ key: 'r' + i, text: x.d.right, cls: 'end warm' + (moved ? ' on' : ''), ...proj(new THREE.Vector3(c.x + R + 0.45, c.y + 0.05, 0)) })
      })
      tags.value = out
      return true
    }
  })
})
onUnmounted(() => stop?.())
</script>

<template>
  <div class="dials">
    <div ref="host" class="scene-canvas" />
    <div v-for="tg in tags" :key="tg.key" class="tag" :class="tg.cls" :style="{ left: tg.left, top: tg.top }">{{ tg.text }}</div>
  </div>
</template>

<style scoped>
.dials { position: relative; width: 100%; height: 100%; }
.scene-canvas { position: absolute; inset: 0; }
.tag { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none; transition: color .4s; }
.title { font: 700 16px 'Songti SC', serif; color: #3d3d3a; }
.title.on { color: #a83a32; }
.end { font: 600 13px 'PingFang SC', sans-serif; color: #6b6a63; }
.end.warm.on { color: #a83a32; }
</style>
