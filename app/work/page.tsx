import type { Metadata } from "next";
import type { Project } from "@/models/types";
import ProjectsBrowser from "@/components/projects-browser";
import { db } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Najmul Huda",
};

const api = process.env.NEXT_PUBLIC_APP_URL;



export default async function ProjectsPage() {
  const project = await db
        .collection<Project>("projects")
        .find()
        .sort({ year: -1 })
        .toArray();
        // console.log('projects:',project);
         const projects: Project[] = JSON.parse(JSON.stringify(project));
  return (
    <section className="px-[6%] py-16 max-w-[1180px] mx-auto">
      <div className="font-mono text-[11px] tracking-[2px] text-accent mb-2">
        [ CASE STUDIES ]
      </div>
     <div className="flex items-baseline justify-between flex-wrap gap-4 my-4">
  <h1 className="font-serif italic text-[clamp(38px,6vw,58px)]">All the work.</h1>
</div>
      <p className="text-text2 text-[15px] max-w-[520px] mb-10">
        A growing archive of full-stack apps, tools, and things I&apos;ve
        built while learning. Browse by category, or search.
      </p>

      <ProjectsBrowser projects={projects} />
    </section>
  );
}
