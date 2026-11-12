import type { Metadata } from "next";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on fintech engineering, system design, and reliable software for East African operations.",
  alternates: {
    canonical: "/writing",
  },
};

const plannedArticles = [
  { tag: "Payments", title: "Building reliable payments API integrations at scale", note: "Idempotency, callback handling, and reconciliation patterns." },
  { tag: "Offline-first", title: "System design for field applications", note: "Local data, durable queues, and conflict resolution when connectivity is intermittent." },
  { tag: "Product systems", title: "Permission-aware operations software", note: "How useful automation stays inside real tenant and role boundaries." },
];

export default function WritingPage() {
  return (
    <main id="main" className="min-h-screen bg-background text-foreground">
      <SubpageNav backHref="/" backLabel="Back" />
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <header className="border-t-2 border-primary pt-5">
          <h1 className="text-4xl font-bold tracking-[-0.03em] md:text-6xl">Notes from the work.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Technical notes will be published here when there is something useful and specific to share, not as filler for a content calendar.</p>
        </header>
        <section className="mt-16 border-t border-border" aria-label="Topics in progress">
          {plannedArticles.map((article, index) => (
            <article key={article.title} className="grid gap-3 border-b border-border py-7 md:grid-cols-[2rem_10rem_1fr]">
              <p className="font-mono text-xs text-muted-foreground">0{index + 1}</p>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">{article.tag}</p>
              <div><h2 className="font-bold text-foreground">{article.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{article.note}</p></div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
