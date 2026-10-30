<script setup lang="ts">
// Slide 3: 48Ca(d,p)49Ca at E_d = 10 MeV. Left: a running three.js scene in the nuclearjs style
// (vendor/vol.js volume rendering). Every length is in fm and comes from the calculation
// (figures/export_dp48ca_scene.py -> dp48ca_scene.json):
//   glass shell   half-value surface of the KD02 real potential, R = 4.33 fm, a = 0.67 fm
//   blue cloud    |psi|^2 of the 2p3/2 neutron bound state, m = j about the vertical axis
//   gold band     where 80% of the (d,p) cross section comes from (cutc scan): 6.5 to 9.3 fm
//   red glow      W(r) of the adiabatic deuteron potential, log scale shared by KD02 and CH89
//   rings         W = 1 MeV: 6.8 fm (KD02), 7.2 fm (CH89)
//   particles     a deuteron at impact parameter b survives with the eikonal T(b) of the shown
//                 potential and transfers with a probability following the cutc profile
// Right: the measured angular distribution and the two ADWA calculations (figures/make_dp48ca.py).
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import D from '../figures/dp48ca_scene.json'
import plot0 from '../figures/dp48ca_0.png'
import plot1 from '../figures/dp48ca_1.png'
import plot2 from '../figures/dp48ca_2.png'

const props = withDefaults(defineProps<{ step?: number; height?: number }>(), { step: 0, height: 356 })
const k = computed(() => Math.min(4, Math.max(0, props.step)))
const plotState = computed(() => [0, 1, 1, 1, 2][k.value])
const plots = [plot0, plot1, plot2]
const viewH = computed(() => props.height - 70)

const f1 = (x: number) => x.toFixed(1)
const beats = [
  { title: 'The experiment counts protons', text: 'A 10 MeV deuteron beam on ⁴⁸Ca. Protons are counted at each angle; that angular distribution is the only measured input.' },
  { title: 'The neutron is captured outside the nucleus', text: `Cutting the transfer coupling inside a radius in the calculation: 80% of the cross section comes from ${f1(D.band_kd[0])} to ${f1(D.band_kd[1])} fm (gold), well outside the ${f1(D.R_nuc)} fm nuclear radius (glass shell). Blue: the 2p₃/₂ orbital the neutron enters.` },
  { title: 'KD02: the deuteron is absorbed on the way in', text: `Red: the imaginary part W(r) of the KD02 deuteron potential (log scale). W = 1 MeV at ${f1(D.rW1_kd)} fm. A deuteron passing at 7 fm survives with probability 0.69.` },
  { title: 'CH89 absorbs further out', text: `Same real part, but W = 1 MeV at ${f1(D.rW1_ch)} fm; survival at 7 fm drops to 0.47. Fewer deuterons reach the gold band: the S = 1 cross section is 14% lower, 12% of it from the deuteron channel alone.` },
  { title: 'S absorbs the difference', text: 'Normalized to the same data: S = 0.49 with KD02, 0.58 with CH89, 17% apart; the curves coincide. Bound-state well fixed (r₀ 1.25, a 0.65): compare the ratio, not absolute S.' },
]

const host = ref<HTMLDivElement>()
const failure = ref('')
const labels = ref<Array<{ text: string; left: string; top: string; opacity: number; color: string }>>([])

let renderer: THREE.WebGLRenderer | undefined
let composer: EffectComposer | undefined
let raf = 0, observer: ResizeObserver | undefined, disposed = false

// radial tables from the calculation
const RT = D.r as number[]
const lerpTab = (xs: number[], ys: number[], x: number) => {
  if (x <= xs[0]) return ys[0]
  if (x >= xs[xs.length - 1]) return ys[ys.length - 1]
  const h = xs[1] - xs[0], i = Math.floor((x - xs[0]) / h), t = (x - xs[i]) / h
  return ys[i] * (1 - t) + ys[i + 1] * t
}
const W = { kd: (r: number) => lerpTab(RT, D.W_kd, r), ch: (r: number) => lerpTab(RT, D.W_ch, r) }
const T = { kd: (b: number) => lerpTab(D.b, D.T_kd, b), ch: (b: number) => lerpTab(D.b, D.T_ch, b) }
const PROF = { kd: (b: number) => Math.max(0, lerpTab(RT, D.prof_kd, b)), ch: (b: number) => Math.max(0, lerpTab(RT, D.prof_ch, b)) }
const PROF_MAX = Math.max(...(D.prof_kd as number[]))
const RW1 = { kd: D.rW1_kd as number, ch: D.rW1_ch as number }

onMounted(async () => {
  try {
    const g = globalThis as any
    g.THREE = THREE; g.BufferGeometryUtils = BufferGeometryUtils
    if (!g.VOL) await import('../vendor/vol.js')
    if (!disposed) build(g.VOL)
  } catch (e) { failure.value = `This browser cannot create the WebGL scene (${(e as Error)?.message ?? e}).` }
})
onUnmounted(() => {
  disposed = true
  cancelAnimationFrame(raf); observer?.disconnect()
  composer?.dispose(); renderer?.dispose(); renderer?.forceContextLoss(); renderer?.domElement.remove()
})

function build(VOL: any) {
  const el = host.value!
  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: true })
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.outputColorSpace = THREE.SRGBColorSpace
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(36, 2, 0.5, 3000)
  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(512, 256), 0.45, 0.5, 0.8))
  composer.addPass(new OutputPass())
  composer.addPass(new SMAAPass())
  scene.environment = VOL.studioEnv(renderer)
  VOL.lightRig(scene)
  // the ground colour as nuclearjs draws it on the bloom path
  const GROUND = new THREE.Color().setRGB(0.0115476, 0.0131218, 0.0174740, THREE.LinearSRGBColorSpace)
  scene.background = GROUND.clone(); scene.fog = new THREE.Fog(GROUND.clone(), 60, 160)

  const FLOOR = -11
  const stage = new VOL.Stage(scene)
  const grid = new THREE.GridHelper(160, 160, '#2a3245', '#1d2333')
  ;(grid.material as THREE.Material).opacity = 0.5
  stage.fadeGrid(grid); grid.position.y = FLOOR + 0.01; scene.add(grid)

  // ---------- volume: nucleus (half-value shell) and the 2p3/2 neutron orbital
  const RN = D.R_nuc as number, AN = D.a_nuc as number
  const nuc = (r: number) => 1 / (1 + Math.exp((r - RN) / AN))
  const orb = (r: number, u: number) => { const v = lerpTab(RT, D.u2p, r) / Math.max(r, 1e-3); return v * v * (1 - u * u) }
  const iso = [{ w: [1, 0, 0], level: 0.5, alpha: 0.2, rim: 1 }]
  const cNuc = { f: nuc, group: 0, color: new THREE.Color('#c9b9a6'), weight: 0.06, emission: 0.05 }
  const cOrb = { f: orb, group: 1, tf: { type: 'pow', g: 0.8, floor: 0.03 }, color: new THREE.Color('#3f8cff').multiplyScalar(1.5), weight: 1, emission: 1.2 }
  const F0 = VOL.field({ rmax: 13, NR: 200, NU: 96, tau: 3.2, iso, channels: [cNuc] })
  const F1 = VOL.field({ rmax: 13, NR: 200, NU: 96, tau: 3.2, iso, channels: [cNuc, cOrb] })
  const vol = new VOL.Volume({ steps: 150 })
  const gov = new VOL.Governor(vol)
  scene.add(vol.mesh)
  vol.setField(F0, false)
  vol.u.uFloorY.value = FLOOR
  stage.layout(FLOOR, 13); stage.setShadow(F1, 4)
  let orbShown = false, mix = 1

  // ---------- reaction plane (y = 0): absorption glow, W = 1 MeV rings, transfer band, detector
  const RMAP = 16
  function haloTexture(Wf: (r: number) => number) {
    const N = 512, c = document.createElement('canvas'); c.width = c.height = N
    const x = c.getContext('2d')!, img = x.createImageData(N, N)
    const Wref = Math.max(...(D.W_ch as number[]))
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const r = Math.hypot(i + 0.5 - N / 2, j + 0.5 - N / 2) / (N / 2) * RMAP
      const w = Wf(r)
      let v = w > 0 ? Math.max(0, Math.min(1, 1 + Math.log10(w / Wref) / 1.6)) : 0   // shared log scale, 1.6 decades
      v *= Math.min(1, Math.max(0, (r - (RN - 0.5)) / 1.5))                      // drawn outside the nucleus
      const q = 4 * (j * N + i)
      img.data[q] = 255 * v; img.data[q + 1] = 70 * v * v; img.data[q + 2] = 40 * v * v; img.data[q + 3] = 255
    }
    x.putImageData(img, 0, 0)
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t
  }
  const planeDisc = (tex: THREE.Texture) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(2 * RMAP, 2 * RMAP), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }))
    m.rotation.x = -Math.PI / 2; m.renderOrder = 20; scene.add(m); return m
  }
  const haloKD = planeDisc(haloTexture(W.kd)), haloCH = planeDisc(haloTexture(W.ch))

  const ringLine = (r: number, color: string, dashed = false) => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 200; i++) { const a = 2 * Math.PI * i / 200; pts.push(new THREE.Vector3(r * Math.cos(a), 0, r * Math.sin(a))) }
    const g = new THREE.BufferGeometry().setFromPoints(pts)
    const m = dashed ? new THREE.LineDashedMaterial({ color, dashSize: 0.6, gapSize: 0.4, transparent: true, opacity: 0 })
                     : new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0 })
    const l = new THREE.Line(g, m); if (dashed) l.computeLineDistances(); l.renderOrder = 21; scene.add(l); return l
  }
  const ringKD = ringLine(RW1.kd, '#8fb6ff'), ringCH = ringLine(RW1.ch, '#ff8a80')
  const band = new THREE.Mesh(new THREE.RingGeometry(D.band_kd[0], D.band_kd[1], 160, 1),
    new THREE.MeshBasicMaterial({ color: '#ffcf70', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
  band.rotation.x = -Math.PI / 2; band.renderOrder = 19; scene.add(band)
  const bandIn = ringLine(D.band_kd[0], '#ffd27a', true), bandOut = ringLine(D.band_kd[1], '#ffd27a', true)

  // detector arc at forward angles, 15 fm from the target
  const RDET = 15, A0 = THREE.MathUtils.degToRad(5), A1 = THREE.MathUtils.degToRad(50)
  const detPt = (a: number) => new THREE.Vector3(RDET * Math.cos(a), 0, -RDET * Math.sin(a))
  const arcPts: THREE.Vector3[] = []; for (let i = 0; i <= 60; i++) arcPts.push(detPt(A0 + (A1 - A0) * i / 60))
  scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(arcPts), 80, 0.22, 8),
    new THREE.MeshStandardMaterial({ color: '#9aa6bd', emissive: '#3a4255', emissiveIntensity: 0.6, roughness: 0.35, metalness: 0.2 })))

  // ---------- particles (nuclearjs ball + soft halo)
  const COL = { n: '#e8d6b0', p: '#4f8fff', d: '#9ec2ff' }
  const soft = (() => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 128
    const x = cv.getContext('2d')!, g = x.createRadialGradient(64, 64, 0, 64, 64, 64)
    g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(0.35, 'rgba(255,255,255,0.35)'); g.addColorStop(0.7, 'rgba(255,255,255,0.08)'); g.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = g; x.fillRect(0, 0, 128, 128)
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t
  })()
  const sphGeo = new THREE.SphereGeometry(1, 32, 16)
  const ball = (col: string, r: number) => {
    const c = new THREE.Color(col)
    const m = new THREE.Mesh(sphGeo, new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.6, roughness: 0.3, metalness: 0, transparent: true }))
    m.scale.setScalar(r); m.renderOrder = 22; return m
  }
  const glow = (col: string, s: number, op = 0.55) => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: soft, color: new THREE.Color(col), transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false }))
    sp.scale.setScalar(s); sp.renderOrder = 23; return sp
  }

  type Deut = { g: THREE.Group; b: number; x: number; fate: 'pass' | 'abs' | 'xfer'; xf: number; spin: number; age: number; dying: number; loud: boolean }
  type Prot = { m: THREE.Group; p: THREE.Vector3; v: THREE.Vector3; trail: THREE.Line; hist: THREE.Vector3[]; hit: boolean }
  type Fx = { s: THREE.Sprite; t: number; life: number; grow: number; base: number; peak: number }
  const deuts: Deut[] = [], prots: Prot[] = [], fx: Fx[] = []
  const X0 = -19, X1 = 19, SPEED = 7.5

  function spawnDeut() {
    const pot = step >= 3 ? 'ch' : 'kd'
    const b = (Math.random() * 2 - 1) * 12, ab = Math.abs(b)
    let fate: Deut['fate'] = 'pass', xf = 99
    if (Math.random() > T[pot](ab)) {
      const rA = Math.max(ab, RW1[pot] - 0.6 + 0.6 * Math.random())
      fate = 'abs'; xf = -Math.sqrt(Math.max(rA * rA - b * b, 0))
    } else if (Math.random() < 0.55 * PROF[pot](ab) / PROF_MAX) { fate = 'xfer'; xf = 0 }
    const g = new THREE.Group()
    g.add(ball(COL.n, 0.42), ball(COL.p, 0.42), glow(COL.d, 3.4, 0.4))
    g.position.set(X0, 0, b); scene.add(g)
    deuts.push({ g, b, x: X0, fate, xf, spin: Math.random() * 6, age: 0, dying: -1, loud: step >= 2 })
  }
  function burst(pos: THREE.Vector3, col: string, size: number, life: number, grow = 0.8, peak = 0.6) {
    const s = glow(col, size, 0); s.position.copy(pos); scene.add(s); fx.push({ s, t: 0, life, grow, base: size, peak })
  }
  function spawnProton(from: THREE.Vector3) {
    const target = detPt(THREE.MathUtils.lerp(A0 + 0.05, A1 - 0.05, Math.random()))
    const v = target.clone().sub(from).normalize().multiplyScalar(10)
    const m = new THREE.Group(); m.add(ball(COL.p, 0.42), glow(COL.p, 3.0, 0.6)); m.position.copy(from); scene.add(m)
    const N = 26, hist = Array.from({ length: N }, () => from.clone())
    const tg = new THREE.BufferGeometry().setFromPoints(hist), colors = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) { const f = 1 - i / (N - 1); colors.set([0.3 * f, 0.55 * f, 1.0 * f], i * 3) }
    tg.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const trail = new THREE.Line(tg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }))
    trail.renderOrder = 22; scene.add(trail)
    prots.push({ m, p: from.clone(), v, trail, hist, hit: false })
  }

  // ---------- labels
  let bandOn = 0, kdOn = 0, chOn = 0
  const LAB = [
    { text: '⁴⁸Ca', at: new THREE.Vector3(0, 0, 0), show: () => 1, color: '#e9e1d2' },
    { text: 'd beam', at: new THREE.Vector3(-15, 0, -10.5), show: () => 1, color: '#9ec2ff' },
    { text: 'p detector', at: detPt(A1).add(new THREE.Vector3(0.5, 0, -1.8)), show: () => 1, color: '#c9d2e3' },
    { text: `transfer ${f1(D.band_kd[0])}–${f1(D.band_kd[1])} fm`, at: new THREE.Vector3(5.5, 0, 10.6), show: () => bandOn, color: '#ffd27a' },
  ]
  const tmp = new THREE.Vector3(); let lastKey = ''
  function placeLabels(w: number, h: number) {
    const next = LAB.map(l => {
      tmp.copy(l.at).project(camera)
      return { text: l.text, left: `${Math.round(((tmp.x + 1) * w) / 2)}px`, top: `${Math.round(((1 - tmp.y) * h) / 2)}px`, opacity: Math.round(l.show() * 50) / 50, color: l.color }
    })
    const key = JSON.stringify(next)
    if (key !== lastKey) { lastKey = key; labels.value = next }
  }

  // ---------- camera and size
  let Wd = 1, Hd = 1
  function resize() {
    Wd = el.clientWidth || 1; Hd = el.clientHeight || 1
    const pr = Math.min(devicePixelRatio, 1.5)
    renderer!.setPixelRatio(pr); renderer!.setSize(Wd, Hd)
    composer!.setPixelRatio(pr); composer!.setSize(Wd, Hd)
    camera.aspect = Wd / Hd; camera.updateProjectionMatrix()
  }
  camera.position.set(-2, 27, 27); camera.lookAt(-0.5, -1.5, -0.5)
  observer = new ResizeObserver(resize); observer.observe(el); resize()

  // ---------- loop
  let step = k.value, last = performance.now(), spawnT = 0
  const ease = (cur: number, want: number, dt: number, rate = 3) => cur + (want - cur) * (1 - Math.exp(-dt * rate))
  function frame(now: number) {
    if (disposed) return
    raf = requestAnimationFrame(frame)
    if (document.hidden) { last = now; return }
    const dt = Math.min((now - last) / 1000, 0.05); last = now
    step = k.value

    if ((step >= 1) !== orbShown) { orbShown = step >= 1; vol.setField(orbShown ? F1 : F0, true); mix = 0 }
    if (mix < 1) { mix = Math.min(1, mix + dt / 0.9); vol.setMix(mix * mix * (3 - 2 * mix)) }
    bandOn = ease(bandOn, step >= 1 ? 1 : 0, dt)
    kdOn = ease(kdOn, step === 2 ? 1 : 0, dt)
    chOn = ease(chOn, step >= 3 ? 1 : 0, dt)
    ;(band.material as THREE.MeshBasicMaterial).opacity = 0.035 * bandOn
    ;(bandIn.material as THREE.LineDashedMaterial).opacity = (bandOut.material as THREE.LineDashedMaterial).opacity = 0.7 * bandOn
    ;(haloKD.material as THREE.MeshBasicMaterial).opacity = 0.85 * kdOn
    ;(haloCH.material as THREE.MeshBasicMaterial).opacity = 0.85 * chOn
    ;(ringKD.material as THREE.LineBasicMaterial).opacity = Math.max(kdOn, 0.55 * chOn)
    ;(ringCH.material as THREE.LineBasicMaterial).opacity = chOn

    spawnT -= dt
    if (spawnT <= 0) { spawnDeut(); spawnT = 0.3 + Math.random() * 0.1 }

    for (const d of deuts) {
      d.age += dt
      if (d.dying >= 0) { d.dying -= dt; if (d.dying <= 0) { d.x = 1e9; continue } }
      d.x += SPEED * dt * (d.dying >= 0 ? 0.3 : 1); d.spin += dt * 3
      d.g.position.set(d.x, 0, d.b)
      d.g.children[0].position.set(-0.5 * Math.cos(d.spin), 0, 0.5 * Math.sin(d.spin))
      d.g.children[1].position.set(0.5 * Math.cos(d.spin), 0, -0.5 * Math.sin(d.spin))
      const fadeIn = Math.min(1, d.age * 1.5)
      const fadeOut = d.dying >= 0 ? d.dying / 0.7 : Math.min(1, Math.max(0, (X1 - d.x) / 3))
      d.g.traverse(o => { const m = (o as THREE.Mesh).material as THREE.Material | undefined; if (m) m.opacity = fadeIn * fadeOut * (o instanceof THREE.Sprite ? 0.4 : 1) })
      if (d.dying < 0 && d.x >= d.xf) {
        const pos = d.g.position.clone()
        if (d.fate === 'abs') { d.dying = 0.7; if (d.loud) burst(pos, '#ff5a40', 3.2, 1.0, 0.5, 0.55) }
        if (d.fate === 'xfer') {
          d.x = 1e9
          burst(pos, '#7fb2ff', 3.0, 2.0, 0.3, 0.75)   // the neutron stays, in the orbital
          spawnProton(pos)
        }
      }
    }
    for (let i = deuts.length - 1; i >= 0; i--) if (deuts[i].x > X1) { scene.remove(deuts[i].g); deuts.splice(i, 1) }

    for (const p of prots) {
      if (!p.hit) {
        p.p.addScaledVector(p.v, dt)
        if (p.p.length() >= RDET - 0.3) { p.hit = true; p.m.visible = false; burst(p.p, '#9fd0ff', 3.0, 0.9, 0.6, 0.6) }
      }
      p.m.position.copy(p.p); p.hist.unshift(p.p.clone()); p.hist.pop(); p.trail.geometry.setFromPoints(p.hist)
    }
    for (let i = prots.length - 1; i >= 0; i--) {
      const p = prots[i]
      if (p.hit && p.hist[p.hist.length - 1].distanceTo(p.p) < 1e-3) { scene.remove(p.m, p.trail); p.trail.geometry.dispose(); prots.splice(i, 1) }
    }
    for (const f of fx) {
      f.t += dt; const u = Math.min(1, f.t / f.life)
      f.s.scale.setScalar(f.base * (1 + f.grow * u)); f.s.material.opacity = f.peak * Math.sin(Math.PI * u)
    }
    for (let i = fx.length - 1; i >= 0; i--) if (fx[i].t >= fx[i].life) { scene.remove(fx[i].s); fx[i].s.material.dispose(); fx.splice(i, 1) }

    gov.tick(dt)
    stage.update(camera)
    camera.getWorldDirection(vol.u.uFwd.value)
    composer!.render()
    placeLabels(Wd, Hd)
  }
  raf = requestAnimationFrame(frame)
}
</script>

<template>
  <div class="transfer-demo" :style="{ height: height + 'px' }">
    <div class="transfer-left">
      <div class="transfer-view" :style="{ height: viewH + 'px' }">
        <div ref="host" class="transfer-canvas" />
        <div v-for="(l, i) in labels" :key="i" class="transfer-label"
             :style="{ left: l.left, top: l.top, opacity: l.opacity, color: l.color }">{{ l.text }}</div>
        <div class="transfer-legend">
          <div :style="{ opacity: k >= 2 ? 1 : 0 }"><i class="kd" />W = 1 MeV at {{ f1(D.rW1_kd) }} fm (KD02)</div>
          <div :style="{ opacity: k >= 3 ? 1 : 0 }"><i class="ch" />W = 1 MeV at {{ f1(D.rW1_ch) }} fm (CH89)</div>
        </div>
        <div v-if="failure" class="scene-fallback">{{ failure }}</div>
      </div>
      <div class="transfer-caption"><b>{{ beats[k].title }}.</b> {{ beats[k].text }}</div>
    </div>
    <div class="transfer-right">
      <img v-for="(src, i) in plots" :key="i" :src="src" :class="{ on: plotState === i }" />
      <div class="transfer-cite">Data: Brown, Denning, Macgregor, NPA 153, 145 (1970), EXFOR F0910. Curves: finite-range ADWA, this talk. Left: lengths in fm from the same calculation.</div>
    </div>
  </div>
</template>

<style scoped>
.transfer-demo { display: grid; grid-template-columns: 1.08fr 1fr; gap: 22px; align-items: start; }
.transfer-left { display: flex; flex-direction: column; gap: 8px; }
.transfer-view { position: relative; border-radius: 8px; overflow: hidden; box-shadow: 0 6px 22px rgba(11, 13, 18, .3); background: #0b0d12; }
.transfer-canvas { position: absolute; inset: 0; }
.transfer-canvas :deep(canvas) { display: block; }
.transfer-label { position: absolute; transform: translate(-50%, -50%); font-family: 'JetBrains Mono', 'SF Mono', monospace; font-size: 11.5px; white-space: nowrap; pointer-events: none; transition: opacity .3s; text-shadow: 0 0 6px rgba(11, 13, 18, .95); }
.transfer-legend { position: absolute; left: 12px; bottom: 10px; font-family: 'JetBrains Mono', 'SF Mono', monospace; font-size: 11.5px; line-height: 1.6; color: #c9d2e3; pointer-events: none; }
.transfer-legend div { transition: opacity .4s; display: flex; align-items: center; gap: 7px; }
.transfer-legend i { display: inline-block; width: 16px; height: 2px; }
.transfer-legend i.kd { background: #8fb6ff; } .transfer-legend i.ch { background: #ff8a80; }
.transfer-caption { font-size: 14px; line-height: 1.4; color: #4d4c48; min-height: 62px; }
.transfer-caption b { color: #1b365d; font-weight: 600; }
.transfer-right { position: relative; }
.transfer-right img { position: absolute; top: 0; left: 0; width: 100%; opacity: 0; transition: opacity .35s; }
.transfer-right img:first-child { position: relative; }
.transfer-right img.on { opacity: 1; }
.transfer-cite { font-size: 11px; color: #66655f; margin-top: 4px; line-height: 1.3; }
</style>
