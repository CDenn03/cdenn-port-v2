import type { Metadata } from "next";
import { solutions } from "@/src/app/data/portfolio";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";
import SolutionsGrid from "./SolutionsGrid";

export const metadata: Metadata = {
  title: "Software Project Case Studies",
  description:
    "Explore CDenn case studies: the product problems, architecture decisions, and outcomes behind full-stack, fintech, and offline-first software.",
  // Canonical prevents this page appearing as a duplicate or redirect URL in audits.
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    type: "website",
    url: "https://www.cdenn.dev/solutions",
    title: "Software Project Case Studies | CDenn",
    description:
      "Case studies covering full-stack products, fintech systems, and offline-first software.",
    images: ["/opengraph-image"],
  },
};

export default function SolutionsPage() {
  return (
    <main id="main" className="min-h-screen bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Software Project Case Studies",
            url: "https://www.cdenn.dev/solutions",
            description:
              "Case studies covering CDenn's full-stack products, fintech systems, and offline-first software.",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: solutions.map((solution, position) => ({
                "@type": "ListItem",
                position: position + 1,
                name: solution.title,
                url: `https://www.cdenn.dev/solutions/${solution.slug}`,
                description: solution.summary ?? solution.description,
              })),
            },
          }).replaceAll("<", String.raw`\u003c`),
        }}
      />
      <SubpageNav backHref="/" backLabel="Back" />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="mb-10">
            <div className="flex items-baseline gap-3 border-t-2 border-primary pt-5 mb-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-ink">Solutions</h1>
              <span className="text-sm font-semibold text-ink-subtle tabular-nums">
                {solutions.length} projects
              </span>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-ink-muted">
              Every system I have built, and what each one had to get right. An evidence line is
              an implementation fact unless it is labelled otherwise: tested, a design target, a
              demo deployment, or client work under NDA.
            </p>
          </div>

          <SolutionsGrid />
      </div>
    </main>
  );
}
