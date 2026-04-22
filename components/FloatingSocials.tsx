import { Github, Linkedin, FileText } from 'lucide-react';

export default function FloatingSocials() {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[250] flex flex-col gap-4">
      <a 
        href="/Santiago_Irigoyen_CV.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-white backdrop-blur-md border border-neutral-200 flex items-center justify-center text-black hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 group"
        title="Download CV"
      >
        <FileText className="w-5 h-5" />
      </a>
      <a 
        href="https://github.com/IrigoyenCodes/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-400 shadow-lg hover:-translate-y-1 transition-all duration-300 group"
      >
        <Github className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
      </a>
      <a 
        href="https://www.linkedin.com/in/santiagoirigoyenv/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-blue-600/80 backdrop-blur-md border border-blue-500 flex items-center justify-center text-white hover:bg-blue-500 hover:border-blue-400 shadow-lg hover:-translate-y-1 transition-all duration-300 group"
      >
        <Linkedin className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
      </a>
    </div>
  );
}
