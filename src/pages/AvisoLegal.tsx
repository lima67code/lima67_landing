import LegalLayout from './LegalLayout';

export default function AvisoLegal() {
  return (
    <LegalLayout title="Aviso Legal">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-stone mb-8">
        Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      <h2>1. Datos identificativos del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
        de la Información y del Comercio Electrónico (LSSI-CE), se informa de los siguientes datos:
      </p>
      <ul>
        <li><strong>Titular:</strong> Whitney Solanyee Arquiñigo Pozo</li>
        <li><strong>NIE:</strong> Z0514095G</li>
        <li><strong>Domicilio social:</strong> Calle Alicante 13, 1 E, 28100 Madrid</li>
        <li><strong>Correo electrónico:</strong> administracion@lima67.com</li>
        <li><strong>Teléfono:</strong> +34 631 37 98 40</li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        El presente aviso legal regula el uso y utilización del sitio web <strong>lima67.com</strong> (en adelante, la web),
        del que es titular Whitney Solanyee Arquiñigo Pozo (Lima67 Catering & Eventos). La navegación por la web atribuye la condición de usuario e
        implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        La web tiene por objeto facilitar al usuario la información sobre los servicios de catering y eventos
        ofrecidos por Lima67. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que
        se ofrecen a través de esta web y a no emplearlos para realizar actividades ilícitas o contrarias a la buena fe.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Whitney Solanyee Arquiñigo Pozo (Lima67 Catering & Eventos), por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual
        e industrial de su página web, así como de los elementos contenidos en la misma (textos, imágenes, diseño gráfico,
        código fuente, logotipos, marcas, etc.). Todos los derechos reservados. Queda prohibida la reproducción,
        distribución y comunicación pública de los contenidos sin autorización expresa del titular.
      </p>

      <h2>5. Exclusión de responsabilidad</h2>
      <p>
        La titular no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran
        derivarse de la utilización de los servicios y contenidos por parte de los usuarios. Asimismo, no garantiza la
        disponibilidad y continuidad del funcionamiento de la web.
      </p>

      <h2>6. Legislación aplicable y jurisdicción</h2>
      <p>
        La relación entre la titular y el usuario se regirá por la normativa española vigente.
        Para la resolución de cuantas controversias pudieran surgir se someterán los interesados a los Juzgados
        y Tribunales del domicilio del usuario.
      </p>
    </LegalLayout>
  );
}
