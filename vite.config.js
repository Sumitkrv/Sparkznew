import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          // Keep video files in root with original names for better caching
          if (assetInfo.name && assetInfo.name.endsWith('.mp4')) {
            return '[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  // Optimize video asset handling
  assetsInclude: ['**/*.mp4'],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lenis'],
    exclude: ['@react-three/fiber', '@react-three/drei', 'three']
  }
})
