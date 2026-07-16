import type { Project, ProjectCategory } from "@/models/types";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  web: "Web Development",
  app: "App Development",
  client: "Client Work",
  opensource: "Open Source",
};

export function categoryLabel(category: ProjectCategory): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function getEmptyCategoryGroups() {
  return Object.fromEntries(
    Object.entries(CATEGORY_LABELS).map(([key, label]) => [
      key,
      { label, list: [] as Project[] },
    ])
  ) as Record<ProjectCategory, { label: string; list: Project[] }>;
}