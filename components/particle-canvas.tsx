"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  isAccent: boolean;
}

export default function ParticleHeroImage({
  src,
  alt = "Profile photo",
}: {
  src: StaticImageData | string;
  alt?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas || !container) return;
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.scale(devicePixelRatio, devicePixelRatio);
    }

    function buildParticles() {
      particles = [];
      const COUNT = 90;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 2 + 0.6,
          opacity: Math.random() * 0.5 + 0.2,
          isAccent: Math.random() > 0.82,
        });
      }
    }

    resize();
    buildParticles();

    const handleResize = () => {
      resize();
      buildParticles();
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const accentVar = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      const accentRGB = accentVar || "217,164,65";

      particles.forEach((p) => {
        // gentle drift
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // mouse repel
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          const force = (90 - dist) / 90;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isAccent
          ? `rgba(${accentRGB},${p.opacity})`
          : `rgba(255,255,255,${p.opacity * 0.6})`;
        ctx.fill();
      });

      // connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.08 * (1 - dist / 70)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden bg-surface2"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover grayscale contrast-125 brightness-90"
        priority
      />
      {/* dark overlay so particles stay visible over the photo */}
      <div className="absolute inset-0 bg-black/25" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />
    </div>
  );
}