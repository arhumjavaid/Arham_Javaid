"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Folder, Star, Lock, MonitorPlay, Mail, BookOpen } from "lucide-react";
import { projects, profile } from "@/lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { WindowBar } from "./ui/WindowBar";

function fileName(p: { title: string; stack: string[] }) {
  const slug = p.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .slice(0, 3)
    .join("-");
  const ext = p.stack.includes("Python") ? "py" : p.stack.some((s) => s.includes("TypeScript")) ? "tsx" : "js";
  return `~/work/${slug}.${ext}`;
}

function demoMailto(title: string) {
  const subject = encodeURIComponent(`Demo request — ${title}`);
  const body = encodeURIComponent(
    `Hi Arham,\n\nI'd love a walkthrough/demo of "${title}". Here's a bit about me and what I'm looking for:\n\n`
  );
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="03"
        title="Selected work"
        command="./run selected-work"
        subtitle="Real, shipped projects — the problem, how I approached it, and the measurable outcome."
      />

      <div className="grid gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="glow-card group overflow-hidden rounded-2xl"
            >
              <WindowBar title={fileName(p)} />
              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--bg-soft)] text-[var(--color-accent)]">
                    {p.featured ? <Star size={18} /> : <Folder size={18} />}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {p.featured && (
                        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--color-accent)]">
                          Featured
                        </span>
                      )}
                      {p.proprietary && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-soft)] px-2 py-0.5 text-[11px] font-medium text-muted">
                          <Lock size={11} /> Proprietary · {p.company}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold leading-tight">
                      {p.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  <span className="font-medium text-[var(--fg)]">The problem · </span>
                  {p.problem}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <span className="font-medium text-[var(--fg)]">My approach · </span>
                  {p.approach}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-[var(--bg-soft)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col lg:col-span-5">
                <span className="font-[family-name:var(--font-mono)] text-xs text-muted">{p.period}</span>
                <ul className="mt-4 space-y-2.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm text-muted">
                      <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--border)] pt-4">
                  {p.proprietary ? (
                    <>
                      {p.caseStudy ? (
                        <Link
                          href={`/work/${p.caseStudy}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-3 py-1.5 text-xs font-semibold text-black transition-transform hover:scale-[1.03]"
                        >
                          <BookOpen size={14} /> Read case study
                        </Link>
                      ) : (
                        <a
                          href={demoMailto(p.title)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-3 py-1.5 text-xs font-semibold text-black transition-transform hover:scale-[1.03]"
                        >
                          <MonitorPlay size={14} /> Request a demo
                        </a>
                      )}
                      <a
                        href={demoMailto(p.title)}
                        aria-label="Email about this project"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                      >
                        <Mail size={14} /> Email
                      </a>
                      <span className="ml-auto inline-flex items-center gap-1 self-center text-[11px] text-muted">
                        <Lock size={11} /> Source under NDA
                      </span>
                    </>
                  ) : (
                    <>
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-3 py-1.5 text-xs font-semibold text-black transition-transform hover:scale-[1.03]"
                        >
                          <MonitorPlay size={14} /> Live demo
                        </a>
                      )}
                      <a
                        href={p.github || profile.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--accent-ink)]"
                      >
                        <Github size={14} /> View source
                      </a>
                      {!p.demo && (
                        <a
                          href={demoMailto(p.title)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--accent-ink)]"
                        >
                          <Mail size={14} /> Ask about it
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
