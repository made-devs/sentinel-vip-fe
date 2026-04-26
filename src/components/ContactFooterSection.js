'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactFooterSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Glow and map effect in footer
      gsap.fromTo(
        '.cta-box',
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      id="kontak"
      className="relative bg-dark pt-32 overflow-hidden border-t border-gold/10"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&w=1920&q=80')] opacity-5 mix-blend-overlay bg-cover bg-center"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Main CTA Block */}
        <div className="cta-box relative bg-dark-secondary rounded-2xl p-8 lg:p-16 border border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.05)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-gold/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gold/10 rounded-full blur-[100px]"></div>

          <div className="w-full md:w-3/5 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-gold" />
              <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">
                Kerahasiaan Terjamin
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-heading font-bold uppercase leading-tight drop-shadow-md">
              Mulai{' '}
              <span className="text-gold italic font-light font-heading">
                Konsultasi
              </span>{' '}
              Gratis Anda
            </h2>
            <p className="text-lg text-text-muted font-light max-w-md">
              Waktu berpihak pada mereka yang mengambil langkah cepat. Hubungi
              kami untuk mendiskusikan strategi pemulihan dan proteksi yang
              legal, efektif, dan sunyi.
            </p>
          </div>

          <div className="w-full md:w-2/5 flex flex-col space-y-4 relative z-10">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full bg-gold p-6 rounded-xl hover:bg-gold-light transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col text-dark">
                <span className="text-xs uppercase tracking-widest font-bold opacity-80">
                  WhatsApp Resmi
                </span>
                <span className="text-xl font-bold font-heading">
                  +62 812-3456-7890
                </span>
              </div>
              <div className="bg-dark text-gold p-3 rounded-full group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
            </a>

            <a
              href="mailto:contact@sentinelvip.id"
              className="group flex items-center justify-between w-full border border-gold/50 bg-dark-secondary p-6 rounded-xl hover:border-gold transition-all duration-300"
            >
              <div className="flex flex-col">
                <span className="text-xs text-gold uppercase tracking-widest font-bold">
                  Kirim Surel
                </span>
                <span className="text-lg text-white font-medium">
                  contact@sentinelvip.id
                </span>
              </div>
              <Mail className="w-8 h-8 text-gold opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Footer Bottom Setup */}
        <div className="py-16 mt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {/* Logo & Intro */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo-vip.webp"
                  alt="Sentinel VIP"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-none tracking-widest uppercase text-text-offwhite">
                  Sentinel
                </span>
                <span className="text-[9px] tracking-[0.4em] text-gold uppercase mt-1">
                  VIP Indonesia
                </span>
              </div>
            </Link>
            <p className="text-sm text-text-muted font-light leading-relaxed pr-6">
              Layanan eksekutif pilihan utama dalam intelijen swasta, negosiasi
              utang VIP, dan perlindungan aset kelas atas di Indonesia.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h4 className="text-gold font-bold uppercase tracking-[0.2em] text-sm">
              Layanan Utama
            </h4>
            <ul className="space-y-4 flex flex-col">
              <li>
                <Link
                  href="#debt-recovery"
                  className="text-sm font-light text-text-muted hover:text-white transition-colors"
                >
                  Debt Recovery
                </Link>
              </li>
              <li>
                <Link
                  href="#layanan"
                  className="text-sm font-light text-text-muted hover:text-white transition-colors"
                >
                  Pengawalan VIP (Bodyguard)
                </Link>
              </li>
              <li>
                <Link
                  href="#layanan"
                  className="text-sm font-light text-text-muted hover:text-white transition-colors"
                >
                  Detektif Swasta
                </Link>
              </li>
              <li>
                <Link
                  href="#layanan"
                  className="text-sm font-light text-text-muted hover:text-white transition-colors"
                >
                  Konsultasi Mitigasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Address */}
          <div className="space-y-6">
            <h4 className="text-gold font-bold uppercase tracking-[0.2em] text-sm">
              Headquarters
            </h4>
            <ul className="space-y-4 flex flex-col">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <span className="text-sm font-light text-text-muted leading-relaxed">
                  Gedung Equity Tower, SCBD <br />
                  Lantai 42, Jl. Jend. Sudirman Kav. 52-53 <br />
                  Jakarta Selatan, 12190
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-gold" />
                <span className="text-sm font-light text-text-muted">
                  Hunting: (021) 1234-5678
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pb-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs font-light text-text-muted space-y-4 md:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} Sentinel VIP Indonesia. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gold transition-colors">
              Legal Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
