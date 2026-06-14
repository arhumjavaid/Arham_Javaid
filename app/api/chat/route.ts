import { NextRequest, NextResponse } from "next/server";
import { knowledgeEntries, profile } from "@/lib/data";

export const runtime = "nodejs";

/* ------------------------------------------------------------------ *
 * Rate limiting — protects the free Gemini quota (~15 req/min,
 * ~1,500 req/day) and blocks abuse. When a limit is hit we DON'T error:
 * we skip Gemini and serve the keyless local answer, so chat never breaks.
 *
 * NOTE: this is best-effort in-memory state. On serverless (Vercel) it
 * resets on cold starts and isn't shared across instances — for hard
 * guarantees use a shared store (Upstash Redis / Vercel KV). The graceful
 * fallback above is the real backstop.
 * ------------------------------------------------------------------ */
const MINUTE = 60_000;
const DAY = 86_400_000;
const LIMITS = {
  globalPerMinute: 12, // < Gemini free 15 RPM
  globalPerDay: 1000, // < Gemini free 1500 RPD
  ipPerMinute: 10,
  ipPerDay: 50,
};
const MAX_MESSAGE_LEN = 500;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function underLimit(key: string, windowMs: number, max: number): boolean {
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || now >= b.resetAt) {
    b = { count: 0, resetAt: now + windowMs };
    buckets.set(key, b);
  }
  b.count += 1;
  return b.count <= max;
}

// May this request call Gemini? Global caps checked first so that a globally
// throttled request doesn't consume a visitor's personal budget.
function mayUseGemini(ip: string): boolean {
  return (
    underLimit("g:min", MINUTE, LIMITS.globalPerMinute) &&
    underLimit("g:day", DAY, LIMITS.globalPerDay) &&
    underLimit(`ip:min:${ip}`, MINUTE, LIMITS.ipPerMinute) &&
    underLimit(`ip:day:${ip}`, DAY, LIMITS.ipPerDay)
  );
}

const STOP = new Set([
  "the", "a", "an", "is", "are", "of", "to", "and", "in", "on", "for", "what", "who", "how",
  "does", "do", "did", "with", "his", "he", "you", "your", "me", "my", "tell", "about", "can",
  "has", "have", "was", "were", "i", "it", "that", "this", "give", "show", "any", "some", "more",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOP.has(t));
}

// Keyword + full-text retrieval. Keyword (tag) hits are weighted higher so
// query vocabulary that isn't verbatim in the text still routes correctly.
function retrieve(query: string, k = 3): string[] {
  const terms = tokenize(query);

  const scored = knowledgeEntries.map((entry) => {
    const lowerText = entry.text.toLowerCase();
    const kw = new Set(entry.keywords);
    let score = 0;
    for (const t of terms) {
      if (kw.has(t)) score += 3;
      if (lowerText.includes(t)) score += 1;
    }
    return { text: entry.text, score };
  });

  const hits = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, k);
  // Fall back to the intro entry so answers always stay grounded.
  if (hits.length === 0) return [knowledgeEntries[0].text];
  return hits.map((h) => h.text);
}

// Keyless deterministic answer built purely from retrieved CV facts.
function localAnswer(query: string): string {
  const docs = retrieve(query, 2);
  return docs.join(" ");
}

async function geminiAnswer(query: string, context: string): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const system = `You are ${profile.firstName}'s portfolio assistant. Answer questions about ${profile.name} in a warm, concise tone, referring to him as "Arham". Only use the provided context. If something isn't in the context, say you don't have that detail and point them to ${profile.email}. Keep answers under 90 words. Do not use markdown headers.\n\nContext:\n${context}`;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: query }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 320 },
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("") ?? "";
    return text.trim() || null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message required" }, { status: 400 });
    }

    // cap length to bound token cost per call
    const query = message.trim().slice(0, MAX_MESSAGE_LEN);
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";

    const context = retrieve(query, 4).join("\n");

    // Only spend Gemini quota if within limits; otherwise fall back locally.
    const allowGemini = mayUseGemini(ip);
    const ai = allowGemini ? await geminiAnswer(query, context) : null;

    return NextResponse.json({
      reply: ai || localAnswer(query),
      mode: ai ? "gemini" : allowGemini ? "local" : "local-rate-limited",
    });
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
