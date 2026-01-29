"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  

  const mounted = useSyncExternalStore(
    () => () => {}, 
    () => true, 
    () => false 
  );

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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