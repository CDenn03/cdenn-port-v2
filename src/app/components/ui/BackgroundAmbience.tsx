"use client";

import { useEffect, useRef } from 'react';

/**
 * Barely-perceptible background depth, drawn in the brand palette only
 * (emerald + muted gold). Two large, very low-alpha fields drift slowly so
 * the page reads as having air behind it rather than being flat -- the motion
 * is informational-adjacent at most, so it is deliberately near the floor of
 * perception and is skipped entirely under prefers-reduced-motion.
 */
export const BackgroundAmbience = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawOrb = (
      x: number,
      y: number,
      radius: number,
      color: string,
      alpha: number
    ) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color.replace(')', `, ${alpha})`).replace('rgb', 'rgba'));
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      // Half the previous speed: a full drift cycle now takes minutes, so the
      // movement is felt rather than watched.
      time += 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Brand palette only -- emerald and muted gold
      const orbs = [
        {
          x: canvas.width * 0.22 + Math.sin(time * 0.5) * 90,
          y: canvas.height * 0.28 + Math.cos(time * 0.3) * 70,
          radius: 450,
          color: 'rgb(37, 60, 56)', // emerald --primary
          alpha: 0.12,
        },
        {
          x: canvas.width * 0.8 + Math.cos(time * 0.4) * 100,
          y: canvas.height * 0.72 + Math.sin(time * 0.6) * 80,
          radius: 380,
          color: 'rgb(194, 164, 109)', // muted gold --accent
          alpha: 0.08,
        },
      ];

      orbs.forEach((orb) => {
        drawOrb(orb.x, orb.y, orb.radius, orb.color, orb.alpha);
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-80 dark:opacity-50"
    />
  );
};

export default BackgroundAmbience;
