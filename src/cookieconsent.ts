/**
 * Motor de consentimiento de cookies (vanilla-cookieconsent v3, sin su UI).
 * La interfaz visible es src/components/CookieBanner.tsx.
 *
 * Categorías y su correspondencia con Google Consent Mode v2:
 *   - necessary  → siempre activa (cc_cookie). Sin consentimiento.
 *   - analytics  → analytics_storage  (_ga, _ga_D0JF08MCB6)
 *
 * Categorías preparadas pero DESACTIVADAS (la web aún no usa cookies de este
 * tipo). Para activarlas, buscar «[functional]» / «[marketing]» y descomentar
 * en este archivo, en CookieBanner.tsx y en PoliticaCookies.tsx:
 *   - functional → functionality_storage, personalization_storage
 *   - marketing  → ad_storage, ad_user_data, ad_personalization
 *
 * Inventario real de cookies: ver src/pages/PoliticaCookies.tsx.
 * Si se añade una cookie o servicio: actualizar la política y subir
 * CONSENT_REVISION para volver a pedir el consentimiento.
 */
import * as CookieConsent from 'vanilla-cookieconsent';

const GA_ID = 'G-D0JF08MCB6';
const CONSENT_REVISION = 1;

export type OptionalCategory =
  // | 'functional'   // [functional]
  | 'analytics';
// | 'marketing';    // [marketing]

export const OPTIONAL_CATEGORIES: OptionalCategory[] = [
  // 'functional',    // [functional]
  'analytics',
  // 'marketing',     // [marketing]
];

const OPEN_EVENT = 'lima67:cookie-preferences';

let gaLoaded = false;

function loadGtagScript(): void {
  if (gaLoaded) return;
  gaLoaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

function syncGoogleConsent(): void {
  const has = (c: OptionalCategory) => CookieConsent.acceptedCategory(c);
  const v = (ok: boolean) => (ok ? 'granted' : 'denied');

  window.gtag?.('consent', 'update', {
    // functionality_storage: v(has('functional')),    // [functional]
    // personalization_storage: v(has('functional')),  // [functional]
    analytics_storage: v(has('analytics')),
    // ad_storage: v(has('marketing')),                // [marketing]
    // ad_user_data: v(has('marketing')),              // [marketing]
    // ad_personalization: v(has('marketing')),        // [marketing]
  });

  if (has('analytics') /* || has('marketing') */) loadGtagScript();
}

let readyResolve: () => void = () => {};
export const consentReady: Promise<void> = new Promise((resolve) => {
  readyResolve = resolve;
});

export function initCookieConsent(): void {
  CookieConsent.run({
    revision: CONSENT_REVISION,
    autoShow: false,           // La UI la pinta CookieBanner.tsx
    hideFromBots: false,
    respectGpc: true,
    cookie: {
      name: 'cc_cookie',
      expiresAfterDays: 365,
      sameSite: 'Lax',
    },
    onConsent: syncGoogleConsent,
    onChange: syncGoogleConsent,
    categories: {
      necessary: { enabled: true, readOnly: true },
      // functional: { enabled: false },  // [functional]
      analytics: {
        enabled: false,
        autoClear: { cookies: [{ name: /^_ga/ }], reloadPage: false },
      },
      // [marketing]
      // marketing: {
      //   enabled: false,
      //   autoClear: { cookies: [{ name: /^_gcl/ }], reloadPage: false },
      // },
    },
    // Requerido por la librería; su modal nunca se muestra.
    language: {
      default: 'es',
      translations: {
        es: {
          consentModal: {},
          preferencesModal: { sections: [] },
        },
      },
    },
  }).then(() => readyResolve());
}

/* — API para la UI — */

export function hasValidConsent(): boolean {
  return CookieConsent.validConsent();
}

export function getAcceptedOptional(): Record<OptionalCategory, boolean> {
  return Object.fromEntries(
    OPTIONAL_CATEGORIES.map((c) => [c, CookieConsent.acceptedCategory(c)]),
  ) as Record<OptionalCategory, boolean>;
}

export function acceptAll(): void {
  CookieConsent.acceptCategory('all');
}

export function rejectAll(): void {
  CookieConsent.acceptCategory([]);
}

export function saveSelection(selected: OptionalCategory[]): void {
  CookieConsent.acceptCategory(['necessary', ...selected]);
}

/** Abre el panel de preferencias (footer, política de cookies…). */
export function openCookiePreferences(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenPreferences(handler: () => void): () => void {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
