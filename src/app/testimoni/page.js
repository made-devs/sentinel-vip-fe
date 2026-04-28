'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Quote, PlayCircle, Shield } from 'lucide-react';
import ContactFooterSection from '@/components/ContactFooterSection';

const gsap = dynamic(() => import('gsap').then((m) => m.default), {
  ssr: false,
});
const ScrollTrigger = dynamic(
  () => import('gsap/ScrollTrigger').then((m) => m.default),
  { ssr: false },
);
const Lenis = dynamic(() => import('lenis'), { ssr: false });

export default function TestimoniPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const textCardsRef = useRef([]);
  const videoCardsRef = useRef([]);

  const textTestimonials = [
    {
      name: 'R. K.',
      title: 'CEO Perusahaan Manufaktur',
      text: 'Dana perusahaan senilai puluhan miliar yang sempat macet berhasil dipulihkan dalam waktu kurang dari sebulan. Pendekatan Sentinel sangat terukur, tidak menimbulkan keributan, namun efeknya mematikan bagi pihak pengutang. Sangat profesional.',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Bpk. H.',
      title: 'Pejabat Publik / Tokoh Nasional',
      text: 'Pengawalan yang diberikan selama masa kampanye dan transit sangat sempurna. Tim di lapangan membaca situasi 3 langkah lebih maju. Privasi saya sangat dihormati dan keluarga merasa 100% aman kapan pun kami harus tampil di hadapan publik.',
      img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Ibu S. M.',
      title: 'Pemilik Bisnis Ekspor Impor',
      text: 'Pengawalan Sentinel VIP selama negosiasi tingkat tinggi sangat terasa auranya. Mereka tidak hanya menjamin keamanan fisik, tetapi memberikan keunggulan psikologis yang kuat (psychological superiority) dalam setiap meeting.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Dr. A. W.',
      title: 'Investor Pribadi',
      text: 'Terkait sengketa proyek properti, tim Sentinel VIP melakukan asset tracing yang sangat akurat. Mereka menemukan aset tersembunyi debitur yang bahkan sebelumnya tidak terdeteksi oleh pengacara kami.',
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    },
  ];

  const videoShorts = [
    {
      id: '1',
      url: 'https://www.youtube.com/embed/1OZZb9wM_B0?controls=0&rel=0&modestbranding=1',
    },
    {
      id: '2',
      url: 'https://www.youtube.com/embed/LXb3EKWsInQ?controls=0&rel=0&modestbranding=1',
    },
    {
      id: '3',
      url: 'https://www.youtube.com/embed/aqz-KE-bpKQ?controls=0&rel=0&modestbranding=1',
    },
  ];

  useEffect(() => {
    let lenis;
    let st;

    const initGSAP = async () => {
      const g = (await import('gsap')).default;
      st = (await import('gsap/ScrollTrigger')).default;
      g.registerPlugin(st);

      // Smooth Scroll Lenis
      const L = (await import('lenis')).default;
      lenis = new L({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      lenis.on('scroll', st.update);
      g.ticker.add((time) => lenis.raf(time * 1000));
      g.ticker.lagSmoothing(0, 0);

      const ctx = g.context(() => {
        // 1. Hero Animation matches About & Services
        const tl = g.timeline();
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

        // Hero Parallax
        g.to('.hero-img', {
          yPercent: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // 2. Text Cards Reveal
        g.fromTo(
          textCardsRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textCardsRef.current[0],
              start: 'top 85%',
            },
          },
        );

        // 3. Video Shorts Reveal
        g.fromTo(
          videoCardsRef.current,
          { opacity: 0, scale: 0.95, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: videoCardsRef.current[0],
              start: 'top 85%',
            },
          },
        );
      }, containerRef);

      return () => {
        ctx.revert();
      };
    };

    initGSAP();

    return () => {
      if (lenis) lenis.destroy();
      st?.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToTextCards = (el) => {
    if (el && !textCardsRef.current.includes(el)) {
      textCardsRef.current.push(el);
    }
  };

  const addToVideoCards = (el) => {
    if (el && !videoCardsRef.current.includes(el)) {
      videoCardsRef.current.push(el);
    }
  };

  return (
    <main
      ref={containerRef}
      className="bg-dark min-h-screen text-text-offwhite overflow-x-hidden selection:bg-gold selection:text-dark"
    >
      {/* 1. HERO - Matches About & Services */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=1920&q=80"
            alt="Sentinel Confidential Reviews Hero"
            fill
            className="hero-img object-cover object-center grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/60 to-dark"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <div className="overflow-hidden mb-4">
            <h1 className="hero-title-line text-5xl md:text-8xl font-heading font-bold uppercase tracking-wider text-white">
              VERIFIED
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="hero-title-line text-5xl md:text-8xl font-heading font-bold uppercase tracking-wider text-gold">
              FEEDBACK.
            </h1>
          </div>
          <p className="hero-subtitle text-lg md:text-xl text-text-muted font-light max-w-2xl mx-auto">
            Reputasi kami dibangun di atas eksekusi presisi, kerahasiaan
            absolut, dan hasil nyata. Tidak ada ruang untuk kesalahan.
          </p>
        </div>
      </section>

      {/* 2. TEXT TESTIMONIALS */}
      <section className="relative py-32 bg-dark border-t border-white/5">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]"></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="mb-20 w-fit">
            <h4 className="text-gold uppercase tracking-[0.3em] font-semibold text-sm mb-4 flex items-center gap-4">
              <span className="w-10 h-[1px] bg-gold"></span> Confidential
              Reviews
            </h4>
            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase text-white leading-none">
              Client <span className="text-white/30 italic">Insights</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {textTestimonials.map((testi, idx) => (
              <div
                key={idx}
                ref={addToTextCards}
                className="group relative bg-dark-secondary p-8 md:p-12 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-500 shadow-xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>

                <Quote className="w-12 h-12 text-gold/20 mb-8 transform group-hover:scale-110 group-hover:text-gold/40 transition-all duration-500" />

                <p className="text-lg md:text-xl text-text-offwhite font-light leading-relaxed mb-10 italic">
                  "{testi.text}"
                </p>

                <div className="flex items-center gap-6 mt-auto">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold/30 group-hover:border-gold transition-colors duration-500">
                    <Image
                      src={testi.img}
                      alt={testi.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <h4 className="text-gold font-bold font-heading text-lg tracking-wider">
                      {testi.name}
                    </h4>
                    <p className="text-text-muted text-sm uppercase tracking-widest">
                      {testi.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VIDEO SHORTS */}
      <section className="relative py-32 bg-dark-secondary border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h4 className="text-gold uppercase tracking-[0.3em] font-semibold text-sm mb-4 flex items-center gap-4">
                <span className="w-10 h-[1px] bg-gold"></span> Visual Record
              </h4>
              <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase text-white leading-none">
                Field{' '}
                <span className="text-white/30 italic">Documentation</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-text-muted text-sm tracking-widest uppercase">
              <PlayCircle className="w-5 h-5 text-gold" /> Watch Shorts
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
            {videoShorts.map((video, idx) => (
              <div
                key={idx}
                ref={addToVideoCards}
                className="group relative aspect-[9/16] bg-dark rounded-2xl overflow-hidden border border-white/10 hover:border-gold shadow-2xl transition-transform duration-500 hover:-translate-y-2"
              >
                <iframe
                  src={video.url}
                  title={`Testimonial Video Shorts ${video.id}`}
                  className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <ContactFooterSection />
    </main>
  );
}
