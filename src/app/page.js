'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Shield, ChevronDown, CheckCircle } from 'lucide-react';
import DebtRecoverySection from '@/components/DebtRecoverySection';
import CoreServicesSection from '@/components/CoreServicesSection';
import GallerySection from '@/components/GallerySection';
import TestimonialSection from '@/components/TestimonialSection';
import AuthoritySection from '@/components/AuthoritySection';
import ContactFooterSection from '@/components/ContactFooterSection';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const textRef = useRef([]);
  const bgRef = useRef(null);
  const bottomScrollRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initial Hero Animation
    const tl = gsap.timeline();

    tl.fromTo(
      bgRef.current,
      { scale: 1.1, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 2, ease: 'power3.inOut' },
    )
      .fromTo(
        textRef.current,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=1',
      )
      .fromTo(
        bottomScrollRef.current,
        { autoAlpha: 0, y: -20 },
        { autoAlpha: 0.7, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5',
      );

    // Parallax effect on scroll
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToTextRef = (el) => {
    if (el && !textRef.current.includes(el)) {
      textRef.current.push(el);
    }
  };

  return (
    <main className="relative w-full">
      {/* Hero Section */}
      <section
        ref={containerRef}
        className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full z-0 origin-center"
        >
          <Image
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80"
            alt="Sentinel VIP Hero"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center max-w-7xl">
          <div className="max-w-4xl space-y-8">
            <div
              ref={addToTextRef}
              className="inline-flex items-center space-x-2 border border-gold/30 bg-gold/10 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <Shield className="w-5 h-5 text-gold" />
              <span className="text-gold uppercase tracking-widest text-sm font-semibold">
                Eksklusivitas & Reputasi
              </span>
            </div>

            <h1
              ref={addToTextRef}
              className="text-5xl md:text-7xl lg:text-8xl text-text-offwhite leading-[1.1] uppercase"
            >
              We Protect <br />
              What{' '}
              <span className="text-gold italic font-light font-heading">
                Matters
              </span>
            </h1>

            <p
              ref={addToTextRef}
              className="text-lg md:text-xl text-text-muted max-w-2xl font-light leading-relaxed"
            >
              Penyedia jasa eksklusif{' '}
              <strong className="text-white font-medium">Debt Recovery</strong>,
              Bodyguard, Detektif Swasta, dan Pengamanan VIP Profesional di
              Indonesia. Kami menjamin kerahasiaan, ketegasan, dan resolusi.
            </p>

            <div
              ref={addToTextRef}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <button className="group relative overflow-hidden bg-gold text-dark px-10 py-5 font-bold uppercase tracking-widest transition-all hover:bg-gold-light">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Konsultasi Gratis <CheckCircle className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
              </button>
              <button className="group px-10 py-5 border border-white/20 text-white font-semibold uppercase tracking-widest transition-all hover:border-gold hover:text-gold backdrop-blur-sm">
                Pelajari Layanan
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={bottomScrollRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
            Scroll
          </span>
          <ChevronDown className="w-6 h-6 text-gold animate-bounce" />
        </div>
      </section>

      {/* Full-fledged Debt Recovery Section */}
      <DebtRecoverySection />

      {/* Core Executive Services Section */}
      <CoreServicesSection />

      {/* Operational Gallery Bento Box */}
      <GallerySection />

      {/* Testimonial & Review Section */}
      <TestimonialSection />

      {/* Authority / Why Choose Us Section */}
      <AuthoritySection />

      {/* CTA & Footer */}
      <ContactFooterSection />
    </main>
  );
}

