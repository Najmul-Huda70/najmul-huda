"use client";

import { ReactNode } from "react";
import { useReveal } from "@/lib/use-reveal";
import clsx from "clsx";

interface RevealSectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function RevealSection({
  id,
  className,
  children,
}: RevealSectionProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <section id={id} ref={ref} className={clsx("reveal", className)}>
      {children}
    </section>
  );
}
