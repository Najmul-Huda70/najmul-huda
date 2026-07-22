"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Parses "70%+", "12", "5+", "2.5k" style values into
 * { number: 70, prefix: "", suffix: "%+" } so we can animate
 * the numeric part and keep any suffix/prefix static.
 */
function parseValue(raw: string) {
  const match = raw.match(/^([^\d.]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: raw };
  const [, prefix, numStr, suffix] = match;
  return { prefix, number: parseFloat(numStr), suffix };
}

export default function StatCounter({
  value,
  duration = 1.4,
}: {
  value: string;
  duration?: number;
}) {
  const { prefix, number, suffix } = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [display, setDisplay] = useState(0);
  const isDecimal = value.includes(".");

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    let frame: number;

    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(number * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, number, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {isDecimal ? display.toFixed(1) : Math.round(display)}
      {suffix}
    </span>
  );
}
