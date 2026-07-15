"use server";

import { db } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Project } from "@/models/types";

export async function createProject(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

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
    .map((label, i) => ({ label, url: repoUrls[i] }))
    .filter((r) => r.label && r.url);

  const project: Omit<Project, "_id"> = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    year: Number(formData.get("year")),
    type: formData.get("type") as string,
    metricValue: formData.get("metricValue") as string,
    metricLabel: formData.get("metricLabel") as string,
    tags,
    short_description: formData.get("short_description") as string,
    description: formData.get("description") as string,
    featured: formData.get("featured") === "on",
    image: images,
    repository,
    live: (formData.get("live") as string) || undefined,
  };

  await db.collection<Project>("projects").insertOne(project as Project);

  revalidatePath("/admin");
  redirect("/admin");
}

