"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { TermMark } from "./ui/TermMark";
import { openChat } from "@/lib/openChat";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-6 ${
            scrolled
              ? "surface py-2.5 shadow-lg shadow-black/5 backdrop-blur-xl"
              : "bg-transparent py-3"
          }`}
          style={scrolled ? { backgroundColor: "color-mix(in srgb, var(--card) 80%, var(--bg))" } : {}}
        >
          <a href="#top" className="group flex items-center gap-2 font-[family-name:var(--font-mono)] font-bold">
            <TermMark size={32} />
            <span className="hidden sm:inline">~/arham</span>
          </a>

          <div className="hidden items-center gap-1 font-[family-name:var(--font-mono)] md:flex">
            {navLinks.map((l) =>
              l.href === "#ask-ai" ? (
                <button
                  key={l.href}
                  onClick={() => openChat()}
                  className="rounded-md px-3 py-1.5 text-sm lowercase text-muted transition-colors hover:text-[var(--accent-ink)]"
                >
                  {l.label}
                </button>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-3 py-1.5 text-sm lowercase text-muted transition-colors hover:text-[var(--accent-ink)]"
                >
                  {l.label}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              download
              className="hidden rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:inline-block"
            >
              Resume
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* scroll progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="mx-auto mt-1 h-px max-w-6xl origin-left bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent-3)]"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <div className="surface flex flex-col gap-1 rounded-2xl p-3 backdrop-blur-xl">
              {navLinks.map((l) =>
                l.href === "#ask-ai" ? (
                  <button
                    key={l.href}
                    onClick={() => {
                      setOpen(false);
                      openChat();
                    }}
                    className="rounded-lg px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--bg-soft)]"
                  >
                    {l.label}
                  </button>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-[var(--bg-soft)]"
                  >
                    {l.label}
                  </a>
                )
              )}
              <a
                href={profile.resume}
                download
                className="rounded-lg px-4 py-2.5 text-sm text-[var(--color-accent)]"
              >
                Download Resume ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
