import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: '/src/components',
      pages: '/src/pages',
      assets: '/src/assets',
      css: '/src/css',
      services: '/src/services'
    }
  }
  // server: {
  //   proxy: {
  //     "/": {
  //       target: 'http://localhost:2121',
  //     }
  //   }
  // }
});
