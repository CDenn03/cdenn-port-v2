"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Modal dialog behaviour for an element the caller already renders.
 *
 * The CV form and the mobile menu both looked like dialogs but behaved like
 * ordinary markup: focus stayed on the page behind them, Escape did nothing and
 * dismissing them left focus nowhere. This supplies the four things that were
 * missing, without owning any of the visuals:
 *
 *   - dialog semantics, applied only while open
 *   - initial focus in, and focus returned to whatever opened it
 *   - Tab and Shift+Tab confined to the container
 *   - Escape to close, and the page behind held still
 *
 * Spread `dialogProps` onto the element that should be the dialog and attach
 * `containerRef` to it. Everything focusable must live inside that element,
 * including the close control.
 */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

type DialogProps = {
  role?: "dialog";
  "aria-modal"?: true;
  "aria-label"?: string;
  tabIndex?: -1;
};

export function useDialog({
  open,
  onClose,
  label,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
}): { containerRef: React.RefObject<HTMLDivElement | null>; dialogProps: DialogProps } {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Held in a ref so a caller passing a fresh closure each render does not
  // re-run the effect, which would steal focus mid-interaction.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const visibleFocusable = useCallback((container: HTMLElement): HTMLElement[] => {
    const found = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    // offsetParent is null for anything display:none, which is how the desktop
    // navigation hides itself at mobile widths. Those must not take focus.
    return found.filter((element) => element.offsetParent !== null);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!open || !container) return;

    const active = document.activeElement;
    previouslyFocused.current = active instanceof HTMLElement ? active : null;

    const initial = visibleFocusable(container)[0] ?? container;
    initial.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const items = visibleFocusable(container);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      const outside = !(current instanceof Node) || !container.contains(current);

      if (event.shiftKey && (outside || current === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || current === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, visibleFocusable]);

  return {
    containerRef,
    dialogProps: open ? { role: "dialog", "aria-modal": true, "aria-label": label, tabIndex: -1 } : {},
  };
}
