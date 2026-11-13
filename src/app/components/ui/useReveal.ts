'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLElement>(
  options: UseRevealOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fail-safe: if the element is already in (or near) the viewport on mount,
    // reveal immediately. This covers programmatic/fast scrolls where the
    // IntersectionObserver callback may not fire, so content is never left
    // hidden: a hard requirement, not just a nicety.
    const revealNow = () => {
      setIsVisible(true);
      if (triggerOnce) observer.unobserve(element);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) revealNow();

    // Last-resort safety: never let an entrance animation strand content.
    const safety = window.setTimeout(revealNow, 1200);

    return () => {
      window.clearTimeout(safety);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

// Multi-element reveal for staggered animations
export function useRevealGroup(
  count: number,
  options: UseRevealOptions = {}
): [RefObject<HTMLElement | null>, boolean[]] {
  const { threshold = 0.1, rootMargin = '0px 0px -30px 0px', triggerOnce = true } = options;
  const containerRef = useRef<HTMLElement | null>(null);
  const [visibleStates, setVisibleStates] = useState<boolean[]>(Array(count).fill(false));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the reveals
          for (let i = 0; i < count; i++) {
            setTimeout(() => {
              setVisibleStates((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 100); // 100ms stagger
          }
          if (triggerOnce) {
            observer.unobserve(container);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [count, threshold, rootMargin, triggerOnce]);

  return [containerRef, visibleStates];
}
