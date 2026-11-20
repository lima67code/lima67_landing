import { useRef, useEffect } from 'react';
import { CallBell, ChatsCircle, ForkKnife } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: CallBell,
    title: 'Coordinación entre cocina y sala',
    description:
      'Tiempos de servicio planificados y un responsable de Lima 67 presente durante todo el evento.',
  },
  {
    icon: ChatsCircle,
    title: 'Respuesta rápida',
    description:
      'Propuesta en 24 horas y atención directa por teléfono o WhatsApp ante cualquier cambio de menú o logística.',
  },
  {
    icon: ForkKnife,
    title: 'Menús a medida',
    description:
      'Propuestas adaptadas al formato, al número de invitados y a alergias o dietas especiales.',
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

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

    const items = el.querySelectorAll('[data-benefit]');
    gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: { trigger: items[0], start: 'top 85%' },
      }
    );

    // Watermark parallax
    const watermark = el.querySelector('[data-watermark]');
    if (watermark) {
      gsap.to(watermark, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="por-que"
      className="relative py-28 md:py-44 overflow-hidden noise"
      style={{ backgroundColor: '#1A1410' }}
      aria-labelledby="why-heading"
    >
      {/* Watermark logo — derecha */}
      <div
        data-watermark
        className="pointer-events-none select-none absolute bottom-[-5%] right-[0%] w-[80%] md:w-[55%] opacity-[0.05]"
        aria-hidden="true"
      >
        <img
          src="/logo/logo-lima67-wordmark.webp"
          alt=""
          width={1000}
          height={314}
          className="w-full h-auto"
          draggable={false}
          style={{
            filter: 'brightness(0) saturate(100%) invert(62%) sepia(40%) saturate(600%) hue-rotate(5deg) brightness(88%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div data-heading className="max-w-3xl mb-20">
          <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-white mb-5">
            Servicio integral
          </p>
          <h2
            id="why-heading"
            className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-6"
          >
            Un solo equipo.<br />
            <span className="font-normal italic text-gold-light">Un solo interlocutor.</span>
          </h2>
          <p className="text-base font-normal text-cream/75 leading-relaxed">
            Coordinamos la gastronomía, el servicio y los tiempos de su evento con una sola persona de contacto. Usted atiende a sus invitados; nosotros nos ocupamos de todo lo demás.
          </p>
        </div>

        {/* Benefits — sin cards, solo texto */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
          role="list"
          aria-label="Beneficios del servicio integral"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                data-benefit
                className="group"
                role="listitem"
              >
                {/* Icon with circle background */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cream/10 group-hover:bg-cream/18 transition-colors duration-500 mb-6">
                  <Icon
                    size={26}
                    weight="light"
                    className="text-cream"
                  />
                </div>
                {/* Divider */}
                <div className="w-8 h-[1px] bg-cream/20 mb-6 transition-all duration-500 group-hover:w-14 group-hover:bg-cream/50" />
                {/* Title */}
                <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-cream mb-4">
                  {benefit.title}
                </h3>
                {/* Description */}
                <p className="text-base font-normal text-cream/75 leading-relaxed">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
