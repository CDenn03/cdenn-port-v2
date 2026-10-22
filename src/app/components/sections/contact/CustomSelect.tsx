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
        className={`w-full flex items-center justify-between px-4 py-3 border text-base transition-colors text-left
          bg-surface border-border text-foreground
          ${open
            ? "border-primary dark:border-accent"
            : "hover:border-muted-foreground/60"
          }
          ${value ? "" : "text-muted-foreground"}
        `}
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform text-muted-foreground ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-full border border-border overflow-hidden bg-background">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                  ${value === opt.value
                    ? "bg-primary text-primary-foreground dark:bg-accent dark:text-[#0a0a0a] font-medium"
                    : "text-foreground hover:bg-surface"
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
