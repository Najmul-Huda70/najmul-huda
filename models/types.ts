import type { ObjectId } from "mongodb";

export type ProjectCategory = "web" | "cp" | "opensource";

export interface Project {
  _id?: ObjectId;
  slug: string;
  title: string;
  category: ProjectCategory;
  status: "live" | "archived" | "in-progress";
  year: number;
  type: string; // e.g. "Personal project", "Team project", "Open source"
  metricValue: string; // e.g. "300ms", "1.2k", "200+"
  metricLabel: string; // e.g. "avg API response time"
  tags: string[];
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean; // shown in the homepage "Top Projects" grid
  order: number; // manual sort order within featured grid
}

export interface StatItem {
  _id?: ObjectId;
  key: string; // e.g. "cf_rating"
  label: string; // e.g. "Codeforces rating"
  value: string; // e.g. "1847"
  order: number;
}

export interface TimelineEntry {
  _id?: ObjectId;
  role: string; // e.g. "SCHOOL · FIRST LINES OF CODE"
  meta: string; // e.g. "SELF-TAUGHT · 2022"
  heading: string; // e.g. "Where it began"
  description: string;
  order: number;
}

export interface AboutTab {
  id: "who" | "education" | "achievements";
  label: string;
  paragraphs: string[];
}
