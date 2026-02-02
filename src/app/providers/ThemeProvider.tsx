"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
  readonly attribute?: "class" | "data-theme";
  readonly defaultTheme?: string;
  readonly enableSystem?: boolean;
  readonly disableTransitionOnChange?: boolean;
}

export function ThemeProvider({ children, ...props }: Props) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}