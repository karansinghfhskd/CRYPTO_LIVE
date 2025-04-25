import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: false, // Prevents automatic browser opening
    host: true,   // Listen on all addresses
    port: 3000,   // Use a specific port
    strictPort: true, // Don't try other ports if 3000 is in use
  }
})
