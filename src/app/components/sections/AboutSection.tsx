"use client";

import { MapPin, Clock, Briefcase } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { experiences } from "@/src/app/data/portfolio";

const capabilities = [
  ["Product systems", "Architecture that stays clear as a product grows."],
  ["Payments and reconciliation", "Reliable provider callbacks, idempotency, and operational visibility."],
  ["Multi-tenant platforms", "Roles, permissions, workflows, and isolated data boundaries."],
  ["Offline-first software", "Local data, sync queues, and resilient field workflows."],
  ["AI-assisted operations", "Useful automation bounded by human review and real permissions."],
];

export const AboutSection = () => {
  return (
    <section id="about" className="bg-[#F5EFE8] px-4 py-16 transition-colors duration-300 md:px-6 md:py-24 dark:bg-[#111111]">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">About</p>
            <h2 className="mb-8 text-3xl font-bold tracking-[-0.03em] text-slate-900 md:text-5xl dark:text-[#FCF7F2]">
              A systems-minded approach to product work.
            </h2>
          </Reveal>

          <Reveal>
            <p className="mb-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              I&apos;m a full-stack software developer based in Nairobi, Kenya. I work with teams that need the product and the operational details to hold together, from the first user journey through to the systems behind it.
            </p>
          </Reveal>
          <Reveal>
            <p className="mb-8 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              That has meant leading frontend architecture for multi-tenant bancassurance platforms, building a browser extension inside live Gmail, and engineering offline-first systems that reconcile payment-provider callbacks. I start with the constraint, then make the technical trade-offs visible.
            </p>
          </Reveal>
          <Reveal>
            <blockquote className="border-l-2 border-primary pl-5 text-xl leading-8 text-slate-800 dark:text-[#FCF7F2]">
              Build systems that last. Ship products that work. Own the outcome.
            </blockquote>
          </Reveal>

          <Reveal>
            <dl className="mt-10 grid gap-6 border-t border-zinc-300 pt-6 sm:grid-cols-2 dark:border-zinc-700">
              <div>
                <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400"><MapPin size={15} /> Location</dt>
                <dd className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Nairobi, Kenya · Remote-friendly</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400"><Clock size={15} /> Availability</dt>
                <dd className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Open to roles, contracts, and consulting</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <aside className="h-fit border-t-2 border-primary pt-5 md:mt-2">
          <Reveal>
            <h3 className="text-xl font-bold text-slate-900 dark:text-[#FCF7F2]">Capabilities</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">The work I am most useful for.</p>
          </Reveal>
          <ol className="mt-6">
            {capabilities.map(([title, description], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <li className="grid grid-cols-[2rem_1fr] gap-4 border-t border-zinc-300 py-5 last:border-b dark:border-zinc-700">
                  <span className="pt-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">0{index + 1}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-[#FCF7F2]">{title}</h4>
                    <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="mt-6 font-mono text-xs leading-6 text-zinc-500 dark:text-zinc-400">
            React / Next.js / TypeScript / Node / Rust / PostgreSQL / Flutter
          </p>
        </aside>
      </div>

      <div className="mx-auto mt-20 max-w-6xl border-t border-zinc-300 pt-8 dark:border-zinc-700">
        <Reveal>
          <div className="flex items-center gap-2">
            <Briefcase size={17} className="text-primary dark:text-[#FCF7F2]" />
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">Experience</h3>
          </div>
        </Reveal>

        <div className="mt-8 space-y-8">
          {experiences.map((job, index) => (
            <Reveal key={`${job.company}-${job.role}`} delay={index * 0.08}>
              <article className="grid gap-4 border-t border-zinc-300 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8 dark:border-zinc-700">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-[#FCF7F2]">{job.role}</h4>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{job.company}</p>
                  <ul className="mt-4 space-y-2">
                    {job.desc.map((item, itemIndex) => <li key={itemIndex} className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">{item}</li>)}
                  </ul>
                  <p className="mt-4 font-mono text-xs leading-5 text-zinc-500 dark:text-zinc-400">{job.tech}</p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">{job.period}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
