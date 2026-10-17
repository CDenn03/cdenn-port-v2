"use client";

import { useEffect } from "react";

export function ConsoleEasterEgg() {
  useEffect(() => {
    const emerald = "#253c38";
    const cream = "#FCF7F2";
    const gold = "#C2A46D";

    console.log(
      "%c  CDenn  ",
      `background:${emerald}; color:${cream}; font-size:24px; font-weight:900; padding:8px 20px; border-radius:6px; letter-spacing:0.1em;`
    );

    console.log(
      "%cFull-stack engineer · Nairobi, Kenya",
      `color:${emerald}; font-size:13px; font-weight:600; margin-top:4px;`
    );

    console.log(
      "%cNext.js · Payments APIs · TypeScript · Node · PostgreSQL",
      `color:${gold}; font-size:11px; font-family:monospace;`
    );

    console.log(
      "%c─────────────────────────────────────────",
      `color:#e5e5e5; font-size:10px;`
    );

    console.log(
      "%cHey, curious one. You found the console.",
      `color:#525252; font-size:12px;`
    );

    console.log(
      "%cIf you're inspecting this, you're probably a developer. Let's talk.",
      `color:#525252; font-size:12px;`
    );

    console.log(
      "%c→ cdenn.dev/#contact",
      `color:${emerald}; font-size:12px; font-weight:700; text-decoration:underline;`
    );
  }, []);

  return null;
}
