"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/src/app/hooks/useTheme";

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

export const ThemeToggle = ({ className = "", size = 18 }: ThemeToggleProps) => {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  // A 44px box either way, so the header does not reflow when the real button
  // replaces the placeholder after hydration.
  const box = "h-11 w-11";

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className={`${box} border border-transparent ${className}`} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`press group ${box} flex items-center justify-center border border-line bg-surface-alt text-ink-muted transition-colors hover:bg-surface hover:text-ink ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Keyed so the icon swap replays the rotate-in on every toggle rather
          than cross-dissolving in place. */}
      <span
        key={isDark ? "sun" : "moon"}
        className="block motion-safe:animate-[theme-icon-in_var(--duration-base)_var(--ease-out-soft)_both] motion-safe:group-hover:rotate-12 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)]"
      >
        {isDark ? <Sun size={size} /> : <Moon size={size} />}
      </span>
    </button>
  );
};