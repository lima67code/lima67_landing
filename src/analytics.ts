/**
 * Google Analytics 4 (GA4).
 * Solo se carga si existe VITE_GA_MEASUREMENT_ID (ej. G-XXXXXXXXXX).
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function loadGtagScript(id: string): Promise<void> {
  return new Promise((resolve) => {
    if (window.gtag) {
      window.gtag('config', id);
      resolve();
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.onload = () => {
      window.gtag('config', id, {
        send_page_view: false, // Lo enviamos nosotros en cada cambio de ruta (SPA)
        anonymize_ip: true,
      });
      resolve();
    };
    document.head.appendChild(script);
  });
}

let initialized = false;

export function initGoogleAnalytics(): void {
  if (!MEASUREMENT_ID || typeof MEASUREMENT_ID !== 'string' || !MEASUREMENT_ID.startsWith('G-')) {
    return;
  }
  if (initialized) return;
  initialized = true;
  loadGtagScript(MEASUREMENT_ID);
}

/** Envía page_view (útil en SPA cuando gtag ya está cargado por el snippet en index.html). */
export function sendPageView(path: string, title?: string): void {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
  });
}

export function hasAnalytics(): boolean {
  return Boolean(MEASUREMENT_ID && MEASUREMENT_ID.startsWith('G-'));
}
