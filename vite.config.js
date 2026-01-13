import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { APP_IDENTITY } from './src/constants/appConfig'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      algorithm: 'brotliCompress', // 'giphy', // Bisa diganti 'brotliCompress' untuk hasil lebih kecil
      ext: '.gz',
      threshold: 10240, // Hanya kompres file di atas 10kb
      deleteOriginFile: false, // Tetap simpan file asli agar aman jika server tidak support
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'icons/*.webp', 'audio/*.mp3', 'icons/*.png'],
      workbox: {
        // Caching semua aset statis
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3}'],
        // Memastikan audio dipre-cache untuk AudioService
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      manifest: {
        name: APP_IDENTITY.fullName,
        short_name: APP_IDENTITY.name,
        description: APP_IDENTITY.description,
        start_url: '/',
        theme_color: '#0f172a', // Mengikuti background logo
        background_color: '#0f172a', // Agar splash screen senada dengan logo
        display: 'standalone', // Membuatnya tampil seperti aplikasi native
        orientation: 'portrait',
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
