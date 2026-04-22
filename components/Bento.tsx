import Image from 'next/image';
import { Smartphone, Lock, Database } from 'lucide-react';

export default function Bento() {
  return (
    <section className="flex flex-col gap-12 pt-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-2">
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white mb-2">My Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {/* Col 1 & 2 */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Tech Stack Command Center */}
          <div className="bg-[#111111]/80 backdrop-blur-md border border-neutral-800 rounded-[2rem] p-8 md:p-10 flex flex-col gap-8 bg-dot-pattern">
            <h3 className="text-2xl font-display font-medium text-white">Technical Arsenal</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Box 1 */}
              <div>
                <div className="text-sm font-medium text-white mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Languages</div>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java'].map(t => (
                    <span key={t} className="px-2.5 py-1 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-md">{t}</span>
                  ))}
                </div>
              </div>
              {/* Box 2 */}
              <div>
                <div className="text-sm font-medium text-white mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Frontend</div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'].map(t => (
                    <span key={t} className="px-2.5 py-1 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-md">{t}</span>
                  ))}
                </div>
              </div>
              {/* Box 3 */}
              <div>
                <div className="text-sm font-medium text-white mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Backend & AI</div>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'PostgreSQL', 'MySQL', 'Prisma', 'Supabase', 'OpenRouter', 'Scikit-learn'].map(t => (
                    <span key={t} className="px-2.5 py-1 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-md">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Awards and Languages Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            {/* Awards */}
            <div className="bg-[#111111]/80 backdrop-blur-md border border-neutral-800 rounded-[2rem] p-8 md:p-10 flex flex-col gap-6">
              <h3 className="text-xl font-display font-medium text-white">Awards & Honors</h3>
              <ul className="flex flex-col gap-5 mt-2">
                <li className="flex items-start gap-4 text-sm text-neutral-300">
                  <span className="text-xl">🏆</span>
                  <div>
                    <span className="block text-white font-medium mb-0.5">COPARMEX Startup Forum</span>
                    <span className="text-neutral-500 text-xs">Finalist • 2026</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-sm text-neutral-300">
                  <span className="text-xl">⚡</span>
                  <div>
                    <span className="block text-white font-medium mb-0.5">BANXICO Hackathon</span>
                    <span className="text-neutral-500 text-xs">Participant • 2025</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-sm text-neutral-300">
                  <span className="text-xl">💻</span>
                  <div>
                    <span className="block text-white font-medium mb-0.5">Bitwise & Hackztecs</span>
                    <span className="text-neutral-500 text-xs">Competitive Programming • 2025</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Languages */}
            <div className="bg-[#111111]/80 backdrop-blur-md border border-neutral-800 rounded-[2rem] p-8 md:p-10 flex flex-col gap-6">
              <h3 className="text-xl font-display font-medium text-white">Spoken Languages</h3>
              <div className="flex flex-col gap-4 mt-2">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-white">Spanish <span className="text-neutral-500 text-xs font-normal ml-1">Native</span></span>
                    <span className="text-xs">🇲🇽</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden"><div className="bg-neutral-400 w-full h-full" /></div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-white">English <span className="text-neutral-500 text-xs font-normal ml-1">B2 (TOEFL 85)</span></span>
                    <span className="text-xs">🇺🇸</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden"><div className="bg-neutral-500 w-[75%] h-full" /></div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-white">French <span className="text-neutral-500 text-xs font-normal ml-1">B2</span></span>
                    <span className="text-xs">🇫🇷</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden"><div className="bg-neutral-600 w-[75%] h-full" /></div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-white">German & Italian <span className="text-neutral-500 text-xs font-normal ml-1">A2 & A1</span></span>
                    <span className="text-xs">🇩🇪 🇮🇹</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden"><div className="bg-neutral-700 w-[25%] h-full" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Puebla Anchor */}
        <div className="bg-neutral-800 border-none rounded-[2rem] relative overflow-hidden md:col-span-1 h-full min-h-[500px]">
          <Image
            src="https://picsum.photos/seed/puebla/800/1200"
            alt="Puebla Landscape"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2b3c]/90 via-neutral-900/40 to-[#121212] z-10" />
          <div className="absolute inset-0 p-8 md:p-10 flex flex-col z-20">
            <h3 className="text-2xl font-display font-medium text-white mb-4 leading-snug">Puebla, <br/> Mexico</h3>
            <p className="text-neutral-300 text-[15px] leading-relaxed max-w-[250px] mb-8">
              Studying Computer Systems Engineering at UDLAP. I bring strong analytical habits to global projects, ensuring rapid execution.
            </p>
            <div className="mt-auto">
              <p className="text-xs font-mono tracking-widest uppercase text-neutral-500 mb-4">Focus Areas</p>
              <div className="flex flex-wrap gap-2">
                 <span className="px-3 py-1.5 rounded-lg bg-[#111111]/80 backdrop-blur-sm border border-neutral-800 text-[11px] text-white font-medium">Full-Stack SaaS</span>
                 <span className="px-3 py-1.5 rounded-lg bg-[#111111]/80 backdrop-blur-sm border border-neutral-800 text-[11px] text-white font-medium">AI Automation</span>
                 <span className="px-3 py-1.5 rounded-lg bg-[#111111]/80 backdrop-blur-sm border border-neutral-800 text-[11px] text-white font-medium">Machine Learning</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-dot-pattern mix-blend-overlay opacity-30 z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
