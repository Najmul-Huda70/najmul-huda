"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  title: string;
}

export default function ImageSlider({ images, title }: ImageSliderProps) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
      <div className="relative aspect-video w-full">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`${title} screenshot ${i + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/70 text-[rgb(var(--text))] backdrop-blur transition-colors hover:bg-[rgb(var(--bg))]/90"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/70 text-[rgb(var(--text))] backdrop-blur transition-colors hover:bg-[rgb(var(--bg))]/90"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-[rgb(var(--accent))]"
                    : "w-1.5 bg-[rgb(var(--text3))]"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}