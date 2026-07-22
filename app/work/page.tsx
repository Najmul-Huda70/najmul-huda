import type { Metadata } from "next";
import type { Project } from "@/models/types";
import ProjectsBrowser from "@/components/pages/ProjectsBrowser";
import { db } from "@/lib/auth";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Work — Case Studies",
  description:
    "A growing archive of full-stack apps, tools, and things I've built. Browse by category or search.",
};

export default async function ProjectsPage() {
  const raw = await db
    .collection<Project>("projects")
    .find()
    .sort({ year: -1 })
    .toArray();
  const projects: Project[] = JSON.parse(JSON.stringify(raw));

  return (
    <section className="px-[6%] py-16 max-w-[1180px] mx-auto">
      <SectionHeader
        badge="[ CASE STUDIES ]"
        title="All the work."
        subtitle="A growing archive of full-stack apps, tools, and things I've built while learning. Browse by category, or search."
      />
      <ProjectsBrowser projects={projects} />
    </section>
  );
}
