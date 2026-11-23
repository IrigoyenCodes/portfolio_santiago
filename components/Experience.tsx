import { Briefcase, TerminalSquare, Rocket } from 'lucide-react';

export default function Experience() {
  return (
    <section className="flex flex-col gap-12 pt-12" id="experience">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-2">
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white">Experience</h2>
        <p className="text-neutral-400 max-w-sm text-sm leading-relaxed">Where I&apos;ve worked.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* HYATLAS Card */}
        <div className="p-8 md:p-14 rounded-[2rem] bg-[#111111]/80 backdrop-blur-md border border-neutral-800 flex flex-col md:flex-row gap-12 md:gap-24 relative overflow-hidden group hover:border-neutral-600 transition-all duration-300 shadow-xl">
          <div className="flex items-start gap-4 md:w-1/3 relative z-10 flex-col">
            <div className="flex items-center gap-4">
               <div className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800">
                 <Rocket className="w-5 h-5 text-white" />
               </div>
               <div>
                 <h3 className="text-2xl font-display font-medium text-white">Co-Founder &amp; Lead Engineer</h3>
                 <div className="text-neutral-400 text-sm font-medium mt-1">HYATLAS.ai · Mexico – Paris</div>
               </div>
            </div>
            <p className="text-neutral-500 text-sm mt-4 tracking-wide font-mono uppercase">May 2026 - Present</p>
          </div>
          <div className="md:w-2/3 flex flex-col gap-6 text-neutral-200 relative z-10 text-[15px] leading-relaxed">
            <p>
              Co-founded a bootstrapped, Meta Business Partner SaaS that automates Instagram, TikTok and WhatsApp DM sales for content creators. I built and own the entire software stack, managing up to 2 developers in a 6-person team.
            </p>
            <ul className="flex flex-col gap-3 text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> 10+ paying clients (creators up to 5M followers), $10K MRR and $400K+ in revenue generated for clients.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Architected the multi-tenant platform (Django, PostgreSQL, Celery/Redis, PgBouncer) integrating Meta&apos;s messaging APIs, ManyChat, Calendly and multiple LLM providers.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Hardened the webhook pipeline for 100K+ events/day (21K+ inbound DMs/day): tuned gevent workers and PgBouncer pooling, added Redis distributed locks and dedicated Celery queues.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Cut LLM inference costs by 70% by routing each task by complexity to cheaper LLMs and SLMs.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Building a feedback-learning loop where the AI setter derives rules and examples from booked conversations.
              </li>
            </ul>
          </div>
        </div>

        {/* UDLAP Card */}
        <div className="p-8 md:p-14 rounded-[2rem] bg-[#111111]/80 backdrop-blur-md border border-neutral-800 flex flex-col md:flex-row gap-12 md:gap-24 relative overflow-hidden group hover:border-neutral-600 transition-all duration-300 shadow-xl">
          <div className="flex items-start gap-4 md:w-1/3 relative z-10 flex-col">
            <div className="flex items-center gap-4">
               <div className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800">
                 <TerminalSquare className="w-5 h-5 text-white" />
               </div>
               <div>
                 <h3 className="text-2xl font-display font-medium text-white">IT Intern</h3>
                 <div className="text-neutral-400 text-sm font-medium mt-1">UDLAP · Puebla, Mexico</div>
               </div>
            </div>
            <p className="text-neutral-500 text-sm mt-4 tracking-wide font-mono uppercase">Sep 2024 - Apr 2026</p>
          </div>
          <div className="md:w-2/3 flex flex-col gap-6 text-neutral-200 relative z-10 text-[15px] leading-relaxed">
            <p>
              Proposed and built a full-stack document-processing app (React, TypeScript, open-source OCR, OpenRouter LLMs) for the IT department. Still in use today.
            </p>
            <ul className="flex flex-col gap-3 text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Classifies IT service records and extracts 10 fields into Excel, replacing a 7-step manual workflow.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Cut end-to-end processing time by 85%: 3–5 min down to under 10 s per document, 50-document batches in under 5 min.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Built-in review table, with under 1% of documents needing manual OCR correction.
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
              Handled IT and internal systems for a 17-person team. Day-to-day support, servers, and whatever broke.
            </p>
            <ul className="flex flex-col gap-3 text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Set up backup and recovery across workstations and the main server.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Wrote down the maintenance checklists so the next person wouldn&apos;t have to figure it out.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
