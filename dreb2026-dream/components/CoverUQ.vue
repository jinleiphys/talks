<script setup lang="ts">
// Cover image: why uncertainty quantification. A handful of measured points with error bars,
// and a family of curves that all describe them. The curves are draws from a Gaussian-process
// posterior conditioned on those points (RBF kernel), so they agree where there are data and
// fan out where there are none. Animation: each curve is m + L (z1 cos phi + z2 sin phi), a
// rotation of two standard-normal vectors, so every frame of every curve is an exact posterior
// draw. Generic illustration, not a nuclear calculation.
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { onMounted, onUnmounted, ref } from 'vue'

const host = ref<HTMLDivElement>()
const labels = ref<Array<{ text: string; left: string; top: string; cls: string }>>([])
let renderer: THREE.WebGLRenderer | undefined, raf = 0, disposed = false, observer: ResizeObserver | undefined

// ---------- Gaussian-process posterior (small dense linear algebra)
function chol(A: number[][]) {
  const n = A.length, L = A.map(() => new Array(n).fill(0))
  for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) {
    let s = A[i][j]; for (let k = 0; k < j; k++) s -= L[i][k] * L[j][k]
    L[i][j] = i === j ? Math.sqrt(Math.max(s, 1e-12)) : s / L[j][j]
  }
  return L
}
function solveChol(L: number[][], b: number[]) {
  const n = L.length, y = new Array(n).fill(0), x = new Array(n).fill(0)
  for (let i = 0; i < n; i++) { let s = b[i]; for (let k = 0; k < i; k++) s -= L[i][k] * y[k]; y[i] = s / L[i][i] }
  for (let i = n - 1; i >= 0; i--) { let s = y[i]; for (let k = i + 1; k < n; k++) s -= L[k][i] * x[k]; x[i] = s / L[i][i] }
  return x
}
let seed = 7
const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-12)) * Math.cos(2 * Math.PI * rand())

const NG = 110
const XG = Array.from({ length: NG }, (_, i) => i / (NG - 1))
const XD = [0.05, 0.12, 0.19, 0.26, 0.33, 0.40]
const truth = (x: number) => 0.5 + 0.22 * Math.sin(5.2 * x + 0.3) + 0.1 * x
const SN = 0.045
const YD = XD.map(x => truth(x) + SN * 0.8 * gauss())
const SF = 0.24, ELL = 0.2
const k = (a: number, b: number) => SF * SF * Math.exp(-0.5 * ((a - b) / ELL) ** 2)
const mu0 = 0.55
const Kdd = XD.map((a, i) => XD.map((b, j) => k(a, b) + (i === j ? SN * SN : 0)))
const Ld = chol(Kdd)
const alpha = solveChol(Ld, YD.map(y => y - mu0))
const Kgd = XG.map(a => XD.map(b => k(a, b)))
const MEAN = Kgd.map(row => mu0 + row.reduce((s, v, j) => s + v * alpha[j], 0))
const V = Kgd.map(row => solveChol(Ld, row))                     // (K_dd)^-1 k_d(x)
const COV = XG.map((a, i) => XG.map((b, j) => k(a, b) - Kgd[i].reduce((s, v, q) => s + v * V[j][q], 0) + (i === j ? 1e-6 : 0)))
const LG = chol(COV)
const SD = COV.map((r, i) => Math.sqrt(Math.max(r[i], 0)))
const mulL = (z: number[]) => LG.map((row, i) => { let s = 0; for (let j = 0; j <= i; j++) s += row[j] * z[j]; return s })

const NC = 30
const curves = Array.from({ length: NC }, () => ({
  a: mulL(Array.from({ length: NG }, gauss)), b: mulL(Array.from({ length: NG }, gauss)),
  phase: rand() * 2 * Math.PI, rate: 0.18 + 0.12 * rand(), z: (rand() - 0.5) * 0.9,
}))

// world mapping
const WX = (x: number) => -2.1 + 4.2 * x
const WY = (y: number) => (y - 0.55) * 2.9

onMounted(() => { try { build() } catch { /* the cover stays text-only without WebGL */ } })
onUnmounted(() => { disposed = true; cancelAnimationFrame(raf); observer?.disconnect(); renderer?.dispose(); renderer?.forceContextLoss(); renderer?.domElement.remove() })

function build() {
  const el = host.value!
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  el.appendChild(renderer.domElement)
  const scene = new THREE.Scene()
  const pm = new THREE.PMREMGenerator(renderer)
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.7; pm.dispose()
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8cfbd, 1.2))
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(-3, 5, 6); scene.add(key)
  const camera = new THREE.PerspectiveCamera(30, 1.6, 0.1, 100)

  // colour along x: ink blue where the data are, warm red where they are not
  const INK = new THREE.Color('#1b365d'), WARM = new THREE.Color('#c0432f')
  const colAt = (x: number) => INK.clone().lerp(WARM, THREE.MathUtils.smoothstep(x, 0.38, 0.95))

  // the 2-sigma envelope, a soft sheet behind the curves
  const env = new THREE.BufferGeometry()
  const envPos = new Float32Array(NG * 2 * 3), envCol = new Float32Array(NG * 2 * 4), idx: number[] = []
  for (let i = 0; i < NG; i++) {
    const x = XG[i], c = colAt(x), w = THREE.MathUtils.smoothstep(x, 0.3, 1.0) * (1 - THREE.MathUtils.smoothstep(x, 0.86, 1.0)) + 0.0
    envPos.set([WX(x), WY(MEAN[i] + 2 * SD[i]), -0.45, WX(x), WY(MEAN[i] - 2 * SD[i]), -0.45], i * 6)
    const a = (0.06 + 0.14 * w) * (1 - THREE.MathUtils.smoothstep(x, 0.9, 1.0))
    envCol.set([c.r, c.g, c.b, a, c.r, c.g, c.b, a], i * 8)
    if (i < NG - 1) idx.push(2 * i, 2 * i + 1, 2 * i + 2, 2 * i + 1, 2 * i + 3, 2 * i + 2)
  }
  env.setAttribute('position', new THREE.BufferAttribute(envPos, 3)); env.setAttribute('color', new THREE.BufferAttribute(envCol, 4)); env.setIndex(idx)
  scene.add(new THREE.Mesh(env, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, side: THREE.DoubleSide })))


  // curves: glossy tubes, colour graded along x, rebuilt from the rotating posterior draws
  const tubeMats: THREE.MeshPhysicalMaterial[] = []
  const tubes = curves.map(() => {
    const m = new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15, transparent: true, opacity: 0.55, depthWrite: false })
    tubeMats.push(m); const mesh = new THREE.Mesh(new THREE.BufferGeometry(), m); scene.add(mesh); return mesh
  })
  const pts = Array.from({ length: NG }, () => new THREE.Vector3())
  function rebuild(t: number) {
    curves.forEach((c, q) => {
      const ph = c.phase + c.rate * t, ca = Math.cos(ph), sa = Math.sin(ph)
      for (let i = 0; i < NG; i++) pts[i].set(WX(XG[i]), WY(MEAN[i] + c.a[i] * ca + c.b[i] * sa), c.z)
      const g = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 140, 0.016, 5, false)
      const pos = g.attributes.position, col = new Float32Array(pos.count * 3)
      for (let v = 0; v < pos.count; v++) { const x = (pos.getX(v) + 2.1) / 4.2, cc = colAt(x); col.set([cc.r, cc.g, cc.b], v * 3) }
      g.setAttribute('color', new THREE.BufferAttribute(col, 3))
      tubes[q].geometry.dispose(); tubes[q].geometry = g
    })
  }

  // data: glossy beads with error bars, in front
  const bead = new THREE.MeshPhysicalMaterial({ color: '#141413', roughness: 0.2, clearcoat: 1, metalness: 0.1 })
  const barMat = new THREE.MeshStandardMaterial({ color: '#141413', roughness: 0.5 })
  XD.forEach((x, i) => {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.085, 28, 18), bead); s.position.set(WX(x), WY(YD[i]), 0.6); scene.add(s)
    const h = 4 * SN * 2.9   // +-2 sigma
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, h, 8), barMat); bar.position.copy(s.position); scene.add(bar)
    for (const sgn of [-1, 1]) { const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.12, 8), barMat); cap.rotation.z = Math.PI / 2; cap.position.set(s.position.x, s.position.y + sgn * h / 2, 0.6); scene.add(cap) }
  })

  // labels
  const LAB = [
    { text: 'data', at: new THREE.Vector3(WX(0.22), WY(0.36), 0.6), cls: 'ink' },
    { text: 'prediction', at: new THREE.Vector3(WX(0.84), WY(1.3), 0), cls: 'warm' },
  ]
  const tmp = new THREE.Vector3()
  let W = 1, H = 1
  function resize() {
    W = el.clientWidth || 1; H = el.clientHeight || 1
    renderer!.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer!.setSize(W, H)
    camera.aspect = W / H; camera.updateProjectionMatrix(); placeLabels()
  }
  function placeLabels() {
    labels.value = LAB.map(l => { tmp.copy(l.at).project(camera); return { text: l.text, cls: l.cls, left: `${((tmp.x + 1) * W) / 2}px`, top: `${((1 - tmp.y) * H) / 2}px` } })
  }
  observer = new ResizeObserver(resize); observer.observe(el); resize()

  // fixed camera: the data stay put, only the posterior draws move
  const yaw = -0.22
  camera.position.set(8.4 * Math.sin(yaw), 1.2, 8.4 * Math.cos(yaw)); camera.lookAt(-0.35, 0.3, 0); placeLabels()
  const t0 = performance.now(), still = navigator.webdriver || matchMedia('(prefers-reduced-motion: reduce)').matches
  let lastBuild = -1
  function frame(now: number) {
    if (disposed) return
    raf = requestAnimationFrame(frame)
    if (document.hidden) return
    const t = still ? 2.0 : (now - t0) / 1000
    if (t - lastBuild > 1 / 30) { rebuild(t); lastBuild = t }
    renderer!.render(scene, camera)
  }
  raf = requestAnimationFrame(frame)
}
</script>

<template>
  <div class="cover-uq">
    <div ref="host" class="cover-uq-canvas" />
    <div v-for="l in labels" :key="l.text" class="cover-uq-label" :class="l.cls" :style="{ left: l.left, top: l.top }">{{ l.text }}</div>
  </div>
</template>

<style scoped>
.cover-uq { position: absolute; right: 16px; bottom: 22px; width: 525px; height: 380px; pointer-events: none; }
.cover-uq-canvas { position: absolute; inset: 0; }
.cover-uq-canvas :deep(canvas) { display: block; }
.cover-uq-label { position: absolute; transform: translate(-50%, 0); font-family: Inter, sans-serif; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; white-space: nowrap; }
.cover-uq-label.ink { color: #1b365d; }
.cover-uq-label.warm { color: #c0432f; }
</style>
