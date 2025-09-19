import Image from "next/image";

export default function ProcessSection() {
  const steps = [
    {
      title: "Define Your Vision",
      copy:
        "Find the perfect plan tailored to your needs—balancing features, flexibility, and value—so we can align on goals effortlessly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-200"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
      ),
    },
    {
      title: "Submit Your Request",
      copy:
        "Send your requirements via our private portal. We clarify scope, share direction, and translate your vision into precise, actionable work.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-200"><line x1="4" x2="4" y1="21" y2="14"></line><line x1="4" x2="4" y1="10" y2="3"></line><line x1="12" x2="12" y1="21" y2="12"></line><line x1="12" x2="12" y1="8" y2="3"></line><line x1="20" x2="20" y1="21" y2="16"></line><line x1="20" x2="20" y1="12" y2="3"></line><line x1="2" x2="6" y1="14" y2="14"></line><line x1="10" x2="14" y1="8" y2="8"></line><line x1="18" x2="22" y1="16" y2="16"></line></svg>
      ),
    },
    {
      title: "Project Delivered",
      copy:
        "Receive polished deliverables in 2–3 days. With an eye for detail and quality, we bring your brand to life—on time and beyond expectations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-200"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
      ),
    },
  ];

  return (
    <section className="relative">
      <div className="max-w-8xl md:px-12 mr-auto ml-auto pr-8 pb-32 pl-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 bg-neutral-900/50 rounded-2xl items-start p-8 md:p-12">
          <div className="aspect-[4/5] w-full overflow-hidden ring-1 ring-white/10 bg-neutral-900/50 rounded-lg">
            <Image src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/9ab83c55-bb01-43d7-b04c-23f9c4a252e4_800w.jpg" alt="Design process sketching on paper" width={1400} height={1750} className="h-full w-full object-cover grayscale" loading="lazy" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="text-sm md:text-base text-neutral-200 font-sans">Design process</span>
            </div>
            <h2 className="mt-6 md:text-7xl text-5xl font-light text-white tracking-tight font-manrope">Process</h2>
            <p className="mt-4 text-base md:text-lg text-neutral-300 font-sans">
              Crafting bold visuals that inspire and elevate brands through a thoughtful, streamlined process.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="group relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10 block px-5 py-2.5 rounded-xl bg-gray-950 text-sm">
                  <div className="relative z-10 flex items-center space-x-2">
                    <span className="transition-all duration-500 group-hover:translate-x-0.5">Book a Free Call</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
                  </div>
                </span>
              </a>
              <a href="#work" className="inline-flex items-center gap-2 ring-1 ring-white/15 hover:bg-white/10 transition text-sm font-medium text-white bg-white/5 rounded-xl px-5 py-2.5 backdrop-blur">
                See Projects
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
              </a>
            </div>
            <div className="mt-6 space-y-4">
              {steps.map((s, i) => (
                <div key={s.title} className="relative overflow-hidden ring-1 ring-white/10 md:p-6 bg-neutral-900/60 rounded-2xl pt-5 pr-5 pb-5 pl-5">
                  <span className="absolute right-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-neutral-300 text-xs ring-1 ring-white/10">{i + 1}</span>
                  <div className="flex gap-4 items-start">
                    <div className="inline-flex h-9 w-20 ring-1 ring-white/10 bg-[#ffffff]/5 rounded-full items-center justify-center">
                      {s.icon}
                    </div>
                    <div>
                      <h3 className="md:text-xl text-lg font-medium text-white tracking-tight">{s.title}</h3>
                      <p className="mt-1.5 text-sm md:text-base text-neutral-300 font-sans">{s.copy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


