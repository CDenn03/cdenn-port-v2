import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { ProjectCover } from "../ui/ProjectCover";
import { solutions } from "@/src/app/data/portfolio";

/**
 * The three featured projects on the home page, written up in full.
 *
 * `featured` is the only switch. Each project reads the same way: who the work
 * was for, the problem, the value mapped, what was built against how it pays
 * for itself, and what it proves. The long-form version lives on the case
 * study page.
 */
const featured = solutions.filter((solution) => solution.featured);

const otherWork = [
  { slug: "ndoa-plan", name: "Ndoa Plan", line: "financial governance and payment reconciliation." },
  { slug: "sefer", name: "Sefer", line: "offline-first field tools." },
  { slug: "mathesis", name: "Mathesis", line: "offline-first product development." },
  { slug: "near-field", name: "Near Field", line: "offline-first field applications." },
  { slug: "email-refiner", name: "Email Refiner", line: "a browser extension that works inside the live Gmail interface." },
];

const subheading = "text-sm font-bold text-ink";
const linkClass =
  "group/cta inline-flex min-h-11 items-center gap-1 text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-primary";

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="bg-canvas px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">Selected work</h2>
          <p className="mt-4 text-base leading-7 text-ink-muted">
            Three systems, presented in the order of my engineering journey. Each demonstrates a
            different kind of ownership: enterprise frontend architecture, independent end-to-end
            delivery and self-initiated product development.
          </p>
        </div>

        <div className="mt-10 border-t border-line">
          {featured.map((project, index) => {
            const copy = project.home;
            if (!copy) return null;
            return (
              <Reveal key={project.slug}>
                <article className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-10">
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
                    <p className="text-xs uppercase tracking-[0.12em] text-ink-subtle">{copy.attribution}</p>

                    <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink">
                      <Link
                        href={`/solutions/${project.slug}`}
                        className="inline-flex min-h-11 items-center transition-colors hover:text-primary"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    {copy.intro?.map((paragraph) => (
                      <p key={paragraph} className="mt-3 max-w-2xl text-base leading-7 text-ink-muted">
                        {paragraph}
                      </p>
                    ))}

                    <h4 className={`${subheading} mt-6`}>The problem</h4>
                    {copy.problem.map((paragraph) => (
                      <p key={paragraph} className="mt-2 max-w-2xl text-base leading-7 text-ink-muted">
                        {paragraph}
                      </p>
                    ))}

                    <h4 className={`${subheading} mt-6`}>The value mapped</h4>
                    {copy.value.map((paragraph) => (
                      <p key={paragraph} className="mt-2 max-w-2xl text-base leading-7 text-ink-muted">
                        {paragraph}
                      </p>
                    ))}

                    <div className="mt-5 overflow-x-auto">
                      <table className="w-full min-w-[32rem] border-collapse text-left text-sm leading-6">
                        <caption className="sr-only">
                          What was built in {project.title} and how it pays for itself
                        </caption>
                        <thead>
                          <tr className="border-b border-line-strong">
                            <th scope="col" className="py-2 pr-4 text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                              What was built
                            </th>
                            <th scope="col" className="py-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                              How it pays for itself
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {copy.built.map(([built, pays]) => (
                            <tr key={built} className="border-b border-line align-top">
                              <th scope="row" className="py-3 pr-4 font-semibold text-ink">
                                {built}
                              </th>
                              <td className="py-3 text-ink-muted">{pays}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {copy.status && (
                      <>
                        <h4 className={`${subheading} mt-6`}>Honest status</h4>
                        <p className="mt-2 max-w-2xl text-base leading-7 text-ink-muted">{copy.status}</p>
                      </>
                    )}

                    <h4 className={`${subheading} mt-6`}>What this proves</h4>
                    <p className="mt-2 max-w-2xl text-base leading-7 text-ink-muted">{copy.proves}</p>

                    {copy.note && <p className="mt-4 text-sm leading-6 text-ink-subtle">{copy.note}</p>}

                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold">
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
                        <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          Live site
                          <ExternalLink
                            size={13}
                            aria-hidden="true"
                            className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-y-0.5"
                          />
                        </a>
                      )}
                      {project.codeUrl && (
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          GitHub
                          <ExternalLink size={13} aria-hidden="true" />
                        </a>
                      )}
                    </div>

                    {copy.bridge && (
                      <p className="mt-8 max-w-2xl border-l-2 border-primary pl-4 text-base italic leading-7 text-ink-muted">
                        {copy.bridge}
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 max-w-3xl">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">Other work</h3>
          <p className="mt-3 text-base leading-7 text-ink-muted">
            Other systems demonstrate the same engineering approach across different business contexts:
          </p>
          <ul className="mt-3 space-y-1 text-base leading-7 text-ink-muted">
            {otherWork.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/solutions/${item.slug}`}
                  className="font-bold text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>{" "}
                - {item.line}
              </li>
            ))}
          </ul>
          <Link
            href="/solutions"
            className="press group/cta mt-6 inline-flex min-h-12 shrink-0 items-center gap-1.5 border border-line-strong px-6 text-base font-bold text-ink transition-colors hover:bg-surface-alt"
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
