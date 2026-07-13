import type { Metadata } from "next";
import Link from "next/link";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "MVP Development - Full-Stack Next.js Engineer for Hire",
  description:
    "I scope, architect, and ship production-ready MVPs in Next.js, TypeScript, and React - for startups and businesses that need to move fast without technical debt. Based in Nairobi, available globally for contracts and consulting.",
  alternates: {
    canonical: "/services/mvp-development",
  },
  openGraph: {
    type: "website",
    url: "https://www.cdenn.dev/services/mvp-development",
    title: "MVP Development - Full-Stack Next.js Engineer for Hire",
    description:
      "I scope, architect, and ship production-ready MVPs in Next.js, TypeScript, and React - for startups and businesses that need to move fast without technical debt.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "MVP Development - Full-Stack Next.js Engineering",
  description:
    "Scoping, architecting, and shipping production-ready Minimum Viable Products using Next.js, TypeScript, and React. Available for contracts, freelance, and full-time engagements.",
  url: "https://www.cdenn.dev/services/mvp-development",
  provider: {
    "@type": "Person",
    name: "CDenn",
    url: "https://www.cdenn.dev",
    jobTitle: "Full-Stack Software Developer",
  },
  areaServed: ["Kenya", "East Africa", "Worldwide"],
  serviceType: "Full-Stack MVP Development",
  offers: {
    "@type": "Offer",
    description:
      "Full-stack MVP development from discovery to production deployment, specializing in Next.js App Router, TypeScript, Prisma, and PostgreSQL.",
  },
};

const phases = [
  {
    title: "Scoping & Architecture",
    body: "Before writing a line of code, we define exactly what the MVP needs to do - and what it doesn't. I map the data model, API surface, and component architecture upfront so the first sprint is never wasted building in the wrong direction. This phase typically takes one week and produces a technical spec you own.",
  },
  {
    title: "Full-Stack Implementation",
    body: "Next.js App Router for the frontend and server-side rendering. Prisma + PostgreSQL for the data layer with type-safe queries. Authentication via NextAuth.js or Clerk. API routes or server actions for form handling and mutations. The stack is chosen for speed-to-ship and long-term maintainability - not trend-chasing.",
  },
  {
    title: "Third-Party Integrations",
    body: "Most MVPs need at least one external integration - payment processors, email providers, storage, or AI APIs. I've built integrations with M-Pesa Daraja, OpenAI, Resend, Supabase Storage, and various REST APIs. Integrations are handled with proper error handling and retry logic from day one.",
  },
  {
    title: "Deployment & Handoff",
    body: "Deployed to Vercel with environment variables configured, preview deployments enabled, and a production-ready CI setup. I document the architecture, environment setup, and any non-obvious implementation decisions so the next developer - or you - can pick it up without a handover call.",
  },
];

const whatIMVP = [
  "SaaS applications with user authentication, billing, and dashboards",
  "Internal tools and admin panels for operations teams",
  "Event and coordination platforms with real-time data",
  "AI-integrated applications using OpenAI or similar APIs",
  "Browser extensions and Chrome-based tooling",
  "Offline-first applications for low-connectivity environments",
];

const notRightFor = [
  "Projects with no defined problem - I need to understand what you're solving and for whom",
  "Pure design work - I work from Figma files or an agreed design direction, not blank canvases",
  "Blockchain or Web3 - outside my current stack",
];

export default function MvpDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitised JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />

      <main className="min-h-screen bg-[#FCF7F2] text-slate-900 dark:bg-[#0a0a0a] dark:text-[#FCF7F2]">
        <SubpageNav backHref="/" backLabel="Back" />

        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

          {/* ── Header ── */}
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-primary dark:text-[#888888] mb-4">
              Services
            </p>

            {/* H1 - one per page, contains primary keyword */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-900 dark:text-[#FCF7F2]">
              MVP Development &amp; Full-Stack Engineering
            </h1>

            {/* AI-extractable lead - key claim in the first visible sentence */}
            <p className="text-xl text-zinc-600 dark:text-[#b0b0b0] leading-relaxed max-w-2xl">
              I scope, architect, and ship production-ready MVPs - built in Next.js, TypeScript,
              and React with a real backend - so you can validate your product with real users
              without inheriting a codebase you&apos;ll need to rewrite six months later.
            </p>
          </div>

          {/* ── How I build MVPs ── */}
          <section aria-labelledby="process-heading" className="mb-16">
            <h2
              id="process-heading"
              className="text-2xl font-bold mb-8 text-slate-900 dark:text-[#FCF7F2]"
            >
              How I Build MVPs
            </h2>

            <div className="space-y-8">
              {phases.map((phase, i) => (
                <div
                  key={phase.title}
                  className="border-l-2 border-primary dark:border-[#FCF7F2]/20 pl-6"
                >
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-[#FCF7F2]">
                    {i + 1}. {phase.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed">
                    {phase.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── What I build ── */}
          <section aria-labelledby="what-heading" className="mb-16">
            <h2
              id="what-heading"
              className="text-2xl font-bold mb-6 text-slate-900 dark:text-[#FCF7F2]"
            >
              What I Build
            </h2>
            <ul className="space-y-3">
              {whatIMVP.map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-600 dark:text-[#b0b0b0]">
                  <CheckCircle
                    size={18}
                    className="text-primary dark:text-[#FCF7F2] shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Stack ── */}
          <section aria-labelledby="stack-heading" className="mb-16">
            <h2
              id="stack-heading"
              className="text-2xl font-bold mb-6 text-slate-900 dark:text-[#FCF7F2]"
            >
              Default Stack
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-6">
              I work with a consistent, production-proven stack that I can move fast on without
              sacrificing maintainability. If your project has existing tech choices, I adapt.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Frontend", items: ["Next.js App Router", "TypeScript", "TailwindCSS", "Framer Motion"] },
                { label: "Backend", items: ["Server Actions / API Routes", "Prisma ORM", "PostgreSQL", "Supabase"] },
                { label: "Auth", items: ["NextAuth.js (Auth.js)", "Clerk"] },
                { label: "Deployment", items: ["Vercel", "GitHub Actions", "Environment management"] },
              ].map((group) => (
                <div
                  key={group.label}
                  className="rounded-2xl border p-5 border-zinc-200 bg-white dark:border-[#1e1e1e] dark:bg-[#111]"
                >
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-zinc-400 dark:text-[#555]">
                    {group.label}
                  </h3>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-zinc-700 dark:text-[#b0b0b0]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── Not the right fit ── */}
          <section aria-labelledby="not-fit-heading" className="mb-16">
            <h2
              id="not-fit-heading"
              className="text-2xl font-bold mb-4 text-slate-900 dark:text-[#FCF7F2]"
            >
              When This Isn&apos;t the Right Fit
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-4">
              I&apos;d rather be upfront than waste your time:
            </p>
            <ul className="space-y-3">
              {notRightFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-zinc-600 dark:text-[#b0b0b0] pl-1"
                >
                  <span className="text-zinc-300 dark:text-[#444] shrink-0 mt-0.5">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Proof - links to relevant case studies ── */}
          <section aria-labelledby="proof-heading" className="mb-16">
            <h2
              id="proof-heading"
              className="text-2xl font-bold mb-6 text-slate-900 dark:text-[#FCF7F2]"
            >
              Live Examples
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                // {
                //   title: "InsureMaster",
                //   desc: "Multi-tenant bancassurance SaaS platform - policy lifecycle management, role-based access, and 50k+ record data grids.",
                //   href: "/solutions/insuremaster",
                // },
                {
                  title: "Email Refiner",
                  desc: "Chrome extension using OpenAI API and Shadow DOM injection - scoped, shipped, and live within a 3-month contract cycle.",
                  href: "/solutions/email-refiner",
                },
              ].map((proj) => (
                <Link
                  key={proj.title}
                  href={proj.href}
                  className="group rounded-2xl border p-5 border-zinc-200 bg-white dark:border-[#1e1e1e] dark:bg-[#111] hover:border-zinc-300 dark:hover:border-[#2a2a2a] transition-colors"
                >
                  <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-[#FCF7F2] flex items-center gap-2">
                    {proj.title}
                    <ArrowRight
                      size={14}
                      className="text-zinc-400 group-hover:translate-x-1 transition-transform"
                    />
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-[#888] leading-relaxed">
                    {proj.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Engagement types ── */}
          <section aria-labelledby="engagement-heading" className="mb-16">
            <h2
              id="engagement-heading"
              className="text-2xl font-bold mb-6 text-slate-900 dark:text-[#FCF7F2]"
            >
              How We Can Work Together
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  type: "Contract",
                  desc: "Fixed-scope MVP delivery with defined milestones. Best for well-scoped new products.",
                },
                {
                  type: "Consulting",
                  desc: "Architecture reviews, tech stack decisions, or sprint-based support for your team.",
                },
                {
                  type: "Full-time",
                  desc: "Embedded as a full-stack engineer on your team, building and iterating long-term.",
                },
              ].map((eng) => (
                <div
                  key={eng.type}
                  className="rounded-2xl border p-5 border-zinc-200 bg-white dark:border-[#1e1e1e] dark:bg-[#111]"
                >
                  <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-[#FCF7F2]">
                    {eng.type}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-[#888] leading-relaxed">
                    {eng.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <div className="border-t border-zinc-200 dark:border-[#1a1a1a] pt-12 text-center">
            <p className="text-zinc-500 dark:text-[#888] mb-2 text-sm">
              Based in Nairobi, Kenya - available for remote engagements worldwide.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-[#FCF7F2]">
              Ready to build your MVP?
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] mb-8 max-w-lg mx-auto">
              Tell me what you&apos;re building, who it&apos;s for, and where you are in the
              process. I&apos;ll come back with a clear read on scope, timeline, and whether
              I&apos;m the right fit.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Start the conversation <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
