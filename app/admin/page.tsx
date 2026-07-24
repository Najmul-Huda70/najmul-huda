import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  getWorks,
  getBlogPosts,
  getCategories,
  getEducations,
  getSkillItems,
  getExperiences,
  getCertificates,
  getStatItems,
} from "@/lib/action";
import AdminTabsWrapper from "@/components/admin/AdminTabsWrapper";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) {
    redirect("/");
  }

  const [works, blogs, categories, educations, skills, experiences, certificates, stats] =
    await Promise.all([
      getWorks(),
      getBlogPosts(false),
      getCategories(),
      getEducations(),
      getSkillItems(),
      getExperiences(),
      getCertificates(),
      getStatItems(),
    ]);

  const sortedWorks = [...works].sort((a, b) => (b.year || 0) - (a.year || 0));

  return (
    <section className="px-5 sm:px-[6%] py-14 sm:py-16 max-w-[1180px] mx-auto min-h-[85vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8 mb-10">
        <div>
          <p className="font-mono text-[10px] tracking-[2px] text-accent uppercase mb-2">
            [ ADMIN CONSOLE ]
          </p>
          <h1 className="font-serif italic text-[clamp(28px,5vw,50px)] text-text leading-none">
            Manage Portfolio Content.
          </h1>
          <p className="text-text2 text-xs sm:text-sm mt-2 font-sans">
            Welcome back, {user?.name || "Admin"}. Add, edit, or delete work projects, blog posts, categories, and resume details.
          </p>
        </div>
      </div>

      {/* Admin Tabs */}
      <AdminTabsWrapper
        works={sortedWorks}
        blogs={blogs}
        categories={categories}
        educations={educations}
        skills={skills}
        experiences={experiences}
        certificates={certificates}
        stats={stats}
      />
    </section>
  );
}
