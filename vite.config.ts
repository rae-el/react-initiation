import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import {VitePWA, VitePWAOptions } from "vite-plugin-pwa"

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ['tasks.png', 'tasks_maskable.png'],
  manifest:{"short_name": "Task It",
    "name": "Task It",
    "icons": [{
      "src":"tasks.png",
      "type":"image/png",
      "sizes":"512x512"
    },
    {
      "src":"tasks_maskable.png",
      "type":"image/png",
      "sizes":"512x512",
      "purpose":"any maskable"
    }
    ],
    "scope":"/",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
}}

// https://vitejs.dev/config/
export default defineConfig({
  server:{port:5173},
  plugins: [react(), viteCompression(), VitePWA(manifestForPlugin)],
})
