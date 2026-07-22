"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { Project, ProjectCategory } from "@/models/types";
import ProjectCard from "@/components/pages/ProjectCard";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getEmptyCategoryGroups, CATEGORY_LABELS } from "@/lib/category";
import EmptyState from "@/components/shared/EmptyState";
import { motion, AnimatePresence } from "framer-motion";
import { AdminLinkBtn } from "@/components/ui/ActionBtn";

const FILTERS: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All", value: "all" },
  ...(Object.entries(CATEGORY_LABELS) as [ProjectCategory, string][]).map(
    ([value, label]) => ({ label, value })
  ),
];

export default function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all");
  const { data: session } = useSession();
  const isAdmin = session && session?.user;

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesFilter = activeFilter === "all" || p.category === activeFilter;
      const haystack = `${p.title} ${p.description} ${p.tags?.join(" ") || ""}`.toLowerCase();
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
    return Object.entries(groups).filter(([_, group]) => group.list.length > 0);
  }, [filteredProjects]);

  return (
    <div className="space-y-12">
      <div className="border-b border-border/40">
        {/* Search + count row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          <div className="flex flex-wrap items-center gap-3 flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search work..."
                className="w-full sm:w-64 bg-surface2/40 border border-border/60 rounded-full pl-5 pr-10 py-2.5 text-xs text-text placeholder:text-text3 focus:outline-none focus:border-accent/60 transition-colors font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text3 hover:text-accent transition-colors text-sm"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="font-mono text-[11px] tracking-wide text-text3 whitespace-nowrap self-end md:self-center">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </div>
        </div>

        {/* Filter pills + admin link */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-3 mb-1 -mx-[6%] px-[6%] sm:mx-0 sm:px-0 scrollbar-none">
            {FILTERS.map((f) => (
              <motion.button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                whileTap={{ scale: 0.94 }}
                className={clsx(
                  "rounded-full px-5 py-2 text-xs border transition-all whitespace-nowrap font-sans",
                  activeFilter === f.value
                    ? "bg-accent/20 text-accent border-accent/40 font-medium"
                    : "border-border/60 text-text2 hover:border-accent/40 hover:text-text"
                )}
              >
                {f.label}
              </motion.button>
            ))}
          </div>

          <div className="text-right pb-3">
            {isAdmin && (
              <AdminLinkBtn href="/admin/awf" label="Add work" variant="underline" />
            )}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyState
              badge="[ UPCOMING WORK ]"
              title="Upcoming Projects"
              description="No projects match your current filter or search query. Upcoming builds and case studies coming soon!"
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-16 pt-4"
          >
            {groupedProjects.map(([key, group], groupIdx) => (
              <div key={key} className="space-y-6">
                <motion.div
                  className="flex items-baseline justify-between border-b border-border/20 pb-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
                >
                  <h2 className="font-serif italic text-xl md:text-2xl text-text">
                    {group.label}
                  </h2>
                  <span className="font-mono text-[10px] text-text3">
                    {group.list.length}{" "}
                    {group.list.length === 1 ? "project" : "projects"}
                  </span>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.list.map((project, i) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: groupIdx * 0.06 + i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <ProjectCard project={project} index={i} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
