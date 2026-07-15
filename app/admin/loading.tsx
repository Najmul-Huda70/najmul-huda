export default function AdminLoading() {
  return (
    <section className="px-5 sm:px-[6%] py-14 sm:py-16 max-w-[1180px] mx-auto min-h-[85vh] animate-pulse">
      {/* header skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8 mb-10">
        <div className="flex flex-col gap-3 w-full max-w-[420px]">
          <div className="h-3 w-28 rounded bg-surface2/60" />
          <div className="h-9 w-64 rounded bg-surface2/60" />
          <div className="h-3 w-72 max-w-full rounded bg-surface2/40" />
        </div>
        <div className="h-4 w-24 rounded bg-surface2/60" />
      </div>

      {/* column labels skeleton — desktop only */}
      <div className="hidden md:grid grid-cols-[1fr_120px_90px_110px_140px] gap-4 px-6 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-2.5 w-16 rounded bg-surface2/40" />
        ))}
      </div>

      {/* row skeletons */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-[1fr_120px_90px_110px_140px] items-center gap-3 md:gap-4 border border-border/60 rounded-xl bg-surface/10 px-5 sm:px-6 py-4"
          >
            {/* thumbnail + title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 shrink-0 rounded-lg bg-surface2/60" />
              <div className="flex flex-col gap-2 min-w-0 w-full">
                <div className="h-3.5 w-3/5 rounded bg-surface2/60" />
                <div className="h-2.5 w-2/5 rounded bg-surface2/30 md:hidden" />
              </div>
            </div>

            <div className="hidden md:block h-3 w-16 rounded bg-surface2/40" />
            <div className="hidden md:block h-3 w-10 rounded bg-surface2/40" />
            <div className="h-6 w-16 rounded-full bg-surface2/40" />

            <div className="flex items-center justify-start md:justify-end gap-3">
              <div className="h-6 w-12 rounded bg-surface2/40" />
              <div className="h-6 w-12 rounded bg-surface2/40" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}