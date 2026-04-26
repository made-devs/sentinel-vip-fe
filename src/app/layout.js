import { Playfair_Display, Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Sentinel VIP Indonesia | Debt Recovery & Premium Security',
  description:
    'Jasa Debt Recovery, Bodyguard, Detektif Swasta, dan Pengamanan VIP Profesional di Indonesia.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-gold selection:text-dark">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

