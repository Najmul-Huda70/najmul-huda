export default function BlogLoading() {
  return (
    <main className="min-h-screen px-[6%] py-12 sm:py-16 max-w-[1180px] mx-auto">
      {/* Header skeleton */}
      <div className="mb-10 space-y-3">
        <div className="skeleton h-3 w-32" />
        <div className="skeleton h-12 w-64" />
        <div className="skeleton h-4 w-80 mt-2" />
        <div className="skeleton h-4 w-56" />
      </div>

      {/* Filter bar skeleton */}
      <div className="border-b border-border/40 pb-6 mb-8 space-y-4">
        <div className="flex gap-4 items-center">
          <div className="skeleton h-9 w-64 rounded-full" />
          <div className="skeleton h-3 w-20" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>

      {/* Blog grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border/60 overflow-hidden bg-surface/30">
            {/* Image */}
            <div className="skeleton h-[200px] rounded-none" />
            {/* Content */}
            <div className="p-5 space-y-3">
              <div className="flex gap-3">
                <div className="skeleton h-3 w-24" />
                <div className="skeleton h-3 w-16" />
              </div>
              <div className="skeleton h-5 w-full" />
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-3 w-full mt-2" />
              <div className="skeleton h-3 w-5/6" />
              <div className="skeleton h-3 w-4/6" />
              <div className="flex gap-1.5 pt-1">
                <div className="skeleton h-5 w-16 rounded" />
                <div className="skeleton h-5 w-16 rounded" />
              </div>
              <div className="skeleton h-3 w-28 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
