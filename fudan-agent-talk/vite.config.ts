import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// slidev dev mode fails to resolve relative asset imports (<img src="./figures/...">)
// from the virtual slide modules (slides.md__slidev_N.md); build mode resolves them
// fine. Resolve them against the talk root explicitly so `npm run dev` works.
export default defineConfig({
  plugins: [
    {
      name: 'resolve-relative-assets-from-virtual-slides',
      resolveId(id, importer) {
        if (id.startsWith('./') && importer && importer.includes('slides.md__slidev'))
          return resolve(__dirname, id)
      },
    },
  ],
})
