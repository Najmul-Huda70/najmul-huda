"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref and adds the
 * `.show` class once the element scrolls into view — matches the
 * `.reveal` / `.reveal.show` fade-up pattern used across the site.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * Same idea, but for a group of child elements (e.g. every timeline
 * entry or about-block inside a container) that should each reveal
 * independently as they individually enter the viewport.
 */
export function useRevealGroup<T extends HTMLElement>(
  selector: string,
  threshold = 0.2
) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [selector, threshold]);

  return containerRef;
}
