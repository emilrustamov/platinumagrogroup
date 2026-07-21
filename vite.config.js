import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'  // ← ДОБАВЬТЕ ЭТУ СТРОКУ
import autoLazyImages from './plugins/auto-lazy-images'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    autoLazyImages(),
    vue(),
    vueDevTools(),
    tailwindcss(),  // ← ДОБАВЬТЕ ЭТУ СТРОКУ
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})