"use client";

import { useTransition } from "react";
import { toggleFeatured } from "@/lib/action";

export default function FeaturedToggle({
  projectId,
  featured,
}: {
  projectId: string;
  featured: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!projectId) return;
    startTransition(async () => {
      await toggleFeatured(projectId, featured);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`font-mono text-[10px] px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-wait
        ${
          featured
            ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30 hover:bg-emerald-400/20 hover:border-emerald-400/50"
            : "text-text3 bg-surface2/20 border-border/40 hover:border-border/80 hover:text-text2"
        }`}
    >
      <span className="flex items-center gap-1.5">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            featured
              ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
              : "bg-text3/50"
          }`}
        />
        {isPending ? "..." : featured ? "YES" : "NO"}
      </span>
    </button>
  );
}