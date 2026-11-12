import { Browser } from "/home/cdenn/personal/taste-skill/skills/taste-skill/scripts/lib/cdp.mjs";

const BASE = "http://localhost:3210";

const browser = await Browser.launch({ extraArgs: ["--no-sandbox"] });

async function tab(p, shift = false) {
  for (const type of ["keyDown", "keyUp"]) {
    await p.send("Input.dispatchKeyEvent", {
      type,
      key: "Tab",
      code: "Tab",
      windowsVirtualKeyCode: 9,
      nativeVirtualKeyCode: 9,
      modifiers: shift ? 8 : 0,
    });
  }
  await new Promise((r) => setTimeout(r, 60));
}

async function press(p, key, vk, text) {
  // A bare keyDown/keyUp pair does not make a browser click a focused button:
  // the click is synthesised from the character event, so it has to be sent.
  await p.send("Input.dispatchKeyEvent", {
    type: "rawKeyDown",
    key,
    code: key,
    windowsVirtualKeyCode: vk,
    nativeVirtualKeyCode: vk,
  });
  if (text) {
    await p.send("Input.dispatchKeyEvent", { type: "char", key, text, unmodifiedText: text });
  }
  await p.send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key,
    code: key,
    windowsVirtualKeyCode: vk,
    nativeVirtualKeyCode: vk,
  });
  await new Promise((r) => setTimeout(r, 300));
}

const describe = `(() => {
  const a = document.activeElement;
  if (!a || a === document.body) return { tag: 'BODY' };
  const r = a.getBoundingClientRect();
  const style = getComputedStyle(a);
  return {
    tag: a.tagName,
    text: (a.innerText || a.getAttribute('aria-label') || a.name || a.id || '').trim().slice(0, 40),
    inMenu: !!a.closest('[role="dialog"]'),
    focusVisible: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0,
    h: Math.round(r.height),
  };
})()`;

const result = { skipLink: null, firstTabs: [], menuTrap: null, cvDialog: null };

try {
  // ---- 1. Skip link is first, and the mobile menu traps focus.
  const p = await browser.newPage({ width: 390, height: 844 });
  await p.goto(`${BASE}/`);
  await p.eval(`localStorage.setItem('theme','light')`);
  await p.goto(`${BASE}/`);
  await new Promise((r) => setTimeout(r, 700));

  await p.eval(`document.body.focus()`);
  await tab(p);
  result.skipLink = await p.eval(describe);

  for (let i = 0; i < 4; i++) {
    await tab(p);
    result.firstTabs.push(await p.eval(describe));
  }

  // Open the mobile menu from its real trigger, then tab around it.
  await p.eval(`document.querySelector('button[aria-controls="mobile-menu"]').focus()`);
  const triggerBefore = await p.eval(
    `document.activeElement.getAttribute('aria-label')`
  );
  await press(p, "Enter", 13, "\r");

  const visited = [];
  let escapes = 0;
  for (let i = 0; i < 24; i++) {
    await tab(p);
    const node = await p.eval(describe);
    visited.push(node);
    if (!node.inMenu) escapes += 1;
  }
  await press(p, "Escape", 27);
  const restored = await p.eval(`document.activeElement.getAttribute('aria-label')`);
  result.menuTrap = {
    triggerBefore,
    tabs: visited.length,
    escapes,
    menuStillOpen: await p.eval(`!!document.getElementById('mobile-menu')`),
    focusRestoredToTrigger: restored === triggerBefore,
    restoredTo: restored,
    allFocusVisible: visited.every((n) => n.focusVisible),
  };

  // ---- 2. CV dialog opens, traps, and restores focus.
  await p.goto(`${BASE}/`);
  await new Promise((r) => setTimeout(r, 600));
  await p.eval(`[...document.querySelectorAll('button')].find(b => b.innerText.trim() === 'Request CV').focus()`);
  await press(p, "Enter", 13, "\r");
  const cvFirst = await p.eval(describe);
  let cvEscapes = 0;
  for (let i = 0; i < 14; i++) {
    await tab(p);
    const node = await p.eval(describe);
    if (!node.inMenu) cvEscapes += 1;
  }
  await press(p, "Escape", 27);
  const cvRestored = await p.eval(
    `(document.activeElement.innerText || '').trim()`
  );
  result.cvDialog = {
    opened: cvFirst.inMenu,
    firstFocus: cvFirst.text,
    escapes: cvEscapes,
    closed: await p.eval(`!document.querySelector('[role="dialog"][aria-label="Request CV"]')`),
    focusRestoredTo: cvRestored,
  };

  await p.close();
} finally {
  await browser.close();
}

console.log(JSON.stringify(result, null, 2));
