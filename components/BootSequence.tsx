"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";

// A short, elegant brand intro on first visit (once per session).
export function BootSequence() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(true);

  useEffect(() => {
    let booted = false;
    try {
      booted = sessionStorage.getItem("booted") === "1";
    } catch {}
    if (booted || reduce) {
      setDone(true);
      return;
    }
    setDone(false);
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      setDone(true);
    }, 1100);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]"
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid h-14 w-14 place-items-center rounded-xl bg-[var(--color-accent)] font-[family-name:var(--font-display)] text-xl font-bold text-black"
          >
            AJ
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold"
          >
            {profile.name}
          </motion.span>
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="mt-4 h-0.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
