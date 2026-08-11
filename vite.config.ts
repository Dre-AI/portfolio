import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes asset paths relative so the built site works at a GitHub
// Pages subpath (e.g. /portfolio/) without a custom domain.
export default defineConfig({
  plugins: [react()],
  base: './',
})
