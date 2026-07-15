import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, db } from "@/lib/auth";
import { headers } from "next/headers";
import DeleteProjectBtn from "@/components/DeleteProjectBtn";
import FeaturedToggle from "@/components/FeaturedToggle";
import type { Project } from "@/models/types";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers:  headers(),
  });

  const user = session?.user;
  const isAdmin = user;

  if (!isAdmin) {
    redirect("/");
  }

  const projects = await db.collection<Project>("projects").find().sort({year:-1}).toArray();
  console.log(projects);
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
            Welcome back, {user?.name || "Admin"}. Create, edit, or remove
            your showcase projects.
          </p>
        </div>

        <Link
          href="/admin/awf"
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
        <div className="flex flex-col gap-3">
          {/* column labels — desktop only */}
          <div className="hidden sm:grid grid-cols-[1fr_120px_90px_110px_140px] gap-4 px-6 font-mono text-[10px] tracking-wider text-text3 uppercase">
            <span>Project</span>
            <span>Category</span>
            <span>Year</span>
            <span>Featured</span>
            <span className="text-right">Actions</span>
          </div>

          {projects.map((project, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[1fr_120px_90px_110px_140px] items-center gap-3 sm:gap-4 border border-border/60 rounded-xl bg-surface/10 backdrop-blur-sm px-5 sm:px-6 py-4 transition-colors hover:border-accent/30 hover:bg-surface2/10"
            >
              {/* Project title + thumbnail */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-surface2 border border-border/60 overflow-hidden flex items-center justify-center">
                  {project.image?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-text3 text-sm">◆</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-text truncate">
                    {project.title}
                  </p>
                  <p className="sm:hidden text-[10px] text-text3 mt-0.5 font-mono">
                    {project.category} • {project.year}
                  </p>
                </div>
              </div>

              {/* Category */}
              <div className="hidden sm:block text-text2 text-sm capitalize truncate">
                {project.category}
              </div>

              {/* Year */}
              <div className="hidden sm:block text-text2 font-mono text-xs">
                {project.year}
              </div>

              {/* Featured toggle */}
              <div>
                <FeaturedToggle
                  projectId={project?._id?.toString() || ""}
                  featured={!!project.featured}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-start sm:justify-end gap-3">
                <Link
                  href={`/admin/ew/${project.slug}`}
                  className="font-mono text-[11px] text-text2 hover:text-accent border border-border/80 hover:border-accent/40 bg-surface/40 px-3 py-1 rounded transition-all"
                >
                  Edit
                </Link>
                <DeleteProjectBtn
                  _id={project?._id?.toString() || ""}
                  projectTitle={project.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}