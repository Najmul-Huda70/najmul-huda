"use client";

import React from "react";
import type { ExperienceItem } from "@/models/types";
import EmptyState from "@/components/shared/EmptyState";
import { Briefcase, MapPin } from "lucide-react";

export default function ExperienceSection({ items }: { items: ExperienceItem[] }) {
  if (!items || items.length === 0) {
    return (
      <EmptyState
        badge="[ UPCOMING EXPERIENCE ]"
        title="Upcoming Career Milestones"
        description="Professional experience and work history details are currently being updated. Coming soon!"
      />
    );
  }

  return (
    <div className="py-6 max-w-4xl mx-auto">
      <div className="relative pl-6 md:pl-8 border-l border-border/40 space-y-10">
        {items.map((item, index) => (
          <div key={item._id || index} className="relative group">
            {/* Timeline node marker */}
            <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-accent flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgb(var(--accent)/0.3)]">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            </div>

            {/* Content card */}
            <div className="bg-surface/30 border border-border/60 rounded-2xl p-6 hover:border-accent/40 transition-colors backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs tracking-wider text-accent px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                  {item.period}
                </span>

                {item.location && (
                  <span className="flex items-center gap-1 font-mono text-xs text-text3">
                    <MapPin size={12} className="text-text3" />
                    {item.location}
                  </span>
                )}
              </div>

              <h3 className="font-serif italic text-2xl text-text mb-1 flex items-center gap-2">
                <Briefcase size={22} className="text-accent shrink-0" />
                {item.role}
              </h3>

              <div className="font-mono text-xs text-text3 mb-4 uppercase tracking-wider">
                {item.company}
              </div>

              {item.description && (
                <p className="text-text2 text-sm leading-relaxed font-sans mb-4">
                  {item.description}
                </p>
              )}

              {item.techStack && item.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/20">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-surface2/60 border border-border/40 text-text2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
