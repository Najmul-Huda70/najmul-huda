export const CATEGORY_LABELS: Record<string, string> = {
  web: "Web Development",
  app: "App Development",
  client: "Client Work",
  opensource: "Open Source",
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function getEmptyCategoryGroups() {
  return Object.fromEntries(
    Object.entries(CATEGORY_LABELS).map(([key, label]) => [
      key,
      { label, list: [] as import("@/models/types").Project[] },
    ])
  );
}