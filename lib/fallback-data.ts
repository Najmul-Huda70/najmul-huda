import type { Project, StatItem, TimelineEntry } from "@/models/types";



export const FALLBACK_STATS: StatItem[] = [
  { key: "cf_rating", label: "Codeforces rating", value: "1847", order: 0 },
  { key: "problems", label: "Problems solved", value: "420+", order: 1 },
  { key: "contests", label: "Contests joined", value: "65", order: 2 },
  { key: "projects", label: "Projects shipped", value: "12", order: 3 },
];

export const FALLBACK_TIMELINE: TimelineEntry[] = [
  {
    role: "SCHOOL · FIRST LINES OF CODE",
    meta: "SELF-TAUGHT · 2022",
    heading: "Where it began",
    description:
      "Started with C and basic problem solving, got curious about how programs actually think.",
    order: 0,
  },
  {
    role: "CODEFORCES · COMPETITIVE PROGRAMMING",
    meta: "DSA FOUNDATIONS · 2023",
    heading: "Sharpening the fundamentals",
    description:
      "Began solving on Codeforces daily, built strong data structures and algorithms fundamentals through contests.",
    order: 1,
  },
  {
    role: "FULL-STACK · NEXT.JS & TYPESCRIPT",
    meta: "WEB DEVELOPMENT · 2024",
    heading: "Designing for the web",
    description:
      "Learned Next.js, TypeScript, Tailwind CSS and MongoDB, shipped my first full-stack web apps end to end.",
    order: 2,
  },
  {
    role: "BUILDING IN PUBLIC · FREELANCE",
    meta: "PERSONAL PROJECTS · 2025-26",
    heading: "Where I am now",
    description:
      "Actively competing in contests, taking on freelance and personal projects, and growing this portfolio.",
    order: 3,
  },
];
