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
                 <h3 className="text-2xl font-display font-medium text-white">CTO</h3>
                 <div className="text-neutral-400 text-sm font-medium mt-1">HYATLAS.ai</div>
               </div>
            </div>
            <p className="text-neutral-500 text-sm mt-4 tracking-wide font-mono uppercase">2025 - Present</p>
          </div>
          <div className="md:w-2/3 flex flex-col gap-6 text-neutral-200 relative z-10 text-[15px] leading-relaxed">
            <p>
              Running all software and infrastructure at HYATLAS.ai: the AI setter product, the CRM, the integrations with WhatsApp, Instagram and TikTok, and everything that keeps it online for creator teams.
            </p>
            <ul className="flex flex-col gap-3 text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Built the product from zero: Next.js dashboard, Supabase + Postgres backend, agent workers.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Shipped the Meta Business Partner integrations and the TikTok Business Messaging layer.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Helped clients generate $400k+ in bookings and cut $10k+/month in setter payroll.
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
                 <div className="text-neutral-400 text-sm font-medium mt-1">UDLAP</div>
               </div>
            </div>
            <p className="text-neutral-500 text-sm mt-4 tracking-wide font-mono uppercase">Sep 2024 - Present</p>
          </div>
          <div className="md:w-2/3 flex flex-col gap-6 text-neutral-200 relative z-10 text-[15px] leading-relaxed">
            <p>
              Built a document processing tool for the IT department. React + TypeScript on the front, OpenRouter calls on the back.
            </p>
            <ul className="flex flex-col gap-3 text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> OCR pipeline on top of Qwen3-VL to pull fields out of forms the previous OCR couldn&apos;t read.
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" /> Small internal tools the IT team uses day to day for routing and classifying scanned docs.
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
