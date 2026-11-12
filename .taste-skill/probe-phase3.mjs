import { Browser } from "/home/cdenn/personal/taste-skill/skills/taste-skill/scripts/lib/cdp.mjs";

const BASE = "http://localhost:3210";
const OUT = "/home/cdenn/personal/cdenn-port-v2/.taste-skill/phase3";

const VIEWS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
  // 200% zoom proxy: half the CSS width at the same device pixels.
  { name: "zoom200", width: 640, height: 512 },
];

const ROUTES = [
  "/",
  "/solutions",
  "/solutions/warehouselens",
  "/solutions/bancassurance-platform",
  "/about",
  "/services",
];

const browser = await Browser.launch({ extraArgs: ["--no-sandbox"] });
const report = [];

try {
  for (const mode of ["light", "dark"]) {
    for (const view of VIEWS) {
      const p = await browser.newPage({ width: view.width, height: view.height });
      await p.goto(`${BASE}/`);
      // Theme persists in localStorage, so it must be set explicitly every time.
      await p.eval(`localStorage.setItem('theme', ${JSON.stringify(mode)})`);

      for (const route of ROUTES) {
        await p.goto(`${BASE}${route}`);
        await new Promise((r) => setTimeout(r, 700));

        const metrics = await p.eval(`(() => {
          const d = document.documentElement;
          const vh = window.innerHeight;
          const box = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return { top: Math.round(r.top), bottom: Math.round(r.bottom), inFold: r.bottom <= vh && r.top >= 0 };
          };
          const byText = (sel, text) =>
            [...document.querySelectorAll(sel)].find(e => (e.innerText||'').trim().startsWith(text)) || null;

          const small = [...document.querySelectorAll('a,button,select,input[type=checkbox],input[type=text],input[type=email],select,textarea')]
            .filter(el => el.offsetParent !== null)
            .map(el => {
              const r = el.getBoundingClientRect();
              return { tag: el.tagName, text: (el.innerText||el.getAttribute('aria-label')||el.name||'').trim().slice(0,38), h: Math.round(r.height), w: Math.round(r.width) };
            })
            .filter(e => e.h > 2 && e.w > 2 && (e.h < 44 || e.w < 44));

          const primaries = [...document.querySelectorAll('.bg-primary')]
            .filter(el => el.offsetParent !== null && (el.tagName === 'A' || el.tagName === 'BUTTON'))
            .map(el => (el.innerText||'').trim().slice(0,30));

          return {
            scrollHeight: d.scrollHeight,
            viewportHeight: vh,
            overflow: Math.max(0, d.scrollWidth - d.clientWidth),
            h1Count: document.querySelectorAll('h1').length,
            fold: {
              portrait: box(document.querySelector('section img[alt*="Dennis"]')),
              h1: box(document.querySelector('h1')),
              deck: box(byText('p', 'Product-minded')),
              specialism1: box(byText('li', 'Multi-tenant platforms')),
              statusChip: box(byText('p', 'Open to work')),
              primaryCta: box(document.querySelector('a[href="#solutions"].bg-primary')),
              proofHeading: box(byText('h2', 'Selected proof')),
              proofRow1: box(document.querySelector('h2 + ul > li')),
            },
            primaryButtonsInView: primaries,
            smallTargets: small,
            smallTargetCount: small.length,
            resolvedMode: d.classList.contains('dark') ? 'dark' : 'light',
          };
        })()`);

        report.push({ mode, view: view.name, route, ...metrics });

        const slug = route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");
        await p.screenshot({
          path: `${OUT}/${mode}-${view.name}-${slug}.jpg`,
          format: "jpeg",
          quality: 72,
        });
      }

      await p.close();
    }
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(report, null, 2));
