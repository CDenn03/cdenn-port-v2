import type { Metadata } from "next";
import { solutions } from "@/src/app/data/portfolio";
import { SubpageNav } from "@/src/app/components/layout/SubpageNav";
import SolutionsGrid from "./SolutionsGrid";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Products and systems built by CDenn - the problem behind each one, how it was approached, and what came out the other side.",
  // Canonical prevents this page appearing as a duplicate or redirect URL in audits.
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    type: "website",
    url: "https://www.cdenn.dev/solutions",
    title: "Solutions",
    description:
      "Products and systems built by CDenn - the problem behind each one, how it was approached, and what came out the other side.",
  },
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen transition-colors duration-300 bg-[#FCF7F2] text-slate-900 dark:bg-[#0a0a0a] dark:text-[#FCF7F2]">
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
