"use client";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Kept as a structural wrapper so content sections share one API, without
 * adding non-informational motion or delaying content visibility.
 */
export const Reveal = ({ children, className = "" }: RevealProps) => (
  <div className={className}>{children}</div>
);
