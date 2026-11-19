import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  acceptAll,
  consentReady,
  getAcceptedOptional,
  hasValidConsent,
  OPTIONAL_CATEGORIES,
  onOpenPreferences,
  rejectAll,
  saveSelection,
  type OptionalCategory,
} from '../cookieconsent';

type View = 'hidden' | 'notice' | 'preferences';

const OPTIONS: { id: 'necessary' | OptionalCategory; label: string }[] = [
  { id: 'necessary', label: 'Esenciales' },
  // { id: 'functional', label: 'Funcionales' },  // [functional]
  { id: 'analytics', label: 'Analíticas' },
  // { id: 'marketing', label: 'Marketing' },     // [marketing]
];

const btnBase =
  'flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-3 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors duration-300 cursor-pointer';

export default function CookieBanner() {
  const [view, setView] = useState<View>('hidden');
  const [selected, setSelected] = useState<Record<OptionalCategory, boolean>>(
    () => Object.fromEntries(OPTIONAL_CATEGORIES.map((c) => [c, false])) as Record<OptionalCategory, boolean>,
  );
  const titleId = useId();
  const boxRef = useRef<HTMLDivElement>(null);

  // Mostrar el aviso si no hay consentimiento válido
  useEffect(() => {
    let alive = true;
    consentReady.then(() => {
      if (alive && !hasValidConsent()) setView('notice');
    });
    return () => {
      alive = false;
    };
  }, []);

  // Abrir preferencias desde el footer o la política
  useEffect(
    () =>
      onOpenPreferences(() => {
        setSelected(getAcceptedOptional());
        setView('preferences');
      }),
    [],
  );

  // Al abrir preferencias (acción del usuario), mover el foco al primer checkbox.
  // El aviso inicial no roba el foco: no es modal.
  useEffect(() => {
    if (view !== 'preferences') return;
    boxRef.current?.querySelector<HTMLElement>('input:not([disabled])')?.focus({ preventScroll: true });
  }, [view]);

  if (view === 'hidden') return null;

  const close = () => setView('hidden');

  const handleConfirm = () => {
    saveSelection(OPTIONS.flatMap((o) => (o.id !== 'necessary' && selected[o.id] ? [o.id] : [])));
    close();
  };

  return (
    <div
      ref={boxRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      data-lenis-prevent
      onKeyDown={(e) => {
        if (e.key === 'Escape' && view === 'preferences' && hasValidConsent()) close();
      }}
      className="fixed z-[90] bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 sm:w-[460px]
                 bg-cream border border-bone rounded-2xl shadow-[0_12px_48px_rgba(26,20,16,0.14)]
                 p-6 sm:p-7 text-charcoal animate-cookie-in"
    >
      {view === 'notice' ? (
        <>
          <p id={titleId} className="text-[14px] font-normal leading-relaxed text-graphite">
            {/* Al activar [functional]/[marketing], volver a: «…con fines funcionales, analíticos y de marketing.» */}
            Al hacer clic en «Aceptar todas», aceptas el uso de cookies en tu dispositivo con fines
            analíticos. Consulta nuestra{' '}
            <Link to="/politica-cookies" className="font-medium text-gold-dark underline underline-offset-2 hover:text-charcoal">
              política de cookies
            </Link>
            .
          </p>

          <button
            type="button"
            onClick={() => {
              setSelected(getAcceptedOptional());
              setView('preferences');
            }}
            className="mt-4 text-[12px] font-normal text-grey underline underline-offset-4 hover:text-charcoal transition-colors cursor-pointer"
          >
            Gestionar preferencias
          </button>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => {
                rejectAll();
                close();
              }}
              className={`${btnBase} border border-gold-dark text-gold-dark hover:bg-gold-dark hover:text-cream`}
            >
              Rechazar todas
            </button>
            <button
              type="button"
              onClick={() => {
                acceptAll();
                close();
              }}
              className={`${btnBase} border border-gold-dark bg-gold-dark text-cream hover:bg-charcoal hover:border-charcoal`}
            >
              Aceptar todas
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 id={titleId} className="text-center text-[17px] sm:text-xl font-bold tracking-[-0.01em] text-charcoal sm:whitespace-nowrap">
            ¿Qué cookies quieres aceptar?
          </h2>

          <fieldset className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 px-1">
            <legend className="sr-only">Categorías de cookies</legend>
            {OPTIONS.map((o) => {
              const isNecessary = o.id === 'necessary';
              const checked = isNecessary ? true : selected[o.id as OptionalCategory];
              return (
                <label
                  key={o.id}
                  className={`flex items-center gap-3 text-[15px] ${isNecessary ? 'text-stone cursor-not-allowed' : 'text-charcoal cursor-pointer'}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={isNecessary}
                    onChange={(e) =>
                      setSelected((s) => ({ ...s, [o.id]: e.target.checked }))
                    }
                    className="size-5 shrink-0 accent-gold-dark cursor-[inherit] disabled:opacity-60"
                  />
                  {o.label}
                </label>
              );
            })}
          </fieldset>

          <p className="mt-5 text-center text-[12px] font-normal text-stone">
            Detalle de cada cookie en la{' '}
            <Link to="/politica-cookies" className="text-gold-dark underline underline-offset-2 hover:text-charcoal">
              política de cookies
            </Link>
            .
          </p>

          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={handleConfirm}
              className={`${btnBase} max-w-[240px] border border-gold-dark bg-gold-dark text-cream hover:bg-charcoal hover:border-charcoal`}
            >
              Confirmar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
