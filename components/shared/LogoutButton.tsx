"use client";

import { signOut } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await signOut();
      router.refresh(); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button 
      onClick={handleLogOut}
      className="hover:text-accent transition-colors duration-200 font-mono text-xs focus:outline-none"
    >
      [ Logout ]
    </button>
  );
}