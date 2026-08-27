"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const EASTER_EGG_CODE = "cdenn";
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%";

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return char;
            if (char === " ") return " ";
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );
      iteration += 0.5;
      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
        setDisplay(text);
      }
    }, 30);
    return () => clearInterval(intervalRef.current!);
  }, [text]);

  return <span>{display}</span>;
}

export default function NotFound() {
  const [easterInput, setEasterInput] = useState("");
  const [easterUnlocked, setEasterUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowHint(true), 7000);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (easterUnlocked) return;
      const next = (easterInput + e.key).slice(-EASTER_EGG_CODE.length);
      setEasterInput(next);
      if (next === EASTER_EGG_CODE) setEasterUnlocked(true);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [easterInput, easterUnlocked]);

  return (
    <main className="min-h-screen bg-[#FCF7F2] dark:bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">

      <div className="w-full max-w-xl relative z-10">

        {/* 404 watermark */}
        <div className="mb-2 select-none">
          <span className="text-[clamp(6rem,20vw,10rem)] font-black leading-none tracking-tighter text-slate-900/8 dark:text-white/5">
            404
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-[#FCF7F2] mb-2 -mt-4">
          <GlitchText text="Page not found." />
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
          This route doesn&apos;t exist. Head back and find what you were looking for.
        </p>

        {/* Nav links */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-primary text-[#FCF7F2] text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Go home
          </Link>
          <Link
            href="/#solutions"
            className="px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm font-bold text-slate-900 dark:text-[#FCF7F2] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            See my work
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm font-bold text-slate-900 dark:text-[#FCF7F2] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Easter egg hint */}
        {showHint && !easterUnlocked && (
          <p className="mt-10 text-xs font-mono text-zinc-300 dark:text-zinc-700 animate-pulse select-none">
            // there&apos;s a secret on this page
          </p>
        )}

        {/* Easter egg unlocked */}
        {easterUnlocked && (
          <div className="mt-10 p-4 rounded-xl border border-primary/30 bg-primary/5 dark:bg-emerald-900/10">
            <p className="text-xs font-mono text-primary dark:text-emerald-400 mb-2">
              // unlocked
            </p>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Since you&apos;re curious enough to find this: I&apos;m Dennis Ndung&apos;u. I built this
              portfolio in Next.js 16 with Tailwind v4 and a lot of iteration.
              If you&apos;re reading the source — hi. Let&apos;s work together.
            </p>
            <Link
              href="/#contact"
              className="inline-block mt-3 text-xs font-mono font-bold text-primary dark:text-emerald-400 hover:underline"
            >
              Get in touch
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}
