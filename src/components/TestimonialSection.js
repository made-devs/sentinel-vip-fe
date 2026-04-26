'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, PlayCircle } from 'lucide-react';

export default function TestimonialSection() {
  const sectionRef = useRef(null);
  const textCardsRef = useRef([]);
  const videoCardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in text testimonials
      gsap.fromTo(
        textCardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textCardsRef.current[0],
            start: 'top 85%',
          },
        }
      );

      // Fade in video testimonials
      gsap.fromTo(
        videoCardsRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: videoCardsRef.current[0],
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
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
    }
  ];

  // Placeholder for YouTube Shorts Embeds
  // Dalam production, ganti VIDEO_ID di URL dengan ID Youtube Shorts yang asli
  const videoShorts = [
    { id: '1', url: 'https://www.youtube.com/embed/1OZZb9wM_B0?controls=0&rel=0&modestbranding=1' },
    { id: '2', url: 'https://www.youtube.com/embed/LXb3EKWsInQ?controls=0&rel=0&modestbranding=1' },
    { id: '3', url: 'https://www.youtube.com/embed/aqz-KE-bpKQ?controls=0&rel=0&modestbranding=1' },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 bg-dark-secondary border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-[1px] bg-gold"></div>
            <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold">Confidential Reviews</span>
            <div className="w-8 h-[1px] bg-gold"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-offwhite font-heading uppercase tracking-wide">
            Verified <span className="text-gold italic font-light">Feedback</span>
          </h2>
          <p className="text-text-muted font-light max-w-2xl text-lg mt-4">
            Reputasi kami dibangun dari kerahasiaan absolut dan eksekusi misi yang tuntas. Berikut adalah beberapa catatan dari klien VIP kami.
          </p>
        </div>

        {/* Part 1: Text & Photo Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {textTestimonials.map((testi, idx) => (
            <div 
              key={idx} 
              ref={addToTextCards}
              className="group relative bg-dark p-8 md:p-12 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-500 shadow-xl overflow-hidden"
            >
              {/* Subtle gradient glow on hover */}
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
                  <h4 className="text-gold font-bold font-heading text-lg tracking-wider">{testi.name}</h4>
                  <p className="text-text-muted text-sm uppercase tracking-widest">{testi.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Part 2: Video Shorts Testimonials */}
        <div className="pt-16 border-t border-white/10">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl md:text-3xl text-white font-heading font-bold uppercase tracking-wider">
              Field <span className="text-gold italic font-light">Documentation</span>
            </h3>
            <div className="hidden md:flex items-center gap-2 text-text-muted text-sm tracking-widest uppercase">
              <PlayCircle className="w-5 h-5 text-gold" /> Watch Shorts
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
            {videoShorts.map((video, idx) => (
              <div 
                key={idx}
                ref={addToVideoCards}
                className="group relative aspect-[9/16] bg-dark rounded-2xl overflow-hidden border border-white/10 hover:border-gold transition-all duration-500 shadow-2xl"
              >
                {/* 
                  YouTube IFRAME for Shorts 
                  Standard YouTube URL format parameter handles the player layout.
                  Aspect ratio 9:16 matches perfectly.
                */}
                <iframe 
                  src={video.url}
                  title={`Testimonial Video Shorts ${video.id}`}
                  className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
                
                {/* Overlay to block direct interactions and force user click, optional */}
                {/* <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors pointer-events-none"></div> */}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}