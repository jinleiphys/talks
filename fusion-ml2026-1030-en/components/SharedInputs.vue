<script setup lang="ts">
// Slide 16: one wrong mass flows into both the program and its self-check;
// only the experiment, which shares nothing with them, raises the alarm.
import { computed, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { INK, dotTexture, ease, mountStage } from '../utils/three-kit'
import SceneCaption, { type Beat } from './SceneCaption.vue'

const props = withDefaults(defineProps<{ step?: number; height?: number }>(), { step: 0, height: 310 })
const BEATS: Beat[] = [
  { title: '程序和自查使用相同设定', text: '质量取约化质量 μ。程序算相移，自查时，解析解也使用这个 μ。', verdict: '两者一致，aₜ = 5.36 fm。', tone: 'ok' },
  { title: '质量写错，自查照样通过', text: '把 ħ²/2μ 写成 ħ²/2m，m 取核子质量 939 MeV。数值程序和解析解都用了这个错误的质量。', verdict: '两边犯了同一个错，相互比较仍然一致。', tone: 'bad' },
  { title: '与实验值比较', text: '实验值 aₜ = 5.42 fm 不依赖这套计算中的质量设定。程序给出 4.11 fm，差 24%。', verdict: '与实验对照，发现明显偏差。', tone: 'bad' },
  { title: '哪些结果可以用来对照', text: '实验值、自己推导的解析极限、已发表的数值、另一个人或另一个程序算的结果。', verdict: '核对时要留意：对照是否沿用了同一个错误设定。' },
]
const index = computed(() => Math.min(Math.max(Math.floor(props.step), 0), BEATS.length - 1))
const host = ref<HTMLDivElement>()
const tags = ref<Record<string, { left: string; top: string; opacity: number }>>({})
const text = computed(() => {
  const k = index.value
  return {
    mass: k === 0 ? '质量 μ = 469 MeV' : '质量 m = 939 MeV',
    code: '程序 · Numerov',
    check: '自查 · 解析解',
    agree: k === 0 ? '一致 ✓' : '仍然一致 ✓',
    result: k === 0 ? 'aₜ = 5.36 fm' : 'aₜ = 4.11 fm',
    exp: '实验 aₜ = 5.42 fm',
  }
})
let stop: (() => void) | undefined

onMounted(() => {
  stop = mountStage(host.value!, { fov: 30, pos: [0.2, 1.4, 10.2], look: [-0.4, 0, 0], env: 0.9 }, ({ scene, camera, renderer }) => {
    const phys = (color: number, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.15, transparent: true, ...o })
    const mass = new THREE.Mesh(new THREE.SphereGeometry(0.5, 48, 32), phys(INK.green)); mass.position.set(-3.7, 0, 0); scene.add(mass)
    const box = (y: number) => { const m = new THREE.Mesh(new RoundedBoxGeometry(1.9, 0.78, 0.4, 4, 0.1), phys(INK.ivory)); m.position.set(-0.6, y, 0); scene.add(m); return m }
    const code = box(1.0), check = box(-1.0)
    const agree = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.05, 16, 48), phys(INK.green)); agree.position.set(-0.6, 0, 0.1); scene.add(agree)
    const result = new THREE.Mesh(new THREE.SphereGeometry(0.34, 40, 28), phys(INK.ink)); result.position.set(2.6, 1.0, 0); scene.add(result)
    const exp = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), phys(INK.inkLight, { flatShading: true })); exp.position.set(2.6, -1.0, 0); scene.add(exp)
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTexture(0.2), color: INK.red, transparent: true, opacity: 0, depthWrite: false })); halo.scale.setScalar(2.2); halo.position.copy(result.position); scene.add(halo)

    // Flows: tube + travelling beads.
    const bead = new THREE.SphereGeometry(0.055, 12, 8)
    const flow = (pts: [number, number, number][], n = 9) => {
      const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)))
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 60, 0.018, 8, false), new THREE.MeshBasicMaterial({ color: INK.edge, transparent: true }))
      scene.add(tube)
      const mat = new THREE.MeshBasicMaterial({ color: INK.green, transparent: true })
      const beads = Array.from({ length: n }, () => { const b = new THREE.Mesh(bead, mat); scene.add(b); return b })
      return { curve, tube, mat, beads, o: 1 }
    }
    const fMassCode = flow([[-3.25, 0.2, 0], [-2.2, 0.95, 0], [-1.55, 1.0, 0]])
    const fMassCheck = flow([[-3.25, -0.2, 0], [-2.2, -0.95, 0], [-1.55, -1.0, 0]])
    const fCodeRes = flow([[0.35, 1.0, 0], [1.4, 1.05, 0], [2.25, 1.0, 0]], 7)
    const fExpRes = flow([[2.6, -0.55, 0], [2.75, 0, 0.1], [2.6, 0.62, 0]], 6)
    const flows = [fMassCode, fMassCheck, fCodeRes, fExpRes]

    const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-3, 5, 8); scene.add(key)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0bc, 1.1))

    const c = new THREE.Color(), v = new THREE.Vector3()
    const anchors: Record<string, [THREE.Object3D, number]> = { mass: [mass, -0.98], code: [code, 0], check: [check, 0], agree: [agree, 0.62], result: [result, 0.62], exp: [exp, -0.72] }
    return (t, dt) => {
      const k = index.value
      const wrong = k >= 1
      const r = 1 - Math.exp(-dt * 4)
      ;(mass.material as THREE.MeshPhysicalMaterial).color.lerp(c.setHex(wrong ? INK.red : INK.green), r)
      mass.scale.setScalar(1 + 0.04 * Math.sin(t * 2.4))
      for (const f of [fMassCode, fMassCheck, fCodeRes]) f.mat.color.lerp(c.setHex(wrong ? INK.red : INK.green), r)
      fExpRes.mat.color.lerp(c.setHex(INK.inkLight), r)
      // Experiment appears at step 2; at step 3 the shared links dim.
      const expOn = k >= 2 ? 1 : 0
      const dim = k === 3 ? 0.25 : 1
      for (const f of flows) {
        const target = f === fExpRes ? expOn : dim
        f.o = ease(f.o, target, dt, 4)
        ;(f.tube.material as THREE.MeshBasicMaterial).opacity = f.o * 0.8
        f.mat.opacity = f.o
        const n = f.beads.length
        f.beads.forEach((b, i) => { b.position.copy(f.curve.getPoint(((t * 0.32 + i / n) % 1))) })
      }
      ;(exp.material as THREE.MeshPhysicalMaterial).opacity = ease((exp.material as THREE.MeshPhysicalMaterial).opacity, expOn, dt, 4)
      exp.rotation.y = t * 0.6
      ;(halo.material as THREE.SpriteMaterial).opacity = k === 2 ? 0.35 + 0.25 * Math.sin(t * 5) : ease((halo.material as THREE.SpriteMaterial).opacity, 0, dt, 4)
      agree.rotation.y = t * 0.8
      for (const m of [code, check, agree, mass]) (m.material as THREE.Material).opacity = ease((m.material as THREE.Material).opacity, m === mass ? 1 : dim === 1 ? 1 : 0.45, dt, 4)

      const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight
      const out: typeof tags.value = {}
      for (const [name, [obj, dy]] of Object.entries(anchors)) {
        v.copy(obj.position); v.y += dy; v.project(camera)
        out[name] = { left: `${(v.x + 1) * w / 2}px`, top: `${(1 - v.y) * h / 2}px`, opacity: name === 'exp' ? expOn : (name === 'mass' || name === 'result' ? 1 : dim === 1 ? 1 : 0.5) }
      }
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
      <div v-for="(p, name) in tags" :key="name" class="tag3d" :class="[name, { alarm: name === 'result' && index >= 2, wrong: name === 'mass' && index >= 1 }]" :style="p">{{ text[name as keyof typeof text] }}</div>
      <div class="scene-footnote">示意；数值来自 demo/square_well.jl。</div>
    </div>
    <SceneCaption :beats="BEATS" :index="index" />
  </div>
</template>

<style scoped>
.scene-wrap { display: grid; grid-template-columns: minmax(0, 1fr) 250px; gap: 22px; width: 100%; }
.scene-viewport { position: relative; min-width: 0; }
.scene-canvas { position: absolute; inset: 0; }
.tag3d { position: absolute; transform: translate(-50%, -50%); font: 600 14px 'PingFang SC', sans-serif; color: #3d3d3a; white-space: nowrap; pointer-events: none; transition: opacity .4s, color .4s; }
.tag3d.code, .tag3d.check { color: #1B365D; }
.tag3d.agree { color: #48683a; font-size: 13px; }
.tag3d.result { color: #1B365D; font-size: 15px; }
.tag3d.result.alarm, .tag3d.mass.wrong { color: #a83a32; }
.tag3d.exp { color: #2D5A8A; }
.scene-footnote { position: absolute; bottom: 0; right: 0; font: 11px 'PingFang SC', sans-serif; color: #9a998f; }
</style>
