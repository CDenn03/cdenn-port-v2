import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing to disallow right now — no auth-only or draft routes.
      },
    ],
    sitemap: "https://www.cdenn.dev/sitemap.xml",
  };
}
