import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://192.168.239.1:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      }
    }
  },
  base: './',
  assetsInclude: [
    '**/*.ttf',
    '**/*.woff2',
    '**/*.woff',
    '**/*.eot',
    '**/*.svg',
    '**/*.png',
    '**/*.jpg',
  ],
  resolve: {
    alias: {
      'assets': '/HotSpot-web/public',
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png)$/.test(name ?? '')){
              return 'assets/images/[name]-[hash][extname]';
          }

          if (/\.svg$/.test(name ?? '')) {
              return 'assets/icons/[name]-[hash][extname]';   
          }

          if (/\.(ttf|otf|woff|woff2|eot)$/.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})
