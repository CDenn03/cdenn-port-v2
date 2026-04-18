"use client";

import { MapPin, Clock, Terminal } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const techStack = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "TailwindCSS",
    "TanStack Query"
  ],
  backend: ["Node.js", "Deno", "Rust", "Axum"],
  tools: ["Git", "GitHub", "Figma", "Adobe Tools"]
};


export const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 px-6 transition-colors duration-300 bg-[#F5EFE8] dark:bg-[#111111]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-[#FCF7F2]">
              About Me
            </h2>
          </Reveal>

          <Reveal>
            <p className="text-lg leading-relaxed mb-6 text-zinc-600 dark:text-[#b0b0b0]">
              I&apos;m a Frontend Engineer with 3+ years of experience building scalable,
              high-performance web applications using React and the modern TypeScript ecosystem.
              I focus on creating fast, intuitive user experiences while maintaining clean and
              robust codebases.
            </p>
          </Reveal>

          <Reveal>
            <p className="text-lg leading-relaxed mb-6 text-zinc-600 dark:text-[#b0b0b0]">
              I&apos;ve worked on SaaS platforms, improved legacy systems, and collaborated with
              cross-functional teams to deliver production-ready products. I enjoy translating
              complex business requirements into simple, maintainable frontend solutions.
            </p>
          </Reveal>

          <Reveal>
            <p className="text-lg leading-relaxed mb-8 text-zinc-600 dark:text-[#b0b0b0]">
              <strong className="text-slate-900 dark:text-[#FCF7F2]">My Approach:</strong>{" "}
              Build scalable systems, ship fast, and never compromise on code quality or user
              experience. I prioritize clarity, performance, and long-term maintainability in
              every project.
            </p>
          </Reveal>

          <Reveal>
            <blockquote className="border-l-4 border-primary pl-6 py-3 my-8 rounded-r-xl bg-primary/5 dark:bg-white/5">
              <p className="text-xl italic text-slate-800 dark:text-[#FCF7F2]">
                Build scalable interfaces. Keep it clean. Ship with confidence.
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary dark:text-[#FCF7F2] mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-[#FCF7F2]">
                    Location
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-[#b0b0b0]">Remote / Worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-primary dark:text-[#FCF7F2] mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-[#FCF7F2]">
                    Availability
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-[#b0b0b0]">Open to Opportunities</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="rounded-3xl p-6 md:p-8 h-fit transition-colors duration-300 bg-white border border-zinc-200 shadow-sm dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">
          <Reveal>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-[#FCF7F2]">
              <Terminal className="text-primary dark:text-[#FCF7F2]" size={20} /> Tech Stack
            </h3>
          </Reveal>

          <div className="space-y-8">
            {Object.entries(techStack).map(([category, technologies]) => (
              <Reveal
                key={category}
                delay={0.1 * (Object.keys(techStack).indexOf(category) + 1)}
              >
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-zinc-500 dark:text-[#888888]">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded text-sm font-medium bg-zinc-100 text-slate-700 border border-zinc-200 dark:bg-[#222222] dark:text-[#FCF7F2] dark:border-[#333333]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};