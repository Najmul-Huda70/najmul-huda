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
import BlogHeroSlider from "@/components/shared/BlogHeroSlider";

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
 
const heroImages =
  post.images && post.images.length > 0
    ? post.images
    : post.coverImage
      ? [post.coverImage]
      : [];
 
return (
  <main className="min-h-screen w-full">
    <div className="px-[6%] max-w-[1180px] mx-auto pt-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-text2 mb-4"
      >
        <ArrowLeft size={14} />
        <span>Back to Blog</span>
      </Link>
 
      {heroImages.length > 0 && (
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden mb-6">
          <BlogHeroSlider images={heroImages} title={post.title} />
        </div>
      )}
 
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs font-mono text-text2 mb-3">
        <span className="text-accent uppercase font-semibold tracking-wider">
          {post.category}
        </span>
        <span>&middot;</span>
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {new Date(post.publishedAt || Date.now()).toLocaleDateString(
            "en-US",
            { month: "long", day: "numeric", year: "numeric" }
          )}
        </span>
        {post.readTime && (
          <>
            <span>&middot;</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </>
        )}
      </div>

    </div>
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