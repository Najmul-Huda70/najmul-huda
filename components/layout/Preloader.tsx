"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 18 + 8;
      });
    }, 80);

    const timer = setTimeout(() => setVisible(false), 1300);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[rgb(var(--bg))]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Name */}
            <span className="font-serif italic text-2xl text-[rgb(var(--text))]">
              Najmul Huda
            </span>

            {/* Progress bar */}
            <div className="w-40 h-[1px] bg-[rgb(var(--border))] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[rgb(var(--accent))] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>

            {/* Mono label */}
            <span className="font-mono text-[11px] tracking-[3px] text-[rgb(var(--text3))]">
              LOADING
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
