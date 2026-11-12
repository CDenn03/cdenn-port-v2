#!/usr/bin/env node
/**
 * Warns when the hand-maintained availability claim has gone stale.
 *
 * This warns rather than failing. Blocking a deploy because a date is old
 * would mean an urgent fix cannot ship until the owner edits unrelated copy,
 * and the site already discloses the date to the reader either way. The only
 * hard failure here is a malformed or missing date, which would render as
 * "Invalid Date" on the page.
 */
import { readFile } from "node:fs/promises";

const SOURCE = new URL("../src/app/data/status.ts", import.meta.url);

const text = await readFile(SOURCE, "utf8");

const updatedAt = text.match(/updatedAt:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
const staleAfter = Number(text.match(/STATUS_STALE_AFTER_DAYS\s*=\s*(\d+)/)?.[1]);

if (!updatedAt) {
  console.error("check:status  FAIL  no valid `updatedAt: \"YYYY-MM-DD\"` found in src/app/data/status.ts");
  process.exit(1);
}

if (!Number.isFinite(staleAfter)) {
  console.error("check:status  FAIL  STATUS_STALE_AFTER_DAYS not found in src/app/data/status.ts");
  process.exit(1);
}

const updated = new Date(`${updatedAt}T00:00:00Z`);

if (Number.isNaN(updated.getTime())) {
  console.error(`check:status  FAIL  updatedAt "${updatedAt}" is not a real date`);
  process.exit(1);
}

const ageInDays = Math.floor((Date.now() - updated.getTime()) / 86_400_000);

if (ageInDays < 0) {
  console.error(`check:status  FAIL  updatedAt "${updatedAt}" is in the future`);
  process.exit(1);
}

if (ageInDays > staleAfter) {
  console.warn(
    `check:status  WARN  availability was last confirmed ${ageInDays} days ago (${updatedAt}), ` +
      `past the ${staleAfter}-day limit. Re-confirm it in src/app/data/status.ts.`
  );
} else {
  console.log(`check:status  OK    availability confirmed ${ageInDays} day(s) ago (${updatedAt}).`);
}
