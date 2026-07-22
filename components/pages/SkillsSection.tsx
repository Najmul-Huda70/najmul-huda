"use client";

import React, { useState, useMemo } from "react";
import type { SkillItem } from "@/models/types";
import EmptyState from "@/components/shared/EmptyState";
import { Cpu, Server, Wrench, Code2, BrainCircuit, Terminal, Sparkles } from "lucide-react";

const DEFAULT_CATEGORY_SUBTITLES: Record<string, string> = {
  frontend: "Modern & responsive interfaces",
  backend: "Server-side solutions",
  tools: "Development tools",
  languages: "Programming expertise",
  "problem solving": "Algorithms & data structures",
  others: "Core competencies",
};

function getCategoryIcon(cat: string) {
  const c = cat.toLowerCase();
  if (c.includes("front")) return Cpu;
  if (c.includes("back") || c.includes("database")) return Server;
  if (c.includes("tool")) return Wrench;
  if (c.includes("lang")) return Code2;
  if (c.includes("problem") || c.includes("logic")) return BrainCircuit;
  return Terminal;
}

export default function SkillsSection({ skills }: { skills: SkillItem[] }) {
  const [activeTab, setActiveTab] = useState<string>("All");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    skills.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return Array.from(set);
  }, [skills]);

  // Group skills by category
  const groupedSkills = useMemo(() => {
    const groups: Record<string, SkillItem[]> = {};
    skills.forEach((skill) => {
      const cat = skill.category || "Others";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(skill);
    });
    return groups;
  }, [skills]);

  // Filtered categories based on selected tab
  const displayCategories = useMemo(() => {
    if (activeTab === "All") return categories;
    return categories.filter(
      (cat) => cat.toLowerCase() === activeTab.toLowerCase()
    );
  }, [categories, activeTab]);

  if (!skills || skills.length === 0) {
    return (
      <EmptyState
        badge="[ UPCOMING SKILLS ]"
        title="Upcoming Skill Metrics"
        description="Detailed skill proficiencies and technology stack are currently being updated. Coming soon!"
      />
    );
  }

  return (
    <div className="space-y-10 py-6">
      {/* Category filter tabs */}
      <div className="flex justify-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-surface2/80 border border-border/40 p-1.5 rounded-2xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab("All")}
            className={`px-4 py-1.5 text-xs rounded-xl transition-all font-medium ${
              activeTab === "All"
                ? "bg-accent text-[rgb(var(--accent-text))] font-semibold shadow-md shadow-accent/20"
                : "text-text2 hover:text-text hover:bg-surface2/40"
            }`}
          >
            All
          </button>

          {categories.map((cat) => {
            const isSelected =
              activeTab.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 text-xs rounded-xl transition-all font-medium capitalize ${
                  isSelected
                    ? "bg-accent text-[rgb(var(--accent-text))] font-semibold shadow-md shadow-accent/20"
                    : "text-text2 hover:text-text hover:bg-surface2/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayCategories.map((cat) => {
          const items = groupedSkills[cat] || [];
          const IconComp = getCategoryIcon(cat);
          const subtitle =
            items[0]?.subtitle ||
            DEFAULT_CATEGORY_SUBTITLES[cat.toLowerCase()] ||
            "Technical expertise";

          return (
            <div
              key={cat}
              className="bg-surface/60 border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 shadow-xl backdrop-blur-sm"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-border/20">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <IconComp size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text capitalize">
                    {cat}
                  </h3>
                  <p className="text-xs text-text3 font-sans">{subtitle}</p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {items.map((skill) => (
                  <div key={skill._id || skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-text2">{skill.name}</span>
                      <span className="text-text3 font-mono text-[11px]">
                        {skill.percentage}%
                      </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="h-2 w-full bg-surface2 rounded-full overflow-hidden p-0.5 border border-border/10">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
                        style={{ width: `${Math.min(100, Math.max(0, skill.percentage))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
