import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createWork, getCategories, getSkillTags } from "@/lib/action";
import { ArrowLeft } from "lucide-react";
import { ImageUploader } from "@/components/forms";
import { TagPicker } from "@/components/shared";

export const dynamic = "force-dynamic";

export default async function AddWorkPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const workCategories = await getCategories("work");
  const availableTags = await getSkillTags();

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
          [ ADMIN / WORK ]
        </p>
        <h1 className="font-serif italic text-3xl sm:text-4xl text-text">
          Add New Work.
        </h1>
        <p className="text-text2 text-xs sm:text-sm mt-1 font-sans">
          Showcase a project — full write-up is read live from its GitHub README.
        </p>
      </div>

      <form
        action={createWork}
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
            placeholder="e.g. Aura Canvas — Online Art Marketplace"
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Category & Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                {workCategories.length
                  ? "Select a category"
                  : "No project categories yet — add one in Atlas"}
              </option>
              {workCategories.map((cat: any) => (
                <option key={cat._id} value={cat.slug}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
              Type *
            </label>
            <select
              name="type"
              required
              defaultValue="personal"
              className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent capitalize"
            >
              <option value="personal">Personal project</option>
              <option value="team">Team project</option>
            </select>
          </div>
        </div>

        {/* Status & Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
              Status *
            </label>
            <select
              name="status"
              required
              defaultValue="live"
              className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent"
            >
              <option value="live">Live</option>
              <option value="progress">In Progress</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
              Year *
            </label>
            <input
              type="number"
              name="year"
              required
              defaultValue={new Date().getFullYear()}
              className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Short Description *
          </label>
          <textarea
            name="short_description"
            rows={2}
            required
            placeholder="One or two lines shown on the project card..."
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Images */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Work Images
          </label>
          <ImageUploader name="image" maxImages={6} />
        </div>

        {/* Metric */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
              Metric Value (Optional)
            </label>
            <input
              type="text"
              name="metricValue"
              placeholder="e.g. 40%"
              className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
              Metric Label (Optional)
            </label>
            <input
              type="text"
              name="metricLabel"
              placeholder="e.g. faster load time"
              className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Tags
          </label>
          <TagPicker name="tags" availableTags={availableTags} />
        </div>

        {/* GitHub URL — README used as the full project write-up */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            GitHub Repository URL *
          </label>
          <input
            type="text"
            name="githubUrl"
            required
            placeholder="https://github.com/user/repo"
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent font-mono text-xs"
          />
          <p className="text-[11px] text-text3">
            The project&apos;s README.md is read live from this repo and shown
            as the full description — nothing is stored separately.
          </p>
        </div>

        {/* Options */}
        <div className="flex items-center gap-6 pt-2 border-t border-border/40">
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono text-text2">
            <input
              type="checkbox"
              name="featured"
              className="rounded bg-surface border-border text-accent focus:ring-0"
            />
            Feature on Home
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
            Publish Work
          </button>
        </div>
      </form>
    </section>
  );
}