"use client";

import { useReveal } from "@/lib/use-reveal";
import Image from "next/image";
// import profilePhoto from "@/public/profile.jpg"; // tomar photo

const SKILLS = [
  "Full Stack Dev",
  "Problem Solving",
  "Next.js",
  "TypeScript",
  "System Design",
  "Competitive Programming",
];

export default function AboutSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="reveal px-[6%] py-20 max-w-[1180px] mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
        {/* LEFT — Photo card with location badge */}
        <div className="relative rounded-2xl overflow-hidden bg-surface2 aspect-[4/4.7]">
          {/* <Image
            src={profilePhoto}
            alt="Profile photo"
            fill
            className="object-cover grayscale contrast-125 brightness-90"
            priority
          /> */}

          {/* subtle dark gradient at bottom for badge readability */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Location badge */}
          <div className="absolute bottom-5 left-5 bg-accent text-black rounded-xl px-4 py-2.5 shadow-lg">
            <p className="font-serif italic text-sm leading-none">Mymensingh</p>
            <p className="font-mono text-[10px] tracking-wider mt-1 opacity-70">
              BANGLADESH
            </p>
          </div>
        </div>

        {/* RIGHT — Text content */}
        <div>
          <div className="font-mono text-[11px] tracking-[2px] text-accent mb-3">
            [ ABOUT ]
          </div>

          <h2 className="font-serif italic text-[clamp(30px,4.2vw,44px)] leading-[1.2] mb-6 text-text">
            I build for problems that
            <br />
            deserve real solutions.
          </h2>

          <p className="text-text2 text-[15px] leading-[1.8] mb-5 max-w-[560px]">
            I work across product engineering and algorithmic problem
            solving — from designing APIs and data models to optimizing
            solutions under tight time and memory limits, where clean code
            meets contest-grade thinking.
          </p>

          <p className="text-text2 text-[15px] leading-[1.8] mb-8 max-w-[560px]">
            Currently studying CSE, with real competitive programming
            credentials — 1x ICPC Dhaka Regional and 2x IUPC — I bring the
            same precision and problem-solving mindset to every product I
            build.
          </p>

          {/* Skill tags */}
          <div className="flex gap-2.5 flex-wrap">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-[12px] border border-border text-text2 hover:border-accent hover:text-text transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}