'use client';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-48 md:pt-72 pb-20 md:pb-32 flex flex-col items-center text-center relative w-full">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl sm:text-6xl lg:text-[7rem] leading-[1.02] font-medium tracking-tight font-display text-white max-w-6xl"
      >
        AI engineer,
        <br className="hidden sm:block" />
        <span className="text-neutral-500"> building fullstack products.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-lg md:text-xl text-neutral-300 max-w-2xl mt-12 leading-relaxed"
      >
        CTO at{' '}
        <a
          href="https://hyatlas.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline decoration-neutral-600 underline-offset-4 hover:decoration-white transition-colors"
        >
          @HYATLAS.ai
        </a>
        . Computer Systems Engineering at{' '}
        <a
          href="https://www.udlap.mx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline decoration-neutral-600 underline-offset-4 hover:decoration-white transition-colors"
        >
          @UDLAP
        </a>
        , on exchange at{' '}
        <a
          href="https://www.ece.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline decoration-neutral-600 underline-offset-4 hover:decoration-white transition-colors"
        >
          @ECE Paris
        </a>
        .
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 mt-14"
      >
        <a
          href="#projects"
          className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
        >
          See projects <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="mailto:santiagoirigoyen12@hotmail.com"
          className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white text-sm font-medium hover:bg-white/5 transition-colors"
        >
          Get in touch
        </a>
      </motion.div>
    </section>
  );
}
