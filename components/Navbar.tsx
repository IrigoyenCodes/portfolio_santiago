'use client';

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { useScrollY } from "@/hooks/use-scroll-y";

export default function Navbar() {
  const scrollY = useScrollY();
  const scrolled = scrollY > 20;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b transition-all duration-300 ${
        scrolled
          ? "border-white/15 bg-black/60 backdrop-blur-xl shadow-lg shadow-black/20"
          : "border-white/10 bg-black/20 backdrop-blur-md"
      }`}
    >
      <div className="flex gap-2 items-center">
        <Link href="/" className="text-xl font-display font-medium text-white tracking-tight hover:text-neutral-300 transition-colors">
          Santiago Irigoyen
        </Link>
      </div>

      <nav className="flex gap-6 items-center" aria-label="Main navigation">
        <Link href="/#experience" className="hidden md:block text-sm font-medium text-neutral-200 hover:text-white transition-colors">
          Experience
        </Link>
        <Link href="/#projects" className="hidden md:block text-sm font-medium text-neutral-200 hover:text-white transition-colors">
          Projects
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/522215984522"
            className="hidden sm:flex items-center justify-center p-2.5 rounded-full bg-neutral-900/50 border border-white/10 hover:bg-neutral-800 transition-colors text-white"
            aria-label="Contact via WhatsApp"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="mailto:santiagoirigoyen12@hotmail.com"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors shadow-md"
          >
            <Mail className="w-4 h-4 hidden sm:block" aria-hidden="true" /> Contact Me
          </a>
        </div>
      </nav>
    </header>
  );
}
