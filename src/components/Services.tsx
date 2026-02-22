import { useRef, useEffect } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Institucional',
    tag: 'B2G',
    description:
      'Protocolo de excelencia y sabores de origen para recepciones diplomáticas donde la imagen de su institución es la prioridad.',
    image:
      '/images_marquee/catering.webp',
    alt: 'Recepción diplomática con servicio de protocolo',
  },
  {
    title: 'Corporativo',
    tag: 'B2B',
    description:
      'Logística ejecutiva y menús de autor diseñados para juntas de alta dirección que exigen discreción y tiempos exactos.',
    image:
      '/images/corporativo.webp',
    alt: 'Cena corporativa elegante con servicio de catering',
  },
  {
    title: 'Privado',
    tag: 'B2C',
    description:
      'La intimidad de su residencia convertida en un restaurante de lujo con servicio exclusivo y platos de firma con herencia peruana.',
    image:
      '/images/privado2.webp',
    alt: 'Evento privado exclusivo en residencia de lujo',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Heading reveal
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
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
          },
        }
      );
    }

    // Stagger cards
    const cards = cardsRef.current?.querySelectorAll('[data-card]');
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="py-24 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto"
      aria-labelledby="services-heading"
    >
      {/* Header */}
      <div data-heading className="max-w-[740px] mb-20">
        <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-forest mb-5">
          Nuestros servicios
        </p>
        <h2
          id="services-heading"
          className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-charcoal mb-6"
        >
          Un servicio para cada escenario
        </h2>
        <p className="text-base md:text-lg font-light text-graphite leading-relaxed">
          No somos un servicio de catering genérico. Hemos diseñado nuestra estructura para
          responder a las necesidades específicas de tres sectores donde la imagen y el rigor son
          activos críticos.
        </p>
      </div>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        role="list"
        aria-label="Tipos de servicio"
      >
        {services.map((service) => (
          <article
            key={service.title}
            data-card
            className="card-lift group bg-white rounded-xl overflow-hidden border border-bone"
            role="listitem"
          >
            <div className="img-zoom aspect-[4/3] relative">
              <img
                src={service.image}
                alt={service.alt}
                width={400}
                height={300}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-lg font-bold tracking-[0.05em] uppercase text-charcoal mb-3">
                {service.title}
              </h3>
              <p className="text-sm font-light text-graphite leading-relaxed">
                {service.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <a
          href="#formulario"
          className="group inline-flex items-center gap-3 text-[13px] font-medium tracking-[0.08em] uppercase text-charcoal border border-charcoal px-8 py-4 rounded-full hover:bg-charcoal hover:text-cream transition-all duration-500"
        >
          Solicitar presupuesto
          <ArrowRight
            size={16}
            weight="light"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
}
