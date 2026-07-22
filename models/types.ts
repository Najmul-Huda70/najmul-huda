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
  slug: string;
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