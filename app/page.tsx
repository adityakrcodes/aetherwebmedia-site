"use client";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Process from "./components/Process";
import Showcase from "./components/Showcase";
import AboutSection from "./components/AboutSection";
import ProcessSection from "./components/ProcessSection";
import ServicesSection from "./components/ServicesSection";
import WhyWorkWithUs from "./components/WhyWorkWithUs";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="relative scroll-smooth">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyWorkWithUs />
        <Process />
        <Testimonials />
        <Showcase />
        <AboutSection />
        <ProcessSection />
      </main>
      <Footer />
    </div>
  );
}
