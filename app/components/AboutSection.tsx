import Image from "next/image";
import Nikhil from "@/public/profile/nikhil.jpeg";
import Aditya from "@/public/profile/aditya.jpg"

export default function AboutSection() {
  return (
    <section className="relative">
      {/* ADITYA */}
      <div className="w-10/12 md:px-12 mr-auto ml-auto pt-12 pr-8 pb-2 pl-8">
        <div className="flex flex-col gap-12 md:flex-row items-start">
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
          </div>
        </div>
        <div className="mt-10 h-px bg-white/10"></div>
      </div>
      {/* NIKHIL */}
      <div className="w-10/12 md:px-12 mr-auto ml-auto pt-12 pr-8 pb-32 pl-8">
        <div className="flex flex-col gap-12 md:flex-row items-start">
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
          </div>
        </div>
        <div className="mt-10 h-px bg-white/10"></div>
      </div>
    </section>
  );
}


