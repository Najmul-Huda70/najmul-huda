import Link from "next/link";
import type { Project } from "@/models/types";
import ProjectCard from "@/components/project-card";
import RevealSection from "@/components/reveal-section";
import { db } from "@/lib/auth";

const api = process.env.NEXT_PUBLIC_APP_URL;

// async function getFeaturedProjects(): Promise<Project[]> {
//   try {
//     const res = await fetch(`${api}/api/projects?featured=true`, {
//       next: { revalidate: 60 },
//     });
//     if (!res.ok) throw new Error("Failed to fetch");
//     const result = await res.json();
//     return result.data || [];
//   } catch (err) {
//     console.error("[TopProjects] failed to load projects:", err);
//     return [];
//   }
// }

export default async function TopProjects() {
  // const projects = await getFeaturedProjects();
   const projects = await db
          .collection<Project>("projects")
          .find({featured:true})
          .sort({ year: -1 })
          .toArray();
  const hasProjects = projects.length > 0;

  return (
    <RevealSection id="projects" className="px-[6%] py-20 max-w-[1180px] mx-auto">
      <div className="font-mono text-[11px] tracking-[2px] text-accent mb-2">
        [ CASE STUDIES ]
      </div>
      <h2 className="font-serif italic text-[clamp(38px,6vw,58px)] my-4">
        The work.
      </h2>
      <p className="text-text2 text-[15px] max-w-[520px] mb-10">
        A selection of the projects I&apos;m proudest of — full-stack apps,
        competitive-programming tools, and open-source work.
      </p>

      {!hasProjects ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-accent/20 rounded-lg text-center px-4">
          <p className="font-mono text-[11px] tracking-[1px] text-accent mb-2">[ 00 / 00 ]</p>
          <h3 className="text-base text-text font-medium font-mono">New builds coming soon</h3></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-full text-sm font-medium border border-accent text-accent hover:bg-accent hover:text-primary-text transition-colors"
            >
              View all projects
            </Link>
          </div>
        </>
      )}
    </RevealSection>
  );
}