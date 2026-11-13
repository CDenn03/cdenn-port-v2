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

          <Reveal>
            <p className="mt-6 text-lg leading-8 text-ink">
              I start from what a system has to guarantee, not from the stack. The work usually
              turns on one awkward, non-negotiable fact: a tenant boundary that must not leak, a
              payment callback that can arrive twice, a device that will be offline for a whole
              working day. I decide how to handle that before writing the code, and leave the
              reasoning visible in it afterwards.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-5 text-lg leading-8 text-ink">
              I own the result rather than the ticket. That has meant leading frontend architecture
              on a multi-tenant bancassurance platform, building a browser extension that lives
              inside live Gmail, and designing sync layers that reconcile payment records after a
              day without a network.
            </p>
          </Reveal>
          <Reveal>
            <blockquote className="mt-8 border-l-2 border-primary pl-5 font-secondary text-quote text-ink">
              Build systems that last. Ship products that work. Own the outcome.
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="mt-8 text-sm leading-6 text-ink-muted">
              Working across React, Next.js, TypeScript, Node, Rust, PostgreSQL and Flutter.
            </p>
          </Reveal>
        </div>

        <aside className="h-fit lg:col-span-6">
          <Reveal>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Where I am most useful
            </h3>
          </Reveal>
          <dl className="mt-4 border-t border-line">
            {specialisms.map((specialism, index) => (
              <Reveal key={specialism.title} delay={index * 0.06}>
                <div className="border-b border-line py-5">
                  <dt className="text-lg font-bold text-ink">{specialism.title}</dt>
                  <dd className="mt-1 text-base leading-7 text-ink-muted">{specialism.summary}</dd>
                  <dd className="mt-2 flex flex-wrap items-baseline gap-x-2 text-sm leading-6">
                    <span className="text-ink-subtle">Evidenced by</span>
                    <span className="text-ink">{specialism.proof}</span>
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
                      <li key={item} className="text-base leading-7 text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">{job.tech}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
