import type { Metadata } from "next";
import Link from "next/link";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Payments API Integrations & Fintech Automation",
  description:
    "Payments API integrations, webhook callbacks, and payment automation for East African businesses. Next.js & Node.js.",
  alternates: {
    canonical: "/services/fintech-automation",
  },
  openGraph: {
    type: "website",
    url: "https://www.cdenn.dev/services/fintech-automation",
    title: "Payments API Integrations & Fintech Automation",
    description:
      "Payments API integrations and payment automation for East African businesses. Built with Next.js.",
    images: ["/opengraph-image"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Payments API Integrations & Fintech Automation",
  description:
    "Specialized fintech engineering for East African businesses. Real-time payments API integrations, webhook callback reconciliation, multi-tenant payment ledgers, and automated financial workflows.",
  url: "https://www.cdenn.dev/services/fintech-automation",
  provider: {
    "@type": "Person",
    name: "CDenn",
    url: "https://www.cdenn.dev",
    jobTitle: "Full-Stack Software Developer",
  },
  areaServed: ["Kenya", "East Africa", "Worldwide"],
  serviceType: "Fintech Engineering & Payment Integration",
  offers: {
    "@type": "Offer",
    description:
      "Payments API integrations, payment flows, callback reconciliation, multi-tenant payment systems, and fintech automation on a contract or consulting basis.",
  },
};

const capabilities = [
  {
    title: "Payments API Webhooks & Callback Handling",
    body: "End-to-end payment API implementation - from initiating customer payment requests to receiving, validating, and persisting provider callback payloads in real time. Every edge case covered: duplicate callbacks, timeout retries, and failed transaction recovery.",
  },
  {
    title: "Automated Ledger Reconciliation",
    body: "Matching payment-provider transaction records against internal ledger entries automatically, flagging discrepancies, and generating reconciliation reports. Built for businesses that process high volumes of contributions, subscriptions, or event payments where every shilling must be accounted for.",
  },
  {
    title: "Multi-Tenant Payment Architecture",
    body: "Payment systems that serve multiple clients or tenants from a single codebase - with strict data isolation, per-tenant payment-provider configuration, and role-based access to financial records. Designed for SaaS platforms, bancassurance systems, and aggregator models.",
  },
  {
    title: "Offline-First Payment Sync",
    body: "Applications that queue transactions locally when connectivity is unreliable and reconcile with the backend once online - critical for field agents, rural event coordinators, and any workflow where network dropouts are common.",
  },
  {
    title: "Webhook Infrastructure & Security",
    body: "Hardened webhook endpoints that validate provider-signed payloads, handle idempotency correctly, and integrate with queue systems to process callbacks asynchronously - preventing data loss under high transaction volumes.",
  },
];

const whyItems = [
  "Payment APIs often power core transactions - integrating them incorrectly costs real money",
  "Payment providers have callback timing and result-code edge cases that only surface in production",
  "Most generic developers treat it as a simple HTTP call - it requires domain-specific handling",
  "I've built live reconciliation systems where contributions arrive faster than anyone can track them by hand",
];

export default function FintechAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />

      <main className="min-h-screen bg-[#FCF7F2] text-slate-900 dark:bg-[#0a0a0a] dark:text-[#FCF7F2]">
        <SubpageNav backHref="/services" backLabel="All services" />

        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.02] mb-6 text-slate-900 dark:text-[#FCF7F2]">
              Payments API Integrations &amp; Fintech Automation
            </h1>

            <p className="text-xl text-zinc-600 dark:text-[#b0b0b0] leading-relaxed max-w-2xl">
              I build bulletproof payment API pipelines with real-time callback reconciliation,
              automated ledger tracking, and multi-tenant payment architectures - for businesses
              in Kenya and across East Africa that cannot afford missing transactions.
            </p>
          </div>

          <section aria-labelledby="capabilities-heading" className="mb-16">
            <h2
              id="capabilities-heading"
              className="text-2xl font-bold mb-8 text-slate-900 dark:text-[#FCF7F2]"
            >
              Core Capabilities
            </h2>

            <div className="space-y-8">
              {capabilities.map((cap, i) => (
                <div
                  key={cap.title}
                  className="border-l-2 border-primary dark:border-[#FCF7F2]/20 pl-6"
                >
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-[#FCF7F2]">
                    {i + 1}. {cap.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed">
                    {cap.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="why-heading" className="mb-16">
            <h2
              id="why-heading"
              className="text-2xl font-bold mb-6 text-slate-900 dark:text-[#FCF7F2]"
            >
              Why Payments API Integrations Are Specialized Work
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-6">
              Integrating a payment API correctly is not the same as calling a REST API and calling it
              done. Payment providers have real-world complexity that only surfaces under production
              load - callback race conditions, result codes that require domain knowledge to
              interpret, and reconciliation logic that must handle delayed or duplicate payloads
              without double-counting or data loss.
            </p>
            <ul className="space-y-3">
              {whyItems.map((item) => (
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

          <section aria-labelledby="tech-heading" className="mb-16">
            <h2
              id="tech-heading"
              className="text-2xl font-bold mb-6 text-slate-900 dark:text-[#FCF7F2]"
            >
              Technologies &amp; Stack
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-6">
              Fintech work on this stack is production-proven through projects I own and maintain:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js",
                "TypeScript",
                "Node.js",
                "Payments APIs",
                "Prisma ORM",
                "PostgreSQL",
                "Supabase",
                "TanStack Query",
                "Dexie (IndexedDB)",
                "Webhooks",
                "REST APIs",
              ].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs leading-6 text-zinc-600 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section aria-labelledby="proof-heading" className="mb-16">
            <h2
              id="proof-heading"
              className="text-2xl font-bold mb-4 text-slate-900 dark:text-[#FCF7F2]"
            >
              See It In Practice
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-6">
              Ndoa Plan is an offline-first wedding coordination platform I built for Kenyan
              event coordinators. It reconciles payment-provider callbacks against guest
              contribution records in real time, operates fully offline during events, and syncs
              when connectivity returns - with a conflict-resolution strategy that ensures no
              payment is lost or double-counted.
            </p>
            <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-6">
              The multi-tenant side of this work is proven on a bancassurance platform I led the
              frontend architecture for - JWT-based tenant isolation, action-level audit logging,
              and a maker-checker approval workflow across 7 entity types. If the platform layer
              is your main concern rather than the payment rails, that has its own page:{" "}
              <Link
                href="/services/multi-tenant-saas"
                className="font-bold text-slate-900 dark:text-[#FCF7F2] underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Multi-Tenant SaaS &amp; Platform Engineering
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href="/solutions/ndoa-plan"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-[#FCF7F2] underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Read the Ndoa Plan case study <ArrowRight size={14} />
              </Link>
              <Link
                href="/solutions/bancassurance-platform"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-[#FCF7F2] underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Read the Bancassurance case study <ArrowRight size={14} />
              </Link>
              <Link
                href="/solutions/steward"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-[#FCF7F2] underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Read the Steward case study <ArrowRight size={14} />
              </Link>
            </div>
          </section>

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
                  desc: "Fixed-scope fintech integration work with clear deliverables and timelines.",
                },
                {
                  type: "Consulting",
                  desc: "Architecture review, technical guidance, or team support on payments API integration projects.",
                },
                {
                  type: "Full-time",
                  desc: "Embedded on your engineering team building and maintaining payment infrastructure.",
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

          <div className="border-t border-zinc-200 dark:border-[#1a1a1a] pt-12 text-center">
            <p className="text-zinc-500 dark:text-[#888] mb-2 text-sm">
              Based in Nairobi, Kenya - available for remote and on-site engagements across East Africa and globally.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-[#FCF7F2]">
              Have a fintech project in mind?
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] mb-8 max-w-lg mx-auto">
              Whether you need a payment integration from scratch, a reconciliation system
              for an existing platform, or a technical review of your current payment API setup -
              let&apos;s talk through it.
            </p>
            <Link
              href="/#contact"
              className="inline-flex min-h-12 items-center gap-2 border border-primary bg-primary px-6 py-3 font-bold text-base text-primary-foreground transition-colors hover:bg-transparent hover:text-primary dark:hover:text-[#FCF7F2]"
            >
              Get in touch <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
