import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getBlogPostById, updateBlogPost, getCategories } from "@/lib/action";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  const blogCategories = await getCategories("blog");

  async function handleSubmit(formData: FormData) {
    "use server";
    await updateBlogPost(id, formData);
    redirect("/admin");
  }

  return (
    <section className="px-5 sm:px-[6%] py-12 sm:py-16 max-w-[800px] mx-auto">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 font-mono text-xs text-text3 hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        <span>[ Back to Admin Console ]</span>
      </Link>

      <div className="mb-8">
        <p className="font-mono text-[10px] tracking-[2px] text-accent uppercase mb-1">
          [ ADMIN / EDIT BLOG ]
        </p>
        <h1 className="font-serif italic text-3xl sm:text-4xl text-text">
          Edit Blog Post.
        </h1>
        <p className="text-text2 text-xs sm:text-sm mt-1 font-sans">
          Update article content, category, or publish settings.
        </p>
      </div>

      <form action={handleSubmit} className="space-y-6 bg-surface/30 border border-border/60 p-6 sm:p-8 rounded-2xl backdrop-blur-sm">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Title *
          </label>
          <input
            type="text"
            name="title"
            defaultValue={post.title}
            required
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Custom Slug
          </label>
          <input
            type="text"
            name="slug"
            defaultValue={post.slug}
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent font-mono text-xs"
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Category *
          </label>
          <select
            name="category"
            defaultValue={post.category}
            required
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent capitalize"
          >
            <option value="tech">Tech & Engineering</option>
            <option value="design">Design & UI/UX</option>
            <option value="tutorial">Tutorial</option>
            <option value="general">General & Thoughts</option>
            {blogCategories.map((cat: any) => (
              <option key={cat._id} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Excerpt */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Short Excerpt / Summary
          </label>
          <textarea
            name="excerpt"
            rows={2}
            defaultValue={post.excerpt}
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent"
          />
        </div>

        {/* Cover Image URL */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            defaultValue={post.coverImage || ""}
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent"
          />
        </div>

        {/* Read Time & Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
              Read Time
            </label>
            <input
              type="text"
              name="readTime"
              defaultValue={post.readTime || "5 min read"}
              className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              name="tags"
              defaultValue={post.tags?.join(", ") || ""}
              className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Article Content *
          </label>
          <textarea
            name="content"
            rows={12}
            defaultValue={post.content}
            required
            className="w-full bg-surface2/40 border border-border/60 rounded-xl p-4 text-sm text-text focus:outline-none focus:border-accent font-sans"
          />
        </div>

        {/* Options */}
        <div className="flex items-center gap-6 pt-2 border-t border-border/40">
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono text-text2">
            <input
              type="checkbox"
              name="published"
              defaultChecked={post.published}
              className="rounded bg-surface border-border text-accent focus:ring-0"
            />
            Published
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono text-text2">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={post.featured}
              className="rounded bg-surface border-border text-accent focus:ring-0"
            />
            Featured Article
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
          <Link
            href="/admin"
            className="px-5 py-2.5 rounded-xl font-mono text-xs text-text2 hover:text-text border border-border/60 hover:border-border transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-mono text-xs text-[rgb(var(--accent-text))] font-semibold bg-accent hover:opacity-90 transition-all shadow-md shadow-accent/20"
          >
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}
