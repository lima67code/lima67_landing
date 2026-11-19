import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Pillars from '../components/Pillars';
import WhyUs from '../components/WhyUs';
import FormularioSection from '../components/FormularioSection';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Navbar />

      <main id="main-content" role="main">
        <Hero />
        <Services />
        <Pillars />
        <WhyUs />
        <FormularioSection />
      </main>

      <Footer />
    </>
  );
}
