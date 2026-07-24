export default function TopWorkSkeleton() {
  return (
    <section className="px-[6%] py-20 max-w-[1180px] mx-auto animate-pulse">
      <div className="h-3 w-28 rounded bg-surface2/40 mb-4" />

      <div className="flex items-end justify-between gap-4 my-4">
        <div className="h-12 w-56 rounded bg-surface2/40" />
        <div className="h-3 w-20 rounded bg-surface2/30 mb-2" />
      </div>

      <div className="h-4 w-full max-w-[520px] rounded bg-surface2/30 mb-2" />
      <div className="h-4 w-3/4 max-w-[420px] rounded bg-surface2/30 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-2xl overflow-hidden"
          >
            <div className="relative h-[170px] bg-surface2/40">
              <div className="absolute top-3 left-3 h-5 w-16 rounded-full bg-border/40" />
              <div className="absolute top-3 right-3.5 h-3 w-5 rounded bg-border/30" />
            </div>
            <div className="px-[22px] py-5 flex flex-col gap-2.5">
              <div className="h-4 w-3/4 rounded bg-surface2/50" />
              <div className="h-3 w-1/2 rounded bg-surface2/30" />
              <div className="h-4 w-1/3 rounded bg-surface2/40 mt-1" />
              <div className="flex gap-2 pt-2">
                <div className="h-5 w-14 rounded-full bg-surface2/30" />
                <div className="h-5 w-16 rounded-full bg-surface2/30" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
