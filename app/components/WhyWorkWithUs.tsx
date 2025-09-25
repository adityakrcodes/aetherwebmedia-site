import { WobbleCard } from "@/components/ui/wobble-card";




export default function WhyWorkWithUs() {
    return (
        <section id="why-work-with-us" className="relative mt-45">
            <div className="max-w-8/12 mr-auto ml-auto pt-12 pb-32">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl tracking-tight text-white font-manrope font-medium">Why Work With Us</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mt-10">
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 h-full bg-neutral-950 min-h-[500px] lg:min-h-[300px]"
                        className=""
                    >
                        <div className="max-w-xs">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            Multi-Disciplinary Expertise
                            </h2>
                            <p className="mt-4 text-left  text-base/6 text-neutral-200">
                            From design to development, marketing to strategy, we cover it all.
                            </p>
                        </div>
                        <img
                            src="/linear.webp"
                            width={600}
                            height={300}
                            alt="linear demo image"
                            className="absolute -right-4 lg:-right-[20%] grayscale filter -bottom-10 object-contain rounded-2xl bg-black"
                        />
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-[oklch(0.18_0_0)]">
                        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Custom-Built Solutions
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                        No one-size-fits-all. Every project is tailored to your brand and goals.
                        </p>
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-[oklch(0.18_0_0)]">
                        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Proven Results
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                        Projects that don’t just look good, but also deliver measurable growth.
                        </p>
                    </WobbleCard>
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 h-full bg-neutral-950 min-h-[500px] lg:min-h-[300px]"
                        className=""
                    >
                        <div className="max-w-xs">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            End-to-End Partnership
                            </h2>
                            <p className="mt-4 text-left  text-base/6 text-neutral-200">
                            We don’t just build; we collaborate, optimize, and grow with you.
                            </p>
                        </div>
                        <img
                            src="/linear.webp"
                            width={1500}
                            height={500}
                            alt="linear demo image"
                            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl bg-black"
                        />
                    </WobbleCard>
                    
                </div>
            </div>
        </section>
    );
}
