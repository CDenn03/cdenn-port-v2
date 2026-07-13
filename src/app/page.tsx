
import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";
import { sameAsUrls } from "@/src/app/data/social";

export const metadata: Metadata = {
  title: "CDenn | Full-Stack Software Developer",
  description:
    "Full-stack software developer based in Nairobi, Kenya. Specialising in Next.js, TypeScript, and AI-integrated web applications. Open to remote roles and freelance projects.",
  alternates: {
    canonical: "/",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dennis Ndung'u",
  url: "https://www.cdenn.dev",
  jobTitle: "Full-Stack Software Developer",
  description:
    "Full-stack software developer based in Nairobi, Kenya. Specializing in Next.js App Router architecture, M-Pesa Daraja API integrations, and AI-integrated web applications. Available for full-time roles, contracts, and consulting engagements globally.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "React",
    "M-Pesa Daraja API",
    "Fintech Systems",
    "AI-integrated web applications",
    "PostgreSQL",
    "Prisma ORM",
    "Flutter",
    "Chrome Extensions",
  ],
  sameAs: sameAsUrls,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CDenn",
  url: "https://www.cdenn.dev",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replaceAll('<', String.raw`\u003c`),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replaceAll('<', String.raw`\u003c`),
        }}
      />
      <PortfolioClient />
    </>
  );
}
