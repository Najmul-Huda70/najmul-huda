import Link from "next/link";
import type { Project } from "@/models/types";
import ProjectCard from "@/components/pages/ProjectCard";
import { db } from "@/lib/auth";
import { MoveRight } from "lucide-react";
import TopProjectsSkeleton from "@/components/pages/TopProjectSkeleton";
import { Suspense } from "react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";

export default async function TopProjects() {
  const projects = await db
    .collection<Project>("projects")
    .find({ featured: true })
    .sort({ year: -1 })
    .toArray();
  const hasProjects = projects.length > 0;

  return (
    <Suspense fallback={<TopProjectsSkeleton />}>
      <section id="projects" className="px-[6%] py-20 max-w-[1180px] mx-auto">
        <RevealOnScroll>
          <div className="font-mono text-[11px] tracking-[2px] text-accent mb-2">
            [ CASE STUDIES ]
          </div>
          <div className="flex items-end justify-between gap-4 my-4">
            <h2 className="font-serif italic text-[clamp(38px,6vw,58px)]">
              The work.
            </h2>
            <Link
              href="/work"
              className="flex items-center gap-1.5 whitespace-nowrap font-mono text-xs tracking-wider text-text2 hover:text-accent transition-colors mb-2 group"
            >
              <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
              View all
            </Link>
          </div>
          <p className="text-text2 text-[15px] max-w-[520px] mb-10">
            A selection of the projects I&apos;m proudest of — full-stack apps,
            competitive-programming tools, and open-source work.
          </p>
        </RevealOnScroll>

        {!hasProjects ? (
          <RevealOnScroll delay={0.2}>
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-accent/20 rounded-lg text-center px-4">
              <p className="font-mono text-[11px] tracking-[1px] text-accent mb-2">
                [ 00 / 00 ]
              </p>
              <h3 className="text-base text-text font-medium font-mono">
                New featured builds coming soon
              </h3>
            </div>
          </RevealOnScroll>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {projects.map((project, i) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>
    </Suspense>
  );
}
