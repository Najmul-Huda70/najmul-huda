"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface AdminLinkBtnProps {
  href: string;
  label: string;
  variant?: "underline" | "pill";
}

/**
 * The canonical admin action link — matches the "+ Add work" pattern.
 * variant="underline" → blink + + hover underline (used in public-facing sections)
 * variant="pill"      → solid accent pill (used inside admin dashboard)
 */
export function AdminLinkBtn({
  href,
  label,
  variant = "underline",
}: AdminLinkBtnProps) {
  if (variant === "pill") {
    return (
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 font-mono text-xs text-[rgb(var(--accent-text))] font-semibold bg-accent hover:opacity-90 px-4 py-2 rounded-full transition-all shadow-md shadow-accent/20"
      >
        <motion.span
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="text-sm leading-none"
        >
          +
        </motion.span>
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.5px] text-accent"
    >
      <span className="animate-blink">+</span>
      <span className="border-b border-transparent group-hover:border-accent transition-colors">
        {label}
      </span>
    </Link>
  );
}

/* ---------------------------------------------------------- */
/* Generic action buttons                                     */
/* ---------------------------------------------------------- */
type BtnVariant = "primary" | "ghost" | "accent" | "danger";

interface ActionBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<BtnVariant, string> = {
  primary:
    "bg-primary text-primary-text hover:opacity-85",
  accent:
    "bg-accent text-[rgb(var(--accent-text))] font-semibold hover:opacity-90 shadow-md shadow-accent/20",
  ghost:
    "border border-border text-text2 hover:border-accent/60 hover:text-accent bg-transparent",
  danger:
    "border border-border text-text2 hover:border-text hover:text-text bg-transparent",
};

export function ActionBtn({
  variant = "primary",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ActionBtnProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
    >
      {loading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      )}
      {children}
    </button>
  );
}
