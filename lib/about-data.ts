import type { AboutTab } from "@/models/types";

export const ABOUT_TABS: AboutTab[] = [
  {
    id: "who",
    label: "Who I Am",
    paragraphs: [
      "I'm Your Name, a developer and competitive programmer based in Bangladesh. I build full-stack web apps with Next.js and TypeScript, and spend my free time solving algorithmic problems on Codeforces and LeetCode.",
      "What I care about most is thinking clearly before writing code: breaking a problem down, choosing the right approach, and only then implementing it — whether that's a contest problem or a production feature.",
    ],
  },
  {
    id: "education",
    label: "Education",
    paragraphs: [
      "Self-taught programmer, starting with C fundamentals and problem solving in 2022 before moving into structured data structures & algorithms study through daily Codeforces practice.",
      "Continually learning through official documentation, open-source codebases, and contest editorials rather than a single formal curriculum — treating each new concept as a problem to implement, not just read about.",
    ],
  },
  {
    id: "achievements",
    label: "Achievements",
    paragraphs: [
      "420+ problems solved and 65+ contests completed on Codeforces, with a rating that reflects steady, consistent improvement rather than short bursts of grinding.",
      "Shipped 12+ projects spanning full-stack web apps, developer dashboards, and an open-source algorithm visualizer that's picked up traction on GitHub.",
    ],
  },
];
