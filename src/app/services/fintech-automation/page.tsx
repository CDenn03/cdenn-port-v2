import type { Metadata } from "next";
import Link from "next/link";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "M-Pesa Daraja API Integration & Fintech Automation",
  description:
    "Specialized fintech engineering for East African businesses. Real-time M-Pesa Daraja API integrations, STK push callback reconciliation, multi-tenant payment ledgers, and automated financial workflows built on Next.js and Node.js.",
  alternates: {
    canonical: "/services/fintech-automation",
  },
  openGraph: {
    type: "website",
    url: "https://www.cdenn.dev/services/fintech-automation",
    title: "M-Pesa Daraja API Integration & Fintech Automation",
    description:
      "Specialized fintech engineering for East African businesses. Real-time M-Pesa Daraja API integrations, STK push callback reconciliation, and automated financial workflows.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "M-Pesa Daraja API Integration & Fintech Automation",
  description:
    "Specialized fintech engineering for East African businesses. Real-time M-Pesa Daraja API integrations, STK push callback reconciliation, multi-tenant payment ledgers, and automated financial workflows.",
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
      "M-Pesa Daraja API integration, STK push flows, callback reconciliation, multi-tenant payment systems, and fintech automation on a contract or consulting basis.",
  },
};

const capabilities = [
  {
    title: "M-Pesa STK Push & Callback Handling",
    body: "End-to-end implementation of the Daraja STK Push flow - from initiating payment requests on behalf of customers to receiving, validating, and persisting M-Pesa callback payloads in real time. Every edge case covered: duplicate callbacks, timeout retries, and failed transaction recovery.",
  },
  {
    title: "Automated Ledger Reconciliation",
    body: "Matching M-Pesa transaction records against internal ledger entries automatically, flagging discrepancies, and generating reconciliation reports. Built for businesses that process high volumes of contributions, subscriptions, or event payments where every shilling must be accounted for.",
  },
  {
    title: "Multi-Tenant Payment Architecture",
    body: "Payment systems that serve multiple clients or tenants from a single codebase - with strict data isolation, per-tenant M-Pesa shortcode configuration, and role-based access to financial records. Designed for SaaS platforms, bancassurance systems, and aggregator models.",
  },
  {
    title: "Offline-First Payment Sync",
    body: "Applications that queue transactions locally when connectivity is unreliable and reconcile with the backend once online - critical for field agents, rural event coordinators, and any workflow where network dropouts are common.",
  },
  {
    title: "Webhook Infrastructure & Security",
    body: "Hardened webhook endpoints that validate Safaricom-signed payloads, handle idempotency correctly, and integrate with queue systems to process callbacks asynchronously - preventing data loss under high transaction volumes.",
  },
];

const whyItems = [
  "M-Pesa is used by 90%+ of Kenya's adult population - not integrating it correctly costs real money",
  "Daraja API has quirks (callback timing, result code edge cases) that only surface in production",
  "Most generic developers treat it as a simple HTTP call - it requires domain-specific handling",
  "I've built reconciliation systems that handle live events with hundreds of simultaneous payments",
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
        <SubpageNav backHref="/" backLabel="Back" />

        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-primary dark:text-[#888888] mb-4">
              Services
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-900 dark:text-[#FCF7F2]">
              M-Pesa Daraja API Integration &amp; Fintech Automation
            </h1>

            <p className="text-xl text-zinc-600 dark:text-[#b0b0b0] leading-relaxed max-w-2xl">
              I build bulletproof M-Pesa payment pipelines with real-time callback reconciliation,
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
              Why M-Pesa Integration Is Specialized Work
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-6">
              Integrating M-Pesa correctly is not the same as calling a REST API and calling it
              done. The Daraja API has real-world complexity that only surfaces under production
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
                "M-Pesa Daraja API",
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
                  className="px-3 py-1.5 rounded text-sm font-medium bg-zinc-100 text-slate-700 border border-zinc-200 dark:bg-[#222222] dark:text-[#FCF7F2] dark:border-[#333333]"
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
              event coordinators. It reconciles M-Pesa STK push callbacks against guest
              contribution records in real time, operates fully offline during events, and syncs
              when connectivity returns - with a conflict-resolution strategy that ensures no
              payment is lost or double-counted.
            </p>
            <Link
              href="/solutions/ndoa-plan"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-[#FCF7F2] underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              Read the Ndoa Plan case study <ArrowRight size={14} />
            </Link>
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
                  desc: "Architecture review, technical guidance, or team support on M-Pesa integration projects.",
                },
                {
                  type: "Full-time",
                  desc: "Embedded on your engineering team building and maintaining payment infrastructure.",
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

          <div className="border-t border-zinc-200 dark:border-[#1a1a1a] pt-12 text-center">
            <p className="text-zinc-500 dark:text-[#888] mb-2 text-sm">
              Based in Nairobi, Kenya - available for remote and on-site engagements across East Africa and globally.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-[#FCF7F2]">
              Have a fintech project in mind?
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] mb-8 max-w-lg mx-auto">
              Whether you need a payment integration from scratch, a reconciliation system
              for an existing platform, or a technical review of your current Daraja setup -
              let&apos;s talk through it.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Get in touch <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
