import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React and core libs
          'react-vendor': ['react', 'react-dom', 'react-router', 'react-router-dom'],
          
          // UI component libraries
          'ui-vendor': [
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            'framer-motion',
            'lucide-react'
          ],
          
          // State management
          'state-vendor': [
            '@reduxjs/toolkit',
            'react-redux',
            'redux-persist',
            'localforage'
          ],
          
          // Charts and data visualization
          'charts-vendor': ['recharts'],
          
          // Forms and validation
          'forms-vendor': [
            'react-hook-form',
            '@hookform/resolvers',
            'zod'
          ],
          
          // Date handling
          'date-vendor': ['date-fns', 'dayjs', 'react-day-picker'],
          
          // HTTP and utilities
          'utils-vendor': [
            'axios',
            'lodash',
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
            'cmdk',
            'qs',
            'ibantools',
            'sonner',
            'next-themes'
          ]
        }
      }
    },
  }
});
