import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github, Calendar, User, Clock, ArrowRight } from "lucide-react";
import { solutions, getAdjacentProjects } from "@/src/app/data/portfolio";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";
import { SolutionDetailClient } from "./SolutionDetailClient";

const serviceCallout: Record<
  string,
  { label: string; body: string; href: string; linkText: string }
> = {
  "ndoa-plan": {
    label: "Related Service",
    body: "Payment edge-cases in high-volume events can drain startup capital fast. The M-Pesa reconciliation system built for Ndoa Plan is the same pattern I apply across fintech projects.",
    href: "/services/fintech-automation",
    linkText: "See Fintech Automation & M-Pesa Integration →",
  },
  insuremaster: {
    label: "Related Service",
    body: "InsureMaster was scoped, architected, and shipped as a production MVP within a fixed timeline. That end-to-end delivery process — from data model to deployment — is exactly what I offer for new products.",
    href: "/services/mvp-development",
    linkText: "See MVP Development & Full-Stack Engineering →",
  },
  "email-refiner": {
    label: "Related Service",
    body: "Email Refiner went from idea to a live Chrome extension in a single contract cycle. If you have a product that needs scoping, architecting, and shipping fast — that's the engagement model I work in.",
    href: "/services/mvp-development",
    linkText: "See MVP Development & Full-Stack Engineering →",
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
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} - project screenshot`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [project.image],
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
    image: `https://www.cdenn.dev${project.image}`,
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
    <main className="min-h-screen transition-colors duration-300 bg-[#FCF7F2] text-slate-900 dark:bg-[#0a0a0a] dark:text-[#FCF7F2]">
      <SubpageNav backHref="/solutions" backLabel="Back" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-[#FCF7F2] mb-2">
            {project.title}
          </h1>
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-[#555]">
            {project.category}
          </span>

          {project.summary && (
            <p className="text-base text-zinc-500 dark:text-[#888] mt-3 mb-4 max-w-2xl">
              {project.summary}
            </p>
          )}

          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                bg-slate-900 text-white dark:bg-[#FCF7F2] dark:text-[#0a0a0a]
                hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={14} /> View Live Site
            </a>
          )}
        </div>

        <SolutionDetailClient project={project} />

        <div className="grid md:grid-cols-[1fr_280px] gap-8 mt-12">
          <div className="space-y-10">
            <p className="text-xl md:text-2xl font-medium leading-snug
              text-slate-800 dark:text-[#FCF7F2]
              border-l-4 border-amber-400 pl-5">
              {project.description}
            </p>

            <div id="background">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-zinc-400 dark:text-[#555]">
                Background
              </h2>
              <div className="space-y-4">
                {project.story.split("\n\n").map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-zinc-700 dark:text-[#b0b0b0]">
                    {para.trim()}
                  </p>
                ))}
              </div>
            </div>

            <div id="challenge">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-zinc-400 dark:text-[#555]">
                Challenge
              </h2>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-[#b0b0b0]">
                  {project.challenge}
                </p>
              </div>
            </div>

            {project.solution && (
              <div id="solution">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-zinc-400 dark:text-[#555]">
                  Solution
                </h2>
                <div className="rounded-2xl border border-zinc-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111] p-5">
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-[#b0b0b0]">
                    {project.solution}
                  </p>
                </div>
              </div>
            )}

            {project.process && project.process.length > 0 && (
              <div id="process">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-zinc-400 dark:text-[#555]">
                  Process
                </h2>
                <ol className="space-y-4">
                  {project.process.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-xs font-bold text-zinc-300 dark:text-[#333] mt-1 w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-[#FCF7F2] mb-1">
                          {step.step}
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-[#b0b0b0]">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div id="stack">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-zinc-400 dark:text-[#555]">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 dark:bg-[#1e1e1e] dark:text-[#b0b0b0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {serviceCallout[project.slug] && (() => {
              const callout = serviceCallout[project.slug];
              return (
                <div className="rounded-2xl border border-zinc-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111] p-5">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3 text-zinc-400 dark:text-[#555]">
                    {callout.label}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-[#b0b0b0] mb-4">
                    {callout.body}
                  </p>
                  <Link
                    href={callout.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-[#FCF7F2] hover:opacity-70 transition-opacity"
                  >
                    {callout.linkText} <ArrowRight size={13} />
                  </Link>
                </div>
              );
            })()}

            {project.screenshots && project.screenshots.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-zinc-400 dark:text-[#555]">
                  Screenshots
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.screenshots.map((s) => (
                    <div key={s.src} className="rounded-xl overflow-hidden border border-zinc-200 dark:border-[#1e1e1e]">
                      <div className="relative aspect-video">
                        <Image src={s.src} alt={s.caption} fill className="object-cover object-top" />
                      </div>
                      <p className="text-xs text-zinc-400 dark:text-[#555] px-3 py-2">{s.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 order-first md:order-last md:sticky md:top-24 md:self-start">
            <div className="rounded-2xl border border-zinc-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111] p-5">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-zinc-400 dark:text-[#555]">
                Project Profile
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-[#888]">
                  <Calendar size={13} className="shrink-0" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600 dark:text-[#888]">
                  <User size={13} className="shrink-0" />
                  <span>{project.role}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600 dark:text-[#888]">
                  <Clock size={13} className="shrink-0" />
                  <span>{project.duration}</span>
                </div>
              </dl>
            </div>

            <div id="impact" className="rounded-2xl border border-zinc-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111] p-5">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-zinc-400 dark:text-[#555]">
                Impact
              </h3>
              <div className="divide-y divide-zinc-100 dark:divide-[#1e1e1e]">
                {project.results.map((r) => (
                  <div key={r.label} className="flex items-start justify-between py-2">
                    <span className="text-sm text-zinc-500 dark:text-[#888]">{r.label}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-800 dark:text-[#FCF7F2] block">{r.value}</span>
                      {r.trend && (
                        <span className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">{r.trend}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {(project.websiteUrl || project.codeUrl) && (
              <div className="rounded-2xl border border-zinc-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111] p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-zinc-400 dark:text-[#555]">
                  Links
                </h3>
                <div className="space-y-2">
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-zinc-600 dark:text-[#888] hover:text-slate-900 dark:hover:text-[#FCF7F2] transition-colors"
                    >
                      <ExternalLink size={13} /> Live Website
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-zinc-600 dark:text-[#888] hover:text-slate-900 dark:hover:text-[#FCF7F2] transition-colors"
                    >
                      <Github size={13} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-[#1e1e1e] text-center">
          <p className="text-sm text-zinc-400 dark:text-[#555] mb-3">
            Interested in building something similar?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
              bg-slate-900 text-white dark:bg-[#FCF7F2] dark:text-[#0a0a0a]
              hover:opacity-90 transition-opacity"
          >
            Get in touch
          </Link>
        </div>

        {(prev || next) && (
          <div className="mt-8 flex items-center justify-between text-sm">
            {prev ? (
              <Link
                href={`/solutions/${prev.slug}`}
                className="flex items-center gap-2 text-zinc-500 dark:text-[#888] hover:text-slate-900 dark:hover:text-[#FCF7F2] transition-colors"
              >
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/solutions/${next.slug}`}
                className="flex items-center gap-2 text-zinc-500 dark:text-[#888] hover:text-slate-900 dark:hover:text-[#FCF7F2] transition-colors"
              >
                {next.title} →
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
    </>
  );
}
