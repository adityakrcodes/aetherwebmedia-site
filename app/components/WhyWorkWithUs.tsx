import { WobbleCard } from "@/components/ui/wobble-card";
import Image from "next/image";
import Link from "next/link";
import swirlBg from "@/public/jpg/swirl-1.jpg"
import InfiniteScroll from "@/components/InfiniteScroll";
import apex from "@/public/png/works/apex.png"
import abnb from "@/public/png/works/abnb.png"
import imperial from "@/public/png/works/imperial.png"
import maestro from "@/public/png/works/maestro.png"

export default function WhyWorkWithUs() {
    const items = [
        { content: <div><Image src={apex} alt="apex" width={350}/></div> },
        { content: <div><Image src={abnb} alt="abnb" width={350}/></div> },
        { content: <div><Image src={imperial} alt="imperial" width={350}/></div> },
        { content: <div><Image src={maestro} alt="maestro" width={350}/></div> },
      ];
    return (
        <section id="why-work-with-us" className="relative mt-45">
            <div className="max-w-11/12 md:max-w-8/12 mr-auto ml-auto pt-12 pb-32">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl tracking-tight text-white font-manrope font-medium">Why Work With Us</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mt-10">
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 h-full bg-neutral-950 min-h-[350px] lg:min-h-[300px]"
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
                        <Image
                            src={swirlBg}
                            width={500}
                            height={200}
                            alt="abstract image"
                            className="absolute  max-h-7/12 md:max-h-full object-cover -right-4 lg:-right-[20%] grayscale filter -bottom-11 rounded-2xl bg-black"
                        />
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 min-h-[200px] bg-[oklch(0.18_0_0)]">
                        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Custom-Built <br className="hidden md:block" />Solutions
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                        No one-size-fits-all. Every project is tailored to your brand and goals.
                        </p>
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 min-h-[200px] bg-[oklch(0.18_0_0)]">
                        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            End-to-End <br className="hidden md:block" />Partnership
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                            We don't just build; we collaborate, optimize, and grow with you.
                        </p>
                    </WobbleCard>
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 h-full bg-neutral-950 min-h-[300px] lg:min-h-[300px]"
                        className=""
                    >
                        <div className="max-w-xs">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Proven Results
                            </h2>
                            <p className="mt-4 text-left  text-base/6 text-neutral-200">
                                Projects that don't just look good,<br /> but also deliver measurable growth.
                            </p>
                        </div>
                        <div className="md:hidden relative w-full max-h-[20rem] md:max-h-[20rem] rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center overflow-hidden mt-2">
                            {/* Top blur overlay */}
                            <div className="pointer-events-none absolute top-0 left-0 w-full h-10 z-10 bg-gradient-to-b from-black/60 via-black/10 to-transparent blur-md" />
                            {/* Bottom blur overlay */}
                            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent blur-md" />
                            <InfiniteScroll
                                width="100%"
                                items={items}
                                isTilted={true}
                                tiltDirection='center'
                                autoplay={true}
                                autoplaySpeed={0.2}
                                autoplayDirection="up"
                                pauseOnHover={true}
                                itemMinHeight={100}
                                negativeMargin="0.5rem"
                            />
                        </div>
                        <div className="hidden md:block absolute top-0 right-20 h-full max-h-[20rem] md:max-h-[20rem] rounded-2xl">
                            <InfiniteScroll
                                width="100%"
                                items={items}
                                isTilted={true}
                                tiltDirection='right'
                                autoplay={true}
                                autoplaySpeed={0.3}
                                autoplayDirection="up"
                                pauseOnHover={true}
                                itemMinHeight={100}
                                negativeMargin="0.5rem"
                            />
                        </div>
                    </WobbleCard>
                    
                </div>
            </div>
        </section>
    );
}
