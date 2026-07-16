"use client";

import { createProject } from "@/lib/action";
import { useState } from "react";
import toast from "react-hot-toast";
import { CATEGORY_LABELS } from "@/lib/category";
import type { ProjectCategory, SkillTag } from "@/models/types";
import TagPicker from "./tagPicker";
import ImageUploader from "./imageUploader";
import CustomSelect from "./customSelect";


interface RepoField {
  id: string;
  label: string;
  url: string;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-") // spaces to hyphens
    .replace(/-+/g, "-"); // collapse multiple hyphens
}

export default function AddProjectForm({
  availableTags,
}: {
  availableTags: SkillTag[];
}) {
  const [repos, setRepos] = useState<RepoField[]>([
    { id: crypto.randomUUID(), label: "", url: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlugTouched(true);
    setSlug(value);
  }

  function addRepo() {
    setRepos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), label: "", url: "" },
    ]);
  }

  function removeRepo(id: string) {
    setRepos((prev) => prev.filter((r) => r.id !== id));
  }

  function updateRepo(id: string, field: "label" | "url", value: string) {
    setRepos((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }

  return (
    <form
      action={async (formData) => {
        const tagsRaw = (formData.get("tags") as string) || "";
        const tagList = tagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

        if (tagList.length < 1) {
          toast.error("Add at least 1 tag.");
          return;
        }

        setSubmitting(true);
        try {
          await createProject(formData);
        } finally {
          setSubmitting(false);
        }
      }}
      className="max-w-[720px] mx-auto flex flex-col gap-8"
    >
      {/* Basic info */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Basic Info ]
        </legend>

        <Field label="Title">
          <input
            name="title"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Contest Notifier"
            className={inputClass}
          />
        </Field>

        <Field label="Slug">
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="contest-notifier"
            className={inputClass}
          />
          <p className="text-[11px] text-text3 mt-0.5">
            Auto-generated from title — edit here to override.
          </p>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <CustomSelect
              name="category"
              required
              placeholder="Select category"
              options={(Object.entries(CATEGORY_LABELS) as [ProjectCategory, string][]).map(
                ([value, label]) => ({ value, label })
              )}
            />
          </Field>
          <Field label="Type">
            <CustomSelect
              name="type"
              required
              placeholder="Select type"
              options={[
                { value: "personal", label: "Personal project" },
                { value: "team", label: "Team project" },
              ]}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Status">
            <CustomSelect
              name="status"
              required
              defaultValue="live"
              options={[
                { value: "live", label: "Live" },
                { value: "progress", label: "In progress" },
                { value: "archived", label: "Archived" },
              ]}
            />
          </Field>
          <Field label="Year">
            <input
              name="year"
              type="number"
              required
              defaultValue={new Date().getFullYear()}
              className={inputClass}
            />
          </Field>
        </div>
      </fieldset>

      {/* Metric */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Metric ]
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Metric value">
            <input
              name="metricValue"
              placeholder="5k+"
              className={inputClass}
            />
          </Field>
          <Field label="Metric label">
            <input
              name="metricLabel"
              placeholder="active subscribers"
              className={inputClass}
            />
          </Field>
        </div>
      </fieldset>

      {/* Descriptions */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Description ]
        </legend>
        <Field label="Short description">
          <input
            name="short_description"
            required
            placeholder="Instant Telegram alert system for CP contests."
            className={inputClass}
          />
        </Field>
        <Field label="Full description">
          <textarea
            name="description"
            rows={4}
            placeholder="A lightweight, automated Telegram bot that crawls upcoming contests..."
            className={`${inputClass} resize-none`}
          />
        </Field>
      </fieldset>

      {/* Tags & images */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Tags &amp; Media ]
        </legend>
        <Field label="Tags">
          <TagPicker name="tags" availableTags={availableTags} />
        </Field>

        <Field label="Images">
          <ImageUploader name="image" />
        </Field>
      </fieldset>

      {/* Links */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Links ]
        </legend>

        <div className="flex flex-col gap-3">
          <label className="font-mono text-[11px] tracking-wide text-text3">
            Repository links
          </label>
          {repos.map((repo) => (
            <div key={repo.id} className="flex gap-2 items-center">
              <input
                name="repoLabel"
                value={repo.label}
                onChange={(e) => updateRepo(repo.id, "label", e.target.value)}
                placeholder="Bot Repository"
                className={inputClass}
              />
              <input
                name="repoUrl"
                value={repo.url}
                onChange={(e) => updateRepo(repo.id, "url", e.target.value)}
                placeholder="https://github.com/you/repo"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeRepo(repo.id)}
                className="shrink-0 w-9 h-9 rounded-full border border-border text-text3 hover:border-red-500/40 hover:text-red-500 transition-colors"
                aria-label="Remove repository"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRepo}
            className="self-start font-mono text-[11px] text-accent hover:opacity-80 transition-opacity"
          >
            + Add another repository
          </button>
        </div>

        <Field label="Live URL">
          <input
            name="live"
            placeholder="https://t.me/contest_notifier_bot"
            className={inputClass}
          />
        </Field>
      </fieldset>

      {/* Featured toggle */}
      <label className="flex items-center gap-3 cursor-pointer w-fit">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={false}
          className="w-4 h-4 accent-accent"
        />
        <span className="text-sm text-text2">Mark as featured</span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 px-6 py-3 rounded-full text-sm font-medium bg-primary text-primary-text hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-wait"
      >
        {submitting ? "Saving..." : "Add project"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[11px] tracking-wide text-text3">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent transition-colors";