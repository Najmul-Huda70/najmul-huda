import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getWorkById, updateWork, getCategories, getSkillTags } from "@/lib/action";
import { ArrowLeft } from "lucide-react";
import { ImageUploader } from "@/components/forms";
import { TagPicker } from "@/components/shared";

export const dynamic = "force-dynamic";

interface EditWorkPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditWorkPage({ params }: EditWorkPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const work = await getWorkById(id);

  if (!work) {
    notFound();
  }

  const workCategories = await getCategories("work");
  const availableTags = await getSkillTags();

  async function handleSubmit(formData: FormData) {
    "use server";
    await updateWork(id, formData);
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
          [ ADMIN / EDIT WORK ]
        </p>
        <h1 className="font-serif italic text-3xl sm:text-4xl text-text">
          Edit Work.
        </h1>
        <p className="text-text2 text-xs sm:text-sm mt-1 font-sans">
          Showcase a project — full write-up is read live from its GitHub README.
        </p>
      </div>

      <form
        action={handleSubmit}
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
            defaultValue={work.title}
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
              defaultValue={work.category}
              className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent capitalize"
            >
              {workCategories.length === 0 && (
                <option value={work.category} disabled>
                  No work categories found — add one in Admin / Categories
                </option>
              )}
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
              defaultValue={work.type}
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
              defaultValue={work.status}
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
              defaultValue={work.year}
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
            defaultValue={work.short_description}
            placeholder="One or two lines shown on the project card..."
            className="w-full bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Images */}
        <div className="space-y-1.5">
          <label className="block font-mono text-xs text-text2 uppercase tracking-wider">
            Work Images
          </label>
          <ImageUploader name="image" maxImages={6} initialUrls={work.image || []} />
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
              defaultValue={work.metricValue}
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
              defaultValue={work.metricLabel}
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
          <TagPicker
            name="tags"
            availableTags={availableTags}
            defaultSelected={work.tags || []}
          />
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
            defaultValue={work.githubUrl || ""}
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
              defaultChecked={work.featured}
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
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}
