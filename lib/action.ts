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
export async function toggleFeatured(projectId: string, currentValue: boolean) {
  await requireAdmin();

  if (!projectId) throw new Error("Missing project id");

  // এখানে কালেকশনে জেনেরিক টাইপ দেওয়া যাবে না অথবা `any` ফিল্টার ইউজ করতে হবে
  await db.collection("projects").updateOne(
    { _id: new ObjectId(projectId) },
    { $set: { featured: !currentValue } }
  );

  revalidatePath("/admin");
}

// ---- Create new project ----
export async function createProject(formData: FormData) {
  await requireAdmin();

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
  
  // repository ইন্টারফেসের 'id' ফিল্ডের অবলিগেশন ঠিক রাখতে মান পাস
  const repository = repoLabels
    .map((label, i) => ({ id: String(i), label, url: repoUrls[i] }))
    .filter((r) => r.label && r.url);

  // Omit<_id> বা সরাসরি object টাইপ রাখা যাতে insertOne এ ঝামেলা না করে
  const project = {
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
    featured: formData.get("featured") === "on",
    image: images,
    repository,
    live: (formData.get("live") as string) || undefined,
  };

  // ডাটাবেজে ইনসার্ট করার সময় কালেকশনকে dynamic/any অবজেক্ট হিসেবে পাস করা নিরাপদ
  await db.collection("projects").insertOne(project);

  revalidatePath("/admin");
  redirect("/admin");
}

// ---- Update existing project ----
export async function updateProject(projectId: string, formData: FormData) {
  await requireAdmin();

  if (!projectId) throw new Error("Missing project id");

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

  // আংশিক আপডেটের জন্য Partial কিন্তু _id ছাড়া
  const update: Partial<Omit<Project, "_id">> = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    year: Number(formData.get("year")),
    type: formData.get("type") as string,
    metricValue: formData.get("metricValue") as string || undefined,
    metricLabel: formData.get("metricLabel") as string || undefined,
    tags,
    short_description: formData.get("short_description") as string,
    description: formData.get("description") as string,
    featured: formData.get("featured") === "true",
    image: images,
    repository,
    live: (formData.get("live") as string) || undefined,
  };

  // { _id: new ObjectId() } মঙ্গোডিবি অবজেক্ট আইডি নেয়, টাইপ কনফ্লিক্ট এড়াতে <any> ব্যবহার করা হয়েছে
  await db
    .collection<any>("projects")
    .updateOne({ _id: new ObjectId(projectId) }, { $set: update });

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