import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
      '@stores': path.resolve('src/stores'),
      '@assets': path.resolve('src/assets'),
      '@components': path.resolve('src/components'),
      '@pages': path.resolve('src/pages'),
      '@hooks': path.resolve('src/hooks'),
      '@utils': path.resolve('src/utils'),
      '@locales': path.resolve('src/locales'),
      '@services': path.resolve('src/services'),
      '@types': path.resolve('src/types'),
      '@features': path.resolve('src/features'),
      '@constants': path.resolve('src/constants')
    }
  }
})
