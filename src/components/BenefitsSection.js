"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ShieldCheck, 
  Search, 
  Gavel, 
  Lock, 
  MessageSquare, 
  Clock, 
  Globe, 
  UserPlus, 
  FileSearch, 
  Briefcase, 
  Eye, 
  Zap 
} from "lucide-react";

export default function BenefitsSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".benefit-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      title: "Proteksi Hukum Penuh",
      desc: "Pendampingan legalitas dari awal hingga akhir proses.",
      icon: <ShieldCheck className="w-6 h-6" />,
      value: "Rp 15jt",
    },
    {
      title: "Investigasi Aset",
      desc: "Pelacakan aset tersembunyi secara mendalam dan akurat.",
      icon: <Search className="w-6 h-6" />,
      value: "Rp 10jt",
    },
    {
      title: "Mediasi Strategis",
      desc: "Negosiasi tingkat tinggi tanpa konfrontasi fisik.",
      icon: <Gavel className="w-6 h-6" />,
      value: "Rp 8jt",
    },
    {
      title: "Kerahasiaan VIP",
      desc: "Privasi klien adalah prioritas tertinggi bagi kami.",
      icon: <Lock className="w-6 h-6" />,
      value: "Priceless",
    },
    {
      title: "Update Real-Time",
      desc: "Laporan progres harian langsung ke perangkat Anda.",
      icon: <MessageSquare className="w-6 h-6" />,
      value: "Rp 5jt",
    },
    {
      title: "Respon 24/7",
      desc: "Tim siaga setiap saat untuk menangani kasus mendesak.",
      icon: <Clock className="w-6 h-6" />,
      value: "Rp 5jt",
    },
    {
      title: "Jaringan Nasional",
      desc: "Akses luas di seluruh wilayah Indonesia.",
      icon: <Globe className="w-6 h-6" />,
      value: "Rp 20jt",
    },
    {
      title: "Bodyguard On-Call",
      desc: "Pendampingan fisik untuk keamanan ekstra di lapangan.",
      icon: <UserPlus className="w-6 h-6" />,
      value: "Rp 12jt",
    },
    {
      title: "Audit Dokumen",
      desc: "Verifikasi keabsahan hutang dan bukti pendukung.",
      icon: <FileSearch className="w-6 h-6" />,
      value: "Rp 5jt",
    },
    {
      title: "Konsultan Khusus",
      desc: "Dedicated account manager untuk setiap klien.",
      icon: <Briefcase className="w-6 h-6" />,
      value: "Rp 10jt",
    },
    {
      title: "Intelijen Lapangan",
      desc: "Pengumpulan bukti otentik melalui Private Detective.",
      icon: <Eye className="w-6 h-6" />,
      value: "Rp 15jt",
    },
    {
      title: "Akses Jalur Cepat",
      desc: "Prosedur prioritas untuk hasil yang lebih efisien.",
      icon: <Zap className="w-6 h-6" />,
      value: "Rp 10jt",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-heading uppercase text-text-offwhite">
            12 Benefit <span className="text-gold italic font-light">Eksklusif</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto font-light">
            Total nilai manfaat lebih dari <span className="text-gold font-bold">puluhan juta rupiah</span> yang kami berikan sebagai standar pelayanan VIP untuk pemulihan aset Anda.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="benefit-card group p-6 bg-dark-secondary border border-white/5 hover:border-gold/30 transition-all duration-500 rounded-xl"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-white font-bold uppercase tracking-wider mb-2 text-sm">
                {benefit.title}
              </h3>
              <p className="text-text-muted text-xs font-light leading-relaxed mb-4">
                {benefit.desc}
              </p>
              <div className="text-[10px] text-gold/60 uppercase tracking-widest border-t border-white/10 pt-3">
                Value: <span className="text-gold">{benefit.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
