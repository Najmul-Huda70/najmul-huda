export default function TopBlogSkeleton() {
  return (
    <section className="px-[6%] py-20 max-w-[1180px] mx-auto animate-pulse">
      <div className="font-mono text-[11px] tracking-[2px] text-accent mb-2">
        [ WRITING ]
      </div>
      <div className="flex items-end justify-between gap-4 my-4">
        <div className="h-10 w-64 rounded bg-surface2/40" />
        <div className="h-4 w-16 rounded bg-surface2/30 mb-2" />
      </div>
      <div className="h-4 w-full max-w-[520px] rounded bg-surface2/40 mb-2" />
      <div className="h-4 w-3/4 max-w-[400px] rounded bg-surface2/40 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/60 overflow-hidden bg-surface/10"
          >
            <div className="h-[170px] bg-surface2/40" />
            <div className="px-5 py-5 flex flex-col gap-2.5">
              <div className="h-4 w-full rounded bg-surface2/40" />
              <div className="h-4 w-2/3 rounded bg-surface2/40" />
              <div className="h-3 w-full rounded bg-surface2/30 mt-1" />
              <div className="h-3 w-11/12 rounded bg-surface2/30" />
              <div className="h-3 w-28 rounded bg-surface2/30 mt-3 pt-4 border-t border-border/40" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}