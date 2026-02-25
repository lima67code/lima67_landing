import { useEffect, useState } from 'react';
import { List, X, ArrowRight } from '@phosphor-icons/react';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proceso', href: '#pilares' },
    { label: 'Por qué Lima67', href: '#por-que' },
  ];

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-cream/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
        : 'bg-transparent'
        }`}
    >
      <nav
        aria-label="Navegación principal"
        className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 h-20"
      >
        {/* Logo */}
        <a href="#" className="relative z-50" aria-label="Lima67 — Inicio">
          <Logo variant="dark" size="md" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[13px] font-medium tracking-[0.08em] uppercase text-graphite hover:text-charcoal transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#formulario"
              className="group inline-flex items-center gap-2 bg-gold-dark text-cream text-[13px] font-medium tracking-[0.05em] uppercase px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-300"
            >
              Solicitar Propuesta
              <ArrowRight
                size={14}
                weight="bold"
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              />
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative z-50 p-2 text-charcoal"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuOpen ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
        </button>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`fixed inset-0 bg-cream z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          aria-hidden={!menuOpen}
        >
          <Logo variant="dark" size="lg" />

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-light tracking-[0.1em] uppercase text-charcoal hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#formulario"
            onClick={() => setMenuOpen(false)}
            className="group inline-flex items-center gap-3 bg-gold-dark text-cream text-base font-medium tracking-[0.05em] uppercase px-8 py-4 rounded-full mt-4 hover:bg-charcoal transition-colors duration-300"
          >
            Solicitar Propuesta
            <ArrowRight
              size={16}
              weight="bold"
              className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
