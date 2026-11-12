import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { ProjectCover } from "../ui/ProjectCover";
import { solutions } from "@/src/app/data/portfolio";
import { evidenceBadge } from "@/src/app/lib/evidence";

/**
 * The three featured projects on the home page.
 *
 * `featured` is the only switch: there is no slice here, so changing the home
 * set is a one-line edit in the data file.
 *
 * Each card carries the constraint and up to three evidence lines, and stops
 * there. The approach, the process and the full evidence table belong to the
 * case study; repeating them here was most of why the old home page ran to
 * 8,104px.
 */
const featured = solutions.filter((solution) => solution.featured);
const remaining = solutions.length - featured.length;

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="bg-canvas px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">Selected work</h2>
          <p className="text-sm leading-6 text-ink-muted">
            Three systems in depth. Each line below says how it is evidenced.
          </p>
        </div>

        <div className="mt-10 border-t border-line">
          {featured.map((project, index) => (
            <Reveal key={project.slug}>
              <article className="grid gap-6 border-b border-line py-8 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <Link
                    href={`/solutions/${project.slug}`}
                    aria-label={`Read the ${project.title} case study`}
                    className="hover-lift relative block aspect-video overflow-hidden border border-line bg-surface-alt"
                  >
                    <span className="absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center bg-primary text-sm font-bold text-on-primary tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} interface`}
                        fill
                        className="media-zoom object-cover"
                        sizes="(max-width: 768px) 100vw, 42vw"
                      />
                    ) : (
                      <ProjectCover project={project} />
                    )}
                  </Link>
                </div>

                <div className="md:col-span-7">
                  <p className="text-xs uppercase tracking-[0.12em] text-ink-subtle">
                    {project.category}
                    {project.ongoing ? " · In progress" : ""}
                    {project.nda ? " · Code under NDA" : ""}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink">
                    <Link
                      href={`/solutions/${project.slug}`}
                      className="inline-flex min-h-11 items-center transition-colors hover:text-primary"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="mt-3 max-w-2xl text-base leading-7 text-ink-muted">{project.description}</p>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-ink-muted">
                    <span className="font-semibold text-ink">The constraint. </span>
                    {project.challenge}
                  </p>

                  {/* A definition list, not prose: the badge has to sit next to
                      the claim it qualifies, or the qualifier does no work. */}
                  <dl className="mt-5 space-y-2">
                    {project.evidence.slice(0, 3).map((item) => (
                      <div key={item.label} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm leading-6">
                        <dt className="text-ink-subtle">{item.label}</dt>
                        <dd className="font-semibold text-ink tabular-nums">{item.value}</dd>
                        <dd className="text-xs uppercase tracking-[0.1em] text-ink-subtle">
                          {evidenceBadge(item.kind)}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold">
                    <Link
                      href={`/solutions/${project.slug}`}
                      className="group/cta inline-flex min-h-11 items-center gap-1 text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-primary"
                    >
                      Read case study
                      <ChevronRight
                        size={15}
                        aria-hidden="true"
                        className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5"
                      />
                    </Link>
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/cta inline-flex min-h-11 items-center gap-1 text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-primary"
                      >
                        Live site
                        <ExternalLink
                          size={13}
                          aria-hidden="true"
                          className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-y-0.5"
                        />
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/cta inline-flex min-h-11 items-center gap-1 text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-primary"
                      >
                        GitHub
                        <ExternalLink
                          size={13}
                          aria-hidden="true"
                          className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-y-0.5"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-base leading-7 text-ink-muted">
            {remaining} more systems, including financial governance, offline-first field tools and a
            browser extension, are written up the same way.
          </p>
          <Link
            href="/solutions"
            className="press group/cta inline-flex min-h-12 shrink-0 items-center gap-1.5 border border-line-strong px-6 text-base font-bold text-ink transition-colors hover:bg-surface-alt"
          >
            View all work
            <ChevronRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
