import Image from "next/image";

export default function ServicesSection() {
  const tags = [
    "Product Design",
    "Brand Identity Design",
    "Branding",
    "Packaging Design",
    "Mockup Design",
  ];

  const extras = [
    "Copy Updates",
    "Brand Migration",
    "Slide Decks",
    "Brand Graphics",
    "Social Media",
    "Icons",
    "Brand Integrations",
    "Optimization",
    "Landing Pages",
  ];

  return (
    <section id="services" className="relative">
      <div className="max-w-8xl md:px-12 mr-auto ml-auto pt-12 pr-8 pb-32 pl-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="text-sm md:text-base text-neutral-200 font-sans">Design services</span>
            </div>
            <h2 className="mt-6 md:text-7xl text-5xl font-light text-white tracking-tight font-manrope">Services</h2>
            <p className="mt-4 text-base md:text-lg text-neutral-300 font-sans">
              Helping teams stand out with refined identity, product visuals, and content updates that captivate and convert.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-xs md:text-sm text-neutral-200 font-sans">{t}</span>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="group relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10 block px-5 py-2.5 rounded-xl bg-gray-950 text-sm">
                  <div className="relative z-10 flex items-center space-x-2">
                    <span className="transition-all duration-500 group-hover:translate-x-0.5">Book a Free Call</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
                  </div>
                </span>
              </a>
              <a href="#work" className="inline-flex items-center gap-2 ring-1 ring-white/15 hover:bg-white/10 transition text-sm font-medium text-white bg-white/5 rounded-xl px-5 py-2.5 backdrop-blur">
                See Projects
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
              </a>
            </div>
          </div>
          <div className="ring-1 ring-white/10 overflow-hidden bg-neutral-900/50 rounded-xl">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <Image src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/4e62d3a0-57fa-4882-a644-34db751f6e28_1600w.jpg" alt="Minimal product bottles still life" width={1800} height={1125} className="h-full w-full object-cover grayscale" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {[
            { title: "Brand Identity", icon: "sparkles", copy: "Crafting unique, memorable identities that resonate — from names and logos to flexible systems that scale across every touchpoint." },
            { title: "Brand Design", icon: "shapes", copy: "Visual systems and guidelines that keep your brand consistent — typography, colors, components, and motion rules." },
            { title: "Package Design", icon: "package", copy: "Shelf‑ready packaging that looks premium and prints perfectly — dielines, variants, and compliance handled." },
            { title: "Mockup Design", icon: "image", copy: "High‑fidelity mockups for products and campaigns — perfect for pitches, listings, and launch pages." },
          ].map((c) => (
            <div key={c.title} className="relative overflow-hidden rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 p-5 md:p-6">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 ring-1 ring-white/10 items-center justify-center bg-[#ffffff]/5 rounded-full">
                  <span className="block h-4 w-4 bg-white/40 rounded-sm" />
                </span>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl text-white tracking-tight font-sans font-medium">{c.title}</h3>
                  <p className="mt-1.5 text-sm md:text-base text-neutral-300 font-sans">{c.copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {extras.map((x) => (
            <span key={x} className="inline-flex items-center gap-1 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-xs md:text-sm text-neutral-200 font-sans">{x}</span>
          ))}
        </div>
      </div>
    </section>
  );
}


