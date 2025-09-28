"use client";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react"; 

export default function ServicesSection() {
    const Skeleton = () => (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 "></div>
    );
    const saas = [
        {
          title: "SaaS MVP Development",
          description: "We help startups launch quickly with lean, functional MVPs that validate ideas fast, attract users, and set the foundation for scalable SaaS products.",
          header: <Skeleton />,
          url: "/services/saas",
        },
    ]
    const items = [
        {
          title: "Web Development",
          description: "Websites that work harder, load faster, and scale smarter.",
          header: <Skeleton />,
          url: "/services/web",
        },
        {
          title: "App Development",
          description: "Our team builds intuitive, fast, and user-friendly mobile apps that deliver seamless experiences across devices, turning your idea into a tool people love to use.",
          header: <Skeleton />,
          url: "/services/app",
        },
    ]
    const items2 = [
        {
          title: "Designing",
          description:
            "Creative, impactful designs that elevate your brand's identity.",
          header: <Skeleton />,
          url: "/services/design",
        },
        {
          title: "Branding and Marketing",
          description: "We shape brands that connect, engage, and grow.",
          header: <Skeleton />,
          url: "/services/branding",
        },
        {
          title: "Ad Campaigns",
          description: "Targeted campaigns that drive measurable results and ROI.",
          header: <Skeleton />,
          url: "/services/ad",
        },
      ];
    return (
        <section id="services" className="relative">
            <motion.div className="relative mx-4 my-10 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
                <LayoutTextFlip
                text="We do"
                words={["Web Development", "App Development", "SaaS MVP Development" , "Designing", "Branding", "SEO", "Marketing", "Run Ad Campaigns"]}
                />
            </motion.div>
            <div className="my-5 p-2 md:p-0">
                <BentoGrid className="max-w-11/12 md:max-w-8/12 mx-auto mt-2">
                    {saas.map((item, i) => (
                        <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={i === 0 || i === 5 ? "md:col-span-3" : ""}
                        url={item.url}
                        />
                    ))}
                </BentoGrid>
                <BentoGrid className="max-w-11/12 md:max-w-8/12 mx-auto mt-2">
                    {items.map((item, i) => (
                        <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={i === 1 || i === 4 ? "md:col-span-2" : ""}
                        url={item.url}
                        />
                    ))}
                </BentoGrid>
                <BentoGrid className="max-w-11/12 md:max-w-8/12 mx-auto mt-2">
                    {items2.map((item, i) => (
                        <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={i === 3 || i === 5 ? "md:col-span-3" : ""}
                        url={item.url}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}


