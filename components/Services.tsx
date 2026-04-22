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
              I develop cloud-native custom software tailored exactly to your business processes. Modern interfaces with performant architecture that transforms complex data streams into actionable insights and measurable efficiency gains.
            </p>
            <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Data-driven process analysis & MVP definition
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Workflow-optimized interfaces for minimal onboarding time
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Fail-safe scaling through modern cloud architectures
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
              I build lightweight, highly specialized AI agents and automations that solve complex bottlenecks intuitively. Perfect for rapidly scaling workflows without manual overhead or bloated systems.
            </p>
            <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Hyper-focused feature sets
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Seamless integration with existing ERP/CRM
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
