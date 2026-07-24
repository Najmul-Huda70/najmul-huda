import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }: { post: any }) {
  return (
    <Link
      href={`/blog/${post._id}`}
      className="group h-full cursor-pointer bg-surface border border-border/60 hover:border-accent/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 backdrop-blur-sm"
    >
      {/* Cover image — fixed height */}
      <div className="relative w-full aspect-video shrink-0 overflow-hidden bg-gradient-to-br from-surface2 to-surface">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 text-center">
            <span className="font-serif italic text-lg text-text3 opacity-50 line-clamp-3">
              {post.title}
            </span>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 right-3 text-[10px] font-mono font-semibold tracking-wider text-accent uppercase bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {post.category}
        </span>
      </div>

      {/* Content — flex-1 so this section fills whatever height is left
          after the fixed-height cover image, and its own children can
          then push the tag row to the bottom consistently */}
      <div className="p-5 flex flex-col flex-1">
        {/* Date + read time */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-text3 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {new Date(post.publishedAt || Date.now()).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" }
            )}
          </span>
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-base font-medium mb-1 line-clamp-2 text-text group-hover:text-accent transition-colors">
          {post.title}
        </h2>

        {/* Excerpt — flex-1 absorbs the remaining space so everything
            below it (tags) lines up at the same position card to card */}
        <p className="text-text2 text-xs sm:text-[13px] line-clamp-3 leading-relaxed font-sans mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* Tags — mt-auto pins this row to the bottom of the card even
            when there are zero tags or a short excerpt */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {post.tags.slice(0, 5).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[10px] font-mono bg-surface2 border border-border/40 text-text2 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 5 && (
              <span className="text-[10px] font-mono text-text3 px-2 py-0.5">
                +{post.tags.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}