<script setup>
// A knockout beamline after the S800 spectrograph at FRIB (schematic, not to scale):
// rare-isotope beam a = b + x -> 9Be target inside a gamma-ray tracking shell (shown cut away)
// -> quadrupole doublet -> two dipoles bending b upward -> focal-plane detectors.
// x leaves at a large angle and is not detected; b de-excites in flight and one gamma ray is tracked.
// Materials: PBR under a PMREM room environment; the gamma shell and the target chamber are transmissive
// glass with dispersion. Labels are liquid-glass chips (CSS + SVG tier of the liquid-glass skill).
import { useIsSlideActive } from '@slidev/client'
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { COL, makeNucleus, makeRenderer, glow, releaseRenderer } from './nucleus.js'
import { installGlassFilter } from './displacement-map.js'

const props = defineProps({ height: { type: Number, default: 300 } })
const host = ref(null), lead = ref(null)
// label centres in % of the panel, chosen in the free space around the apparatus
const POS = { beam: [13, 24], obj: [8, 80], tgt: [13, 93], arr: [22, 7], x: [44, 7], th: [37, 92], q: [61, 93], d: [63, 11], fp: [90, 62] }
const at = (k) => ({ left: POS[k][0] + '%', top: POS[k][1] + '%', opacity: 0 })
const ss = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u) }
const L = { beam: ref(null), tgt: ref(null), arr: ref(null), q: ref(null), d: ref(null), fp: ref(null), x: ref(null), th: ref(null), obj: ref(null) }
const active = useIsSlideActive()
let drawn = false
let renderer, raf, ro, pmrem
const uid = Math.random().toString(36).slice(2, 7)

// kami palette
const C = { steel: 0xc9c5ba, dark: 0x3d3c38, ink: 0x1B365D, red: 0x9c2b25, moss: 0x4a6b3a, cream: 0xe9e4d6, gold: 0xd9a21b }

onMounted(async () => {
  const el = host.value, W = el.clientWidth, H = props.height
  renderer = makeRenderer(el, W, H)
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMappingExposure = 0.95
  const scene = new THREE.Scene()
  // image-based lighting: without it every PBR surface reads as plastic
  pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environmentIntensity = 0.55
  scene.fog = new THREE.Fog(COL.paper, 13, 24)          // floor grid fades into the parchment
  const key = new THREE.DirectionalLight(0xfff6ea, 1.6); key.position.set(4, 14, 9); key.castShadow = true
  key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -12, right: 12, top: 8, bottom: -8, near: 1, far: 40 })
  key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02; key.shadow.radius = 6; scene.add(key)

  const cam = new THREE.PerspectiveCamera(28, W > 0 ? W / H : 16 / 9, 0.1, 200)
  cam.position.set(2.3, 3.8, 12.2); cam.lookAt(2.2, 0.85, 0)
  // Registered before anything that can throw. A slide pre-mounted while hidden (Safari, reached by paging)
  // has clientWidth 0 here; the observer fixes the size, the aspect and the glass chips once it is shown.
  ro = new ResizeObserver(() => {
    const w = el.clientWidth; if (w === 0) return
    renderer.setSize(w, props.height); cam.aspect = w / props.height; cam.updateProjectionMatrix(); installGlass()
  })
  ro.observe(el)

  const phys = (color, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.4, metalness: 0.0, ...o })
  const M = {
    steel: phys(C.steel, { metalness: 1, roughness: 0.26 }),
    frame: phys(C.dark, { metalness: 0.6, roughness: 0.45 }),
    paintRed: phys(C.red, { roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.08 }),
    paintCream: phys(C.cream, { roughness: 0.42, clearcoat: 0.8, clearcoatRoughness: 0.12 }),
    coil: phys(C.ink, { roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.05 }),
    glass: phys(0xeef5ea, { transmission: 1, thickness: 0.35, ior: 1.5, roughness: 0.06, dispersion: 4,
      attenuationColor: new THREE.Color(0x7fa86a), attenuationDistance: 0.9, specularIntensity: 1, clearcoat: 1, clearcoatRoughness: 0.03 }),
    chamber: phys(0xffffff, { transmission: 1, thickness: 0.05, ior: 1.45, roughness: 0.02, dispersion: 2 }),
  }
  const add = (m, cast = true) => { m.castShadow = cast; m.receiveShadow = true; scene.add(m); return m }
  const FLOOR = -1.35
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), new THREE.ShadowMaterial({ opacity: 0.16 }))
  floor.rotation.x = -Math.PI / 2; floor.position.y = FLOOR; floor.receiveShadow = true; scene.add(floor)
  // a faint hall floor grid: gives the glass something to refract
  const grid = new THREE.GridHelper(40, 80, 0xb7b2a4, 0xd6d1c3); grid.position.y = FLOOR + 0.001
  grid.material.transparent = true; grid.material.opacity = 0.55; scene.add(grid)
  const stand = () => {}                                   // support pillars removed (author, 2026-09-23)

  // ---- the beam path: straight through target and quads, then two upward bends ----
  const R = 2.6, TH = THREE.MathUtils.degToRad(27)
  const X0 = -5.2, XD1 = 4.3
  // in a fixed sector field a residue with momentum p0(1+delta) bends on radius R(1+delta) through angle TH/(1+delta)
  const buildPath = (delta, lastDrift = 1.3) => {
    const pts = [], dipoles = [], Rd = R * (1 + delta), THd = TH / (1 + delta)
    for (let x = X0; x <= XD1; x += 0.1) pts.push(new THREE.Vector3(x, 0, 0))
    let p = new THREE.Vector3(XD1, 0, 0), a = 0
    const arc = () => {
      const c = new THREE.Vector3(p.x - Rd * Math.sin(a), p.y + Rd * Math.cos(a), 0)
      dipoles.push({ c, a0: a })
      for (let k = 1; k <= 20; k++) { const f = a + THd * k / 20; pts.push(new THREE.Vector3(c.x + Rd * Math.sin(f), c.y - Rd * Math.cos(f), 0)) }
      a += THd; p = pts[pts.length - 1].clone()
    }
    const drift = (len) => { const d = new THREE.Vector3(Math.cos(a), Math.sin(a), 0); for (let k = 1; k <= 10; k++) pts.push(p.clone().addScaledVector(d, len * k / 10)); p = pts[pts.length - 1].clone() }
    arc(); drift(1.1); arc(); drift(lastDrift)
    return { pts, dipoles }
  }
  const { pts, dipoles } = buildPath(0)
  const path = new THREE.CatmullRomCurve3(pts)
  const sT = pts.findIndex((q) => q.x >= 0) / (pts.length - 1)        // path parameter at the target

  // beam pipe and flanges
  add(new THREE.Mesh(new THREE.TubeGeometry(path, 400, 0.11, 24, false), M.steel), false)
  for (const x of [-4.4, -2.9, -1.6, 1.6, 3.6]) {
    const f = add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.08, 32), M.steel))
    f.rotation.z = Math.PI / 2; f.position.set(x, 0, 0)
  }
  stand(-3.7, -0.1, 0, 0.3, 0.3)

  // ---- target: 9Be foil in a glass chamber ----
  add(new THREE.Mesh(new RoundedBoxGeometry(0.04, 0.34, 0.34, 2, 0.01), phys(0xcfc9b8, { metalness: 0.3, roughness: 0.5 })))
  add(new THREE.Mesh(new THREE.SphereGeometry(0.42, 48, 32), M.chamber), false)

  // ---- gamma-ray tracking shell: tapered hexagonal glass crystals pointing at the target, front half cut away ----
  const crystals = []
  const cg = new THREE.CylinderGeometry(0.17, 0.3, 0.75, 6); cg.rotateX(Math.PI / 2)   // narrow end toward target
  for (let i = 0; i < 9; i++) for (let j = 0; j < 16; j++) {
    const th = THREE.MathUtils.degToRad(38 + 12.5 * i)              // polar angle from the beam
    const ph = 2 * Math.PI * (j + 0.5 * (i % 2)) / 16
    const dir = new THREE.Vector3(Math.cos(th), Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph))
    if (dir.z > 0.12) continue                                      // cut-away toward the viewer
    const m = add(new THREE.Mesh(cg, M.glass))
    m.position.copy(dir.multiplyScalar(1.05)); m.lookAt(0, 0, 0); crystals.push(m)
  }
  const hit = crystals.reduce((best, c) => (Math.abs(c.position.y - 0.9) + Math.abs(c.position.x - 0.1) < Math.abs(best.position.y - 0.9) + Math.abs(best.position.x - 0.1) ? c : best))
  hit.material = M.glass.clone(); hit.material.emissive = new THREE.Color(C.gold); hit.material.emissiveIntensity = 0
  stand(0.35, -0.6, 0, 0.4, 1.6)

  // ---- quadrupole doublet ----
  for (const x of [2.2, 3.3]) {
    const q = add(new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.85, 8), M.paintRed))
    q.rotation.z = Math.PI / 2; q.rotation.x = Math.PI / 8; q.position.set(x, 0, 0)
    const cap = add(new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.66, 0.08, 8), M.steel))
    cap.rotation.copy(q.rotation); cap.position.set(x - 0.45, 0, 0)
    stand(x, -0.62, 0, 0.5, 0.9)
  }

  // ---- two dipoles: annular-sector yokes with ink-blue coils ----
  const sector = (r1, r2, a0, a1) => {
    const s = new THREE.Shape()
    s.absarc(0, 0, r2, a0, a1, false); s.absarc(0, 0, r1, a1, a0, true); s.closePath(); return s
  }
  const bev = { bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 3, curveSegments: 32 }
  for (const { c, a0 } of dipoles) {
    const a1 = a0 - Math.PI / 2, a2 = a1 + TH
    const yoke = new THREE.ExtrudeGeometry(sector(R - 0.7, R + 0.7, a1, a2), { depth: 1.42, ...bev })
    yoke.translate(0, 0, -0.71)
    add(new THREE.Mesh(yoke, M.paintCream)).position.copy(c)
    for (const z of [-0.84, 0.72]) {
      const coil = new THREE.ExtrudeGeometry(sector(R - 0.45, R + 0.45, a1 - 0.03, a2 + 0.03), { depth: 0.08, ...bev, bevelThickness: 0.02, bevelSize: 0.02 })
      add(new THREE.Mesh(coil, M.coil)).position.set(c.x, c.y, z)
    }
    const mid = new THREE.Vector3(c.x + R * Math.sin(a0 + TH / 2), c.y - R * Math.cos(a0 + TH / 2), 0)
    stand(mid.x, mid.y - 0.72, 0, 0.9, 1.3)
  }

  // ---- focal plane: two tracking detectors, an ionization chamber and a scintillator ----
  const end = path.getPoint(1), tan = path.getTangent(1)
  const fp = []
  ;[[0.1, C.ink, 0.1], [0.45, C.ink, 0.1], [0.85, C.dark, 0.35], [1.25, C.gold, 0.1]].forEach(([d, col, w]) => {
    const m = add(new THREE.Mesh(new RoundedBoxGeometry(w, 0.9, 1.1, 3, 0.03),
      phys(col, { roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.08, emissive: 0x4f7fb3, emissiveIntensity: 0 })))
    m.position.copy(end).addScaledVector(tan, d); m.rotation.z = Math.atan2(tan.y, tan.x); fp.push(m)
  })

  // ---- p_par: residues of different momentum fan out after the dipoles (delta exaggerated for visibility) ----
  const fanEnds = [], fanMats = []
  ;[[-0.16, C.ink], [0.16, C.moss]].forEach(([dl, col]) => {
    const g = buildPath(dl, 1.45).pts.filter((q) => q.x >= XD1 - 0.05)
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(g), 160, 0.02, 8, false),
      new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.9, depthTest: false, toneMapped: false }))
    tube.renderOrder = 4; scene.add(tube); fanEnds.push(g[g.length - 1]); fanMats.push(tube.material)
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12), tube.material); dot.renderOrder = 4
    dot.position.copy(g[g.length - 1]); scene.add(dot)
  })
  // ---- p_perp: the scattering angle at the target (cone opening exaggerated) ----
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.9, 40, 1, true),
    new THREE.MeshBasicMaterial({ color: C.gold, transparent: true, opacity: 0.34, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }))
  cone.rotation.z = Math.PI / 2; cone.position.x = 0.95; scene.add(cone)
  // ---- time-of-flight start: thin scintillator at the object point upstream ----
  add(new THREE.Mesh(new RoundedBoxGeometry(0.05, 0.5, 0.5, 2, 0.015), phys(C.gold, { roughness: 0.3, clearcoat: 1 }))).position.set(-4.0, 0, 0)

  // ---- projectile, x, gamma ray ----
  const b = makeNucleus(6, 7, 0.075, 5); scene.add(b)
  const bGlow = glow(0xfff3c4, 0.9, 0.55); bGlow.material.depthTest = false; b.add(bGlow)
  const x = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 14), phys(COL.neutron, { clearcoat: 0.6 }))
  const xGlow = glow(COL.x, 0.7, 0.9); xGlow.material.depthTest = false; x.add(xGlow); scene.add(x)
  const xOff = new THREE.Vector3(0.02, 0.2, 0.05)
  const xDir = new THREE.Vector3(0.55, 1.0, 0.45).normalize(), xLen = 2.3      // out above the cut-away
  const NX = 26, dotMat = phys(C.ink)
  const xDots = Array.from({ length: NX }, (_, i) => {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 8), dotMat)
    d.position.copy(xDir).multiplyScalar(xLen * (i + 0.5) / NX); d.visible = false; scene.add(d); return d
  })
  const gTube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(0.12, 0, 0), hit.position.clone()), 8, 0.022, 8, false),
    new THREE.MeshBasicMaterial({ color: C.gold, transparent: true, opacity: 0, depthTest: false, toneMapped: false }))
  gTube.renderOrder = 3; scene.add(gTube)
  const flash = glow(0xfff3c4, 1, 0); flash.material.depthTest = false; scene.add(flash)
  // comet tail behind b, so its motion reads at a glance
  const NT = 16
  const tail = Array.from({ length: NT }, (_, i) => {
    const sp = glow(0xe0a13a, 0.5 * (1 - i / NT) + 0.08, 0); sp.material.depthTest = false; sp.renderOrder = 5; scene.add(sp); return sp
  })
  // gamma photon travelling to the struck crystal, and the halo it raises there
  const gFrom = new THREE.Vector3(0.12, 0, 0)
  const photon = glow(0xffd36b, 0.45, 0); photon.material.depthTest = false; photon.renderOrder = 6; scene.add(photon)
  const halo = glow(0xf2c14e, 1.0, 0); halo.material.depthTest = false; halo.position.copy(hit.position); scene.add(halo)
  // ripple where b lands on the focal plane
  const ripple = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.2, 48),
    new THREE.MeshBasicMaterial({ color: 0x6f9cc9, transparent: true, opacity: 0, side: THREE.DoubleSide, depthTest: false, toneMapped: false }))
  ripple.position.copy(end); ripple.lookAt(end.clone().add(tan)); ripple.renderOrder = 6; scene.add(ripple)

  // leader targets on the apparatus; the labels themselves sit in fixed free space (POS) and never cover it
  const dipTop = pts.find((q) => q.x > 5.5).clone().add(new THREE.Vector3(0, 0.7, 0.7))
  const anchors = {
    beam: new THREE.Vector3(-4.7, 0.12, 0), obj: new THREE.Vector3(-4.0, -0.26, 0), tgt: new THREE.Vector3(0, -0.2, 0.05),
    arr: new THREE.Vector3(0.1, 1.3, -0.2), x: xDir.clone().multiplyScalar(xLen * 0.85), th: new THREE.Vector3(1.7, 0.16, 0),
    q: new THREE.Vector3(2.75, -0.6, 0.35), d: dipTop, fp: fanEnds[0].clone().lerp(fanEnds[1], 0.5),
  }
  const v = new THREE.Vector3()
  const place = (k, vis) => {
    const r = L[k].value, ln = lead.value?.querySelector(`[data-k="${k}"]`); if (!r || !ln) return
    r.style.opacity = vis
    r.style.transform = `translate(-50%, calc(-50% + ${((1 - vis) * 10).toFixed(1)}px))`
    v.copy(anchors[k]).project(cam)
    const ax = (v.x + 1) / 2 * el.clientWidth, ay = (1 - v.y) / 2 * props.height
    const lx = r.offsetLeft - r.offsetWidth / 2, ly = r.offsetTop - r.offsetHeight / 2
    const sx = Math.min(Math.max(ax, lx), lx + r.offsetWidth), sy = Math.min(Math.max(ay, ly), ly + r.offsetHeight)
    const grow = ss(0.25, 1, vis)                                   // the leader draws from the chip to the part
    const [line, dot] = ln.children
    line.setAttribute('x1', sx); line.setAttribute('y1', sy)
    line.setAttribute('x2', sx + (ax - sx) * grow); line.setAttribute('y2', sy + (ay - sy) * grow)
    line.style.opacity = vis
    dot.setAttribute('cx', ax); dot.setAttribute('cy', ay)
    dot.setAttribute('r', (2.6 + 1.8 * Math.sin(Math.PI * ss(0.6, 1, vis))).toFixed(2))
    dot.style.opacity = grow
  }

  const T = 7.4, tc = 1.5, tb = 2.9, clock = new THREE.Clock()
  const qT = new URLSearchParams(location.search).get('exT')     // freeze a frame for inspection
  // time at which b passes a given x on its path (after the target)
  const tAt = (xq) => { const i = pts.findIndex((q) => q.x >= xq); return tc + tb * (i / (pts.length - 1) - sT) / (1 - sT) }
  const REV = { beam: 0.15, obj: 0.5, arr: 0.9, tgt: 1.15, th: tc + 0.15, x: tc + 0.55, q: tAt(2.2), d: tAt(4.9), fp: tc + tb - 0.05 }
  const camHome = cam.position.clone(), look = new THREE.Vector3(2.2, 0.85, 0)
  const loop = () => {
    const t = (typeof window.__exT === 'number') ? window.__exT : qT != null ? +qT : clock.getElapsedTime() % T
    const out = 1 - ss(T - 0.55, T - 0.1, t)                    // everything fades before the loop restarts
    const vis = (k) => ss(REV[k], REV[k] + 0.45, t) * out
    // a slow periodic drift of the camera
    const w = 2 * Math.PI * t / T
    cam.position.set(camHome.x + 0.22 * Math.sin(w), camHome.y + 0.08 * Math.sin(2 * w), camHome.z); cam.lookAt(look)

    const sOf = (tt) => tt < tc ? sT * Math.max(0, tt) / tc : sT + (1 - sT) * Math.min(1, (tt - tc) / tb)
    if (t < tc) {
      b.position.copy(path.getPoint(sOf(t))); x.position.copy(b.position).add(xOff)
      x.visible = true; xDots.forEach((d) => (d.visible = false))
    } else {
      b.position.copy(path.getPoint(sOf(t)))
      const kx = Math.min(1, (t - tc) / 1.0)
      x.position.copy(xDir).multiplyScalar(xLen * kx); x.visible = kx < 1
      xDots.forEach((d, i) => { d.visible = i < NX * kx && out > 0.02; d.scale.setScalar(0.6 + 0.4 * i / NX) })
    }
    const moving = t < tc + tb
    tail.forEach((sp, i) => {
      const tt = t - 0.035 * (i + 1)
      sp.position.copy(path.getPoint(sOf(tt)))
      sp.material.opacity = moving && tt > 0 ? 0.55 * (1 - i / NT) : 0
    })
    const f = t > tc ? Math.max(0, 1 - (t - tc) / 0.4) : 0
    flash.material.opacity = 0.95 * f; flash.scale.setScalar(0.4 + 1.8 * (1 - f))
    // gamma: the photon flies for 0.25 s, the crystal and its halo glow after the hit
    const tg = t - tc - 0.08
    photon.material.opacity = tg > 0 && tg < 0.25 ? 1 : 0
    if (tg > 0 && tg < 0.25) photon.position.copy(gFrom).lerp(hit.position, tg / 0.25)
    const gh = tg >= 0.25 ? Math.max(0, 1 - (tg - 0.25) / 0.9) : 0
    gTube.material.opacity = tg > 0 ? 0.8 * Math.min(1, tg / 0.25) * (tg < 0.25 ? 1 : gh) : 0
    hit.material.emissiveIntensity = 2.4 * gh
    halo.material.opacity = 0.8 * gh; halo.scale.setScalar(0.8 + 1.2 * (1 - gh))
    // arrival on the focal plane: detectors light, a ripple spreads
    const ta = t - tc - tb
    const e = ta > 0 ? Math.max(0, 1 - ta / 0.9) : 0
    fp.forEach((m) => (m.material.emissiveIntensity = 0.4 * e))
    ripple.material.opacity = ta > 0 ? 0.9 * Math.max(0, 1 - ta / 0.8) : 0
    ripple.scale.setScalar(1 + 4 * Math.max(0, Math.min(1, ta / 0.8)))
    // the measurement overlays appear with their labels
    fanMats.forEach((m) => (m.opacity = 0.9 * vis('d')))
    cone.material.opacity = 0.34 * vis('th')
    for (const k in L) place(k, vis(k))
    if (active.value || !drawn) { renderer.render(scene, cam); drawn = true }   // off-slide: keep one frame, stop drawing
    raf = requestAnimationFrame(loop)
  }
  loop()

  await nextTick()
  installGlass()
})
// liquid-glass chips: one displacement map per label, generated at its rendered size. Skipped while the label has
// no size (hidden slide) and retried from the resize observer; a failure on one chip leaves it plain blur, no more.
const glassDone = new Set()
function installGlass() {
  Object.entries(L).forEach(([k, r]) => {
    const e = r.value; if (!e || glassDone.has(k)) return
    const { width, height } = e.getBoundingClientRect(); if (width < 1 || height < 1) return
    const id = `lg-${uid}-${k}`
    try {
      installGlassFilter({ id, width, height, radius: Math.min(14, height / 2), bevel: 8, scale: 8 })
      e.style.setProperty('--glass-url', `url(#${id})`); glassDone.add(k)
    } catch (err) { console.warn('glass chip', k, err) }
  })
}
onBeforeUnmount(() => {
  cancelAnimationFrame(raf); ro && ro.disconnect(); pmrem && pmrem.dispose(); releaseRenderer(renderer)
  Object.keys(L).forEach((k) => document.getElementById(`lg-${uid}-${k}`)?.closest('svg')?.remove())
})
</script>

<template>
  <div class="ex-wrap">
    <div ref="host" class="ex-host" :style="{ height: height + 'px' }"></div>
    <svg ref="lead" class="ex-lead" :style="{ height: height + 'px' }">
      <g v-for="k in Object.keys(POS)" :key="k" :data-k="k"><line /><circle r="2.6" /></g>
    </svg>
    <div :ref="L.beam" :style="at('beam')" class="ex-lab lg">rare-isotope beam a = b + x<br><span class="ex-sub">80 MeV/nucleon to 1 GeV/nucleon</span></div>
    <div :ref="L.tgt" :style="at('tgt')" class="ex-lab lg ex-t"><sup>9</sup>Be target</div>
    <div :ref="L.arr" :style="at('arr')" class="ex-lab lg ex-g">&gamma;-ray tracking array (cut away)</div>
    <div :ref="L.q" :style="at('q')" class="ex-lab lg ex-t">quadrupoles</div>
    <div :ref="L.d" :style="at('d')" class="ex-lab lg">dipoles<br><span class="ex-sub">landing point &rarr; B&rho; &rarr; p<sub>||</sub></span></div>
    <div :ref="L.fp" :style="at('fp')" class="ex-lab lg ex-t ex-left">focal plane<br><span class="ex-sub">tracking: position, angle</span><br><span class="ex-sub">ion chamber: Z</span><br><span class="ex-sub">scintillator: time of flight</span></div>
    <div :ref="L.th" :style="at('th')" class="ex-lab lg ex-t">angle &theta; &rarr; p<sub>&perp;</sub><br><span class="ex-sub">blurred by beam divergence, target scattering</span></div>
    <div :ref="L.obj" :style="at('obj')" class="ex-lab lg ex-t">time-of-flight start</div>
    <div :ref="L.x" :style="at('x')" class="ex-lab lg ex-x">x, not detected</div>
    <div class="ex-cap">after the S800 spectrograph, FRIB; not to scale</div>
  </div>
</template>

<style scoped>
.ex-wrap { position: relative; width: 100%; border-radius: 10px; overflow: hidden; }
.ex-host { width: 100%; }
.ex-lab { position: absolute; transform: translate(-50%, -50%); font-family: Newsreader, Georgia, serif;
  font-size: 1.0rem; color: #141413; pointer-events: none; white-space: nowrap; text-align: center; line-height: 1.2; }
/* liquid glass, CSS + SVG tier: tint not veil, saturate above 1, no bright outline; the blur is kept in
   both rules so an engine that parses url() without running the filter still gets blur + saturate */
.lg {
  padding: 3px 11px; border-radius: 14px;
  background: linear-gradient(176deg, rgba(250,249,245,0.34), rgba(250,249,245,0.22) 60%, rgba(250,249,245,0.28));
  -webkit-backdrop-filter: blur(7px) saturate(1.7);
          backdrop-filter: blur(7px) saturate(1.7);
  box-shadow:
    inset 0 1px 1px rgba(255,255,255,0.55),
    inset 0 -1px 1px rgba(60,50,30,0.12),
    0 6px 18px rgba(60,50,30,0.14);
}
@supports (backdrop-filter: url(#x)) {
  .lg { backdrop-filter: blur(7px) var(--glass-url,) saturate(1.7); }
}
.ex-sub { font-size: .82rem; color: #66655f; }
.ex-t { color: #4d4c48; font-size: .92rem; }
.ex-g { color: #3f5e31; }
.ex-x { color: #1B365D; }
.ex-left { text-align: left; }
.ex-lead { position: absolute; left: 0; top: 0; width: 100%; pointer-events: none; overflow: visible; }
.ex-lead line { stroke: #4d4c48; stroke-width: 1; stroke-opacity: .7; }
.ex-lead circle { fill: #4d4c48; }
.ex-cap { position: absolute; right: 10px; bottom: 6px; font-family: Inter, sans-serif; font-size: .72rem; color: #66655f; }
</style>
