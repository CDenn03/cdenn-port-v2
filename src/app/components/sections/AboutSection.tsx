"use client";

import { MapPin, Clock, Terminal } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const techStack = {
  frontend: [ "JavaScript","TypeScript", "Next.js", "TailwindCSS", "Flutter"],
  backend: ["Rust", "Node.js", "FastAPI", "PostgreSQL", "Supabase","Firebase"],
  tools: ["Git", "Figma", "Docker", "GitHub workflows", "SanityCMS"]
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-zinc-100">About Me</h2>
          </Reveal>

          <Reveal>
            <p className="text-lg leading-relaxed mb-6 text-zinc-600 dark:text-zinc-400">
              I&apos;m a Software Engineer with 5+ years of experience building web solutions for financial institutions and businesses. I specialize in JavaScript and TypeScript, with React and Next.js on the frontend - focused on clean architecture and exceptional user experiences.
            </p>
          </Reveal>

          <Reveal>
            <p className="text-lg leading-relaxed mb-8 text-zinc-600 dark:text-zinc-400">
              <strong className="text-slate-900 dark:text-zinc-100">My Approach:</strong> I believe in close collaboration, transparent communication, and shipping fast without sacrificing quality. Every project starts with understanding your business goals—not just your feature list.
            </p>
          </Reveal>

          <Reveal>
            <blockquote className="border-l-4 border-emerald-500 pl-6 py-3 my-8 rounded-r-xl bg-emerald-50/50 dark:bg-emerald-950/30">
              <p className="text-xl italic text-slate-800 dark:text-zinc-200">Build it right, make it fast, and ensure it lasts.</p>
            </blockquote>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-3">
                <MapPin className="text-emerald-500 mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-zinc-100">Location</h4>
                  <p className="text-sm text-zinc-500">Remote / Worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-emerald-500 mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-zinc-100">Availability</h4>
                  <p className="text-sm text-zinc-500">Open to Projects</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="rounded-3xl p-8 h-fit transition-colors duration-300 bg-white border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <Reveal>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-zinc-100">
              <Terminal className="text-emerald-500" size={20} /> Tech Stack
            </h3>
          </Reveal>

          <div className="space-y-8">
            {Object.entries(techStack).map(([category, technologies]) => (
              <Reveal key={category} delay={0.1 * (Object.keys(techStack).indexOf(category) + 1)}>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-zinc-500">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map(tech => (
                      <span key={tech} className="px-3 py-1.5 rounded text-sm font-medium bg-zinc-100 text-slate-700 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700">{tech}</span>
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