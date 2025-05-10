import * as path from "node:path";
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        unauthorized: path.resolve(__dirname, "unauthorized/index.html"),
        app: path.resolve(__dirname, "app/index.html")
      }
    },
    outDir: "../server/static",
  }
})
