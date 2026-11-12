"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { RequestCV } from "./RequestCV";
import { useDialog } from "@/src/app/hooks/useDialog";

/**
 * The CV request trigger and its dialog, isolated.
 *
 * This exists so the hero can render on the server. It was the only part of the
 * old hero that needed state, and keeping it inline forced the headline,
 * portrait, status and proof rows into the client bundle with it.
 */
export function RequestCVButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { containerRef, dialogProps } = useDialog({ open, onClose: close, label: "Request CV" });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex min-h-11 items-center text-sm text-ink-muted underline underline-offset-4 transition-colors hover:text-ink ${className}`}
      >
        Request CV
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              aria-hidden="true"
              className="fixed inset-0 z-50 bg-scrim/60"
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div
                ref={containerRef}
                {...dialogProps}
                className="pointer-events-auto relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto"
              >
                {/* Inside the dialog container, so the focus trap includes it. */}
                <button
                  type="button"
                  onClick={close}
                  className="absolute right-0 top-0 z-10 flex h-11 w-11 items-center justify-center bg-surface text-ink transition-colors hover:bg-surface-alt"
                  aria-label="Close CV request form"
                >
                  <X size={16} aria-hidden="true" />
                </button>
                <RequestCV />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
