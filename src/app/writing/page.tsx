import type { Metadata } from "next";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";

export const metadata: Metadata = {
  title: "Writing | CDenn",
  description: "Notes on fintech engineering, system design, and reliable software for East African operations.",
};

const plannedArticles = [
  { tag: "Payments", title: "Building reliable payments API integrations at scale", note: "Idempotency, callback handling, and reconciliation patterns." },
  { tag: "Offline-first", title: "System design for field applications", note: "Local data, durable queues, and conflict resolution when connectivity is intermittent." },
  { tag: "Product systems", title: "Permission-aware operations software", note: "How useful automation stays inside real tenant and role boundaries." },
];

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-[#FCF7F2] text-slate-900 dark:bg-[#0a0a0a] dark:text-[#FCF7F2]">
      <SubpageNav backHref="/" backLabel="Back" />
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <header className="border-t-2 border-primary pt-5">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">Writing</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] md:text-6xl">Notes from the work.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">Technical notes will be published here when there is something useful and specific to share, not as filler for a content calendar.</p>
        </header>
        <section className="mt-16 border-t border-zinc-300 dark:border-zinc-700" aria-label="Topics in progress">
          {plannedArticles.map((article, index) => (
            <article key={article.title} className="grid gap-3 border-b border-zinc-300 py-7 md:grid-cols-[2rem_10rem_1fr] dark:border-zinc-700">
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">0{index + 1}</p>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">{article.tag}</p>
              <div><h2 className="font-bold text-slate-900 dark:text-[#FCF7F2]">{article.title}</h2><p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{article.note}</p></div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
