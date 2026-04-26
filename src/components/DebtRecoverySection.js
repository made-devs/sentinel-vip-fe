'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale, ShieldAlert, FileText, Briefcase } from 'lucide-react';

export default function DebtRecoverySection() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in and stagger up the cards as we scroll
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1,
            },
          },
        );
      });

      // Ambient parallax background inside the section
      gsap.to('.debt-parallax-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Background color shift slightly when hitting this section
      gsap.to(sectionRef.current, {
        backgroundColor: 'rgba(11, 12, 16, 0.4)', // Using rgba for a more transparent, ambient shift
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom bottom',
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

  const steps = [
    {
      icon: <Briefcase className="w-8 h-8 text-gold" />,
      title: '1. Analisis & Investigasi Aset',
      desc: 'Menelusuri profil finansial debitur secara mendalam, memetakan aset tersembunyi, dan menilai kapasitas pengembalian secara legal.',
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: <FileText className="w-8 h-8 text-gold" />,
      title: '2. Pendekatan Hukum & Somasi',
      desc: 'Melakukan teguran keras (Somasi) berbasis legalitas, mendesak debitur untuk menyelesaikan kewajiban tanpa harus ke pengadilan terbuka.',
      img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-gold" />,
      title: '3. Eksekusi Lapangan & Mediasi',
      desc: 'Tim eksekutor profesional turun langsung. Pendekatan persuasif tingkat tinggi namun tegas untuk memastikan pemulihan secara real.',
      img: 'https://images.unsplash.com/photo-1616832880334-b1004d9808da?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: <Scale className="w-8 h-8 text-gold" />,
      title: '4. Resolusi & Pengembalian',
      desc: 'Memastikan aset kembali ke tangan Anda melalui perjanjian damai yang mengikat secara hukum atau sita aset jaminan.',
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section
      id="debt-recovery"
      ref={sectionRef}
      className="relative bg-dark-secondary pb-32 pt-20 border-t border-white/5"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24 relative">
          {/* Pinned Left Content */}
          <div
            ref={textContainerRef}
            className="w-full lg:w-5/12 h-auto lg:h-screen flex flex-col justify-center relative lg:sticky top-0 z-20"
          >
            <div className="space-y-6 pt-24 lg:pt-0">
              <div className="inline-flex items-center gap-2">
                <div className="w-8 h-[1px] bg-gold"></div>
                <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold">
                  Flagship Service
                </span>
              </div>
              <h2 className="text-5xl lg:text-7xl uppercase text-text-offwhite font-heading leading-[1.1]">
                Debt <br />{' '}
                <span className="text-gold italic font-light">Recovery</span>
              </h2>
              <p className="text-lg text-text-muted font-light leading-relaxed max-w-md">
                Bukan sekadar menagih, tapi memulihkan hak Anda dengan strategi
                investigasi kelas atas, tekanan legal, dan mediasi tingkat
                tinggi. Tim purnawirawan khusus kami bekerja efisien, rahasia,
                dan tanpa kompromi.
              </p>

              <div className="pt-8">
                <a
                  href="#kontak"
                  className="inline-flex items-center gap-4 text-text-offwhite tracking-widest uppercase text-sm font-bold group"
                >
                  <span className="border-b border-gold pb-1 group-hover:text-gold transition-colors">
                    Start Recovery
                  </span>
                  <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center group-hover:bg-gold transition-colors">
                    <svg
                      className="w-4 h-4 text-gold group-hover:text-dark transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Scrolling Content (Cards) */}
          <div className="w-full lg:w-7/12 flex flex-col gap-24 mt-12 lg:mt-32">
            {steps.map((step, idx) => (
              <div
                key={idx}
                ref={addToCards}
                className="relative overflow-hidden rounded-md group bg-dark border border-white/5 p-8 lg:p-12 hover:border-gold/30 transition-colors duration-500"
              >
                {/* Background Image that reveals on hover (Desktop) */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dark/80 mix-blend-multiply"></div>
                </div>

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold font-heading uppercase tracking-wider text-white">
                    {step.title}
                  </h3>
                  <p className="text-text-muted font-light text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
