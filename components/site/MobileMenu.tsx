"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Item = { label: string; href: string };

export default function MobileMenu({ nav, services }: { nav: Item[]; services: Item[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-200 active:scale-95"
      >
        {open ? <IconX size={20} stroke={1.75} /> : <IconMenu2 size={20} stroke={1.75} />}
      </button>

      {/* Portalled to <body> so nothing on the header (a filter, transform or clip) can ever trap position: fixed. */}
      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            hidden={!open}
            className="fixed inset-x-3 top-[4.75rem] bottom-3 z-40 overflow-y-auto rounded-card border border-line bg-paper p-6 shadow-2xl sm:inset-x-5 sm:top-[5.75rem] lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className={cn(open && "rise")} style={{ "--d": i } as React.CSSProperties}>
                    <Link href={item.href} className="block py-1.5 text-4xl font-medium tracking-[-0.04em]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-sm text-ink-2">Services</p>
              <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 xs:grid-cols-2">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="text-[0.95rem] text-ink hover:underline">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Opens the enquiry modal (LeadDialog) and closes the menu behind it. */}
              <a
                href="#enquire"
                data-lead=""
                aria-haspopup="dialog"
                onClick={() => setOpen(false)}
                className="mt-10 flex h-14 items-center justify-center rounded-full bg-ink text-base font-medium text-paper"
              >
                Start a project
              </a>
              <a href={`mailto:${site.email}`} className="mt-4 block text-center text-sm text-ink-2">
                {site.email}
              </a>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
