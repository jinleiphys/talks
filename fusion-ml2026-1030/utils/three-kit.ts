// Shared Three.js shell for the deck's scenes: renderer, environment light,
// resize, hidden-tab pause, deterministic frame for export, and disposal.
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

export const INK = {
  paper: 0xf5f4ed, ivory: 0xfbf9f2, sand: 0xe8e6dc, edge: 0xc2c0b6,
  ink: 0x1b365d, inkLight: 0x2d5a8a, inkSoft: 0x8fa6c4,
  red: 0xc0503f, green: 0x5d8a48, amber: 0xc9953b,
}

export type Stage = {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  /** Re-run the loop after a step change when the scene is not continuously animated. */
  wake: () => void
}
export type Frame = (t: number, dt: number) => boolean | void   // return true to keep animating

// Export (webdriver) and reduced motion get one settled frame at a fixed time.
export const isStatic = () => navigator.webdriver || matchMedia('(prefers-reduced-motion: reduce)').matches

export function mountStage(host: HTMLElement, opts: { fov?: number; pos?: [number, number, number]; look?: [number, number, number]; exposure?: number; env?: number }, build: (s: Stage) => Frame) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = opts.exposure ?? 1
  host.appendChild(renderer.domElement)
  renderer.domElement.style.display = 'block'

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex
  scene.environmentIntensity = opts.env ?? 0.9
  pmrem.dispose()

  const camera = new THREE.PerspectiveCamera(opts.fov ?? 35, 1, 0.1, 200)
  camera.position.set(...(opts.pos ?? [0, 0, 12]))
  camera.lookAt(...(opts.look ?? [0, 0, 0]))

  let raf = 0, last = 0, t = 0, disposed = false
  const still = isStatic()
  const stage: Stage = { scene, camera, renderer, wake: () => kick() }
  const frame = build(stage)

  function loop(now: number) {
    raf = 0
    if (disposed || document.hidden) return
    const dt = Math.min((now - last) / 1000 || 0.016, 0.05)
    last = now
    t += dt
    const more = frame(still ? 6 : t, still ? 1 : dt)
    renderer.render(scene, camera)
    if (!still && more !== false) raf = requestAnimationFrame(loop)
    else if (still && more) raf = requestAnimationFrame(loop)   // let step lerps settle, then stop
  }
  function kick() { if (!raf && !disposed) { last = performance.now() - 16; raf = requestAnimationFrame(loop) } }
  function resize() {
    const w = host.clientWidth, h = host.clientHeight
    if (!w || !h) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.max(1, Math.min(devicePixelRatio, 2, Math.sqrt(2.2e6 / (w * h)))))
    renderer.setSize(w, h)
    kick()
  }
  const ro = new ResizeObserver(resize); ro.observe(host)
  const vis = () => { if (!document.hidden) kick() }
  document.addEventListener('visibilitychange', vis)
  resize()

  return () => {
    disposed = true; cancelAnimationFrame(raf); ro.disconnect()
    document.removeEventListener('visibilitychange', vis)
    scene.traverse((o: any) => {
      o.geometry?.dispose?.()
      for (const m of [].concat(o.material ?? [])) (m as THREE.Material).dispose()
    })
    envTex.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove()
  }
}

/** Soft round sprite for point clouds. */
export function dotTexture(soft = 0.5) {
  const c = document.createElement('canvas'); c.width = c.height = 64
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(soft, 'rgba(255,255,255,.55)'); grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Seeded PRNG so every reload and the export draw the same arrangement. */
export function rng(seed = 1) {
  let a = seed | 0
  return () => {   // mulberry32
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const ease = (cur: number, target: number, dt: number, rate = 6) => cur + (target - cur) * (1 - Math.exp(-dt * rate))
