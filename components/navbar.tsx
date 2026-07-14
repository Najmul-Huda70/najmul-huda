"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { SITE } from "@/lib/site-config";
import { useSession } from "@/lib/auth-client";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/work", label: "work" },
  { href: "/services", label: "Services" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const pathname = usePathname();
  const user = session?.user;

  const isAdmin = user && session;

  const activeLinks = isAdmin 
    ? [...NAV_LINKS, { href: "/admin", label: "Admin" }] 
    : NAV_LINKS;

  console.log("Session:", session, "User:", user, "isAdmin:", isAdmin);

  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between gap-6 px-[6%] py-5 border-b border-border bg-bg/70 backdrop-blur-md transition-colors duration-400">
      <Link href="/" className="font-serif italic text-lg text-text">
        {SITE.name}.
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.3px]">
          {activeLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive 
                    ? "text-accent font-medium" 
                    : "text-text2 hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        
        <div className="hidden sm:flex items-center gap-4">
           <a
            href={SITE.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-text2 hover:text-accent transition-colors"
          >
            <GithubIcon /> 
          </a>
          <a
            href={SITE.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-text2 hover:text-accent transition-colors"
          >
            <LinkedinIcon />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            aria-label="Email"
            className="text-text2 hover:text-accent transition-colors"
          >
            <MailIcon />
          </a>
        </div>

        <button
          id="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-[34px] h-[34px] rounded-full border border-border flex items-center justify-center text-text text-sm hover:border-accent transition-colors"
        >
          {theme === "dark" ? "◐" : "◑"}
        </button>
      </div>
    </nav>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.15v3.19c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.78 24h20.44C23.2 24 24 23.22 24 22.25V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}