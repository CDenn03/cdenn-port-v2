import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronRight, Lock } from "lucide-react";
import { ProjectCover } from "@/src/app/components/ui/ProjectCover";
import { solutions } from "@/src/app/data/portfolio";
import { evidenceBadge } from "@/src/app/lib/evidence";

/**
 * The full archive, built to be scanned rather than read.
 *
 * Every row carries the same things in the same order - index, cover, title
 * and category, a one-line description, the dates and role, and two evidence
 * lines with their kind - so a reader comparing ten projects compares like
 * with like. The narrative stays on the case study.
 */
export default function SolutionsGrid() {
  if (solutions.length === 0) {
    return <p className="text-sm text-ink-muted">No project case studies are published yet.</p>;
  }

  return (
    <div className="border-t border-line">
      {solutions.map((project, index) => {
        const caseStudyHref = `/solutions/${project.slug}`;

        return (
          <article
            key={project.slug}
            className="group grid gap-5 border-b border-line py-7 md:grid-cols-12 md:gap-8"
          >
            <p className="text-xs leading-6 text-ink-subtle tabular-nums md:col-span-1">
              {String(index + 1).padStart(2, "0")}
            </p>

            {/* The cover is its own link rather than the whole card being one:
                the card also holds Live site / GitHub links, which cannot be
                nested inside an outer anchor. */}
            <Link
              href={caseStudyHref}
              aria-label={`Read the ${project.title} case study`}
              className="hover-lift relative block aspect-video overflow-hidden border border-line bg-surface-alt group-hover:border-line-strong md:col-span-4"
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  className="media-zoom object-cover"
                />
              ) : (
                <ProjectCover project={project} />
              )}
            </Link>

            <div className="md:col-span-7">
              <p className="flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-[0.12em] text-ink-subtle">
                <span>{project.category}</span>
                {project.ongoing && <span>· In progress</span>}
                {project.openSource && <span>· Open source</span>}
                {project.nda && (
                  <span className="inline-flex items-center gap-1">
                    · <Lock size={11} aria-hidden="true" /> Code under NDA
                  </span>
                )}
              </p>

              {/* Title and arrow share one link, so the arrow is clickable
                  without adding a third redundant target for screen readers. */}
              <Link
                href={caseStudyHref}
                className="mt-2 flex min-h-11 items-center justify-between gap-4"
              >
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink transition-colors group-hover:text-primary">
                  {project.title}
                </h2>                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-ink-subtle transition-[transform,color] duration-[var(--duration-base)] ease-[var(--ease-out-soft)] group-hover:text-primary motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                />
              </Link>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">{project.description}</p>

              <p className="mt-3 text-xs leading-5 text-ink-subtle tabular-nums">
                {project.year} · {project.role} · {project.duration}
              </p>

              <dl className="mt-3 space-y-1.5">
                {project.evidence.slice(0, 2).map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-wrap items-baseline gap-x-2 text-sm leading-6"
                  >
                    <dt className="text-ink-subtle">{item.label}</dt>
                    <dd className="font-semibold text-ink tabular-nums">{item.value}</dd>
                    {evidenceBadge(item.kind) && (
                      <dd className="text-xs uppercase tracking-[0.1em] text-ink-subtle">
                        {evidenceBadge(item.kind)}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>

              <p className="mt-3 text-xs leading-5 text-ink-subtle">{project.tags.join(" · ")}</p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
                {/* `group/cta` keeps these icons off the card-level group hover. */}
                <Link
                  href={caseStudyHref}
                  className="group/cta inline-flex min-h-11 items-center gap-1 text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-primary"
                >
                  Read case study
                  <ChevronRight
                    size={14}
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
                    <ArrowUpRight
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
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-y-0.5"
                    />
                  </a>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
