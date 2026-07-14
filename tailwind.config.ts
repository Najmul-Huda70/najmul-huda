import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface2) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        text2: "rgb(var(--text2) / <alpha-value>)",
        text3: "rgb(var(--text3) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-text": "rgb(var(--primary-text) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        type: {
          to: { width: "16ch" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        type: "type 1.4s steps(20) forwards",
        fadeUp: "fadeUp .7s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
