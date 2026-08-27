import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing | CDenn",
  description: "Articles on fintech engineering, system design, and building for East African markets.",
};

const plannedArticles = [
  { tag: "Fintech", title: "Building reliable M-Pesa integrations at scale" },
  { tag: "Engineering", title: "System design for offline-first mobile apps" },
  { tag: "Frontend", title: "Performance patterns in Next.js for low-bandwidth users" },
];

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-[#FCF7F2] dark:bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto px-6 pt-20 pb-16">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors mb-10"
        >
          Back to portfolio
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-[#FCF7F2] mb-3">
          Writing
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
          Articles on fintech engineering, system design, and building
          production software for East African markets.
        </p>

        {/* Article list — blurred with Coming Soon overlay */}
        <div className="relative">

          {/* Article rows — behind the overlay */}
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden select-none">
            {plannedArticles.map((item, i) => (
              <div
                key={i}
                className="px-5 py-5 bg-white dark:bg-[#111111] flex items-start justify-between gap-4"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5 block">
                    {item.tag}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                    {item.title}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">8 min read</p>
                </div>
                <div className="shrink-0 w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 mt-0.5" />
              </div>
            ))}
          </div>

          {/* Coming Soon overlay */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
          >
            {/* Frosted glass layer */}
            <div className="absolute inset-0 bg-[#FCF7F2]/60 dark:bg-[#0a0a0a]/60 rounded-xl" />

            {/* Watermark text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span
                className="text-[clamp(3rem,12vw,6rem)] font-black uppercase tracking-tight leading-none text-slate-900/8 dark:text-white/8 select-none pointer-events-none"
                style={{ letterSpacing: "-0.04em" }}
              >
                Coming
              </span>
              <span
                className="text-[clamp(3rem,12vw,6rem)] font-black uppercase tracking-tight leading-none text-slate-900/8 dark:text-white/8 select-none pointer-events-none"
                style={{ letterSpacing: "-0.04em" }}
              >
                Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
