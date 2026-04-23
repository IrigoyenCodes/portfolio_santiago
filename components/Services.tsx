import { Briefcase, AppWindow } from 'lucide-react';

export default function Services() {
  return (
    <section className="flex flex-col gap-16 pt-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-2">
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white">My Expertise</h2>
        <p className="text-neutral-400 max-w-sm text-sm leading-relaxed">Tailored full-stack and AI solutions that measurably advance your business.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Full-Stack Card */}
        <div className="p-8 md:p-14 rounded-[2rem] bg-[#111111]/80 backdrop-blur-md border border-neutral-800 flex flex-col md:flex-row gap-12 md:gap-24 relative overflow-hidden group hover:border-neutral-600 transition-all duration-300 shadow-xl">
           <div className="absolute inset-0 bg-dot-pattern opacity-[0.15] pointer-events-none" />
          
          <div className="flex items-start gap-4 md:w-1/3 relative z-10">
            <div className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-display font-medium text-white max-w-[200px]">Full-Stack Engineering</h3>
          </div>
          <div className="md:w-2/3 flex flex-col gap-8 text-neutral-200 relative z-10">
            <p className="leading-relaxed text-[1.05rem] text-balance max-w-xl text-neutral-300">
              I build robust, product-driven applications that turn complex requirements into seamless digital experiences. Whether launching a new MVP or refactoring legacy architectures, the focus rests on technical excellence and user impact.
            </p>
            <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> End-to-end MVP development & rapid iteration
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Modern, responsive frontend architecture
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Scalable database design & secure API endpoints
              </li>
            </ul>
          </div>
        </div>

         {/* AI Card */}
        <div className="p-8 md:p-14 rounded-[2rem] bg-[#111111]/80 backdrop-blur-md border border-neutral-800 flex flex-col md:flex-row gap-12 md:gap-24 relative overflow-hidden group hover:border-neutral-600 transition-all duration-300 shadow-xl">
          <div className="absolute inset-0 bg-dot-pattern opacity-[0.15] pointer-events-none" />
          
          <div className="flex items-start gap-4 md:w-1/3 relative z-10">
            <div className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800">
              <AppWindow className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-display font-medium text-white max-w-[250px]">AI & Automation</h3>
          </div>
          <div className="md:w-2/3 flex flex-col gap-8 text-neutral-200 relative z-10">
             <p className="leading-relaxed text-[1.05rem] text-balance max-w-xl text-neutral-300">
              I build autonomous systems and specialized AI agents designed to eliminate repetitive tasks and streamline operations. From custom data pipelines to intelligent integrations, the goal is securely connecting large language models directly to your business data to genuinely extend human capabilities.
            </p>
            <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Context-aware AI assistants (RAG) & intelligent document extraction
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Seamless integration with any model (Open Source, Proprietary, Vision-Language)
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Automated workflows connected to your existing database/CRM
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
