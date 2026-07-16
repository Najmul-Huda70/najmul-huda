"use server";

import { db } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import type { Project, SkillTag } from "@/models/types";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

// ---- Toggle featured yes/no ----
export async function toggleFeatured(
  projectId: string,
  currentValue: boolean
) {
  await requireAdmin();

  if (!projectId) throw new Error("Missing project id");

  await db
    .collection("projects")
    .updateOne(
      { _id: new ObjectId(projectId) },
      { $set: { featured: !currentValue } }
    );

  revalidatePath("/admin");
}

// ---- Shared helper: build a project object from FormData ----
function buildProjectFromForm(formData: FormData): Omit<Project, "_id"> {
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const images = (formData.get("image") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const repoLabels = formData.getAll("repoLabel") as string[];
  const repoUrls = formData.getAll("repoUrl") as string[];
  const repository = repoLabels
    .map((label, i) => ({ id: String(i), label, url: repoUrls[i] }))
    .filter((r) => r.label && r.url);

  return {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    year: Number(formData.get("year")),
    type: formData.get("type") as string,
    metricValue: (formData.get("metricValue") as string) || undefined,
    metricLabel: (formData.get("metricLabel") as string) || undefined,
    tags,
    short_description: formData.get("short_description") as string,
    description: formData.get("description") as string,
    featured: formData.get("featured") === "true",
    image: images,
    repository,
    live: (formData.get("live") as string) || undefined,
  } as Omit<Project, "_id">;
}

// ---- Create new project ----
export async function createProject(formData: FormData) {
  await requireAdmin();

  const project = buildProjectFromForm(formData);

  await db.collection<Project>("projects").insertOne(project as Project);

  revalidatePath("/admin");
  redirect("/admin");
}

// ---- Update existing project ----
export async function updateProject(projectId: string, formData: FormData) {
  await requireAdmin();

  if (!projectId) throw new Error("Missing project id");

  const update = buildProjectFromForm(formData);

  await db
    .collection<Project>("projects")
    .updateOne({ _id: new ObjectId(projectId).toString() }, { $set: update });

  revalidatePath("/admin");
  redirect("/admin");
}

// ---- Delete project ----
export async function deleteProject(projectId: string) {
  await requireAdmin();

  if (!projectId) throw new Error("Missing project id");

  await db.collection("projects").deleteOne({ _id: new ObjectId(projectId) });

  revalidatePath("/admin");
}

export async function getSkillTags(): Promise<SkillTag[]> {
  const tags = await db
    .collection<SkillTag>("tags")
    .find()
    .sort({ category: 1, order: 1 })
    .toArray();
 
  return JSON.parse(JSON.stringify(tags));
}
 
// ---- Add a new skill tag ----
export async function addSkillTag(formData: FormData) {
  await requireAdmin();
 
  const name = (formData.get("name") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim().toLowerCase();
  const category = formData.get("category") as string;
 
  if (!name || !category) {
    throw new Error("Name and category are required");
  }
 
  const tag: SkillTag = {
    name,
    slug: slug || name.toLowerCase().replace(/\s+/g, ""),
    category: category as SkillTag["category"],
  };
 
  await db.collection<SkillTag>("tags").insertOne(tag as any);
 
  revalidatePath("/");
  revalidatePath("/admin/skills");
}
 
// ---- Delete a skill tag ----
export async function deleteSkillTag(id: string) {
  await requireAdmin();
 
  const { ObjectId } = await import("mongodb");
  await db.collection("tags").deleteOne({ _id: new ObjectId(id) });
 
  revalidatePath("/");
  revalidatePath("/admin/skills");
}