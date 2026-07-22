import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Layers } from "lucide-react";
import { getProjectBySlug, getRelatedProjects } from "@/lib/workDetails";
import ImageSlider from "@/components/shared/ImageSlider";
import { categoryLabel } from "@/lib/category";


// Always hit the database fresh — this page is never statically cached.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = await getRelatedProjects(project.category, project.slug, 2);

  return (
    <main className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      {/*
        max-w-6xl matches the ~1150px content width used on the homepage grid.
        If you already have a shared <Container> / layout wrapper elsewhere,
        swap this div for that instead so the widths line up exactly.
      */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:px-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-[rgb(var(--text2))] transition-colors hover:text-[rgb(var(--text))]"
        >
          <ArrowLeft size={16} />
          All work
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr,1fr] lg:gap-14">
          {/* Left column — image slider, pinned while the right column scrolls */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {project.image?.length > 0 && (
              <ImageSlider images={project.image} title={project.title} />
            )}
          </div>

          {/* Right column — everything else */}
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-[rgb(var(--text3))]">
              <span>{categoryLabel(project.category)}</span>
              <span>&middot;</span>
              <span className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    project.status === "live" ? "bg-[rgb(var(--accent))]" : "bg-[rgb(var(--text3))]"
                  }`}
                />
                {project.status}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-4xl italic sm:text-5xl">{project.title}</h1>

            <p className="mt-4 text-[rgb(var(--text2))]">{project.short_description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[rgb(var(--text2))]">
              <span className="flex items-center gap-1.5">
                <Layers size={14} />
                {project.type}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {project.year}
              </span>
            </div>

            {/* Metric */}
            <div className="mt-8 border-t border-[rgb(var(--border))] pt-6">
              <div className="text-3xl font-semibold text-[rgb(var(--accent))]">
                {project.metricValue}
              </div>
              <div className="mt-1 text-sm text-[rgb(var(--text3))]">
                {project.metricLabel}
              </div>
            </div>

            {/* Full description */}
            <p className="mt-6 leading-relaxed text-[rgb(var(--text2))]">
              {project.description}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface2))] px-3 py-1 text-xs text-[rgb(var(--text2))]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Repository + live links */}
            <div className="mt-8 flex flex-wrap gap-3 border-t border-[rgb(var(--border))] pt-6">
              {/* {project.repository?.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-2 text-sm transition-colors hover:border-[rgb(var(--accent))]"
                >
                  <Github size={16} />
                  {repo.label}
                </a>
              ))} */}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-4 py-2 text-sm text-[rgb(var(--primary-text))] transition-opacity hover:opacity-90"
                >
                  <ExternalLink size={16} />
                  Live site
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Related projects — same category, max 2 */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-[rgb(var(--border))] pt-10">
            <h2 className="text-xs uppercase tracking-wider text-[rgb(var(--text3))]">
              More in {categoryLabel(project.category)}
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/w/${p.slug}`}
                  className="group rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5 transition-colors hover:border-[rgb(var(--accent))]"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[rgb(var(--text3))]">
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          p.status === "live" ? "bg-[rgb(var(--accent))]" : "bg-[rgb(var(--text3))]"
                        }`}
                      />
                      {p.status}
                    </span>
                    <span>{p.year}</span>
                  </div>

                  <h3 className="mt-3 text-lg transition-colors group-hover:text-[rgb(var(--accent))]">
                    {p.title}
                  </h3>

                  <p className="mt-1 text-sm text-[rgb(var(--text2))] line-clamp-2">
                    {p.short_description}
                  </p>

                  <div className="mt-4 text-lg font-semibold text-[rgb(var(--accent))]">
                    {p.metricValue}
                    <span className="ml-1.5 text-xs font-normal text-[rgb(var(--text3))]">
                      {p.metricLabel}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}