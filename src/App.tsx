import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';

const AvisoLegal = lazy(() => import('./pages/AvisoLegal'));
const PoliticaPrivacidad = lazy(() => import('./pages/PoliticaPrivacidad'));
const PoliticaCookies = lazy(() => import('./pages/PoliticaCookies'));

function App() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center" aria-live="polite">
        <span className="text-graphite">Cargando…</span>
      </div>
    }>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
      </Routes>
    </Suspense>
  );
}

export default App;
