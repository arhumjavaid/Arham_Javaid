"use client";

import { motion } from "framer-motion";
import { SquareTerminal, MessageSquare, ArrowRight } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { openChat } from "@/lib/openChat";

const PREVIEW = [
  "What's his experience with AI & MCP?",
  "Tell me about his biggest project.",
  "What's his tech stack?",
  "How can I contact him?",
];

export function AskAI() {
  return (
    <section id="ask-ai" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="✦"
        title="Ask my AI anything"
        command="./ask-ai --interactive"
        subtitle="Instead of scrolling, just ask. I built a retrieval-grounded assistant over my résumé — the same kind of LLM/agent work I ship for clients. It lives in the corner of every page."
      />

      <Reveal>
        <div className="glow-card relative overflow-hidden rounded-2xl p-8 sm:p-10">
          {/* ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
          />

          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="surface mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted">
                <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-3)] text-black">
                  <SquareTerminal size={12} />
                </span>
                Powered by Gemini · grounded on my CV
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                Meet my Portfolio Assistant
              </h3>
              <p className="mt-2 text-muted">
                Ask about my experience, projects, skills, or how to reach me — you&apos;ll get an answer in
                seconds. Try one of these:
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {PREVIEW.map((q) => (
                  <button
                    key={q}
                    onClick={() => openChat(q)}
                    className="rounded-full border border-[var(--border)] bg-[var(--bg-soft)] px-3 py-1.5 text-xs text-muted transition-colors hover:border-[var(--color-accent)] hover:text-[var(--fg)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={() => openChat()}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-6 py-3.5 font-semibold text-black shadow-lg shadow-[var(--color-accent)]/20"
            >
              <MessageSquare size={18} /> Start chatting
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
