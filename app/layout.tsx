import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Preloader from "@/components/preloader";
import { Toaster } from "react-hot-toast";
import '@/app/globals.css';
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
  title: "Your Name — Developer & Competitive Programmer",
  description:
    "Full-stack developer and competitive programmer building fast, reliable web apps with Next.js and TypeScript, and solving algorithmic problems on Codeforces and LeetCode.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      
        className={`${serif.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}
      >
        <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
        <ThemeProvider>
          <Preloader />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
