"use client";

import { Reveal } from "../ui/Reveal";

export const WritingSection = () => {
  return (
    <section id="writing" className="py-20 md:py-32 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-[#FCF7F2]">Writing</h2>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
              Coming Soon
            </span>
          </div>
          <p className="text-base text-zinc-500 dark:text-zinc-400 mb-12 max-w-xl">
            Articles on fintech engineering, system design, and building for East African markets.
          </p>
        </Reveal>

        {/* Placeholder cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { tag: "Fintech", title: "Building reliable payments API integrations at scale" },
            { tag: "Engineering", title: "System design for offline-first mobile apps" },
            { tag: "Frontend", title: "Performance patterns in Next.js for low-bandwidth users" },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="border-t border-dashed border-zinc-300 pt-6 dark:border-zinc-700 opacity-60 select-none">
                <span className="text-xs font-bold uppercase tracking-wider text-primary mb-3 block">
                  {item.tag}
                </span>
                <p className="text-base font-semibold text-slate-900 dark:text-[#FCF7F2] leading-snug mb-4">
                  {item.title}
                </p>
                <div className="h-px w-16 bg-zinc-300 dark:bg-zinc-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
