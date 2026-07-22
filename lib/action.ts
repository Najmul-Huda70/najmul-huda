"use server";

import { db } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import type { Project, SkillTag } from "@/models/types";

async function requireAdmin() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });
  
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

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
    description: (formData.get("description") as string) || undefined,
    featured: formData.get("featured") === "on",
    image: images,
    repository,
    live: (formData.get("live") as string) || undefined,
  } as Omit<Project, "_id">;
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const project = buildProjectFromForm(formData);

  await db.collection<Project>("projects").insertOne(project as Project);

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProject(projectId: string, formData: FormData) {
  await requireAdmin();

  if (!projectId) throw new Error("Missing project id");

  const update = buildProjectFromForm(formData);

  await db
    .collection<Project>("projects")
    .updateOne({ _id: new ObjectId(projectId) } as any, { $set: update });

  revalidatePath("/admin");
}

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

export async function deleteSkillTag(id: string) {
  await requireAdmin();

  await db.collection("tags").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = await db
      .collection("projects")
      .findOne({ _id: new ObjectId(id) });

    if (!project) return null;

    return JSON.parse(JSON.stringify(project)) as Project;
  } catch (err) {
    console.error("[getProjectById] failed:", err);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* CATEGORIES ACTIONS                                                         */
/* -------------------------------------------------------------------------- */

export async function getCategories(type?: "work" | "blog") {
  try {
    const query = type ? { type } : {};
    const categories = await db
      .collection("categories")
      .find(query)
      .sort({ order: 1, label: 1 })
      .toArray();
    return JSON.parse(JSON.stringify(categories));
  } catch (err) {
    console.error("[getCategories] failed:", err);
    return [];
  }
}

export async function addCategory(formData: FormData) {
  await requireAdmin();
  const label = (formData.get("label") as string)?.trim();
  const type = formData.get("type") as "work" | "blog";
  const slugInput = (formData.get("slug") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || "";

  if (!label || !type) throw new Error("Label and type are required");

  const slug = slugInput || label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  await db.collection("categories").insertOne({
    type,
    label,
    slug,
    description,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/admin");
  revalidatePath("/work");
  revalidatePath("/blog");
}

export async function updateCategory(id: string, formData: FormData) {
  await requireAdmin();
  const label = (formData.get("label") as string)?.trim();
  const type = formData.get("type") as "work" | "blog";
  const slugInput = (formData.get("slug") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || "";

  if (!id || !label || !type) throw new Error("Missing required fields");

  const slug = slugInput || label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  await db.collection("categories").updateOne(
    { _id: new ObjectId(id) },
    { $set: { label, type, slug, description } }
  );

  revalidatePath("/admin");
  revalidatePath("/work");
  revalidatePath("/blog");
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  if (!id) throw new Error("Missing category id");

  await db.collection("categories").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/admin");
  revalidatePath("/work");
  revalidatePath("/blog");
}

/* -------------------------------------------------------------------------- */
/* BLOG ACTIONS                                                               */
/* -------------------------------------------------------------------------- */

export async function getBlogPosts(publishedOnly = false) {
  try {
    const query = publishedOnly ? { published: true } : {};
    const posts = await db
      .collection("blogs")
      .find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(posts));
  } catch (err) {
    console.error("[getBlogPosts] failed:", err);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await db.collection("blogs").findOne({ slug });
    if (!post) return null;
    return JSON.parse(JSON.stringify(post));
  } catch (err) {
    console.error("[getBlogPostBySlug] failed:", err);
    return null;
  }
}

export async function getBlogPostById(id: string) {
  try {
    const post = await db.collection("blogs").findOne({ _id: new ObjectId(id) });
    if (!post) return null;
    return JSON.parse(JSON.stringify(post));
  } catch (err) {
    console.error("[getBlogPostById] failed:", err);
    return null;
  }
}

export async function createBlogPost(formData: FormData) {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const slugInput = (formData.get("slug") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const coverImage = (formData.get("coverImage") as string)?.trim();
  const readTime = (formData.get("readTime") as string)?.trim() || "5 min read";
  const published = formData.get("published") === "on" || formData.get("published") === "true";
  const featured = formData.get("featured") === "on" || formData.get("featured") === "true";
  
  const tagsStr = (formData.get("tags") as string) || "";
  const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

  if (!title || !category || !content) {
    throw new Error("Title, Category and Content are required");
  }

  const slug = slugInput || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  await db.collection("blogs").insertOne({
    title,
    slug,
    category,
    excerpt: excerpt || title,
    content,
    coverImage: coverImage || "",
    tags,
    readTime,
    published,
    featured,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAdmin();

  if (!id) throw new Error("Missing blog id");

  const title = (formData.get("title") as string)?.trim();
  const slugInput = (formData.get("slug") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const coverImage = (formData.get("coverImage") as string)?.trim();
  const readTime = (formData.get("readTime") as string)?.trim() || "5 min read";
  const published = formData.get("published") === "on" || formData.get("published") === "true";
  const featured = formData.get("featured") === "on" || formData.get("featured") === "true";

  const tagsStr = (formData.get("tags") as string) || "";
  const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

  const slug = slugInput || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  await db.collection("blogs").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title,
        slug,
        category,
        excerpt,
        content,
        coverImage,
        tags,
        readTime,
        published,
        featured,
        updatedAt: new Date().toISOString(),
      },
    }
  );

  revalidatePath("/blog");
  revalidatePath("/admin");
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  if (!id) throw new Error("Missing blog id");

  await db.collection("blogs").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/blog");
  revalidatePath("/admin");
}

export async function toggleBlogPublished(id: string, currentValue: boolean) {
  await requireAdmin();
  if (!id) throw new Error("Missing blog id");

  await db
    .collection("blogs")
    .updateOne({ _id: new ObjectId(id) }, { $set: { published: !currentValue } });

  revalidatePath("/blog");
  revalidatePath("/admin");
}

/* -------------------------------------------------------------------------- */
/* RESUME EDUCATION ACTIONS                                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* HOMEPAGE STATS ACTIONS (impact strip — "Case Study Editorial" theme)       */
/* -------------------------------------------------------------------------- */

export async function getStatItems() {
  try {
    const items = await db
      .collection("stats")
      .find()
      .sort({ order: 1 })
      .toArray();
    return JSON.parse(JSON.stringify(items));
  } catch (err) {
    console.error("[getStatItems] failed:", err);
    return [];
  }
}

export async function addStatItem(formData: FormData) {
  await requireAdmin();
  const key = (formData.get("key") as string)?.trim();
  const label = (formData.get("label") as string)?.trim();
  const value = (formData.get("value") as string)?.trim();
  const order = Number(formData.get("order")) || 0;

  if (!key || !label || !value) {
    throw new Error("Key, Label, and Value are required");
  }

  await db.collection("stats").insertOne({
    key,
    label,
    value,
    order,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateStatItem(id: string, formData: FormData) {
  await requireAdmin();
  if (!id) throw new Error("Missing id");

  const key = (formData.get("key") as string)?.trim();
  const label = (formData.get("label") as string)?.trim();
  const value = (formData.get("value") as string)?.trim();
  const order = Number(formData.get("order")) || 0;

  await db
    .collection("stats")
    .updateOne({ _id: new ObjectId(id) }, { $set: { key, label, value, order } });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteStatItem(id: string) {
  await requireAdmin();
  if (!id) throw new Error("Missing id");

  await db.collection("stats").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function getEducations() {
  try {
    const items = await db
      .collection("educations")
      .find()
      .sort({ order: 1, period: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(items));
  } catch (err) {
    console.error("[getEducations] failed:", err);
    return [];
  }
}

export async function addEducation(formData: FormData) {
  await requireAdmin();
  const degree = (formData.get("degree") as string)?.trim();
  const institution = (formData.get("institution") as string)?.trim();
  const fieldOfStudy = (formData.get("fieldOfStudy") as string)?.trim() || "";
  const period = (formData.get("period") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || "";
  const grade = (formData.get("grade") as string)?.trim() || "";
  const order = Number(formData.get("order")) || 0;

  if (!degree || !institution || !period) {
    throw new Error("Degree, Institution, and Period are required");
  }

  await db.collection("educations").insertOne({
    degree,
    institution,
    fieldOfStudy,
    period,
    description,
    grade,
    order,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/resume");
  revalidatePath("/admin");
}

export async function updateEducation(id: string, formData: FormData) {
  await requireAdmin();
  if (!id) throw new Error("Missing id");

  const degree = (formData.get("degree") as string)?.trim();
  const institution = (formData.get("institution") as string)?.trim();
  const fieldOfStudy = (formData.get("fieldOfStudy") as string)?.trim() || "";
  const period = (formData.get("period") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || "";
  const grade = (formData.get("grade") as string)?.trim() || "";
  const order = Number(formData.get("order")) || 0;

  await db.collection("educations").updateOne(
    { _id: new ObjectId(id) },
    { $set: { degree, institution, fieldOfStudy, period, description, grade, order } }
  );

  revalidatePath("/resume");
  revalidatePath("/admin");
}

export async function deleteEducation(id: string) {
  await requireAdmin();
  if (!id) throw new Error("Missing id");

  await db.collection("educations").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/resume");
  revalidatePath("/admin");
}

/* -------------------------------------------------------------------------- */
/* RESUME SKILLS ACTIONS                                                      */
/* -------------------------------------------------------------------------- */

export async function getSkillItems() {
  try {
    const items = await db
      .collection("skill_items")
      .find()
      .sort({ category: 1, order: 1, percentage: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(items));
  } catch (err) {
    console.error("[getSkillItems] failed:", err);
    return [];
  }
}

export async function addSkillItem(formData: FormData) {
  await requireAdmin();
  const name = (formData.get("name") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const percentage = Number(formData.get("percentage")) || 0;
  const icon = (formData.get("icon") as string)?.trim() || "code";
  const subtitle = (formData.get("subtitle") as string)?.trim() || "";
  const order = Number(formData.get("order")) || 0;

  if (!name || !category) {
    throw new Error("Skill Name and Category are required");
  }

  await db.collection("skill_items").insertOne({
    name,
    category,
    percentage,
    icon,
    subtitle,
    order,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/resume");
  revalidatePath("/admin");
}

export async function updateSkillItem(id: string, formData: FormData) {
  await requireAdmin();
  if (!id) throw new Error("Missing id");

  const name = (formData.get("name") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const percentage = Number(formData.get("percentage")) || 0;
  const icon = (formData.get("icon") as string)?.trim() || "code";
  const subtitle = (formData.get("subtitle") as string)?.trim() || "";
  const order = Number(formData.get("order")) || 0;

  await db.collection("skill_items").updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, category, percentage, icon, subtitle, order } }
  );

  revalidatePath("/resume");
  revalidatePath("/admin");
}

export async function deleteSkillItem(id: string) {
  await requireAdmin();
  if (!id) throw new Error("Missing id");

  await db.collection("skill_items").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/resume");
  revalidatePath("/admin");
}

/* -------------------------------------------------------------------------- */
/* RESUME EXPERIENCE ACTIONS                                                  */
/* -------------------------------------------------------------------------- */

export async function getExperiences() {
  try {
    const items = await db
      .collection("experiences")
      .find()
      .sort({ order: 1, period: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(items));
  } catch (err) {
    console.error("[getExperiences] failed:", err);
    return [];
  }
}

export async function addExperience(formData: FormData) {
  await requireAdmin();
  const role = (formData.get("role") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const location = (formData.get("location") as string)?.trim() || "";
  const period = (formData.get("period") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || "";
  const techStackStr = (formData.get("techStack") as string) || "";
  const techStack = techStackStr.split(",").map((t) => t.trim()).filter(Boolean);
  const order = Number(formData.get("order")) || 0;

  if (!role || !company || !period) {
    throw new Error("Role, Company, and Period are required");
  }

  await db.collection("experiences").insertOne({
    role,
    company,
    location,
    period,
    description,
    techStack,
    order,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/resume");
  revalidatePath("/admin");
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAdmin();
  if (!id) throw new Error("Missing id");

  const role = (formData.get("role") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const location = (formData.get("location") as string)?.trim() || "";
  const period = (formData.get("period") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || "";
  const techStackStr = (formData.get("techStack") as string) || "";
  const techStack = techStackStr.split(",").map((t) => t.trim()).filter(Boolean);
  const order = Number(formData.get("order")) || 0;

  await db.collection("experiences").updateOne(
    { _id: new ObjectId(id) },
    { $set: { role, company, location, period, description, techStack, order } }
  );

  revalidatePath("/resume");
  revalidatePath("/admin");
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  if (!id) throw new Error("Missing id");

  await db.collection("experiences").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/resume");
  revalidatePath("/admin");
}

/* -------------------------------------------------------------------------- */
/* RESUME CERTIFICATE ACTIONS                                                 */
/* -------------------------------------------------------------------------- */

export async function getCertificates() {
  try {
    // Sort latest certificate first (issueDate descending or createdAt descending)
    const items = await db
      .collection("certificates")
      .find()
      .sort({ issueDate: -1, createdAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(items));
  } catch (err) {
    console.error("[getCertificates] failed:", err);
    return [];
  }
}

export async function addCertificate(formData: FormData) {
  await requireAdmin();
  const title = (formData.get("title") as string)?.trim();
  const issuer = (formData.get("issuer") as string)?.trim();
  const issueDate = (formData.get("issueDate") as string)?.trim();
  const credentialUrl = (formData.get("credentialUrl") as string)?.trim() || "";
  const credentialId = (formData.get("credentialId") as string)?.trim() || "";
  const image = (formData.get("image") as string)?.trim() || "";
  const description = (formData.get("description") as string)?.trim() || "";
  const order = Number(formData.get("order")) || 0;

  if (!title || !issuer || !issueDate) {
    throw new Error("Title, Issuer, and Issue Date are required");
  }

  await db.collection("certificates").insertOne({
    title,
    issuer,
    issueDate,
    credentialUrl,
    credentialId,
    image,
    description,
    order,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/resume");
  revalidatePath("/admin");
}

export async function updateCertificate(id: string, formData: FormData) {
  await requireAdmin();
  if (!id) throw new Error("Missing id");

  const title = (formData.get("title") as string)?.trim();
  const issuer = (formData.get("issuer") as string)?.trim();
  const issueDate = (formData.get("issueDate") as string)?.trim();
  const credentialUrl = (formData.get("credentialUrl") as string)?.trim() || "";
  const credentialId = (formData.get("credentialId") as string)?.trim() || "";
  const image = (formData.get("image") as string)?.trim() || "";
  const description = (formData.get("description") as string)?.trim() || "";
  const order = Number(formData.get("order")) || 0;

  await db.collection("certificates").updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, issuer, issueDate, credentialUrl, credentialId, image, description, order } }
  );

  revalidatePath("/resume");
  revalidatePath("/admin");
}

export async function deleteCertificate(id: string) {
  await requireAdmin();
  if (!id) throw new Error("Missing id");

  await db.collection("certificates").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/resume");
  revalidatePath("/admin");
}