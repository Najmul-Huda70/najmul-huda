import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import ContactSection from "@/components/pages/ContactSection";
import { headers } from "next/headers";
import "highlight.js/styles/github-dark.css";
const serif = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Najmul Huda — Developer & Problem Solver",
    template: "%s | Najmul Huda",
  },
  description:
    "Full-stack developer and Problem Solver building fast, reliable web apps with Next.js and TypeScript, and solving algorithmic problems on Codeforces and LeetCode.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Najmul Huda",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read theme cookie server-side — zero flash on page load
  const reqHeaders = await headers();
  const theme = (reqHeaders.get("x-theme") as "dark" | "light") ?? "dark";

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <body
        className={`${serif.variable} ${sans.variable} ${mono.variable} grain-bg font-sans antialiased`}
      >
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "rgb(var(--surface))",
              color: "rgb(var(--text))",
              border: "1px solid rgb(var(--border))",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
            },
          }}
        />
        <ThemeProvider initialTheme={theme}>
          <Preloader />
          <Navbar />
          <main>{children}</main>
          <ContactSection />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
