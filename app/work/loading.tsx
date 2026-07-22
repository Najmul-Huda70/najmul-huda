export default function WorkLoading() {
  return (
    <section className="px-[6%] py-16 max-w-[1180px] mx-auto">
      {/* Header skeleton */}
      <div className="space-y-3 mb-10">
        <div className="skeleton h-3 w-28" />
        <div className="skeleton h-12 w-56" />
        <div className="skeleton h-4 w-80" />
        <div className="skeleton h-4 w-56" />
      </div>

      {/* Toolbar skeleton */}
      <div className="border-b border-border/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          <div className="flex flex-wrap items-center gap-3 flex-1 max-w-2xl">
            <div className="skeleton h-10 w-full sm:w-64 rounded-full" />
          </div>
          <div className="skeleton h-3 w-20" />
        </div>

        <div className="flex gap-2 pb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-9 w-20 rounded-full shrink-0" />
          ))}
        </div>
      </div>

      {/* Grouped project grid skeleton */}
      <div className="space-y-16 pt-8">
        {Array.from({ length: 2 }).map((_, groupIdx) => (
          <div key={groupIdx} className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-border/20 pb-3">
              <div className="skeleton h-6 w-36" />
              <div className="skeleton h-3 w-16" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, cardIdx) => (
                <div
                  key={cardIdx}
                  className="rounded-2xl border border-border/60 overflow-hidden bg-surface/10"
                >
                  {/* Image */}
                  <div className="skeleton h-[200px] rounded-none" />
                  {/* Content */}
                  <div className="px-5 py-5 space-y-3">
                    <div className="skeleton h-4 w-3/4" />
                    <div className="skeleton h-3 w-1/2" />
                    <div className="skeleton h-4 w-1/3" />
                    <div className="flex gap-1.5 pt-1">
                      <div className="skeleton h-5 w-14 rounded-full" />
                      <div className="skeleton h-5 w-14 rounded-full" />
                      <div className="skeleton h-5 w-14 rounded-full" />
                    </div>
                    <div className="skeleton h-3 w-24 mt-3" />
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