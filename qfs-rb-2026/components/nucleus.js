// Shared helpers: close-packed nuclei in the textbook style (touching spheres, red protons, blue neutrons).
import * as THREE from 'three'

export const COL = { proton: 0xc0433c, neutron: 0x2f5d8c, x: 0xe0a13a, paper: 0xf5f4ed }

// n points relaxed inside a sphere so neighbours touch at spacing d (simple repulsion)
export function packedPoints(n, d, seed = 1) {
  let s = seed
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  const R = 0.62 * d * Math.cbrt(n)
  const p = Array.from({ length: n }, () => new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(R))
  for (let it = 0; it < 300; it++) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const v = p[i].clone().sub(p[j]); const l = v.length() || 1e-3
        if (l < d) { v.multiplyScalar(0.5 * (d - l) / l); p[i].add(v); p[j].sub(v) }
      }
      p[i].multiplyScalar(0.985)          // gentle pull to the centre keeps it compact
    }
  }
  return p
}

// a nucleus as a Group of spheres; Z protons, N neutrons, nucleon radius r
export function makeNucleus(Z, N, r = 0.5, seed = 3) {
  const g = new THREE.Group()
  const geo = new THREE.SphereGeometry(r, 32, 20)
  const pts = packedPoints(Z + N, 1.9 * r, seed)
  const order = pts.map((_, i) => i)
  let s = seed * 7 + 1
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  order.sort(() => rnd() - 0.5)
  pts.forEach((p, k) => {
    const isP = order[k] < Z
    const m = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({
      color: isP ? COL.proton : COL.neutron, roughness: 0.32, metalness: 0.0, clearcoat: 0.6, clearcoatRoughness: 0.25,
    }))
    m.position.copy(p); m.userData.home = p.clone(); m.userData.proton = isP
    g.add(m)
  })
  return g
}

// renderer with the settings of the three.js core skill (ACES, sRGB, capped pixel ratio, soft shadows)
export function makeRenderer(el, W, H) {
  const r = new THREE.WebGLRenderer({ antialias: true })
  r.setPixelRatio(Math.min(window.devicePixelRatio, 2)); r.setSize(W, H); r.setClearColor(COL.paper)
  r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.1
  r.outputColorSpace = THREE.SRGBColorSpace
  el.appendChild(r.domElement)
  return r
}

export function studioLights(scene) {
  scene.add(new THREE.HemisphereLight(0xffffff, 0xcfc6b4, 1.1))
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(8, 12, 14); scene.add(key)
  const rim = new THREE.DirectionalLight(0xfff1dc, 0.9); rim.position.set(-10, 4, -8); scene.add(rim)
}

// a soft glow sprite (for x and for the halo cloud)
export function glow(color, size, opacity = 0.5) {
  const c = document.createElement('canvas'); c.width = c.height = 128
  const g = c.getContext('2d'); const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.35, 'rgba(255,255,255,0.45)'); grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128)
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), color, transparent: true, opacity, depthWrite: false }))
  sp.scale.set(size, size, 1); return sp
}

// release a renderer for real: dispose() alone keeps the WebGL context alive, and Chrome drops the
// oldest context once about 16 are open (hot reloads and the presenter view multiply them)
export function releaseRenderer(r) {
  if (!r) return
  r.dispose(); r.forceContextLoss(); r.domElement?.remove()
}
