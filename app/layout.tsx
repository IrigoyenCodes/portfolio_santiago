import type {Metadata} from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import LiquidBackground from '@/components/LiquidBackground';
import FloatingSocials from '@/components/FloatingSocials';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const syne = Syne({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Santiago Irigoyen',
  description: 'Fullstack engineer. Web apps and AI tooling, based in Puebla.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <body className="bg-transparent text-neutral-50 font-sans antialiased selection:bg-blue-500 selection:text-white" suppressHydrationWarning>
        <LiquidBackground />
        <FloatingSocials />
        {children}
      </body>
    </html>
  );
}
