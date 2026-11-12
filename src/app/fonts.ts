import { Geist_Mono, Mona_Sans, Newsreader } from "next/font/google";

/**
 * The three faces, each with one job.
 *
 * All three are SIL OFL, and next/font downloads and self-hosts them at
 * build time, so the site makes no third-party font request at runtime.
 *
 * Switzer was the first choice on looks, but the ITF Free Font License
 * forbids making the font available through a public repository, and this
 * repository is public. Mona Sans was the closest OFL face in the
 * specimen and carries no such restriction.
 */

/** Primary: everything structural. Two weights only, 400 and 600. */
export const primaryFont = Mona_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mona",
  display: "swap",
});

/** Secondary: pull quotes and the story paragraph of a case study. Never UI. */
export const secondaryFont = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

/** Tertiary: code only. Evidence figures use the primary face with tabular-nums. */
export const monoFont = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = [primaryFont.variable, secondaryFont.variable, monoFont.variable].join(" ");
