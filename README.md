# Arham Javaid — Portfolio

A standout, dark-first developer portfolio built with **Next.js 15, React 19, TypeScript, Tailwind v4, and Framer Motion**.

## Highlights
- 🌑 Dark-first theme with a light toggle (no flash), cyan→violet accent
- ✨ Scroll-triggered reveals, staggered bento grids, spring micro-interactions, typing hero
- 🤖 **"Ask my AI anything"** — a retrieval-grounded chatbot over the résumé. Works with **no API key** (keyless RAG fallback) and auto-upgrades to OpenAI if `OPENAI_API_KEY` is set
- 📱 Mobile-first, SEO + Open Graph metadata, `prefers-reduced-motion` aware
- 📄 One-click résumé download

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
```

## Optional: live AI answers
```bash
cp .env.example .env.local
# add OPENAI_API_KEY=sk-...
```

## Build & deploy
```bash
npm run build && npm start
```
Deploy to Vercel: push to GitHub and import the repo.

## Edit content
All content lives in `lib/data.ts` (profile, skills, projects, experience, and the chatbot knowledge base).
# Arham_Javaid
