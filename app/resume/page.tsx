import Link from "next/link";

export default function ResumePage() {
  return (
    <section className="px-[6%] py-16 max-w-[1180px] mx-auto min-h-[85vh] flex flex-col justify-center items-center text-center">
      <div className="mb-6">
        <p className="font-mono text-[10px] tracking-[2px] text-accent uppercase mb-2">
          [ 404 / Work In Progress ]
        </p>
        <h1 className="font-serif italic text-[clamp(32px,5vw,48px)] text-text leading-none">
          Resume is coming soon.
        </h1>
        <p className="text-text2 text-sm mt-4 font-sans max-w-[400px]">
          I am currently updating my resume with recent projects and
          experiences. Please check back later!
        </p>
      </div>

      <Link
        href="/"
        className="mt-4 font-mono text-xs border border-text/20 px-4 py-2 hover:border-accent hover:text-accent transition-all duration-300"
      >
        [ Back to Home ]
      </Link>
    </section>
  );
}
