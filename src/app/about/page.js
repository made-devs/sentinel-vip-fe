'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Shield,
  Eye,
  Lock,
  Crosshair,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import ContactFooterSection from '@/components/ContactFooterSection';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const storyRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    let ctx = gsap.context(() => {
      // 2. Hero Animation (Zoom out image, reveal text)
      const tl = gsap.timeline();
      tl.fromTo(
        '.hero-img',
        { scale: 1.2, filter: 'brightness(0.3)' },
        {
          scale: 1,
          filter: 'brightness(0.6)',
          duration: 2,
          ease: 'power3.out',
        },
      )
        .fromTo(
          '.hero-title-line',
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power4.out' },
          '-=1.5',
        )
        .fromTo(
          '.hero-subtitle',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=1',
        );

      // Hero Parallax on Scroll
      gsap.to('.hero-img', {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 3. The Story Pinned Section
      ScrollTrigger.create({
        trigger: storyRef.current,
        start: 'top top',
        end: '+=150%',
        pin: '.story-left',
        scrub: true,
      });

      gsap.fromTo(
        '.story-text p',
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.5,
          scrollTrigger: {
            trigger: '.story-right',
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          },
        },
      );

      // 4. Horizontal Scroll for Values
      // (Replaced by React State Carousel)
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  const coreValues = [
    {
      title: 'Persuasif & Legal',
      desc: 'Kami merancang setiap proses mediasi dengan presisi tinggi, memastikan kepentingan klien terlindungi dan posisi tetap unggul. Didukung kekuatan hukum dan strategi terukur, kami mengubah konflik menjadi kesepakatan yang menguntungkan.',
      icon: <Crosshair className="w-16 h-16 text-gold mb-6" />,
      img: '/gallery1.webp',
    },
    {
      title: 'Proteksi Pasca-Kasus',
      desc: 'Tim pengamanan taktis (bodyguard) dan detektif kami menjadi tameng utama Anda selama hingga pasca proses investigasi dan penagihan berlangsung.',
      icon: <Shield className="w-16 h-16 text-gold mb-6" />,
      img: '/bodyguard2.webp',
    },
    {
      title: 'Kerahasiaan Mutlak',
      desc: 'Sengketa finansial tingkat VVIP menuntut privasi absolut. Kami menjamin kerahasiaan identitas dan reputasi korporat maupun personal Anda tertutup rapat.',
      icon: <Lock className="w-16 h-16 text-gold mb-6" />,
      img: '/gallery4.webp',
    },
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? coreValues.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === coreValues.length - 1 ? 0 : prev + 1));
  };

  return (
    <main
      ref={containerRef}
      className="relative w-full bg-dark text-text-offwhite overflow-x-hidden"
    >
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&w=1920&q=80"
            alt="Sentinel VIP Headquarters"
            fill
            className="hero-img object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/60 to-dark"></div>
        </div>

        <div
          ref={heroTextRef}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20"
        >
          <div className="overflow-hidden mb-4">
            <h1 className="hero-title-line text-5xl md:text-8xl font-heading font-bold uppercase tracking-wider text-white">
              Tidak Terlihat.
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="hero-title-line text-5xl md:text-8xl font-heading font-bold uppercase tracking-wider text-gold">
              Selalu Ada.
            </h1>
          </div>
          <p className="hero-subtitle text-lg md:text-xl text-text-muted font-light max-w-2xl mx-auto">
            Sentinel VIP adalah firma spesialis{' '}
            <strong>Pemulihan Aset (Debt Recovery)</strong> dan intelijen privat
            tingkat tinggi. Kami fokus mengembalikan hak finansial Anda,
            didukung perlindungan taktis komprehensif bagi klien eselon atas.
          </p>
        </div>
      </section>

      {/* 2. THE STORY (Pinning Section) */}
      <section ref={storyRef} className="relative w-full py-20 lg:py-0">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row justify-between">
          {/* Left: Sticky Title */}
          <div className="story-left w-full lg:w-[45%] lg:h-screen flex flex-col justify-center pb-12 lg:pb-0">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-[1px] bg-gold"></span>
              <span className="text-gold tracking-[0.3em] text-sm font-semibold uppercase">
                The Sentinel Standard
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-6 uppercase">
              Fokus <span className="text-gold">Pemulihan Aset,</span> <br />
              <span className="text-white/40">Didukung Keamanan Penuh.</span>
            </h2>
            <div className="relative w-64 h-64 md:w-80 md:h-80 grayscale opacity-50 rounded-full overflow-hidden border border-gold/20">
              <Image
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
                alt="Security Detail"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Scrolling Text */}
          <div className="story-right w-full lg:w-[45%] lg:py-[30vh]">
            <div className="story-text text-lg md:text-xl font-body font-light text-text-muted leading-relaxed space-y-8">
              <p>
                Berawal dari tingginya angka sengketa finansial dan penggelapan
                dana di kalangan elit, Sentinel VIP hadir dengan satu keahlian
                utama: <strong>Debt Recovery (Pemulihan Aset)</strong> yang
                legal, elegan, dan efektif tanpa merusak reputasi.
              </p>
              <p>
                Namun kami menyadari, penyeselesaian aset kelas kakap seringkali
                memicu eskalasi risiko. Karena itulah kami melengkapi layanan
                inti kami dengan divisi pengamanan taktis bersertifikat, mulai
                dari <em>Bodyguard VIP</em>, Tim Respon Cepat, hingga Detektif
                Swasta.
              </p>
              <p>
                Investigasi, pengamanan fisik, dan manajemen risiko kami
                dirancang murni sebagai <em>support system</em> absolut.
                Tujuannya satu: Memastikan proses pemulihan aset Anda berjalan
                lancar, aman, dan tanpa celah hukum.
              </p>
              <p className="text-gold font-bold text-xl md:text-2xl font-heading">
                Fokus utama kami adalah mengembalikan apa yang menjadi hak Anda.
                Perlindungan kami adalah jaminan agar Anda tetap tenang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (CAROUSEL) */}
      <section className="relative w-full py-24 lg:py-32 bg-dark-secondary overflow-hidden">
        {/* Absolute Background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-heading font-bold text-white/[0.02] whitespace-nowrap z-0 pointer-events-none">
          CORE VALUES
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10 mb-16 lg:mb-24">
          <h3 className="text-3xl font-heading font-bold text-white uppercase tracking-widest">
            Filosofi Operasi
          </h3>
          <div className="w-20 h-1 bg-gold mt-4"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="relative overflow-hidden w-full">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] w-full gap-24"
              style={{
                transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 6}rem))`,
              }}
            >
              {coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="w-full shrink-0 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20"
                >
                  <div className="w-full lg:w-1/2 max-w-xl">
                    {val.icon}
                    <div className="text-gold tracking-[0.2em] font-bold text-sm uppercase mb-4">
                      0{idx + 1} // PRINSIP UTAMA
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 uppercase leading-tight">
                      {val.title}
                    </h2>
                    <p className="text-lg md:text-xl text-text-muted font-light leading-relaxed">
                      {val.desc}
                    </p>
                  </div>

                  <div className="w-full lg:w-5/12 h-[40vh] md:h-[50vh] relative rounded-2xl overflow-hidden border border-white/10 group">
                    <Image
                      src={val.img}
                      alt={val.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all duration-700"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="flex items-center justify-between mt-16">
            <div className="flex gap-3">
              {coreValues.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    currentSlide === idx
                      ? 'w-12 bg-gold'
                      : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-gold hover:text-dark hover:border-gold transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-gold hover:text-dark hover:border-gold transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <ContactFooterSection />
    </main>
  );
}
