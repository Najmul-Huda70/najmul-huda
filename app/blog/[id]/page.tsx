import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getBlogPostById, getBlogPosts } from "@/lib/action";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import type { BlogPost } from "@/models/types";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Converts a GitHub blob URL to its raw content URL
function toRawGithubUrl(url: string) {
  return url
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob/", "/");
}


async function resolvePostContent(post: BlogPost) {
  if (!post.sourceUrl) return "";

  try {
    const rawUrl = toRawGithubUrl(post.sourceUrl);
    const res = await fetch(rawUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`GitHub fetch failed (${res.status})`);
    return await res.text();
  } catch (err) {
    console.error("[resolvePostContent] falling back to stored content:", err);
    return "";
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  // console.log("generateMetadata for blog post id:", id);
  const post = await getBlogPostById(id);
  if (!post) return { title: "Blog Post Not Found" };
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  const [content, allPosts] = await Promise.all([
    resolvePostContent(post),
    getBlogPosts(true),
  ]);

  const relatedPosts = allPosts
    .filter((p: BlogPost) => p._id !== post._id)
    .slice(0, 2);

  return (
    <main className="min-h-screen w-full">
      {/* ===== HERO SECTION — fully responsive, full-viewport ===== */}
      {post.coverImage ? (
        <section
          className="group relative w-full overflow-hidden"
          style={{ height: "clamp(320px, 100dvh, 1000px)" }}
        >
          <Link
            href="/blog"
            className="absolute top-2 sm:top-3 px-[5%] sm:px-[6%] z-20 inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-text2"
          >
            <ArrowLeft size={14} />
            <span> Back to Blog</span>
          </Link>

          {/* Cover image as background */}
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover object-[center_15%] xs:object-[center_20%] sm:object-[center_30%] md:object-[center_40%] lg:object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg)/0.85)] via-[rgb(var(--bg)/0.25)] to-transparent" />

          {/* Hover color overlay */}
          <div className="absolute inset-0 bg-[rgb(var(--accent)/0.28)] opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100" />

          {/* meta overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-[5%] sm:px-[6%] pb-2 sm:pb-5 z-10">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-3 text-[9px] xs:text-[10px] sm:text-xs font-mono text-[rgb(var(--text2))]">
              <span className="text-[rgb(var(--accent))] uppercase font-semibold tracking-wider">
                {post.category}
              </span>
              <span className="hidden xs:inline">&middot;</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} className="shrink-0" />
                {new Date(post.publishedAt || Date.now()).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" },
                )}
              </span>
              {post.readTime && (
                <>
                  <span className="hidden xs:inline">&middot;</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="shrink-0" />
                    {post.readTime}
                  </span>
                </>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="group relative w-full">
          <Link
            href="/blog"
            className="top-3 px-[5%] sm:px-[6%] z-20 inline-flex items-center gap-2 text-sm font-mono text-text2"
          >
            <ArrowLeft size={14} />
            <span> Back to Blog</span>
          </Link>
          <div className="inset-0 z-10 flex flex-col items-center justify-center text-center px-[5%] mt-8 sm:mt-12">
            <h1 className="text-[rgb(var(--text))] text-2xl xs:text-3xl sm:text-5xl font-bold mb-4 leading-tight max-w-3xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono text-[rgb(var(--text2))]">
              <span className="text-[rgb(var(--accent))] uppercase font-semibold tracking-wider">
                {post.category}
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {new Date(post.publishedAt || Date.now()).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" },
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
          </div>
        </section>
      )}

      {/* ===== ARTICLE BODY ===== */}
      <article className="w-full px-[5%] sm:px-[6%] py-3 sm:py-5 space-y-8">
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {content}
          </ReactMarkdown>
        </div>

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

        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border/40">
            <p className="font-mono text-[10px] tracking-[2px] text-accent uppercase mb-4">
              [ READ MORE ]
            </p>
            <h2 className="font-serif italic text-2xl text-text mb-6">
              More articles you might like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rel: BlogPost) => (
                <Link
                  key={rel._id}
                  href={`/blog/${rel._id}`}
                  className="group bg-surface/30 border border-border/60 hover:border-accent/40 p-5 rounded-2xl transition-all"
                >
                  <span className="font-mono text-[10px] text-accent uppercase font-semibold">
                    {rel.category}
                  </span>
                  <h3 className="font-serif italic text-lg text-text group-hover:text-accent transition-colors mt-2">
                    {rel.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}