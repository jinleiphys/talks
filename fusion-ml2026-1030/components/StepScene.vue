<script setup lang="ts">
// Adapted from the skill's click-driven StepScene template.
// Every target state is determined by the click number, including reverse navigation.
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

type Mode = 'agent' | 'radius' | 'verifier'
type XYZ = [number, number, number]
type State = { pos: XYZ; opacity?: number; scale?: number; rz?: number }
type Beat = { title: string; text: string; verdict: string; states: Record<string, State> }
type Item = { object: THREE.Object3D; opacity: number }
type Label = { name: string; text: string; offset: XYZ }
const props = withDefaults(defineProps<{ mode?: Mode; step?: number; height?: number }>(), {
  mode: 'agent', step: 0, height: 334,
})
const host = ref<HTMLDivElement>()
const root = ref<HTMLDivElement>()
const ready = ref(false)
const failure = ref('')
const projected = ref<Record<string, { left: string; top: string; opacity: number }>>({})
const C = { paper: 0xf5f4ed, ivory: 0xfaf9f5, sand: 0xe8e6dc, edge: 0xc2c0b6, ink: 0x1b365d }
const RATIO = 1 + 1 / Math.cbrt(90)

// SCENE states, five beats for the loop and verifier, four for the radius convention.
const BEATS: Record<Mode, Beat[]> = {
  agent: [
    { title: '读取任务和文件', text: '大语言模型（LLM）读取任务和已验证输入，生成下一步操作。', verdict: '', states: { packet: { pos: [-3.1, 0.9, 0.7] }, receipt: { pos: [-3.1, -1.05, 0], opacity: 0.3 } } },
    { title: '运行程序', text: '工具在你的电脑上读写文件、运行程序。', verdict: '', states: { packet: { pos: [2.5, 0.9, 0.7] }, receipt: { pos: [-3.1, -1.05, 0], opacity: 0.3 } } },
    { title: '读取运行结果', text: '读取原始输出和退出状态，再调用检查脚本，判断任务是否完成。', verdict: '程序是否正常运行、结果是否正确，要分别检查。', states: { packet: { pos: [2.5, -1.05, 0.7] }, receipt: { pos: [-3.1, -1.05, 0], opacity: 0.3 } } },
    { title: '根据检查结果修改', text: '若检查未通过，模型根据证据修改输入，再调用工具。', verdict: '', states: { packet: { pos: [-3.1, 0.9, 0.7] }, receipt: { pos: [-3.1, -1.05, 0], opacity: 0.3 } } },
    { title: '保存结果文件', text: '检查通过后，保存实际输入、原始输出和验证记录。', verdict: '', states: { packet: { pos: [-3.1, -1.05, 0.7] }, receipt: { pos: [-3.1, -1.05, 0], opacity: 1 } } },
  ],
  radius: [
    { title: '先看靶核项', text: '中子 + 锆-90：Aₚ = 1，Aₜ = 90。r₀ 是半径系数，R 是势的半径。', verdict: 'KD02 使用 R = r₀ Aₜ^(1/3)。', states: { base: { pos: [-0.8, 0, 0] }, shell: { pos: [-0.8, 0, 0], opacity: 0.15 }, measure: { pos: [-0.8, 0, 0] }, match: { pos: [2, 0, 0], opacity: 0 } } },
    { title: '多加一个入射粒子项', text: '保留半径公式中的入射粒子项，势半径增加 r₀ Aₚ^(1/3)。', verdict: `半径比 = ${RATIO.toFixed(3)}，约大 22%。`, states: { base: { pos: [-0.8, 0, 0] }, shell: { pos: [-0.8, 0, 0], scale: RATIO, opacity: 1 }, measure: { pos: [-0.8, 0, 0], scale: RATIO }, match: { pos: [2, 0, 0], opacity: 0 } } },
    { title: 'ap=0 去掉入射粒子项', text: 'FRESCO 输入开关 ap=0 关闭这一项。中子的动力学质量保持原设置。', verdict: '势半径只保留靶核项。', states: { base: { pos: [-0.8, 0, 0] }, shell: { pos: [-0.8, 0, 0], opacity: 1 }, measure: { pos: [-0.8, 0, 0] }, match: { pos: [2, 0, 0], opacity: 0 } } },
    { title: '统一两个程序的半径定义', text: '和参考计算比较之前，先统一半径定义与其余物理设置。', verdict: '比较前，先确认物理设置一致。', states: { base: { pos: [-2, 0, 0] }, shell: { pos: [-2, 0, 0], opacity: 0.6 }, measure: { pos: [-2, 0, 0] }, match: { pos: [2, 0, 0], opacity: 1 } } },
  ],
  verifier: [
    { title: '准备完整与缺记录的输出', text: '上方输出完整；下方故意缺一条关键记录。测试断言是：缺记录必须被拒绝。', verdict: '反例只违反这一条规则。', states: { good: { pos: [-3.1, 0.95, 0.3] }, bad: { pos: [-3.1, -0.95, 0.3] }, gate: { pos: [0, 0, 0] }, bar: { pos: [0, -0.95, 0.55] } } },
    { title: '开启检查，缺记录的输出被拦住', text: '验证器拒绝缺记录的输出。因为符合“应拒绝”的断言，测试通过。', verdict: '验证器拒绝，测试通过。', states: { good: { pos: [-3.1, 0.95, 0.3] }, bad: { pos: [-1.25, -0.95, 0.3] }, gate: { pos: [0, 0, 0] }, bar: { pos: [0, -0.95, 0.55] } } },
    { title: '暂时关掉目标检查', text: '在隔离副本关闭这一条检查。坏输出穿过验证器，形成误报通过。', verdict: '缺记录的输出被接受。', states: { good: { pos: [-3.1, 0.95, 0.3] }, bad: { pos: [2.7, -0.95, 0.3] }, gate: { pos: [0, 0, 0], opacity: 0.2 }, bar: { pos: [0, -2, 0.55], opacity: 0.2 } } },
    { title: '原测试必须失败', text: '“应拒绝”的断言现在不满足，测试应失败。若仍通过，它可能只触发了别的检查。', verdict: '验证器误接受，测试失败。', states: { good: { pos: [-3.1, 0.95, 0.3] }, bad: { pos: [2.7, -0.95, 0.3] }, gate: { pos: [0, 0, 0], opacity: 0.2 }, bar: { pos: [0, -2, 0.55], opacity: 0.2 } } },
    { title: '恢复检查与合法对照', text: '恢复目标检查：缺记录的输出被拒绝，完整输出能通过。', verdict: '拒绝反例，也接受完整输出。', states: { good: { pos: [2.7, 0.95, 0.3] }, bad: { pos: [-1.25, -0.95, 0.3] }, gate: { pos: [0, 0, 0] }, bar: { pos: [0, -0.95, 0.55] } } },
  ],
}
const index = computed(() => Math.min(Math.max(Math.floor(props.step), 0), BEATS[props.mode].length - 1))
const beat = computed(() => BEATS[props.mode][index.value])
const labels = ref<Label[]>([])
let renderer: THREE.WebGLRenderer | undefined
let scene: THREE.Scene
let camera: THREE.OrthographicCamera
let items: Record<string, Item> = {}
let raf = 0
let observer: ResizeObserver | undefined
let lastTime = 0
let disposed = false
const baseOpacity = new Map<THREE.Material, number>()
const targetPosition = new THREE.Vector3()
const labelPosition = new THREE.Vector3()
const instant = () => navigator.webdriver || matchMedia('(prefers-reduced-motion: reduce)').matches

function material(color = C.ivory, opacity = 1) {
  return new THREE.MeshPhysicalMaterial({ color, roughness: 0.42, clearcoat: 0.7, clearcoatRoughness: 0.2, metalness: 0, transparent: true, opacity })
}
function block(w: number, h: number, d: number, color = C.ivory) {
  return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(d / 3, 0.07)), material(color))
}
function paper(missing = false) {
  const group = new THREE.Group()
  group.add(block(1.25, 0.86, 0.08))
  for (let i = 0; i < 4; i++) {
    if (missing && i === 2) continue
    const line = block(i === 0 ? 0.65 : 0.82, 0.025, 0.012, i === 0 ? C.ink : C.edge)
    line.position.set(-0.07, 0.23 - i * 0.15, 0.05)
    group.add(line)
  }
  return group
}
function register(name: string, object: THREE.Object3D, pos: XYZ = [0, 0, 0]) {
  object.position.set(...pos)
  items[name] = { object, opacity: 1 }
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh || child instanceof THREE.Line)) return
    const mats = Array.isArray(child.material) ? child.material : [child.material]
    for (const m of mats) { m.transparent = true; baseOpacity.set(m, m.opacity) }
  })
  scene.add(object)
  return object
}
function connect(points: XYZ[], arrow = true) {
  const path = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)))
  const tube = new THREE.Mesh(new THREE.TubeGeometry(path, 40, 0.017, 8, false), material(C.edge))
  scene.add(tube)
  if (arrow) {
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.23, 16), material(C.ink))
    head.position.copy(path.getPoint(0.95))
    head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), path.getTangent(0.95))
    scene.add(head)
  }
}
function buildAgent() {
  const node = (x: number, y: number, kind: number) => {
    const g = new THREE.Group()
    for (let i = 2; i >= 0; i--) {
      const plate = block(2.25, 1.12, 0.13, i === 0 ? C.ivory : C.sand)
      plate.position.set(i * 0.045, -i * 0.025, -i * 0.12)
      g.add(plate)
    }
    if (kind === 0) {
      const chip = block(0.62, 0.49, 0.12, C.sand); chip.position.set(0, 0.12, 0.14); g.add(chip)
      for (let i = 0; i < 3; i++) for (const sign of [-1, 1]) {
        const pin = block(0.07, 0.035, 0.03, C.ink); pin.position.set(sign * 0.39, 0.27 - i * 0.15, 0.15); g.add(pin)
      }
    } else if (kind === 1) {
      const screen = block(1, 0.56, 0.06, C.sand); screen.position.set(0, 0.1, 0.14); g.add(screen)
      const cursor = block(0.18, 0.035, 0.015, C.ink); cursor.position.set(-0.24, 0.08, 0.18); g.add(cursor)
      const row = block(0.38, 0.025, 0.015, C.edge); row.position.set(0.15, -0.06, 0.18); g.add(row)
    } else {
      const doc = paper(); doc.scale.setScalar(0.63); doc.position.set(0, 0.05, 0.14); g.add(doc)
    }
    register(['model', 'tools', 'output', 'record'][kind], g, [x, y, 0])
  }
  node(-3.1, 0.9, 0); node(2.5, 0.9, 1); node(2.5, -1.05, 2)
  const record = new THREE.Group()
  for (let i = 3; i >= 0; i--) { const doc = paper(); doc.position.set(i * 0.04, i * 0.015, -i * 0.08); record.add(doc) }
  register('receipt', record, [-3.1, -1.05, 0])
  connect([[-1.85, 0.9, 0], [-0.35, 0.9, 0], [1.25, 0.9, 0]])
  connect([[2.5, 0.25, 0], [3.75, -0.05, 0], [2.5, -0.43, 0]])
  connect([[1.25, -1.05, 0], [-0.45, -0.8, 0], [-1.85, 0.45, 0]])
  connect([[1.25, -1.3, 0], [-0.45, -1.9, 0], [-2.3, -1.5, 0]])
  const packet = new THREE.Mesh(new THREE.SphereGeometry(0.15, 28, 20), material(C.ink))
  register('packet', packet)
  labels.value = [
    { name: 'model', text: '模型 · AI', offset: [0, -0.36, 0.25] },
    { name: 'tools', text: '工具 · 实际执行', offset: [0, -0.36, 0.25] },
    { name: 'output', text: '输出 · 退出状态', offset: [0, -0.36, 0.25] },
    { name: 'receipt', text: '输入 · 输出 · 验证记录', offset: [0, -0.85, 0] },
  ]
}
function sphereGrid() {
  const g = new THREE.Group()
  const r = 1.32
  for (const latitude of [-0.65, 0, 0.65]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(Math.sqrt(r * r - latitude * latitude), 0.009, 6, 72), material(C.ink, 0.6))
    ring.rotation.x = Math.PI / 2; ring.position.y = latitude; g.add(ring)
  }
  for (let i = 0; i < 5; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.009, 6, 72), material(C.ink, 0.6))
    ring.rotation.y = Math.PI * i / 5; g.add(ring)
  }
  return g
}
function buildRadius() {
  const sphere = () => new THREE.Mesh(new THREE.SphereGeometry(1.32, 64, 40), material(C.sand))
  register('base', sphere())
  register('shell', sphereGrid())
  const match = new THREE.Group(); match.add(sphere()); match.add(sphereGrid()); register('match', match)
  const measure = new THREE.Group()
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 1.32, 10), material(C.ink))
  shaft.rotation.z = Math.PI / 2; shaft.position.set(0.66, 0, 1.9); measure.add(shaft)
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.17, 16), material(C.ink))
  arrow.rotation.z = -Math.PI / 2; arrow.position.set(1.25, 0, 1.9); measure.add(arrow)
  register('measure', measure)
  labels.value = [
    { name: 'base', text: '势半径 R', offset: [0, -1.72, 0] },
    { name: 'match', text: '参考计算', offset: [0, -1.72, 0] },
  ]
}
function buildVerifier() {
  const gate = new THREE.Group()
  for (const x of [-0.5, 0.5]) { const post = block(0.12, 3.25, 0.16, C.sand); post.position.x = x; gate.add(post) }
  for (const y of [-1.62, 1.62]) { const beam = block(1.12, 0.12, 0.16, C.sand); beam.position.y = y; gate.add(beam) }
  const badge = block(0.65, 0.06, 0.04, C.ink); badge.position.y = 1.63; gate.add(badge)
  register('gate', gate)
  register('bar', block(1.12, 0.12, 0.12, C.ink))
  register('good', paper())
  register('bad', paper(true))
  for (const y of [-0.95, 0.95]) connect([[-2.35, y, -0.25], [0, y, -0.25], [2.1, y, -0.25]])
  labels.value = [
    { name: 'gate', text: '验证器', offset: [0, 2.03, 0] },
    { name: 'good', text: '完整输出', offset: [0, 0.73, 0] },
    { name: 'bad', text: '缺一条记录', offset: [0, -0.76, 0] },
  ]
}
function apply(k: number) {
  let remaining = 0
  for (const [name, target] of Object.entries(beat.value.states)) {
    const item = items[name]
    if (!item) continue
    targetPosition.set(...target.pos)
    item.object.position.lerp(targetPosition, k)
    const scale = THREE.MathUtils.lerp(item.object.scale.x, target.scale ?? 1, k)
    item.object.scale.setScalar(scale)
    item.object.rotation.z = THREE.MathUtils.lerp(item.object.rotation.z, target.rz ?? 0, k)
    item.opacity = THREE.MathUtils.lerp(item.opacity, target.opacity ?? 1, k)
    item.object.traverse((child) => {
      if (!(child instanceof THREE.Mesh || child instanceof THREE.Line)) return
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      for (const m of mats) m.opacity = (baseOpacity.get(m) ?? 1) * item.opacity
    })
    remaining += item.object.position.distanceTo(targetPosition) + Math.abs(scale - (target.scale ?? 1)) + Math.abs(item.opacity - (target.opacity ?? 1))
  }
  return remaining
}
function placeLabels() {
  const w = host.value?.clientWidth || 1
  const result: typeof projected.value = {}
  for (const label of labels.value) {
    const item = items[label.name]
    if (!item) continue
    labelPosition.copy(item.object.position).add(new THREE.Vector3(...label.offset)).project(camera)
    result[label.name] = { left: `${(labelPosition.x + 1) * w / 2}px`, top: `${(1 - labelPosition.y) * props.height / 2}px`, opacity: item.opacity }
  }
  projected.value = result
}
function draw(now = performance.now()) {
  raf = 0
  if (!renderer || disposed || document.hidden || failure.value) return
  const dt = Math.min((now - lastTime) / 1000 || 0.016, 0.06)
  lastTime = now
  const remaining = apply(instant() ? 1 : 1 - Math.exp(-dt * 10))
  renderer.render(scene, camera)
  placeLabels()
  ready.value = true
  root.value?.setAttribute('data-frame-step', String(index.value))
  root.value?.setAttribute('data-settled', remaining < 0.001 ? 'true' : 'false')
  if (remaining >= 0.001) raf = requestAnimationFrame(draw)
}
function schedule() {
  if (!renderer || failure.value) return
  cancelAnimationFrame(raf)
  lastTime = performance.now() - 16
  draw()
}
function resize() {
  const w = host.value?.clientWidth || 0
  if (!renderer || w === 0) return
  const h = props.height
  const half = props.mode === 'radius' ? 2.18 : 2.6
  camera.left = -half * w / h; camera.right = half * w / h
  camera.top = half; camera.bottom = -half; camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.max(0.75, Math.min(devicePixelRatio, 1.6, Math.sqrt(1.4e6 / (w * h)))))
  renderer.setSize(w, h)
  schedule()
}
function visibility() { if (document.hidden) cancelAnimationFrame(raf); else schedule() }
onMounted(() => {
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
    renderer.setClearColor(C.paper, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    host.value!.appendChild(renderer.domElement)
    renderer.domElement.setAttribute('aria-label', '点击驱动的三维教学场景')
    renderer.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault(); cancelAnimationFrame(raf); failure.value = '图形上下文已丢失，请刷新页面，或使用逐步展开版 PDF。'
    })
    renderer.domElement.addEventListener('webglcontextrestored', () => { failure.value = ''; schedule() })
    scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environmentIntensity = 0.6
    pmrem.dispose()
    camera = new THREE.OrthographicCamera(-5, 5, 2.6, -2.6, 0.1, 100)
    camera.position.set(0.65, 1.9, 14); camera.lookAt(0, 0, 0)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd1c9b5, 1.6))
    const key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(-4, 6, 8); scene.add(key)
    const fill = new THREE.DirectionalLight(0xfff6e6, 0.6); fill.position.set(5, -1, 5); scene.add(fill)
    if (props.mode === 'agent') buildAgent()
    else if (props.mode === 'radius') buildRadius()
    else buildVerifier()
    apply(1)
    observer = new ResizeObserver(resize); observer.observe(host.value!)
    document.addEventListener('visibilitychange', visibility)
    resize()
  } catch {
    failure.value = '当前浏览器无法创建 WebGL 场景。请使用支持 WebGL 的浏览器，或逐步展开版 PDF。'
  }
})
watch(index, schedule)
onUnmounted(() => {
  disposed = true; cancelAnimationFrame(raf); observer?.disconnect()
  document.removeEventListener('visibilitychange', visibility)
  const geometries = new Set<THREE.BufferGeometry>()
  const materials = new Set<THREE.Material>()
  scene?.traverse((child) => {
    if (!(child instanceof THREE.Mesh || child instanceof THREE.Line)) return
    geometries.add(child.geometry)
    for (const m of Array.isArray(child.material) ? child.material : [child.material]) materials.add(m)
  })
  geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose())
  renderer?.dispose(); renderer?.forceContextLoss(); renderer?.domElement.remove()
})
</script>

<template>
  <div ref="root" class="step-scene" :data-scene="mode" :data-ready="ready" :data-step="index" :style="{ height: height + 'px' }">
    <div class="scene-viewport">
      <div ref="host" class="scene-canvas" />
      <div v-if="failure" class="scene-fallback">{{ failure }}</div>
      <div v-for="label in labels" :key="label.name" class="scene-label" :style="projected[label.name]">
        {{ mode === 'radius' && label.name === 'base' && index === 3 ? 'FRESCO' : label.text }}
      </div>
      <div v-if="mode === 'radius'" class="scene-footnote">势的几何示意；改变的是输入约定。</div>
      <div v-else class="scene-footnote">教学示意；纸张代表材料，连线代表操作依赖。</div>
    </div>
    <div class="scene-caption">
      <div class="scene-step">点击继续 · {{ index + 1 }} / {{ BEATS[mode].length }}</div>
      <h3>{{ beat.title }}</h3>
      <p>{{ beat.text }}</p>
      <div v-if="beat.verdict" class="scene-verdict">{{ beat.verdict }}</div>
      <div class="scene-beats"><span v-for="(_, i) in BEATS[mode]" :key="i" :class="{ current: i === index }" /></div>
    </div>
  </div>
</template>

<style scoped>
.step-scene { display: grid; grid-template-columns: minmax(0, 1fr) 228px; gap: 25px; width: 100%; }
.scene-viewport { position: relative; min-width: 0; border-bottom: 1px solid #e0ddd2; }
.scene-canvas { position: absolute; inset: 0; touch-action: none; }
.scene-canvas :deep(canvas) { display: block; }
.scene-label { position: absolute; transform: translate(-50%, -50%); font-family: Inter, 'PingFang SC', sans-serif; font-size: 17px; color: #3d3d3a; white-space: nowrap; pointer-events: none; }
.scene-footnote { position: absolute; bottom: 6px; left: 0; font-size: 12px; font-family: Inter, 'PingFang SC', sans-serif; color: #87867f; }
.scene-caption { display: flex; flex-direction: column; justify-content: center; padding-left: 21px; border-left: 1px solid #e0ddd2; }
.scene-caption .scene-step { font: 12px Inter, 'PingFang SC', sans-serif; color: #87867f; margin-bottom: 12px; letter-spacing: .05em; }
.scene-caption h3 { font-weight: 500; font-size: 25px; line-height: 1.3; margin: 0 0 15px; color: #141413; }
.scene-caption p { font-size: 21px; line-height: 1.6; margin: 0 0 16px; color: #3d3d3a; }
.scene-verdict { font-size: 19px; line-height: 1.5; color: #1B365D; padding-top: 12px; border-top: 1px solid #e0ddd2; }
.scene-beats { display: flex; gap: 7px; margin-top: 17px; }
.scene-beats span { width: 19px; height: 2px; background: #e0ddd2; }
.scene-beats span.current { background: #1B365D; }
.scene-fallback { position: absolute; inset: 0; display: flex; align-items: center; padding: 35px; font-size: 20px; color: #3d3d3a; background: #faf9f5; }
</style>

<style scoped>
.step-scene[data-scene="radius"] .scene-caption h3 { font-size: 22px; margin-bottom: 10px; }
.step-scene[data-scene="radius"] .scene-caption p { font-size: 18px; line-height: 1.45; margin-bottom: 10px; }
.step-scene[data-scene="radius"] .scene-verdict { font-size: 17px; padding-top: 9px; }
.step-scene[data-scene="radius"] .scene-step { margin-bottom: 9px; }
.step-scene[data-scene="radius"] .scene-beats { margin-top: 10px; }
</style>
