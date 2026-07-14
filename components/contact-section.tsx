import { SITE } from "@/lib/site-config";
import RevealSection from "@/components/reveal-section";

const CONTACT_CARDS = [
  {
    label: "EMAIL",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    cta: "Write to me ↗",
  },
  {
    label: "GITHUB",
    value: `/${SITE.social.github.split("/").pop()}`,
    href: SITE.social.github,
    cta: "View code ↗",
  },
  {
    label: "LINKEDIN",
    value: `/in/${SITE.social.linkedin.split("/").pop()}`,
    href: SITE.social.linkedin,
    cta: "Connect ↗",
  },
];

export default function ContactSection() {
  return (
    <RevealSection
      id="contact"
      className="px-5 sm:px-[6%] py-14 sm:py-20 max-w-[1180px] mx-auto text-center"
    >
      <h2 className="font-serif italic text-[clamp(28px,5.5vw,54px)] leading-[1.2] mb-6 sm:mb-9 px-2">
        Let&apos;s build something
        <br className="hidden sm:block" /> that lasts.
      </h2>

      <div className="inline-flex items-center gap-2 sm:gap-2.5 border border-border rounded-full px-4 sm:px-5.5 py-2 sm:py-2.5 font-mono text-[10px] sm:text-[11px] tracking-[1px] text-accent mb-8 sm:mb-12 max-w-[92%] sm:max-w-none text-left sm:text-center">
        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
        <span className="leading-snug">
          AVAILABLE FOR INTERNSHIPS &amp; FREELANCE WORK
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-8 sm:mb-10 text-left">
        {CONTACT_CARDS.map((card) => (
          <div
            key={card.label}
            className="bg-surface border border-border rounded-2xl px-5 py-4.5 sm:px-5.5 sm:py-5 transition-all duration-250 hover:border-accent hover:-translate-y-1"
          >
            <div className="font-mono text-[10px] tracking-[1.5px] text-text3 mb-2 sm:mb-2.5">
              {card.label}
            </div>
            <div className="text-[14px] sm:text-[15px] text-text mb-3 sm:mb-3.5 break-words">
              {card.value}
            </div>
            <a
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-[13px] text-text2 hover:text-accent transition-colors inline-block"
            >
              {card.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-3.5 items-center">
        <a
          href={`mailto:${SITE.email}`}
          className="w-full sm:w-auto text-center px-6 py-3 rounded-full text-sm font-medium bg-primary text-primary-text hover:opacity-85 transition-opacity"
        >
          Start a conversation
        </a>
        <a
          href={SITE.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto text-center px-6 py-3 rounded-full text-sm font-medium border border-border text-text hover:border-accent hover:text-accent transition-colors"
        >
          Download résumé
        </a>
      </div>
    </RevealSection>
  );
}