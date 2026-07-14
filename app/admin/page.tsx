import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Project } from "@/models/types";
import DeleteProjectBtn from "@/components/DeleteProjectBtn";
const api = process.env.NEXT_PUBLIC_APP_URL;
async function getAllProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${api}/api/projects`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const result = await res.json();
    return result.data || [];
  } catch (err) {
    console.error("[TopProjects] failed to load projects:", err);
    return [];
  }
}

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const isAdmin = user;

  if (!isAdmin) {
    redirect("/");
  }

  const projects = await getAllProjects();

  return (
    <section className="px-[6%] py-16 max-w-[1180px] mx-auto min-h-[85vh]">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8 mb-10">
        <div>
          <p className="font-mono text-[10px] tracking-[2px] text-accent uppercase mb-2">
            [ ADMIN CONSOLE ]
          </p>
          <h1 className="font-serif italic text-[clamp(35px,5vw,50px)] text-text leading-none">
            Manage your work.
          </h1>
          <p className="text-text2 text-xs mt-2 font-sans">
            Welcome back, {user?.name || "Admin"}. Create, edit, or remove your
            showcase projects.
          </p>
        </div>

        {/* Add Work  */}
        <Link
          href={`admin/awf`}
          className="group inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.5px] text-accent"
        >
          <span className="animate-blink">+</span>
          <span className="border-b border-transparent group-hover:border-accent transition-colors">
            Add work
          </span>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-border/40 rounded-2xl">
          <p className="font-mono text-xs text-text3">[ 00 / 00 ]</p>
          <h3 className="text-base text-text font-medium mt-2">
            No projects found in database
          </h3>
          <p className="text-xs text-text2 mt-1">
            Click the button above to create your first build.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-border/60 rounded-xl bg-surface/10 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/60 font-mono text-[11px] tracking-wider text-text3 uppercase bg-surface2/20">
                <th className="py-4 px-6">Project Title</th>
                <th className="py-4 px-6 hidden sm:table-cell">Category</th>
                <th className="py-4 px-6 hidden md:table-cell">Year</th>
                <th className="py-4 px-6 hidden sm:table-cell">Featured</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-sm">
              {projects.map((project,index) => (
                <tr
                  key={index}
                  className="hover:bg-surface2/10 transition-colors"
                >
                  
                  <td className="py-4 px-6 font-medium text-text">
                    {project.title}
                    <span className="block sm:hidden text-[10px] text-text3 mt-0.5 font-mono">
                      {project.category} • {project.year}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-text2 hidden sm:table-cell capitalize">
                    {project.category}
                  </td>

                  <td className="py-4 px-6 text-text2 font-mono text-xs hidden md:table-cell">
                    {project.year}
                  </td>

                  <td className="py-4 px-6 hidden sm:table-cell">
                    {project.featured ? (
                      <span className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                        YES
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-text3">
                        NO
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/edit/${project.slug}`}
                        className="font-mono text-[11px] text-text2 hover:text-accent border border-border/80 hover:border-accent/40 bg-surface/40 px-3 py-1 rounded transition-all"
                      >
                        Edit
                      </Link>
                      <DeleteProjectBtn
                        _id={project?._id?.toString() || ""}
                        projectTitle={project.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
