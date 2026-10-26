<script setup lang="ts">
// Slide 13: references fall through three glass layers (exists, metadata, says it).
import { computed, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { INK, ease, mountStage } from '../utils/three-kit'
import SceneCaption, { type Beat } from './SceneCaption.vue'

const props = withDefaults(defineProps<{ step?: number; height?: number }>(), { step: 0, height: 300 })
const BEATS: Beat[] = [
  { title: '八条参考文献，信息看似齐全', text: 'AI 凭记忆列出的参考文献：作者、期刊、卷号、页码一应俱全。', verdict: '格式完整，不等于真实存在。' },
  { title: '第一步：文献是否存在', text: '在 INSPIRE 中搜索作者和关键词，检查 DOI 能否打开。查不到的两条停在这一层。', verdict: '编造的文献，第一层就拦住。', tone: 'bad' },
  { title: '第二步：书目信息是否正确', text: '作者、年份、卷号、页码逐项核对；BibTeX 直接从 INSPIRE 导出替换。', verdict: '信息有错的，改正后放行。' },
  { title: '第三步：原文是否支持这句话', text: '打开原文，找到你引用的那个结论。文章存在却没说这句话的，停在这里。', verdict: '这一步最容易被忽略。', tone: 'bad' },
]
const index = computed(() => Math.min(Math.max(Math.floor(props.step), 0), BEATS.length - 1))
const host = ref<HTMLDivElement>()
const tags = ref<{ text: string; left: string; top: string; on: boolean }[]>([])
let stop: (() => void) | undefined

type Fate = 'ok' | 'fake' | 'fix' | 'quote'
const FATES: Fate[] = ['ok', 'fake', 'quote', 'fix', 'ok', 'fake', 'fix', 'ok']
const LAYERS = [1.15, 0, -1.15]
const GAPS = [1.95, 0.58, -0.58, -1.9]

function target(f: Fate, k: number) {
  // returns [y, tilt, colour] for card fate f at step k
  if (f === 'fake' && k >= 1) return { y: LAYERS[0] + 0.47, rz: 0.55, c: INK.red, o: k >= 2 ? 0.45 : 1 }
  if (f === 'quote' && k >= 3) return { y: LAYERS[2] + 0.47, rz: -0.5, c: INK.red, o: 1 }
  const y = GAPS[Math.min(k, 3)]
  const c = k === 3 ? INK.green : f === 'fix' && k >= 2 ? INK.amber : INK.ivory
  return { y, rz: 0, c, o: 1 }
}

onMounted(() => {
  stop = mountStage(host.value!, { fov: 30, pos: [0.3, 5.6, 8.6], look: [0, -0.15, 0], env: 1 }, ({ scene, camera, renderer }) => {
    // Glass layers.
    LAYERS.forEach((y) => {
      const slab = new THREE.Mesh(new RoundedBoxGeometry(7.2, 0.1, 1.9, 4, 0.04), new THREE.MeshPhysicalMaterial({ color: 0xc4d3e6, roughness: 0.08, clearcoat: 1, transparent: true, opacity: 0.62, depthWrite: false }))
      slab.position.y = y; scene.add(slab)
      const lip = new THREE.Mesh(new THREE.BoxGeometry(7.1, 0.025, 0.025), new THREE.MeshBasicMaterial({ color: INK.ink }))
      lip.position.set(0, y + 0.04, 0.95); scene.add(lip)
    })
    // Reference cards.
    const cardGeo = new RoundedBoxGeometry(0.62, 0.8, 0.05, 3, 0.02)
    const lineGeo = new THREE.BoxGeometry(1, 0.03, 0.01)
    const cards = FATES.map((f, i) => {
      const g = new THREE.Group()
      const mat = new THREE.MeshPhysicalMaterial({ color: INK.ivory, roughness: 0.45, clearcoat: 0.6, transparent: true })
      g.add(new THREE.Mesh(cardGeo, mat))
      const lineMat = new THREE.MeshBasicMaterial({ color: INK.ink, transparent: true })
      for (let j = 0; j < 4; j++) {
        const l = new THREE.Mesh(lineGeo, j === 0 ? lineMat : new THREE.MeshBasicMaterial({ color: INK.edge, transparent: true }))
        l.scale.x = j === 0 ? 0.36 : 0.44 - (j === 3 ? 0.14 : 0); l.position.set(-0.03, 0.24 - j * 0.14, 0.032); g.add(l)
      }
      g.position.set(-2.9 + i * (5.8 / 7), GAPS[0], 0.15)
      scene.add(g)
      return { g, mat, f, col: new THREE.Color(INK.ivory), phase: i * 0.8 }
    })
    const key = new THREE.DirectionalLight(0xffffff, 2); key.position.set(-3, 6, 7); scene.add(key)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0bc, 1.2))

    const v = new THREE.Vector3(), tc = new THREE.Color()
    const NAMES = ['① 文献存在', '② 信息无误', '③ 原文支持']
    return (t, dt) => {
      const k = index.value
      for (const c of cards) {
        const tg = target(c.f, k)
        const bob = Math.sin(t * 1.6 + c.phase) * 0.03
        c.g.position.y = ease(c.g.position.y, tg.y + bob, dt, 4.5)
        c.g.rotation.z = ease(c.g.rotation.z, tg.rz, dt, 4)
        c.g.rotation.y = Math.sin(t * 0.7 + c.phase) * 0.12
        c.col.lerp(tc.setHex(tg.c), 1 - Math.exp(-dt * 4)); c.mat.color.copy(c.col)
        c.g.traverse((o: any) => { if (o.material) o.material.opacity = ease(o.material.opacity, tg.o, dt, 4) })
      }
      const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight
      tags.value = LAYERS.map((y, i) => {
        v.set(-3.65, y, 0.95).project(camera)
        return { text: NAMES[i], left: `${(v.x + 1) * w / 2}px`, top: `${(1 - v.y) * h / 2}px`, on: k > i }
      })
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
      <div v-for="tg in tags" :key="tg.text" class="layer-tag" :class="{ on: tg.on }" :style="{ left: tg.left, top: tg.top }">{{ tg.text }}</div>
      <div class="scene-footnote">示意：条目数为教学设定。</div>
    </div>
    <SceneCaption :beats="BEATS" :index="index" />
  </div>
</template>

<style scoped>
.scene-wrap { display: grid; grid-template-columns: minmax(0, 1fr) 250px; gap: 22px; width: 100%; }
.scene-viewport { position: relative; min-width: 0; }
.scene-canvas { position: absolute; inset: 0; }
.layer-tag { position: absolute; transform: translate(-100%, -50%); font: 600 14px 'PingFang SC', sans-serif; color: #9a998f; white-space: nowrap; padding: 3px 9px; border-radius: 4px; transition: all .4s; }
.layer-tag.on { color: #fff; background: #1B365D; }
.scene-footnote { position: absolute; bottom: 0; right: 0; font: 11px 'PingFang SC', sans-serif; color: #9a998f; }
</style>
