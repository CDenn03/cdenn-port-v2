import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {

  metadataBase: new URL("https://cdenn.dev"),

  title: {
    default: "CDenn | Full-Stack Software Developer",
    template: "%s | CDenn",
  },
  description:
    "Full-stack software developer based in Nairobi, Kenya. Specialising in Next.js, TypeScript, and AI-integrated web applications. Open to remote roles and freelance projects.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://cdenn.dev",
    siteName: "CDenn",
    title: "CDenn | Full-Stack Software Developer",
    description:
      "Full-stack software developer based in Nairobi, Kenya. Specialising in Next.js, TypeScript, and AI-integrated web applications.",
    images: [
      {
        url: "/opengraph-image", 
        width: 1200,
        height: 630,
        alt: "CDenn — Full-Stack Software Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CDenn | Full-Stack Software Developer",
    description:
      "Full-stack software developer based in Nairobi, Kenya. Specialising in Next.js, TypeScript, and AI-integrated web applications.",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}