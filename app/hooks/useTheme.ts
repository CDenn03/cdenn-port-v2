"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Return system theme if not mounted to avoid hydration mismatch
  if (!mounted) {
    return {
      theme: "light" as const,
      resolvedTheme: "light" as const,
      toggleTheme,
      mounted: false
    };
  }

  return {
    theme: theme as "light" | "dark" | "system",
    resolvedTheme: resolvedTheme as "light" | "dark",
    toggleTheme,
    mounted: true
  };
};