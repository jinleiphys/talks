<script setup lang="ts">
// Slide 25: skills sit on a shelf, unread. A task arrives; only the skill whose
// purpose matches slides out and is read. Cycles through a few tasks.
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { INK, ease, mountStage } from '../utils/three-kit'

const SKILLS = ['FRESCO', 'TALYS', 'SMASH', '文献检索', '作图', '审稿回复']
const TASKS = [
  { text: 'n + ⁹⁰Zr 弹性散射，50 MeV', skill: 0 },
  { text: '画出相移随能量的变化', skill: 4 },
  { text: '查这条引用是否存在', skill: 3 },
]
const COLORS = [INK.ink, 0x48683a, 0x8a5a3a, INK.inkLight, 0x6b5a8a, 0x9a6a1c]
const host = ref<HTMLDivElement>()
const tags = ref<{ key: string; text: string; cls: string; left: string; top: string; opacity: number }[]>([])
let stop: (() => void) | undefined

onMounted(() => {
  stop = mountStage(host.value!, { fov: 30, pos: [1.4, 1.8, 9.2], look: [0.1, -0.2, 0], env: 0.9 }, ({ scene, camera, renderer }) => {
    const phys = (color: number, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.4, clearcoat: 0.8, transparent: true, ...o })
    const shelf = new THREE.Mesh(new RoundedBoxGeometry(4.4, 0.12, 1.2, 3, 0.04), phys(INK.sand)); shelf.position.set(0, -1.05, 0); scene.add(shelf)
    const books = SKILLS.map((_, i) => {
      const h = 1.55 + ((i * 7) % 3) * 0.12
      const m = new THREE.Mesh(new RoundedBoxGeometry(0.5, h, 0.95, 3, 0.04), phys(COLORS[i]))
      const x = -1.75 + i * 0.7
      m.position.set(x, -0.99 + h / 2, 0); scene.add(m)
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.06, 0.97), phys(0xf3e9cf, { clearcoat: 0 })); band.position.y = h * 0.3; m.add(band)
      return { m, x, h }
    })
    const token = new THREE.Mesh(new THREE.OctahedronGeometry(0.2), phys(INK.red, { flatShading: true, emissive: new THREE.Color(INK.red), emissiveIntensity: 0.2 })); scene.add(token)
    const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-3, 5, 8); scene.add(key)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0bc, 1.1))
    const v = new THREE.Vector3()
    const proj = (p: THREE.Vector3) => { v.copy(p).project(camera); const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight; return { left: `${(v.x + 1) * w / 2}px`, top: `${(1 - v.y) * h / 2}px` } }
    const CYCLE = 4.5

    return (t, dt) => {
      const n = Math.floor(t / CYCLE) % TASKS.length, u = (t % CYCLE) / CYCLE
      const task = TASKS[n], tb = books[task.skill]
      // token flies in from the upper right, hovers over its book, then fades
      const from = new THREE.Vector3(2.6, 1.7, 0.6), to = new THREE.Vector3(tb.x, tb.h - 0.6, 0.9)
      const f = THREE.MathUtils.smoothstep(u, 0.05, 0.35)
      token.position.copy(from).lerp(to, f)
      token.rotation.y = t * 2
      ;(token.material as THREE.MeshPhysicalMaterial).opacity = Math.min(1, u / 0.05) * (u > 0.9 ? (1 - u) / 0.1 : 1)
      books.forEach((b, i) => {
        const pulled = i === task.skill && u > 0.35 && u < 0.92
        b.m.position.z = ease(b.m.position.z, pulled ? 0.75 : 0, dt, 5)
        b.m.position.y = ease(b.m.position.y, -0.99 + b.h / 2 + (pulled ? 0.25 : 0), dt, 5)
        b.m.rotation.y = ease(b.m.rotation.y, pulled ? -0.35 : 0, dt, 5)
        ;(b.m.material as THREE.MeshPhysicalMaterial).emissive.setHex(COLORS[i])
        ;(b.m.material as THREE.MeshPhysicalMaterial).emissiveIntensity = ease((b.m.material as THREE.MeshPhysicalMaterial).emissiveIntensity, pulled ? 0.35 : 0, dt, 5)
        ;(b.m.material as THREE.MeshPhysicalMaterial).opacity = ease((b.m.material as THREE.MeshPhysicalMaterial).opacity, pulled || u < 0.35 || u > 0.92 ? 1 : 0.55, dt, 5)
      })
      tags.value = [
        { key: 't', text: '任务：' + task.text, cls: 'task', ...proj(new THREE.Vector3(0, 1.75, 0)), opacity: Math.min(1, u / 0.05) * (u > 0.92 ? (1 - u) / 0.08 : 1) },
        ...books.map((b, i) => ({ key: 'b' + i, text: SKILLS[i], cls: 'spine' + (i === task.skill && u > 0.35 && u < 0.92 ? ' on' : ''), ...proj(new THREE.Vector3(b.x, b.m.position.y, b.m.position.z + 0.5)), opacity: 1 })),
      ]
      return true
    }
  })
})
onUnmounted(() => stop?.())
</script>

<template>
  <div class="shelf">
    <div ref="host" class="scene-canvas" />
    <div v-for="tg in tags" :key="tg.key" class="tag" :class="tg.cls" :style="{ left: tg.left, top: tg.top, opacity: tg.opacity }">{{ tg.text }}</div>
  </div>
</template>

<style scoped>
.shelf { position: relative; width: 100%; height: 100%; }
.scene-canvas { position: absolute; inset: 0; }
.tag { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none; }
.task { font: 600 14px 'PingFang SC', sans-serif; color: #fff; background: #a83a32; padding: 3px 10px; border-radius: 12px; }
.spine { font: 600 13px 'PingFang SC', sans-serif; color: rgba(255,255,255,.88); writing-mode: vertical-rl; letter-spacing: .08em; }
.spine.on { color: #fff; }
</style>
