<script setup>
// What the spectator model counts after stripping. b + x come in, x is absorbed by the target (target lights up:
// stripping), b flies on with two possible fates: bound (green, what the experiment counts) or broken (red,
// counted as surviving by the spectator formula all the same). Colours follow the sector table on the H_eff slide.
import { useIsSlideActive } from '@slidev/client'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { COL, makeNucleus, studioLights, glow, sharedRender } from './nucleus.js'

const props = defineProps({ width: { type: Number, default: 400 }, height: { type: Number, default: 150 } })
const host = ref(null), labOn = ref(0), labX = ref(0)
const active = useIsSlideActive()
let canvas, raf, drawn = false
const ss = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u) }

onMounted(() => {
  const W = props.width, H = props.height, dpr = Math.min(window.devicePixelRatio, 2)
  canvas = document.createElement('canvas'); canvas.width = W * dpr; canvas.height = H * dpr
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px'; host.value.appendChild(canvas)
  const scene = new THREE.Scene(); studioLights(scene)
  const cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 100); cam.position.set(0, 0, 12); cam.lookAt(0, 0, 0)

  const A = makeNucleus(7, 7, 0.34, 11); A.position.set(-3.0, -1.6, 0); scene.add(A)
  const Ag = glow(0xe9674f, 3.4, 0); Ag.position.copy(A.position); scene.add(Ag)
  const mkB = (seed) => makeNucleus(5, 4, 0.3, seed)
  const b = mkB(5); scene.add(b)
  const x = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 16), new THREE.MeshPhysicalMaterial({ color: COL.x, roughness: 0.3, clearcoat: 0.6, transparent: true }))
  const xg = glow(COL.x, 1.1, 0.7); xg.material.depthTest = false; x.add(xg); scene.add(x)
  // the two fates
  const bUp = mkB(5), bDn = mkB(5); scene.add(bUp, bDn)
  const gUp = glow(0x7fae5c, 2.6, 0), gDn = glow(0xd0584f, 2.6, 0); gUp.material.depthTest = gDn.material.depthTest = false; scene.add(gUp, gDn)
  const dnKids = bDn.children.map(m => ({ m, dir: m.userData.home.clone().normalize().add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, 0).multiplyScalar(0.6)) }))
  const setOp = (g, o) => g.traverse(m => { if (m.material) { m.material.transparent = true; m.material.opacity = o } })

  const T = 9.0, clock = new THREE.Clock()
  const start = new THREE.Vector3(-9.0, 0.7, 0), meet = new THREE.Vector3(-3.0, 0.7, 0)
  const upEnd = new THREE.Vector3(1.3, 1.9, 0), dnEnd = new THREE.Vector3(1.3, -1.6, 0)
  const loop = () => {
    const t = clock.getElapsedTime() % T
    const fin = ss(0, 2.0, t)                                    // b + x fly in
    b.position.copy(start).lerp(meet, fin)
    const xAbs = ss(2.0, 3.0, t)                                 // x drawn into the target: stripping
    x.position.copy(b.position).add(new THREE.Vector3(0.75, -0.35, 0)).lerp(A.position, xAbs)
    x.material.opacity = 1 - ss(2.6, 3.0, t); xg.material.opacity = 0.7 * (1 - ss(2.6, 3.0, t)); x.visible = t < 3.0
    Ag.material.opacity = 0.75 * ss(2.4, 2.9, t) * (1 - ss(6.5, 7.3, t))
    const q = 0.06 * ss(2.4, 2.9, t) * (1 - ss(6.5, 7.3, t)) * Math.sin(15 * t); A.scale.set(1 + q, 1 - q, 1)
    // split into the two fates
    const sp = ss(3.2, 5.0, t), show = t > 3.2 ? 1 : 0, fade = 1 - ss(8.3, 8.9, t)
    b.visible = t <= 3.2
    bUp.visible = bDn.visible = t > 3.2
    bUp.position.copy(meet).lerp(upEnd, sp); bDn.position.copy(meet).lerp(dnEnd, sp)
    setOp(bUp, show * fade); gUp.position.copy(bUp.position); gUp.material.opacity = 0.55 * ss(4.4, 5.0, t) * fade
    const br = ss(4.3, 5.4, t)                                   // the lower copy breaks apart
    dnKids.forEach(({ m, dir }) => m.position.copy(m.userData.home).addScaledVector(dir, 1.3 * br))
    setOp(bDn, show * fade); gDn.position.copy(bDn.position); gDn.material.opacity = 0.5 * ss(4.4, 5.0, t) * fade
    labOn.value = ss(4.8, 5.4, t) * fade; labX.value = ss(2.4, 2.9, t) * (1 - ss(6.5, 7.3, t))
    b.rotation.y = bUp.rotation.y = 0.3 * t; A.rotation.y = 0.15 * t
    if (active.value || !drawn) { sharedRender(scene, cam, canvas, W, H); drawn = true }
    raf = requestAnimationFrame(loop)
  }
  loop()
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); canvas?.remove() })
</script>

<template>
  <div class="oc-wrap" :style="{ width: width + 'px', height: height + 'px' }">
    <div ref="host"></div>
    <div class="oc-lab oc-t" :style="{ opacity: labX }">x absorbed by A</div>
    <div class="oc-lab oc-up" :style="{ opacity: labOn }">bound: <b>measured</b></div>
    <div class="oc-lab oc-dn" :style="{ opacity: labOn }">broken: <b>counted too</b></div>
  </div>
</template>

<style scoped>
.oc-wrap { position: relative; }
.oc-lab { position: absolute; font-family: Newsreader, Georgia, serif; font-size: 0.82rem; white-space: nowrap; pointer-events: none; }
.oc-t { left: 0; bottom: 12%; color: #b53333; }
.oc-up { left: 66%; top: 16%; color: #4a6b3a; }
.oc-dn { left: 66%; bottom: 16%; color: #b53333; }
</style>
