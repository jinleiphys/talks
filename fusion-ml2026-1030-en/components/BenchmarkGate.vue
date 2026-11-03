<script setup lang="ts">
// Slide 27: the build passes the benchmark gate and lights green; the physics
// questions beyond the gate stay open, and the gate cannot light them.
import { computed, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { INK, ease, mountStage } from '../utils/three-kit'
import SceneCaption, { type Beat } from './SceneCaption.vue'

const props = withDefaults(defineProps<{ step?: number; height?: number }>(), { step: 0, height: 300 })
const BEATS: Beat[] = [
  { title: '基准测试能检查什么', text: '程序编译、安装、运行正确；输入格式写对了；复现了已知配置的结果。', verdict: '程序装对了。', tone: 'ok' },
  { title: '还需要自己判断什么', text: '模型是否适合你的问题，参数是否合理，结果有何物理意义。', verdict: '这三件事要你自己判断。', tone: 'bad' },
]
const index = computed(() => Math.min(Math.max(Math.floor(props.step), 0), BEATS.length - 1))
const host = ref<HTMLDivElement>()
const tags = ref<{ key: string; text: string; cls: string; left: string; top: string; opacity: number }[]>([])
let stop: (() => void) | undefined
const QS = ['模型适合吗？', '参数合理吗？', '结果有何意义？']
const OKS = ['编译运行 ✓', '输入格式 ✓', '复现已知结果 ✓']

onMounted(() => {
  stop = mountStage(host.value!, { fov: 30, pos: [0.5, 2.3, 8.0], look: [0.4, -0.25, 0], env: 0.9 }, ({ scene, camera, renderer }) => {
    const phys = (color: number, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.35, clearcoat: 1, transparent: true, ...o })
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(9, 3.2), new THREE.MeshPhysicalMaterial({ color: 0xece9df, roughness: 0.9 })); floor.rotation.x = -Math.PI / 2; floor.position.y = -1.2; scene.add(floor)
    // Gate.
    const gmat = phys(INK.sand, { emissive: new THREE.Color(INK.green), emissiveIntensity: 0 })
    const gate = new THREE.Group(); gate.position.set(-1.0, -1.2, 0); scene.add(gate)
    for (const z of [-0.75, 0.75]) { const p = new THREE.Mesh(new RoundedBoxGeometry(0.18, 2.1, 0.18, 3, 0.05), gmat); p.position.set(0, 1.05, z); gate.add(p) }
    const beam = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.2, 1.75, 3, 0.05), gmat); beam.position.y = 2.15; gate.add(beam)
    // Build.
    const build = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.62, 0.62, 4, 0.1), phys(INK.ink)); build.position.set(-3.3, -0.86, 0); scene.add(build)
    const check = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.04, 14, 48), phys(INK.green, { opacity: 0 })); scene.add(check)
    // Boundary and open questions.
    const edge = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.75, -1.19, -1.5), new THREE.Vector3(0.75, -1.19, 1.5)]), new THREE.LineDashedMaterial({ color: INK.red, dashSize: 0.1, gapSize: 0.08, transparent: true, opacity: 0 }))
    edge.computeLineDistances(); scene.add(edge)
    const posts = QS.map((_, i) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 1, 32), phys(INK.amber, { opacity: 0.9 }))
      m.position.set(1.55 + i * 1.2, -1.2, -0.3 + i * 0.3); m.scale.y = 0.01; scene.add(m)
      return m
    })
    const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-3, 6, 7); scene.add(key)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0bc, 1.1))
    const v = new THREE.Vector3()
    const proj = (p: THREE.Vector3) => { v.copy(p).project(camera); const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight; return { left: `${(v.x + 1) * w / 2}px`, top: `${(1 - v.y) * h / 2}px` } }

    return (t, dt) => {
      const k = index.value
      build.position.x = ease(build.position.x, 0.1, dt, 1.6)
      const passed = build.position.x > -0.9
      build.rotation.y = Math.sin(t * 0.8) * 0.3
      gmat.emissiveIntensity = ease(gmat.emissiveIntensity, passed ? 0.55 : 0, dt, 4)
      gmat.color.lerp(new THREE.Color(passed ? 0xcfe0c4 : INK.sand), 1 - Math.exp(-dt * 4))
      check.position.set(build.position.x, -0.15, 0); check.rotation.y = t * 1.2
      ;(check.material as THREE.MeshPhysicalMaterial).opacity = ease((check.material as THREE.MeshPhysicalMaterial).opacity, passed ? 1 : 0, dt, 4)
      ;(edge.material as THREE.LineDashedMaterial).opacity = ease((edge.material as THREE.LineDashedMaterial).opacity, k >= 1 ? 0.9 : 0, dt, 4)
      const out: typeof tags.value = []
      posts.forEach((p, i) => {
        const hgt = k >= 1 ? 1.5 + i * 0.25 : 0.01
        p.scale.y = ease(p.scale.y, hgt, dt, 3.5 - i * 0.5)
        p.position.y = -1.2 + p.scale.y / 2 + (k >= 1 ? 0.04 * Math.sin(t * 1.5 + i) : 0)
        out.push({ key: 'q' + i, text: QS[i], cls: 'q', ...proj(new THREE.Vector3(p.position.x, -1.2 + p.scale.y + 0.3, p.position.z)), opacity: k >= 1 ? Math.min(1, p.scale.y) : 0 })
      })
      OKS.forEach((s, i) => out.push({ key: 'o' + i, text: s, cls: 'ok', ...proj(new THREE.Vector3(-1.0, 1.35 - i * 0.32, 0)), opacity: passed ? 1 : 0 }))
      out.push({ key: 'g', text: '基准', cls: 'gate', ...proj(new THREE.Vector3(-1.0, -1.45, 0.9)), opacity: 1 })
      out.push({ key: 'e', text: '基准测试无法判断', cls: 'edge', ...proj(new THREE.Vector3(0.75, -1.45, 1.4)), opacity: k >= 1 ? 1 : 0 })
      tags.value = out
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
.tag { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none; transition: opacity .5s; }
.q { font: 700 14px 'Songti SC', serif; color: #9a6a1c; background: #fbf3e2; padding: 2px 8px; border-radius: 4px; }
.ok { font: 600 13px 'PingFang SC', sans-serif; color: #48683a; }
.gate { font: 700 14px 'Songti SC', serif; color: #3d3d3a; }
.edge { font: 600 12px 'PingFang SC', sans-serif; color: #a83a32; }
</style>
