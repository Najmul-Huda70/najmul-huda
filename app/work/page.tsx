import type { Metadata } from "next";
import { getWorks, getCategories } from "@/lib/action";
import WorkBrowser from "@/components/pages/WorkBrowser";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Work — Case Studies",
  description:
    "A growing archive of full-stack apps, tools, and things I've built. Browse by category or search.",
};

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const [works, categories] = await Promise.all([
    getWorks(),
    getCategories("work"),
  ]);

  const sorted = [...works].sort((a, b) => (b.year || 0) - (a.year || 0));

  return (
    <section className="px-[6%] py-16 max-w-[1180px] mx-auto">
      <SectionHeader
        badge="[ CASE STUDIES ]"
        title="All the work."
        subtitle="A growing archive of full-stack apps, tools, and things I've built while learning. Browse by category, or search."
      />
      <WorkBrowser works={sorted} categories={categories} />
    </section>
  );
}
