import { redirect, notFound } from "next/navigation";
import { auth, db } from "@/lib/auth";
import { headers } from "next/headers";
import type { Project } from "@/models/types";
import EditProjectForm from "@/components/EditProjectForm";
import { getSkillTags } from "@/lib/action";

async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const project = await db.collection("projects").findOne({ slug: slug });

    if (!project) return null;

    return {
      ...project,
      _id: project._id.toString(),
    } as unknown as Project;
  } catch (err) {
    console.error("[EditProject] failed to load project from DB:", err);
    return null;
  }
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  const { slug } = await params;
  const [project, availableTags] = await Promise.all([
    getProjectBySlug(slug),
    getSkillTags(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <section className="px-[6%] py-16 max-w-[1180px] mx-auto min-h-[85vh]">
      <div className="mb-10">
        <p className="font-mono text-[10px] tracking-[2px] text-accent uppercase mb-2">
          [ ADMIN CONSOLE ]
        </p>
        <h1 className="font-serif italic text-[clamp(30px,4.5vw,44px)] text-text leading-none">
          Edit project.
        </h1>
        <p className="text-text2 text-xs mt-2 font-sans">
          Editing “{project.title}”
        </p>
      </div>

      <EditProjectForm project={project} availableTags={availableTags} />
    </section>
  );
}