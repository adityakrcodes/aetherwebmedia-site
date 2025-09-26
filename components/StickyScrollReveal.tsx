"use client";

import React from "react";

type Item = {
  title: string;
  description: string;
  content: React.ReactNode;
};

export default function StickyScrollReveal({
  content,
  contentClassName = "",
}: {
  content: Item[];
  contentClassName?: string;
}) {
  return (
    <div className="relative">
      {content.map((item, idx) => (
        <section key={idx} className="relative py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto px-6 md:px-10">
            <div>
              <div className="text-xs text-neutral-400">{String(idx + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 text-2xl md:text-3xl text-white font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-neutral-300 max-w-prose">{item.description}</p>
            </div>
            <div className="md:sticky md:top-28">
              <div className={"rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 p-6 " + contentClassName}>
                {item.content}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}


