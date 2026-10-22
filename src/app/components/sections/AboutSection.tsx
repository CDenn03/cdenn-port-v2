"use client";

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
    <section id="about" className="bg-surface px-4 py-20 transition-colors duration-300 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <Reveal>
            <h2 className="mb-8 text-3xl font-bold tracking-[-0.03em] text-foreground md:text-5xl">
              Systems that hold together.
            </h2>
          </Reveal>

          <Reveal>
            <p className="mb-6 text-lg leading-8 text-foreground">
              I&apos;m a full-stack software developer based in Nairobi, Kenya. I work with teams that need the product and the operational details to hold together, from the first user journey through to the systems behind it.
            </p>
          </Reveal>
          <Reveal>
            <p className="mb-8 text-lg leading-8 text-foreground">
              That has meant leading frontend architecture for multi-tenant bancassurance platforms, building a browser extension inside live Gmail, and engineering offline-first systems that reconcile payment-provider callbacks. I start with the constraint, then make the technical trade-offs visible.
            </p>
          </Reveal>
          <Reveal>
            <blockquote className="border-l-2 border-accent pl-5 text-xl leading-8 text-foreground">
              Build systems that last. Ship products that work. Own the outcome.
            </blockquote>
          </Reveal>

          <Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="bg-background p-5">
                <p className="text-base font-bold text-foreground">Based in</p>
                <p className="mt-1 text-base text-foreground">Nairobi, Kenya. Remote-friendly.</p>
              </div>
              <div className="bg-background p-5">
                <p className="text-base font-bold text-foreground">Available for</p>
                <p className="mt-1 text-base text-foreground">Roles, contracts, and consulting.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <aside className="h-fit">
          <Reveal>
            <h3 className="text-2xl font-bold text-foreground">What I am most useful for</h3>
          </Reveal>
          <div className="mt-6 space-y-6">
            {capabilities.map(([title, description], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{title}</h4>
                  <p className="mt-1 text-base leading-7 text-foreground">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 text-base leading-7 text-muted-foreground">
              Working across React, Next.js, TypeScript, Node, Rust, PostgreSQL and Flutter.
            </p>
          </Reveal>
        </aside>
      </div>

      <div className="mx-auto mt-24 max-w-6xl">
        <Reveal>
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-foreground md:text-3xl">Experience</h3>
        </Reveal>

        <div className="mt-10 space-y-6">
          {experiences.map((job, index) => (
            <Reveal key={`${job.company}-${job.role}`} delay={index * 0.08}>
              <article className="grid gap-4 bg-background p-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8">
                <div>
                  <h4 className="text-lg font-bold text-foreground">{job.role}</h4>
                  <p className="mt-1 text-base text-muted-foreground">{job.company}</p>
                  <ul className="mt-4 space-y-2">
                    {job.desc.map((item, itemIndex) => <li key={itemIndex} className="text-base leading-7 text-foreground">{item}</li>)}
                  </ul>
                  <p className="mt-4 text-base leading-6 text-muted-foreground">{job.tech}</p>
                </div>
                <p className="text-base text-muted-foreground md:text-right">{job.period}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
