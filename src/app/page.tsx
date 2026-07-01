
import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

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
  name: "CDenn",
  url: "https://cdenn.dev",
  jobTitle: "Full-Stack Software Developer",
  description:
    "Full-stack software developer based in Nairobi, Kenya. Specialising in Next.js, TypeScript, and AI-integrated web applications.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [
    "https://github.com/CDenn03",
    "https://www.linkedin.com/in/cdenn03",
    "https://x.com/C_MDennis",
    "https://medium.com/@cdenn",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CDenn",
  url: "https://cdenn.dev",
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
