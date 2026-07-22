import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/action";

import type { BlogPost } from "@/models/types";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Blog Post Not Found" };
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts(true);
  const relatedPosts = allPosts
    .filter((p: BlogPost) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen px-[6%] py-12 sm:py-16 max-w-[900px] mx-auto">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-mono text-text3 hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        <span>[ Back to articles ]</span>
      </Link>

      <article className="space-y-8">
        {/* Post Metadata Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text3">
            <span className="text-accent uppercase font-semibold tracking-wider">
              {post.category}
            </span>
            <span>&middot;</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {new Date(post.publishedAt || Date.now()).toLocaleDateString(
                "en-US",
                { month: "long", day: "numeric", year: "numeric" }
              )}
            </span>
            {post.readTime && (
              <>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {post.readTime}
                </span>
              </>
            )}
          </div>

          <h1 className="font-serif italic text-[clamp(32px,5vw,52px)] text-text leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-text2 text-base sm:text-lg leading-relaxed font-sans border-l-2 border-accent/60 pl-4 py-1">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden border border-border/60 max-h-[440px] bg-surface2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="prose prose-invert max-w-none text-text2 leading-relaxed text-sm sm:text-base space-y-6 pt-4 font-sans border-t border-border/40">
          {post.content.split("\n\n").map((paragraph: string, idx: number) => {
            if (paragraph.startsWith("# ")) {
              return (
                <h1 key={idx} className="font-serif italic text-3xl text-text mt-8 mb-4">
                  {paragraph.replace("# ", "")}
                </h1>
              );
            }
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={idx} className="font-serif italic text-2xl text-text mt-6 mb-3">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={idx} className="font-sans font-semibold text-lg text-accent mt-4 mb-2">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("```")) {
              const codeContent = paragraph.replace(/```[a-z]*/g, "").trim();
              return (
                <pre key={idx} className="bg-surface border border-border/60 rounded-xl p-4 overflow-x-auto font-mono text-xs text-text">
                  <code>{codeContent}</code>
                </pre>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Footer Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t border-border/40 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-text3 mr-2">Tags:</span>
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 font-mono text-xs px-3 py-1 rounded-full bg-surface2/60 border border-border/40 text-text2"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-border/40">
          <p className="font-mono text-[10px] tracking-[2px] text-accent uppercase mb-4">
            [ READ MORE ]
          </p>
          <h2 className="font-serif italic text-2xl text-text mb-6">
            More articles you might like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel: BlogPost) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group bg-surface/30 border border-border/60 hover:border-accent/40 p-5 rounded-2xl transition-all"
              >
                <span className="font-mono text-[10px] text-accent uppercase font-semibold">
                  {rel.category}
                </span>
                <h3 className="font-serif italic text-lg text-text group-hover:text-accent transition-colors mt-2">
                  {rel.title}
                </h3>
                <p className="text-text2 text-xs line-clamp-2 mt-1 font-sans">
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
