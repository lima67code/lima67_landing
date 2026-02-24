import { useEffect, useRef } from 'react';

const images = [
  { src: '/images_marquee/catering.webp', alt: 'Servicio de catering Lima67' },
  { src: '/images_marquee/causa.webp', alt: 'Causa limeña' },
  { src: '/images_marquee/fernando_banderas.webp', alt: 'Fernando Banderas' },
  { src: '/images_marquee/ceviche.webp', alt: 'Ceviche peruano' },
  { src: '/images_marquee/pisco-foto.webp', alt: 'Pisco peruano' },
  { src: '/images_marquee/cocina_aire_libre.webp', alt: 'Cocina al aire libre Lima67' },
  { src: '/images_marquee/fernando_valderrama.webp', alt: 'Fernando Valderrama' },
  { src: '/images_marquee/empanadas.webp', alt: 'Empanadas' },
  { src: '/images_marquee/personal.webp', alt: 'Equipo Lima67' },
  { src: '/images_marquee/pisco_botella.webp', alt: 'Botella de pisco' },
  { src: '/images_marquee/trabajadora.webp', alt: 'Trabajadora Lima67' },
  // Pulpo: juntos en el marquee; pulpoman muestra la parte inferior
  { src: '/images_marquee/pulpodish.webp', alt: 'Plato de pulpo Lima67' },
  { src: '/images_marquee/pulpoman.webp', alt: 'Pulpo al estilo Lima67', objectPosition: 'bottom' as const },
];

// Duplicate the array to create seamless infinite loop
const marqueeImages = [...images, ...images];

export default function ImagePanel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let position = 0;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const speed = isMobile ? 1.0 : 0.5; // px per frame — más rápido en móvil

    // Calculate the width of a single set of images (half of full track)
    const singleSetWidth = track.scrollWidth / 2;

    const animate = () => {
      position += speed;
      // Reset when we've scrolled through one full set
      if (position >= singleSetWidth) {
        position = 0;
      }
      track.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const container = track.parentElement;
    const pause = () => {
      cancelAnimationFrame(animationId);
    };
    const resume = () => {
      animationId = requestAnimationFrame(animate);
    };

    container?.addEventListener('mouseenter', pause);
    container?.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(animationId);
      container?.removeEventListener('mouseenter', pause);
      container?.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <section
      aria-label="Galería de eventos"
      className="w-full overflow-hidden py-8 md:py-14"
    >
      <div
        ref={trackRef}
        className="flex gap-4 w-max"
        style={{ willChange: 'transform' }}
      >
        {marqueeImages.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-xl overflow-hidden w-[280px] h-[300px] md:w-[600px] md:h-[650px]"
          >
            <img
              src={img.src}
              alt={img.alt}
              width={400}
              height={550}
              className="w-full h-full object-cover"
              style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
              loading={i < 3 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
