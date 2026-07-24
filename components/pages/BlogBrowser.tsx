"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost, CategoryItem } from "@/models/types";
import EmptyState from "@/components/shared/EmptyState";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";
import { AdminLinkBtn } from "@/components/ui/ActionBtn";
import Image from "next/image";
import BlogCard from "./BlogCard";
interface BlogBrowserProps {
  posts: BlogPost[];
  categories: CategoryItem[];
}

export default function BlogBrowser({ posts, categories }: BlogBrowserProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: session } = useSession();
  const isAdmin = session && session?.user;

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" ||
        post.category.toLowerCase() === activeCategory.toLowerCase();
      const haystack =
        `${post.title} ${post.excerpt} ${post.tags?.join(" ")} ${post.category}`.toLowerCase();
      const matchesQuery = q === "" || haystack.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  return (
    <div className="space-y-10">
      {/* Controls */}
      <div className="border-b border-border/40 pb-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text3"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, topics..."
              className="w-full bg-surface2/40 border border-border/60 rounded-full pl-11 pr-9 py-2.5 text-xs text-text placeholder:text-text3 focus:outline-none focus:border-accent/60 transition-colors font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text3 hover:text-accent transition-colors"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-[11px] text-text3">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
            </div>
            {isAdmin && (
              <AdminLinkBtn
                href="/admin/blog/add"
                label="Write Article"
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

      {/* Blog grid */}
      <AnimatePresence mode="wait">
        {filteredPosts.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyState
              badge="[ UPCOMING ARTICLES ]"
              title="Upcoming Blog Posts"
              description="No blog posts found matching your criteria. New articles and technical write-ups are coming soon!"
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
