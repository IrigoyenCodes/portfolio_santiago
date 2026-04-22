import { Briefcase, TerminalSquare } from 'lucide-react';

export default function Experience() {
  return (
    <section className="flex flex-col gap-12 pt-12" id="experience">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-2">
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white">Experience</h2>
        <p className="text-neutral-400 max-w-sm text-sm leading-relaxed">Real-world impact through full-stack development and system engineering.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* UDLAP Card */}
        <div className="p-8 md:p-14 rounded-[2rem] bg-[#111111]/80 backdrop-blur-md border border-neutral-800 flex flex-col md:flex-row gap-12 md:gap-24 relative overflow-hidden group hover:border-neutral-600 transition-all duration-300 shadow-xl">
          <div className="flex items-start gap-4 md:w-1/3 relative z-10 flex-col">
            <div className="flex items-center gap-4">
               <div className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800">
                 <TerminalSquare className="w-5 h-5 text-white" />
               </div>
               <div>
                 <h3 className="text-2xl font-display font-medium text-white">IT Intern</h3>
                 <div className="text-neutral-400 text-sm font-medium mt-1">UDLAP</div>
               </div>
            </div>
            <p className="text-neutral-500 text-sm mt-4 tracking-wide font-mono uppercase">Sep 2024 - Present</p>
          </div>
          <div className="md:w-2/3 flex flex-col gap-6 text-neutral-200 relative z-10 text-[15px] leading-relaxed">
            <p>
              Designed and developed a full-stack document processing system using React, TypeScript, and OpenRouter to automate recognition, classification, and data extraction.
            </p>
            <ul className="flex flex-col gap-3 text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Engineered an OCR pipeline with Qwen3-VL-30B for complex field extraction, reducing manual processing time by 80%.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Built internal automation tools streamlining document-handling workflows across university operations.
              </li>
            </ul>
          </div>
        </div>

        {/* MERKABBALA Card */}
        <div className="p-8 md:p-14 rounded-[2rem] bg-[#111111]/80 backdrop-blur-md border border-neutral-800 flex flex-col md:flex-row gap-12 md:gap-24 relative overflow-hidden group hover:border-neutral-600 transition-all duration-300 shadow-xl">
          <div className="flex items-start gap-4 md:w-1/3 relative z-10 flex-col">
            <div className="flex items-center gap-4">
               <div className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800">
                 <Briefcase className="w-5 h-5 text-white" />
               </div>
               <div>
                 <h3 className="text-2xl font-display font-medium text-white">Systems Engineer</h3>
                 <div className="text-neutral-400 text-sm font-medium mt-1">MERKABBALA</div>
               </div>
            </div>
            <p className="text-neutral-500 text-sm mt-4 tracking-wide font-mono uppercase">Jul 2025 - Oct 2025</p>
          </div>
          <div className="md:w-2/3 flex flex-col gap-6 text-neutral-200 relative z-10 text-[15px] leading-relaxed">
            <p>
              Maintained operational stability across internal systems supporting 17+ employees, contributing to 100% server uptime during the internship.
            </p>
            <ul className="flex flex-col gap-3 text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Implemented backup and recovery procedures across company computers and servers.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Standardized system maintenance workflows to reduce downtime and improve reliability.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
