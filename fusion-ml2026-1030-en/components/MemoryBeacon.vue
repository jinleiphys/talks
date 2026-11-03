<script setup lang="ts">
// Slide 24: CLAUDE.md sits in the project; each new conversation arrives,
// reads it first (a beam), then goes to work.
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { INK, dotTexture, mountStage } from '../utils/three-kit'

const host = ref<HTMLDivElement>()
const tags = ref<{ key: string; text: string; cls: string; left: string; top: string; opacity: number }[]>([])
let stop: (() => void) | undefined
const SESSIONS = 6, PERIOD = 7.2

onMounted(() => {
  stop = mountStage(host.value!, { fov: 32, pos: [0, 2.3, 7.0], look: [0, -0.25, 0], env: 0.9 }, ({ scene, camera, renderer }) => {
    const phys = (color: number, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.35, clearcoat: 1, transparent: true, ...o })
    // The file.
    const file = new THREE.Group(); scene.add(file)
    file.add(new THREE.Mesh(new RoundedBoxGeometry(1.25, 1.6, 0.08, 3, 0.03), phys(INK.ivory)))
    for (let j = 0; j < 7; j++) {
      const l = new THREE.Mesh(new THREE.BoxGeometry(j === 0 ? 0.6 : 0.9 - (j % 3) * 0.15, 0.045, 0.01), phys(j === 0 || j === 3 ? INK.ink : INK.edge, { clearcoat: 0 }))
      l.position.set(-0.08, 0.6 - j * 0.18, 0.05); file.add(l)
    }
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTexture(0.2), color: INK.inkSoft, transparent: true, opacity: 0.6, depthWrite: false })); halo.scale.setScalar(3.4); halo.position.z = -0.2; file.add(halo)
    const floor = new THREE.Mesh(new THREE.RingGeometry(1.9, 1.93, 96), new THREE.MeshBasicMaterial({ color: INK.inkSoft, transparent: true, opacity: 0.5, side: THREE.DoubleSide }))
    floor.rotation.x = -Math.PI / 2; floor.position.y = -1.05; scene.add(floor)

    // Sessions: bubbles that arrive on the ring, read (beam), then rise and fade.
    const bubbleGeo = new THREE.SphereGeometry(0.2, 32, 20)
    const sessions = Array.from({ length: SESSIONS }, (_, i) => {
      const m = new THREE.Mesh(bubbleGeo, phys(INK.inkLight)); scene.add(m)
      const beamMat = new THREE.MeshBasicMaterial({ color: INK.inkLight, transparent: true, opacity: 0 })
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1, 8), beamMat); scene.add(beam)
      return { m, beam, beamMat, phase: (i / SESSIONS) * PERIOD, angle: i * 2.39 }
    })
    const key = new THREE.DirectionalLight(0xffffff, 2); key.position.set(-3, 5, 8); scene.add(key)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0bc, 1.1))
    const v = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), dir = new THREE.Vector3()
    const proj = (p: THREE.Vector3) => { v.copy(p).project(camera); const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight; return { left: `${(v.x + 1) * w / 2}px`, top: `${(1 - v.y) * h / 2}px` } }

    return (t) => {
      file.rotation.y = Math.sin(t * 0.5) * 0.25
      halo.material.opacity = 0.45 + 0.15 * Math.sin(t * 2)
      const out: typeof tags.value = []
      sessions.forEach((s, i) => {
        const u = ((t + s.phase) % PERIOD) / PERIOD          // 0..1 life of this session
        const a = s.angle + t * 0.1
        const r = 1.9, y = -1.05 + 0.25 + (u > 0.55 ? (u - 0.55) * 4 : 0)
        s.m.position.set(r * Math.sin(a), y, r * Math.cos(a))
        const life = Math.min(1, u / 0.08) * (u > 0.85 ? (1 - u) / 0.15 : 1)
        ;(s.m.material as THREE.MeshPhysicalMaterial).opacity = life
        ;(s.m.material as THREE.MeshPhysicalMaterial).color.setHex(u > 0.4 ? INK.ink : INK.inkSoft)
        // beam while reading (0.12..0.45)
        const reading = u > 0.12 && u < 0.45 ? Math.sin(((u - 0.12) / 0.33) * Math.PI) : 0
        s.beamMat.opacity = reading * 0.85
        dir.copy(file.position).sub(s.m.position)
        s.beam.position.copy(s.m.position).addScaledVector(dir, 0.5)
        s.beam.scale.y = dir.length()
        s.beam.quaternion.setFromUnitVectors(up, dir.normalize())
        if (i === 0) out.push({ key: 's', text: reading > 0.2 ? '新对话：先读说明文件' : u > 0.45 ? '然后开始干活' : '新对话', cls: 'sess', ...proj(s.m.position.clone().add(new THREE.Vector3(0, 0.42, 0))), opacity: life })
      })
      out.push({ key: 'f', text: 'CLAUDE.md', cls: 'file', ...proj(new THREE.Vector3(0, -1.32, 0.9)), opacity: 1 })
      tags.value = out
      return true
    }
  })
})
onUnmounted(() => stop?.())
</script>

<template>
  <div class="beacon">
    <div ref="host" class="scene-canvas" />
    <div v-for="tg in tags" :key="tg.key" class="tag" :class="tg.cls" :style="{ left: tg.left, top: tg.top, opacity: tg.opacity }">{{ tg.text }}</div>
  </div>
</template>

<style scoped>
.beacon { position: relative; width: 100%; height: 100%; }
.scene-canvas { position: absolute; inset: 0; }
.tag { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none; }
.file { font: 600 14px 'SF Mono', Menlo, monospace; color: #1B365D; }
.sess { font: 600 13px 'PingFang SC', sans-serif; color: #fff; background: #2D5A8A; padding: 2px 8px; border-radius: 10px; }
</style>
