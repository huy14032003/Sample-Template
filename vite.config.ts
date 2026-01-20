import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: Number(env.VITE_PORT) || 3000,
    },
    resolve: {
      alias: {
        '@': path.resolve('src'),
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
  }
})