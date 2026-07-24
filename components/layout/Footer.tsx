import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import LogoutButton from "@/components/shared/LogoutButton"; // ক্লায়েন্ট বাটনটি ইমপোর্ট করুন

export default async function Footer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const isLogin = session && session.user;

  return (
    <footer className="px-[6%] py-8 border-t border-border max-w-[1180px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-text3 text-sm font-sans">
        {/* Left Side: Copyright text */}
        <div>
          © {new Date().getFullYear()} Najmul Huda — built with Next.js
        </div>

        {/* Right Side: Admin Login / Logout Link */}
        <div>
          {isLogin ? (
            <LogoutButton />
          ) : (
            <>
            <Link 
              href="/login" 
              className="hover:text-accent transition-colors duration-200 font-mono text-xs"
            >
              [ Admin Login ]
            </Link>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}