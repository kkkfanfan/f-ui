import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/')
    }
  },
  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    lib: {
      entry: './package/index.js',
      name: 'fan-vue3-ui'
    }
  },
  server: {
    proxy: {
      '/api': 'http://testapi.xuexiluxian.cn'
    }
  }
})
