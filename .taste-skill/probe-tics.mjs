import { Browser } from "/home/cdenn/personal/taste-skill/skills/taste-skill/scripts/lib/cdp.mjs";

/**
 * Counts repeated words in the text a visitor actually reads.
 *
 * Grepping the source conflates copy with identifiers - `evidenceBadge` and
 * `project.evidence` are not things anyone reads - and misses the fact that one
 * label in a `map` renders three times. This reads the rendered page instead,
 * which is the only count that describes the reading experience.
 */

const BASE = "http://localhost:3210";
const ROUTES = ["/", "/solutions", "/solutions/warehouselens"];

const STOP = new Set(
  `a an the and or but if then than that this these those of in on at to for from with without by as is are was were be been being it its i me my you your he she they them their we our not no nor so such only own same too very can will just don should now what which who whom when where how all any both each few more most other some here there also into over under again further once up down out off about against between through during before after above below`.split(
    /\s+/
  )
);

const browser = await Browser.launch({ extraArgs: ["--no-sandbox"] });

try {
  for (const route of ROUTES) {
    const p = await browser.newPage({ width: 1440, height: 900 });
    await p.goto(`${BASE}${route}`);
    await new Promise((r) => setTimeout(r, 700));

    const text = await p.eval(`document.querySelector('main').innerText`);
    await p.close();

    const words = text
      .toLowerCase()
      .replace(/[^a-z\s'-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP.has(w));

    const counts = new Map();
    for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);

    const top = [...counts.entries()]
      .filter(([, n]) => n >= 4)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14);

    console.log(`\n${route}  (${words.length} content words)`);
    for (const [w, n] of top) console.log(`   ${String(n).padStart(3)}  ${w}`);
    console.log(`   constraint: ${counts.get("constraint") ?? 0}`);
  }
} finally {
  await browser.close();
}
