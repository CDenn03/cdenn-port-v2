"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-primary dark:focus:border-[#FCF7F2] transition-colors bg-white border-zinc-300 text-slate-900 placeholder-zinc-400 dark:bg-[#1a1a1a] dark:border-[#2a2a2a] dark:text-[#FCF7F2] dark:placeholder-[#555555]";

export function RequestCV() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/request-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-4 bg-white border border-zinc-200 dark:bg-[#1a1a1a] dark:border-[#2a2a2a] min-h-[320px]">
        <CheckCircle size={40} className="text-primary dark:text-[#FCF7F2]" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-[#FCF7F2]">Request received!</h3>
        <p className="text-zinc-500 dark:text-[#888888]">
          I&apos;ll send my CV to your email within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-primary dark:text-[#FCF7F2] hover:underline underline-offset-4"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-3xl p-8 space-y-5 bg-white border border-zinc-200 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]"
      onSubmit={handleSubmit}
    >
      {/* Header inside the card */}
      <div className="mb-1">
        <h2 className="text-xl font-bold text-slate-900 dark:text-[#FCF7F2]">Request CV</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Leave your details and I&apos;ll send my CV within 24 hours.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cv-name" className="block text-sm font-medium mb-2 text-zinc-600 dark:text-[#b0b0b0]">
            Name
          </label>
          <input
            type="text"
            id="cv-name"
            name="name"
            required
            className={inputClass}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="cv-email" className="block text-sm font-medium mb-2 text-zinc-600 dark:text-[#b0b0b0]">
            Email
          </label>
          <input
            type="email"
            id="cv-email"
            name="email"
            required
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cv-role" className="block text-sm font-medium mb-2 text-zinc-600 dark:text-[#b0b0b0]">
            Role <span className="text-zinc-400 dark:text-[#555555] font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="cv-role"
            name="role"
            className={inputClass}
            placeholder="Hiring Manager"
          />
        </div>
        <div>
          <label htmlFor="cv-company" className="block text-sm font-medium mb-2 text-zinc-600 dark:text-[#b0b0b0]">
            Company <span className="text-zinc-400 dark:text-[#555555] font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="cv-company"
            name="company"
            className={inputClass}
            placeholder="Company Name"
          />
        </div>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-primary-foreground text-base font-bold py-4 rounded-xl hover:opacity-90 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "loading"
          ? <><Loader2 size={18} className="animate-spin" /> Sending request...</>
          : "Request CV"
        }
      </button>
    </form>
  );
}
