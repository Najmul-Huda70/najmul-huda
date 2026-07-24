// Save as @/components/blog-hero-slider.tsx
// Shared by both app/blog/[id]/page.tsx and app/work/[id]/page.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogHeroSlider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const goTo = (i: number) => {
    setIndex((i + images.length) % images.length);
  };

  return (
    <div className="group relative w-full h-full overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
        >
          <Image
            src={src}
            alt={`${title} — image ${i + 1}`}
            fill
            unoptimized
            priority={i === 0}
            sizes="100vw"
            className="object-contain object-center"
          />
        </div>
      ))}

      {hasMultiple && (
        <>
          {/* prev / next arrows — hidden on small screens, tap dots instead */}
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous image"
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-9 h-9 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next image"
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-9 h-9 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={18} />
          </button>

          {/* dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-accent" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}