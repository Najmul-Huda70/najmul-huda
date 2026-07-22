"use client";

import React, { useState } from "react";
import type { CategoryItem } from "@/models/types";
import { addCategory, updateCategory, deleteCategory } from "@/lib/action";
import { Plus, Trash2, Edit2, Tag } from "lucide-react";

export default function AdminCategories({ categories }: { categories: CategoryItem[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeType, setActiveType] = useState<"work" | "blog">("work");

  const filtered = categories.filter((c) => c.type === activeType);

  return (
    <div className="space-y-6">
      {/* Sub-header with Type switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center gap-2 bg-surface/40 border border-border/60 p-1 rounded-full">
          <button
            onClick={() => setActiveType("work")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeType === "work"
                ? "bg-accent text-[rgb(var(--accent-text))] font-semibold"
                : "text-text2 hover:text-text"
            }`}
          >
            Work Categories ({categories.filter((c) => c.type === "work").length})
          </button>
          <button
            onClick={() => setActiveType("blog")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeType === "blog"
                ? "bg-accent text-[rgb(var(--accent-text))] font-semibold"
                : "text-text2 hover:text-text"
            }`}
          >
            Blog Categories ({categories.filter((c) => c.type === "blog").length})
          </button>
        </div>

        <button
          onClick={() => {
            setShowAddForm((v) => !v);
            setEditingId(null);
          }}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-accent border border-accent/30 hover:border-accent bg-accent/10 px-4 py-2 rounded-full transition-all self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Add {activeType === "work" ? "Work" : "Blog"} Category</span>
        </button>
      </div>

      {/* Add / Edit Form */}
      {showAddForm && (
        <form
          action={async (formData) => {
            await addCategory(formData);
            setShowAddForm(false);
          }}
          className="bg-surface/40 border border-accent/30 p-5 rounded-2xl space-y-4 font-sans"
        >
          <h4 className="font-mono text-xs text-accent uppercase tracking-wider">
            + New {activeType} category
          </h4>
          <input type="hidden" name="type" value={activeType} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Category Label *
              </label>
              <input
                type="text"
                name="label"
                required
                placeholder="e.g. Web Development"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Slug (Optional)
              </label>
              <input
                type="text"
                name="slug"
                placeholder="web-development"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] text-text3 mb-1">
              Description (Optional)
            </label>
            <input
              type="text"
              name="description"
              placeholder="Short description of this category..."
              className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-1.5 rounded-lg font-mono text-xs text-text3 hover:text-text border border-border/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg font-mono text-xs bg-accent text-[rgb(var(--accent-text))] font-semibold hover:opacity-90"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      {/* Category List */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-border/40 rounded-2xl text-text3 font-mono text-xs">
          No categories found for {activeType}. Click button above to add one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cat) => {
            const isEditing = editingId === cat._id;
            if (isEditing) {
              return (
                <form
                  key={cat._id}
                  action={async (formData) => {
                    if (cat._id) {
                      await updateCategory(cat._id, formData);
                    }
                    setEditingId(null);
                  }}
                  className="bg-surface/50 border border-accent/40 p-4 rounded-xl space-y-3 font-sans"
                >
                  <input type="hidden" name="type" value={cat.type} />
                  <div>
                    <label className="block font-mono text-[10px] text-text3 mb-0.5">
                      Label
                    </label>
                    <input
                      type="text"
                      name="label"
                      defaultValue={cat.label}
                      required
                      className="w-full bg-surface2/60 border border-border/60 rounded-lg px-3 py-1.5 text-xs text-text focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-text3 mb-0.5">
                      Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      defaultValue={cat.slug}
                      className="w-full bg-surface2/60 border border-border/60 rounded-lg px-3 py-1.5 text-xs text-text focus:outline-none focus:border-accent font-mono"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 rounded font-mono text-[11px] text-text3 hover:text-text border border-border/60"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded font-mono text-[11px] bg-accent text-[rgb(var(--accent-text))] font-semibold"
                    >
                      Update
                    </button>
                  </div>
                </form>
              );
            }

            return (
              <div
                key={cat._id}
                className="bg-surface/30 border border-border/60 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    <Tag size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-sm text-text truncate">
                      {cat.label}
                    </h4>
                    <p className="font-mono text-[10px] text-text3 truncate">
                      slug: {cat.slug}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setEditingId(cat._id || null)}
                    className="p-1.5 rounded-lg border border-border/60 hover:border-accent/40 text-text2 hover:text-accent transition-colors"
                    title="Edit category"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={async () => {
                      if (cat._id && confirm(`Delete category "${cat.label}"?`)) {
                        await deleteCategory(cat._id);
                      }
                    }}
                    className="p-1.5 rounded-lg border border-border/60 hover:border-text/40 text-text2 hover:text-text transition-colors"
                    title="Delete category"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
