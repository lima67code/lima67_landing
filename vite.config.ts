import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const n8nUrl = env.VITE_N8N_WEBHOOK_URL
  const proxy =
    n8nUrl && n8nUrl.startsWith('http')
      ? {
          '/api/n8n-webhook': {
            target: new URL(n8nUrl).origin,
            changeOrigin: true,
            rewrite: () => new URL(n8nUrl).pathname,
          },
        }
      : undefined

  return {
    plugins: [react(), tailwindcss()],
    server: { proxy },
  }
})
