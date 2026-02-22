import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: 'Staff de Élite',
    subtitle: 'Equipo formado en alta hostelería y protocolo internacional para un servicio sin fricciones.',
    image: '/images_marquee/personal.webp',
    alt: 'Personal profesional de catering en uniforme',
  },
  {
    title: 'Sitios Exclusivos',
    subtitle: 'Acceso a entornos singulares que refuerzan el prestigio de su convocatoria.',
    image: '/images_marquee/ceviche.webp',
    alt: 'Lugar exclusivo decorado para evento premium',
  },
  {
    title: 'Cocina Peruana In-Situ',
    subtitle: 'Elaboración íntegra en el lugar del evento para garantizar la frescura y la complejidad de los sabores que definen nuestra gastronomía.',
    image: '/images_marquee/cocina_aire_libre.webp',
    alt: 'Chef preparando gastronomía de autor en el lugar del evento',
  },
];

export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Heading
    const heading = el.querySelector('[data-heading]');
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        }
      );
    }

    // Pillar cards with stagger
    const cards = el.querySelectorAll('[data-pillar]');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        }
      );

      // Parallax on internal image
      const img = card.querySelector('img');
      if (img) {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pilares"
      className="py-24 md:py-40 bg-charcoal relative noise"
      aria-labelledby="pillars-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div data-heading className="max-w-[740px] mx-auto text-center mb-20">
          <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-forest-light mb-5">
            Nuestro proceso
          </p>
          <h2
            id="pillars-heading"
            className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-cream mb-6"
          >
            Los pilares de una ejecución impecable
          </h2>
          <p className="text-base md:text-lg font-light text-sand leading-relaxed">
            Mientras otros subcontratan servicios, nosotros controlamos toda la cadena de valor para
            garantizar que la promesa se cumpla en cada detalle.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" role="list" aria-label="Pilares de servicio">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              data-pillar
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-default transform-gpu"
              role="listitem"
            >
              {/* Image — contained in its own overflow-hidden div to prevent parallax bleed */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={pillar.image}
                  alt={pillar.alt}
                  width={400}
                  height={533}
                  className="absolute inset-0 w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 pillar-overlay transition-opacity duration-500 group-hover:opacity-90" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                {/* Accent line — teal on hover como detalle de marca */}
                <div className="w-8 h-[1px] bg-cream/40 mb-4 transition-all duration-500 group-hover:w-12 group-hover:bg-teal-light" />
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-[0.03em] uppercase text-cream mb-2 leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm font-light text-cream/70 leading-relaxed opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
                  {pillar.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
