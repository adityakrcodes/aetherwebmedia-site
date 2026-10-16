import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Mark } from "@/components/brand/Mark";
import { BookCall } from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";
import { services } from "@/lib/services";

export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-4 rounded-full border border-line bg-paper pl-4 pr-1.5 shadow-[0_8px_30px_-18px_rgb(0_0_0/0.35)] sm:pl-5">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <Mark className="h-6" />
          <span className="text-[0.95rem] font-semibold tracking-[-0.02em]">{site.short}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm text-ink-2 transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <BookCall className="hidden h-11 text-sm sm:inline-flex" />
          <MobileMenu
            nav={nav.map(({ label, href }) => ({ label, href }))}
            services={services.map(({ slug, name }) => ({ href: `/services/${slug}`, label: name }))}
          />
        </div>
      </div>
    </header>
  );
}
