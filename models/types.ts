import type { ObjectId } from "mongodb";

export type WorkCategory = string;

export type WorkStatus = "live" | "progress" | "archived";
export type WorkType = "personal" | "team";

export interface Work {
  _id: string;
  title: string;
  status: WorkStatus;
  year: number;
  type: WorkType;
  category: WorkCategory;
  short_description: string;
  featured: boolean;
  tags: string[];
  image: string[];
  metricValue?: string;
  metricLabel?: string;
  githubUrl?: string;
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

export interface CategoryItem {
  _id?: string;
  type: "work" | "blog";
  label: string;
  slug: string;
  description?: string;
  order?: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  readTime?: string;
  published: boolean;
  featured?: boolean;
  sourceUrl?: string;
}

export interface EducationItem {
  _id?: string;
  degree: string;
  institution: string;
  fieldOfStudy?: string;
  period: string;
  description?: string;
  grade?: string;
  order?: number;
}

export interface SkillItem {
  _id?: string;
  name: string;
  category: string;
  percentage: number;
  icon?: string;
  subtitle?: string;
  order?: number;
}

export interface ExperienceItem {
  _id?: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  techStack?: string[];
  order?: number;
}

export interface CertificateItem {
  _id?: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
  image?: string;
  description?: string;
  order?: number;
}