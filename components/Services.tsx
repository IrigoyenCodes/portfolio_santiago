import { Briefcase, AppWindow } from 'lucide-react';

export default function Services() {
  return (
    <section className="flex flex-col gap-16 pt-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-2">
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white">What I do</h2>
        <p className="text-neutral-400 max-w-sm text-sm leading-relaxed">Two things I spend most of my time on.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Full-Stack Card */}
        <div className="p-8 md:p-14 rounded-[2rem] bg-[#111111]/80 backdrop-blur-md border border-neutral-800 flex flex-col md:flex-row gap-12 md:gap-24 relative overflow-hidden group hover:border-neutral-600 transition-all duration-300 shadow-xl">
           <div className="absolute inset-0 bg-dot-pattern opacity-[0.15] pointer-events-none" />

          <div className="flex items-start gap-4 md:w-1/3 relative z-10">
            <div className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-display font-medium text-white max-w-[200px]">Web apps</h3>
          </div>
          <div className="md:w-2/3 flex flex-col gap-8 text-neutral-200 relative z-10">
            <p className="leading-relaxed text-[1.05rem] max-w-xl text-neutral-300">
              Mostly React, Next.js, and a Postgres database behind it. I take projects from first commit to a product people actually use, and I like being the one responsible for both sides of the stack.
            </p>
            <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> MVPs from scratch
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Frontends that don&apos;t feel like templates
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> APIs, auth, and database schemas
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
            <h3 className="text-3xl lg:text-4xl font-display font-medium text-white max-w-[250px]">AI & automation</h3>
          </div>
          <div className="md:w-2/3 flex flex-col gap-8 text-neutral-200 relative z-10">
             <p className="leading-relaxed text-[1.05rem] max-w-xl text-neutral-300">
              The useful kind: setters that reply on WhatsApp and Instagram, scrapers that keep CRMs full, pipelines that pull data out of PDFs. Built around real work, not demos.
            </p>
            <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Chat agents on WhatsApp, Instagram and TikTok
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Document extraction and OCR pipelines
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Workflows wired into whatever CRM you already have
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
