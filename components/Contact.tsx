"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Send, Download, Check, Loader2, AlertCircle } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio message from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "", company: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else if (data.fallback) {
        // Backend not configured yet → open the user's mail client instead.
        mailtoFallback();
        setStatus("idle");
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error — you can email me directly instead.");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="05"
        title="Let's build something"
        command="./contact --send"
        subtitle="Open to full-stack and AI engineering roles, freelance, and collaborations. The fastest way to reach me is below."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-3">
              {[
                { Icon: Mail, label: profile.email, href: profile.links.email },
                { Icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
                { Icon: Github, label: "github.com/arhumjavaid", href: profile.links.github },
                { Icon: Linkedin, label: "linkedin.com/in/arham-javaid", href: profile.links.linkedin },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="glow-card flex items-center gap-4 rounded-xl p-4"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--bg-soft)] text-[var(--color-accent)]">
                    <Icon size={18} />
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-sm">{label}</span>
                </a>
              ))}
            </div>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <Download size={16} /> Download my résumé
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} className="surface relative space-y-4 rounded-2xl p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="Jane Doe"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  placeholder="jane@company.com"
                />
              </Field>
            </div>
            <Field label="Message">
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input resize-none"
                placeholder="Tell me about the role or project…"
              />
            </Field>

            {/* Honeypot — hidden from real users, catches bots */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={15} /> {error}
              </p>
            )}

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {status === "sending" && (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              )}
              {status === "sent" && (
                <>
                  <Check size={16} /> Message sent — thank you!
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </motion.button>
          </form>
        </Reveal>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.6rem;
          border: 1px solid var(--border);
          background: var(--bg-soft);
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          color: var(--fg);
          outline: none;
          transition: border-color 0.2s;
        }
        :global(.input:focus) {
          border-color: var(--color-accent);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
