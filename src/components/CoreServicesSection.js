'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserCheck, Search, ShieldCheck, Lock } from 'lucide-react';

export default function CoreServicesSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        },
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 85%',
          },
        },
      );

      // Section parallax backdrop
      gsap.to('.services-parallax-bg', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const coreServices = [
    {
      id: '01',
      title: 'Bodyguard',
      subtitle: 'Pengawalan Melekat VIP',
      desc: 'Perlindungan maksimal oleh personel terlatih untuk keamanan tingkat tinggi dan penjagaan privasi Anda di setiap agenda penting.',
      icon: <UserCheck className="w-6 h-6 text-gold" />,
      img: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '02',
      title: 'Detektif Swasta',
      subtitle: 'Investigasi Privat & Corporate',
      desc: 'Menyediakan intelijen komprehensif, pencarian bukti akurat, dan pemantauan senyap berbasis keabsahan hukum untuk mengambil keputusan krusial.',
      icon: <Search className="w-6 h-6 text-gold" />,
      img: 'https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '03',
      title: 'Pengamanan',
      subtitle: 'Manajemen Keamanan Event & Aset',
      desc: 'Sistem keamanan terpadu (fisik dan strategis) untuk mengamankan lokasi, perumahan elit, acara berskala masif, maupun aset perusahaan.',
      icon: <ShieldCheck className="w-6 h-6 text-gold" />,
      img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '04',
      title: 'Secure VIP',
      subtitle: 'Protokol Keselamatan Transit',
      desc: 'Transportasi taktis dan rute pengawalan khusus bagi eksekutif untuk mitigasi risiko, terhindar dari eskalasi gangguan publik di lapangan.',
      icon: <Lock className="w-6 h-6 text-gold" />,
      img: 'https://images.unsplash.com/photo-1542314831-c6a4d27160c9?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section
      id="layanan"
      ref={sectionRef}
      className="relative bg-dark/90 py-32 border-t border-white/5 overflow-hidden backdrop-blur-sm"
    >
      {/* Background Parallax Mesh Layer for Services */}
      <div className="absolute inset-0 z-0 pointer-events-none services-parallax-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-dark to-dark opacity-80"></div>
        <Image
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=80"
          alt="Dark Corporate Detail"
          fill
          className="object-cover opacity-[0.02] mix-blend-screen scale-110"
        />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-dark-secondary rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 relative z-10">
            <div className="w-8 h-[1px] bg-gold"></div>
            <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold">
              Core Expertise
            </span>
            <div className="w-8 h-[1px] bg-gold"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-offwhite font-heading uppercase tracking-wide">
            Executive{' '}
            <span className="text-gold italic font-light">Services</span>
          </h2>
          <p className="text-text-muted font-light max-w-2xl text-lg mt-4">
            Beragam langkah mitigasi berlapis disediakan khusus untuk melindungi
            kepentingan, kehormatan, dan keamanan Anda oleh paramiliter
            eksklusif kami.
          </p>
        </div>

        {/* Expanding Accordion Horizontal (Desktop) / Normal Grid (Mobile) */}
        <div className="flex flex-col md:flex-row h-auto md:h-[60vh] w-full gap-4">
          {coreServices.map((service, idx) => (
            <div
              key={service.id}
              ref={addToCards}
              className="relative group flex-1 hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl border border-white/5 cursor-pointer bg-dark-secondary overflow-hidden min-h-[300px] md:min-h-full"
            >
              {/* Background Image with Hover Effect */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover object-center opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent group-hover:from-dark group-hover:to-transparent transition-all duration-500" />
              </div>

              {/* Dynamic Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 z-10 w-full">
                <div className="flex flex-col h-full transform transition-transform duration-500 justify-end">
                  {/* Persistent Header */}
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-gold font-heading text-xl opacity-80 group-hover:opacity-100 transition-opacity">
                      {service.id}
                    </span>
                    <h3 className="text-2xl font-bold font-heading uppercase text-white whitespace-nowrap overflow-hidden text-ellipsis shadow-black">
                      {service.title}
                    </h3>
                  </div>

                  {/* Expanding Reveal Section (Visible mostly on hover on desktop) */}
                  <div className="md:h-0 md:opacity-0 md:group-hover:h-auto md:group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden flex flex-col gap-4 mt-2">
                    <div className="w-12 h-[2px] bg-gold mt-2 mb-1"></div>
                    <h4 className="text-gold font-medium uppercase tracking-wider text-sm">
                      {service.subtitle}
                    </h4>
                    <p className="text-text-offwhite/80 font-light text-sm lg:text-base line-clamp-4 md:line-clamp-none max-w-sm">
                      {service.desc}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-dark/50 backdrop-blur-sm group-hover:bg-gold/20 transition-all duration-300">
                        {service.icon}
                      </div>
                      <span className="text-xs uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                        Pelajari{' '}
                        <span className="hidden lg:inline">Selengkapnya</span>
                      </span>
                    </div>
                  </div>

                  {/* Mobile always visible portion logic */}
                  <div className="md:hidden mt-2 border-t border-white/10 pt-4 flex flex-col gap-2">
                    <p className="text-text-offwhite/80 font-light text-sm line-clamp-3">
                      {service.desc}
                    </p>
                    <div className="w-10 h-10 rounded-full mt-2 border border-gold flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
