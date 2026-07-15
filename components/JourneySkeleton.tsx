export default function JourneyTimelineSkeleton() {
  return (
    <section className="px-[6%] py-20 max-w-[1180px] mx-auto animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 md:gap-14">
        {/* left sticky column skeleton */}
        <div className="md:sticky md:top-[100px] self-start h-fit">
          <div className="h-3 w-24 rounded bg-border mb-3" />
          <div className="h-7 w-48 rounded bg-border mb-2" />
          <div className="h-4 w-full max-w-[280px] rounded bg-border mb-1.5" />
          <div className="h-4 w-3/4 max-w-[280px] rounded bg-border mb-8" />
          <div className="flex justify-between mb-2">
            <div className="h-2.5 w-16 rounded bg-border" />
            <div className="h-2.5 w-10 rounded bg-border" />
          </div>
          <div className="h-px bg-border" />
        </div>

        {/* entry list skeleton */}
        <div className="relative pl-7">
          <div className="absolute left-0 top-1.5 bottom-1.5 w-px bg-border" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative pb-14 last:pb-0">
              <span className="absolute -left-8 top-1 w-2 h-2 rounded-full bg-border" />
              <div className="h-2.5 w-20 rounded bg-border mb-2" />
              <div className="h-2.5 w-32 rounded bg-border mb-4" />
              <div className="h-6 w-52 rounded bg-border mb-4" />
              <div className="h-3.5 w-full max-w-[520px] rounded bg-border mb-2" />
              <div className="h-3.5 w-5/6 max-w-[520px] rounded bg-border" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}