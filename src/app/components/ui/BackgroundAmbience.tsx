"use client";

import { useEffect, useRef } from 'react';

/**
 * Subtle animated background ambience with floating gradient orbs.
 * Adds visual depth without being distracting.
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
      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soft floating orbs
      const orbs = [
        {
          x: canvas.width * 0.2 + Math.sin(time * 0.5) * 100,
          y: canvas.height * 0.3 + Math.cos(time * 0.3) * 80,
          radius: 400,
          color: 'rgb(59, 130, 246)', // blue
          alpha: 0.03,
        },
        {
          x: canvas.width * 0.8 + Math.cos(time * 0.4) * 120,
          y: canvas.height * 0.6 + Math.sin(time * 0.6) * 100,
          radius: 350,
          color: 'rgb(147, 51, 234)', // purple
          alpha: 0.025,
        },
        {
          x: canvas.width * 0.5 + Math.sin(time * 0.3) * 80,
          y: canvas.height * 0.8 + Math.cos(time * 0.5) * 60,
          radius: 300,
          color: 'rgb(34, 197, 94)', // green
          alpha: 0.02,
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
      className="pointer-events-none fixed inset-0 -z-10 opacity-60 dark:opacity-40"
    />
  );
};

export default BackgroundAmbience;
