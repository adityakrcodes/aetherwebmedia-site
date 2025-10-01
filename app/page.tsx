"use client";

import { useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Process from "./components/Process";
import Showcase from "./components/Showcase";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import WhyWorkWithUs from "./components/WhyWorkWithUs";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";

export default function Home() {
  useEffect(() => {
    // Ensure smooth scrolling works for all anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        if (targetId) {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="relative scroll-smooth">
      <Header />
      <main
        className="relative lg:rounded-b-[9rem] rounded-b-[4rem]"
        style={{ boxShadow: "0 20px 50px -12px rgba(0,0,0,1), 0 50px 140px -40px rgba(0,0,0,1)" }}
      >
        <HeroSection />
        
          <ServicesSection />
        
        
          <WhyWorkWithUs />
        
        
          <Process />
        
       
          {/* <Testimonials /> */}
        
        
          <Pricing />
        
        
          <AboutSection />
        
        
          <FAQ />
        
      </main>
      {/* Sticky-reveal footer section for parallax-style reveal */}
      <section className="relative min-h-screen">
        <div className="sticky bottom-0">
          <Footer />
        </div>
      </section>
    </div>
  );
}
