// Adjust this import path so it points to the file where you export `db`
// (the same `db` you pass into mongodbAdapter inside auth.ts).
import { db } from "@/lib/auth";
import type { Project } from "@/models/types";


const COLLECTION = "projects";

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = await db
    .collection<Project>(COLLECTION)
    .findOne({ slug }, { projection: { _id: 0 } });

  return project;
}

export async function getRelatedProjects(
  category: string,
  excludeSlug: string,
  limit = 2
): Promise<Project[]> {
  const projects = await db
    .collection<Project>(COLLECTION)
    .find(
      { category, slug: { $ne: excludeSlug } },
      { projection: { _id: 0 } }
    )
    .sort({ year: -1 })
    .limit(limit)
    .toArray();

  return projects;
}