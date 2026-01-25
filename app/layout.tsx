import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chris Dennison | Frontend Developer",
  description: "I craft high-performance React applications that convert visitors into customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-zinc-950 text-white selection:bg-emerald-500/30 selection:text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}