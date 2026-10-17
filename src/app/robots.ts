import type { MetadataRoute } from "next";

const allowedAiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Anthropic-AI",
  "PerplexityBot",
  "Bytespider",
  "CCBot",
  "Google-Extended",
  "FacebookBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing to disallow right now - no auth-only or draft routes.
      },
      ...allowedAiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://www.cdenn.dev/sitemap.xml",
  };
}
