import { useEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagePanel from "./ImagePanel";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.context → al desmontar se revierten timelines y ScrollTriggers
    // (evita animaciones duplicadas peleando por la misma imagen en StrictMode)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        imgRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, force3D: true },
      )
        .fromTo(
          headlineRef.current,
          { y: 80, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.2 },
          "-=1.2",
        )
        .fromTo(
          subRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7",
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5",
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2",
        );

      // Parallax on scroll — el contenedor sobresale un 20% por arriba;
      // yPercent 15 (de un alto de 120%) = 18% de la sección → nunca deja hueco
      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col"
      aria-labelledby="hero-heading"
    >
      {/* Zona del texto: el fondo solo cubre esta parte (no queda detrás del marquee) */}
      <div className="relative flex-1 flex flex-col overflow-hidden pt-35">
        {/* Background image with overlay */}
        <div
          ref={imgRef}
          className="absolute inset-x-0 -top-[20%] bottom-0 will-change-transform"
        >
          <img
            src="/images_marquee/buffet_bocados_peruanos.webp"
            alt="Buffet de bocados peruanos de Lima 67 en un evento"
            width={1400}
            height={933}
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
            Alta{" "}
            <span
              className="text-gold"
              style={{
                fontFamily: "var(--font-villagers)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Cocina Peruana
            </span>{" "}
            para bodas, eventos privados y empresas
          </h1>

          <p
            ref={subRef}
            className="text-base md:text-lg font-normal text-graphite max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Catering, show cooking, coctelería y dirección integral de eventos
            en Madrid. Llevamos al lugar de su celebración nuestro equipo de
            cocina, sala y barra, y nos ocupamos de cada detalle del servicio.
          </p>

          <div ref={ctaRef}>
            <a
              href="#formulario"
              className="group inline-flex items-center gap-3 bg-gold-dark text-cream text-[13px] font-medium tracking-[0.08em] uppercase px-10 py-4 rounded-full hover:bg-charcoal transition-all duration-500 hover:shadow-[0_8px_40px_rgba(182,141,60,0.4)]"
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
      </div>

      {/* Image marquee */}
      <div className="relative z-10 w-full ">
        <ImagePanel />
      </div>
    </section>
  );
}
