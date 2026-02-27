import { Link } from 'react-router-dom';
import { InstagramLogo } from '@phosphor-icons/react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal border-t border-white/5 py-16 md:py-20 px-6 md:px-12" role="contentinfo">
      {/* Watermark */}
      <div
        className="pointer-events-none select-none absolute bottom-[-5%] right-[0%] w-[80%] md:w-[50%] opacity-[0.03] z-0"
        aria-hidden="true"
      >
        <img
          src="/logo/LIMA67-solo.svg"
          alt=""
          width={400}
          height={100}
          className="w-full h-auto"
          draggable={false}
          style={{
            filter: 'brightness(0) saturate(100%) invert(62%) sepia(40%) saturate(600%) hue-rotate(5deg) brightness(88%)',
          }}
        />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Link to="/" className="inline-block" aria-label="Lima67 — Ir al inicio">
                <Logo variant="light" size="lg" />
              </Link>
            </div>
            <p className="text-sm font-light text-sand/70 leading-relaxed max-w-[340px]">
              La ejecución de un restaurante de lujo, en el escenario que tú elijas. Alta
              hostelería móvil para quienes no aceptan menos que la perfección.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navegación del footer">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sand/80 mb-5">
              Empresa
            </p>
            <ul className="space-y-3" role="list">
              {[
                { label: 'Servicios', href: '#servicios' },
                { label: 'Nuestro proceso', href: '#pilares' },
                { label: 'Por qué Lima67', href: '#por-que' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-light text-sand/80 hover:text-cream transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Enlaces legales">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sand/80 mb-5">
              Legal
            </p>
            <ul className="space-y-3" role="list">
              <li>
                <Link
                  to="/aviso-legal"
                  className="text-sm font-light text-sand/80 hover:text-cream transition-colors duration-300"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-privacidad"
                  className="text-sm font-light text-sand/80 hover:text-cream transition-colors duration-300"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-cookies"
                  className="text-sm font-light text-sand/80 hover:text-cream transition-colors duration-300"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sand/80 mb-5">
              Redes
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/lima67.madrid/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand/70 hover:text-cream transition-colors duration-300"
                aria-label="Síguenos en Instagram"
              >
                <InstagramLogo size={20} weight="light" />
              </a>
              <a
                href="https://www.tiktok.com/@lima67.madrid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand/70 hover:text-cream transition-colors duration-300 [&_svg]:w-5 [&_svg]:h-5"
                aria-label="Síguenos en TikTok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-light text-sand/70 tracking-[0.05em]">
            &copy; {new Date().getFullYear()} Lima67 Catering & Eventos. Todos los derechos reservados.
          </p>
        
        </div>
      </div>
    </footer>
  );
}
