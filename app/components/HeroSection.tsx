"use client"
import Beams from '@/components/Beams';
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from 'react';
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export default function HeroSection() {
    useEffect(() => {
        (async function () {
          const cal = await getCalApi({"namespace":"schedule-a-free-call"});
          cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        })();
      }, [])
    return (
        <section className="relative pt-24 h-screen z-0">
            <div className="w-full h-full absolute top-0 left-0 pointer-events-none z-0">

                <Beams
                    beamWidth={2.5}
                    beamHeight={20}
                    beamNumber={4}
                    lightColor="#ffffff"
                    speed={5.5}
                    noiseIntensity={0.8}
                    scale={0.1}
                    rotation={145}
                />

            </div>
            <div className="flex items-center h-full relative z-20">
                <div className="max-w-7xl md:px-8 md:pt-24 md:pb-28 mr-auto ml-auto pt-10 pr-6 pb-10 pl-6">
                    <div className="mx-auto mb-6 flex w-full items-center justify-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
                            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                            <span className="text-sm font-normal text-neutral-200 font-sans">Crafting Distinctive Digital Identities</span>
                        </div>
                    </div>

                    <div className="max-w-7xl text-center mr-auto ml-auto space-y-10">
                        <h1 className="md:text-8xl lg:text-9xl leading-[1.1] text-4xl font-light text-white tracking-tight font-poppins text-shadow-black text-shadow-md">
                            Turning Concepts <br /> into Digital Airspace
                        </h1>
                        <p className="md:text-xl text-lg text-neutral-100 mt-6 text-shadow-black text-shadow-md hidden">
                            To empower businesses of every scale with reliable, innovative, and scalable digital solutions delivered with speed, built on trust, and designed for growth.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row mt-8 items-center justify-center">
                            <button data-cal-namespace="schedule-a-free-call" data-cal-link="aetherwebmedia/schedule-a-free-call" data-cal-config='{"layout":"month_view"}' className="group relative inline-block p-px font-semibold leading-6  shadow-2xl cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 dark">
                                
                                    <div className="relative z-10 flex items-center space-x-2">
                                        <InteractiveHoverButton>Book a Call</InteractiveHoverButton>
                                        
                                    </div>
                                
                            </button>
                            <a href="#work" className="inline-flex items-center gap-2 ring-1 ring-white/15 hover:bg-white/10 transition text-sm font-medium text-white bg-white/5 rounded-xl pt-3 pr-5 pb-3 pl-5 backdrop-blur-lg">
                                Explore Our Services
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


