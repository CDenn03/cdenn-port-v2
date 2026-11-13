import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RequestCVButton } from "./RequestCVButton";
import { profile, identityLine } from "@/src/app/data/profile";
import { formatStatusDate, isStatusStale, status } from "@/src/app/data/status";
import { solutions } from "@/src/app/data/portfolio";
import { specialisms } from "@/src/app/data/specialisms";
import { evidenceLine } from "@/src/app/lib/evidence";

/**
 * The first viewport.
 *
 * Deliberately a server component: nothing here needs state except the CV
 * dialog, which lives in its own island. That keeps the headline and the
 * portrait - the two things that decide the LCP - out of the client bundle.
 *
 * The brief for this screen was "identity, specialisation, current
 * availability, selected proof and one next action", so each of those appears
 * exactly once and nothing else is allowed in.
 *
 * Every element here is on a tight height budget, because at 390x844 the whole
 * set - identity, headline, deck, specialisms, availability, actions and the
 * first proof row - has to clear the fold. That is why the actions sit two
 * across on small screens and the specialism links sit in two columns.
 */

const featured = solutions.filter((solution) => solution.featured);
const stale = isStatusStale();

export const HeroSection = () => {
  return (
    <section className="border-b border-line px-4 pt-20 pb-12 md:px-6 md:pt-28 md:pb-16">
      <div className="mx-auto max-w-6xl">
        {/* Identity: brand first, then the name, then where the work happens
            from. The portrait sits in this line rather than in a column of its
            own, which is what lets the headline start near the top of the
            screen. */}
        <div className="flex items-center gap-4">
          <Image
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            width={72}
            height={72}
            priority
            sizes="72px"
            className="h-[72px] w-[72px] shrink-0 object-cover object-top"
          />
          <p className="text-sm leading-6 text-ink-muted">
            {identityLine.map((part, index) => (
              <span key={part}>
                {index > 0 && <span aria-hidden="true" className="px-1.5 text-ink-subtle">·</span>}
                <span className={index === 0 ? "font-semibold text-ink" : undefined}>{part}</span>
              </span>
            ))}
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="max-w-[22ch] text-[clamp(2.125rem,5.5vw,4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-ink">
              {profile.headline}
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-8 text-ink-muted">{profile.deck}</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink-subtle">{profile.stack}</p>

            {/* Specialisation stated as four named areas rather than left
                implicit in the deck, because this is the one screen a recruiter
                may read. Two columns on small screens so each link can carry a
                44px target without the row running to four lines. */}
            <ul className="mt-4 grid max-w-xl grid-cols-2 gap-x-6">
              {specialisms.map((specialism) => (
                <li key={specialism.title}>
                  <Link
                    href={specialism.href}
                    className="inline-flex min-h-11 items-center text-sm leading-5 text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-primary"
                  >
                    {specialism.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Availability with its date attached. The date is not a detail:
                it is what makes the claim checkable rather than decorative. */}
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-6">
              <span className="inline-flex min-h-7 items-center gap-2 bg-primary-tint px-3 font-semibold text-on-primary-tint">
                <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-accent" />
                {stale ? "Availability not recently confirmed" : status.headline}
              </span>
              <span className="text-ink-subtle">Confirmed {formatStatusDate()}</span>
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-ink-muted">{status.detail}</p>

            {/* One primary action per view. "Start a conversation" is the
                secondary because the owner's stated goal is that work gets
                looked at first. */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:items-center">
              <Link
                href="#solutions"
                className="press group/cta inline-flex min-h-12 items-center justify-center gap-1.5 bg-primary px-4 text-center text-base font-bold text-on-primary transition-colors hover:bg-primary-hover sm:px-6"
              >
                View selected work
                <ChevronRight
                  size={18}
                  aria-hidden="true"
                  className="hidden shrink-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5 sm:block"
                />
              </Link>
              <Link
                href="#contact"
                className="press inline-flex min-h-12 items-center justify-center border border-line-strong px-4 text-center text-base font-bold text-ink transition-colors hover:bg-surface-alt sm:px-6"
              >
                Start a conversation
              </Link>
              <RequestCVButton className="col-span-2 sm:ml-2" />
            </div>
          </div>

          {/* Selected proof. Compact on purpose: this is a pointer into the
              archive, not a summary of it. */}
          <div className="lg:col-span-5 lg:pt-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Selected proof
            </h2>
            <ul className="mt-2 border-t border-line lg:mt-3">
              {featured.map((project) => (
                <li key={project.slug} className="border-b border-line">
                  <Link
                    href={`/solutions/${project.slug}`}
                    className="group/row flex min-h-14 flex-col justify-center gap-0.5 py-3"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-semibold text-ink transition-colors group-hover/row:text-primary">
                        {project.title}
                      </span>
                      <span className="shrink-0 text-xs text-ink-subtle">{project.category}</span>
                    </span>
                    <span className="text-xs leading-5 text-ink-muted tabular-nums">
                      {project.home?.proofLine ?? evidenceLine(project.evidence[0])}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/solutions"
              className="group/cta mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-primary lg:mt-3"
            >
              All {solutions.length} case studies
              <ChevronRight
                size={14}
                aria-hidden="true"
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
