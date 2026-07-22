"use client";

import React, { useState } from "react";
import type { SkillItem, EducationItem, ExperienceItem, CertificateItem } from "@/models/types";
import SkillsSection from "@/components/pages/SkillsSection";
import EducationSection from "@/components/pages/EducationSection";
import ExperienceSection from "@/components/pages/ExperienceSection";
import CertificatesSection from "@/components/pages/CertificatesSection";
import { Cpu, GraduationCap, Briefcase, Award } from "lucide-react";

interface ResumeTabsProps {
  skills: SkillItem[];
  educations: EducationItem[];
  experiences: ExperienceItem[];
  certificates: CertificateItem[];
}

type TabType = "skills" | "education" | "experience" | "certificate";

export default function ResumeTabs({
  skills,
  educations,
  experiences,
  certificates,
}: ResumeTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("skills");

  const tabs: { id: TabType; label: string; icon: React.ElementType; count: number }[] = [
    { id: "skills", label: "Skills", icon: Cpu, count: skills.length },
    { id: "education", label: "Education", icon: GraduationCap, count: educations.length },
    { id: "experience", label: "Experience", icon: Briefcase, count: experiences.length },
    { id: "certificate", label: "Certificate", icon: Award, count: certificates.length },
  ];

  return (
    <div className="space-y-8">
      {/* Navigation Sub-Tabs */}
      <div className="flex justify-center border-b border-border/40 pb-4">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-surface/40 p-1.5 rounded-full border border-border/60 backdrop-blur-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 font-sans ${
                  isActive
                    ? "bg-accent text-[rgb(var(--accent-text))] font-semibold shadow-lg shadow-accent/20 scale-105"
                    : "text-text2 hover:text-text hover:bg-surface2/60"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-[rgb(var(--accent-text))]/20 text-[rgb(var(--accent-text))]"
                        : "bg-surface2 text-text3"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="min-h-[400px]">
        {activeTab === "skills" && <SkillsSection skills={skills} />}
        {activeTab === "education" && <EducationSection items={educations} />}
        {activeTab === "experience" && <ExperienceSection items={experiences} />}
        {activeTab === "certificate" && <CertificatesSection items={certificates} />}
      </div>
    </div>
  );
}
