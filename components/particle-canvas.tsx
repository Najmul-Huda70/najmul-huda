"use client";

import { useEffect, useRef } from "react";

interface Particle {
  baseX: number;
  baseY: number;
  offset: number;
  speed: number;
  size: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const COUNT = 900;

    function buildParticles() {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 0.5) * 0.38;
        particles.push({
          baseX: 0.5 + Math.cos(angle) * radius,
          baseY: 0.45 + Math.sin(angle) * radius * 1.15,
          offset: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.5,
          size: Math.random() * 1.6 + 0.4,
        });
      }
    }

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    }

    resize();
    buildParticles();
    window.addEventListener("resize", resize);

    let t = 0;
    function draw() {
      if (!canvas || !ctx) return;
      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      const accentColor = accent ? `rgb(${accent})` : "#D9A441";

      particles.forEach((p) => {
        const x = (p.baseX + Math.sin(t * p.speed + p.offset) * 0.01) * canvas.width;
        const y = (p.baseY + Math.cos(t * p.speed + p.offset) * 0.01) * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, p.size * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.85 ? accentColor : "rgba(180,180,175,0.5)";
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative h-[280px] md:h-[460px] rounded-2xl overflow-hidden bg-surface order-[-1] md:order-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
