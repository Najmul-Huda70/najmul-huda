"use client";

import { useMemo, useState } from "react";
import type { Work, CategoryItem } from "@/models/types";
import WorkCard from "@/components/pages/WorkCard";
import { useSession } from "@/lib/auth-client";
import EmptyState from "@/components/shared/EmptyState";
import { motion, AnimatePresence } from "framer-motion";
import { AdminLinkBtn } from "@/components/ui/ActionBtn";

interface WorkBrowserProps {
  works: Work[];
  categories: CategoryItem[];
}

export default function WorkBrowser({ works, categories }: WorkBrowserProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: session } = useSession();
  const isAdmin = session && session?.user;

  const filteredWorks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return works.filter((work) => {
      const matchesCategory =
        activeCategory === "all" ||
        work.category?.toLowerCase() === activeCategory.toLowerCase();
      const haystack =
        `${work.title} ${work.short_description} ${work.tags?.join(" ") || ""} ${work.category}`.toLowerCase();
      const matchesQuery = q === "" || haystack.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [works, query, activeCategory]);

  return (
    <div className="space-y-10">
      {/* Controls */}
      <div className="border-b border-border/40 pb-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search work..."
              className="w-full sm:w-64 bg-surface2/40 border border-border/60 rounded-full pl-5 pr-9 py-2.5 text-xs text-text placeholder:text-text3 focus:outline-none focus:border-accent/60 transition-colors font-sans"
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

          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-[11px] text-text3">
              {filteredWorks.length}{" "}
              {filteredWorks.length === 1 ? "project" : "projects"}
            </div>
            {isAdmin && (
              <AdminLinkBtn
                href="/admin/work/add"
                label="Add Work"
                variant="underline"
              />
            )}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <motion.button
            onClick={() => setActiveCategory("all")}
            whileTap={{ scale: 0.94 }}
            className={`rounded-full px-5 py-2 text-xs border transition-all whitespace-nowrap font-sans ${
              activeCategory === "all"
                ? "bg-accent/20 text-accent border-accent/40 font-medium"
                : "border-border/60 text-text2 hover:border-accent/40 hover:text-text"
            }`}
          >
            All Categories
          </motion.button>

          {categories.map((cat) => (
            <motion.button
              key={cat._id || cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              whileTap={{ scale: 0.94 }}
              className={`rounded-full px-5 py-2 text-xs border transition-all whitespace-nowrap font-sans capitalize ${
                activeCategory.toLowerCase() === cat.slug.toLowerCase()
                  ? "bg-accent/20 text-accent border-accent/40 font-medium"
                  : "border-border/60 text-text2 hover:border-accent/40 hover:text-text"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Work grid */}
      <AnimatePresence mode="wait">
        {filteredWorks.length === 0 ? (
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filteredWorks.map((work, i) => (
              <motion.div
                key={work._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <WorkCard work={work} index={i} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
