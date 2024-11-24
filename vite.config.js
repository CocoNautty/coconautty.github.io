import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
    rollupOptions: {
      output: {
        // Define manual chunks for better optimization
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three'; // Group all node_modules into a single chunk
          } else if (id.includes('node_modules')) {
            return 'vendor'; // Group all node_modules into a single chunk
          } else if (id.includes('src/components')) {
            return 'components'; // Group all components into a separate chunk
          } else {
            return 'main'; // Group all other code into a separate chunk
          }
        }
      }
    },
    // Adjust the chunk size warning limit if needed
    chunkSizeWarningLimit: 600 // Set this to a higher limit (e.g., 600 kB)
  }
})
