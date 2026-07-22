"use client";

import type { SkillTag } from "@/models/types";
import { useState } from "react";

export default function TagPicker({
  name = "tags",
  availableTags,
  defaultSelected = [],
}: {
  name?: string;
  availableTags: SkillTag[];
  defaultSelected?: string[];
}) {
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  function toggle(tagName: string) {
    setSelected((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* hidden input carrying comma-separated selected tag names */}
      <input type="hidden" name={name} value={selected.join(",")} />

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => {
          const isActive = selected.includes(tag.name);
          return (
            <button
              key={tag.slug}
              type="button"
              onClick={() => toggle(tag.name)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs border transition-all ${
                isActive
                  ? "bg-accent/15 text-accent border-accent/40 font-medium"
                  : "border-border text-text2 hover:border-accent/40 hover:text-text"
              }`}
            >
              <img
                src={`https://cdn.simpleicons.org/${tag.slug}`}
                alt=""
                className="w-3.5 h-3.5"
                loading="lazy"
              />
              {tag.name}
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-text3">
        {selected.length > 0
          ? `${selected.length} tag${selected.length === 1 ? "" : "s"} selected`
          : "Select at least 1 tag"}
      </p>
    </div>
  );
}