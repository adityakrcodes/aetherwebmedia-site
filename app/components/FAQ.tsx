"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "We provide end‑to‑end product design and development: strategy, UI/UX, web apps, mobile apps, and AI integrations — from MVP to scale.",
  },
  {
    question: "How long does it take to develop an AI solution?",
    answer:
      "Timelines vary by scope. Rapid MVPs can ship in 2–4 weeks; production rollouts typically take 6–12 weeks with iterations.",
  },
  {
    question: "Do I need technical expertise to work with you?",
    answer:
      "No. We translate business goals into technical execution and keep you in the loop with clear, non‑technical milestones.",
  },
  {
    question: "Is my data safe when working with your agency?",
    answer:
      "Yes. We follow least‑privilege access, encrypted storage in transit and at rest, and sign NDAs on request.",
  },
  {
    question: "Can AI really help my business grow?",
    answer:
      "Absolutely. We prioritize measurable ROI — automation, personalization, and insights to improve conversion and reduce costs.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 rounded-b-[4rem] md:rounded-b-[9rem] border-b-[1px] border-white/10 bg-[#0a0a0a] min-h-screen"
      style={{
        boxShadow: "0 100px 200px -100px rgba(255,255,255,0.15)",
        bottom: "-10rem",
        zIndex: "1",
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-7xl tracking-tight text-white font-manrope font-medium">
            Questions? Answers!
          </h2>
          <p className="mt-4 text-neutral-400">
            Find some quick answers to the most common questions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md transition-shadow shadow-[0_10px_45px_-10px_rgba(0,0,0,0.8),0_20px_80px_-30px_rgba(255,255,255,0.12)] hover:shadow-[0_15px_60px_-10px_rgba(0,0,0,0.85),0_25px_100px_-30px_rgba(255,255,255,0.18)]"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg text-neutral-200">{item.question}</span>
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-transform ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out px-5 md:px-6 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5 md:pb-6 text-sm md:text-base text-neutral-400">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


