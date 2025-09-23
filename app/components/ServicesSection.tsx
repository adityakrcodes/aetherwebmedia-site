"use client";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";
import Image from "next/image";

export default function ServicesSection() {
  return (
    <section id="services" className="relative">
        <motion.div className="relative mx-4 my-10 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
            <LayoutTextFlip
            text="We do"
            words={["Web Development", "App Development", "SaaS MVP Development" , "Designing", "Branding", "SEO", "Marketing", "Run Ad Campaigns"]}
            />
        </motion.div>
        <div>
            
        </div>
    </section>
  );
}


