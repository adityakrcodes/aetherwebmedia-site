export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-white/10">
      <div className="mx-auto max-w-8xl px-8 md:px-12 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 ring-1 ring-white/10 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid h-4 w-4 text-neutral-200"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M3 15h18"></path><path d="M9 3v18"></path><path d="M15 3v18"></path></svg>
            </span>
            <span className="text-sm font-medium tracking-tight text-white font-sans">Novalume</span>
          </div>
          <p className="text-sm text-neutral-400 font-sans">© {year} Novalume Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="text-sm text-neutral-300 hover:text-white transition font-sans">Privacy</a>
            <a href="#terms" className="text-sm text-neutral-300 hover:text-white transition font-sans">Terms</a>
            <a href="mailto:hello@novalume.studio" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/15 hover:bg-white/15 font-sans">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail h-3.5 w-3.5"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>
              hello@novalume.studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


