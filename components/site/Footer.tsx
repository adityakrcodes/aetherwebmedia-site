import Link from "next/link";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { Mark } from "@/components/brand/Mark";

export default function Footer() {
  return (
    <footer className="container-x pb-10 pt-20 text-sm">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Mark className="h-7" />
            <span className="text-base font-semibold tracking-[-0.02em]">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-ink-2">
            Websites and software for growing businesses. Formerly {site.formerly}.
          </p>
          <a href={`mailto:${site.email}`} className="mt-6 inline-block text-ink underline-offset-4 hover:underline">
            {site.email}
          </a>
        </div>

        <nav aria-label="Services" className="md:col-span-3">
          <p className="text-ink-3">Services</p>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-ink-2 transition-colors hover:text-ink">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Studio" className="md:col-span-2">
          <p className="text-ink-3">Studio</p>
          <ul className="mt-4 space-y-2.5">
            {nav
              .filter((n) => n.label !== "Services")
              .map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-ink-2 transition-colors hover:text-ink">
                    {n.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link href="/#team" className="text-ink-2 transition-colors hover:text-ink">
                Team
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Social" className="md:col-span-3">
          <p className="text-ink-3">Follow</p>
          <ul className="mt-4 space-y-2.5">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-ink-2 transition-colors hover:text-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-ink-3 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Designed and built in-house.</p>
      </div>
    </footer>
  );
}
