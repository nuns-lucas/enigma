import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
// frontend/vite.config.ts
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // Necessário para Docker
    port: 5173,
    watch: {
      usePolling: true, // Garante que o Hot Reload funcione no Windows/Docker
    },
  },
  // ... resto da config
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
