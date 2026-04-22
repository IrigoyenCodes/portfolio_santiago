'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);
  const currentRef = useRef(0);

  useEffect(() => {
    // --- Phase 1: Animate counter to ~88 quickly using rAF ---
    const SOFT_TARGET = 88;

    const rampUp = () => {
      const gap = SOFT_TARGET - currentRef.current;
      // Eases in — fast at first, slows as it approaches 88
      const step = Math.max(gap * 0.06, 0.4);
      currentRef.current = Math.min(currentRef.current + step, SOFT_TARGET);
      setCount(Math.floor(currentRef.current));

      if (currentRef.current < SOFT_TARGET) {
        frameRef.current = requestAnimationFrame(rampUp);
      }
    };
    frameRef.current = requestAnimationFrame(rampUp);

    // --- Phase 2: Resolve when page is loaded AND min time has passed ---
    const minDelay = new Promise<void>((res) => setTimeout(res, 1800));
    const pageLoaded = new Promise<void>((res) => {
      if (document.readyState === 'complete') {
        res();
      } else {
        window.addEventListener('load', () => res(), { once: true });
      }
    });

    Promise.all([minDelay, pageLoaded]).then(() => {
      cancelAnimationFrame(frameRef.current);

      // --- Phase 3: Quickly sprint from current to 100 ---
      const sprint = () => {
        currentRef.current = Math.min(currentRef.current + 4, 100);
        setCount(Math.floor(currentRef.current));

        if (currentRef.current < 100) {
          frameRef.current = requestAnimationFrame(sprint);
        } else {
          // Brief pause at 100 before wiping away
          setTimeout(() => setVisible(false), 350);
        }
      };
      frameRef.current = requestAnimationFrame(sprint);
    });

    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // Formatted counter: always 3 digits
  const display = String(count).padStart(3, '0');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col bg-black overflow-hidden select-none"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ── Center content ─────────────────────────────────────── */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 gap-3">

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
              className="text-center leading-none"
            >
              <div className="text-[clamp(3rem,10vw,8rem)] font-display font-medium text-white tracking-tight">
                Santiago
              </div>
              <div className="text-[clamp(3rem,10vw,8rem)] font-display font-medium text-neutral-500 tracking-tight">
                Irigoyen
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-neutral-600 text-sm sm:text-base font-mono tracking-[0.2em] uppercase mt-2"
            >
              Fullstack &amp; AI Engineering
            </motion.p>
          </div>

          {/* ── Bottom bar ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-end justify-between px-8 pb-6 shrink-0"
          >
            {/* Left label */}
            <span className="text-neutral-700 text-xs font-mono uppercase tracking-widest">
              Portfolio&nbsp;·&nbsp;2025
            </span>

            {/* Progress counter */}
            <span className="text-white text-4xl sm:text-5xl font-mono font-light tabular-nums leading-none">
              {display}
            </span>
          </motion.div>

          {/* ── Progress bar (very bottom) ─────────────────────────── */}
          <div className="h-[2px] w-full bg-neutral-900 shrink-0">
            <motion.div
              className="h-full bg-white origin-left"
              style={{ width: `${count}%` }}
              // No Framer transition — width is driven directly by state so it tracks the counter
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
