"use client";

import { RevealOnScroll } from "@/components/ui/MotionWrapper";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  titleSize?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "left",
  titleSize = "text-[clamp(36px,6vw,56px)]",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "items-start";

  return (
    <RevealOnScroll className={`flex flex-col gap-2 mb-10 ${alignClass}`}>
      <p className="font-mono text-[11px] tracking-[2.5px] text-accent uppercase">
        {badge}
      </p>
      <h1 className={`font-serif italic ${titleSize} text-text leading-tight`}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-text2 text-sm sm:text-base max-w-[560px] font-sans leading-relaxed mt-1">
          {subtitle}
        </p>
      )}
    </RevealOnScroll>
  );
}
