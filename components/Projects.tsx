'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectDetails } from '@/types/project';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsProps {
  projects: ProjectDetails[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="flex flex-col gap-10 pt-12" id="projects">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-2">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white mb-2">Selected Work</h2>
          <p className="text-neutral-400 max-w-md text-sm leading-relaxed">Recent projects showcasing full-stack capabilities, ML data pipelines, and intelligent AI models.</p>
        </div>
      </div>

      <div className="flex flex-col border-t border-neutral-800">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            className="border-b border-neutral-800 overflow-hidden cursor-pointer group"
            onHoverStart={() => setActiveIndex(i)}
            onHoverEnd={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(i)}
            onBlur={() => setActiveIndex(null)}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            {/* Collapsed row */}
            <div className="flex items-center justify-between px-2 py-6 gap-6">
              {/* Index + title */}
              <div className="flex items-center gap-6 min-w-0">
                <span className="text-neutral-600 font-mono text-sm tabular-nums shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-medium text-white group-hover:text-neutral-300 transition-colors truncate">
                  {project.title}
                </h3>
              </div>

              {/* Stats + arrow */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:flex flex-wrap gap-2">
                  {project.stats.slice(0, 2).map((stat, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 text-[11px] font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-md whitespace-nowrap"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-800 text-neutral-400 group-hover:border-neutral-600 group-hover:text-white transition-colors shrink-0"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>
            </div>

            {/* Expanded panel */}
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 pb-8 pt-2">
                    {/* Hero image */}
                    <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 relative shadow-2xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between gap-6">
                      <div className="flex flex-col gap-4">
                        <p className="text-neutral-300 text-[15px] leading-relaxed">{project.subtitle}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.stats.map((stat, j) => (
                            <span
                              key={j}
                              className="px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-lg"
                            >
                              {stat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-800/50">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex-1 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-center text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Details
                        </Link>
                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 bg-white text-black rounded-xl text-center text-sm font-medium hover:bg-neutral-200 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
