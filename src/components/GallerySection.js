"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize2 } from "lucide-react";

export default function GallerySection() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const addToItems = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const images = [
    {
      src: "/gallery1.webp",
      title: "Professional Debt Recovery",
      desc: "Operasi pemulihan aset dengan pendekatan strategis dan legal di lapangan.",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      src: "/gallery2.webp",
      title: "Discrete Surveillance",
      desc: "Investigasi mendalam dan pemantauan senyap oleh detektif profesional.",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      src: "/vvip_security_1778487686645.png",
      title: "Executive Protection",
      desc: "Pengamanan VVIP tingkat tinggi untuk perlindungan aset dan personil.",
      className: "md:col-span-1 md:row-span-2",
    },
    {
      src: "/gallery4.webp",
      title: "Strategic Negotiation",
      desc: "Mediasi dan negosiasi profesional untuk penyelesaian kewajiban.",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      src: "/asset_recovery_truck_1778488220021.png",
      title: "Legal Asset Seizure",
      desc: "Eksekusi pengambilalihan aset tertunggak secara aman dan sesuai prosedur hukum.",
      className: "md:col-span-4 md:row-span-1 min-h-[300px]",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-dark/90 via-dark to-dark overflow-hidden border-t border-white/5"
    >
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-[1px] bg-gold"></div>
            <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold">
              Operational Gallery
            </span>
            <div className="w-8 h-[1px] bg-gold"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-offwhite font-heading uppercase tracking-wide">
            Behind The{" "}
            <span className="text-gold italic font-light">Shadows</span>
          </h2>
          <p className="text-text-muted font-light max-w-2xl text-lg mt-4">
            Dokumentasi visual operasi strategis kami. Dari negosiasi tertutup
            hingga perlindungan taktis armada VVIP dan pemulihan aset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4 lg:gap-6">
          {images.map((item, idx) => (
            <div
              key={idx}
              ref={addToItems}
              className={`group relative overflow-hidden rounded-xl bg-dark-secondary border border-white/5 hover:border-gold/30 cursor-pointer shadow-xl ${item.className}`}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-110"
                />
                {/* Darker gradient on hover for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Icon view */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-dark/70 border border-gold/40 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 z-20">
                <Maximize2 className="w-4 h-4 text-gold" />
              </div>

              {/* Text content absolute bottom */}
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-10 flex flex-col justify-end overflow-hidden">
                <div className="transform translate-y-14 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-xl md:text-2xl font-bold font-heading uppercase tracking-wider text-white mb-2 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <div className="h-[2px] w-12 bg-gold mb-3 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
                  <p className="text-text-muted text-sm md:text-base font-light opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
