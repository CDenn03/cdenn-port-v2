import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";
import { sameAsUrls } from "@/src/app/data/social";

export const metadata: Metadata = {
  title: "CDenn | Full-Stack Software Developer",
  description:
    "CDenn is Dennis Ndung'u, a full-stack developer in Nairobi. Next.js, TypeScript, M-Pesa integrations, and AI tools.",
  alternates: {
    canonical: "/",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dennis Ndung'u",
  alternateName: "CDenn",
  url: "https://www.cdenn.dev",
  jobTitle: "Full-Stack Software Developer",
  description:
    "CDenn is the professional brand and online identity of Dennis Ndung'u, a full-stack software developer based in Nairobi, Kenya. CDenn specialises in Next.js App Router architecture, M-Pesa Daraja API integrations, and AI-integrated web applications. Available for full-time roles, contracts, and consulting engagements globally.",
  image: "https://www.cdenn.dev/assets/images/port-photo.png",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.cdenn.dev/#organization",
  name: "CDenn",
  alternateName: ["cdenn", "CDENN", "C-Denn"],
  url: "https://www.cdenn.dev",
  logo: "https://www.cdenn.dev/assets/logo/CDenn.png",
  description:
    "CDenn is a software development brand founded by Dennis Ndung'u, offering full-stack web development, fintech automation, and AI integration services. CDenn is not affiliated with the scientific term cDENN (DENN protein domain).",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Dennis Ndung'u",
    alternateName: "CDenn",
  },
  sameAs: sameAsUrls,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://www.cdenn.dev/#contact",
    availableLanguage: ["English", "Swahili"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.cdenn.dev/#website",
  name: "CDenn",
  alternateName: "CDenn Developer Portfolio",
  url: "https://www.cdenn.dev",
  description:
    "Official website of CDenn, the professional software development brand of Dennis Ndung'u.",
  publisher: {
    "@id": "https://www.cdenn.dev/#organization",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is CDenn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CDenn is the professional brand name of Dennis Ndung'u, a full-stack software developer based in Nairobi, Kenya. CDenn specialises in Next.js, TypeScript, React, and AI-integrated web applications. The brand represents Dennis's freelance and consulting work in web development and fintech automation.",
      },
    },
    {
      "@type": "Question",
      name: "What does CDenn do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CDenn provides full-stack software development services including Next.js web applications, M-Pesa Daraja API integrations, fintech automation systems, Chrome extension development, and AI-powered tools. CDenn works with startups and businesses globally on MVP development, technical consulting, and custom software solutions.",
      },
    },
    {
      "@type": "Question",
      name: "Is CDenn related to the cDENN protein?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. CDenn (cdenn.dev) is a software development brand and has no connection to cDENN, the central conserved module of the DENN protein domain in molecular biology. CDenn is the professional identity of Dennis Ndung'u, a web developer, not a scientific or biological term.",
      },
    },
    {
      "@type": "Question",
      name: "Where is CDenn based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CDenn is based in Nairobi, Kenya but works with clients globally. Dennis Ndung'u, the developer behind CDenn, is available for remote roles and freelance projects worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "How can I hire CDenn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can hire CDenn through the contact form at cdenn.dev. CDenn is available for full-time remote positions, freelance contracts, and consulting engagements in web development, fintech systems, and AI integration.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replaceAll("<", String.raw`\u003c`),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replaceAll("<", String.raw`\u003c`),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replaceAll("<", String.raw`\u003c`),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replaceAll("<", String.raw`\u003c`),
        }}
      />
      <PortfolioClient />
    </>
  );
}
