"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/src/app/hooks/useTheme";

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

export const ThemeToggle = ({ className = "", size = 18 }: ThemeToggleProps) => {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();
  
  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className={`p-2 border border-transparent ${className}`} style={{ width: size + 16, height: size + 16 }} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`press group p-2 border ${
        isDark 
          ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" 
          : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
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