"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { profile } from "@/lib/data";

// Floating tech badges arranged around the portrait.
const badges = [
  { label: "React", dot: "#61dafb", className: "left-[-8%] top-[12%]", delay: 0 },
  { label: "Node.js", dot: "#3c873a", className: "right-[-10%] top-[26%]", delay: 0.6 },
  { label: "TypeScript", dot: "#3178c6", className: "left-[-12%] bottom-[28%]", delay: 1.1 },
  { label: "AWS", dot: "#ff9900", className: "right-[-6%] bottom-[14%]", delay: 0.3 },
  { label: "PostgreSQL", dot: "#336791", className: "left-[18%] bottom-[-6%]", delay: 0.9 },
];

export function HeroPortrait() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.21, 0.6, 0.35, 1] }}
      className="relative mx-auto hidden aspect-[4/5] w-full max-w-sm lg:block"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-110 rounded-[2.2rem] opacity-70 blur-3xl"
        style={{
          background:
            "conic-gradient(from 120deg, var(--color-accent), var(--color-accent-3), var(--color-accent-2), var(--color-accent))",
        }}
      />

      {/* rotating gradient ring */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-[2.2rem] p-[2px]"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-accent), transparent 25%, transparent 75%, var(--color-accent-3))",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* frame */}
      <div className="surface relative h-full w-full overflow-hidden rounded-[2.2rem]">
        {imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photo}
            alt={profile.name}
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <Placeholder />
        )}

        {/* bottom gradient + name chip */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-white drop-shadow">
            {profile.name}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Open to work
          </span>
        </div>
      </div>

      {/* floating tech badges */}
      {badges.map((b) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: [0, -7, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.6 + b.delay },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: b.delay },
          }}
          className={`surface absolute inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium shadow-lg backdrop-blur-md ${b.className}`}
          style={{ backgroundColor: "color-mix(in srgb, var(--card) 85%, var(--bg))" }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: b.dot }} />
          {b.label}
        </motion.div>
      ))}
    </motion.div>
  );
}

function Placeholder() {
  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[var(--bg-soft)] to-[var(--bg)]">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-3)] font-[family-name:var(--font-display)] text-4xl font-bold text-black">
          AJ
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] text-muted">
          <Camera size={12} /> Add photo → public/arham.jpg
        </span>
      </div>
    </div>
  );
}
