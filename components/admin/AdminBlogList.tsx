"use client";

import React from "react";
import Link from "next/link";
import type { BlogPost } from "@/models/types";
import { deleteBlogPost, toggleBlogPublished } from "@/lib/action";
import { Plus, Edit2, Trash2, Calendar, Eye, EyeOff } from "lucide-react";

export default function AdminBlogList({ blogs }: { blogs: BlogPost[] }) {
  return (
    <div className="space-y-6">
      {/* Header button */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4 font-sans">
        <p className="font-mono text-xs text-text3">
          Total Articles: {blogs.length}
        </p>

        <Link
          href="/admin/blog/add"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[rgb(var(--accent-text))] font-semibold bg-accent hover:opacity-90 px-4 py-2 rounded-full transition-all shadow-md shadow-accent/20"
        >
          <Plus size={14} />
          <span>Add Blog Post</span>
        </Link>
      </div>

      {/* Blog list */}
      {blogs.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-border/40 rounded-2xl font-mono text-xs text-text3">
          No blog posts found in database. Click button above to write your first article.
        </div>
      ) : (
        <div className="space-y-3 font-sans">
          {blogs.map((blog) => (
            <div
              key={blog._id || blog.slug}
              className="bg-surface/30 border border-border/60 hover:border-accent/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
            >
              <div className="flex items-start gap-4 min-w-0">
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-lg bg-surface2 border border-border/60 overflow-hidden shrink-0 hidden sm:flex items-center justify-center text-text3">
                  {blog.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={blog.coverImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-mono text-xs">BLOG</span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-accent uppercase font-semibold">
                      {blog.category}
                    </span>
                    <span className="text-text3 text-xs">&middot;</span>
                    <span className="font-mono text-[10px] text-text3 flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(blog.publishedAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-serif italic text-lg text-text truncate">
                    {blog.title}
                  </h3>

                  <p className="text-text2 text-xs line-clamp-1 mt-0.5">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 border-border/20 pt-3 sm:pt-0">
                {/* Toggle Published button */}
                <button
                  onClick={async () => {
                    if (blog._id) {
                      await toggleBlogPublished(blog._id, blog.published);
                    }
                  }}
                  className={`inline-flex items-center gap-1 font-mono text-[11px] px-3 py-1 rounded-lg border transition-all ${
                    blog.published
                      ? "border-accent/30 text-accent bg-accent/10 hover:border-accent/60"
                      : "border-border/60 text-text3 bg-surface/40 hover:text-text"
                  }`}
                  title="Toggle published status"
                >
                  {blog.published ? (
                    <>
                      <Eye size={12} />
                      <span>Published</span>
                    </>
                  ) : (
                    <>
                      <EyeOff size={12} />
                      <span>Draft</span>
                    </>
                  )}
                </button>

                {/* Edit button */}
                <Link
                  href={`/admin/blog/edit/${blog._id}`}
                  className="p-2 rounded-lg border border-border/60 hover:border-accent/40 text-text2 hover:text-accent transition-colors"
                  title="Edit post"
                >
                  <Edit2 size={14} />
                </Link>

                {/* Delete button */}
                <button
                  onClick={async () => {
                    if (blog._id && confirm(`Delete blog post "${blog.title}"?`)) {
                      await deleteBlogPost(blog._id);
                    }
                  }}
                  className="p-2 rounded-lg border border-border/60 hover:border-text/40 text-text2 hover:text-text transition-colors"
                  title="Delete post"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
