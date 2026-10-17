import type { Metadata } from "next";
import Link from "next/link";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Offline-First App Development",
  description:
    "Offline-first web and mobile apps that keep working without a network and sync cleanly when it returns. Flutter, Drift, Dexie, IndexedDB, conflict resolution.",
  alternates: {
    canonical: "/services/offline-first-apps",
  },
  openGraph: {
    type: "website",
    url: "https://www.cdenn.dev/services/offline-first-apps",
    title: "Offline-First App Development | CDenn",
    description:
      "Offline-first web and mobile apps that keep working without a network and sync cleanly when it returns.",
    images: ["/opengraph-image"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Offline-First & Field Application Development",
  description:
    "Building web and mobile applications that function fully without connectivity and reconcile reliably when it returns - local-first storage, background sync queues, and conflict resolution for field and low-connectivity environments.",
  url: "https://www.cdenn.dev/services/offline-first-apps",
  provider: {
    "@type": "Person",
    name: "CDenn",
    url: "https://www.cdenn.dev",
    jobTitle: "Full-Stack Software Developer",
  },
  areaServed: ["Kenya", "East Africa", "Worldwide"],
  serviceType: "Offline-First Application Development",
  offers: {
    "@type": "Offer",
    description:
      "Offline-first architecture design, local-first data layers, background sync and conflict resolution, and field-ready mobile applications on a contract, consulting, or full-time basis.",
  },
};

const capabilities = [
  {
    title: "Local-First Data Layers",
    body: "The local database is the source of truth the user interacts with, not a cache in front of the network. I have built this on Drift and sqflite for Flutter and on Dexie over IndexedDB for the web - reads and writes always resolve locally, so the UI never blocks on a request that may not complete.",
  },
  {
    title: "Background Sync Queues",
    body: "Mutations made offline are queued durably and replayed when connectivity returns, in order, exactly once. The queue survives app restarts and process death, because a field worker closing the app is not a reason to lose a morning's data entry.",
  },
  {
    title: "Conflict Resolution Strategies",
    body: "Two devices editing the same record while both offline is the normal case, not the edge case. I design the resolution strategy explicitly - server-timestamp authority, field-level merges, or operator review for the records where silently picking a winner is unacceptable.",
  },
  {
    title: "Financial Data Consistency Offline",
    body: "Payments are the hardest thing to sync, because a double-count is worse than a delay. Reconciling queued local records against payment callbacks received while the device was offline needs idempotency built into the sync layer, not retried hopefully.",
  },
  {
    title: "Native Capability Bridges",
    body: "Field apps usually need something the framework does not expose - NFC, exact alarm scheduling that survives reboot, background location, hardware peripherals. I build typed bridges between Flutter and native Android so the platform-specific half is contained rather than scattered.",
  },
  {
    title: "Clean Architecture For Testability",
    body: "Sync logic is where bugs hide and where reproducing a failure matters most. A domain layer with no framework or network dependencies keeps the business rules and the sync behaviour testable in isolation, away from a real device and a real connection.",
  },
];

const whyItems = [
  "Connectivity in the field is not slow - it is intermittent, which breaks different assumptions",
  "A loading spinner is an acceptable UX on a desk and an unacceptable one on a site visit",
  "Sync bugs surface as missing or duplicated records, usually noticed days later",
  "Retrofitting offline support means rewriting the data layer the whole app already depends on",
  "Teams used to always-on connectivity tend to model offline as an error state rather than a mode",
];

export default function OfflineFirstAppsPage() {
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
            <p className="text-xs font-bold uppercase tracking-widest text-primary dark:text-[#888888] mb-4">
              Services
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-900 dark:text-[#FCF7F2]">
              Offline-First &amp; Field Application Development
            </h1>

            <p className="text-xl text-zinc-600 dark:text-[#b0b0b0] leading-relaxed max-w-2xl">
              I build applications that work fully without a network and reconcile cleanly when
              one returns - for field teams, rural operations, and anywhere a dropped connection
              cannot be allowed to cost a day&apos;s work.
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
              Why Offline-First Is Its Own Discipline
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] leading-relaxed mb-6">
              Adding a cache to an online app does not make it offline-first. The difference is
              architectural: where the source of truth lives, what happens to a write that cannot
              reach the server, and who decides the outcome when two offline edits disagree.
              Those decisions sit at the bottom of the stack, which is why they are expensive to
              change later.
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
              Production-proven across four offline-first applications I have built and maintain:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Flutter",
                "Dart",
                "Drift",
                "sqflite",
                "Riverpod",
                "Dexie (IndexedDB)",
                "Next.js",
                "TypeScript",
                "PostgreSQL",
                "Kotlin / Android",
                "Pigeon",
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
              className="text-2xl font-bold mb-6 text-slate-900 dark:text-[#FCF7F2]"
            >
              See It In Practice
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Ndoa Plan",
                  desc: "Offline-first event coordination platform with a Dexie local store, a background sync queue, and payment-provider callback reconciliation against guest contribution records - operating fully offline during live events.",
                  href: "/solutions/ndoa-plan",
                },
                {
                  title: "GIK Souls App",
                  desc: "Field follow-up app on a strict clean architecture - pure-Dart domain layer, local-first reads from Drift, and mutations enqueued for a Django backend when connectivity returns.",
                  href: "/solutions/gik-souls-app",
                },
                {
                  title: "Sefer",
                  desc: "Fully offline Android PDF reader with persistent annotations - custom coordinate mapping over the render pipeline and debounced SQLite writes for rapid library mutations.",
                  href: "/solutions/sefer",
                },
                {
                  title: "Near Field",
                  desc: "NFC-dismissed alarm clock where native Android owns exact scheduling, reboot recovery, and the lock-screen ringing flow, bridged to Flutter through typed Pigeon contracts.",
                  href: "/solutions/near-field",
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
                  desc: "Fixed-scope delivery of an offline-capable app, or an offline data layer added to an existing product.",
                },
                {
                  type: "Consulting",
                  desc: "Design review of your sync model and conflict strategy before it reaches production data.",
                },
                {
                  type: "Full-time",
                  desc: "Embedded on your team owning the mobile and sync layer long-term.",
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
              Does your app need to work where the network does not?
            </h2>
            <p className="text-zinc-600 dark:text-[#b0b0b0] mb-8 max-w-lg mx-auto">
              Tell me where your users are, what they need to do without a connection, and what
              cannot be allowed to go wrong when two of them sync at once. I&apos;ll come back
              with a concrete read on the approach.
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
