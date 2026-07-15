import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[rgb(var(--bg))] px-6 text-center text-[rgb(var(--text))]">
      <p className="text-xs uppercase tracking-wider text-[rgb(var(--text3))]">404</p>
      <h1 className="font-serif text-3xl italic">Project not found</h1>
      <p className="max-w-sm text-sm text-[rgb(var(--text2))]">
        This project doesn&apos;t exist, or the link is out of date.
      </p>
      <Link
        href="/projects"
        className="mt-2 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-2 text-sm transition-colors hover:border-[rgb(var(--accent))]"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>
    </main>
  );
}