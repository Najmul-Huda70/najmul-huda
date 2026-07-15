import { Suspense } from "react";
import type { TimelineEntry } from "@/models/types";
import JourneyTimeline from "./JourneyTimeline";
import JourneyTimelineSkeleton from "./JourneySkeleton";
import JourneyEmpty from "./JourneyEmpty";
import { db } from "@/lib/auth";


async function getTimeline(): Promise<TimelineEntry[]> {
  try {
    const entries = await db
      .collection<TimelineEntry>("timeline")
      .find({})
      .sort({ order: 1 })
      .toArray();

    return JSON.parse(JSON.stringify(entries));
  } catch (err) {
    console.error("[JourneySection] failed to load timeline", err);
    return [];
  }
}

async function JourneyTimelineData() {
  const entries = await getTimeline();

  if (entries.length === 0) {
    return <JourneyEmpty/>;
  }

  return <JourneyTimeline entries={entries} />;
}

export default function JourneySection() {
  return (
    <Suspense fallback={<JourneyTimelineSkeleton />}>
      <JourneyTimelineData />
    </Suspense>
  );
}