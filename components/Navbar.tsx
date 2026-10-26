'use client';

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { useScrollY } from "@/hooks/use-scroll-y";
import { useEffect, useRef, useState } from "react";

const PHONES = [
  { label: "France", flag: "🇫🇷", intl: "+33 7 55 83 12 780", waUrl: "https://wa.me/337558312780", telUrl: "tel:+337558312780" },
  { label: "Mexico",  flag: "🇲🇽", intl: "+52 221 598 4522",   waUrl: "https://wa.me/522215984522",   telUrl: "tel:+522215984522" },
];

export default function Navbar() {
  const scrollY = useScrollY();
  const scrolled = scrollY > 20;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

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
          <div className="relative hidden sm:block" ref={ref}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center justify-center p-2.5 rounded-full bg-neutral-900/50 border border-white/10 hover:bg-neutral-800 transition-colors text-white"
              aria-label="Call or WhatsApp"
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
            </button>
            {open && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-white/10 shadow-xl p-2 flex flex-col gap-1"
              >
                {PHONES.map((p) => (
                  <div key={p.label} className="flex flex-col px-3 py-2 rounded-xl hover:bg-white/5">
                    <div className="flex items-center justify-between gap-2 text-xs font-medium text-neutral-300">
                      <span className="flex items-center gap-2">
                        <span>{p.flag}</span>
                        {p.label}
                      </span>
                      <span className="text-neutral-500 font-mono text-[11px]">{p.intl}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <a
                        href={p.waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-xs font-medium py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={p.telUrl}
                        className="flex-1 text-center text-xs font-medium py-1.5 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                      >
                        Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
