"use client";

import React, { useState } from "react";
import Link from "next/link";
import type {
  BlogPost,
  CategoryItem,
  EducationItem,
  SkillItem,
  ExperienceItem,
  CertificateItem,
  StatItem,
  Work,
} from "@/models/types";
import FeaturedToggle from "@/components/shared/FeaturedToggle";
import AdminBlogList from "@/components/admin/AdminBlogList";
import AdminCategories from "@/components/admin/AdminCategories";
import AdminResume from "@/components/admin/AdminResume";
import { FolderKanban, BookOpen, Tag, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminLinkBtn } from "@/components/ui/ActionBtn";
import DeleteWorkBtn from "./deleteWorkBtn";

interface AdminTabsWrapperProps {
  works: Work[];
  blogs: BlogPost[];
  categories: CategoryItem[];
  educations: EducationItem[];
  skills: SkillItem[];
  experiences: ExperienceItem[];
  certificates: CertificateItem[];
  stats: StatItem[];
}

type AdminTab = "work" | "blog" | "categories" | "resume";

export default function AdminTabsWrapper({
  works,
  blogs,
  categories,
  educations,
  skills,
  experiences,
  certificates,
  stats,
}: AdminTabsWrapperProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("work");

  const tabs: {
    id: AdminTab;
    label: string;
    icon: React.ElementType;
    count?: number;
  }[] = [
    { id: "work", label: "Work Projects", icon: FolderKanban, count: works.length },
    { id: "blog", label: "Blog Posts", icon: BookOpen, count: blogs.length },
    { id: "categories", label: "Categories", icon: Tag, count: categories.length },
    {
      id: "resume",
      label: "Resume Items",
      icon: FileText,
      count:
        skills.length +
        educations.length +
        experiences.length +
        certificates.length +
        stats.length,
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Tab navigation */}
      <div className="flex justify-start border-b border-border/40 pb-4 overflow-x-auto scrollbar-none">
        <div className="inline-flex items-center gap-2 bg-surface/40 p-1.5 rounded-2xl border border-border/60 backdrop-blur-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? "text-[rgb(var(--accent-text))] font-semibold"
                    : "text-text2 hover:text-text hover:bg-surface2/40"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-accent rounded-xl shadow-md shadow-accent/20"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={14} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive ? "bg-[rgb(var(--accent-text))]/20 text-[rgb(var(--accent-text))]" : "bg-surface2 text-text3"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab content with AnimatePresence */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === "work" && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <p className="font-mono text-xs text-text3">
                  Total Works: {works.length}
                </p>
                <AdminLinkBtn href="/admin/work/add" label="Add Work" variant="pill" />
              </div>

              {works.length === 0 ? (
                <div className="py-16 sm:py-20 text-center border border-dashed border-border/40 rounded-2xl">
                  <p className="font-mono text-xs text-text3">[ 00 / 00 ]</p>
                  <h3 className="text-base text-text font-medium mt-2">
                    No works   found in database
                  </h3>
                  <p className="text-xs text-text2 mt-1">
                    Click the button above to create your first build.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="hidden md:grid grid-cols-[1fr_120px_90px_110px_140px] gap-4 px-6 font-mono text-[10px] tracking-wider text-text3 uppercase">
                    <span>Project</span>
                    <span>Category</span>
                    <span>Year</span>
                    <span>Featured</span>
                    <span className="text-right">Actions</span>
                  </div>

                  {works.map((work, index) => (
                    <motion.div
                      key={work._id || index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      className="grid grid-cols-1 md:grid-cols-[1fr_120px_90px_110px_140px] items-start md:items-center gap-3 md:gap-4 border border-border/60 rounded-xl bg-surface/10 backdrop-blur-sm px-4 sm:px-5 md:px-6 py-4 transition-colors hover:border-accent/30 hover:bg-surface2/10"
                    >
                      {/* Title + Thumbnail */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 shrink-0 rounded-lg bg-surface2 border border-border/60 overflow-hidden flex items-center justify-center">
                          {work.image?.[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={work.image[0]}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-text3 text-sm">◆</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/work/${work._id}`}
                            target="_blank"
                            className="font-medium text-text hover:text-accent truncate text-sm sm:text-base block transition-colors"
                            title="View live work page"
                          >
                            {work.title}
                          </Link>
                          <p className="md:hidden text-[10px] text-text3 mt-0.5 font-mono capitalize">
                            {work.category} · {work.year}
                          </p>
                        </div>
                      </div>

                      <div className="hidden md:block text-text2 text-sm capitalize truncate">
                        {work.category}
                      </div>

                      <div className="hidden md:block text-text2 font-mono text-xs">
                        {work.year}
                      </div>

                      <div className="flex items-center justify-between md:justify-start gap-3 pl-[52px] md:pl-0">
                        <FeaturedToggle
                          projectId={work?._id?.toString() || ""}
                          featured={!!work.featured}
                        />

                        <div className="flex items-center gap-2.5 md:hidden">
                          <Link
                            href={`/admin/work/edit/${work._id}`}
                            className="font-mono text-[11px] text-text2 hover:text-accent border border-border/80 hover:border-accent/40 bg-surface/40 px-3 py-1 rounded transition-all"
                          >
                            Edit
                          </Link>
                          <DeleteWorkBtn
                            _id={work?._id?.toString() || ""}
                            projectTitle={work.title}
                          />
                        </div>
                      </div>

                      <div className="hidden md:flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/work/edit/${work._id}`}
                          className="font-mono text-[11px] text-text2 hover:text-accent border border-border/80 hover:border-accent/40 bg-surface/40 px-3 py-1 rounded transition-all"
                        >
                          Edit
                        </Link>
                        <DeleteWorkBtn
                          _id={work?._id?.toString() || ""}
                          projectTitle={work.title}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "blog" && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <AdminBlogList blogs={blogs} />
            </motion.div>
          )}

          {activeTab === "categories" && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <AdminCategories categories={categories} />
            </motion.div>
          )}

          {activeTab === "resume" && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <AdminResume
                educations={educations}
                skills={skills}
                experiences={experiences}
                certificates={certificates}
                stats={stats}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
