// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'   // 需安装此模块
// https://vitejs.dev/config/
export default defineConfig({
 
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
      proxy: {
      '/api': {
        // 后台地址
        target: 'http://admin.raz-kid.cn',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api/')
      },
      
    }
  },
  

})