'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Layanan', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimoni', href: '/testimoni' },
    { name: 'Tentang Kami', href: '/about' },
  ];

  // Desktop Menu Animation
  const navListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const navItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  // Mobile Menu Animation (Curtain reveal from top)
  const menuVariants = {
    closed: {
      clipPath: 'inset(0% 0% 100% 0%)',
      transition: { type: 'tween', duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    open: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { type: 'tween', duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 flex justify-center py-6 px-4 transition-all duration-500`}
      >
        {/* Floating Capsule Style Navbar */}
        <div
          className={`w-full max-w-6xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-dark/80 backdrop-blur-xl border border-gold/30 shadow-[0_4_30px_rgba(212,175,55,0.1)]'
              : 'bg-dark/30 backdrop-blur-md border border-white/10'
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/logo-vip.webp"
                alt="Sentinel VIP Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-heading font-bold text-xl leading-none tracking-widest uppercase text-text-offwhite group-hover:text-gold transition-colors duration-300">
                Sentinel
              </span>
              <span className="text-[9px] tracking-[0.4em] text-gold/80 uppercase mt-1">
                VIP Indonesia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            variants={navListVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link, idx) => (
              <motion.div key={idx} variants={navItemVariants}>
                <Link
                  href={link.href}
                  className="text-[11px] font-bold tracking-[0.15em] uppercase text-text-offwhite hover:text-gold transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}

            <motion.div variants={navItemVariants}>
              <Link
                href="/contact"
                className="ml-2 px-6 py-2.5 bg-gold/10 border border-gold text-gold text-xs font-bold uppercase tracking-[0.15em] hover:bg-gold hover:text-dark transition-all duration-300 backdrop-blur-sm rounded-full"
              >
                Konsultasi
              </Link>
            </motion.div>
          </motion.nav>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7 text-gold" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-7 h-7 text-text-offwhite" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu (Curtain Drop) */}
      <motion.div
        className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div className="flex flex-col items-center gap-8 px-6 text-center w-full max-w-sm mt-10">
          {navLinks.map((link, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 50, opacity: 0 }}
              animate={isOpen ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{
                delay: isOpen ? 0.3 + idx * 0.1 : 0,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full overflow-hidden"
            >
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-3xl font-heading font-light uppercase text-text-offwhite hover:text-gold hover:tracking-widest transition-all duration-300 w-full"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isOpen ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ delay: isOpen ? 0.7 : 0, duration: 0.5 }}
            className="pt-10 w-full"
          >
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full border border-gold text-gold py-4 text-sm font-bold uppercase tracking-[0.2em] text-center hover:bg-gold hover:text-dark transition-all duration-300 rounded-full"
            >
              Konsultasi Gratis
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

