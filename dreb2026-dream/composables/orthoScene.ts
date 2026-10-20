// Shared runtime for the click-driven Three.js scenes (skill rule 12).
//
// Owns everything that is the same in every scene: renderer and orthographic camera,
// resize and device-pixel-ratio policy, the requestAnimationFrame loop with exponential
// easing, the HTML labels projected out of world space, and full disposal on unmount.
// A scene component supplies only two things: how to build its objects, and where each
// object should be at each beat.
import * as THREE from 'three'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

export type XYZ = [number, number, number]
/** A number scales all three axes; an XYZ scales them independently. */
export type Scale = number | XYZ
export type State = { pos?: XYZ; opacity?: number; scale?: Scale; spin?: number }
export type Beat = { title: string; text: string; verdict: string; target: Record<string, State> }
/** A label anchored to a registered object, optionally nudged in world units. */
export type Label = { name: string; text: string; offset?: XYZ; mark?: boolean }

// The kami palette, in the hex values three.js wants.
export const PALETTE = {
  paper: 0xf5f4ed,
  ivory: 0xfaf9f5,
  sand: 0xe8e6dc,
  edge: 0xc2c0b6,
  stone: 0x66655f,
  ink: 0x1b365d,
  red: 0xb53333,
  olive: 0x5e5d59,
}

export function mat(color: number = PALETTE.ivory, opacity = 1) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.42,
    clearcoat: 0.7,
    clearcoatRoughness: 0.2,
    metalness: 0,
    transparent: true,
    opacity,
  })
}

export function block(w: number, h: number, d: number, color: number = PALETTE.ivory) {
  // The corner radius has to stay well under the smallest half-dimension. On a thin
  // plate or a rule, a radius that exceeds it inflates the geometry instead of
  // rounding it, which is how a 2 cm ground line turns into a shelf.
  const radius = Math.min(d / 3, 0.06, Math.min(w, h, d) * 0.42)
  return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, radius), mat(color))
}

export function cylinder(r: number, h: number, color: number = PALETTE.ivory, segments = 40) {
  return new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, segments), mat(color))
}

export function sphere(r: number, color: number = PALETTE.ivory, opacity = 1) {
  return new THREE.Mesh(new THREE.SphereGeometry(r, 40, 28), mat(color, opacity))
}

export function cone(r: number, h: number, color: number = PALETTE.ink, opacity = 1) {
  return new THREE.Mesh(new THREE.ConeGeometry(r, h, 16), mat(color, opacity))
}

export function ringGeometry(r: number, tube: number, color: number = PALETTE.ink, opacity = 1) {
  return new THREE.Mesh(new THREE.TorusGeometry(r, tube, 8, 96), mat(color, opacity))
}


export interface SceneApi {
  /** The three.js scene, for anything the helpers do not cover. */
  scene: THREE.Scene
  /**
   * Add an object at a position and give it a name the beat targets can move.
   *
   * This SETS `object.position`, so any offset you put on that same object before
   * calling it is discarded. If the object needs an internal offset (a bar whose
   * base sits at the origin, so a uniform scale is its height), put the offset on a
   * child and register a wrapper Group. Use `wrap` for that.
   */
  register: (name: string, object: THREE.Object3D, pos?: XYZ) => THREE.Object3D
  /**
   * Register a wrapper Group holding children at fixed local offsets, so scaling the
   * beat target grows them about the wrapper origin rather than about their centre.
   */
  at: (name: string, pos: XYZ, children: Array<[THREE.Object3D, XYZ]>) => THREE.Group
  /** Every registered object, by name. */
  items: Record<string, { object: THREE.Object3D; opacity: number }>
  /** A tube through the given points, optionally closed. Returns the mesh and its path. */
  tube: (points: XYZ[], color: number, radius?: number, opacity?: number, closed?: boolean) => { mesh: THREE.Mesh; path: THREE.CatmullRomCurve3 }
  /** Point the tube's cone along its own tangent at t. */
  head: (path: THREE.CatmullRomCurve3, t: number, color?: number, size?: number) => THREE.Mesh
}

export function useOrthoScene(cfg: {
  /** Scene height in CSS px. */
  height: number
  /** Half-extent of the content, in world units. The camera frames exactly this. */
  boundX: number
  boundY: number
  /** The world point the camera should centre on. */
  centerX?: number
  centerY?: number
  /** Camera height above the ground plane; sets the tilt. */
  camY?: number
  build: (api: SceneApi) => void
  /** The slide's click count, read live. */
  step: () => number
  /** Target state for each beat. Must be pure in the beat index. */
  target: (step: number) => Record<string, State>
  labels: Label[]
}) {
  const host = ref<HTMLDivElement>()
  const root = ref<HTMLDivElement>()
  const ready = ref(false)
  const failure = ref('')
  const projected = ref<Record<string, { left: string; top: string; opacity: number }>>({})

  const items: Record<string, { object: THREE.Object3D; opacity: number }> = {}
  const baseOpacity = new Map<THREE.Material, number>()
  let renderer: THREE.WebGLRenderer | undefined
  let scene: THREE.Scene
  let camera: THREE.OrthographicCamera
  let raf = 0
  let observer: ResizeObserver | undefined
  let lastTime = 0
  let disposed = false
  let current = 0
  const scratch = new THREE.Vector3()
  const labelPoint = new THREE.Vector3()
  const instant = () => navigator.webdriver || matchMedia('(prefers-reduced-motion: reduce)').matches

  const api: SceneApi = {
    scene: undefined as unknown as THREE.Scene,
    register(name, object, pos = [0, 0, 0]) {
      object.position.set(...pos)
      items[name] = { object, opacity: 1 }
      object.traverse((child) => {
        if (!(child instanceof THREE.Mesh || child instanceof THREE.Line)) return
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        for (const m of mats) { m.transparent = true; baseOpacity.set(m, m.opacity) }
      })
      scene.add(object)
      return object
    },
    at(name, pos, children) {
      const group = new THREE.Group()
      for (const [child, offset] of children) {
        child.position.set(...offset)
        group.add(child)
      }
      api.register(name, group, pos)
      return group
    },
    items,
    tube(points, color, radius = 0.013, opacity = 1, closed = false) {
      const path = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), closed)
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(path, closed ? 160 : 80, radius, 8, closed), mat(color, opacity))
      scene.add(mesh)
      return { mesh, path }
    },
    head(path, t, color = PALETTE.ink, size = 0.075) {
      const head = cone(size, size * 2.7, color)
      head.position.copy(path.getPoint(t))
      head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), path.getTangent(t).normalize())
      scene.add(head)
      return head
    },
  }

  const UNIT: XYZ = [1, 1, 1]

  function apply(k: number) {
    const target = cfg.target(current)
    let remaining = 0
    for (const [name, want] of Object.entries(target)) {
      const item = items[name]
      if (!item) continue
      if (want.pos) item.object.position.lerp(scratch.set(...want.pos), k)

      const wantScale: XYZ = typeof want.scale === 'number'
        ? [want.scale, want.scale, want.scale]
        : (want.scale ?? UNIT)
      const from = item.object.scale.toArray()
      for (let axis = 0; axis < 3; axis++) {
        const next = THREE.MathUtils.lerp(from[axis], wantScale[axis], k)
        item.object.scale.setComponent(axis, next)
        remaining += Math.abs(next - wantScale[axis])
      }

      if (want.spin !== undefined) item.object.rotation.z = THREE.MathUtils.lerp(item.object.rotation.z, want.spin, k)

      const wantOpacity = want.opacity ?? 1
      item.opacity = THREE.MathUtils.lerp(item.opacity, wantOpacity, k)
      item.object.traverse((child) => {
        if (!(child instanceof THREE.Mesh || child instanceof THREE.Line)) return
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        for (const m of mats) m.opacity = (baseOpacity.get(m) ?? 1) * item.opacity
      })

      remaining += (want.pos ? item.object.position.distanceTo(scratch) : 0)
        + Math.abs(item.opacity - wantOpacity)
    }
    return remaining
  }

  function placeLabels() {
    const w = host.value?.clientWidth || 1
    const h = cfg.height
    const result: typeof projected.value = {}
    for (const label of cfg.labels) {
      const item = items[label.name]
      if (!item) continue
      const offset = label.offset ?? [0, 0, 0]
      labelPoint.copy(item.object.position).add(new THREE.Vector3(...offset)).project(camera)
      result[label.name] = {
        left: `${((labelPoint.x + 1) * w) / 2}px`,
        top: `${((1 - labelPoint.y) * h) / 2}px`,
        opacity: Math.min(1, item.opacity * 1.6),
      }
    }
    projected.value = result
  }

  function draw(now = performance.now()) {
    raf = 0
    if (!renderer || disposed || document.hidden || failure.value) return
    const dt = Math.min((now - lastTime) / 1000 || 0.016, 0.06)
    lastTime = now
    const remaining = apply(instant() ? 1 : 1 - Math.exp(-dt * 9))
    renderer.render(scene, camera)
    placeLabels()
    ready.value = true
    root.value?.setAttribute('data-frame-step', String(current))
    root.value?.setAttribute('data-settled', remaining < 0.003 ? 'true' : 'false')
    if (remaining >= 0.003) raf = requestAnimationFrame(draw)
  }

  function schedule() {
    if (!renderer || failure.value) return
    cancelAnimationFrame(raf)
    lastTime = performance.now() - 16
    draw()
  }

  function resize() {
    const w = host.value?.clientWidth || 0
    if (!renderer || w === 0) return
    const aspect = w / cfg.height
    // The tightest frame that still contains the content: whichever of the two
    // constraints binds, the other follows from the viewport aspect.
    const halfW = Math.max(cfg.boundX, cfg.boundY * aspect)
    const halfH = halfW / aspect
    camera.left = -halfW; camera.right = halfW; camera.top = halfH; camera.bottom = -halfH
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.max(0.75, Math.min(devicePixelRatio, 1.6, Math.sqrt(1.6e6 / (w * cfg.height)))))
    renderer.setSize(w, cfg.height)
    schedule()
  }

  function visibility() { if (document.hidden) cancelAnimationFrame(raf); else schedule() }

  // The step getter is read live inside the loop, so any change re-eases from wherever
  // the objects currently are. Nothing is snapped, so reverse navigation lands right.
  watch(cfg.step, (step) => { current = step; schedule() })

  onMounted(() => {
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
      renderer.setClearColor(PALETTE.paper, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05
      host.value!.appendChild(renderer.domElement)
      renderer.domElement.setAttribute('aria-label', 'Click-driven three-dimensional illustration')
      renderer.domElement.addEventListener('webglcontextlost', (event) => {
        event.preventDefault()
        cancelAnimationFrame(raf)
        failure.value = 'The graphics context was lost. Refresh the page, or use the stepped PDF.'
      })
      renderer.domElement.addEventListener('webglcontextrestored', () => { failure.value = ''; schedule() })
      scene = new THREE.Scene()
      api.scene = scene
      const pmrem = new THREE.PMREMGenerator(renderer)
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
      scene.environmentIntensity = 0.6
      pmrem.dispose()
      camera = new THREE.OrthographicCamera(-5, 5, 1.5, -1.5, 0.1, 100)
      const cx = cfg.centerX ?? 0
      camera.position.set(cx, cfg.camY ?? 1.5, 16)
      camera.lookAt(cx, cfg.centerY ?? 0, 0)
      scene.add(new THREE.HemisphereLight(0xffffff, 0xd1c9b5, 1.6))
      const key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(-4, 6, 8); scene.add(key)
      const fill = new THREE.DirectionalLight(0xfff6e6, 0.6); fill.position.set(5, -1, 5); scene.add(fill)
      cfg.build(api)
      current = cfg.step()
      apply(1)
      observer = new ResizeObserver(resize); observer.observe(host.value!)
      document.addEventListener('visibilitychange', visibility)
      resize()
    } catch (error) {
      failure.value = `This browser cannot create a WebGL scene (${(error as Error)?.message ?? error}). Use one that can, or the stepped PDF.`
    }
  })

  onUnmounted(() => {
    disposed = true
    cancelAnimationFrame(raf)
    observer?.disconnect()
    document.removeEventListener('visibilitychange', visibility)
    const geometries = new Set<THREE.BufferGeometry>()
    const materials = new Set<THREE.Material>()
    scene?.traverse((child) => {
      if (!(child instanceof THREE.Mesh || child instanceof THREE.Line)) return
      geometries.add(child.geometry)
      for (const m of Array.isArray(child.material) ? child.material : [child.material]) materials.add(m)
    })
    geometries.forEach(g => g.dispose())
    materials.forEach(m => m.dispose())
    renderer?.dispose()
    renderer?.forceContextLoss()
    renderer?.domElement.remove()
  })

  return { host, root, ready, failure, projected }
}
