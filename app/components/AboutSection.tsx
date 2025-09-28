import Image from "next/image";
import Nikhil from "@/public/profile/nikhil.jpeg";
import Aditya from "@/public/profile/aditya.jpg";
import X from "@/public/svg/x-logo.svg"
import { Github, Linkedin, Instagram } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative mt-32 ">
      {/* ADITYA */}
      <div className="w-10/12 md:px-12 mr-auto ml-auto pt-12 pr-8 pb-2 pl-8 ">
        <div className="flex flex-col gap-12 md:flex-row items-center justify-center">
          <div className="ring-1 ring-white/10 overflow-hidden bg-neutral-900/50 rounded-lg md:w-1/4 w-full">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image src={Aditya} alt="Professional portrait" width={1400} height={1050} className="h-full w-full object-cover grayscale-75 hover:grayscale-0 transition-all duration-300" loading="lazy" />
            </div>
          </div>
          <div className="md:w-2/4 w-full">
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
                    href="https://github.com/adityakrcodes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="GitHub"
                >
                    <Github size={22} />
                </a>
                <a
                    href="https://linkedin.com/in/adityakrcodes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={22} />
                </a>
                <a
                    href="https://instagram.com/adityakrcodes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="Instagram"
                >
                    <Instagram size={22} />
                </a>
                <a
                    href="https://x.com/adityakrcodes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="X"
                >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="X logo"
                    >
                      <path
                        d="M17.53 3H21.5L14.88 10.39L22.68 21H16.31L11.41 14.53L5.82 21H1.84L8.85 13.08L1.32 3H7.84L12.25 8.87L17.53 3ZM16.41 19H18.23L7.68 4.89H5.73L16.41 19Z"
                        fill="white"
                      />
                    </svg>                
                </a>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-10 h-px bg-white/10"></div>
      </div>
      {/* NIKHIL */}
      <div className="w-10/12 md:px-12 mr-auto ml-auto pt-12 pr-8 pb-32 pl-8">
        <div className="flex flex-col gap-12 md:flex-row items-center justify-center">
          <div className="ring-1 ring-white/10 overflow-hidden bg-neutral-900/50 rounded-lg md:w-1/4 w-full">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image src={Nikhil} alt="Professional portrait" width={1400} height={1050} className="h-full w-full object-cover grayscale-75 hover:grayscale-0 transition-all duration-300" loading="lazy" />
            </div>
          </div>
          <div className="md:w-2/4 w-full">
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
                    href="https://github.com/nikhilcodes0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="GitHub"
                >
                    <Github size={22} />
                </a>
                <a
                    href="https://www.linkedin.com/in/nikhil-kumar-408758202/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={22} />
                </a>
                <a
                    href="https://www.instagram.com/_._h4wk_._/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="Instagram"
                >
                    <Instagram size={22} />
                </a>
                <a
                    href="https://x.com/nikhil__codes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-200 hover:bg-white/10 transition-all duration-200"
                    aria-label="X"
                >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="X logo"
                    >
                      <path
                        d="M17.53 3H21.5L14.88 10.39L22.68 21H16.31L11.41 14.53L5.82 21H1.84L8.85 13.08L1.32 3H7.84L12.25 8.87L17.53 3ZM16.41 19H18.23L7.68 4.89H5.73L16.41 19Z"
                        fill="white"
                      />
                    </svg>
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


