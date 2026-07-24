
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Suspense } from "react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import TopBlogSkeleton from "./TopBlogSkeleton";
import BlogCard from "./BlogCard";
import { getBlogPosts } from "@/lib/action";
import type { BlogPost } from "@/models/types";
const MAX_POSTS = 6;
export default async function TopBlog() {
  const allPosts = await getBlogPosts();
  const posts = allPosts
    .filter((p: { published: boolean }) => p.published !== false)
    .sort((a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_POSTS);
  const hasPosts = posts.length > 0;

  return (
    <Suspense fallback={<TopBlogSkeleton />}>
      <section id="blog" className="px-[6%] py-20 max-w-[1180px] mx-auto">
        <RevealOnScroll>
          <div className="font-mono text-[11px] tracking-[2px] text-accent mb-2">
            [ WRITING ]
          </div>
          <div className="flex items-end justify-between gap-4 my-4">
            <h2 className="font-serif italic text-[clamp(38px,6vw,58px)]">
              Thoughts &amp; notes.
            </h2>
            <Link
              href="/blog"
              className="flex items-center gap-1.5 whitespace-nowrap font-mono text-xs tracking-wider text-text2 hover:text-accent transition-colors mb-2 group"
            >
              <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
              View all
            </Link>
          </div>
          <p className="text-text2 text-[15px] max-w-[520px] mb-10">
            Notes on algorithms, debugging, and building things — written as
            I learn.
          </p>
        </RevealOnScroll>

        {!hasPosts ? (
          <RevealOnScroll delay={0.2}>
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-accent/20 rounded-lg text-center px-4">
              <p className="font-mono text-[11px] tracking-[1px] text-accent mb-2">
                [ 00 / 00 ]
              </p>
              <h3 className="text-base text-text font-medium font-mono">
                New posts coming soon
              </h3>
            </div>
          </RevealOnScroll>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {posts.map((post: BlogPost) => (
              <StaggerItem key={post._id}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>
    </Suspense>
  );
}