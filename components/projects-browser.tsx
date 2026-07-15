"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { Project, ProjectCategory } from "@/models/types";
import ProjectCard from "@/components/project-card";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getEmptyCategoryGroups, CATEGORY_LABELS } from "@/lib/category";

const FILTERS: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All", value: "all" },
  ...(Object.entries(CATEGORY_LABELS) as [ProjectCategory, string][]).map(
    ([value, label]) => ({ label, value })
  ),
];

export default function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>(
    "all"
  );
  const { data: session } = useSession();

  const isAdmin = session && session?.user;

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesFilter =
        activeFilter === "all" || p.category === activeFilter;
      const haystack =
        `${p.title} ${p.description} ${p.tags?.join(" ") || ""}`.toLowerCase();
      const matchesQuery = q === "" || haystack.includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [projects, query, activeFilter]);

  const groupedProjects = useMemo(() => {
    const groups = getEmptyCategoryGroups();

    filteredProjects.forEach((project) => {
      if (groups[project.category]) {
        groups[project.category].list.push(project);
      }
    });

    return Object.entries(groups).filter(
      ([_, group]) => group.list.length > 0
    );
  }, [filteredProjects]);

  
  return (
    <div className="space-y-12">
      <div className="border-b border-border/40 ">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          <div className="flex flex-wrap items-center gap-3 flex-1 max-w-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search work..."
              className="w-full sm:w-64 bg-surface2/40 border border-border/60 rounded-full px-5 py-2.5 text-xs text-text placeholder:text-text3 focus:outline-none focus:border-accent/60 transition-colors font-sans"
            />
            <div className="hidden sm:flex items-center gap-2 bg-surface2/40 border border-border/60 rounded-full px-4 py-2.5 text-xs text-text2 cursor-pointer font-sans">
              <span>⌥</span>
              <span>Category</span>
            </div>
          </div>

          <div className="font-mono text-[11px] tracking-wide text-text3 whitespace-nowrap self-end md:self-center">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col  sm:flex-row gap-2 overflow-x-auto pb-3 mb-4 -mx-[6%] px-[6%] sm:mx-0 sm:px-0 scrollbar-none">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={clsx(
                  "rounded-full px-5 py-2 text-xs border transition-all whitespace-nowrap font-sans",
                  activeFilter === f.value
                    ? "bg-accent/20 text-accent border-accent/40 font-medium"
                    : "border-border/60 text-text2 hover:border-accent/40 hover:text-text",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="text-right">
            {isAdmin ? (
              <Link
                href={`admin/awf`}
                className="group inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.5px] text-accent"
              >
                <span className="animate-blink">+</span>
                <span className="border-b border-transparent group-hover:border-accent transition-colors">
                  Add work
                </span>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-border/40 rounded-xl">
          <p className="text-text3 font-mono text-xs">[ 00 / 00 ]</p>
          <p className="text-text2 text-xs mt-1 font-sans">
            No matches found for your search.
          </p>
        </div>
      ) : (
        <div className="space-y-16 pt-4">
          {groupedProjects.map(([key, group]) => (
            <div key={key} className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-border/20 pb-3">
                <h2 className="font-serif italic text-xl md:text-2xl text-text">
                  {group.label}
                </h2>
                <span className="font-mono text-[10px] text-text3">
                  {group.list.length}{" "}
                  {group.list.length === 1 ? "project" : "projects"}
                </span>
              </div>

\              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.list.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
