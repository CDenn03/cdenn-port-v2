'use client';

import { ReactNode, ElementType } from 'react';
import { useReveal } from './useReveal';
import styles from './reveal.module.css';

type RevealAnimation = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scale';

interface RevealProps {
  children: ReactNode;
  animation?: RevealAnimation;
  /** Delay before animation starts. Values < 10 are treated as seconds, >= 10 as milliseconds */
  delay?: number;
  className?: string;
  as?: ElementType;
  threshold?: number;
}

const animationClasses: Record<RevealAnimation, string> = {
  fadeUp: styles.revealFadeUp,
  fadeIn: styles.revealFadeIn,
  fadeLeft: styles.revealFadeLeft,
  fadeRight: styles.revealFadeRight,
  scale: styles.revealScale,
};

export function Reveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  className = '',
  as: Tag = 'div',
  threshold = 0.15,
}: RevealProps) {
  const [ref, isVisible] = useReveal<HTMLElement>({ threshold });

  // Handle both fractional seconds (0.1) and milliseconds (100)
  const delayMs = delay > 0 && delay < 10 ? delay * 1000 : delay;

  const baseClass = animationClasses[animation];
  const visibleClass = isVisible ? styles.revealVisible : '';
  const combinedClass = `${baseClass} ${visibleClass} ${className}`.trim();

  return (
    <Tag
      ref={ref}
      className={combinedClass}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

// Named export for backward compatibility
export default Reveal;
