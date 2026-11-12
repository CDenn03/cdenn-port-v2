import type { MetadataRoute } from "next";
import { solutions } from "@/src/app/data/portfolio";

/**
 * sitemap.ts - served at /sitemap.xml by Next.js
 *
 * Lists every URL on cdenn.dev with priority and change frequency hints.
 * Google doesn't treat these values as strict rules, but they signal
 * which pages matter most.
 *
 * When you add new routes (blog posts, service pages, etc.), add entries here.
 * The solution detail pages are generated dynamically from the portfolio data
 * so the sitemap always stays in sync without manual updates.
 *
 * `lastModified` is deliberately omitted. Stamping `new Date()` at build time
 * told crawlers that every page changed on every deploy, which is false and
 * devalues the signal. Set it per route only when a route has a real,
 * known modification date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Must match the canonical domain Vercel serves - www.cdenn.dev (naked redirects there).
  // If we list the naked domain here, every sitemap entry would be a redirect URL,
  // wasting crawl budget and triggering Semrush's "sitemap contains redirecting URLs" error.
  const base = "https://www.cdenn.dev";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/about`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/solutions`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/services/multi-tenant-saas`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services/fintech-automation`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services/offline-first-apps`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/writing`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/privacy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((project) => ({
    url: `${base}/solutions/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...solutionRoutes];
}
