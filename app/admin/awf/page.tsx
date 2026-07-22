import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AddProjectForm from "@/components/forms/AddProjectForm";
import { getSkillTags } from "@/lib/action";


export default async function AddProjectPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  const availableTags = await getSkillTags();

  return (
    <section className="px-[6%] py-16 max-w-[1180px] mx-auto min-h-[85vh]">
      <div className="mb-10">
        <p className="font-mono text-[10px] tracking-[2px] text-accent uppercase mb-2">
          [ ADMIN CONSOLE ]
        </p>
        <h1 className="font-serif italic text-[clamp(30px,4.5vw,44px)] text-text leading-none">
          Add new project.
        </h1>
        <p className="text-text2 text-xs mt-2 font-sans">
          Fill in the details below to publish a new work entry.
        </p>
      </div>

      <AddProjectForm availableTags={availableTags} />
    </section>
  );
}