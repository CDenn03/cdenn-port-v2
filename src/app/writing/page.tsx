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
    <main className="min-h-screen bg-[#FCF7F2] dark:bg-[#0a0a0a] px-6 pt-24 pb-16">
      <div className="max-w-2xl mx-auto">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors mb-8"
        >
          Back to portfolio
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-[#FCF7F2]">Writing</h1>
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
            Coming Soon
          </span>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed">
          Articles on fintech engineering, system design, and building
          production software for East African markets.
        </p>

        <div className="space-y-px border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          {plannedArticles.map((item, i) => (
            <div
              key={i}
              className="px-5 py-4 bg-white dark:bg-[#111111] opacity-50 select-none flex items-start justify-between gap-4"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">
                  {item.tag}
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-[#FCF7F2]">
                  {item.title}
                </p>
              </div>
              <div className="shrink-0 mt-1">
                <div className="h-2 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
