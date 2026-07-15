export default function JourneyEmpty() {
  return (
    <section
      id="timeline"
      className="px-[6%] py-16 md:py-20 max-w-[1180px] mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 md:gap-14">
        <div className="md:sticky md:top-[100px] self-start h-fit">
          <div className="font-mono text-[11px] tracking-[2px] text-accent mb-2">
            [ MY JOURNEY ]
          </div>
          <h2 className="font-serif italic text-[24px] md:text-[28px] mb-2">
            Where I have grown
          </h2>
          <p className="text-text2 text-sm max-w-[280px]">
            From first lines of code to competitive programming and
            full-stack apps.
          </p>
        </div>

        <div className="flex flex-col justify-center min-h-[220px] border border-dashed border-border rounded-lg px-6 py-14 text-center md:text-left">
          <div className="font-mono text-[11px] tracking-[1px] text-accent mb-3">
            [ UPCOMING ]
          </div>
          <h3 className="font-serif italic text-xl md:text-2xl mb-2">
            The story is still being written
          </h3>
          <p className="text-sm text-text2 leading-[1.7] max-w-[420px]">
            Timeline entries haven&apos;t been added yet — check back soon.
          </p>
        </div>
      </div>
    </section>
  );
}