'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { MapPin, Phone, Mail, ShieldAlert, Send, Clock } from 'lucide-react';
import ContactFooterSection from '@/components/ContactFooterSection';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const formRef = useRef(null);
  const formValues = useRef({
    name: "",
    contact: "",
    type: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, contact, type, message } = formValues.current;
    
    const whatsappMessage = `Halo Sentinel VIP Indonesia,%0A%0ASaya ingin berkonsultasi mengenai layanan %2A${type}%2A.%0A%0A%2ANama:%2A ${name}%0A%2AKontak:%2A ${contact}%0A%2APesan:%2A ${message}`;
    
    window.open(`https://wa.me/6285210000977?text=${whatsappMessage}`, "_blank");
  };

  const handleInputChange = (field, value) => {
    formValues.current[field] = value;
  };

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
        { scale: 1.2, filter: 'brightness(0.2)' },
        {
          scale: 1,
          filter: 'brightness(0.5)',
          duration: 2,
          ease: 'power3.out',
        }
      )
        .fromTo(
          '.hero-title-line',
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power4.out' },
          '-=1.5'
        )
        .fromTo(
          '.hero-subtitle',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=1'
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

      // 3. Stagger reveal for contact cards
      gsap.fromTo(
        '.contact-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
          },
        }
      );

      // 4. Form reveal animation
      gsap.fromTo(
        '.form-element',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
          },
        }
      );
      
      // 5. Floating animation for map visual
      gsap.to('.map-visual', {
        y: -15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-full bg-dark text-text-offwhite overflow-x-hidden"
    >
      {/* 1. HERO SECTION (STRICTLY CONSISTENT) */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1920&q=80"
            alt="Sentinel VIP Operations Room"
            fill
            className="hero-img object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/70 to-dark"></div>
        </div>

        <div
          ref={heroTextRef}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20"
        >
          <div className="overflow-hidden mb-4">
            <h1 className="hero-title-line text-5xl md:text-8xl font-heading font-bold uppercase tracking-wider text-white">
              HUBUNGI
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="hero-title-line text-5xl md:text-8xl font-heading font-bold uppercase tracking-wider text-gold">
              KAMI.
            </h1>
          </div>
          <p className="hero-subtitle text-lg md:text-xl text-text-muted font-light max-w-2xl mx-auto">
            Kami siap membantu Anda dalam penanganan sengketa, perlindungan aset, dan kebutuhan keamanan VIP lainnya secara profesional dan rahasia.
          </p>
        </div>
      </section>

      {/* 2. CONTACT INFORMATION SECTION */}
      <section className="relative py-24 lg:py-32 w-full z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="contact-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {/* Dark Premium Cards with Hover Glow */}
            {[
              {
                icon: <Phone className="w-8 h-8 text-gold mb-6" />,
                title: 'WhatsApp Resmi',
                value: '0852 1000 0977',
                desc: 'Tersedia untuk konsultasi cepat dan respon darurat.',
              },
              {
                icon: <Mail className="w-8 h-8 text-gold mb-6" />,
                title: 'Email Resmi',
                value: 'sentinelvipindonesia@gmail.com',
                desc: 'Layanan korespondensi untuk kebutuhan dokumen dan proposal.',
              },
              {
                icon: <MapPin className="w-8 h-8 text-gold mb-6" />,
                title: 'Kantor Pusat',
                value: 'Kelapa Gading, Jakarta Utara',
                desc: 'Kunjungan dilakukan dengan janji temu terlebih dahulu.',
              },
            ].map((contact, idx) => (
              <div 
                key={idx}
                className="contact-card relative group bg-dark-secondary border border-white/5 p-10 overflow-hidden hover:border-gold/30 transition-colors duration-500 rounded-lg"
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  {contact.icon}
                  <h3 className="text-white font-heading font-bold uppercase tracking-widest mb-2">{contact.title}</h3>
                  <div className="text-[18px] font-mono text-gold mb-4">{contact.value}</div>
                  <p className="text-sm font-light text-text-muted">{contact.desc}</p>
                </div>

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-gold/20 group-hover:border-r-gold/80 transition-colors duration-500"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            
            {/* SECURE FORM */}
            <div className="col-span-1 lg:col-span-7 bg-dark-secondary/50 backdrop-blur-md border border-white/5 p-8 lg:p-12 rounded-xl" ref={formRef}>
              <div className="flex items-center gap-3 mb-10 form-element">
                <ShieldAlert className="w-6 h-6 text-gold" />
                <h2 className="text-3xl font-heading font-bold text-white uppercase tracking-widest">
                  Hubungi <span className="text-gold">Tim Kami</span>
                </h2>
              </div>
              
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 form-element">
                    <label className="text-xs uppercase tracking-[0.2em] text-text-muted font-bold">Nama / Perusahaan</label>
                    <input 
                      type="text" 
                      required
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full bg-dark border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-gold focus:ring-0 transition-colors font-light"
                      placeholder="Nama Lengkap / PT"
                    />
                  </div>
                  <div className="space-y-2 form-element">
                    <label className="text-xs uppercase tracking-[0.2em] text-text-muted font-bold">Nomor Telepon</label>
                    <input 
                      type="text" 
                      required
                      onChange={(e) => handleInputChange("contact", e.target.value)}
                      className="w-full bg-dark border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-gold focus:ring-0 transition-colors font-light"
                      placeholder="Nomor WhatsApp"
                    />
                  </div>
                </div>

                <div className="space-y-2 form-element">
                  <label className="text-xs uppercase tracking-[0.2em] text-text-muted font-bold">Jenis Layanan</label>
                  <select 
                    defaultValue="" 
                    required
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full bg-dark border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-gold focus:ring-0 transition-colors font-light appearance-none rounded-none cursor-pointer"
                  >
                    <option value="" disabled>Pilih Layanan</option>
                    <option value="Debt Recovery">Debt Recovery / Penagihan Aset</option>
                    <option value="Bodyguard">Pengamanan VVIP (Bodyguard)</option>
                    <option value="Investigasi">Investigasi Swasta</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="space-y-2 form-element">
                  <label className="text-xs uppercase tracking-[0.2em] text-text-muted font-bold">Deskripsi Kebutuhan</label>
                  <textarea 
                    rows={4}
                    required
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="w-full bg-dark border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-gold focus:ring-0 transition-colors font-light resize-none"
                    placeholder="Jelaskan secara singkat kebutuhan Anda..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="form-element group relative inline-flex items-center justify-center gap-3 bg-gold text-dark px-10 py-5 w-full uppercase tracking-[0.2em] text-sm font-bold overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Kirim Pesan <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
                </button>
                <p className="text-[10px] text-center text-text-muted font-light uppercase tracking-widest form-element">
                  * Kerahasiaan data Anda adalah prioritas kami.
                </p>
              </form>
            </div>

            {/* GOOGLE MAPS EMBED */}
            <div className="col-span-1 lg:col-span-5 h-[500px] lg:h-full min-h-[400px] relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7016890477084!2d106.8996948758676!3d-6.17068326047236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b7d2a8d97f9%3A0xbdb668dad4a8a73a!2sSentinel%20VIP%20Indonesia!5e0!3m2!1sen!2sid!4v1778666848778!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <ContactFooterSection />
    </main>
  );
}

// Importing lucide-react icon locally for the map
const Crosshair = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="22" y1="12" x2="18" y2="12"/>
    <line x1="6" y1="12" x2="2" y2="12"/>
    <line x1="12" y1="6" x2="12" y2="2"/>
    <line x1="12" y1="22" x2="12" y2="18"/>
  </svg>
);