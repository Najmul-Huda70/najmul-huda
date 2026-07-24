import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createBlogPost, getCategories } from "@/lib/action";
import { ArrowLeft } from "lucide-react";
import { ImageUploader } from "@/components/forms";

export const dynamic = "force-dynamic";

export default async function AddBlogPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  // getCategories must filter by { type: "blog" } in the DB layer — see lib/action.ts snippet
  const blogCategories = await getCategories("blog");

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
          [ ADMIN / BLOG ]
        </p>
        <h1 className="font-serif italic text-3xl sm:text-4xl text-text">
          Add New Blog Post.
        </h1>
        <p className="text-text2 text-xs sm:text-sm mt-1 font-sans">
          Content is always pulled live from GitHub — nothing is stored here.
        </p>
      </div>

      <form
        action={createBlogPost}
        className="space-y-6 bg-surface/30 border border-border/60 p-6 sm:p-8 rounded-2xl backdrop-blur-sm"
      >
        {/* Title */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Title *
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g. Building Scalable Web Apps with Next.js 16"
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Category *
          </label>
          <select
            name="category"
            required
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent capitalize"
          >
            <option value="" disabled>
              {blogCategories.length
                ? "Select a category"
                : "No blog categories yet — add one in Atlas"}
            </option>
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
            Short Excerpt / Summary *
          </label>
          <textarea
            name="excerpt"
            rows={2}
            required
            placeholder="Brief introduction displayed on article cards..."
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Cover Image — single image, remove-then-add flow */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Cover Image (Optional)
          </label>
          <ImageUploader name="coverImage" />
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
              defaultValue="5 min read"
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
              placeholder="Nextjs, React, Tailwind"
              className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* GitHub source — required, content always fetched live from here */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            GitHub Markdown URL *
          </label>
          <input
            type="text"
            name="githubMdUrl"
            required
            placeholder="https://github.com/user/repo/blob/main/README.md"
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent font-mono text-xs"
          />
          <p className="text-[11px] text-text3">
            Article content is always read live from this file — nothing is
            saved to the database. Edit the file on GitHub to update the post.
          </p>
        </div>

        {/* Options */}
        <div className="flex items-center gap-6 pt-2 border-t border-border/40">
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono text-text2">
            <input
              type="checkbox"
              name="published"
              defaultChecked
              className="rounded bg-surface border-border text-accent focus:ring-0"
            />
            Publish Immediately
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono text-text2">
            <input
              type="checkbox"
              name="featured"
              className="rounded bg-surface border-border text-accent focus:ring-0"
            />
            Feature on Blog
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
            Publish Article
          </button>
        </div>
      </form>
    </section>
  );
}
