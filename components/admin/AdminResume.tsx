"use client";

import React, { useState } from "react";
import type { EducationItem, SkillItem, ExperienceItem, CertificateItem, StatItem } from "@/models/types";
import {
  addEducation,
  updateEducation,
  deleteEducation,
  addSkillItem,
  updateSkillItem,
  deleteSkillItem,
  addExperience,
  updateExperience,
  deleteExperience,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  addStatItem,
  updateStatItem,
  deleteStatItem,
} from "@/lib/action";
import { Plus, Trash2, Edit2, Cpu, GraduationCap, Briefcase, Award, BarChart3 } from "lucide-react";

interface AdminResumeProps {
  educations: EducationItem[];
  skills: SkillItem[];
  experiences: ExperienceItem[];
  certificates: CertificateItem[];
  stats: StatItem[];
}

type SubTab = "skills" | "education" | "experience" | "certificates" | "stats";

export default function AdminResume({
  educations,
  skills,
  experiences,
  certificates,
  stats,
}: AdminResumeProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("skills");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Sub-tabs header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex flex-wrap items-center gap-2 bg-surface/40 border border-border/60 p-1 rounded-full">
          <button
            onClick={() => {
              setActiveSubTab("skills");
              setShowAddForm(false);
              setEditingId(null);
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeSubTab === "skills"
                ? "bg-accent text-[rgb(var(--accent-text))] font-semibold"
                : "text-text2 hover:text-text"
            }`}
          >
            <Cpu size={14} />
            <span>Skills ({skills.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab("education");
              setShowAddForm(false);
              setEditingId(null);
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeSubTab === "education"
                ? "bg-accent text-[rgb(var(--accent-text))] font-semibold"
                : "text-text2 hover:text-text"
            }`}
          >
            <GraduationCap size={14} />
            <span>Education ({educations.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab("experience");
              setShowAddForm(false);
              setEditingId(null);
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeSubTab === "experience"
                ? "bg-accent text-[rgb(var(--accent-text))] font-semibold"
                : "text-text2 hover:text-text"
            }`}
          >
            <Briefcase size={14} />
            <span>Experience ({experiences.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab("certificates");
              setShowAddForm(false);
              setEditingId(null);
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeSubTab === "certificates"
                ? "bg-accent text-[rgb(var(--accent-text))] font-semibold"
                : "text-text2 hover:text-text"
            }`}
          >
            <Award size={14} />
            <span>Certificates ({certificates.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab("stats");
              setShowAddForm(false);
              setEditingId(null);
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeSubTab === "stats"
                ? "bg-accent text-[rgb(var(--accent-text))] font-semibold"
                : "text-text2 hover:text-text"
            }`}
          >
            <BarChart3 size={14} />
            <span>Stats ({stats.length})</span>
          </button>
        </div>

        <button
          onClick={() => {
            setShowAddForm((v) => !v);
            setEditingId(null);
          }}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-accent border border-accent/30 hover:border-accent bg-accent/10 px-4 py-2 rounded-full transition-all self-start sm:self-auto"
        >
          <Plus size={14} />
          <span className="capitalize">Add {activeSubTab} Entry</span>
        </button>
      </div>

      {/* Forms & List for active sub tab */}
      {activeSubTab === "skills" && (
        <SkillsManager
          skills={skills}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      )}

      {activeSubTab === "education" && (
        <EducationManager
          items={educations}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      )}

      {activeSubTab === "experience" && (
        <ExperienceManager
          items={experiences}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      )}

      {activeSubTab === "certificates" && (
        <CertificatesManager
          items={certificates}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      )}

      {activeSubTab === "stats" && (
        <StatsManager
          items={stats}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SKILLS MANAGER                                                             */
/* -------------------------------------------------------------------------- */

function SkillsManager({
  skills,
  showAddForm,
  setShowAddForm,
  editingId,
  setEditingId,
}: any) {
  return (
    <div className="space-y-4 font-sans">
      {showAddForm && (
        <form
          action={async (formData) => {
            await addSkillItem(formData);
            setShowAddForm(false);
          }}
          className="bg-surface/40 border border-accent/30 p-5 rounded-2xl space-y-4"
        >
          <h4 className="font-mono text-xs text-accent uppercase tracking-wider">
            + Add New Skill Item
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Skill Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. React.js"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Category *
              </label>
              <input
                type="text"
                name="category"
                required
                placeholder="Frontend, Backend, Tools, Languages"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent capitalize"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Percentage (0-100) *
              </label>
              <input
                type="number"
                name="percentage"
                min={0}
                max={100}
                required
                defaultValue={80}
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[11px] text-text3 mb-1">
              Category Subtitle (Optional)
            </label>
            <input
              type="text"
              name="subtitle"
              placeholder="e.g. Modern & responsive interfaces"
              className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-1.5 rounded-lg font-mono text-xs text-text3 hover:text-text border border-border/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg font-mono text-xs bg-accent text-[rgb(var(--accent-text))] font-semibold hover:opacity-90"
            >
              Save Skill
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((item: SkillItem) => {
          if (editingId === item._id) {
            return (
              <form
                key={item._id}
                action={async (formData) => {
                  if (item._id) await updateSkillItem(item._id, formData);
                  setEditingId(null);
                }}
                className="bg-surface/50 border border-accent/40 p-4 rounded-xl space-y-3"
              >
                <div>
                  <label className="block font-mono text-[10px] text-text3 mb-0.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={item.name}
                    required
                    className="w-full bg-surface2/60 border border-border/60 rounded px-2.5 py-1 text-xs text-text focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-[10px] text-text3 mb-0.5">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={item.category}
                      required
                      className="w-full bg-surface2/60 border border-border/60 rounded px-2.5 py-1 text-xs text-text focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-text3 mb-0.5">
                      Percentage %
                    </label>
                    <input
                      type="number"
                      name="percentage"
                      defaultValue={item.percentage}
                      required
                      className="w-full bg-surface2/60 border border-border/60 rounded px-2.5 py-1 text-xs text-text focus:outline-none focus:border-accent font-mono"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-2.5 py-1 text-[11px] font-mono text-text3 border border-border/60 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-1 text-[11px] font-mono bg-accent text-[rgb(var(--accent-text))] font-semibold rounded"
                  >
                    Update
                  </button>
                </div>
              </form>
            );
          }

          return (
            <div
              key={item._id}
              className="bg-surface/30 border border-border/60 p-4 rounded-xl flex items-center justify-between gap-3 hover:border-accent/30 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-text truncate">
                    {item.name}
                  </span>
                  <span className="font-mono text-xs text-accent font-semibold">
                    {item.percentage}%
                  </span>
                </div>
                <p className="font-mono text-[10px] text-text3 capitalize">
                  {item.category}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setEditingId(item._id || null)}
                  className="p-1.5 rounded border border-border/60 hover:border-accent/40 text-text2 hover:text-accent"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={async () => {
                    if (item._id && confirm(`Delete skill "${item.name}"?`)) {
                      await deleteSkillItem(item._id);
                    }
                  }}
                  className="p-1.5 rounded border border-border/60 hover:border-text/40 text-text2 hover:text-text"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EDUCATION MANAGER                                                          */
/* -------------------------------------------------------------------------- */

function EducationManager({
  items,
  showAddForm,
  setShowAddForm,
  editingId,
  setEditingId,
}: any) {
  return (
    <div className="space-y-4 font-sans">
      {showAddForm && (
        <form
          action={async (formData) => {
            await addEducation(formData);
            setShowAddForm(false);
          }}
          className="bg-surface/40 border border-accent/30 p-5 rounded-2xl space-y-4"
        >
          <h4 className="font-mono text-xs text-accent uppercase tracking-wider">
            + Add Education Journey Entry
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Degree / Qualification *
              </label>
              <input
                type="text"
                name="degree"
                required
                placeholder="e.g. B.Sc. in Computer Science"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Institution / University *
              </label>
              <input
                type="text"
                name="institution"
                required
                placeholder="e.g. State University"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Period / Years *
              </label>
              <input
                type="text"
                name="period"
                required
                placeholder="2020 - 2024"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                name="fieldOfStudy"
                placeholder="Software Engineering"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Grade / GPA (Optional)
              </label>
              <input
                type="text"
                name="grade"
                placeholder="3.8 / 4.0"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[11px] text-text3 mb-1">
              Description / Achievements
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Key subjects, honors, thesis..."
              className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-1.5 rounded-lg font-mono text-xs text-text3 hover:text-text border border-border/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg font-mono text-xs bg-accent text-[rgb(var(--accent-text))] font-semibold hover:opacity-90"
            >
              Save Education
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item: EducationItem) => (
          <div
            key={item._id}
            className="bg-surface/30 border border-border/60 p-4 rounded-xl flex items-start justify-between gap-4"
          >
            <div>
              <span className="font-mono text-xs text-accent px-2.5 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                {item.period}
              </span>
              <h4 className="font-serif italic text-lg text-text mt-1">
                {item.degree}
              </h4>
              <p className="font-mono text-xs text-text3 uppercase">
                {item.institution} {item.grade ? `• Grade: ${item.grade}` : ""}
              </p>
              {item.description && (
                <p className="text-text2 text-xs mt-2">{item.description}</p>
              )}
            </div>
            <button
              onClick={async () => {
                if (item._id && confirm(`Delete education "${item.degree}"?`)) {
                  await deleteEducation(item._id);
                }
              }}
              className="p-1.5 rounded border border-border/60 hover:border-text/40 text-text2 hover:text-text shrink-0"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EXPERIENCE MANAGER                                                         */
/* -------------------------------------------------------------------------- */

function ExperienceManager({
  items,
  showAddForm,
  setShowAddForm,
  editingId,
  setEditingId,
}: any) {
  return (
    <div className="space-y-4 font-sans">
      {showAddForm && (
        <form
          action={async (formData) => {
            await addExperience(formData);
            setShowAddForm(false);
          }}
          className="bg-surface/40 border border-accent/30 p-5 rounded-2xl space-y-4"
        >
          <h4 className="font-mono text-xs text-accent uppercase tracking-wider">
            + Add Experience Journey Entry
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Role / Position *
              </label>
              <input
                type="text"
                name="role"
                required
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Company / Organization *
              </label>
              <input
                type="text"
                name="company"
                required
                placeholder="e.g. TechCorp Inc."
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Period / Dates *
              </label>
              <input
                type="text"
                name="period"
                required
                placeholder="2023 - Present"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Location (Optional)
              </label>
              <input
                type="text"
                name="location"
                placeholder="Remote / New York, USA"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[11px] text-text3 mb-1">
              Tech Stack (Comma separated)
            </label>
            <input
              type="text"
              name="techStack"
              placeholder="React, Next.js, Node.js, TypeScript, MongoDB"
              className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block font-mono text-[11px] text-text3 mb-1">
              Description / Responsibilities
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Summary of responsibilities and achievements..."
              className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-1.5 rounded-lg font-mono text-xs text-text3 hover:text-text border border-border/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg font-mono text-xs bg-accent text-[rgb(var(--accent-text))] font-semibold hover:opacity-90"
            >
              Save Experience
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item: ExperienceItem) => (
          <div
            key={item._id}
            className="bg-surface/30 border border-border/60 p-4 rounded-xl flex items-start justify-between gap-4"
          >
            <div>
              <span className="font-mono text-xs text-accent px-2.5 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                {item.period}
              </span>
              <h4 className="font-serif italic text-lg text-text mt-1">
                {item.role}
              </h4>
              <p className="font-mono text-xs text-text3 uppercase">
                {item.company} {item.location ? `• ${item.location}` : ""}
              </p>
              {item.description && (
                <p className="text-text2 text-xs mt-2">{item.description}</p>
              )}
            </div>
            <button
              onClick={async () => {
                if (item._id && confirm(`Delete experience "${item.role}"?`)) {
                  await deleteExperience(item._id);
                }
              }}
              className="p-1.5 rounded border border-border/60 hover:border-text/40 text-text2 hover:text-text shrink-0"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CERTIFICATES MANAGER                                                       */
/* -------------------------------------------------------------------------- */

function CertificatesManager({
  items,
  showAddForm,
  setShowAddForm,
  editingId,
  setEditingId,
}: any) {
  return (
    <div className="space-y-4 font-sans">
      {showAddForm && (
        <form
          action={async (formData) => {
            await addCertificate(formData);
            setShowAddForm(false);
          }}
          className="bg-surface/40 border border-accent/30 p-5 rounded-2xl space-y-4"
        >
          <h4 className="font-mono text-xs text-accent uppercase tracking-wider">
            + Add Certificate Entry (Latest first)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Certificate Title *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. AWS Certified Solutions Architect"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Issuer / Organization *
              </label>
              <input
                type="text"
                name="issuer"
                required
                placeholder="e.g. Amazon Web Services"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Issue Date *
              </label>
              <input
                type="text"
                name="issueDate"
                required
                placeholder="May 2024 or 2024-05"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Credential URL (Optional)
              </label>
              <input
                type="text"
                name="credentialUrl"
                placeholder="https://coursera.org/verify/..."
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[11px] text-text3 mb-1">
              Description / Key Skills
            </label>
            <textarea
              name="description"
              rows={2}
              placeholder="Brief details about what was learned..."
              className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-1.5 rounded-lg font-mono text-xs text-text3 hover:text-text border border-border/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg font-mono text-xs bg-accent text-[rgb(var(--accent-text))] font-semibold hover:opacity-90"
            >
              Save Certificate
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item: CertificateItem) => (
          <div
            key={item._id}
            className="bg-surface/30 border border-border/60 p-4 rounded-xl flex items-start justify-between gap-4"
          >
            <div>
              <span className="font-mono text-xs text-accent px-2.5 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                {item.issueDate}
              </span>
              <h4 className="font-serif italic text-lg text-text mt-1">
                {item.title}
              </h4>
              <p className="font-mono text-xs text-text3 uppercase">
                {item.issuer}
              </p>
            </div>
            <button
              onClick={async () => {
                if (item._id && confirm(`Delete certificate "${item.title}"?`)) {
                  await deleteCertificate(item._id);
                }
              }}
              className="p-1.5 rounded border border-border/60 hover:border-text/40 text-text2 hover:text-text shrink-0"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STATS MANAGER (homepage impact strip — "0+ Projects shipped" style)        */
/* -------------------------------------------------------------------------- */

function StatsManager({
  items,
  showAddForm,
  setShowAddForm,
  editingId,
  setEditingId,
}: any) {
  return (
    <div className="space-y-4 font-sans">
      <p className="text-xs text-text3 -mt-1">
        These power the animated impact strip on the homepage (e.g. <span className="font-mono text-text2">70%+</span>, <span className="font-mono text-text2">12</span>, <span className="font-mono text-text2">3+</span>). Leave this list empty to hide the section entirely.
      </p>

      {showAddForm && (
        <form
          action={async (formData) => {
            await addStatItem(formData);
            setShowAddForm(false);
          }}
          className="bg-surface/40 border border-accent/30 p-5 rounded-2xl space-y-4"
        >
          <h4 className="font-mono text-xs text-accent uppercase tracking-wider">
            + Add New Stat
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Key (unique) *
              </label>
              <input
                type="text"
                name="key"
                required
                placeholder="e.g. projects_shipped"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent font-mono"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Value *
              </label>
              <input
                type="text"
                name="value"
                required
                placeholder="e.g. 12+, 70%+, 3"
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent font-mono"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-text3 mb-1">
                Order
              </label>
              <input
                type="number"
                name="order"
                defaultValue={items.length}
                className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[11px] text-text3 mb-1">
              Label *
            </label>
            <input
              type="text"
              name="label"
              required
              placeholder="e.g. Projects shipped in production"
              className="w-full bg-surface2/60 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-text focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-1.5 rounded-lg font-mono text-xs text-text3 hover:text-text border border-border/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg font-mono text-xs bg-accent text-[rgb(var(--accent-text))] font-semibold hover:opacity-90"
            >
              Save Stat
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item: StatItem) => {
          if (editingId === item._id) {
            return (
              <form
                key={String(item._id)}
                action={async (formData) => {
                  if (item._id) await updateStatItem(item._id as unknown as string, formData);
                  setEditingId(null);
                }}
                className="bg-surface/50 border border-accent/40 p-4 rounded-xl space-y-3"
              >
                <div>
                  <label className="block font-mono text-[10px] text-text3 mb-0.5">
                    Key
                  </label>
                  <input
                    type="text"
                    name="key"
                    defaultValue={item.key}
                    required
                    className="w-full bg-surface2/60 border border-border/60 rounded px-2.5 py-1 text-xs text-text focus:outline-none focus:border-accent font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-[10px] text-text3 mb-0.5">
                      Value
                    </label>
                    <input
                      type="text"
                      name="value"
                      defaultValue={item.value}
                      required
                      className="w-full bg-surface2/60 border border-border/60 rounded px-2.5 py-1 text-xs text-text focus:outline-none focus:border-accent font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-text3 mb-0.5">
                      Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      defaultValue={item.order}
                      className="w-full bg-surface2/60 border border-border/60 rounded px-2.5 py-1 text-xs text-text focus:outline-none focus:border-accent font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-text3 mb-0.5">
                    Label
                  </label>
                  <input
                    type="text"
                    name="label"
                    defaultValue={item.label}
                    required
                    className="w-full bg-surface2/60 border border-border/60 rounded px-2.5 py-1 text-xs text-text focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-2.5 py-1 text-[11px] font-mono text-text3 border border-border/60 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-1 text-[11px] font-mono bg-accent text-[rgb(var(--accent-text))] font-semibold rounded"
                  >
                    Update
                  </button>
                </div>
              </form>
            );
          }

          return (
            <div
              key={String(item._id)}
              className="bg-surface/30 border border-border/60 p-4 rounded-xl flex items-center justify-between gap-3 hover:border-accent/30 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif italic text-lg text-accent">
                    {item.value}
                  </span>
                  <span className="font-mono text-[10px] text-text3">
                    #{item.order}
                  </span>
                </div>
                <p className="text-xs text-text2 truncate">{item.label}</p>
                <p className="font-mono text-[10px] text-text3">{item.key}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setEditingId(item._id || null)}
                  className="p-1.5 rounded border border-border/60 hover:border-accent/40 text-text2 hover:text-accent"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={async () => {
                    if (item._id && confirm(`Delete stat "${item.label}"?`)) {
                      await deleteStatItem(item._id as unknown as string);
                    }
                  }}
                  className="p-1.5 rounded border border-border/60 hover:border-text/40 text-text2 hover:text-text"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
