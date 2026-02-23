import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { sendPageView } from './analytics';
import HomePage from './pages/HomePage';

const AvisoLegal = lazy(() => import('./pages/AvisoLegal'));
const PoliticaPrivacidad = lazy(() => import('./pages/PoliticaPrivacidad'));
const PoliticaCookies = lazy(() => import('./pages/PoliticaCookies'));

function App() {
  const location = useLocation();

  useEffect(() => {
    sendPageView(location.pathname || '/', document.title);
  }, [location.pathname]);

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
