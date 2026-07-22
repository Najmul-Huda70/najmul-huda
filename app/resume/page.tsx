import type { Metadata } from "next";
import { getSkillItems, getEducations, getExperiences, getCertificates } from "@/lib/action";
import ResumeTabs from "@/components/pages/ResumeTabs";

export const metadata: Metadata = {
  title: "Resume | Najmul Huda",
  description: "Explore my skills, education, experience, and certifications.",
};

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const [skills, educations, experiences, certificates] = await Promise.all([
    getSkillItems(),
    getEducations(),
    getExperiences(),
    getCertificates(),
  ]);

  return (
    <main className="min-h-screen px-[6%] py-12 sm:py-16 max-w-[1180px] mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="font-mono text-[11px] tracking-[2.5px] text-accent uppercase mb-2">
          [ CURRICULUM VITAE ]
        </p>
        <h1 className="font-serif italic text-[clamp(36px,6vw,56px)] text-text leading-tight mb-4">
          Skills & Experience.
        </h1>
        <p className="text-text2 text-sm sm:text-base font-sans leading-relaxed">
          A comprehensive overview of my technical expertise, academic journey, professional experience, and certified credentials.
        </p>
      </div>

      {/* Sub-tabs with Skills, Education, Experience, Certificate */}
      <ResumeTabs
        skills={skills}
        educations={educations}
        experiences={experiences}
        certificates={certificates}
      />
    </main>
  );
}
