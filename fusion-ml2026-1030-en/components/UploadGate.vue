<script setup lang="ts">
// Slide 9: three lanes of documents heading to a third-party server.
// Green goes straight in; blue stops at the terms checkpoint first; red is stopped by a shield.
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { INK, dotTexture, mountStage } from '../utils/three-kit'

const host = ref<HTMLDivElement>()
const tags = ref<{ key: string; text: string; cls: string; left: string; top: string }[]>([])
let stop: (() => void) | undefined
const LANES = [
  { y: 1.05, color: INK.green, kind: 'go' },
  { y: 0, color: INK.inkLight, kind: 'check' },
  { y: -1.05, color: INK.red, kind: 'block' },
] as const
const PER = 3, CYCLE = 5.4, X0 = -3.0, X1 = 2.0, XS = 0.6, XC = -0.1

onMounted(() => {
  stop = mountStage(host.value!, { fov: 30, pos: [-0.3, 1.3, 8.2], look: [-0.1, -0.05, 0], env: 0.9 }, ({ scene, camera, renderer }) => {
    const phys = (color: number, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.35, clearcoat: 1, transparent: true, ...o })
    // Server.
    const server = new THREE.Mesh(new THREE.IcosahedronGeometry(0.85, 4), phys(INK.ink, { iridescence: 0.3 })); server.position.set(2.65, 0.15, -0.3); scene.add(server)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTexture(0.2), color: INK.inkSoft, transparent: true, opacity: 0.5, depthWrite: false })); glow.scale.setScalar(3); glow.position.copy(server.position); scene.add(glow)
    // Lanes.
    for (const l of LANES) {
      const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(X0, l.y - 0.32, 0), new THREE.Vector3(l.kind === 'block' ? XS : X1, l.y - 0.32, 0)])
      const line = new THREE.Line(g, new THREE.LineDashedMaterial({ color: l.color, dashSize: 0.12, gapSize: 0.1, transparent: true, opacity: 0.6 }))
      line.computeLineDistances(); scene.add(line)
    }
    // Shield on the red lane.
    const shield = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.95, 1.1, 3, 0.05), phys(INK.red, { opacity: 0.55, emissive: new THREE.Color(INK.red), emissiveIntensity: 0.15 })); shield.position.set(XS + 0.12, -1.05, 0); scene.add(shield)
    const flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTexture(0.2), color: INK.red, transparent: true, opacity: 0, depthWrite: false })); flash.scale.setScalar(1.4); flash.position.set(XS, -1.05, 0.3); scene.add(flash)
    // Terms checkpoint on the blue lane.
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.04, 14, 48), phys(INK.inkLight)); ring.position.set(XC, 0, 0); scene.add(ring)
    // Documents.
    const docGeo = new RoundedBoxGeometry(0.56, 0.72, 0.05, 2, 0.02)
    const docs = LANES.flatMap((l, li) => Array.from({ length: PER }, (_, k) => {
      const m = new THREE.Mesh(docGeo, phys(INK.ivory)); scene.add(m)
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.1, 0.055), phys(l.color, { clearcoat: 0 })); band.position.y = 0.26; m.add(band)
      return { m, l, li, off: (k / PER) * CYCLE + li * 0.5 }
    }))
    const key = new THREE.DirectionalLight(0xffffff, 2); key.position.set(-3, 5, 8); scene.add(key)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d0bc, 1.1))
    const v = new THREE.Vector3()
    const proj = (x: number, y: number, z = 0) => { v.set(x, y, z).project(camera); const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight; return { left: `${(v.x + 1) * w / 2}px`, top: `${(1 - v.y) * h / 2}px` } }
    const ss = THREE.MathUtils.smoothstep

    return (t) => {
      let hit = 0, checking = 0
      for (const d of docs) {
        const u = ((t + d.off) % CYCLE) / CYCLE
        let x: number, o = 1, rz = 0
        if (d.l.kind === 'go') x = THREE.MathUtils.lerp(X0, X1, ss(u, 0, 0.8))
        else if (d.l.kind === 'check') {
          // walk to the ring, wait, then continue
          x = u < 0.35 ? THREE.MathUtils.lerp(X0, XC, ss(u, 0, 0.35)) : u < 0.6 ? XC : THREE.MathUtils.lerp(XC, X1, ss(u, 0.6, 0.9))
          if (u > 0.35 && u < 0.6) checking = 1
        } else {
          x = THREE.MathUtils.lerp(X0, XS, ss(u, 0, 0.45))
          if (u > 0.45) { x = XS - (u - 0.45) * 1.6; rz = (u - 0.45) * 3; o = Math.max(0, 1 - (u - 0.45) / 0.3) }
          if (u > 0.43 && u < 0.55) hit = 1 - Math.abs(u - 0.49) / 0.06
        }
        if (d.l.kind !== 'block') o = Math.min(1, u / 0.06) * (u > 0.82 ? Math.max(0, 1 - (u - 0.82) / 0.1) : 1)
        else o *= Math.min(1, u / 0.06)
        d.m.position.set(x, d.l.y + 0.05 * Math.sin(t * 2 + d.off), 0.1)
        d.m.rotation.z = rz; d.m.rotation.y = Math.sin(t + d.off) * 0.2
        ;(d.m.material as THREE.MeshPhysicalMaterial).opacity = o
        ;((d.m.children[0] as THREE.Mesh).material as THREE.MeshPhysicalMaterial).opacity = o
      }
      flash.material.opacity = Math.max(0, hit) * 0.8
      shield.scale.y = 1 + Math.max(0, hit) * 0.08
      ring.rotation.y = t * (checking ? 2.5 : 0.6)
      ring.scale.setScalar(1 + checking * 0.12)
      server.rotation.y = t * 0.3
      glow.material.opacity = 0.4 + 0.15 * Math.sin(t * 1.8)
      tags.value = [
        { key: 's', text: '第三方服务器', cls: 'srv', ...proj(2.65, -0.9, -0.3) },
        { key: 'r', text: '读服务条款', cls: 'ring', ...proj(XC, -0.6) },
        { key: 'b', text: '挡住', cls: 'shield', ...proj(XS + 0.12, -1.8) },
      ]
      return true
    }
  })
})
onUnmounted(() => stop?.())
</script>

<template>
  <div class="upload">
    <div ref="host" class="scene-canvas" />
    <div v-for="tg in tags" :key="tg.key" class="tag" :class="tg.cls" :style="{ left: tg.left, top: tg.top }">{{ tg.text }}</div>
  </div>
</template>

<style scoped>
.upload { position: relative; width: 100%; height: 100%; }
.scene-canvas { position: absolute; inset: 0; }
.tag { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none; font: 600 13px 'PingFang SC', sans-serif; }
.srv { color: #1B365D; font-size: 14px; }
.ring { color: #2D5A8A; }
.shield { color: #a83a32; }
</style>
