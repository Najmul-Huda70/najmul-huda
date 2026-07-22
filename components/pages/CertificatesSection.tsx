"use client";

import React from "react";
import type { CertificateItem } from "@/models/types";
import EmptyState from "@/components/shared/EmptyState";
import { Award, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";

export default function CertificatesSection({ items }: { items: CertificateItem[] }) {
  if (!items || items.length === 0) {
    return (
      <EmptyState
        badge="[ UPCOMING CERTIFICATES ]"
        title="Upcoming Certificates & Credentials"
        description="Professional certifications and course completions are currently being uploaded. Check back soon!"
      />
    );
  }

  // Ensure latest first sorting
  const sortedItems = [...items].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined && a.order !== b.order) {
      return a.order - b.order;
    }
    return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
  });

  return (
    <div className="py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedItems.map((item, index) => (
          <div
            key={item._id || index}
            className="group bg-surface/30 border border-border/60 hover:border-accent/40 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              {/* Header with Icon/Image & Date */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <Award size={24} />
                  )}
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-accent px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                  <Calendar size={13} />
                  {item.issueDate}
                </div>
              </div>

              {/* Title & Issuer */}
              <h3 className="font-serif italic text-xl text-text mb-1 group-hover:text-accent transition-colors">
                {item.title}
              </h3>

              <div className="flex items-center gap-1.5 font-mono text-xs text-text3 mb-3 uppercase tracking-wider">
                <CheckCircle2 size={13} className="text-accent" />
                {item.issuer}
              </div>

              {item.description && (
                <p className="text-text2 text-xs sm:text-sm leading-relaxed mb-4 font-sans line-clamp-3">
                  {item.description}
                </p>
              )}
            </div>

            {/* Footer with Credential ID & Link */}
            <div className="pt-4 border-t border-border/20 flex items-center justify-between gap-2 mt-auto">
              {item.credentialId ? (
                <span className="font-mono text-[11px] text-text3 truncate">
                  ID: {item.credentialId}
                </span>
              ) : (
                <span className="font-mono text-[11px] text-text3">Verified</span>
              )}

              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
                >
                  <span>Verify</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
