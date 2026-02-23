import { useEffect, useRef } from 'react';
import { CaretDown, ArrowRight } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImagePanel from './ImagePanel';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(
      imgRef.current,
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.8 }
    )
      .fromTo(
        headlineRef.current,
        { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 },
        '-=1.2'
      )
      .fromTo(
        subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.7'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );

    // Parallax on scroll
    gsap.to(imgRef.current, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden pt-35"
      aria-labelledby="hero-heading"
    >
      {/* Background image with overlay */}
      <div ref={imgRef} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <img
          src="/images/corporativo.webp"
          alt="Ambiente de catering de alta cocina peruana en evento"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-cream/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-6xl w-full mx-auto px-6 text-center py-16">
        <h1
          id="hero-heading"
          ref={headlineRef}
          className="font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold leading-[1.08] tracking-[-0.02em] text-charcoal mb-8"
        >
          Alta <span
            className="text-gold"
            style={{ fontFamily: 'var(--font-villagers)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >Cocina Peruana</span> de autor, diseñada para la dimensión de su evento
        </h1>

        <p
          ref={subRef}
          className="text-base md:text-lg font-regular text-graphite max-w-4xl mx-auto leading-relaxed mb-12"
        >
          Desde cenas privadas íntimas hasta recepciones oficiales de alto nivel. Trasladamos nuestra cocina y staff para garantizar una ejecución de excelencia en cualquier escenario.
        </p>

        <div ref={ctaRef}>
          <a
            href="#formulario"
            className="group inline-flex items-center gap-3 bg-gold text-cream text-[13px] font-medium tracking-[0.08em] uppercase px-10 py-4 rounded-full hover:bg-gold-dark transition-all duration-500 hover:shadow-[0_8px_40px_rgba(182,141,60,0.4)]"
          >
            Solicitar Presupuesto
            <ArrowRight
              size={15}
              weight="bold"
              className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            />
          </a>
        </div>
      </div>

      {/* Image marquee */}
      <div className="relative z-10 w-full ">
        <ImagePanel />
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-pulse"
        aria-hidden="true"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">
          Descubre más
        </span>
        <CaretDown size={16} weight="light" className="text-stone" />
      </div>
    </section>
  );
}
