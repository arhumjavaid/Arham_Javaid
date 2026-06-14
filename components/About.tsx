"use client";

import { motion } from "framer-motion";
import { profile, stats, education, certifications } from "@/lib/data";
import { Reveal, StaggerGroup, staggerItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { CountUp } from "./ui/CountUp";
import { GraduationCap, BadgeCheck } from "lucide-react";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading index="01" title="About me" command="cat about.md" />

      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m a <span className="text-[var(--fg)]">Full Stack Developer</span> based in {profile.location},
              with a year-plus of shipping production software that real users depend on — web, mobile, and
              enterprise SaaS.
            </p>
            <p>
              My sweet spot is the seam between <span className="text-[var(--fg)]">solid engineering</span> and{" "}
              <span className="text-[var(--fg)]">applied AI</span>: Clean Architecture APIs in TypeScript and Node,
              PostgreSQL at scale, and LLM agents built on the OpenAI Agents SDK, LangChain, and the Model Context
              Protocol.
            </p>
            <p>
              I care about systems that are fast, well-tested, and genuinely useful — like cutting a test suite&apos;s
              setup from 60s to under 2s, or letting an AI handle 100% of first-response support traffic.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="surface flex items-start gap-3 rounded-xl p-4">
              <GraduationCap className="mt-0.5 shrink-0 text-[var(--color-accent)]" size={20} />
              <div>
                <p className="font-medium">{education.degree}</p>
                <p className="text-sm text-muted">{education.school}</p>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-muted">{education.period}</p>
              </div>
            </div>
            <div className="surface flex items-start gap-3 rounded-xl p-4">
              <BadgeCheck className="mt-0.5 shrink-0 text-[var(--color-accent)]" size={20} />
              <div>
                <p className="font-medium">Certifications</p>
                {certifications.map((c) => (
                  <p key={c} className="mt-1 text-sm text-muted">
                    {c.replace("Panaversity: ", "")}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <StaggerGroup className="grid grid-cols-2 gap-4 lg:col-span-2" stagger={0.08}>
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              className="glow-card flex flex-col justify-center rounded-2xl p-6"
            >
              <span className="gradient-text font-[family-name:var(--font-display)] text-4xl font-bold">
                <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} />
              </span>
              <span className="mt-2 text-sm leading-snug text-muted">{s.label}</span>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
