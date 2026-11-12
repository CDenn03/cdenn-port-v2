import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github, Calendar, User, Clock, ArrowRight } from "lucide-react";
import { solutions, getAdjacentProjects } from "@/src/app/data/portfolio";
import { evidenceBadge, evidenceKey } from "@/src/app/lib/evidence";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";
import { SolutionDetailClient } from "./SolutionDetailClient";

const serviceCallout: Record<
  string,
  { label: string; body: string; href: string; linkText: string }
> = {
  "bancassurance-platform": {
    label: "Related Service",
    body: "Multi-tenant platforms fail quietly - a permission that leaks across a tenant boundary, an approval step that the API does not actually enforce. The tenant isolation, audit logging, and maker-checker workflow built here is the same pattern I apply to every multi-tenant system.",
    href: "/services/multi-tenant-saas",
    linkText: "See Multi-Tenant SaaS & Platform Engineering",
  },
  warehouselens: {
    label: "Related Service",
    body: "WarehouseLens enforces tenant and warehouse scope everywhere - including inside the copilot, which refuses a question about a warehouse the caller is not assigned to rather than answering it. Designing permissions that hold at every layer is the core of this engagement.",
    href: "/services/multi-tenant-saas",
    linkText: "See Multi-Tenant SaaS & Platform Engineering",
  },
  steward: {
    label: "Related Service",
    body: "Steward encodes a real financial approval hierarchy - draft, finance review, chair sign-off - with permissions scoped per role and every stage auditable. If you need governance modelled properly rather than bolted on, that is this engagement.",
    href: "/services/multi-tenant-saas",
    linkText: "See Multi-Tenant SaaS & Platform Engineering",
  },
  opsis: {
    label: "Related Service",
    body: "Opsis went from an empty repo to a self-hosted, single-command deployment - a Next.js BFF, a Rust control core, and a shared auth contract between them. That full end-to-end platform delivery is the engagement model I work in.",
    href: "/services/multi-tenant-saas",
    linkText: "See Multi-Tenant SaaS & Platform Engineering",
  },
  "ndoa-plan": {
    label: "Related Service",
    body: "Payment edge-cases in high-volume events can drain startup capital fast. The payment reconciliation system built for Ndoa Plan is the same pattern I apply across fintech projects.",
    href: "/services/fintech-automation",
    linkText: "See Fintech Automation & Payments API Integrations",
  },
  "email-refiner": {
    label: "Related Service",
    body: "Email Refiner went from idea to a live Chrome extension in a single contract cycle - scoped, architected, and shipped. If you have a product that needs taking from idea to production, start with how I engage.",
    href: "/services",
    linkText: "See all services & engagement models",
  },
  sefer: {
    label: "Related Service",
    body: "Sefer works entirely without a network - a local SQLite store as the source of truth, debounced writes for rapid mutations, and annotations that survive every zoom and reading-mode change. That local-first discipline is its own specialism.",
    href: "/services/offline-first-apps",
    linkText: "See Offline-First & Field Applications",
  },
  "gik-souls-app": {
    label: "Related Service",
    body: "Field follow-up happens where connectivity does not. GIK Souls reads local-first from Drift and enqueues mutations for replay when a connection returns, with the business rules kept testable in a framework-free domain layer.",
    href: "/services/offline-first-apps",
    linkText: "See Offline-First & Field Applications",
  },
  "near-field": {
    label: "Related Service",
    body: "Near Field pushes alarm scheduling, reboot recovery, and the lock-screen flow into native Android behind a typed Pigeon bridge. When a mobile app needs a platform capability the framework will not give you, this is that work.",
    href: "/services/offline-first-apps",
    linkText: "See Offline-First & Field Applications",
  },
  mathesis: {
    label: "Related Service",
    body: "Mathesis is built on a typed content registry that resolves one source of material into two different views without duplicating it. Getting a data model right before building on it is the first phase of every engagement.",
    href: "/services",
    linkText: "See all services & engagement models",
  },
};

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = solutions.find((s) => s.slug === slug);
  if (!project) return {};

  const description = project.summary ?? project.description;
  const socialImage = project.image || "/opengraph-image";

  return {
    title: `${project.title} - Solutions`,
    description,

    alternates: {
      canonical: `/solutions/${project.slug}`,
    },

    openGraph: {
      type: "article",
      url: `https://www.cdenn.dev/solutions/${project.slug}`,
      title: project.title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: project.image ? `${project.title} - project screenshot` : "CDenn portfolio",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [socialImage],
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = solutions.find((s) => s.slug === slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary ?? project.description,
    url: `https://www.cdenn.dev/solutions/${project.slug}`,
    ...(project.image && { image: `https://www.cdenn.dev${project.image}` }),
    dateCreated: project.year,
    author: {
      "@type": "Person",
      name: "CDenn",
      url: "https://www.cdenn.dev",
    },
    ...(project.websiteUrl && { sameAs: project.websiteUrl }),
    ...(project.codeUrl && { codeRepository: project.codeUrl }),
    keywords: project.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c"),
        }}
      />
    <main id="main" className="min-h-screen transition-colors duration-300 bg-canvas text-ink">
      <SubpageNav backHref="/solutions" backLabel="Back" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-ink mb-2">
            {project.title}
          </h1>
          <span className="text-xs font-medium uppercase tracking-widest text-ink-subtle">
            {project.category}
          </span>

          {project.summary && (
            <p className="text-base text-ink-muted mt-3 mb-4 max-w-2xl">
              {project.summary}
            </p>
          )}

          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 border border-primary bg-primary px-4 py-2 text-sm font-bold text-on-primary transition-colors hover:bg-transparent hover:text-primary"
            >
              <ExternalLink size={14} /> View Live Site
            </a>
          )}
        </div>

        <SolutionDetailClient project={project} />

        <div className="grid md:grid-cols-[1fr_280px] gap-8 mt-12">
          <div className="space-y-10">
            <p className="text-xl md:text-2xl font-medium leading-snug
              text-ink
              border-l-4 border-primary pl-5">
              {project.description}
            </p>

            <div id="background">
              <h2 className="text-2xl font-bold tracking-[-0.02em] mb-4 text-ink">
                Background
              </h2>
              <div className="space-y-4">
                {project.story.split("\n\n").map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-ink-muted">
                    {para.trim()}
                  </p>
                ))}
              </div>
            </div>

            <div id="challenge">
              <h2 className="text-2xl font-bold tracking-[-0.02em] mb-4 text-ink">
                Challenge
              </h2>
              <div className="border-l-2 border-primary pl-5">
                <p className="text-sm leading-relaxed text-ink-muted">
                  {project.challenge}
                </p>
              </div>
            </div>

            {project.solution && (
              <div id="solution">
                <h2 className="text-2xl font-bold tracking-[-0.02em] mb-4 text-ink">
                  Solution
                </h2>
                <div className="border-t border-line pt-5">
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {project.solution}
                  </p>
                </div>
              </div>
            )}

            {project.process && project.process.length > 0 && (
              <div id="process">
                <h2 className="text-2xl font-bold tracking-[-0.02em] mb-4 text-ink">
                  Process
                </h2>
                <ol className="space-y-4">
                  {project.process.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-xs font-bold text-ink-subtle mt-1 w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink mb-1">
                          {step.step}
                        </p>
                        <p className="text-sm text-ink-muted">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div id="stack">
              <h2 className="text-2xl font-bold tracking-[-0.02em] mb-4 text-ink">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs leading-6 text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {serviceCallout[project.slug] && (() => {
              const callout = serviceCallout[project.slug];
              return (
                <div className="border-t border-line pt-5">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3 text-ink-subtle">
                    {callout.label}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted mb-4">
                    {callout.body}
                  </p>
                  <Link
                    href={callout.href}
                    className="group/cta inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-primary"
                  >
                    {callout.linkText}
                    <ArrowRight size={13} aria-hidden="true" className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5" />
                  </Link>
                </div>
              );
            })()}

            {project.screenshots && project.screenshots.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold tracking-[-0.02em] mb-4 text-ink">
                  Screenshots
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.screenshots.map((s) => (
                    <div key={s.src} className="overflow-hidden border border-line">
                      <div className="relative aspect-video">
                        <Image src={s.src} alt={s.caption} fill className="object-cover object-top" />
                      </div>
                      <p className="text-xs text-ink-subtle px-3 py-2">{s.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 order-first md:order-last md:sticky md:top-24 md:self-start">
            <div className="border-t border-line pt-5">
              <h3 className="text-lg font-bold tracking-[-0.01em] mb-4 text-ink">
                Project Profile
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-ink-muted">
                  <Calendar size={13} className="shrink-0" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted">
                  <User size={13} className="shrink-0" />
                  <span>{project.role}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted">
                  <Clock size={13} className="shrink-0" />
                  <span>{project.duration}</span>
                </div>
              </dl>
            </div>

            <div id="evidence" className="border-t border-line pt-5">
              <h3 className="text-lg font-bold tracking-[-0.01em] mb-4 text-ink">
                Evidence
              </h3>
              <dl className="divide-y divide-line">
                {project.evidence.map((item) => (
                  <div key={item.label} className="py-3">
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-sm text-ink-muted">{item.label}</dt>
                      <dd className="text-right">
                        <span className="block text-sm font-bold text-ink tabular-nums">{item.value}</span>
                        <span className="mt-0.5 inline-block text-xs uppercase tracking-[0.1em] text-ink-subtle">
                          {evidenceBadge(item.kind)}
                        </span>
                      </dd>
                    </div>
                    {item.method && (
                      <p className="mt-1 text-xs leading-5 text-ink-subtle">{item.method}</p>
                    )}
                  </div>
                ))}
              </dl>
              {/* The key is the point of the whole model: a reader should never
                  have to guess whether a line is a measurement or an
                  intention. */}
              <dl className="mt-4 space-y-2 border-t border-line pt-4">
                {evidenceKey(project.evidence).map((entry) => (
                  <div key={entry.badge}>
                    <dt className="text-xs uppercase tracking-[0.1em] text-ink-subtle">{entry.badge}</dt>
                    <dd className="text-xs leading-5 text-ink-muted">{entry.note}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {(project.websiteUrl || project.codeUrl) && (
              <div className="border-t border-line pt-5">
                <h3 className="text-lg font-bold tracking-[-0.01em] mb-4 text-ink">
                  Links
                </h3>
                <div className="space-y-2">
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      <ExternalLink size={13} /> Live Website
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      <Github size={13} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-line text-center">
          <p className="text-sm text-ink-subtle mb-3">
            Interested in building something similar?
          </p>
          <Link
            href="/#contact"
            className="inline-flex min-h-11 items-center gap-2 border border-primary bg-primary px-5 py-2 text-sm font-bold text-on-primary transition-colors hover:bg-transparent hover:text-primary"
          >
            Get in touch
          </Link>
        </div>

        {(prev || next) && (
          <div className="mt-8 flex items-center justify-between text-sm">
            {prev ? (
              <Link
                href={`/solutions/${prev.slug}`}
                className="inline-flex min-h-11 items-center gap-2 text-ink-muted transition-colors hover:text-ink"
              >
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/solutions/${next.slug}`}
                className="group/cta inline-flex min-h-11 items-center gap-2 text-ink-muted transition-colors hover:text-ink"
              >
                {next.title}
                <ArrowRight size={16} aria-hidden="true" className="shrink-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-0.5" />
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
    </>
  );
}
