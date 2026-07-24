import Link from "next/link";
import { SITE } from "@/lib/site-config";
import ParticleHeroImage from "@/components/shared/ParticleCanvas";
import { SlideUp, FadeIn } from "@/components/ui/MotionWrapper";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col-reverse md:grid md:grid-cols-[1.1fr_1fr] gap-10 items-center px-[6%] md:pt-16 md:pb-10 max-w-[1180px] mx-auto min-h-[78vh]"
    >
      <div>
        <SlideUp delay={0.05}>
          <div className="font-mono text-[11px] tracking-[2px] text-text3 mb-2">
            {SITE.location}
          </div>
        </SlideUp>

        <SlideUp delay={0.12}>
          <div className="font-mono text-[11px] tracking-[2px] text-accent mb-2">
            {SITE.role}
          </div>
        </SlideUp>

        <SlideUp delay={0.2}>
          <h1 className="font-serif italic text-[clamp(44px,6vw,72px)] leading-[1.05] my-4 tracking-[-1px]">
            {SITE.name.split(" ")[0]}
            <br />
            {SITE.name.split(" ").slice(1).join(" ")}
          </h1>
        </SlideUp>

        <SlideUp delay={0.28}>
          <p className="text-[16px] text-text2 max-w-[440px] leading-[1.7] mb-8">
            Full Stack Developer building fast, reliable web apps — and solving
            algorithmic problems. Studying CSE, 1x ICPC Dhaka Regional, 2x IUPC.
          </p>
        </SlideUp>

        <SlideUp delay={0.36}>
          <div className="flex gap-3 flex-wrap mb-10">
            <Link
              href="/work"
              className="px-6 py-3 rounded-full text-sm font-medium bg-primary text-primary-text hover:opacity-85 transition-opacity"
            >
              View work
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-3 rounded-full text-sm font-medium border border-accent text-accent hover:bg-accent/10 transition-all"
            >
              Get in touch
            </Link>
            <a
              href={SITE.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full text-sm font-medium border border-border text-text hover:border-accent hover:text-accent transition-colors"
            >
              Résumé ↗
            </a>
          </div>
        </SlideUp>

        <SlideUp delay={0.44}>
          <Link
            href="/work"
            className="text-[13px] text-text3 border-b border-border pb-0.5 hover:text-text hover:border-text transition-colors"
          >
            View my case studies
          </Link>
        </SlideUp>
      </div>

      <FadeIn delay={0.3} className="w-full flex justify-center">
        <div className="relative w-full max-w-[420px] h-[420px] md:h-[500px] rounded-2xl overflow-hidden">
          <ParticleHeroImage />
        </div>
      </FadeIn>
    </section>
  );
}
