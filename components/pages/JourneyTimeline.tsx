"use client";

import { useEffect, useRef, useState } from "react";
import type { TimelineEntry } from "@/models/types";
import { useRevealGroup } from "@/lib/use-reveal";

export default function JourneyTimeline({
  entries,
}: {
  entries: TimelineEntry[];
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRevealGroup<HTMLDivElement>(".timeline-entry");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh * 0.4;
      const scrolled = vh * 0.6 - rect.top;
      let pct = total > 0 ? (scrolled / total) * 100 : 0;
      pct = Math.max(0, Math.min(100, pct));
      setProgress(pct);
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="px-[6%] py-16 md:py-20 max-w-[1180px] mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 md:gap-14">
        <div className="md:sticky md:top-[100px] self-start h-fit">
          <div className="font-mono text-[11px] tracking-[2px] text-accent mb-2">
            [ MY JOURNEY ]
          </div>
          <h2 className="font-serif italic text-[24px] md:text-[28px] mb-2">
            Where I have grown
          </h2>
          <p className="text-text2 text-sm max-w-[280px] mb-6 md:mb-8">
            From first lines of code to competitive programming and
            full-stack apps.
          </p>
          <div className="flex justify-between font-mono text-[10px] tracking-[1px] text-text3 mb-2">
            <span>FOUNDATIONS</span>
            <span>TODAY</span>
          </div>
          <div className="h-px bg-border relative">
            <div
              className="absolute top-0 left-0 h-px bg-accent transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div ref={listRef} className="relative pl-6 md:pl-7">
          <div className="absolute left-0 top-1.5 bottom-1.5 w-px bg-border" />

          {entries.map((entry, i) => (
            <div
              key={entry._id ?? i}
              className="timeline-entry reveal relative pb-10 md:pb-14 last:pb-0"
            >
              <span className="absolute -left-[26px] md:-left-8 top-1 w-2 h-2 rounded-full bg-accent shadow-[0_0_0_4px_rgb(var(--bg))]" />
              <div className="font-mono text-[11px] tracking-[1px] text-accent mb-1">
                {entry.role}
              </div>
              <div className="font-mono text-[11px] tracking-[0.5px] text-text3 mb-3.5">
                {entry.meta}
              </div>
              <h3 className="font-serif italic text-xl md:text-2xl mb-3.5">
                {entry.heading}
              </h3>
              <p className="text-sm text-text2 leading-[1.7] max-w-[520px]">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}