import { Suspense } from "react";
import type { StatItem } from "@/models/types";
import { db } from "@/lib/auth";
import StatCounter from "@/components/shared/StatCounter";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";

async function getStats(): Promise<StatItem[]> {
  try {
    const stats = await db
      .collection<StatItem>("stats")
      .find({})
      .sort({ order: 1 })
      .toArray();
    return JSON.parse(JSON.stringify(stats));
  } catch (err) {
    console.error("[StatsSection] failed to load stats", err);
    return [];
  }
}

async function StatsData() {
  const stats = await getStats();

  // Decorative impact strip — if no stats are configured yet, skip the
  // section entirely rather than showing an empty-state block.
  if (stats.length === 0) return null;

  return (
    <section
      id="stats"
      className="px-[6%] py-16 max-w-[1180px] mx-auto border-y border-border/60"
    >
      <StaggerContainer
        className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
        staggerDelay={0.08}
      >
        {stats.map((stat) => (
          <StaggerItem key={stat.key} className="text-center md:text-left">
            <div className="font-serif italic text-[clamp(32px,4.5vw,44px)] text-accent leading-none mb-2">
              <StatCounter value={stat.value} />
            </div>
            <div className="text-[13px] text-text2 leading-snug max-w-[160px] mx-auto md:mx-0">
              {stat.label}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

function StatsSkeleton() {
  return (
    <section className="px-[6%] py-16 max-w-[1180px] mx-auto border-y border-border/60 animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="text-center md:text-left">
            <div className="h-9 w-16 rounded bg-border mb-2 mx-auto md:mx-0" />
            <div className="h-3 w-24 rounded bg-border mx-auto md:mx-0" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function StatsSection() {
  return (
    <Suspense fallback={<StatsSkeleton />}>
      <StatsData />
    </Suspense>
  );
}
