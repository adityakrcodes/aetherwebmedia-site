import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import WhatSetsUsApart from "./components/WhatSetsUsApart";
import Showcase from "./components/Showcase";
import AboutSection from "./components/AboutSection";
import ProcessSection from "./components/ProcessSection";
import ServicesSection from "./components/ServicesSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <main>
        <HeroSection />
        <WhatSetsUsApart />
        <Showcase />
        <AboutSection />
        <ProcessSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
