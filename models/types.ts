import type { ObjectId } from "mongodb";

export type ProjectCategory = "web" | "app" | "client" | "opensource";
export type ProjectStatus = "live" | "progress" | "archived";
export type ProjectType = "personal" | "team";

export interface Repository {
  id: string;
  label: string;
  url: string;
}

export interface Project {
  _id: string;
  slug: string;
  title: string;
  status: ProjectStatus;
  year: number;
  type: ProjectType;
  category: ProjectCategory;
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
  key: string;
  label: string;
  value: string;
  order: number;
}

export interface TimelineEntry {
  _id?: string;
  order: number;
  role: string;
  meta: string;
  heading: string;
  description: string;
}

export interface AboutTab {
  id: "who" | "education" | "achievements";
  label: string;
  paragraphs: string[];
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "databases"
  | "languages"
  | "others";

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  databases: "Databases",
  languages: "Languages",
  others: "Others",
};

export interface SkillTag {
  _id?: string;
  name: string;      
  slug: string;      
  category: SkillCategory;
  order?: number;
}