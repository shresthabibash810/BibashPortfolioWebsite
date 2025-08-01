// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) // Generates dist/stats.html bundle report
  ],
  base: process.env.VITE_BASE_PATH || '/BibashPortfolioWebsite',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          aos: ['aos'],
          propTypes: ['prop-types']
        }
      }
    }
  }
});