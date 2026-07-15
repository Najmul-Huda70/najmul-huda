"use client";

import { useState } from "react";
import { updateProject, deleteProject } from "@/lib/action";
import { useRouter } from "next/navigation";
import type { Project, Repository } from "@/models/types";



export default function EditProjectForm({ project }: { project: Project }) {
  const router = useRouter();
  const [repos, setRepos] = useState<Repository[]>(
    project.repository && project.repository.length > 0
      ? project.repository.map((r) => ({
          id: crypto.randomUUID(),
          label: r.label,
          url: r.url,
        }))
      : [{ id: crypto.randomUUID(), label: "", url: "" }]
  );
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${project.title}"? This can't be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteProject(project._id?.toString() || "");
      router.push("/admin");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <form
      action={async (formData) => {
        setSubmitting(true);
        try {
          await updateProject(project._id?.toString() || "", formData);
        } finally {
          setSubmitting(false);
        }
      }}
      className="max-w-[720px] mx-auto flex flex-col gap-8"
    >
      <fieldset className="flex flex-col gap-5">
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Basic Info ]
        </legend>

        <Field label="Title">
          <input
            name="title"
            required
            defaultValue={project.title}
            className={inputClass}
          />
        </Field>

        <Field label="Slug">
          <input
            name="slug"
            required
            defaultValue={project.slug}
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <input
              name="category"
              required
              defaultValue={project.category}
              className={inputClass}
            />
          </Field>
          <Field label="Type">
            <input
              name="type"
              required
              defaultValue={project.type}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Status">
            <select
              name="status"
              required
              defaultValue={project.status}
              className={inputClass}
            >
              <option value="live">live</option>
              <option value="in-progress">in-progress</option>
              <option value="archived">archived</option>
            </select>
          </Field>
          <Field label="Year">
            <input
              name="year"
              type="number"
              required
              defaultValue={project.year}
              className={inputClass}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Metric ]
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Metric value">
            <input
              name="metricValue"
              defaultValue={project.metricValue}
              className={inputClass}
            />
          </Field>
          <Field label="Metric label">
            <input
              name="metricLabel"
              defaultValue={project.metricLabel}
              className={inputClass}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Description ]
        </legend>
        <Field label="Short description">
          <input
            name="short_description"
            required
            defaultValue={project.short_description}
            className={inputClass}
          />
        </Field>
        <Field label="Full description">
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={project.description}
            className={`${inputClass} resize-none`}
          />
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="font-mono text-[11px] tracking-[2px] text-accent uppercase mb-1">
          [ Tags &amp; Media ]
        </legend>
        <Field label="Tags (comma separated)">
          <input
            name="tags"
            required
            defaultValue={project.tags?.join(", ")}
            className={inputClass}
          />
        </Field>
        <Field label="Image URLs (comma separated)">
          <input
            name="image"
            required
            defaultValue={project.image?.join(", ")}
            className={inputClass}
          />
        </Field>
      </fieldset>

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
            defaultValue={project.live}
            className={inputClass}
          />
        </Field>
      </fieldset>

      <label className="flex items-center gap-3 cursor-pointer w-fit">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project.featured}
          className="w-4 h-4 accent-accent"
        />
        <span className="text-sm text-text2">Mark as featured</span>
      </label>

      <div className="flex items-center gap-4 mt-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 rounded-full text-sm font-medium bg-primary text-primary-text hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-wait"
        >
          {submitting ? "Saving..." : "Save changes"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="px-6 py-3 rounded-full text-sm font-medium border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
          {deleting ? "Deleting..." : "Delete project"}
        </button>
      </div>
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