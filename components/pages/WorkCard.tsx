"use client";

import { useState } from "react";
import Link from "next/link";
import type { Work, WorkStatus } from "@/models/types";
import Image from "next/image";
import { motion } from "framer-motion";

const STATUS_LABEL: Record<WorkStatus, string> = {
  live: "● LIVE",
  progress: "IN PROGRESS",
  archived: "ARCHIVED",
};

const STATUS_COLOR: Record<WorkStatus, string> = {
  live: "bg-accent/15 text-accent border border-accent/30",
  progress: "bg-surface2 text-text2 border border-border",
  archived: "bg-surface2/60 text-text3 border border-border/60",
};

// Wrap Link with motion once — avoids nesting a second bordered element inside it
const MotionLink = motion(Link);

export default function WorkCard({
  work,
  index,
}: {
  work: Work;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const visibleTags = work.tags?.slice(0, 5) ?? [];

  return (
    <MotionLink
      href={`/work/${work._id}`}
      data-category={work.category}
      className="group h-full flex flex-col bg-surface border border-border rounded-2xl overflow-hidden"
      whileHover={{ y: -4, borderColor: "rgb(var(--accent) / 0.6)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Image area — fixed height */}
      <div className="relative h-[200px] shrink-0 bg-gradient-to-br from-surface2 to-border overflow-hidden">
        <span
          className={`absolute top-3 left-3 text-[10px] tracking-[1px] px-2.5 py-1 rounded-full z-10 font-mono backdrop-blur-sm ${STATUS_COLOR[work.status]}`}
        >
          {STATUS_LABEL[work.status]}
        </span>
        <span className="absolute top-3 right-3.5 font-mono text-xs text-white/50 z-10">
          {String(index + 1).padStart(2, "0")}
        </span>

        {work.image?.[0] && !imgError ? (
          <Image
            src={work.image[0]}
            alt={work.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl text-text3 opacity-40">◆</span>
          </div>
        )}
      </div>

      {/* Content — flex-1 so every card in a row grows to the same height */}
      <div className="px-5 py-5 flex flex-col flex-1">
        <h3 className="text-base font-medium mb-1 line-clamp-2 text-text group-hover:text-accent transition-colors">
          {work.title}
        </h3>
        <div className="text-xs text-text3 mb-3 font-mono capitalize">
          {work.type} · {work.year}
        </div>

        {/* flex-1 pushes everything below (metric + tags) down to a consistent
            position even when description length differs between cards */}
        <p className="text-text2 text-xs sm:text-[13px] line-clamp-3 leading-relaxed font-sans mb-4 flex-1">
          {work.short_description}
        </p>

        {work.metricValue && (
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-mono text-base text-accent font-medium">
              {work.metricValue}
            </span>
            <span className="text-xs text-text2">{work.metricLabel}</span>
          </div>
        )}

        {/* mt-auto pins the tag row to the bottom of the card every time */}
        <div className="flex gap-1.5 flex-wrap mt-auto min-h-[28px]">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[10px] font-mono bg-surface2 border border-border/40 text-text2 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {(work.tags?.length ?? 0) > 5 && (
            <span className="text-[10px] font-mono text-text3 px-2 py-0.5">
              +{(work.tags?.length ?? 0) - 5}
            </span>
          )}
        </div>
      </div>
    </MotionLink>
  );
}