"use client";

import { useState, useEffect } from "react";
import GooeyNav from "@/components/GooeyNav";
import StaggeredMenu from "@/components/StaggeredMenu";
import logo1 from "@/app/favicon.ico";
;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  useEffect(() => {
    // Reset icon state on route changes or mount
    setIsOpen(false);
  }, []);

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-neutral-950/80 border-b border-white/10 hidden md:block">
      <div className="max-w-8xl md:px-12 mr-auto ml-auto pr-8 pl-8">
        <div className="flex pt-6 pb-6 items-center justify-between">
          <a href="#" className="hidden md:flex items-center gap-4">
            <svg width="42" height="42" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.2932 11.9774C16.1759 9.03514 18.1298 4.66446 18.1298 4.66446C15.4936 4.64047 12.9105 5.40303 10.718 6.82939L10.7286 6.83318C9.57413 9.97876 9.03203 12.5087 9.30055 16.1502C9.57132 19.8221 12.8069 24.2667 12.8069 24.2667L12.8151 24.289C13.2392 24.0337 13.6347 23.7625 13.9746 23.4789C16.0131 21.7779 18.0004 18.0004 18.0004 18.0004C18.0004 18.0004 16.3906 14.4202 16.2932 11.9774Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M16.4666 9.98601C16.4666 9.98601 21.596 9.33699 26 11.3334C28.1175 12.2933 29.7798 13.6204 30.9149 14.7107L30.92 14.7029C31.6572 17.5844 31.4396 20.7292 30.0845 23.6352C30.0845 23.6352 27.7107 19.586 25.1694 18.401C22.6281 17.2159 18.0004 18.0004 18.0004 18.0004C18.0004 18.0004 16.3905 14.4202 16.2932 11.9773C16.2684 11.3573 16.3357 10.6738 16.4573 9.98113L16.4666 9.98601Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M13.9746 23.4789C11.8918 25.2168 7.71515 26.4899 7.71515 26.4899C8.93912 27.9749 10.5052 29.217 12.3655 30.0844C12.8609 30.3154 13.3632 30.5134 13.8699 30.6791C14.0151 30.6328 14.1603 30.5864 14.3053 30.5399C15.133 30.2741 15.9575 30.0014 16.7635 29.6829C18.3761 29.046 19.9175 28.2253 21.2715 26.9077C22.5979 25.6171 23.8898 23.6366 24.8487 21.9828C25.3286 21.1552 25.7258 20.4079 26.0032 19.8676C26.1418 19.5974 26.2505 19.3789 26.3246 19.2279L26.3599 19.1556C25.9732 18.8502 25.5735 18.5894 25.1695 18.401C22.6281 17.2159 18.0004 18.0003 18.0004 18.0003C18.0004 18.0003 16.0131 21.7778 13.9746 23.4789Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M18.1298 4.66446C18.1298 4.66446 16.1759 9.03514 16.2932 11.9774C16.3906 14.4202 18.0004 18.0004 18.0004 18.0004C18.0004 18.0004 16.0131 21.7779 13.9746 23.4789C11.8918 25.2168 7.7151 26.49 7.7151 26.49C4.54807 22.6477 3.67169 17.1791 5.91629 12.3655C8.19652 7.47555 13.0649 4.61836 18.1298 4.66446Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M18.0004 18.0004C18.0004 18.0004 16.3905 14.4202 16.2932 11.9773C16.1759 9.03508 18.1298 4.6644 18.1298 4.6644C19.9775 4.68122 21.8514 5.08435 23.6353 5.91619C30.3092 9.02827 33.1966 16.9613 30.0845 23.6352C30.0845 23.6352 27.7107 19.586 25.1694 18.401C22.6281 17.2159 18.0004 18.0004 18.0004 18.0004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M7.71515 26.4899C7.71515 26.4899 11.8918 25.2168 13.9746 23.4789C16.0131 21.7778 18.0004 18.0003 18.0004 18.0003C18.0004 18.0003 22.6281 17.2159 25.1695 18.401C27.7108 19.586 30.0845 23.6352 30.0845 23.6352C26.9725 30.3091 19.0394 33.1965 12.3655 30.0844C10.5052 29.217 8.93912 27.9749 7.71515 26.4899Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="text-xl font-medium text-white tracking-tight">Novalume</span>
          </a>

          <div className="hidden md:flex">
            <GooeyNav
              items={[
                { label: "Services", href: "#services" },
                { label: "Work", href: "#work" },
                { label: "Insights", href: "#insights" },
                { label: "Contact", href: "#contact" },
              ]}
            />
          </div>
        </div>

      </div>
    </header>
        <div className="md:hidden w-full h-screen px-15 absolute">
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
            logoUrl={logo1.src}
            accentColor="#ff6b6b"
            className="fixed inset-0 z-[60]"
            onMenuOpen={() => console.log('Menu opened')}
            onMenuClose={() => console.log('Menu closed')}
          />
        </div>
    </>
  );
}


