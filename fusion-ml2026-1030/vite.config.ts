import { defineConfig } from 'vite'
import { realpathSync } from 'node:fs'

export default defineConfig({
  server: {
    fs: {
      allow: [process.cwd(), realpathSync('node_modules')],
    },
  },
  build: { cssMinify: false },
})
