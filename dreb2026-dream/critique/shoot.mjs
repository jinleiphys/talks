// Screenshot each slide at its final click state, with GPU WebGL.
// usage: node shoot.mjs <baseUrl> <outDir> <first> <last> [probe]
import { chromium } from 'playwright-chromium'
import fs from 'node:fs'

const [base, out, first, last, probe] = process.argv.slice(2)
fs.mkdirSync(out, { recursive: true })
const browser = await chromium.launch({
  channel: 'chromium', // full chromium, new headless: can use the GPU
  args: ['--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=vulkan',
         '--enable-features=Vulkan', '--enable-unsafe-webgpu'],
})
const page = await browser.newPage({ viewport: { width: 1980, height: 1114 } })
if (probe) {
  await page.goto('about:blank')
  console.log(await page.evaluate(() => {
    const gl = document.createElement('canvas').getContext('webgl')
    const e = gl && gl.getExtension('WEBGL_debug_renderer_info')
    return gl ? gl.getParameter(e ? e.UNMASKED_RENDERER_WEBGL : gl.RENDERER) : 'no webgl'
  }))
}
for (let n = +first; n <= +last; n++) {
  const t = Date.now()
  // SLOW=12:3 → slide 12 is stepped through 3 clicks live, 6 s each, as the audience sees it
  const slow = (process.env.SLOW || '').split(',').map(x => x.split(':')).find(([m]) => m === String(n))
  if (slow) {
    await page.goto(`${base}/${n}?clicks=0`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(4000)
    for (let i = 0; i < +slow[1]; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(6000) }
  } else {
    await page.goto(`${base}/${n}?clicks=99`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(2500) // let scenes settle
  }
  await page.screenshot({ path: `${out}/${String(n).padStart(2, '0')}.png` })
  console.log(n, Date.now() - t, 'ms')
}
await browser.close()
