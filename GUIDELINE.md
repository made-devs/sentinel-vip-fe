# Sentinel VIP Indonesia - Development & Design Guidelines

## 1. Project Overview
**Sentinel VIP Indonesia** adalah penyedia jasa eksklusif dan profesional yang berfokus pada keamanan, investigasi, dan pemulihan aset. Website ini dirancang untuk merepresentasikan kekuatan, profesionalisme, keandalan, dan eksklusivitas merek.

**Fokus Utama:** Jasa Debt Recovery (Pemulihan Aset/Hutang).

## 2. AWWWARDS Standard & Aesthetic Goals
- **Vibe:** Maskulin, Kuat, Keren, dan Sangat Profesional (High-End / VIP).
- **Interaktivitas:** Web harus terasa hidup dan responsif terhadap interaksi pengguna (Hover effects, scroll animations, parallax).
- **Smoothness:** Pengalaman scrolling yang mulus tanpa lag.
- **Visuals:** Menggunakan warna-warna gelap (Hitam, Charcoal) dikombinasikan dengan aksen Emas (Gold) yang mewah dan Elegan (mengacu pada logo).

## 3. Design System
### 3.1. Color Palette
- **Background Utama:** Ciemny / Onyx Black (`#0B0C10` atau `#111111`)
- **Background Sekunder:** Night Blue / Dark Grey (`#1A1A1D`)
- **Aksen Primer:** Majestic Gold (`#D4AF37`, `#FFD700`, atau gradasi emas logo)
- **Aksen Sekunder:** Silver / Steel Grey (`#8E8D8A` atau `#D3D3D3`)
- **Typografi Utama:** Putih Off-white (`#F8F8F8`)
- **Typografi Sekunder:** Abu-abu terang (`#B3B3B3`)

### 3.2. Typography
- **Heading (H1, H2, H3):** Font sans-serif atau serif modern yang tegas, tebal, dan elegan (contoh: *Cinzel*, *Playfair Display*, *Oswald*, atau *Montserrat* dengan weight Bold/Black).
- **Body Text:** Font sans-serif yang bersih dan mudah dibaca (contoh: *Inter*, *Roboto*, atau *Open Sans*).

### 3.3. UI Components
- **Buttons:** Sharp edges (sudut tajam) atau sedikit lengkung, dengan efek hover emas yang elegan (fill atau glow).
- **Cards/Containers:** Glassmorphism ringan atau border emas tipis dengan background gelap semi-transparan.
- **Custom Cursor:** Kursor custom yang menyesuaikan bentuk saat hover pada elemen interaktif.

## 4. Animation Strategy (GSAP Makimal)
Kita akan memaksimalkan **GSAP (GreenSock Animation Platform)** untuk menghidupkan website:

- **Preloader Animation:** Animasi logo emas Sentinel VIP (SL) yang elegan sebelum masuk ke halaman utama.
- **Hero Section:**
  - Teks reveal animasi masker (Staggered text reveal) untuk Headline utama.
  - Gambar/Video latar (seperti skyline kota malam hari, siluet bodyguard) berjalan dengan efek parallax lambat.
- **ScrollTrigger Animations:**
  - **Pinning & Scrubber:** Section "Debt Recovery" dipin (terpaku) di layer untuk memberikan kesan penekanan dan otoritas saat di-scroll.
  - **Fade-Up / Slide-In:** Elemen layanan lain (Bodyguard, Detektif, dll) muncul secara bergantian saat di-scroll (stagger animations).
  - **Line Drawing:** Garis-garis emas atau dekorator SVG yang digambar (drawSVG) seiring scroll menuju bawah.
- **Hover Effects:** Gambar menjadi lebih terang/fokus, teks bergeser sedikit, warna tombol transisi menjadi emas terang menggunakan Tween GSAP.
- **Page Transitions:** Menggunakan framer-motion atau page transition custom dari GSAP agar berpindah halaman tidak terputus (seamless).

## 5. Struktur Konten (Pages)
### Halaman Utama (One-Page / Landing Page Layout)
1. **Hero Section:** Teks provokatif dan kuat tentang penyelesaian masalah Anda, tombol CTA (Konsultasi Gratis).
2. **Flagship Service (Debt Recovery):** Section khusus dengan desain dramatis yang menonjolkan profesionalitas hukum, ketegasan, dan resolusi. Elemen animasi dominan di sini.
3. **Core Services:** Grid / Carousel untuk layanan lainnya:
   - ⚖️ Bodyguard
   - ⚖️ Detektif Swasta
   - ⚖️ Pengamanan
   - ⚖️ Secure VIP
4. **Why Choose Us / Authority:** Statistik, profil ringkas tim, pendekatan hukum & strategi persuasif.
5. **CTA (Call to Action) / Konsultasi Gratis:** Form kontak elegan, informasi WhatsApp, atau penjadwalan meeting.
6. **Footer:** Links, legalitas, alamat (dengan peta gelap minimalis), dan kontak info.

## 6. Tech Stack & Dependencies
- **Framework:** Next.js (App Router/Pages)
- **Styling:** Tailwind CSS (mudah diubah-ubah, bisa membuat utility classes custom).
- **Animasi:** GSAP, gsap/ScrollTrigger.
- **Smooth Scroll:** Lenis Scroll (standar Awwwards).
- **Icons:** Lucide React / React Icons.

## 7. Langkah Selanjutnya
1. Instalasi GSAP, Lenis (`@studio-freight/lenis`).
2. Membuat layout root dengan integrasi Lenis dan styling dasar globals.css.
3. Membangun Hero Section dengan efek GSAP.
4. Membangun section Debt Recovery dengan efek ScrollTrigger khusus.
5. Menyelesaikan section layanan lainnya dan form kontak.
