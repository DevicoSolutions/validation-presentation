import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/*.d.ts'],
    },
  },
  optimizeDeps: {
    include: ['@validation/ui'],
  },
})
