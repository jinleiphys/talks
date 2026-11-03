<script setup lang="ts">
// Slide 26: an agent core, 20 program nodes on an outer ring each with a
// benchmark ring that lights as a check pulse sweeps round, 6 other skills inside.
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { INK, dotTexture, mountStage } from '../utils/three-kit'

const host = ref<HTMLDivElement>()
const core = ref({ left: '50%', top: '50%' })
let stop: (() => void) | undefined

onMounted(() => {
  stop = mountStage(host.value!, { fov: 30, pos: [0, 3.4, 7.6], look: [0, -0.2, 0], env: 0.9 }, ({ scene, camera, renderer }) => {
    const sys = new THREE.Group(); sys.rotation.x = 0.05; scene.add(sys)
    const phys = (color: number, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.12, ...o })
    const dot = dotTexture(0.25)

    const coreMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 5), phys(INK.ink, { iridescence: 0.4 }))
    sys.add(coreMesh)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: INK.inkSoft, transparent: true, opacity: 0.55, depthWrite: false })); glow.scale.setScalar(3.2); sys.add(glow)

    // Outer ring: 20 programs.
    const R = 2.9, programs: { node: THREE.Mesh; ring: THREE.Mesh; rmat: THREE.MeshPhysicalMaterial; a: number }[] = []
    const nodeGeo = new THREE.SphereGeometry(0.15, 32, 20), ringGeo = new THREE.TorusGeometry(0.27, 0.025, 10, 48)
    const nodeMat = phys(INK.ivory)
    const linkPos: number[] = []
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2
      const node = new THREE.Mesh(nodeGeo, nodeMat); node.position.set(R * Math.cos(a), 0, R * Math.sin(a)); sys.add(node)
      const rmat = phys(INK.edge, { emissive: new THREE.Color(INK.green), emissiveIntensity: 0, transparent: true })
      const ring = new THREE.Mesh(ringGeo, rmat); ring.position.copy(node.position); sys.add(ring)
      programs.push({ node, ring, rmat, a })
      linkPos.push(0, 0, 0, node.position.x, 0, node.position.z)
    }
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(linkPos, 3))
    sys.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: INK.inkSoft, transparent: true, opacity: 0.35 })))
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(R, 0.008, 6, 200), new THREE.MeshBasicMaterial({ color: INK.inkSoft, transparent: true, opacity: 0.5 }))
    orbit.rotation.x = Math.PI / 2; sys.add(orbit)

    // Inner ring: 6 other skills.
    const inner = new THREE.Group(); sys.add(inner)
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 16), phys(INK.inkSoft)); m.position.set(1.45 * Math.cos(a), 0, 1.45 * Math.sin(a)); inner.add(m)
    }
    const innerOrbit = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.006, 6, 120), new THREE.MeshBasicMaterial({ color: INK.inkSoft, transparent: true, opacity: 0.4 }))
    innerOrbit.rotation.x = Math.PI / 2; inner.add(innerOrbit)

    // Packets travelling core -> program.
    const P = 20, ppos = new Float32Array(P * 3)
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(ppos, 3))
    sys.add(new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.16, map: dot, color: INK.inkLight, transparent: true, depthWrite: false })))

    const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-4, 6, 6); scene.add(key)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0bc, 1.1))
    const v = new THREE.Vector3(), green = new THREE.Color(INK.green), edge = new THREE.Color(INK.edge)

    return (t) => {
      sys.rotation.y = t * 0.12
      inner.rotation.y = -t * 0.25
      coreMesh.rotation.y = t * 0.3
      const sweep = (t * 0.9) % (Math.PI * 2)   // check pulse angle in system frame
      for (const p of programs) {
        // passed = the sweep has gone by this node at least once in this lap; glow peaks as it passes
        const d = ((sweep - p.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)
        const peak = Math.exp(-d * 3)
        p.rmat.color.copy(edge).lerp(green, Math.min(1, 0.55 + peak))
        p.rmat.emissiveIntensity = 0.8 * peak
        p.ring.lookAt(camera.position)
        p.ring.scale.setScalar(1 + 0.35 * peak)
      }
      for (let i = 0; i < P; i++) {
        const f = (t * 0.35 + i * 0.37) % 1
        const a = programs[i].a
        ppos.set([R * f * Math.cos(a), 0, R * f * Math.sin(a)], i * 3)
      }
      pg.attributes.position.needsUpdate = true
      v.set(0, -0.95, 0).project(camera)
      const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight
      core.value = { left: `${(v.x + 1) * w / 2}px`, top: `${(1 - v.y) * h / 2}px` }
      return true
    }
  })
})
onUnmounted(() => stop?.())
</script>

<template>
  <div class="constellation">
    <div ref="host" class="scene-canvas" />
    <div class="core-tag" :style="core">智能体</div>
    <div class="legend">
      <span><i class="d ivory" />公开程序 × 20</span>
      <span><i class="d ring" />基准验收</span>
      <span><i class="d soft" />其他技能 × 6</span>
    </div>
  </div>
</template>

<style scoped>
.constellation { position: relative; width: 100%; height: 100%; }
.scene-canvas { position: absolute; inset: 0; }
.core-tag { position: absolute; transform: translate(-50%, -50%); font: 700 15px 'Songti SC', serif; color: #1B365D; pointer-events: none; }
.legend { position: absolute; bottom: 0; right: 4px; display: flex; gap: 16px; font: 12px 'PingFang SC', sans-serif; color: #6b6a63; }
.legend span { display: flex; align-items: center; gap: 6px; }
.d { display: inline-block; width: 10px; height: 10px; border-radius: 50%; }
.d.ivory { background: #fbf9f2; box-shadow: 0 0 0 1px #c2c0b6; }
.d.ring { border: 2px solid #5d8a48; width: 8px; height: 8px; }
.d.soft { background: #8fa6c4; }
</style>
