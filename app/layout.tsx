import type {Metadata} from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import LiquidBackground from '@/components/LiquidBackground';
import FloatingSocials from '@/components/FloatingSocials';
import Preloader from '@/components/Preloader';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const syne = Syne({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Personal Portfolio',
  description: 'Sleek and modern personal portfolio showcasing skills and projects.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <body className="bg-transparent text-neutral-50 font-sans antialiased selection:bg-blue-500 selection:text-white" suppressHydrationWarning>
        <Preloader />
        <LiquidBackground />
        <FloatingSocials />
        {children}
      </body>
    </html>
  );
}
