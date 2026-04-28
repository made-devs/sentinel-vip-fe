'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ContactFooterSection from '@/components/ContactFooterSection';

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

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
      // 2. Hero Animations
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

      // 3. Masonry Parallax Effect
      gsap.utils.toArray('.grid-col').forEach((col, i) => {
        gsap.fromTo(
          col,
          { yPercent: i % 2 === 0 ? 15 : -15 },
          {
            yPercent: i % 2 === 0 ? -15 : 15,
            ease: 'none',
            scrollTrigger: {
              trigger: '.gallery-wrapper',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });

      // 4. Image reveal animation (fade in & move up)
      gsap.utils.toArray('.gallery-item').forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          },
        );
      });

      // 5. Fullwidth Scale-Up Pinned Section
      const scaleTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.fullwidth-section',
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
        },
      });

      scaleTl
        .to('.full-img-container', {
          width: '100%',
          height: '100vh',
          borderRadius: '0px',
          opacity: 1,
          ease: 'power2.inOut',
        })
        .to(
          '.full-img',
          {
            filter: 'grayscale(0%) brightness(0.6)',
            ease: 'power2.inOut',
          },
          '<',
        )
        .fromTo(
          '.scale-text-reveal',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: 'power3.out' },
          '-=0.2',
        );
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  const col1Images = [
    {
      img: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
      desc: 'Pengawalan Taktis Ring 1',
    },
    {
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      desc: 'Sterilisasi Ruang Rapat VVIP',
    },
    {
      img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
      desc: 'Persiapan Operasi Lapangan',
    },
  ];

  const col2Images = [
    {
      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      desc: 'Negosiasi Penagihan Aset',
    },
    {
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      desc: 'Divisi Intelijen & Profiling',
    },
    {
      img: 'https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=800&q=80',
      desc: 'Observasi Target Kasus',
    },
  ];

  const col3Images = [
    {
      img: 'https://images.unsplash.com/photo-1583344654930-9b3de5e6d9b9?auto=format&fit=crop&w=800&q=80',
      desc: 'Protokol Evakuasi Tarmac',
    },
    {
      img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      desc: 'Penjagaan Perimeter Aset',
    },
    {
      img: 'https://images.unsplash.com/photo-1560179707-f14e90ae4f81?auto=format&fit=crop&w=800&q=80',
      desc: 'Pemulihan Aset Tunai',
    },
  ];

  return (
    <main
      ref={containerRef}
      className="relative w-full bg-dark text-text-offwhite overflow-x-hidden"
    >
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-gold/10"
      >
        <div className="absolute inset-0 z-0 h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=1920&q=80"
            alt="Sentinel Gallery"
            fill
            className="hero-img object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/60 to-dark"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <div className="overflow-hidden mb-4">
            <h1 className="hero-title-line text-5xl md:text-8xl font-heading font-bold uppercase tracking-wider text-white">
              REKAM JEJAK.
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="hero-title-line text-5xl md:text-8xl font-heading font-bold uppercase tracking-wider text-gold">
              LAPANGAN.
            </h1>
          </div>
          <p className="hero-subtitle text-lg md:text-xl text-text-muted font-light max-w-2xl mx-auto">
            Kumpulan dokumentasi visual operasi lapangan. Mulai dari penjagaan
            tingkat VVIP, lobi perundingan aset (Debt Recovery), hingga
            sterilisasi evakuasi jalur darat dan udara.
          </p>
        </div>
      </section>

      {/* 2. MASONRY PARALLAX GALLERY */}
      <section className="gallery-wrapper relative w-full bg-dark pt-32 pb-40 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-32">
            <h3 className="text-2xl md:text-4xl font-heading text-white uppercase mb-4">
              Mata & Telinga Anda
            </h3>
            <div className="w-16 h-[1px] bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start h-[200vh] md:h-auto overflow-hidden md:overflow-visible">
            {/* Col 1 */}
            <div className="grid-col flex flex-col gap-8 mt-0 md:-mt-24">
              {col1Images.map((item, idx) => (
                <div
                  key={idx}
                  className="gallery-item group relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <Image
                    src={item.img}
                    alt={item.desc}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-gold font-bold text-xs tracking-widest uppercase mb-1">
                      01 // Operasi
                    </p>
                    <p className="text-white font-heading text-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Col 2 */}
            <div className="grid-col flex flex-col gap-8 mt-0 md:mt-32">
              {col2Images.map((item, idx) => (
                <div
                  key={idx}
                  className="gallery-item group relative w-full aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <Image
                    src={item.img}
                    alt={item.desc}
                    fill
                    className="object-cover grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-gold font-bold text-xs tracking-widest uppercase mb-1">
                      02 // Taktis
                    </p>
                    <p className="text-white font-heading text-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Col 3 */}
            <div className="grid-col flex flex-col gap-8 mt-0 md:-mt-10">
              {col3Images.map((item, idx) => (
                <div
                  key={idx}
                  className="gallery-item group relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <Image
                    src={item.img}
                    alt={item.desc}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-gold font-bold text-xs tracking-widest uppercase mb-1">
                      03 // Eksekusi
                    </p>
                    <p className="text-white font-heading text-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FULLWIDTH SCALE-UP SECTION */}
      <section className="fullwidth-section relative w-full h-[150vh] bg-dark flex flex-col items-center justify-start pt-20 md:pt-40 overflow-hidden">
        <div className="relative z-10 text-center mb-10 w-full px-4">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase">
            Tanpa Jejak. <span className="text-gold">Sempurna.</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-xl mx-auto font-light">
            Setiap agenda operasional dieksekusi dengan protokol keamanan ketat,
            memastikan hanya hasil nyata yang sampai ke tangan Anda.
          </p>
        </div>

        <div className="full-img-container relative w-[80%] md:w-[40%] h-[50vh] md:h-[60vh] rounded-[40px] overflow-hidden border border-gold/30 opacity-70 flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&w=1920&q=80"
            alt="Sentinel Operation"
            fill
            className="full-img object-cover filter grayscale brightness-50"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-dark/40">
            <h3 className="scale-text-reveal text-5xl md:text-8xl font-heading font-bold text-white uppercase tracking-widest drop-shadow-2xl">
              ABSOLUT.
            </h3>
            <p className="scale-text-reveal text-gold mt-4 font-bold tracking-[0.3em] uppercase text-sm md:text-base">
              Target Tercapai. Misi Selesai.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <ContactFooterSection />
    </main>
  );
}
