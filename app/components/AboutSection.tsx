import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative">
      <div className="max-w-8xl md:px-12 mr-auto ml-auto pt-12 pr-8 pb-32 pl-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-start">
          <div className="ring-1 ring-white/10 overflow-hidden bg-neutral-900/50 rounded-lg">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/b59bad79-703a-4c05-8ed2-fafcc49a7b51_800w.jpg" alt="Professional portrait" width={1400} height={1050} className="h-full w-full object-cover grayscale" loading="lazy" />
            </div>
          </div>
          <div>
            <h2 className="md:text-7xl text-5xl font-light text-white tracking-tight font-manrope">Meet Alex</h2>
            <p className="mt-6 text-base md:text-lg text-neutral-300 font-sans">
              I'm Alex, a creative Digital Product Designer and Front-end Developer based in San Francisco. I specialize in creating seamless user experiences and innovative digital solutions that bridge design and technology to drive business growth.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "UI/UX Design",
                "React Development",
                "Design Systems",
                "Prototyping",
                "Web Development",
                "TypeScript",
                "Figma",
              ].map((s) => (
                <span key={s} className="inline-flex items-center rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-xs md:text-sm text-neutral-200 font-sans">{s}</span>
              ))}
            </div>
            <div className="mt-6 h-px bg-white/10"></div>
            <div className="mt-6 space-y-4">
              {[
                ["Senior Designer", "TechFlow Inc", "Currently"],
                ["Product Designer", "PixelCraft Studio", "2022–24"],
                ["UI Designer", "StartupLab", "2020–22"],
              ].map(([role, company, time]) => (
                <div key={role as string} className="grid grid-cols-3 items-baseline">
                  <span className="text-sm md:text-base text-neutral-200 font-sans">{role}</span>
                  <span className="text-sm md:text-base text-neutral-300 font-sans">{company}</span>
                  <span className="text-right text-sm md:text-base text-neutral-400 font-sans">{time}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-neutral-300">
              <span className="font-sans">Recent Projects</span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-neutral-200"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10 h-px bg-white/10"></div>
      </div>
    </section>
  );
}


