"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useSyncExternalStore } from "react";

/** Length of the .theme-transition window; matches --duration-slow + a frame. */
const THEME_TRANSITION_MS = 340;

let themeTransitionTimer: number | undefined;

/**
 * Paints the theme change as a crossfade instead of an instant repaint.
 *
 * The class is only present while the switch is in flight -- it drives a
 * blanket `*` transition (see globals.css), which would be wasteful to leave
 * applied during ordinary hovering.
 */
const beginThemeTransition = () => {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  root.classList.add("theme-transition");

  // Re-toggling mid-fade must extend the window, not end it early.
  window.clearTimeout(themeTransitionTimer);
  themeTransitionTimer = window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, THEME_TRANSITION_MS);
};

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  

  const mounted = useSyncExternalStore(
    () => () => {}, 
    () => true, 
    () => false 
  );

  const toggleTheme = () => {
    beginThemeTransition();
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