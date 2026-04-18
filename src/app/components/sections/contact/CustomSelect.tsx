"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
}: Readonly<CustomSelectProps>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <input type="hidden" id={id} name={name} value={value} required={required} />

      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-base transition-colors text-left
          bg-white border-zinc-300 text-slate-900
          dark:bg-[#1a1a1a] dark:border-[#2a2a2a] dark:text-[#FCF7F2]
          ${open
            ? "border-primary dark:border-[#FCF7F2]"
            : "hover:border-zinc-400 dark:hover:border-[#444444]"
          }
          ${value ? "" : "text-zinc-400 dark:text-[#555555]"}
        `}
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform text-zinc-400 dark:text-[#555555] ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-full rounded-xl border overflow-hidden shadow-lg bg-white border-zinc-200 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                  ${value === opt.value
                    ? "bg-primary text-primary-foreground dark:bg-[#FCF7F2] dark:text-[#0a0a0a] font-medium"
                    : "text-slate-700 hover:bg-zinc-50 dark:text-[#b0b0b0] dark:hover:bg-[#222222]"
                  }
                `}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
