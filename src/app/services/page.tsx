import type { Metadata } from "next";
import Link from "next/link";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Software Engineering Services",
  description:
    "Multi-tenant SaaS, fintech automation, and offline-first engineering for teams building reliable production systems across East Africa and globally.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: "https://www.cdenn.dev/services",
    title: "Software Engineering Services | CDenn",
    description:
      "Multi-tenant SaaS, fintech automation, and offline-first engineering for reliable production systems.",
    images: ["/opengraph-image"],
  },
};

const services = [
  {
    title: "Multi-Tenant SaaS & Platform Engineering",
    href: "/services/multi-tenant-saas",
    lead: "Platforms that serve many client organisations from one codebase - with tenant isolation, role-based permissions, approval workflows, and audit trails enforced in the architecture rather than by convention.",
    points: [
      "Tenant isolation at the data-access layer",
      "RBAC modelled on real approval hierarchies",
      "Maker-checker and staged approval workflows",
      "Action-level audit logging as infrastructure",
    ],
  },
  {
    title: "Fintech & Payment Integration",
    href: "/services/fintech-automation",
    lead: "Payment pipelines that account for every transaction - payment API integrations, callback reconciliation, and ledger systems for businesses that cannot afford a missing or double-counted payment.",
    points: [
      "Payment API webhook and callback handling",
      "Automated ledger reconciliation",
      "Idempotent, hardened webhook infrastructure",
      "Multi-tenant payment architecture",
    ],
  },
  {
    title: "Offline-First & Field Applications",
    href: "/services/offline-first-apps",
    lead: "Applications that work fully without a network and reconcile cleanly when one returns - for field teams, rural operations, and anywhere intermittent connectivity is the normal case.",
    points: [
      "Local-first data layers (Drift, Dexie, sqflite)",
      "Durable background sync queues",
      "Explicit conflict-resolution strategies",
      "Native capability bridges for Flutter",
    ],
  },
];

export default function ServicesIndexPage() {
  return (
    <main className="min-h-screen bg-[#FCF7F2] text-slate-900 dark:bg-[#0a0a0a] dark:text-[#FCF7F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Software Engineering Services",
            url: "https://www.cdenn.dev/services",
            description:
              "Multi-tenant SaaS, fintech automation, and offline-first engineering services from CDenn.",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: services.map((service, position) => ({
                "@type": "ListItem",
                position: position + 1,
                name: service.title,
                url: `https://www.cdenn.dev${service.href}`,
              })),
            },
          }).replaceAll("<", String.raw`\u003c`),
        }}
      />
      <SubpageNav backHref="/" backLabel="Back" />

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400 mb-4">
            Services
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.02] mb-6 text-slate-900 dark:text-[#FCF7F2]">
            What I Build
          </h1>
          <p className="text-xl text-zinc-600 dark:text-[#b0b0b0] leading-relaxed max-w-2xl">
            Three areas where I have shipped production systems and can show the work. If your
            problem sits across two of them, that is usually a good sign rather than a bad one.
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group block border-t border-zinc-300 py-6 dark:border-zinc-700"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-[#FCF7F2] flex items-start gap-2">
                {service.title}
                <ArrowRight
                  size={18}
                  className="text-zinc-400 group-hover:translate-x-1 transition-transform shrink-0 mt-1.5"
                />
              </h2>
              <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-5">
                {service.lead}
              </p>
              <ul className="flex flex-wrap gap-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="font-mono text-xs leading-6 text-zinc-600 dark:text-zinc-300"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>

        <section aria-labelledby="engagement-heading" className="mb-16">
          <h2
            id="engagement-heading"
            className="text-2xl font-bold mb-4 text-slate-900 dark:text-[#FCF7F2]"
          >
            How I Engage
          </h2>
          <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-6">
            Every service runs on the same three models. New products start with a scoping and
            architecture phase - typically a week - that produces a technical spec you own,
            before any implementation begins.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                type: "Contract",
                desc: "Fixed-scope delivery with defined milestones. Best for well-understood problems.",
              },
              {
                type: "Consulting",
                desc: "Architecture review, stack decisions, or sprint-based support for your existing team.",
              },
              {
                type: "Full-time",
                desc: "Embedded as a full-stack engineer, building and iterating long-term.",
              },
            ].map((eng) => (
              <div
                key={eng.type}
                className="border-t border-zinc-300 pt-5 dark:border-zinc-700"
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

        <section aria-labelledby="how-i-work-heading" className="mb-16">
          <h2
            id="how-i-work-heading"
            className="text-2xl font-bold mb-4 text-slate-900 dark:text-[#FCF7F2]"
          >
            How I Work Best
          </h2>
          <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-6">
            A little context on how I like to start, so we can get to the useful part faster:
          </p>
          <div className="space-y-5">
            {[
              {
                title: "Bring the problem, not just the spec",
                body: "The best results come from understanding what you're solving and who it's for. If the problem is still taking shape, that's completely fine - helping define it is part of the work, and often the most valuable part.",
              },
              {
                title: "Design is part of what I do",
                body: "I'm comfortable working from Figma files or an agreed design direction, and I can take on the visual design myself when a project needs it. If you already have a designer, I'll work to their direction; if you don't, we're not stuck.",
              },
              {
                title: "Open to newer stacks",
                body: "My production experience is concentrated in the three services above. I'm actively building a Web3 sandbox to get hands-on there, so if your project lives in an area I'm still growing into, tell me - we can talk honestly about timing and whether it's a good fit for both of us.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border-l-2 border-primary dark:border-[#FCF7F2]/20 pl-6"
              >
                <h3 className="text-base font-bold mb-2 text-slate-900 dark:text-[#FCF7F2]">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-zinc-200 dark:border-[#1a1a1a] pt-12 text-center">
          <p className="text-zinc-500 dark:text-[#888] mb-2 text-sm">
            Based in Nairobi, Kenya - available for remote and on-site engagements across East Africa and globally.
          </p>
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-[#FCF7F2]">
            Not sure which of these you need?
          </h2>
          <p className="text-zinc-600 dark:text-[#b0b0b0] mb-8 max-w-lg mx-auto">
            Describe the problem rather than the solution. I&apos;ll come back with a clear read
            on scope, approach, and whether I&apos;m the right person for it.
          </p>
          <Link
            href="/#contact"
            className="inline-flex min-h-12 items-center gap-2 border border-primary bg-primary px-6 py-3 font-bold text-base text-primary-foreground transition-colors hover:bg-transparent hover:text-primary dark:hover:text-[#FCF7F2]"
          >
            Start the conversation <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </main>
  );
}
