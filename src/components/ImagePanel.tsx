import { useEffect, useRef } from 'react';

const images = [
  { src: '/images_marquee/decoracion.webp', alt: 'Decoración Lima67' },
  { src: '/images_marquee/fernando_partner.webp', alt: 'Fernando partner Lima67' },
  { src: '/images_marquee/pulpoman.webp', alt: 'Pulpo al estilo Lima67', objectPosition: 'bottom' as const },
  { src: '/images_marquee/decoracion_2.webp', alt: 'Decoración eventos' },
  { src: '/images_marquee/mesa_fiesta.webp', alt: 'Mesa de fiesta' },
  { src: '/images_marquee/personal_lima67.webp', alt: 'Personal Lima67' },
  { src: '/images_marquee/decoracion_3.webp', alt: 'Ambiente Lima67' },
  { src: '/images_marquee/pisco.webp', alt: 'Pisco peruano' },
  { src: '/images_marquee/pulpodish.webp', alt: 'Plato de pulpo Lima67' },
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
