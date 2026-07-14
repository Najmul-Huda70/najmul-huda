"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-[#0A0A0A] transition-opacity duration-700 ${
        hide
          ? "opacity-0 invisible pointer-events-none"
          : "opacity-100 visible"
      }`}
      aria-hidden={hide}
    >
      <div className="flex flex-col justify-center items-center">
         <a className="font-serif italic text-lg text-text">
        Najmul Huda
      </a>
     
      <span className="font-mono text-[13px] tracking-[3px] text-[#D9A441] whitespace-nowrap overflow-hidden w-0 animate-type">
        LOADING PORTFOLIO
      </span>
      </div>
    </div>
  );
}
