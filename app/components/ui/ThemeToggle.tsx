"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/hooks/useTheme";

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

export const ThemeToggle = ({ className = "", size = 18 }: ThemeToggleProps) => {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();
  
  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className={`p-2 rounded-full ${className}`} style={{ width: size + 16, height: size + 16 }} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${
        isDark 
          ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" 
          : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <Sun size={size} /> : <Moon size={size} />}
    </button>
  );
};