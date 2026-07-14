import Link from "next/link";
import RevealSection from "@/components/reveal-section";

const SERVICES = [
  {
    title: "Full-Stack Web Apps",
    description:
      "End-to-end product builds on Next.js and TypeScript — from database schema to deployed UI. Authentication, dashboards, admin panels, and everything in between.",
    tags: ["Next.js", "Node.js", "PostgreSQL / MongoDB"],
  },
  {
    title: "API & Backend Systems",
    description:
      "REST and GraphQL APIs designed for clarity and scale. Clean data models, proper validation, and services that stay fast under real load.",
    tags: ["REST", "GraphQL", "Prisma"],
  },
  {
    title: "Performance Optimization",
    description:
      "Slow queries, bloated bundles, laggy renders — I profile first, then fix root causes, not symptoms. The same discipline that wins contests under a strict time limit.",
    tags: ["Profiling", "Caching", "Algorithms"],
  },
  {
    title: "UI Engineering",
    description:
      "Pixel-accurate implementation of designs with React and Tailwind — responsive by default, accessible by default, animated only where it earns its place.",
    tags: ["React", "Tailwind CSS", "Accessibility"],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Scope",
    description:
      "A short call to understand the problem, the users, and the constraints. I turn that into a clear spec before any code is written.",
  },
  {
    step: "02",
    title: "Build",
    description:
      "Iterative development in small, reviewable pieces. Regular check-ins so direction gets corrected early, not after launch.",
  },
  {
    step: "03",
    title: "Ship",
    description:
      "Tested, documented, and deployed. I stay available after launch for fixes and the first round of real-world feedback.",
  },
];

export default function ServicesSection() {
  return (
    <RevealSection
      id="services"
      className="px-5 sm:px-[6%] py-14 sm:py-20 max-w-[1180px] mx-auto"
    >
      {/* Header */}
      <div className="max-w-[640px] mb-14 sm:mb-20">
        <div className="font-mono text-[10px] sm:text-[11px] tracking-[2px] text-accent uppercase mb-3">
          [ SERVICES ]
        </div>
        <h2 className="font-serif italic text-[clamp(30px,5.5vw,50px)] leading-[1.15] mb-5 text-text">
          Code that ships, and holds up after it does.
        </h2>
        <p className="text-text2 text-[15px] leading-[1.75]">
          I take full-stack web projects from a rough idea to a production
          system — building the parts that are visible and the parts that
          aren&apos;t, with the same attention to both.
        </p>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-16 sm:mb-24">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="bg-surface border border-border rounded-2xl p-6 sm:p-7 transition-all duration-250 hover:border-accent hover:-translate-y-1"
          >
            <h3 className="font-serif italic text-xl sm:text-[22px] text-text mb-3">
              {service.title}
            </h3>
            <p className="text-text2 text-sm leading-[1.75] mb-5">
              {service.description}
            </p>
            <div className="flex gap-2 flex-wrap">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full border border-border text-text3"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Process — a real sequence, so numbering earns its place here */}
      <div className="mb-16 sm:mb-24">
        <div className="font-mono text-[10px] sm:text-[11px] tracking-[2px] text-accent uppercase mb-8 sm:mb-10">
          [ HOW WE&apos;D WORK TOGETHER ]
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {PROCESS.map((item) => (
            <div key={item.step} className="border-t border-border pt-5">
              <span className="font-mono text-xs text-text3">{item.step}</span>
              <h3 className="font-serif italic text-xl text-text mt-2 mb-3">
                {item.title}
              </h3>
              <p className="text-text2 text-sm leading-[1.75]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-surface border border-border rounded-2xl px-6 py-10 sm:px-12 sm:py-14 text-center">
        <h3 className="font-serif italic text-[clamp(24px,4vw,34px)] leading-[1.2] mb-4 text-text">
          Have a project in mind?
        </h3>
        <p className="text-text2 text-[15px] mb-8 max-w-[460px] mx-auto leading-[1.75]">
          Open to internships, freelance work, and short-term collaborations.
          Tell me what you&apos;re building.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 items-center">
          <Link
            href="/#contact"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full text-sm font-medium bg-primary text-primary-text hover:opacity-85 transition-opacity"
          >
            Start a conversation
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full text-sm font-medium border border-border text-text hover:border-accent hover:text-accent transition-colors"
          >
            See past work
          </Link>
        </div>
      </div>
    </RevealSection>
  );
}