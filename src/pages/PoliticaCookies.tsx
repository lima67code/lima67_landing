import { Link } from 'react-router-dom';
import LegalLayout from './LegalLayout';
import { openCookiePreferences } from '../cookieconsent';

/**
 * Mantener esta tabla sincronizada con src/cookieconsent.ts.
 * Al cambiarla: actualizar LAST_UPDATED y subir CONSENT_REVISION.
 */
const LAST_UPDATED = '19 de noviembre de 2026';

const COOKIES = [
  {
    name: 'cc_cookie',
    owner: 'Lima 67 (propia)',
    purpose: 'Almacena las preferencias de consentimiento de cookies del usuario.',
    type: 'Técnica / necesaria',
    duration: '12 meses',
  },
  {
    name: '_ga',
    owner: 'Google Ireland Ltd. (tercero)',
    purpose: 'Distingue a usuarios únicos asignando un identificador generado aleatoriamente, con fines estadísticos.',
    type: 'Analítica',
    duration: '2 años',
  },
  {
    name: '_ga_D0JF08MCB6',
    owner: 'Google Ireland Ltd. (tercero)',
    purpose: 'Mantiene el estado de la sesión en Google Analytics 4.',
    type: 'Analítica',
    duration: '2 años',
  },
];

export default function PoliticaCookies() {
  return (
    <LegalLayout title="Política de Cookies">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-stone mb-8">
        Última actualización: {LAST_UPDATED}
      </p>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos que un sitio web almacena en el dispositivo del usuario (ordenador,
        tablet o móvil) cuando lo visita. Permiten, entre otras cosas, recordar preferencias o analizar cómo
        se utiliza el sitio. Esta política se aplica a las cookies y tecnologías similares utilizadas en{' '}
        <strong>lima67.com</strong>, conforme al artículo 22.2 de la Ley 34/2002 (LSSI-CE), el Reglamento
        (UE) 2016/679 (RGPD) y la Guía sobre el uso de las cookies de la AEPD.
      </p>

      <h2>2. Responsable</h2>
      <p>
        El responsable del uso de cookies propias es Whitney Solanyee Arquiñigo Pozo (Lima 67 Catering &
        Eventos). Contacto: <a href="mailto:administracion@lima67.com" className="text-gold-dark underline underline-offset-2">administracion@lima67.com</a>.
        Más información en el <Link to="/aviso-legal" className="text-gold-dark underline underline-offset-2">Aviso Legal</Link>.
      </p>

      <h2>3. Cookies que utilizamos</h2>
      <p>Esta web utiliza únicamente dos categorías de cookies:</p>
      <ul>
        <li>
          <strong>Esenciales:</strong> imprescindibles para recordar tu elección sobre cookies. Están
          exentas de consentimiento y siempre están activas.
        </li>
        {/* [functional] Descomentar al activar la categoría y añadir sus cookies a COOKIES
        <li>
          <strong>Funcionales:</strong> recuerdan preferencias o funciones adicionales que elijas.
          Solo se instalan si las aceptas.
        </li>
        */}
        <li>
          <strong>Analíticas:</strong> nos permiten medir de forma agregada el número de visitas y cómo se
          navega por la web, para mejorarla. <strong>Solo se instalan si las aceptas.</strong>
        </li>
        {/* [marketing] Descomentar al activar la categoría y añadir sus cookies a COOKIES
        <li>
          <strong>Marketing:</strong> permiten medir campañas publicitarias o mostrar anuncios
          relevantes. Solo se instalan si las aceptas.
        </li>
        */}
      </ul>
      <p>
        No utilizamos cookies funcionales, publicitarias ni de redes sociales. Si en el futuro las
        incorporamos, actualizaremos esta política y te volveremos a pedir el consentimiento.
      </p>

      <div className="not-prose overflow-x-auto my-8 rounded-xl border border-bone">
        <table className="w-full text-left text-[13px] leading-snug [&_td]:px-3">
          <caption className="sr-only">Listado de cookies utilizadas</caption>
          <thead className="bg-cream-dark text-charcoal">
            <tr>
              {['Cookie', 'Titular', 'Finalidad', 'Tipo', 'Duración'].map((h) => (
                <th key={h} scope="col" className="px-3 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-bone">
            {COOKIES.map((c) => (
              <tr key={c.name} className="align-top">
                <td className="px-4 py-3 font-mono text-[13px] text-charcoal whitespace-nowrap">{c.name}</td>
                <td className="px-4 py-3">{c.owner}</td>
                <td className="px-4 py-3 min-w-[200px]">{c.purpose}</td>
                <td className="px-4 py-3">{c.type}</td>
                <td className="px-4 py-3 whitespace-nowrap">{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>4. Cookies de terceros y transferencias internacionales</h2>
      <p>
        Las cookies analíticas son gestionadas por Google Ireland Limited a través de Google Analytics 4,
        configurado mediante Google Tag (gtag.js) con el «Modo de consentimiento» de Google: mientras no
        aceptes, el script de Google no se carga y no se instala ninguna cookie analítica. Google puede
        tratar datos fuera del Espacio Económico Europeo; dichas transferencias se amparan en el Marco de
        Privacidad de Datos UE-EE. UU. y en las cláusulas contractuales tipo de la Comisión Europea. Más
        información en la{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold-dark underline underline-offset-2">
          política de privacidad de Google
        </a>{' '}
        y en{' '}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-gold-dark underline underline-offset-2">
          cómo usa Google los datos de los sitios que utilizan sus servicios
        </a>.
      </p>
      <p>
        Las fuentes tipográficas de la web se sirven desde nuestro propio servidor, por lo que no se
        comunica tu dirección IP a terceros para cargarlas.
      </p>

      <h2>5. Consentimiento y cómo modificarlo</h2>
      <p>
        Al acceder por primera vez se muestra un banner que te permite <strong>aceptar</strong>,{' '}
        <strong>rechazar</strong> o <strong>configurar</strong> las cookies no necesarias, con la misma
        facilidad en todos los casos. Tu elección se conserva durante 12 meses; transcurrido ese plazo, o si
        cambian las cookies utilizadas, volveremos a solicitarla. Si tu navegador envía la señal Global
        Privacy Control, se interpretará como rechazo de las cookies analíticas.
      </p>
      <p>
        Puedes retirar o modificar tu consentimiento en cualquier momento desde el enlace «Configurar
        cookies» del pie de página o desde aquí:
      </p>
      <p>
        <button
          type="button"
          onClick={openCookiePreferences}
          className="inline-flex items-center bg-gold-dark text-cream text-[12px] font-medium tracking-[0.08em] uppercase px-7 py-3 rounded-full hover:bg-charcoal transition-colors duration-300 cursor-pointer"
        >
          Configurar cookies
        </button>
      </p>
      <p>
        Al retirar el consentimiento, las cookies analíticas se eliminan automáticamente. La retirada no
        afecta a la licitud del tratamiento realizado previamente.
      </p>

      <h2>6. Cómo bloquear o eliminar cookies desde el navegador</h2>
      <p>
        También puedes bloquear o eliminar las cookies desde la configuración de tu navegador:{' '}
        <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-gold-dark underline underline-offset-2">Chrome</a>,{' '}
        <a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer" className="text-gold-dark underline underline-offset-2">Firefox</a>,{' '}
        <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-gold-dark underline underline-offset-2">Safari</a>{' '}
        y{' '}
        <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-gold-dark underline underline-offset-2">Edge</a>.
        Bloquear las cookies técnicas puede impedir que recordemos tu elección.
      </p>

      <h2>7. Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
        como se indica en nuestra{' '}
        <Link to="/politica-privacidad" className="text-gold-dark underline underline-offset-2">Política de Privacidad</Link>,
        y presentar una reclamación ante la Agencia Española de Protección de Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-gold-dark underline underline-offset-2">www.aepd.es</a>).
      </p>
    </LegalLayout>
  );
}
