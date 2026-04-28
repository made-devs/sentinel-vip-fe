'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Network,
  Crosshair,
  Search,
  Shield,
  Plane,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import ContactFooterSection from '@/components/ContactFooterSection';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const mainServiceRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
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

      // Hero Parallax
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

      // 3. Main Service (Debt Recovery) Reveal
      const mainItems = gsap.utils.toArray('.main-service-reveal');
      mainItems.forEach((item) => {
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

      // 4. Stacking Cards for Supporting Services
      const cards = gsap.utils.toArray('.service-card');

      cards.forEach((card, index) => {
        // As the next card comes up, scale down and fade out the current card
        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[index + 1],
              start: 'top bottom',
              end: 'top top+=100', // adjust depending on sticky top value
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  const supportingServices = [
    {
      id: '01',
      title: 'Bodyguard VIP',
      subtitle: 'Pengawalan Taktis Melekat',
      desc: 'Sengketa finansial level atas rentan memicu ancaman fisik maupun intimidasi. Agen taktis kami (eks-prajurit & profesional bersertifikat) menyediakan pengawalan berlapis untuk Anda dan keluarga. Kami menerapkan protokol pengamanan rute, sterilisasi area, dan penjagaan jarak dekat tanpa mengorbankan kenyamanan dan privasi Anda dalam beraktivitas.',
      icon: <ShieldAlert className="w-12 h-12 text-gold" />,
      features: [
        'Protokol Ancaman Darurat',
        'Sterilisasi Lingkungan Cincin 1',
        'Driver Taktis & Evakuasi',
      ],
      img: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: '02',
      title: 'Detektif Swasta',
      subtitle: 'Intelijen & Verifikasi Investigatif',
      desc: 'Keputusan strategis membutuhkan informasi absolut. Divisi detektif swasta kami bergerak di bawah radar untuk mengumpulkan bukti konkret, mengaudit rekam jejak kriminal atau finansial lawan, hingga membongkar kedok penggelapan tak terlihat. Kami menguasai social engineering dan cyber-tracking untuk mengungkap apa yang ingin disembunyikan lawan.',
      icon: <Search className="w-12 h-12 text-gold" />,
      features: [
        'Background Profiling',
        'Deep-web Asset Tracking',
        'Pengintaian & Observasi Terselubung',
      ],
      img: 'https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: '03',
      title: 'Pengamanan',
      subtitle: 'Keamanan Aset & Stabilitas Operasional',
      desc: 'Keamanan perimeter adalah garis pertahanan pertama. Layanan ini memastikan lokasi kantor utama, kediaman pribadi, titik logistik, hingga event korporasi Anda tidak tersentuh oleh pihak tak berkepentingan. Dilengkapi sistem manajemen krisis untuk membendung ancaman demonstrasi massal, sabotase rival bisnis, atau intervensi pihak ketiga.',
      icon: <Shield className="w-12 h-12 text-gold" />,
      features: [
        'Manajemen Keamanan Event Massal',
        'Patroli Statis & Dinamis',
        'Sistem Pengamanan Ring Berlapis',
      ],
      img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: '04',
      title: 'Secure VIP',
      subtitle: 'Protokol Evakuasi & Transit Rahasia',
      desc: 'Setiap pergerakan Anda adalah aset. Protokol VIP Transit kami dirancang untuk penjemputan rahasia, pengawalan bandara aspal-ke-pesawat (tarmac-to-plane), hingga transportasi kendaraan anti-peluru. Mobilitas Anda dienkripsi sehingga meminimalisir kemungkinan intersepsi musuh di area publik atau dalam perjalanan antar negara.',
      icon: <Plane className="w-12 h-12 text-gold" />,
      features: [
        'Tarmac-to-Plane Escort',
        'Armored Transport (Kendaraan Taktis)',
        'Secure Route Encryption',
      ],
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
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
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1920&q=80"
            alt="Sentinel Services"
            fill
            className="hero-img object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/60 to-dark"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <div className="overflow-hidden mb-4">
            <h1 className="hero-title-line text-5xl md:text-8xl font-heading font-bold uppercase tracking-wider text-white">
              KAMI MENGEMBALIKAN
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="hero-title-line text-5xl md:text-8xl font-heading font-bold uppercase tracking-wider text-gold">
              HAK ANDA.
            </h1>
          </div>
          <p className="hero-subtitle text-lg md:text-xl text-text-muted font-light max-w-2xl mx-auto">
            Dari pemulihan aset bernilai triliunan (Debt Recovery) hingga pagar
            betis taktis menyeluruh. Layanan kami dirancang untuk memenangkan
            pertempuran sebelum arena terbuka.
          </p>
        </div>
      </section>

      {/* 2. THE CROWN JEWEL: DEBT RECOVERY */}
      <section ref={mainServiceRef} className="relative py-32 w-full bg-dark">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Main Title */}
          <div className="main-service-reveal flex flex-col md:flex-row gap-8 items-end justify-between mb-20">
            <div className="w-full md:w-2/3">
              <h4 className="text-gold uppercase tracking-[0.3em] font-semibold text-sm mb-4 flex items-center gap-4">
                <span className="w-10 h-[1px] bg-gold"></span> Layanan Utama
                Eksekutif
              </h4>
              <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase text-white leading-none">
                Debt Recovery <br />
                <span className="text-white/30">(Pemulihan Aset)</span>
              </h2>
            </div>
            <div className="w-full md:w-1/3 text-lg font-light text-text-muted">
              Pendekatan penyelesaian sengketa kelas tinggi yang bertumpu pada
              investigasi mendalam, negosiasi psikologis, dan penekanan
              strategis tanpa mengorbankan wibawa maupun nama baik korporat
              Anda.
            </div>
          </div>

          <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-dark-secondary">
            <div className="flex flex-col lg:flex-row">
              {/* Left Image Side */}
              <div className="main-service-reveal w-full lg:w-5/12 relative aspect-square lg:aspect-auto">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
                  alt="Debt Recovery Investigation"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gold mix-blend-overlay opacity-20"></div>

                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 right-8 bg-dark/80 backdrop-blur-md border border-gold/30 p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gold text-sm font-bold tracking-widest uppercase mb-1">
                        Target Fokus
                      </p>
                      <p className="text-white font-heading font-bold text-xl">
                        Sengketa Nilai Besar & Penggelapan VVIP
                      </p>
                    </div>
                    <Network className="w-10 h-10 text-gold" />
                  </div>
                </div>
              </div>

              {/* Right Content Side */}
              <div className="w-full lg:w-7/12 p-8 md:p-16 flex flex-col justify-center">
                <h3 className="main-service-reveal text-3xl md:text-4xl font-heading font-bold text-white mb-8 border-b border-white/10 pb-8">
                  Lebih Dari Sekadar Penagihan. Ini Adalah Pengembalian Hak
                  Terstruktur.
                </h3>

                <p className="main-service-reveal text-lg text-text-muted font-light mb-10 leading-relaxed">
                  Menghadapi sengketa korporat, konflik pemegang saham, atau
                  kredit macet bernilai masif membutuhkan resolusi tajam di luar
                  koridor peringatan hukum pasif. Kami bertindak layaknya
                  bayangan yang mengepung target secara persisten, cerdik, dan
                  bertenaga.
                </p>

                <div className="space-y-8">
                  {[
                    {
                      title: 'Asset Tracing & Profiling',
                      desc: 'Kami menggunakan intelijen tingkat tinggi untuk membedah struktur perusahaan cangkang dan rekening offshore, melacak setiap rupiah milik Anda yang disembunyikan lawan.',
                    },
                    {
                      title: 'Tactical Persuasion & Negotiation',
                      desc: 'Dilengkapi data akurat atas kelemahan target, kami merumuskan pressure psikotropik dan negosiasi persisten yang memaksa lawan menyelesaikan kewajiban tanpa perlu kekerasan fisik.',
                    },
                    {
                      title: 'Legal & Field Execution',
                      desc: 'Bila eskalasi tak terhindarkan, kami mendampingi kurator hukum untuk melakukan penyitaan dan sita jaminan secara fisik, dilengkapi proteksi penjagaan melekat di titik krusial.',
                    },
                  ].map((step, i) => (
                    <div key={i} className="main-service-reveal flex gap-6">
                      <div className="shrink-0 flex items-start justify-center pt-1">
                        <div className="w-8 h-8 rounded-full border border-gold text-gold flex items-center justify-center font-bold text-xs font-heading">
                          0{i + 1}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-xl font-bold text-white mb-2">
                          {step.title}
                        </h5>
                        <p className="text-text-muted font-light">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUPPORTING TACTICAL DIVISIONS (STACKING CARDS) */}
      <section
        ref={cardsContainerRef}
        className="relative w-full bg-dark-secondary py-32 z-10 px-6"
      >
        {/* Section Header */}
        <div className="container mx-auto max-w-4xl text-center mb-24">
          <Crosshair className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase">
            Divisi Proteksi <span className="text-white/40">Pendukung</span>
          </h2>
          <p className="text-xl text-text-muted font-light leading-relaxed">
            Menembus batas sengketa besar berpotensi membahayakan klien. Sebagai
            lapis pelindung dalam misi <strong>Debt Recovery</strong>, divisi
            taktis kami berdiri siap mencegah segala ancaman manuver balik fisik
            maupun mental dari target.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="services-container container mx-auto max-w-6xl relative">
          {supportingServices.map((srv, index) => (
            <div
              key={index}
              className={`service-card sticky top-[15vh] w-full min-h-[60vh] bg-dark rounded-3xl border border-gold/20 overflow-hidden mb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]`}
              style={{ zIndex: index + 10 }}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Card Content */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-8">
                    {srv.icon}
                    <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm">
                      DIVISI {srv.id}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 uppercase">
                    {srv.title}
                  </h3>
                  <h4 className="text-xl text-white/50 font-heading italic mb-8">
                    {srv.subtitle}
                  </h4>

                  <p className="text-lg text-text-muted font-light mb-8 leading-relaxed">
                    {srv.desc}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {srv.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-white font-light"
                      >
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button className="self-start text-sm uppercase tracking-widest font-bold text-gold flex items-center gap-2 hover:gap-4 transition-all duration-300">
                    Konsultasi Divisi Ini <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Image */}
                <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
                  <Image
                    src={srv.img}
                    alt={srv.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent md:w-1/3"></div>
                </div>
              </div>
            </div>
          ))}

          {/* Dummy space so the last card has room to scroll and show its full height if needed */}
          <div className="h-[10vh] w-full pointer-events-none fade-out-zone"></div>
        </div>
      </section>

      {/* FOOTER */}
      <ContactFooterSection />
    </main>
  );
}
