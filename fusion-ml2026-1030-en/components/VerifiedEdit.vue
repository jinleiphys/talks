<script setup lang="ts">
// Slide 19: start from a verified input, change only the diff, check again.
import { computed, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { INK, ease, mountStage } from '../utils/three-kit'
import SceneCaption, { type Beat } from './SceneCaption.vue'

const props = withDefaults(defineProps<{ step?: number; height?: number }>(), { step: 0, height: 300 })
const BEATS: Beat[] = [
  { title: '选一份已验证的输入', text: '选手册示例或组里已验证的输入，先复现已知结果：指针落在参考值上。', verdict: '先确认原始输入能复现参考结果。', tone: 'ok' },
  { title: '修改并逐项核对', text: '复制一份，只改能量、靶核这几行。让它给出修改前后的差异（diff），每一处说明理由。', verdict: '几行改动，你能逐行看懂。' },
  { title: '检查修改后的结果', text: '和文献或另一个程序比同一个量；比之前，先统一质量、半径、自旋轨道项等约定。', verdict: '检查通过后，保存为新的参考输入。', tone: 'ok' },
]
const index = computed(() => Math.min(Math.max(Math.floor(props.step), 0), BEATS.length - 1))
const host = ref<HTMLDivElement>()
const tags = ref<{ key: string; text: string; cls: string; left: string; top: string; opacity: number }[]>([])
let stop: (() => void) | undefined

onMounted(() => {
  stop = mountStage(host.value!, { fov: 30, pos: [0.3, 1.9, 8.6], look: [0.2, -0.1, 0], env: 0.9 }, ({ scene, camera, renderer }) => {
    const phys = (color: number, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.4, clearcoat: 0.8, transparent: true, ...o })
    const lineGeo = new THREE.BoxGeometry(1, 0.05, 0.01)
    const doc = (hl: number[] = []) => {
      const g = new THREE.Group()
      g.add(new THREE.Mesh(new RoundedBoxGeometry(1.7, 2.2, 0.06, 3, 0.03), phys(INK.ivory)))
      const marks: THREE.Mesh[] = []
      for (let j = 0; j < 9; j++) {
        const m = new THREE.Mesh(lineGeo, phys(j === 0 ? INK.ink : INK.edge, { clearcoat: 0 }))
        m.scale.x = j === 0 ? 0.7 : 1.3 - ((j * 3) % 4) * 0.12; m.position.set(-0.05, 0.85 - j * 0.2, 0.04); g.add(m)
        if (hl.includes(j)) marks.push(m)
      }
      scene.add(g)
      return { g, marks }
    }
    const orig = doc(); orig.g.position.set(-2.6, 0, 0)
    const seal = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 16, 40), phys(INK.green)); seal.position.set(-1.95, -0.85, 0.12); scene.add(seal)
    const copy = doc([3, 5]); copy.g.position.set(-2.6, 0, -0.2)
    const seal2 = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 16, 40), phys(INK.green, { opacity: 0 })); scene.add(seal2)
    // Gauge: an arc with a needle, the benchmark comparison.
    const gauge = new THREE.Group(); gauge.position.set(2.7, -0.2, 0); scene.add(gauge)
    gauge.add(new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.05, 12, 64, Math.PI), phys(INK.sand)))
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.07, 12, 32, 0.22), phys(INK.green)); band.rotation.z = Math.PI / 2 - 0.11; gauge.add(band)
    const needle = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.85, 0.03), phys(INK.ink)); needle.geometry.translate(0, 0.42, 0); gauge.add(needle)
    gauge.add(new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 12), phys(INK.ink)))
    const ref2 = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), phys(INK.inkLight, { flatShading: true })); ref2.position.set(2.7, 1.25, 0); scene.add(ref2)

    const key = new THREE.DirectionalLight(0xffffff, 2); key.position.set(-3, 5, 8); scene.add(key)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0bc, 1.1))
    const amber = new THREE.Color(INK.amber), edge = new THREE.Color(INK.edge), v = new THREE.Vector3()
    const proj = (x: number, y: number, z = 0) => { v.set(x, y, z).project(camera); const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight; return { left: `${(v.x + 1) * w / 2}px`, top: `${(1 - v.y) * h / 2}px` } }

    return (t, dt) => {
      const k = index.value
      // copy slides out at step 1, moves to the gauge at step 2
      const cx = k === 0 ? -2.6 : k === 1 ? -0.2 : 0.2
      copy.g.position.x = ease(copy.g.position.x, cx, dt, 4)
      copy.g.position.z = ease(copy.g.position.z, k === 0 ? -0.2 : 0.35, dt, 4)
      copy.g.rotation.y = ease(copy.g.rotation.y, k === 2 ? -0.35 : 0, dt, 4)
      for (const m of copy.marks) (m.material as THREE.MeshPhysicalMaterial).color.lerp(k >= 1 ? amber : edge, 1 - Math.exp(-dt * 4))
      // needle: at the reference at step 0 and 2, off while the copy is unchecked
      const ang = k === 1 ? 0.9 + 0.05 * Math.sin(t * 2) : 0.02 * Math.sin(t * 3)
      needle.rotation.z = ease(needle.rotation.z, ang, dt, 3)
      seal.rotation.y = t * 0.8
      seal2.position.set(copy.g.position.x + 0.65, -0.85, copy.g.position.z + 0.12); seal2.rotation.y = t * 0.8
      ;(seal2.material as THREE.MeshPhysicalMaterial).opacity = ease((seal2.material as THREE.MeshPhysicalMaterial).opacity, k === 2 ? 1 : 0, dt, 4)
      ref2.rotation.y = t * 0.6
      tags.value = [
        { key: 'o', text: '已验证输入', cls: '', ...proj(-2.6, 1.35), opacity: 1 },
        { key: 'c', text: k === 0 ? '' : '你的修改版', cls: 'amber', ...proj(copy.g.position.x, 1.35, copy.g.position.z), opacity: k === 0 ? 0 : 1 },
        { key: 'd', text: '− E = 50 MeV　+ E = 30 MeV', cls: 'diff', ...proj(copy.g.position.x, -1.45, copy.g.position.z), opacity: k === 1 ? 1 : 0 },
        { key: 'g', text: '比较同一观测量', cls: '', ...proj(2.7, -0.55), opacity: 1 },
        { key: 'r', text: '文献 / 另一程序', cls: 'ink', ...proj(2.7, 1.7), opacity: 1 },
      ]
      return true
    }
  })
})
onUnmounted(() => stop?.())
</script>

<template>
  <div class="scene-wrap" :style="{ height: height + 'px' }">
    <div class="scene-viewport">
      <div ref="host" class="scene-canvas" />
      <div v-for="tg in tags" :key="tg.key" class="tag" :class="tg.cls" :style="{ left: tg.left, top: tg.top, opacity: tg.opacity }">{{ tg.text }}</div>
    </div>
    <SceneCaption :beats="BEATS" :index="index" />
  </div>
</template>

<style scoped>
.scene-wrap { display: grid; grid-template-columns: minmax(0, 1fr) 250px; gap: 22px; width: 100%; }
.scene-viewport { position: relative; min-width: 0; }
.scene-canvas { position: absolute; inset: 0; }
.tag { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none; font: 600 14px 'PingFang SC', sans-serif; color: #3d3d3a; transition: opacity .4s; }
.tag.amber { color: #9a6a1c; }
.tag.ink { color: #2D5A8A; }
.tag.diff { font: 600 13px 'SF Mono', Menlo, monospace; color: #9a6a1c; background: #fbf3e2; padding: 2px 8px; border-radius: 4px; }
</style>
