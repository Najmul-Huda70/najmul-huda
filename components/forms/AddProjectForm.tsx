"use client";

import { createProject } from "@/lib/action";
import { useState } from "react";
import toast from "react-hot-toast";
import { CATEGORY_LABELS } from "@/lib/category";
import type { ProjectCategory, SkillTag } from "@/models/types";
import TagPicker from "@/components/shared/TagPicker";
import ImageUploader from "@/components/forms/ImageUploader";
import CustomSelect from "@/components/shared/CustomSelect";
import { motion } from "framer-motion";
import { ActionBtn } from "@/components/ui/ActionBtn";

interface RepoField {
  id: string;
  label: string;
  url: string;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

import type { Variants } from "framer-motion";

const fieldsetVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};


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
    if (!slugTouched) setSlug(slugify(value));
  }

  function handleSlugChange(value: string) {
    setSlugTouched(true);
    setSlug(value);
  }

  function addRepo() {
    setRepos((prev) => [...prev, { id: crypto.randomUUID(), label: "", url: "" }]);
  }

  function removeRepo(id: string) {
    setRepos((prev) => prev.filter((r) => r.id !== id));
  }

  function updateRepo(id: string, field: "label" | "url", value: string) {
    setRepos((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  return (
    <form
      action={async (formData) => {
        const tagsRaw = (formData.get("tags") as string) || "";
        const tagList = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);

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
      <motion.fieldset
        className="flex flex-col gap-5"
        custom={0}
        variants={fieldsetVariants}
        initial="hidden"
        animate="visible"
      >
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Basic Info ]
        </legend>

        <Field label="Title">
          <input
            name="title"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter your work/project title"
            className={inputClass}
          />
        </Field>

        <Field label="Slug">
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="title-to-slug"
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
      </motion.fieldset>

      {/* Metric */}
      <motion.fieldset
        className="flex flex-col gap-5"
        custom={1}
        variants={fieldsetVariants}
        initial="hidden"
        animate="visible"
      >
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Metric ]
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Metric value">
            <input name="metricValue" placeholder="5k+" className={inputClass} />
          </Field>
          <Field label="Metric label">
            <input name="metricLabel" placeholder="active subscribers" className={inputClass} />
          </Field>
        </div>
      </motion.fieldset>

      {/* Descriptions */}
      <motion.fieldset
        className="flex flex-col gap-5"
        custom={2}
        variants={fieldsetVariants}
        initial="hidden"
        animate="visible"
      >
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Description ]
        </legend>
        <Field label="Short description">
          <input
            name="short_description"
            required
            placeholder="Short description here..."
            className={inputClass}
          />
        </Field>
        <Field label="Full description">
          <textarea
            name="description"
            rows={4}
            placeholder="Detailed description..."
            className={`${inputClass} resize-none`}
          />
        </Field>
      </motion.fieldset>

      {/* Tags & Images */}
      <motion.fieldset
        className="flex flex-col gap-5"
        custom={3}
        variants={fieldsetVariants}
        initial="hidden"
        animate="visible"
      >
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Tags &amp; Media ]
        </legend>
        <Field label="Tags">
          <TagPicker name="tags" availableTags={availableTags} />
        </Field>
        <Field label="Images (upload from local — stored on ImgBB)">
          <ImageUploader name="image" maxImages={8} />
        </Field>
      </motion.fieldset>

      {/* Links */}
      <motion.fieldset
        className="flex flex-col gap-5"
        custom={4}
        variants={fieldsetVariants}
        initial="hidden"
        animate="visible"
      >
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
                placeholder="Repository label"
                className={inputClass}
              />
              <input
                name="repoUrl"
                value={repo.url}
                onChange={(e) => updateRepo(repo.id, "url", e.target.value)}
                placeholder="https://github.com/user/repo"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeRepo(repo.id)}
                className="shrink-0 w-9 h-9 rounded-full border border-border text-text3 hover:border-text/40 hover:text-text transition-colors flex items-center justify-center"
                aria-label="Remove repository"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRepo}
            className="self-start font-mono text-[11px] text-accent hover:opacity-70 transition-opacity"
          >
            + Add another repository
          </button>
        </div>

        <Field label="Live URL">
          <input name="live" placeholder="https://yourproject.com" className={inputClass} />
        </Field>
      </motion.fieldset>

      {/* Featured toggle */}
      <motion.label
        className="flex items-center gap-3 cursor-pointer w-fit"
        custom={5}
        variants={fieldsetVariants}
        initial="hidden"
        animate="visible"
      >
        <input
          type="checkbox"
          name="featured"
          defaultChecked={false}
          className="w-4 h-4 accent-accent"
        />
        <span className="text-sm text-text2">Mark as featured</span>
      </motion.label>

      {/* Submit */}
      <motion.div
        custom={6}
        variants={fieldsetVariants}
        initial="hidden"
        animate="visible"
      >
        <ActionBtn
          type="submit"
          variant="primary"
          loading={submitting}
          className="px-8 py-3 text-sm"
        >
          {submitting ? "Saving..." : "Add project"}
        </ActionBtn>
      </motion.div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[11px] tracking-wide text-text3">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:border-accent/60 transition-colors";