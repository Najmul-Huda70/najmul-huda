import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getWorkById, getWorks } from "@/lib/action";
import { toRawGithubUrl } from "@/lib/github-md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Work } from "@/models/types";
import BlogHeroSlider from "@/components/shared/BlogHeroSlider";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function resolveReadme(work: Work) {
  if (!work.githubUrl) return "";

  try {
    const rawUrl = toRawGithubUrl(work.githubUrl);
    const res = await fetch(rawUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`GitHub fetch failed (${res.status})`);
    return await res.text();
  } catch (err) {
    console.error("[resolveReadme] failed:", err);
    return "";
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const work = await getWorkById(id);
  if (!work) return { title: "Work Not Found" };
  return {
    title: `${work.title} | Work`,
    description: work.short_description,
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { id } = await params;
  const work = await getWorkById(id);

  if (!work) {
    notFound();
  }

  const [content, allWorks] = await Promise.all([
    resolveReadme(work),
    getWorks(),
  ]);

  const relatedWorks = allWorks
    .filter((w) => w._id !== work._id && w.category === work.category)
    .slice(0, 2);

  const heroImages = work.image && work.image.length > 0 ? work.image : [];

  return (
    <main className="min-h-screen w-full">
      {/* ===== HERO — contained within the page column, not full-bleed ===== */}
      <div className="px-[6%] max-w-[1180px] mx-auto pt-6">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-text2 mb-4"
        >
          <ArrowLeft size={14} />
          <span>Back to Work</span>
        </Link>

        {heroImages.length > 0 && (
          <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden mb-6">
            <BlogHeroSlider images={heroImages} title={work.title} />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs font-mono text-text2 mb-3">
          <span className="text-accent uppercase font-semibold tracking-wider">
            {work.category}
          </span>
          <span>&middot;</span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {work.year}
          </span>
          <span>&middot;</span>
          <span className="capitalize">{work.type}</span>
        </div>


      </div>

      {/* ===== BODY ===== */}
      <article className="w-full px-[6%] max-w-[1180px] mx-auto py-3 sm:py-5 space-y-8">
        {/* Metric + links */}
        {work.metricValue && (
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg text-accent font-medium">
              {work.metricValue}
            </span>
            <span className="text-xs text-text2">{work.metricLabel}</span>
          </div>
        )}

        {content && (
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {content}
            </ReactMarkdown>
          </div>
        )}

        {work.tags && work.tags.length > 0 && (
          <div className="pt-8 border-t border-border/40 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-text3 mr-2">Tags:</span>
            {work.tags.map((tag: string) => (
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

        {relatedWorks.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border/40">
            <p className="font-mono text-[10px] tracking-[2px] text-accent uppercase mb-4">
              [ RELATED WORK ]
            </p>
            <h2 className="font-serif italic text-2xl text-text mb-6">
              More projects you might like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedWorks.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/work/${rel._id}`}
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