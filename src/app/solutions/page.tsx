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
    <main className="min-h-screen transition-colors duration-300 bg-[#FCF7F2] text-slate-900 dark:bg-[#0a0a0a] dark:text-[#FCF7F2]">
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

      <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-12">
            <div className="flex items-baseline gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">Solutions</h1>
              <span className="text-sm font-medium text-zinc-400 dark:text-[#555]">
                {solutions.length} projects
              </span>
            </div>
            <p className="text-lg text-zinc-500 dark:text-[#888] max-w-2xl">
              A look at the products and systems I&#39;ve built - the problem behind each one,
              how I approached it, and what came out the other side.
            </p>
          </div>

          <SolutionsGrid />
      </div>
    </main>
  );
}
