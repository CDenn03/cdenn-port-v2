import type { Metadata } from "next";
import Link from "next/link";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Multi-Tenant SaaS Architecture & RBAC",
  description:
    "Multi-tenant SaaS platforms with tenant isolation, role-based access control, audit logging, and enforced approval workflows. Next.js, TypeScript, PostgreSQL.",
  alternates: {
    canonical: "/services/multi-tenant-saas",
  },
  openGraph: {
    type: "website",
    url: "https://www.cdenn.dev/services/multi-tenant-saas",
    title: "Multi-Tenant SaaS Architecture & RBAC | CDenn",
    description:
      "Multi-tenant SaaS platforms with tenant isolation, RBAC, audit logging, and enforced approval workflows.",
    images: ["/opengraph-image"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Multi-Tenant SaaS Architecture & Platform Engineering",
  description:
    "Designing and building multi-tenant SaaS platforms: tenant isolation, role-based access control, action-level audit logging, and approval workflows enforced from the UI through to the database.",
  url: "https://www.cdenn.dev/services/multi-tenant-saas",
  provider: {
    "@type": "Person",
    name: "CDenn",
    url: "https://www.cdenn.dev",
    jobTitle: "Full-Stack Software Developer",
  },
  areaServed: ["Kenya", "East Africa", "Worldwide"],
  serviceType: "Multi-Tenant SaaS Architecture & Platform Engineering",
  offers: {
    "@type": "Offer",
    description:
      "Multi-tenant architecture design, RBAC and permission modelling, audit logging, approval workflow implementation, and platform hardening on a contract, consulting, or full-time basis.",
  },
};

const capabilities = [
  {
    title: "Tenant Isolation That Holds Under Audit",
    body: "Every query, every endpoint, every background job scoped to a tenant - enforced at the data-access layer rather than remembered by each developer at each call site. I have shipped both JWT-claim-based isolation and per-tenant database routing, and the right choice depends on your compliance posture, not on fashion.",
  },
  {
    title: "Role-Based Access Control With Real Hierarchies",
    body: "Most RBAC implementations fail the same way: a permission grants an action but carries no notion of whose data the caller may act on, so any tenant's admin can reach across the boundary. I model permissions against the organisation's actual hierarchy and enforce them server-side, where the UI cannot be the only thing standing in the way.",
  },
  {
    title: "Approval & Maker-Checker Workflows",
    body: "Financial and regulated systems need a second pair of eyes on a change, not a trust-the-operator model. I build staged approval pipelines - draft, review, sign-off, with a return path for rejections - enforced end to end so a state transition is impossible to skip by calling the API directly.",
  },
  {
    title: "Action-Level Audit Logging",
    body: "A durable record of who did what, to which record, when, and from where. Built in as infrastructure rather than bolted on per feature, so new functionality is auditable by default and your team is not reconstructing history from application logs during an incident.",
  },
  {
    title: "Per-Tenant Theming & Configuration",
    body: "One codebase serving multiple client organisations, each with its own branding, products, and configuration - without forking per tenant. Theme-aware component libraries with tenant-scoped configs keep onboarding a new client a configuration change rather than a release.",
  },
  {
    title: "Performance At Realistic Data Volumes",
    body: "Platform tables grow faster than anyone plans for. Virtualised data grids, server-side pagination and filtering, and query patterns that stay flat as records accumulate - so the admin screens that worked in demo still work two years in.",
  },
];

const whyItems = [
  "Tenant-boundary bugs are silent: the system looks correct until one client sees another's data",
  "Permission models bolted on after launch require touching every endpoint you already shipped",
  "Approval workflows enforced only in the UI are not enforced at all",
  "Audit requirements usually arrive from compliance after the architecture is already fixed",
  "Retrofitting isolation into a single-tenant codebase costs more than building it in from the start",
];

export default function MultiTenantSaasPage() {
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
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400 mb-4">
              Services
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.02] mb-6 text-slate-900 dark:text-[#FCF7F2]">
              Multi-Tenant SaaS Architecture &amp; Platform Engineering
            </h1>

            <p className="text-xl text-zinc-600 dark:text-[#b0b0b0] leading-relaxed max-w-2xl">
              I design and build multi-tenant platforms where tenant isolation, role-based
              permissions, approval workflows, and audit trails are enforced in the architecture -
              not left as conventions your team has to remember at every call site.
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
              Why This Is Worth Getting Right Early
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-6">
              Multi-tenancy is an architectural decision, not a feature. The cost of getting it
              wrong is rarely a visible bug - it is a quiet one, discovered by a client rather
              than by your test suite, in a system where every endpoint already assumes the wrong
              model.
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
              Production-proven on platforms I have led or built end to end:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js",
                "TypeScript",
                "Node.js",
                "Spring Boot",
                "Prisma ORM",
                "PostgreSQL",
                "JWT / Auth.js",
                "RBAC",
                "Audit Logging",
                "TanStack Query",
                "Docker",
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
              className="text-2xl font-bold mb-6 text-slate-900 dark:text-[#FCF7F2]"
            >
              See It In Practice
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Bancassurance Platform",
                  desc: "Multi-tenant insurance SaaS for a financial services provider. I led the frontend architecture: JWT-based tenant isolation, action-level audit logging, and a maker-checker approval workflow across 7 entity types, enforced from the UI through to the API.",
                  href: "/solutions/bancassurance-platform",
                },
                {
                  title: "Steward",
                  desc: "Financial governance platform modelling a real approval hierarchy - draft, finance review, chair sign-off, with a needs-changes return path - over Prisma and PostgreSQL with role-scoped permissions throughout.",
                  href: "/solutions/steward",
                },
                {
                  title: "WarehouseLens",
                  desc: "Multi-tenant warehouse platform built solo: a two-level identity model where a platform tenant provisions the others, 6 roles across 21 permissions, and scope enforcement that reaches individual warehouses - with cross-tenant and self-lockout guards under test.",
                  href: "/solutions/warehouselens",
                },
              ].map((proj) => (
                <Link
                  key={proj.title}
                  href={proj.href}
                  className="group border-t border-zinc-300 pt-5 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-[#2a2a2a] transition-colors"
                >
                  <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-[#FCF7F2] flex items-center gap-2">
                    {proj.title}
                    <ArrowRight
                      size={14}
                      className="text-zinc-400 group-hover:translate-x-1 transition-transform shrink-0"
                    />
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-[#888] leading-relaxed">
                    {proj.desc}
                  </p>
                </Link>
              ))}
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
                  desc: "Fixed-scope platform work - building the multi-tenant foundation, or a permission and audit layer over an existing system.",
                },
                {
                  type: "Consulting",
                  desc: "Architecture review before you commit: tenancy model, permission design, and where your current approach will bite.",
                },
                {
                  type: "Full-time",
                  desc: "Embedded on your engineering team owning the platform layer long-term.",
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
              Building a platform that has to serve many clients?
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] mb-8 max-w-lg mx-auto">
              Whether you are designing the tenancy model from scratch, retrofitting permissions
              into a system that shipped without them, or want a second opinion before you
              commit - let&apos;s talk through it.
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
