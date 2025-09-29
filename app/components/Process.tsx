"use client";

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import Image from "next/image";
import binoculars from "@/public/png/binoculars.png"
import planning from "@/public/png/planning.png"
import development from "@/public/png/design.png"
import testing from "@/public/png/test.png"
import growth from "@/public/png/growth.png"

export default function Process() {
    return (
        <section id="process" className="relative mt-45">
            <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl tracking-tight text-white font-manrope font-medium">Our Process</h2>
                </div>
            <ScrollStack className=" max-w-[90rem] mx-auto" useWindowScroll itemDistance={80} itemScale={0.02} itemStackDistance={24} stackPosition="35%" scaleEndPosition="12%" baseScale={0.88} scaleDuration={0.45} rotationAmount={1} blurAmount={1}>

                <ScrollStackItem itemClassName="bg-neutral-950 border border-white/10 text-neutral-200 flex flex-col justify-center">

                    <h2 className="text-2xl font-semibold">Discovery & Strategy</h2>

                    <p className="mt-4 text-neutral-400">Understanding your vision, audience, and goals.</p>

                    <span className="text-9xl md:text-[15rem] absolute right-0 bottom-0  md:-right-2 md:-bottom-20 -rotate-30 text-neutral-500 z-20">
                        1
                    </span>

                    <Image src={binoculars} alt="" width={300} height={300} className="absolute -right-10 -top-15 -rotate-30 z-10 grayscale hidden md:block" />

                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-[oklch(0.18_0_0)] border border-white/10 text-neutral-200 flex flex-col justify-center">

                    <h2 className="text-2xl font-semibold">Planning & Prototyping</h2>

                    <p className="mt-4 text-neutral-400">Mapping out solutions with wireframes, roadmaps, and design mockups.</p>

                    <span className="text-9xl md:text-[15rem] absolute -right-3 -bottom-2  md:-right-2 md:-bottom-12 -rotate-30 text-neutral-500 z-20">
                        2
                    </span>

                    <Image src={planning} alt="" width={300} height={300} className="absolute -right-15 -top-23 rotate-30 z-10 grayscale hidden md:block" />

                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-neutral-950 border border-white/10 text-neutral-200 flex flex-col justify-center">

                    <h2 className="text-2xl font-semibold">Design & Development </h2>

                    <p className="mt-4 text-neutral-400">Bringing concepts to life with creativity and code.</p>

                    <span className="text-9xl md:text-[15rem] absolute -right-0 -bottom-6  md:-right-2 md:-bottom-12 -rotate-30 text-neutral-500 z-20">
                        3
                    </span>

                    <Image src={development} alt="" width={300} height={300} className="absolute -right-10 -top-15 -rotate-30 z-10 invert-25 hidden md:block" />

                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-[oklch(0.18_0_0)] border border-white/10 text-neutral-200 flex flex-col justify-center">

                    <h2 className="text-2xl font-semibold">Testing & Launch </h2>

                    <p className="mt-4 text-neutral-400">Ensuring flawless performance before going live.</p>

                    <span className="text-9xl md:text-[15rem] absolute -right-0 -bottom-2  md:-right-2 md:-bottom-12 -rotate-30 text-neutral-500 z-20">
                        4
                    </span>

                    <Image src={testing} alt="" width={200} height={200} className="absolute -right-10 -top-10 rotate-38 z-10 opacity-50 hidden md:block" />

                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-neutral-950 border border-white/10 text-neutral-200 flex flex-col justify-center">

                    <h2 className="text-2xl font-semibold">Growth & Support </h2>

                    <p className="mt-4 text-neutral-400">Continuous optimization, marketing, and scaling.</p>

                    <span className="text-9xl md:text-[15rem] absolute -right-0 -bottom-2  md:-right-2 md:-bottom-12 -rotate-30 text-neutral-500 z-20">
                        5
                    </span>

                    <Image src={growth} alt="" width={200} height={200} className="absolute -right-5 -top-15 rotate-30 z-10 opacity-50 hidden md:block" />

                </ScrollStackItem>

            </ScrollStack>
        </section>
    );
}