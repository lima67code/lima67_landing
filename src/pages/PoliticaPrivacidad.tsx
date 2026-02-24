import LegalLayout from './LegalLayout';

export default function PoliticaPrivacidad() {
  return (
    <LegalLayout title="Política de Privacidad">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-stone mb-8">
        Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        <strong>Identidad:</strong> Whitney Solanyee Arquiñigo Pozo<br />
        <strong>NIE:</strong> Z0514095G<br />
        <strong>Dirección:</strong> Calle Alicante 13, 1 E, 28100 Madrid<br />
        <strong>Correo electrónico:</strong> administracion@lima67.com<br />
        <strong>Teléfono:</strong> +34 631 37 98 40
      </p>

      <h2>2. Finalidad del tratamiento</h2>
      <p>
        Los datos personales facilitados a través del formulario de contacto o vía WhatsApp se utilizarán para:
      </p>
      <ul>
        <li>Gestionar las solicitudes de propuestas y presupuestos</li>
        <li>Mantener la comunicación necesaria para la organización de eventos</li>
        <li>Enviar información comercial sobre nuestros servicios, solo si el usuario ha prestado su consentimiento</li>
      </ul>

      <h2>3. Legitimación</h2>
      <p>
        La base jurídica del tratamiento es el consentimiento del interesado al facilitar sus datos,
        así como la ejecución de medidas precontractuales (art. 6.1.a y 6.1.b del RGPD).
      </p>

      <h2>4. Conservación de los datos</h2>
      <p>
        Los datos se conservarán mientras mantenga una relación comercial con Lima67 o durante el tiempo
        necesario para cumplir con las obligaciones legales. Una vez finalizado el servicio y transcurridos
        los plazos legales aplicables, los datos serán suprimidos de forma segura.
      </p>

      <h2>5. Destinatarios</h2>
      <p>
        Los datos no se cederán a terceros salvo obligación legal. En el caso de comunicación vía WhatsApp,
        los datos serán tratados por Meta (WhatsApp) de conformidad con su política de privacidad.
      </p>

      <h2>6. Derechos del interesado</h2>
      <p>
        El usuario puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión,
        limitación del tratamiento, portabilidad y oposición ante el responsable del tratamiento, dirigiéndose
        al correo electrónico o dirección postal indicados. Asimismo, tiene derecho a presentar una reclamación
        ante la Agencia Española de Protección de Datos (AEPD): <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-teal-dark underline">www.aepd.es</a>.
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Se han adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad e
        integridad de los datos personales, así como para evitar su alteración, pérdida, tratamiento o
        acceso no autorizado.
      </p>
    </LegalLayout>
  );
}
