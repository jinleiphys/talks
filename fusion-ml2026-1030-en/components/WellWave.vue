<script setup lang="ts">
// Slide 2: the demo task itself. n-p s-wave in a square well (R = 2 fm,
// V0 fitted to the deuteron); a waterfall of u(r) over E = 1..50 MeV with the
// current energy sweeping through it. Analytic solution, same constants as demo/square_well.jl.
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { INK, mountStage } from '../utils/three-kit'

const HC = 197.327, MU = 939.565 * 938.272 / (939.565 + 938.272), V0 = 36.567, R = 2.0
const RMAX = 9, NR = 160, XS = 0.62, AMP = 0.62, Y0 = 0.15
const E_MIN = 1, E_MAX = 50

function solve(E: number) {
  const k = Math.sqrt(2 * MU * E) / HC, K = Math.sqrt(2 * MU * (E + V0)) / HC
  let d = Math.atan((k / K) * Math.tan(K * R)) - k * R
  while (d < 0) d += Math.PI
  const ain = Math.sin(k * R + d) / Math.sin(K * R)
  const u = (r: number) => (r < R ? ain * Math.sin(K * r) : Math.sin(k * r + d))
  return { k, d, u }
}
const zOf = (E: number) => -((E - E_MIN) / (E_MAX - E_MIN)) * 4.2 + 1.2
const xOf = (r: number) => r * XS - (RMAX * XS) / 2

const host = ref<HTMLDivElement>()
const hud = ref({ E: '1.0', d: '136.9' })
let stop: (() => void) | undefined

onMounted(() => {
  stop = mountStage(host.value!, { fov: 30, pos: [2.8, 2.7, 7.9], look: [0.1, -0.25, -0.9], env: 0.8 }, ({ scene }) => {
    const curvePts = (E: number, z: number, free = false) => {
      const { k, u } = solve(E), pts: THREE.Vector3[] = []
      for (let i = 0; i <= NR; i++) { const r = (i / NR) * RMAX; pts.push(new THREE.Vector3(xOf(r), Y0 + AMP * (free ? Math.sin(k * r) : u(r)), z)) }
      return pts
    }
    // Waterfall of fixed energies, faint, colour graded along E.
    const cA = new THREE.Color(INK.red), cB = new THREE.Color(INK.ink)
    for (let i = 0; i < 14; i++) {
      const E = E_MIN + (i / 13) * (E_MAX - E_MIN)
      const g = new THREE.BufferGeometry().setFromPoints(curvePts(E, zOf(E)))
      scene.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: cA.clone().lerp(cB, i / 13), transparent: true, opacity: 0.32 })))
    }
    // Square well: translucent block from r = 0 to R, depth V0, spanning the E range in z.
    const depth = V0 * 0.03, base = -0.95
    const well = new THREE.Mesh(new THREE.BoxGeometry(R * XS, depth, 4.6), new THREE.MeshPhysicalMaterial({ color: INK.inkSoft, roughness: 0.15, clearcoat: 1, transparent: true, opacity: 0.16, depthWrite: false }))
    well.position.set(xOf(R / 2), base - depth / 2, zOf(25.5)); scene.add(well)
    const vLine = new THREE.BufferGeometry().setFromPoints([[0, base - depth], [R, base - depth], [R, base], [RMAX, base]].map(([r, y]) => new THREE.Vector3(xOf(r), y, 1.25)))
    scene.add(new THREE.Line(vLine, new THREE.LineBasicMaterial({ color: INK.ink })))
    const axis = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(xOf(0), Y0, 1.25), new THREE.Vector3(xOf(RMAX), Y0, 1.25)])
    scene.add(new THREE.Line(axis, new THREE.LineBasicMaterial({ color: INK.edge })))

    // Current wave (tube) and its free-wave partner (dashed), rebuilt each frame.
    const waveMat = new THREE.MeshPhysicalMaterial({ color: INK.red, roughness: 0.3, clearcoat: 1, emissive: new THREE.Color(INK.red), emissiveIntensity: 0.25 })
    let wave = new THREE.Mesh(new THREE.BufferGeometry(), waveMat); scene.add(wave)
    const freeMat = new THREE.LineDashedMaterial({ color: INK.inkLight, dashSize: 0.12, gapSize: 0.08, transparent: true, opacity: 0.8 })
    let free = new THREE.Line(new THREE.BufferGeometry(), freeMat); scene.add(free)
    const eMark = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 14), waveMat); scene.add(eMark)

    const key = new THREE.DirectionalLight(0xffffff, 2); key.position.set(-3, 6, 7); scene.add(key)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0bc, 1.1))

    return (t) => {
      const s = 0.5 - 0.5 * Math.cos(t * 0.35)          // ease back and forth through the range
      const E = E_MIN + s * (E_MAX - E_MIN), z = zOf(E)
      wave.geometry.dispose()
      wave.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(curvePts(E, z)), 220, 0.028, 8, false)
      free.geometry.dispose()
      free.geometry = new THREE.BufferGeometry().setFromPoints(curvePts(E, z, true)); free.computeLineDistances()
      const sol = solve(E)
      eMark.position.set(xOf(RMAX), Y0 + AMP * sol.u(RMAX), z)
      hud.value = { E: E.toFixed(1), d: (sol.d * 180 / Math.PI).toFixed(1) }
      return true
    }
  })
})
onUnmounted(() => stop?.())
</script>

<template>
  <div class="well-wave">
    <div ref="host" class="scene-canvas" />
    <div class="hud">
      <div><span>E</span>{{ hud.E }} MeV</div>
      <div><span>δ₀</span>{{ hud.d }}°</div>
    </div>
    <div class="legend"><i class="w" />u(r)，方势阱　<i class="f" />无势自由波　<i class="v" />势阱 R = 2 fm</div>
  </div>
</template>

<style scoped>
.well-wave { position: relative; width: 100%; height: 100%; }
.scene-canvas { position: absolute; inset: 0; }
.hud { position: absolute; top: 4px; right: 6px; display: flex; flex-direction: column; gap: 2px; text-align: right; font: 600 17px 'PingFang SC', sans-serif; color: #1d1c1a; font-variant-numeric: tabular-nums; }
.hud span { font-family: 'Songti SC', serif; color: #a83a32; margin-right: 8px; }
.legend { position: absolute; bottom: 0; left: 0; right: 0; text-align: center; font: 12px 'PingFang SC', sans-serif; color: #6b6a63; }
.legend i { display: inline-block; width: 16px; height: 0; vertical-align: middle; margin: 0 5px 0 8px; }
.legend .w { border-top: 3px solid #c0503f; }
.legend .f { border-top: 2px dashed #2D5A8A; }
.legend .v { border-top: 2px solid #1B365D; }
</style>
