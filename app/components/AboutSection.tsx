import Image from "next/image";
import Nikhil from "@/public/profile/nikhil.jpeg";
import Aditya from "@/public/profile/aditya.jpg"

export default function AboutSection() {
  return (
    <section className="relative mt-32">
      {/* ADITYA */}
      <div className="w-10/12 md:px-12 mr-auto ml-auto pt-12 pr-8 pb-2 pl-8">
        <div className="flex flex-col gap-12 md:flex-row items-center">
          <div className="ring-1 ring-white/10 overflow-hidden bg-neutral-900/50 rounded-lg md:w-1/2 w-full">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image src={Aditya} alt="Professional portrait" width={1400} height={1050} className="h-full w-full object-cover grayscale-75 hover:grayscale-0 transition-all duration-300" loading="lazy" />
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="md:text-7xl text-5xl font-light text-white tracking-tight font-manrope">Meet Aditya</h2>
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
            <div>
            {/* Socials */}
                <div className="mt-6 flex gap-4">
                <a
                    href="https://github.com/aditya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="GitHub"
                >
                    {/* @ts-ignore */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 21.13V24"></path></svg>
                </a>
                <a
                    href="https://linkedin.com/in/aditya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="LinkedIn"
                >
                    {/* @ts-ignore */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><line x1="8" x2="8" y1="11" y2="16"/><line x1="8" x2="8" y1="8" y2="8"/><path d="M12 16v-3a2 2 0 0 1 4 0v3"/></svg>
                </a>
                <a
                    href="https://instagram.com/aditya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="Instagram"
                >
                    {/* @ts-ignore */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a
                    href="https://x.com/aditya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="X"
                >
                    {/* @ts-ignore */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4z"/><path d="m9 9 6 6m0-6-6 6"/></svg>
                </a>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-10 h-px bg-white/10"></div>
      </div>
      {/* NIKHIL */}
      <div className="w-10/12 md:px-12 mr-auto ml-auto pt-12 pr-8 pb-32 pl-8">
        <div className="flex flex-col gap-12 md:flex-row items-center">
          <div className="ring-1 ring-white/10 overflow-hidden bg-neutral-900/50 rounded-lg md:w-1/2 w-full">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image src={Nikhil} alt="Professional portrait" width={1400} height={1050} className="h-full w-full object-cover grayscale-75 hover:grayscale-0 transition-all duration-300" loading="lazy" />
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="md:text-7xl text-5xl font-light text-white tracking-tight font-manrope">Meet Nikhil</h2>
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
            <div>
            {/* Socials */}
                <div className="mt-6 flex gap-4">
                <a
                    href="https://github.com/aditya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="GitHub"
                >
                    {/* @ts-ignore */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 21.13V24"></path></svg>
                </a>
                <a
                    href="https://linkedin.com/in/aditya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="LinkedIn"
                >
                    {/* @ts-ignore */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><line x1="8" x2="8" y1="11" y2="16"/><line x1="8" x2="8" y1="8" y2="8"/><path d="M12 16v-3a2 2 0 0 1 4 0v3"/></svg>
                </a>
                <a
                    href="https://instagram.com/aditya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="Instagram"
                >
                    {/* @ts-ignore */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a
                    href="https://x.com/aditya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="X"
                >
                    {/* @ts-ignore */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4z"/><path d="m9 9 6 6m0-6-6 6"/></svg>
                </a>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-10 h-px bg-white/10"></div>
      </div>
    </section>
  );
}


