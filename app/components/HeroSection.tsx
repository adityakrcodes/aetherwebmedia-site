export default function HeroSection() {
  return (
    <section className="relative pt-24 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 h-screen">
        <div className="flex items-center h-full">
            <div className="max-w-7xl md:px-8 md:pt-24 md:pb-28 mr-auto ml-auto pt-10 pr-6 pb-10 pl-6">
                <div className="mx-auto mb-6 flex w-full items-center justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                    <span className="text-sm font-normal text-neutral-200 font-sans">Crafting Distinctive Digital Identities</span>
                </div>
                </div>

                <div className="max-w-5xl text-center mr-auto ml-auto space-y-10">
                <h1 className="md:text-8xl lg:text-9xl leading-[0.95] text-4xl font-light text-white tracking-tight font-manrope">
                    Branding that truly converts
                </h1>
                <p className="md:text-xl text-lg text-neutral-400 mt-6">
                    Elevate your presence with identity systems and product visuals. We design for clarity, momentum, and measurable outcomes.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row mt-8 items-center justify-center">
                    <a href="#contact" className="group relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    <span className="relative z-10 block bg-gray-950 rounded-xl pt-3 pr-6 pb-3 pl-6">
                        <div className="relative z-10 flex items-center space-x-2">
                        <span className="transition-all duration-500 group-hover:translate-x-1 text-sm font-medium">Get Started Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </div>
                    </span>
                    </a>
                    <a href="#work" className="inline-flex items-center gap-2 ring-1 ring-white/15 hover:bg-white/10 transition text-sm font-medium text-white bg-white/5 rounded-xl pt-3 pr-5 pb-3 pl-5 backdrop-blur-lg">
                    See Projects
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
                    </a>
                </div>
                </div>
            </div>
        </div>
    </section>
  );
}


