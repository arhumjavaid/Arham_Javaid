"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, Lock, CheckCircle2 } from "lucide-react";
import type { CaseStudy as CaseStudyType } from "@/lib/caseStudies";
import { profile } from "@/lib/data";
import { Background } from "./Background";
import { Footer } from "./Footer";
import { Reveal } from "./ui/Reveal";
import { WindowBar } from "./ui/WindowBar";
import { DiagramFlow } from "./ui/DiagramFlow";

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <Reveal>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-[var(--accent-ink)]">{index}</span> <span className="text-muted">/</span> {title}
        </h2>
      </Reveal>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function CaseStudy({ data }: { data: CaseStudyType }) {
  return (
    <>
      <Background />
      <main className="relative mx-auto max-w-3xl px-6 pt-28 pb-16">
        {/* back link */}
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-[var(--fg)]"
          >
            <ArrowLeft size={15} /> Back to projects
          </Link>
        </Reveal>

        {/* header */}
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-soft)] px-2 py-0.5">
              <Lock size={11} /> {data.company}
            </span>
            <span>{data.role}</span>
            <span className="h-3 w-px bg-[var(--border)]" />
            <span>{data.period}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
            {data.title}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 text-lg leading-relaxed text-muted">{data.headline}</p>
        </Reveal>

        {/* stack */}
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap gap-2">
            {data.stack.map((t) => (
              <span
                key={t}
                className="rounded-md bg-[var(--bg-soft)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        {/* metrics */}
        <Reveal delay={0.25}>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.metrics.map((m) => (
              <div key={m.label} className="surface rounded-xl p-4">
                <div className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--accent-ink)] sm:text-2xl">
                  {m.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Block index="01" title="Context">
          {data.context.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="mb-4 leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}
        </Block>

        <Block index="02" title="Constraints">
          <ul className="space-y-3">
            {data.constraints.map((c, i) => (
              <Reveal key={i} delay={i * 0.04} as="li" className="flex gap-3 leading-relaxed text-muted">
                <ArrowUpRight size={16} className="mt-1 shrink-0 text-[var(--color-accent)]" />
                <span>{c}</span>
              </Reveal>
            ))}
          </ul>
        </Block>

        <Block index="03" title="Architecture">
          <Reveal>
            <div className="glow-card overflow-hidden rounded-2xl">
              <WindowBar title="architecture.svg" />
              <DiagramFlow diagram={data.diagram} />
            </div>
          </Reveal>
        </Block>

        <Block index="04" title="Key decisions">
          <div className="space-y-4">
            {data.decisions.map((d, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="surface rounded-xl p-5">
                  <p className="text-sm leading-relaxed text-muted">
                    <span className="font-medium text-[var(--fg)]">Problem · </span>
                    {d.problem}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    <span className="font-medium text-[var(--fg)]">Decision · </span>
                    {d.decision}
                  </p>
                  <p className="mt-2.5 flex gap-2 text-sm leading-relaxed text-[var(--fg)]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                    <span>
                      <span className="font-medium text-[var(--accent-ink)]">Result · </span>
                      {d.result}
                    </span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block index="05" title={data.deepDive.title}>
          {data.deepDive.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="mb-4 leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}

          <Reveal>
            <div className="my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="surface rounded-xl p-5">
                <div className="font-[family-name:var(--font-mono)] text-xs text-muted">{data.deepDive.before.label}</div>
                <div className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-muted line-through decoration-[var(--border)]">
                  {data.deepDive.before.value}
                </div>
              </div>
              <div className="surface rounded-xl border-[color:color-mix(in_srgb,var(--color-accent)_45%,var(--border))] p-5">
                <div className="font-[family-name:var(--font-mono)] text-xs text-muted">{data.deepDive.after.label}</div>
                <div className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--accent-ink)]">
                  {data.deepDive.after.value}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="glow-card overflow-hidden rounded-2xl">
              <WindowBar title="schema-snapshot" />
              <pre className="overflow-x-auto p-5 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed sm:text-xs">
                {data.deepDive.code.lines.map((line, i) => (
                  <span
                    key={i}
                    className={line.startsWith("#") ? "block text-muted" : "block text-[var(--fg)]"}
                  >
                    {line || " "}
                  </span>
                ))}
              </pre>
            </div>
            <p className="mt-2 font-[family-name:var(--font-mono)] text-xs text-muted">{data.deepDive.code.caption}</p>
          </Reveal>
        </Block>

        <Block index="06" title="Outcomes">
          <ul className="space-y-3">
            {data.outcomes.map((o, i) => (
              <Reveal key={i} delay={i * 0.04} as="li" className="flex gap-3 leading-relaxed text-muted">
                <CheckCircle2 size={16} className="mt-1 shrink-0 text-[var(--color-accent)]" />
                <span>{o}</span>
              </Reveal>
            ))}
          </ul>
        </Block>

        <Block index="07" title="What I took away">
          <ul className="space-y-3">
            {data.takeaways.map((t, i) => (
              <Reveal key={i} delay={i * 0.04} as="li" className="flex gap-3 leading-relaxed text-muted">
                <ArrowUpRight size={16} className="mt-1 shrink-0 text-[var(--color-accent)]" />
                <span>{t}</span>
              </Reveal>
            ))}
          </ul>
        </Block>

        {data.note && (
          <Reveal>
            <p className="mt-10 flex gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-4 text-xs leading-relaxed text-muted">
              <Lock size={13} className="mt-0.5 shrink-0" />
              <span>{data.note}</span>
            </p>
          </Reveal>
        )}

        {/* CTA */}
        <Reveal>
          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-8">
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(`Re: ${data.title}`)}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Mail size={16} /> Talk through this project
            </a>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--color-accent)] hover:text-[var(--accent-ink)]"
            >
              <ArrowLeft size={16} /> Back to all work
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
