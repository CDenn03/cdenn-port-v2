"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/src/app/components/ui/ThemeToggle";
import { useTheme } from "@/src/app/hooks/useTheme";

interface SubpageNavProps {
  /** Where the back button navigates. Defaults to "/". */
  backHref?: string;
  /** Label shown next to the arrow. Defaults to "Back". */
  backLabel?: string;
}

export function SubpageNav({ backHref = "/", backLabel = "Back" }: SubpageNavProps) {
  const { resolvedTheme } = useTheme();

  const logoSrc =
    resolvedTheme === "dark"
      ? "/assets/logo/CDenn_white.png"
      : "/assets/logo/CDenn.png";

  return (
    <nav className="sticky top-0 z-50 border-b transition-colors duration-300 border-zinc-200 bg-[#FCF7F2]/90 dark:border-[#1a1a1a] dark:bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* left: back button */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-[#888] hover:text-slate-900 dark:hover:text-[#FCF7F2] transition-colors"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>

        {/* center: logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src={logoSrc}
            alt="CDenn"
            width={100}
            height={36}
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* right: theme toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
