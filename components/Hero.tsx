"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import { HeroPortrait } from "./HeroPortrait";
import { openChat } from "@/lib/openChat";

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const speed = deleting ? 35 : 75;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="top" className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-28 pb-16">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="surface mb-5 inline-flex w-fit items-center gap-2 rounded-md px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs text-muted backdrop-blur"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        </span>
        status: available_for_hire
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-2 font-[family-name:var(--font-mono)] text-sm text-muted"
      >
        <span className="prompt" />whoami
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="pb-1 font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.08] tracking-tight sm:text-7xl"
      >
        Hi, I&apos;m <span className="gradient-text">{profile.firstName}</span>.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-3 flex min-h-[3rem] items-baseline pb-1.5 font-[family-name:var(--font-display)] text-2xl font-semibold leading-[1.3] sm:text-4xl"
      >
        <span className="shrink-0 whitespace-nowrap text-muted">I&apos;m a&nbsp;</span>
        <span className="text-[var(--fg)]">
          {typed}
          <span className="caret h-6 align-middle sm:h-8" />
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-5 py-3 font-[family-name:var(--font-mono)] text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95"
        >
          ./view_work
          <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
        </a>
        <button
          type="button"
          onClick={() => openChat()}
          className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-5 py-3 font-[family-name:var(--font-mono)] text-sm font-semibold transition-colors hover:border-[var(--color-accent)] hover:text-[var(--accent-ink)]"
        >
          ✦ ask_my_ai
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-8 flex items-center gap-4 font-[family-name:var(--font-mono)] text-muted"
      >
        <span className="inline-flex items-center gap-1.5 text-sm">
          <MapPin size={14} /> {profile.location}
        </span>
        <span className="h-4 w-px bg-[var(--border)]" />
        <div className="flex items-center gap-1">
          {[
            { Icon: Github, href: profile.links.github, label: "GitHub" },
            { Icon: Linkedin, href: profile.links.linkedin, label: "LinkedIn" },
            { Icon: Mail, href: profile.links.email, label: "Email" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-lg transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--color-accent)]"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </motion.div>

        </div>
        <HeroPortrait />
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="block text-muted"
        >
          <ArrowDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
