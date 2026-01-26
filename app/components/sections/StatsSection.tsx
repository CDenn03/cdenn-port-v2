"use client";

import { Reveal } from "../ui/Reveal";

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Delivered", value: "15+" },
  { label: "Client Satisfaction", value: "100%" },
  { label: "Response Time", value: "< 24hrs" }
];

export const StatsSection = () => {
  return (
    <div className="py-12 border-y transition-colors duration-300 border-zinc-200 bg-white/50 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <Reveal key={`${stat.label}-${stat.value}`} delay={stats.indexOf(stat) * 0.1}>
            <div className="flex flex-col">
              <span className="text-3xl font-bold mb-2 text-slate-900 dark:text-zinc-100">{stat.value}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{stat.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};