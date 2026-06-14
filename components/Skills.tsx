"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { skillGroups } from "@/lib/data";
import { StaggerGroup, staggerItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

// Bento spans for an asymmetric grid (research: drop rigid grids).
const spans = [
  "sm:col-span-2 lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "sm:col-span-2 lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="02"
        title="Skills & toolkit"
        command="ls ~/skills"
        subtitle="The stack I reach for to ship full-stack products and the AI layer on top of them."
      />

      <StaggerGroup className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {skillGroups.map((group, i) => {
          const Icon = (Icons[group.icon as keyof typeof Icons] || Icons.Code) as Icons.LucideIcon;
          return (
            <motion.div
              key={group.title}
              variants={staggerItem}
              className={`glow-card rounded-2xl p-6 ${spans[i] || ""}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--bg-soft)] text-[var(--color-accent)]">
                  <Icon size={20} />
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-muted transition-colors hover:border-[var(--color-accent)] hover:text-[var(--fg)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
