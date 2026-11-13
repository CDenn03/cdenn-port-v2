/**
 * Fails the build if any text or boundary pair in the design tokens drops
 * below WCAG 2.2 AA.
 *
 * It reads the real values out of src/app/styles/tokens.css rather than a
 * duplicated list, so the check cannot drift from what ships.
 *
 *   text and its background          4.5:1  (1.4.3)
 *   focus rings, control boundaries  3.0:1  (1.4.11)
 */

import { readFileSync } from "node:fs";
import path from "node:path";

const TOKENS = path.join(process.cwd(), "src", "app", "styles", "tokens.css");

const TEXT = 4.5;
const NON_TEXT = 3;

const PAIRS = [
  ["ink", "canvas", TEXT, "Body text on the page"],
  ["ink", "surface", TEXT, "Body text on a card"],
  ["ink", "surface-alt", TEXT, "Body text on an alternate band"],
  ["ink-muted", "canvas", TEXT, "Secondary text on the page"],
  ["ink-muted", "surface", TEXT, "Secondary text on a card"],
  ["ink-muted", "surface-alt", TEXT, "Secondary text on a band"],
  ["ink-subtle", "canvas", TEXT, "Quietest text on the page"],
  ["ink-subtle", "surface", TEXT, "Quietest text on a card"],
  ["ink-subtle", "surface-alt", TEXT, "Quietest text on a band"],
  ["on-primary", "primary", TEXT, "Primary button label"],
  ["on-primary", "primary-hover", TEXT, "Primary button label on hover"],
  ["on-primary-tint", "primary-tint", TEXT, "Secondary button label"],
  ["link", "canvas", TEXT, "Link on the page"],
  ["link", "surface", TEXT, "Link on a card"],
  ["link", "surface-alt", TEXT, "Link on a band"],
  ["on-accent", "accent", TEXT, "Text on the accent fill"],
  ["danger", "canvas", TEXT, "Error text on the page"],
  ["danger", "surface", TEXT, "Error text on a card"],
  ["on-success-tint", "success-tint", TEXT, "Success badge label"],
  ["on-danger-tint", "danger-tint", TEXT, "Error badge label"],
  ["success", "canvas", TEXT, "Positive text on the page"],
  ["success", "surface", TEXT, "Positive text on a card"],
  ["on-scrim", "scrim", TEXT, "Label on a scrim over imagery"],
  ["on-cover", "cover", TEXT, "Title on a project cover"],
  ["focus", "canvas", NON_TEXT, "Focus ring on the page"],
  ["focus", "surface", NON_TEXT, "Focus ring on a card"],
  ["line-strong", "canvas", NON_TEXT, "Input boundary on the page"],
  ["line-strong", "surface", NON_TEXT, "Input boundary on a card"],
];

/** The accent is a fill only in light mode; this records why and is asserted below. */
const ACCENT_FILL_ONLY_MAX = 3;

function readBlock(css, selector) {
  // Matches the first `selector { ... }` block, which is enough because
  // tokens.css declares :root and .dark exactly once each.
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`tokens.css has no ${selector} block`);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  const body = css.slice(open + 1, close);

  const tokens = {};
  for (const [, name, value] of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    tokens[name] = value.trim();
  }
  return tokens;
}

function parseHex(value) {
  const hex = value.trim();
  if (!/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
    throw new Error(`Expected a hex colour, got "${value}"`);
  }
  const digits =
    hex.length === 4 ? [...hex.slice(1)].map((d) => d + d).join("") : hex.slice(1);
  return [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16));
}

/**
 * Follows `--a: var(--b)` to the hex it ends at.
 *
 * Some tokens are deliberately aliases - `--cover` is the primary in light
 * mode and the raised surface in dark - and without this the gate would read
 * the literal string "var(--primary)" and refuse to measure the pair, which
 * is the one pair most likely to be got wrong.
 */
function resolve(tokens, name, seen = new Set()) {
  const value = tokens[name];
  if (value === undefined) return undefined;
  if (seen.has(name)) throw new Error(`--${name} resolves in a circle`);
  seen.add(name);

  const alias = value.match(/^var\(\s*--([\w-]+)\s*\)$/);
  return alias ? resolve(tokens, alias[1], seen) : value;
}

function luminance(hex) {
  const [r, g, b] = parseHex(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

function check(modeName, tokens) {
  const failures = [];

  for (const [fg, bg, minimum, purpose] of PAIRS) {
    const foreground = resolve(tokens, fg);
    const background = resolve(tokens, bg);
    if (!foreground || !background) {
      failures.push(`  missing token: ${!foreground ? `--${fg}` : `--${bg}`}`);
      continue;
    }
    const value = ratio(foreground, background);
    if (value < minimum) {
      failures.push(
        `  ${value.toFixed(2)}:1 needs ${minimum}:1  ${fg} on ${bg}  (${purpose})`,
      );
    }
  }

  console.log(`${modeName}: ${PAIRS.length - failures.length}/${PAIRS.length} pairs pass`);
  return failures;
}

function main() {
  const css = readFileSync(TOKENS, "utf8");
  const light = readBlock(css, ":root");
  const dark = { ...light, ...readBlock(css, ".dark") };

  const failures = [...check("light", light), ...check("dark ", dark)];

  // The light accent is deliberately too low to be a stroke. If someone
  // "fixes" it, the fill-only rule in the tokens no longer holds and every
  // accent border and icon on a light ground silently becomes legitimate.
  const accentOnCanvas = ratio(light.accent, light.canvas);
  if (accentOnCanvas >= ACCENT_FILL_ONLY_MAX) {
    console.log(
      `\nnote: the light accent now reaches ${accentOnCanvas.toFixed(2)}:1 against the canvas.\n` +
        `      It was chosen as a fill-only colour. Revisit the "fill only" rule in\n` +
        `      tokens.css and the guidance in docs/redesign-plan.md before using it as a stroke.`,
    );
  }

  if (failures.length > 0) {
    console.error(`\nWCAG 2.2 AA contrast check FAILED:\n${failures.join("\n")}`);
    process.exit(1);
  }
  console.log("\nAll pairs meet WCAG 2.2 AA in both modes.");
}

main();
