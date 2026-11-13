import Link from "next/link";
import { Reveal } from "../ui/Reveal";
import { experiences } from "@/src/app/data/portfolio";
import { specialisms } from "@/src/app/data/specialisms";

/**
 * The "how I work" section.
 *
 * The specialism list is read from `data/specialisms.ts` rather than retyped,
 * so the hero, this section and the services index cannot drift apart. Each
 * entry names the work that backs it, which is the whole reason the `proof`
 * field exists.
 */
const principles: Array<{ title: string; body: string[] }> = [
  {
    title: "Start from the gap, not the stack.",
    body: [
      "The work usually turns on something a business can feel: a bank partnership that would expose another bank's customers, money arriving twice that finance cannot reconcile, or a sales team losing a working day to a dead zone.",
      "Name the problem first and the technology argument mostly settles itself.",
    ],
  },
  {
    title: "Map the solution and anticipate the result.",
    body: [
      "I work out what the solution needs to do before writing code. What happens when something goes wrong? Who notices? What does it cost? How will the people using it know what to do next?",
      "These are questions worth answering before the first commit, not discovering during the first incident.",
    ],
  },
  {
    title: "Improve what exists, with value in mind.",
    body: [
      "Not every problem needs another feature. Much of my work has involved strengthening existing systems rather than removing functionality.",
      "At E&M, that has meant extending approval workflows to support edit requests, multi-step decisions and change history; establishing better deployment foundations; and improving the way frontend decisions account for user experience.",
      "Good engineering is collaborative. I've had the opportunity to work with a strong team, and I value improvements that make the product and the people building it better.",
    ],
  },
  {
    title: "Own the result, not just the ticket.",
    body: [
      "That has meant leading frontend architecture on a bank-partnership platform, building a browser extension that works inside live Gmail, establishing Docker foundations for a deployment pipeline, and taking Opsis from an authentication contract to a deployed system running on physical hardware.",
    ],
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="bg-surface-alt px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
              How I work
            </h2>
          </Reveal>

          {principles.map((principle) => (
            <Reveal key={principle.title}>
              <div className="mt-8">
                <h3 className="text-xl font-bold tracking-[-0.01em] text-ink">{principle.title}</h3>
                {principle.body.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-base leading-7 text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal>
            <blockquote className="mt-10 border-l-2 border-primary pl-5 font-secondary text-quote text-ink">
              Build systems that pay for themselves. Ship products that work. Own the outcome.
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="mt-6 text-sm leading-6 text-ink-muted">
              Working across React, Next.js, TypeScript, Node, Rust, PostgreSQL, Flutter and FastAPI.
            </p>
          </Reveal>
        </div>

        <aside className="h-fit lg:col-span-6">
          <Reveal>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Where I&apos;m most useful
            </h3>
          </Reveal>
          <dl className="mt-4 border-t border-line">
            {specialisms.map((specialism, index) => (
              <Reveal key={specialism.title} delay={index * 0.06}>
                <div className="border-b border-line py-5">
                  <dt className="text-lg font-bold text-ink">{specialism.title}</dt>
                  <dd className="mt-2 text-base leading-7 text-ink-muted">
                    <span className="font-semibold text-ink">The gap: </span>
                    {specialism.gap}
                  </dd>
                  <dd className="mt-2 text-base leading-7 text-ink-muted">
                    <span className="font-semibold text-ink">My response: </span>
                    {specialism.response}
                  </dd>
                  <dd className="mt-2 flex flex-wrap items-baseline gap-x-2 text-sm leading-6">
                    <span className="text-ink-subtle">Evidenced by</span>
                    <span className="text-ink">{specialism.proof}.</span>
                    <Link
                      href={specialism.href}
                      className="inline-flex min-h-11 items-center text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-primary"
                    >
                      {specialism.linkText}
                    </Link>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </aside>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <Reveal>
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">Experience</h3>
        </Reveal>

        <div className="mt-8 border-t border-line">
          {experiences.map((job, index) => (
            <Reveal key={`${job.company}-${job.role}`} delay={index * 0.08}>
              <article className="grid gap-3 border-b border-line py-6 md:grid-cols-12 md:gap-8">
                <p className="text-sm leading-6 text-ink-subtle tabular-nums md:col-span-3">
                  {job.period}
                </p>
                <div className="md:col-span-9">
                  <h4 className="text-lg font-bold text-ink">{job.role}</h4>
                  <p className="mt-1 text-base text-ink-muted">{job.company}</p>
                  <ul className="mt-3 space-y-2">
                    {job.desc.map((item) => (
                      <li key={item.lead} className="text-base leading-7 text-ink-muted">
                        <span className="font-bold text-ink">{item.lead}</span> {item.rest}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">
                    <span className="font-semibold text-ink">Technologies: </span>
                    {job.tech}.
                  </p>
                  {job.note && <p className="mt-3 text-sm leading-6 text-ink-subtle">{job.note}</p>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
