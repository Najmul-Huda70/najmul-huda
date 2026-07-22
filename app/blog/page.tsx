import type { Metadata } from "next";
import { getBlogPosts, getCategories } from "@/lib/action";
import BlogBrowser from "@/components/pages/BlogBrowser";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Blog & Thoughts",
  description:
    "Articles, technical notes, and insights on web engineering and development.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(true),
    getCategories("blog"),
  ]);

  return (
    <main className="min-h-screen px-[6%] py-12 sm:py-16 max-w-[1180px] mx-auto">
      <SectionHeader
        badge="[ ARTICLES & INSIGHTS ]"
        title="Writing & Thoughts."
        subtitle="Deep dives into modern full-stack development, software engineering practices, and lessons learned along the way."
      />
      <BlogBrowser posts={posts} categories={categories} />
    </main>
  );
}
