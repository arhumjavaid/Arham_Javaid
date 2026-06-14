"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const LINES = [
  { text: "arham@portfolio:~$ ./init --portfolio", kind: "cmd" as const },
  { text: "loading profile.json", kind: "ok" as const },
  { text: "mounting ~/projects", kind: "ok" as const },
  { text: "connecting ai-agent · gemini-flash", kind: "ok" as const },
  { text: "compiling ui · framer-motion", kind: "ok" as const },
  { text: "ready ▸ welcome.", kind: "done" as const },
];

export function BootSequence() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(true);
  const [count, setCount] = useState(0);

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
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= LINES.length) {
        clearInterval(id);
        setTimeout(() => {
          try {
            sessionStorage.setItem("booted", "1");
          } catch {}
          setDone(true);
        }, 550);
      }
    }, 240);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06080a]"
        >
          <div className="w-full max-w-md px-6 font-[family-name:var(--font-mono)] text-sm leading-relaxed">
            {LINES.slice(0, count).map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className={l.kind === "cmd" ? "text-[#dbe7e0]" : l.kind === "done" ? "text-[#3df5a0]" : "text-[#76897f]"}
              >
                {l.kind === "ok" && <span className="text-[#3df5a0]">[ ok ] </span>}
                {l.text}
              </motion.p>
            ))}
            <span className="caret-block" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
