"use client";

import { Reveal } from "../ui/Reveal";
import { experiences } from "@/src/app/data/portfolio";

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 md:py-32 px-6 transition-colors duration-300 bg-[#FCF7F2] dark:bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-slate-900 dark:text-[#FCF7F2]">Experience</h2>
        </Reveal>

        <div className="relative border-l ml-3 space-y-12 border-zinc-200 dark:border-[#2a2a2a]">
          {experiences.map((job, i) => (
            <Reveal key={`${job.company}-${job.role}-${job.period}`} delay={i * 0.2}>
              <div className="relative pl-8">
                <div className={`absolute -left-1.25 top-2 w-2.5 h-2.5 rounded-full ring-4 ${
                  i === 0 ? "bg-primary dark:bg-[#FCF7F2]" : "bg-zinc-400 dark:bg-[#444444]"
                } ring-[#FCF7F2] dark:ring-[#0a0a0a]`} />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-[#FCF7F2]">{job.role}</h3>
                  <span className={`text-sm font-mono font-bold ${
                    i === 0 ? "text-primary dark:text-[#FCF7F2]" : "text-zinc-500 dark:text-[#888888]"
                  }`}>{job.period}</span>
                </div>
                <h4 className="text-base mb-4 font-medium text-zinc-600 dark:text-[#888888]">{job.company}</h4>
                <ul className="space-y-2 text-sm mb-4 text-zinc-600 dark:text-[#b0b0b0]">
                  {job.desc.map((item, idx) => (
                    <li key={`${job.company}-desc-${idx}`} className="flex gap-2">• {item}</li>
                  ))}
                </ul>
                <div className="text-xs font-mono text-zinc-400 dark:text-[#666666]">{job.tech}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};