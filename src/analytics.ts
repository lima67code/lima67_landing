/**
 * Google Analytics 4 (GA4) — helpers para SPA.
 * El snippet base se carga en index.html con send_page_view: false.
 * Estas funciones gestionan page_views manuales y eventos custom.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function sendPageView(path: string, title?: string): void {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
  });
}

export function sendEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (!window.gtag) return;
  window.gtag('event', eventName, params);
}

export function hasAnalytics(): boolean {
  return typeof window.gtag === 'function';
}
