"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project, ProjectStatus } from "@/models/types";
import Image from "next/image";
import { motion } from "framer-motion";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "● LIVE",
  progress: "IN PROGRESS",
  archived: "ARCHIVED",
};

const STATUS_COLOR: Record<ProjectStatus, string> = {
  live: "bg-accent/15 text-accent border border-accent/30",
  progress: "bg-surface2 text-text2 border border-border",
  archived: "bg-surface2/60 text-text3 border border-border/60",
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const visibleTags = project.tags?.slice(0, 3) ?? [];
  const extraTags = (project.tags?.length ?? 0) - 3;

  return (
    <motion.div
      data-category={project.category}
      className="group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden h-full"
      whileHover={{ y: -4, borderColor: "rgb(var(--accent) / 0.6)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Image area — fixed height */}
      <div className="relative h-[200px] shrink-0 bg-gradient-to-br from-surface2 to-border overflow-hidden">
        <span
          className={`absolute top-3 left-3 text-[10px] tracking-[1px] px-2.5 py-1 rounded-full z-10 font-mono backdrop-blur-sm ${STATUS_COLOR[project.status]}`}
        >
          {STATUS_LABEL[project.status]}
        </span>
        <span className="absolute top-3 right-3.5 font-mono text-xs text-white/50 z-10">
          {String(index + 1).padStart(2, "0")}
        </span>

        {project.image?.[0] && !imgError ? (
          <Image
            src={project.image[0]}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl text-text3 opacity-40">◆</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content — flex-1 so all cards grow to same height */}
      <div className="px-5 py-5 flex flex-col flex-1">
        <h3 className="text-base font-medium mb-1 line-clamp-2 text-text group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <div className="text-xs text-text3 mb-3 font-mono capitalize">
          {project.type} · {project.year}
        </div>

        {/* Metric */}
        {project.metricValue && (
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-mono text-base text-accent font-medium">
              {project.metricValue}
            </span>
            <span className="text-xs text-text2">{project.metricLabel}</span>
          </div>
        )}

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap mb-5 min-h-[28px]">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-text2 bg-surface2 border border-border/60 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {extraTags > 0 && (
            <span className="text-[11px] text-text3 bg-surface2 border border-border/40 px-2.5 py-1 rounded-full">
              +{extraTags}
            </span>
          )}
        </div>

        {/* Footer link */}
        <Link
          href={`/w/${project.slug}`}
          className="mt-auto flex items-center justify-between font-mono text-[11px] tracking-[1px] text-text2 pt-4 border-t border-border/60 transition-colors group-hover:text-accent"
        >
          <span>VIEW DETAILS</span>
          <motion.span
            animate={{ x: 0 }}
            whileHover={{ x: 3 }}
            className="inline-block"
          >
            →
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}