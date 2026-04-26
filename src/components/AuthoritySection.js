'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Crosshair, Scale } from 'lucide-react';

export default function AuthoritySection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Split the banner reveal
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { title: 'Aset Pulih', prefix: 'IDR', value: '2.1', suffix: 'Triliun+' },
    { title: 'Tingkat Sukses', value: '98', suffix: '%' },
    { title: 'Kasus Selesai', value: '500', suffix: '+' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark-secondary py-32 border-t border-white/5"
    >
      <div className="container mx-auto px-6 max-w-7xl" ref={containerRef}>
        {/* Top Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 border border-gold/20 bg-dark/50 backdrop-blur-sm rounded-2xl overflow-hidden py-10 mb-32">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`stat-item flex flex-col items-center justify-center text-center space-y-2 ${
                idx !== stats.length - 1 ? 'md:border-r border-gold/20' : ''
              } px-4`}
            >
              <h4 className="text-text-muted uppercase tracking-widest text-sm font-semibold">
                {stat.title}
              </h4>
              <div className="text-3xl md:text-5xl font-heading font-bold text-white uppercase flex items-baseline gap-1">
                {stat.prefix && (
                  <span className="text-gold text-lg md:text-2xl mr-1">
                    {stat.prefix}
                  </span>
                )}
                {stat.value}
                {stat.suffix && (
                  <span className="text-gold">{stat.suffix}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Split */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full lg:w-1/2 relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-bl-[100px] rounded-tr-[100px] overflow-hidden border border-gold/30">
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                alt="Authority Force"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gold mix-blend-overlay opacity-30"></div>
            </div>

            <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-4 w-32 h-32 lg:w-48 lg:h-48 bg-dark border border-gold/30 rounded-full flex flex-col items-center justify-center p-4 lg:p-6 text-center shadow-[0_0_40px_rgba(212,175,55,0.15)] z-10">
              <Award className="w-8 h-8 lg:w-10 lg:h-10 text-gold mb-1 lg:mb-2" />
              <span className="font-heading font-bold text-white text-base lg:text-lg">
                VIP
              </span>
              <span className="text-[8px] lg:text-[10px] tracking-widest uppercase text-gold mt-1">
                Standar Tertinggi
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold">
                  Mengapa Sentinel VIP
                </span>
                <div className="w-12 h-[1px] bg-gold"></div>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-offwhite font-heading uppercase leading-tight">
                Kekuatan, Rahasia, <br />{' '}
                <span className="text-gold italic font-light">
                  Eksklusivitas
                </span>
              </h2>
              <p className="text-text-muted font-light leading-relaxed text-lg max-w-lg">
                Sentinel VIP bukan berisikan agen biasa. Tim kami dibentuk dari
                profesional purnawirawan militer, ahli mediasi negosiasi krisis,
                dan konsultan hukum korporat kelas atas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30">
                  <Users className="w-5 h-5 text-gold" />
                </div>
                <h4 className="text-white font-bold tracking-wider uppercase text-sm">
                  Tim Elit Terlatih
                </h4>
                <p className="text-sm font-light text-text-muted">
                  Personel berkapasitas taktis, intelijen, bermoral tinggi,
                  serta terlatih menangani konfrontasi tingkat tinggi.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30">
                  <Crosshair className="w-5 h-5 text-gold" />
                </div>
                <h4 className="text-white font-bold tracking-wider uppercase text-sm">
                  Eksekusi Presisi
                </h4>
                <p className="text-sm font-light text-text-muted">
                  Metodologi kami didasarkan pada strategi terukur yang tidak
                  mentolerir kegagalan maupun kerusakan reputasi.
                </p>
              </div>
              <div className="space-y-4 sm:col-span-2">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30">
                  <Scale className="w-5 h-5 text-gold" />
                </div>
                <h4 className="text-white font-bold tracking-wider uppercase text-sm">
                  Proteksi Hukum Penuh
                </h4>
                <p className="text-sm font-light text-text-muted max-w-md">
                  Kami memastikan setiap pengerahan aset dan langkah somasi
                  sepenuhnya legal, memberikan Anda ketenangan pikiran seutuhnya
                  saat kasus kami ambil alih.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
