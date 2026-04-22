'use client';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="pt-32 md:pt-40 flex flex-col md:flex-row gap-12 md:gap-16 relative w-full items-center">
      {/* Left Image Panel instead of Keyboard */}
      <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full md:w-[35%] aspect-[4/5] sm:aspect-square md:aspect-[3/4] rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-neutral-800 shrink-0 group"
      >
        <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
        <Image
          src="https://picsum.photos/seed/santiago_face_portrait/800/1200"
          alt="Santiago Irigoyen"
          fill
          className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
        <div className="absolute bottom-8 left-8 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-white text-sm font-medium tracking-wide">Available for work</span>
        </div>
      </motion.div>

      {/* Right Content */}
      <div className="w-full md:w-[65%] flex flex-col gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1.05] font-medium tracking-tight font-display text-white"
        >
          Fullstack & AI <br className="hidden sm:block" /> Engineering.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-8 sm:items-start md:items-end justify-between text-neutral-200 mt-4"
        >
          <p className="text-lg md:text-xl max-w-md leading-relaxed font-medium">
            I design and develop scalable web applications and intelligent AI pipelines. Automating workflows and bridging systems with modern stacks. 
          </p>
          <a href="#projects" className="flex items-center gap-2 group hover:text-white transition-colors text-lg pt-4 shrink-0 pb-1 border-b border-transparent hover:border-white">
            View Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
