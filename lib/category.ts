export const CATEGORY_LABELS: Record<string, string> = {
  cp: "Competitive Programming",
  web: "Web Development",
  opensource: "Open Source",
};
 
export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}
 