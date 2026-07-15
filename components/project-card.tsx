"use client";
import { useState } from "react";
import type { Project } from "@/models/types";
import Image from "next/image";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "● LIVE",
  archived: "ARCHIVED",
  "in-progress": "IN PROGRESS",
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      data-category={project.category}
      className="group bg-surface border border-border rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-accent"
    >
      <div className="relative h-[170px] bg-gradient-to-br from-surface2 to-border flex items-center justify-center overflow-hidden">
        <span className="absolute top-3 left-3 bg-black/55 text-white text-[10px] tracking-[1px] px-2.5 py-1.5 rounded-full backdrop-blur-sm z-10">
          {STATUS_LABEL[project.status]}
        </span>
        <span className="absolute top-3 right-3.5 font-mono text-xs text-white/60 z-10">
          {String(index + 1).padStart(2, "0")}
        </span>

        {project.image[0] && !imgError ? (
          <Image
            src={project.image[0]}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-4xl text-text3 flex items-center justify-center w-full h-full">
            ◆
          </span>
        )}
      </div>
      <div className="px-[22px] py-5">
        <h3 className="text-base mb-1">{project.title}</h3>
        <div className="text-xs text-text3 mb-3.5">
          {project.type} · {project.year}
        </div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-mono text-base text-accent font-medium">
            {project.metricValue}
          </span>
          <span className="text-xs text-text2">{project.metricLabel}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-text2 bg-surface2 px-2.5 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}