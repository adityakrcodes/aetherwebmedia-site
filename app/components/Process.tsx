"use client";

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

export default function Process() {
    return (
        <section id="process" className="relative mt-45">
            <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl tracking-tight text-white font-manrope font-medium">Our Process</h2>
                </div>
            <ScrollStack className=" max-w-[90rem] mx-auto" useWindowScroll itemDistance={80} itemScale={0.02} itemStackDistance={24} stackPosition="35%" scaleEndPosition="12%" baseScale={0.88} scaleDuration={0.45} rotationAmount={1} blurAmount={1}>

                <ScrollStackItem itemClassName="bg-neutral-950 border border-white/10 text-neutral-200">

                    <h2 className="text-2xl font-semibold">Discovery & Strategy</h2>

                    <p className="mt-4 text-neutral-400">Understanding your vision, audience, and goals.</p>

                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-[oklch(0.18_0_0)] border border-white/10 text-neutral-200">

                    <h2 className="text-2xl font-semibold">Planning & Prototyping</h2>

                    <p className="mt-4 text-neutral-400">Mapping out solutions with wireframes, roadmaps, and design mockups.</p>

                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-neutral-950 border border-white/10 text-neutral-200">

                    <h2 className="text-2xl font-semibold">Design & Development </h2>

                    <p className="mt-4 text-neutral-400">Bringing concepts to life with creativity and code.</p>

                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-[oklch(0.18_0_0)] border border-white/10 text-neutral-200">

                    <h2 className="text-2xl font-semibold">Testing & Launch </h2>

                    <p className="mt-4 text-neutral-400">Ensuring flawless performance before going live.</p>

                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-neutral-950 border border-white/10 text-neutral-200">

                    <h2 className="text-2xl font-semibold">Growth & Support </h2>

                    <p className="mt-4 text-neutral-400">Continuous optimization, marketing, and scaling.</p>

                </ScrollStackItem>

            </ScrollStack>
        </section>
    );
}