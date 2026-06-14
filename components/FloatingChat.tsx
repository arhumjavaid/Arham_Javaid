"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SquareTerminal, Send, Bot, User, X, GripVertical } from "lucide-react";
import { profile, chatTeasers } from "@/lib/data";
import { OPEN_CHAT_EVENT } from "@/lib/openChat";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What's his experience with AI & MCP?",
  "Tell me about his biggest project.",
  "What's his tech stack?",
  "How can I contact him?",
];

const GREETING: Msg = {
  role: "assistant",
  content: `Hi! 👋 I'm ${profile.firstName}'s AI assistant. Ask me anything about his experience, projects, skills, or how to reach him.`,
};

const DEFAULT = { w: 384, h: 560 };
const MIN = { w: 320, h: 380 };

type DragState =
  | { mode: "drag"; offX: number; offY: number }
  | { mode: "resize"; startW: number; startH: number; startX: number; startY: number; mx: number; my: number }
  | null;

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState(DEFAULT);
  const [isMobile, setIsMobile] = useState(false);

  // hover teaser
  const [teaser, setTeaser] = useState<string | null>(null);
  const teaserTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // chat
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef<DragState>(null);

  useEffect(() => setMounted(true), []);

  const computeDefaultPos = useCallback((w: number, h: number) => {
    const mobile = window.innerWidth < 640;
    if (mobile) {
      const mw = window.innerWidth - 24;
      const mh = Math.min(window.innerHeight * 0.72, 620);
      return { mobile, size: { w: mw, h: mh }, pos: { x: 12, y: window.innerHeight - mh - 88 } };
    }
    const clampedH = Math.min(h, window.innerHeight - 32);
    const y = Math.max(16, window.innerHeight - clampedH - 96);
    return { mobile, size: { w, h: clampedH }, pos: { x: window.innerWidth - w - 24, y } };
  }, []);

  const doOpen = useCallback(() => {
    const { mobile, size: s, pos: p } = computeDefaultPos(DEFAULT.w, DEFAULT.h);
    setIsMobile(mobile);
    setSize(s);
    setPos(p);
    setOpen(true);
    setTeaser(null);
  }, [computeDefaultPos]);

  const doClose = useCallback(() => {
    setOpen(false);
    // reset size & position to default on close
    setSize(DEFAULT);
    setPos(null);
  }, []);

  // external open trigger (teaser section / nav)
  useEffect(() => {
    const handler = () => doOpen();
    window.addEventListener(OPEN_CHAT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler);
  }, [doOpen]);

  // autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // hover teaser rotation
  const startTeasers = () => {
    if (open) return;
    setTeaser(chatTeasers[Math.floor(Math.random() * chatTeasers.length)]);
    teaserTimer.current = setInterval(() => {
      setTeaser(chatTeasers[Math.floor(Math.random() * chatTeasers.length)]);
    }, 1400);
  };
  const stopTeasers = () => {
    if (teaserTimer.current) clearInterval(teaserTimer.current);
    setTeaser(null);
  };
  useEffect(() => () => stopTeasers(), []);

  // keep latest size in a ref so the global listener never needs re-subscribing
  const sizeRef = useRef(size);
  sizeRef.current = size;

  // drag + resize via window listeners (subscribed once)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      e.preventDefault();
      const maxW = Math.min(760, window.innerWidth - 24);
      const maxH = window.innerHeight - 32;
      if (d.mode === "drag") {
        const x = clamp(e.clientX - d.offX, 8, window.innerWidth - sizeRef.current.w - 8);
        const y = clamp(e.clientY - d.offY, 8, window.innerHeight - 56);
        setPos({ x, y });
      } else {
        // resize from the bottom-left corner: top & right edges stay fixed
        const w = clamp(d.startW - (e.clientX - d.mx), MIN.w, maxW);
        const h = clamp(d.startH + (e.clientY - d.my), MIN.h, maxH);
        setSize({ w, h });
        setPos({ x: d.startX + d.startW - w, y: d.startY });
      }
    };
    const onUp = () => (drag.current = null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const startDrag = (e: React.PointerEvent) => {
    if (isMobile || !pos) return;
    drag.current = { mode: "drag", offX: e.clientX - pos.x, offY: e.clientY - pos.y };
  };
  const startResize = (e: React.PointerEvent) => {
    if (isMobile || !pos) return;
    e.stopPropagation();
    e.preventDefault();
    drag.current = { mode: "resize", startW: size.w, startH: size.h, startX: pos.x, startY: pos.y, mx: e.clientX, my: e.clientY };
  };

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || `Email me at ${profile.email}` }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: `Something went wrong — reach Arham at ${profile.email}.` }]);
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
            onMouseEnter={startTeasers}
            onMouseLeave={stopTeasers}
          >
            <AnimatePresence mode="wait">
              {teaser && (
                <motion.div
                  key={teaser}
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="surface hidden max-w-[230px] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm shadow-xl backdrop-blur-xl sm:block"
                  style={{ backgroundColor: "color-mix(in srgb, var(--card) 88%, var(--bg))" }}
                >
                  {teaser}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={doOpen}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open AI assistant"
              className="group surface relative flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 shadow-xl backdrop-blur-xl"
              style={{ backgroundColor: "color-mix(in srgb, var(--card) 80%, var(--bg))" }}
            >
              {/* living AI orb */}
              <span className="relative grid h-9 w-9 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent)] opacity-30" />
                <span
                  className="absolute inset-[3px] animate-ping rounded-full bg-[var(--color-accent-3)] opacity-20"
                  style={{ animationDelay: "0.5s" }}
                />
                <motion.span
                  aria-hidden
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--color-accent), transparent 45%, var(--color-accent-3))",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
                  }}
                />
                <span className="relative grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-3)] text-black">
                  <SquareTerminal size={12} />
                </span>
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold">Ask my AI</span>
                <span className="flex items-center gap-1 text-[10px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> online · ask anything
                </span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && pos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            style={{ position: "fixed", left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex: 60 }}
            className="surface flex flex-col overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl"
          >
            {/* resize handle (bottom-left) */}
            {!isMobile && (
              <div
                onPointerDown={startResize}
                aria-label="Resize"
                title="Drag to resize"
                className="absolute bottom-0 left-0 z-30 flex h-6 w-6 cursor-nesw-resize items-end justify-start p-1.5"
              >
                <span className="block h-2.5 w-2.5 border-b-2 border-l-2" style={{ borderColor: "var(--muted)" }} />
              </div>
            )}

            {/* window titlebar */}
            <div
              onPointerDown={startDrag}
              className={`flex select-none items-center gap-2 border-b border-[var(--border)] bg-[var(--bg)] px-4 py-2 ${
                isMobile ? "" : "cursor-grab active:cursor-grabbing"
              }`}
            >
              <span className="term-dots">
                <i style={{ background: "#ff5f56" }} />
                <i style={{ background: "#ffbd2e" }} />
                <i style={{ background: "#27c93f" }} />
              </span>
              <span className="ml-1 font-[family-name:var(--font-mono)] text-[11px] text-muted">assistant.sh</span>
              {!isMobile && (
                <span className="ml-auto font-[family-name:var(--font-mono)] text-[10px] text-muted">drag · resize</span>
              )}
            </div>

            {/* header (drag handle) */}
            <div
              onPointerDown={startDrag}
              className={`flex select-none items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 ${
                isMobile ? "" : "cursor-grab active:cursor-grabbing"
              }`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-3)] text-black">
                <SquareTerminal size={16} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-tight">Portfolio Assistant</p>
                <p className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> online
                </p>
              </div>
              {!isMobile && <GripVertical size={15} className="ml-auto text-muted" />}
              <button
                onClick={doClose}
                aria-label="Close chat"
                className={`grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-[var(--card)] hover:text-[var(--fg)] ${
                  isMobile ? "ml-auto" : ""
                }`}
              >
                <X size={16} />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <Bubble key={i} msg={m} />
              ))}
              {loading && (
                <div className="flex items-center gap-2.5">
                  <Avatar role="assistant" />
                  <div className="surface flex gap-1 rounded-2xl rounded-tl-sm px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-2 w-2 rounded-full bg-[var(--color-accent)]"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* suggestions */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-[var(--border)] bg-[var(--bg-soft)] px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-[var(--color-accent)] hover:text-[var(--fg)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-[var(--border)] p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my experience…"
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-black transition-opacity disabled:opacity-40"
              >
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <Avatar role={msg.role} />
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-tr-sm bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-black"
            : "surface rounded-tl-sm"
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

function Avatar({ role }: { role: "user" | "assistant" }) {
  return (
    <span
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
        role === "assistant"
          ? "bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-3)] text-black"
          : "bg-[var(--bg-soft)] text-muted"
      }`}
    >
      {role === "assistant" ? <Bot size={16} /> : <User size={16} />}
    </span>
  );
}
