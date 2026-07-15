import type { Project, StatItem, TimelineEntry } from "@/models/types";



export const FALLBACK_STATS: StatItem[] = [
  { key: "cf_rating", label: "Codeforces rating", value: "1847", order: 0 },
  { key: "problems", label: "Problems solved", value: "420+", order: 1 },
  { key: "contests", label: "Contests joined", value: "65", order: 2 },
  { key: "projects", label: "Projects shipped", value: "12", order: 3 },
];
