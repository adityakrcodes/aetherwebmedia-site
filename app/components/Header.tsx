"use client";

import { useState, useEffect } from "react";
import GooeyNav from "@/components/GooeyNav";
import StaggeredMenu from "@/components/StaggeredMenu";
import Image from "next/image";
import logo from "@/public/png/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    // { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '#services' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: 'mailto:info@aetherwebmedia.com' }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com/aetherwebmedia' },
    { label: 'Instagram', link: 'https://instagram.com/aetherwebmedia' },
    { label: 'LinkedIn', link: 'https://linkedin.com/aetherwebmedia' }
  ];

  useEffect(() => {
    // Reset icon state on route changes or mount
    setIsOpen(false);
  }, []);

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 w-[92%] md:w-[85%] lg:w-[70%] rounded-md mt-5 mx-auto backdrop-blur-lg bg-neutral-950/80  hidden md:block">
      <div className="max-w-8xl md:px-12 mr-auto ml-auto pr-6 pl-6 md:pr-8 md:pl-8">
        <div className="flex pt-5 md:pt-6 pb-5 md:pb-6 items-center justify-between">
          <a href="/" className="hidden md:flex items-center">
            <Image
                src={logo}
                alt="Logo"
                width={50}
                height={50}
                className="invert"
            />
            <div className="flex flex-col">
                <span className="ml-2 text-sm md:text-base lg:text-xl font-medium text-white tracking-tight">Aether Web Media</span>
                <span className="text-[10px] lg:text-xs ml-2">Formerly AKC Web Media</span>
            </div>
          </a>

          <div className="hidden md:flex">
            <GooeyNav
              items={[
                { label: "Services", href: "/#services" },
                { label: "Pricing", href: "#pricing" },
                { label: "Team", href: "/#team" },
                { label: "Contact", href: "mailto:info@aetherwebmedia.com" },
              ]}
            />
          </div>
        </div>

      </div>
    </header>
        <div className="md:hidden w-full h-full pointer-events-none fixed top-0 z-20 transition-all duration-300 flex items-center justify-center">
            <StaggeredMenu
                position="right"
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                displayItemNumbering={true}
                menuButtonColor="#fff"
                openMenuButtonColor="#000"
                changeMenuColorOnOpen={true}
                colors={['#B19EEF', '#5227FF']}
                logoUrl={logo.src}
                accentColor="#ff6b6b"
                className=""
                onMenuOpen={() => console.log('Menu opened')}
                onMenuClose={() => console.log('Menu closed')}
            />
        </div>
    </>
  );
}


