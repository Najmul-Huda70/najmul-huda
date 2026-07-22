"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  badge?: string;
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export default function EmptyState({
  badge = "[ UPCOMING ]",
  title = "Upcoming Content",
  description = "Content is currently being prepared and will be published soon. Please check back later!",
  actionHref,
  actionLabel,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`py-16 px-6 text-center border border-dashed border-border/60 rounded-2xl bg-surface/20 backdrop-blur-sm flex flex-col items-center justify-center my-6 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 animate-pulse">
        <Sparkles size={20} />
      </div>

      <p className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-2">
        {badge}
      </p>

      <h3 className="font-serif italic text-2xl text-text mb-2">
        {title}
      </h3>

      <p className="text-text2 text-xs sm:text-sm max-w-[440px] leading-relaxed mb-6 font-sans">
        {description}
      </p>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="font-mono text-xs border border-border/80 hover:border-accent hover:text-accent px-5 py-2.5 rounded-full transition-all duration-300 bg-surface/40"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
