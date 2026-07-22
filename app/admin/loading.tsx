export default function AdminLoading() {
  return (
    <section className="px-5 sm:px-[6%] py-14 sm:py-16 max-w-[1180px] mx-auto min-h-[85vh]">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8 mb-10">
        <div className="space-y-3">
          <div className="skeleton h-3 w-32" />
          <div className="skeleton h-12 w-72" />
          <div className="skeleton h-4 w-80" />
        </div>
      </div>

      {/* Tab bar skeleton */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-10 w-32 rounded-xl" />
        ))}
      </div>

      {/* Content rows skeleton */}
      <div className="flex flex-col gap-3">
        <div className="skeleton h-8 w-full rounded-xl" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-16 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
}