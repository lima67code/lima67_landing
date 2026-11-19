import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Heart, Champagne, Briefcase } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'bodas',
    title: 'Bodas',
    tag: 'B2C',
    icon: Heart,
    description:
      'Banquete, cóctel o estaciones de show cooking, con prueba de degustación previa y coordinación con la finca. Nos ocupamos de la gastronomía y del servicio para que ustedes disfruten de su día.',
    image: '/images/bodas.webp',
    alt: 'Catering para bodas en Madrid',
  },
  {
    id: 'privado',
    title: 'Eventos privados',
    tag: 'B2C',
    icon: Champagne,
    description:
      'Cumpleaños, aniversarios y celebraciones en casa o en el espacio que elijan. Estación de bocaditos, buffet peruano, coctelería y Pisco Bar, con montaje y recogida incluidos.',
    image: '/images/eventos_privados.webp',
    alt: 'Eventos privados con servicio de catering',
  },
  {
    id: 'corporativo',
    title: 'Empresas B2B',
    tag: 'B2B',
    icon: Briefcase,
    description:
      'Coffee breaks, almuerzos de trabajo, cócteles corporativos, presentaciones y eventos de marca. Presupuesto claro, factura con IVA desglosado y un único responsable de principio a fin.',
    image: '/images/corporativo.webp',
    alt: 'Eventos para empresas B2B con servicio de catering',
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imgARef = useRef<HTMLImageElement>(null);
  const imgBRef = useRef<HTMLImageElement>(null);
  const activeBufRef = useRef<'A' | 'B'>('A');
  const tagLineRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);

  // On mount: entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const heading = el.querySelector('[data-heading]');
    const left = el.querySelector('[data-left]');
    const right = el.querySelector('[data-right]');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 78%',
        once: true,
      },
    });

    if (heading)
      tl.fromTo(heading, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    if (left)
      tl.fromTo(left, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5');
    if (right)
      tl.fromTo(right, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7');
  }, []);

  const handleSelect = (index: number) => {
    if (index === active || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    setActive(index);

    const fromBuf = activeBufRef.current;
    const toBuf = fromBuf === 'A' ? 'B' : 'A';
    const fromImg = fromBuf === 'A' ? imgARef.current : imgBRef.current;
    const toImg = toBuf === 'A' ? imgARef.current : imgBRef.current;

    if (!fromImg || !toImg) { isAnimatingRef.current = false; return; }

    // Pre-load new image into the hidden layer
    toImg.src = services[index].image;
    toImg.alt = services[index].alt;
    gsap.set(toImg, { opacity: 0, scale: 1.06 });

    const tl = gsap.timeline({
      onComplete: () => {
        activeBufRef.current = toBuf;
        isAnimatingRef.current = false;
      },
    });

    // Crossfade + subtle scale (solo imagen; título y descripción cambian sin animación)
    tl.to(fromImg, { opacity: 0, scale: 0.97, duration: 0.55, ease: 'power2.inOut' })
      .to(toImg, { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' }, '-=0.35');
  };

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="py-24 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto"
      aria-labelledby="services-heading"
    >
      {/* Header */}
      <div data-heading className="max-w-[740px] mb-16">
        <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-gold mb-5">
          Nuestros servicios
        </p>
        <h2
          id="services-heading"
          className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-charcoal mb-6"
        >
          Un servicio para cada celebración
        </h2>
        <p className="text-base md:text-lg font-normal text-graphite leading-relaxed">
          Nos encargamos del catering completo de su evento: menú, equipo de cocina, sala y barra, montaje y coordinación durante todo el servicio. Trabajamos en tres líneas:
        </p>
      </div>

      {/* Interactive split */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-stretch">

        {/* LEFT — image panel */}
        <div
          data-left
          className="relative w-full lg:w-[45%] rounded-2xl overflow-hidden bg-bone aspect-[4/5] lg:aspect-[5/6]"
        >
          {/* Layer A */}
          <img
            ref={imgARef}
            src={services[0].image}
            alt={services[0].alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
          {/* Layer B (hidden initially) */}
          <img
            ref={imgBRef}
            src={services[0].image}
            alt={services[0].alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 2, opacity: 0 }}
          />
          {/* Active tag overlay */}
          <div className="absolute bottom-5 left-5 z-10 bg-charcoal/80 backdrop-blur-sm px-4 py-2 rounded-full pointer-events-none">
            <span ref={tagLineRef} className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold">
              {services[active].title}
            </span>
          </div>
        </div>

        {/* RIGHT — selector list */}
        <div
          data-right
          className="flex flex-col justify-center gap-2 lg:gap-3 w-full lg:w-[55%]"
          role="list"
          aria-label="Tipos de servicio"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const isActive = active === i;
            return (
              <button
                key={service.id}
                role="listitem"
                onClick={() => handleSelect(i)}
                aria-current={isActive ? 'true' : undefined}
                className={`
                  group cursor-pointer text-left w-full px-6 py-6 lg:flex-1 lg:flex lg:items-center rounded-xl border transition-all duration-400
                  ${isActive
                    ? 'bg-charcoal border-charcoal text-cream'
                    : 'bg-white border-bone text-charcoal hover:border-charcoal/40 hover:bg-bone/50'}
                `}
              >
                <div className="flex items-start gap-4 w-full">
                  {/* Icon */}
                  <div
                    className={`
                      flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300
                      ${isActive ? 'bg-gold/20' : 'bg-bone group-hover:bg-gold/10'}
                    `}
                  >
                    <Icon
                      size={18}
                      weight="light"
                      className={isActive ? 'text-gold' : 'text-graphite group-hover:text-gold'}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <h3
                        className={`font-display text-base font-bold tracking-[0.05em] uppercase ${isActive ? 'text-cream' : 'text-charcoal'
                          }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <p
                      className={`text-sm font-normal leading-relaxed ${isActive ? 'text-cream/75' : 'text-graphite'
                        }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={16}
                    weight="light"
                    className={`flex-shrink-0 mt-1 transition-all duration-300 ${isActive
                      ? 'text-gold translate-x-0 opacity-100'
                      : 'text-graphite/30 -translate-x-1 opacity-0 group-hover:opacity-60 group-hover:translate-x-0'
                      }`}
                  />
                </div>


              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
