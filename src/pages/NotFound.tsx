import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import Logo from '../components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-cream/95 backdrop-blur-md border-b border-bone">
        <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.08em] uppercase text-graphite hover:text-charcoal transition-colors"
          >
            <ArrowLeft size={16} weight="bold" />
            Volver al inicio
          </Link>
          <Logo variant="dark" size="sm" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-7xl md:text-8xl font-display font-bold text-charcoal tracking-tight">
            404
          </p>
          <p className="mt-4 text-lg text-graphite leading-relaxed">
            La página que buscas no existe o ha sido movida.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-cream text-sm font-medium tracking-[0.08em] uppercase rounded-sm hover:bg-graphite transition-colors"
          >
            <ArrowLeft size={16} weight="bold" />
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
