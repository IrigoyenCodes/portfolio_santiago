export default function Footer() {
  return (
    <footer className="border-t border-neutral-800/80 mt-24 py-12 px-6 sm:px-12 bg-[#0a0a0a]">
      <div className="max-w-[85rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center font-display font-bold text-black text-xs">S</div>
          <span className="text-xl font-display font-medium text-white tracking-tight">Santiago Irigoyen</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm font-medium text-neutral-400">
          <a href="#" className="hover:text-white transition-colors">Services</a>
          <a href="#" className="hover:text-white transition-colors">References</a>
          <a href="#" className="hover:text-white transition-colors">Career</a>
          <a href="#" className="hover:text-white transition-colors">Imprint</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
        
        <div className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Santiago Irigoyen.
        </div>
      </div>
    </footer>
  );
}
