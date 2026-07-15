"use server";

import { db } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import type { Project } from "@/models/types";

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