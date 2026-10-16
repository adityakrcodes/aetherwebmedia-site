import Image from "next/image";
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandX, IconMail } from "@tabler/icons-react";

const people = [
  {
    name: "Aditya Kumar",
    role: "Founder, engineering",
    bio: "Five years turning bold ideas into scalable SaaS products. Leads architecture and builds the hard parts.",
    img: "/images/team/aditya.webp",
    links: [
      { Icon: IconBrandGithub, href: "https://github.com/adityakrcodes", label: "GitHub" },
      { Icon: IconBrandLinkedin, href: "https://linkedin.com/in/adityakrcodes", label: "LinkedIn" },
      { Icon: IconBrandX, href: "https://x.com/adityakrcodes", label: "X" },
      { Icon: IconBrandInstagram, href: "https://instagram.com/adityakrcodes", label: "Instagram" },
      { Icon: IconMail, href: "mailto:aditya@aetherwebmedia.com", label: "Email" },
    ],
  },
  {
    name: "Nikhil Kumar",
    role: "Co-founder, product and web",
    bio: "Builds clean, responsive web applications and loves taking an idea from sketch to something real online.",
    img: "/images/team/nikhil.webp",
    links: [
      { Icon: IconBrandGithub, href: "https://github.com/nikhilcodes0", label: "GitHub" },
      { Icon: IconBrandLinkedin, href: "https://www.linkedin.com/in/nikhil-kumar-408758202/", label: "LinkedIn" },
      { Icon: IconBrandX, href: "https://x.com/nikhil__codes", label: "X" },
      { Icon: IconBrandInstagram, href: "https://www.instagram.com/_._h4wk_._/", label: "Instagram" },
      { Icon: IconMail, href: "mailto:nikhil@aetherwebmedia.com", label: "Email" },
    ],
  },
];

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-heading" className="container-x pb-28 md:pb-40">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2
            id="team-heading"
            data-reveal
            className="text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em] lg:sticky lg:top-28"
          >
            Built by the people <span className="text-ink-3">you talk to.</span>
          </h2>
        </div>
        <ul className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
          {people.map((p, i) => (
            <li key={p.name} data-reveal style={{ "--d": i } as React.CSSProperties} className={i === 1 ? "sm:mt-24" : ""}>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-card bg-paper-2">
                <Image
                  src={p.img}
                  alt={`Portrait of ${p.name}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="object-cover grayscale transition-[filter,transform] duration-700 ease-expo group-hover:scale-[1.03] group-hover:grayscale-0"
                  style={i === 1 ? { objectPosition: "center 20%" } : undefined}
                />
              </div>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-2">{p.role}</p>
              <p className="mt-4 max-w-sm leading-relaxed text-ink-2">{p.bio}</p>
              <ul className="mt-5 flex gap-2">
                {p.links.map(({ Icon, href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={`${p.name} on ${label}`}
                      className="grid size-10 place-items-center rounded-full ring-1 ring-line transition-colors hover:bg-ink hover:text-paper"
                    >
                      <Icon size={18} stroke={1.5} />
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
