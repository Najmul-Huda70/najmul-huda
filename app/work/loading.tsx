export default function WorkLoading() {
  return (
    <section className="px-[6%] py-16 max-w-[1180px] mx-auto animate-pulse">
      <div className="font-mono text-[11px] tracking-[2px] text-accent mb-2">
        [ CASE STUDIES ]
      </div>

      <div className="flex items-baseline justify-between flex-wrap gap-4 my-4">
        <h1 className="font-serif italic text-[clamp(38px,6vw,58px)] text-text/20">
          All the work.
        </h1>
      </div>

      <div className="h-4 w-full max-w-[520px] rounded bg-surface2/40 mb-2" />
      <div className="h-4 w-3/4 max-w-[400px] rounded bg-surface2/40 mb-10" />

      {/* toolbar skeleton */}
      <div className="border-b border-border/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          <div className="flex flex-wrap items-center gap-3 flex-1 max-w-2xl">
            <div className="h-10 w-full sm:w-64 rounded-full bg-surface2/40" />
            <div className="hidden sm:block h-10 w-32 rounded-full bg-surface2/40" />
          </div>
          <div className="h-3 w-20 rounded bg-surface2/40" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex gap-2 pb-3 mb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-24 rounded-full bg-surface2/40 shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* grouped project grid skeleton */}
      <div className="space-y-16 pt-4">
        {Array.from({ length: 2 }).map((_, groupIdx) => (
          <div key={groupIdx} className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-border/20 pb-3">
              <div className="h-6 w-32 rounded bg-surface2/40" />
              <div className="h-3 w-16 rounded bg-surface2/30" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, cardIdx) => (
                <div
                  key={cardIdx}
                  className="rounded-2xl border border-border/60 overflow-hidden bg-surface/10"
                >
                  <div className="aspect-video bg-surface2/40" />
                  <div className="px-[22px] py-5 flex flex-col gap-2.5">
                    <div className="h-4 w-3/4 rounded bg-surface2/40" />
                    <div className="h-3 w-1/2 rounded bg-surface2/30" />
                    <div className="flex gap-2 pt-2">
                      <div className="h-5 w-14 rounded-full bg-surface2/30" />
                      <div className="h-5 w-14 rounded-full bg-surface2/30" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}