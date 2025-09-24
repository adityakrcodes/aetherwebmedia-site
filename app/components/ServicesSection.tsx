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
          title: "SaaS m",
          description: "Explore the birth of groundbreaking ideas and inventions.",
          header: <Skeleton />,
          icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        },
    ]
    const items = [
        {
          title: "The Digital Revolution",
          description: "Dive into the transformative power of technology.",
          header: <Skeleton />,
          icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
        },
        {
          title: "The Art of Design",
          description: "Discover the beauty of thoughtful and functional design.",
          header: <Skeleton />,
          icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
        },
    ]
    const items2 = [
        {
          title: "The Power of Communication",
          description:
            "Understand the impact of effective communication in our lives.",
          header: <Skeleton />,
          icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
        },
        {
          title: "The Pursuit of Knowledge",
          description: "Join the quest for understanding and enlightenment.",
          header: <Skeleton />,
          icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
        },
        {
          title: "The Joy of Creation",
          description: "Experience the thrill of bringing ideas to life.",
          header: <Skeleton />,
          icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
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
                <BentoGrid className="max-w-4xl mx-auto mt-2">
                    {saas.map((item, i) => (
                        <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 0 || i === 5 ? "md:col-span-3" : ""}
                        />
                    ))}
                </BentoGrid>
                <BentoGrid className="max-w-4xl mx-auto mt-2">
                    {items.map((item, i) => (
                        <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 1 || i === 4 ? "md:col-span-2" : ""}
                        />
                    ))}
                </BentoGrid>
                <BentoGrid className="max-w-4xl mx-auto mt-2">
                    {items2.map((item, i) => (
                        <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 3 || i === 5 ? "md:col-span-3" : ""}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}


