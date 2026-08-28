import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ConsoleEasterEgg } from "./components/ConsoleEasterEgg";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {

  metadataBase: new URL("https://www.cdenn.dev"),

  authors: [{ name: "Dennis Ndung'u", url: "https://www.cdenn.dev" }],
  creator: "Dennis Ndung'u",
  publisher: "Dennis Ndung'u",

  icons: {
    icon: [
      { url: "/assets/logo/CDenn_green_icon.png", type: "image/png" },
    ],
    apple: "/assets/logo/CDenn_green_icon.png",
  },

  title: {
    default: "CDenn | Full-Stack Software Developer",
    template: "%s | CDenn",
  },
  description:
    "Full-stack developer in Nairobi, Kenya. Building Next.js apps, fintech systems, and AI-integrated tools. Available for remote work.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://www.cdenn.dev",
    siteName: "CDenn",
    title: "CDenn | Full-Stack Software Developer",
    description:
      "Full-stack developer in Nairobi, Kenya. Building Next.js apps, fintech systems, and AI tools.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CDenn - Full-Stack Software Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@C_MDennis",
    creator: "@C_MDennis",
    title: "CDenn | Full-Stack Software Developer",
    description:
      "Full-stack developer in Nairobi, Kenya. Building Next.js apps, fintech systems, and AI tools.",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ConsoleEasterEgg />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}