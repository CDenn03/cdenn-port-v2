import { Browser } from "/home/cdenn/personal/taste-skill/skills/taste-skill/scripts/lib/cdp.mjs";

const BASE = "http://localhost:3210";
const OUT = "/home/cdenn/personal/cdenn-port-v2/.taste-skill/phase3";

const browser = await Browser.launch({ extraArgs: ["--no-sandbox"] });

try {
  for (const mode of ["light", "dark"]) {
    const p = await browser.newPage({ width: 1440, height: 900 });
    await p.goto(`${BASE}/`);
    await p.eval(`localStorage.setItem('theme', ${JSON.stringify(mode)})`);

    // The NDA case: a cover that has to read correctly forever.
    await p.goto(`${BASE}/solutions/bancassurance-platform`);
    await new Promise((r) => setTimeout(r, 700));
    await p.screenshot({ path: `${OUT}/${mode}-cover-nda.jpg`, quality: 76 });

    // The pending case: a cover that must promise nothing.
    await p.goto(`${BASE}/solutions/warehouselens`);
    await new Promise((r) => setTimeout(r, 700));
    await p.screenshot({ path: `${OUT}/${mode}-cover-pending.jpg`, quality: 76 });

    // Both cases side by side as cards.
    await p.goto(`${BASE}/solutions`);
    await new Promise((r) => setTimeout(r, 700));
    await p.eval(`window.scrollTo(0, 420)`);
    await new Promise((r) => setTimeout(r, 400));
    await p.screenshot({ path: `${OUT}/${mode}-cover-cards.jpg`, quality: 76 });

    await p.close();
  }
} finally {
  await browser.close();
}

console.log("captured");
