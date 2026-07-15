import type { ObjectId } from "mongodb";

export type ProjectCategory = "web" | "cp" | "opensource";
export interface Repository {
  id:string;
  label: string;
  url: string;
}
export interface Project {
  _id: string;
  slug: string;
  title: string;
  status: string;
  year: number;
  type: string;
  category: string;
  short_description: string;
  description: string;
  featured: boolean;
  tags: string[];
  image: string[];
  repository: Repository[];
  live: string;
  metricValue?: string;
  metricLabel?: string;
  [key: string]: any;
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
