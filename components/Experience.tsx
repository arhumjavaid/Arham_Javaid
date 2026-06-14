"use client";

import { Briefcase } from "lucide-react";
import { experience } from "@/lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading index="04" title="Experience" command="git log --career" />

      <div className="relative ml-2 border-l border-[var(--border)] pl-8 sm:ml-4">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.08}>
            <div className="relative pb-12 last:pb-0">
              <span className="absolute -left-[42px] grid h-7 w-7 place-items-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--color-accent)]">
                <Briefcase size={13} />
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                  {job.role} <span className="text-[var(--color-accent)]">· {job.company}</span>
                </h3>
                <span className="font-[family-name:var(--font-mono)] text-xs text-muted">{job.period}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{job.location}</p>
              <ul className="mt-4 space-y-2.5">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
