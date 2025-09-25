import { WobbleCard } from "@/components/ui/wobble-card";




export default function WhyWorkWithUs() {
    return (
        <section id="why-work-with-us" className="relative mt-15">
            <div className="max-w-8xl md:px-12 mr-auto ml-auto pt-12 pr-8 pb-32 pl-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl tracking-tight text-white font-manrope font-medium">Why Work With Us</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mt-10">
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
                        className=""
                    >
                        <div className="max-w-xs">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Gippity AI powers the entire universe
                            </h2>
                            <p className="mt-4 text-left  text-base/6 text-neutral-200">
                                With over 100,000 mothly active bot users, Gippity AI is the most
                                popular AI platform for developers.
                            </p>
                        </div>
                        <img
                            src="/linear.webp"
                            width={500}
                            height={500}
                            alt="linear demo image"
                            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
                        />
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            No shirt, no shoes, no weapons.
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                            If someone yells “stop!”, goes limp, or taps out, the fight is over.
                        </p>
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            No shirt, no shoes, no weapons.
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                            If someone yells “stop!”, goes limp, or taps out, the fight is over.
                        </p>
                    </WobbleCard>
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
                        className=""
                    >
                        <div className="max-w-xs">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Gippity AI powers the entire universe
                            </h2>
                            <p className="mt-4 text-left  text-base/6 text-neutral-200">
                                With over 100,000 mothly active bot users, Gippity AI is the most
                                popular AI platform for developers.
                            </p>
                        </div>
                        <img
                            src="/linear.webp"
                            width={500}
                            height={500}
                            alt="linear demo image"
                            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
                        />
                    </WobbleCard>
                    
                </div>
            </div>
        </section>
    );
}
