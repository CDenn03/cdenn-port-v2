import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ConsoleEasterEgg } from "./components/ConsoleEasterEgg";
import { SkipLink } from "./components/ui/SkipLink";

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
    default: "CDenn | Dennis Ndung'u, Frontend Engineer",
    template: "%s | CDenn",
  },
  description:
    "Frontend Engineer in Nairobi building operational systems that keep working: multi-tenant platforms, payments and reconciliation, offline-first products and AI-assisted operations. Open to remote, hybrid and on-site roles.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://www.cdenn.dev",
    siteName: "CDenn",
    title: "CDenn | Dennis Ndung'u, Frontend Engineer",
    description:
      "I build operational systems that keep working. Multi-tenant platforms, payments and reconciliation, offline-first products and AI-assisted operations.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CDenn - Dennis Ndung'u, Frontend Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@C_MDennis",
    creator: "@C_MDennis",
    title: "CDenn | Dennis Ndung'u, Frontend Engineer",
    description:
      "I build operational systems that keep working. Multi-tenant platforms, payments and reconciliation, offline-first products and AI-assisted operations.",
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
    <html lang="en" className={`${fontVariables} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased">
        <SkipLink />
        <ConsoleEasterEgg />
        {/* `disableTransitionOnChange` is deliberately NOT set: it injects
            `*{transition:none !important}` for a frame on every change, which
            would cancel the theme crossfade. The transition is instead scoped
            to the toggle itself via the .theme-transition class that
            useTheme adds for ~340ms, so nothing animates on first paint
            (next-themes applies the stored theme in a pre-paint script). */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}