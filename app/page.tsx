"use client";

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

import { useScrollOptimization } from "@/hooks/useScrollOptimization";
import { useEffect } from "react";

export default function Home() {
  const { throttledScrollHandler } = useScrollOptimization({
    throttleMs: 16, // 60fps
    passive: true,
    enableSmoothScrolling: true
  });

  useEffect(() => {
    // Add scroll optimization
    const handleScroll = throttledScrollHandler(() => {
      // Optimize scroll performance
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [throttledScrollHandler]);

  return (
    <div className="relative scroll-smooth scroll-optimized">
      <Header />
      <main
        className="relative lg:rounded-b-[9rem] rounded-b-[4rem] scroll-optimized"
        style={{ boxShadow: "0 20px 50px -12px rgba(0,0,0,1), 0 50px 140px -40px rgba(0,0,0,1)" }}
      >
        <HeroSection />
        
          <ServicesSection />
        
        
          <WhyWorkWithUs />
        
        
          <Process />
        
       
          <Testimonials />
        
        
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
