import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Convierte el CSS inyectado por Vite en carga no bloqueante (preload + onload) para mejorar LCP. */
function deferStylesheetPlugin(): import('vite').Plugin {
  return {
    name: 'defer-stylesheet',
    apply: 'build',
    transformIndexHtml(html: string) {
      return html.replace(
        /<link(\s+[^>]*?)rel="stylesheet"(\s+[^>]*?)href="([^"]+)"([^>]*)\s*\/?>/gi,
        (_, _before, _mid, href: string) =>
          `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet" href="${href}"></noscript>`
      )
    },
  }
}

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
    plugins: [react(), tailwindcss(), deferStylesheetPlugin()],
    server: { proxy },
  }
})
