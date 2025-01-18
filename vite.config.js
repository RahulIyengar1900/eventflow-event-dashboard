import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/eventflow-event-dashboard/',
  server: {
    port: 5178,
  },
})
