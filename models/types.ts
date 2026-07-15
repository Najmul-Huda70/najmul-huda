import type { ObjectId } from "mongodb";

export type ProjectCategory = "web" | "app" | "client" | "opensource";
export interface Repository {
  id: string;
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