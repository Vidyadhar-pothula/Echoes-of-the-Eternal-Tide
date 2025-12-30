import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Auto-detect base path: Use repo name for production/GitHub Pages, root for local dev
  base: process.env.NODE_ENV === 'production' ? '/Echoes-of-the-Eternal-Tide/' : '/',
})
