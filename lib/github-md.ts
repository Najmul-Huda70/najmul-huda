// lib/github-md.ts

export function toRawGithubUrl(url: string): string {
  const u = new URL(url);
  if (u.hostname === "raw.githubusercontent.com") return url;

  if (u.hostname === "github.com") {
    const parts = u.pathname.split("/").filter(Boolean);
    const [user, repo, blob, branch, ...fileParts] = parts;
    if (blob === "blob") {
      return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${fileParts.join("/")}`;
    }
  }
  throw new Error("Unrecognized GitHub URL format");
}

export function extractSection(markdown: string, heading: string): string {
  const lines = markdown.split("\n");
  const startIdx = lines.findIndex((l) => l.trim() === heading);
  if (startIdx === -1) return markdown;

  const level = heading.match(/^#+/)?.[0].length ?? 2;
  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    const m = lines[i].match(/^#+/);
    if (m && m[0].length <= level) { endIdx = i; break; }
  }
  return lines.slice(startIdx, endIdx).join("\n");
}