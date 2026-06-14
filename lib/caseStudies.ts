// Long-form engineering case studies. These are the "verifiable depth" artifacts
// behind the proprietary project cards — the thinking, not just the claim.

export type Decision = { problem: string; decision: string; result: string };

// Structured architecture diagram — rendered as styled, themed nodes (not raw ASCII).
// Each layer is a horizontal row of nodes; layers flow top → bottom.
export type DiagramNode = { label: string; sub?: string; accent?: boolean };
export type DiagramLayer = { nodes: DiagramNode[]; note?: string };
export type Diagram = { caption: string; layers: DiagramLayer[] };

export type CaseStudy = {
  slug: string;
  title: string;
  company: string;
  role: string;
  period: string;
  // One sharp outcome line for the page header.
  headline: string;
  summary: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  context: string[];
  constraints: string[];
  diagram: Diagram;
  decisions: Decision[];
  deepDive: {
    title: string;
    body: string[];
    before: { label: string; value: string };
    after: { label: string; value: string };
    code: { caption: string; lines: string[] };
  };
  outcomes: string[];
  takeaways: string[];
  // Shown as a small honesty note since the production source is under NDA.
  note?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "enterprise-saas-monitoring",
    title: "Cutting test setup from 60s to 2s on a 51-module SaaS backend",
    company: "Sparktrum",
    role: "Full Stack Developer",
    period: "2025 – Present",
    headline:
      "A multi-tenant monitoring platform was slow to onboard clients and slow to test. I restructured it around Clean Architecture and schema snapshots — onboarding dropped 40% and the test suite's setup cost fell 97%.",
    summary:
      "How a multi-tenant IT-infrastructure monitoring platform was re-architected for fast client onboarding and a test suite that engineers actually want to run — Clean Architecture across 51+ modules, 627+ PostgreSQL migrations, and a schema-snapshot strategy that cut per-suite setup from ~60s to under 2s.",
    stack: ["TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "LangChain", "MCP"],
    metrics: [
      { value: "60s → 2s", label: "Test DB setup (97% faster)" },
      { value: "40%", label: "Faster client onboarding" },
      { value: "627+", label: "PostgreSQL migrations" },
      { value: "1,000+", label: "Daily automation events" },
    ],
    context: [
      "The platform monitors IT infrastructure for multiple client tenants from a single codebase. Each tenant adds modules, rules, and integrations, so the schema and the surface area grow continuously — by this point, 51+ domain modules and 627+ migrations.",
      "Two things were getting worse as it grew. Onboarding a new tenant meant hand-touching too many places, and the test suite had become the bottleneck nobody wanted to admit to: every suite re-ran the full migration chain against a fresh database before a single assertion, which dominated CI time and quietly discouraged people from writing tests at all.",
    ],
    constraints: [
      "Multi-tenant — one schema change can affect every client, so migrations have to be safe and ordered.",
      "Tests must hit a real PostgreSQL instance, not a mock — the value is in catching query/constraint bugs.",
      "627+ migrations and growing; replaying all of them per suite is O(history), and history only gets longer.",
      "Proprietary, regulated data — the architecture had to keep tenant boundaries explicit and auditable.",
    ],
    diagram: {
      caption: "Writes stay fast on the request path; slow work fans out to event-driven workers.",
      layers: [
        { nodes: [{ label: "Client", sub: "web · mobile" }] },
        {
          nodes: [{ label: "REST API", sub: "Controller → Usecase → Repository", accent: true }],
          note: "Clean Architecture · 51+ isolated modules",
        },
        {
          nodes: [
            { label: "EventBridge", sub: "domain events" },
            { label: "SQS", sub: "buffered queue" },
          ],
          note: "event-driven backbone",
        },
        { nodes: [{ label: "Lambda", sub: "Python workers", accent: true }] },
        {
          nodes: [
            { label: "S3", sub: "artifacts" },
            { label: "Bedrock", sub: "LangChain + MCP" },
            { label: "PostgreSQL", sub: "RDS" },
          ],
        },
      ],
    },
    decisions: [
      {
        problem:
          "51+ modules were drifting — business logic leaked into controllers and DB calls leaked into logic, so changes rippled unpredictably.",
        decision:
          "Enforced a strict Controller → Usecase → Repository split per module, with the database only ever touched behind a repository interface.",
        result:
          "Each module became independently testable and reasoned-about; new-tenant onboarding stopped being a cross-cutting edit and dropped ~40%.",
      },
      {
        problem:
          "Writes that triggered slow downstream work (provisioning, notifications, AI automation) were blocking the request path.",
        decision:
          "Moved that work off the request via an event-driven AWS backbone — EventBridge → SQS → Lambda — so the API stays fast and workers scale independently.",
        result:
          "The platform absorbs 1,000+ automation events/day without touching API latency, and a slow worker can't take the API down with it.",
      },
      {
        problem:
          "Every test suite rebuilt the database by replaying all 627+ migrations — ~60s of pure setup before any assertion ran.",
        decision:
          "Replaced migration-replay with a schema snapshot: build the schema once, dump it, and restore that snapshot per suite instead of re-deriving it.",
        result:
          "Setup fell from ~60s to under 2s (97%), which is the single change that made the suite cheap enough to actually grow.",
      },
    ],
    deepDive: {
      title: "The 97% win: snapshot the schema, don't replay history",
      body: [
        "The insight is that migrations are a *log*, but tests only need the *current state*. Replaying 627 ordered migrations to arrive at today's schema is correct but wasteful — you pay for the entire history on every run, and that bill grows with every migration you ever add.",
        "So the schema is built once (apply the full migration chain against a throwaway database) and captured as a single structural snapshot. Each test suite then restores that snapshot — a flat, history-independent operation — instead of re-deriving it. Suites still run against real PostgreSQL, so query and constraint bugs are still caught; only the setup path changed.",
        "Two properties make this safe rather than a shortcut: the snapshot is regenerated from the real migration chain (so it can never silently drift from production), and restore time is roughly constant no matter how many migrations exist. The 60s → 2s number is today's; the more important result is that it stays flat as the migration count keeps climbing.",
      ],
      before: { label: "Before · replay 627+ migrations per suite", value: "~60s setup" },
      after: { label: "After · restore one schema snapshot", value: "<2s setup" },
      code: {
        caption: "The shape of it — build once, restore per suite (illustrative).",
        lines: [
          "# once: derive schema from the real migration chain, snapshot it",
          "createdb test_template",
          "migrate up --all            # apply all 627+ migrations",
          "pg_dump --schema-only test_template > schema.snapshot.sql",
          "",
          "# per suite: restore the snapshot instead of replaying history",
          "createdb test_run_$SUITE",
          "psql test_run_$SUITE < schema.snapshot.sql   # < 2s, O(1) in history",
        ],
      },
    },
    outcomes: [
      "Test setup cut from ~60s to under 2s — a 97% reduction — and held flat as migrations grew.",
      "New-tenant onboarding time down ~40% after the Clean Architecture split.",
      "627+ PostgreSQL migrations maintained with connection pooling, query streaming, and index optimization.",
      "1,000+ automation events/day handled off the request path via EventBridge/SQS/Lambda with Python + LangChain + MCP over Bedrock.",
    ],
    takeaways: [
      "When a setup cost scales with history, stop re-deriving state and start snapshotting it — the win compounds over time.",
      "Architecture boundaries pay off twice: once in maintainability, once in how cheap things are to test in isolation.",
      "The fastest test suite is the one people actually run; making setup near-free changed the team's testing behavior more than any policy could.",
    ],
    note: "Production source is under NDA. Code shown is illustrative of the approach, not the proprietary implementation; metrics are from the live system.",
  },
  {
    slug: "omnichannel-ai-support",
    title: "Cutting manual support triage 90% with an AI agent across three channels",
    company: "Sparktrum",
    role: "Full Stack Developer",
    period: "2025 – Present",
    headline:
      "Support teams were drowning in first-response triage across Facebook, Instagram, and WhatsApp. I put an OpenAI-Agents-SDK responder behind a unified webhook pipeline — it now handles 100% of first responses and cut manual triage by 90%.",
    summary:
      "How an omnichannel AI support platform unified Facebook, Instagram, and WhatsApp into one webhook pipeline and a real-time dashboard — an OpenAI Agents SDK responder handling 100% of first-response interactions, cutting manual triage 90% for 3+ support teams.",
    stack: ["Python", "OpenAI Agents SDK", "Expo", "Supabase", "PostgreSQL"],
    metrics: [
      { value: "90%", label: "Less manual triage" },
      { value: "100%", label: "First responses handled" },
      { value: "3", label: "Channels, one pipeline" },
      { value: "3+", label: "Support teams live" },
    ],
    context: [
      "Customer messages arrived across three platforms — Facebook, Instagram, and WhatsApp — each with its own webhook format, auth model, and quirks. Agents toggled between inboxes all day, and the slow part was almost never the answer; it was the triage: reading, categorizing, and routing every inbound message before anyone could act.",
      "The goal was to make the first response instant and consistent regardless of channel, and to give the team one place to see everything — without building three separate integrations that would drift apart over time.",
    ],
    constraints: [
      "Three channels with different webhook shapes and verification flows, normalized into one internal message model.",
      "Replies must sound on-brand and stay grounded in the business's knowledge base — not a generic chatbot.",
      "Real-time: agents need to see new conversations and hand-offs the moment they happen.",
      "A human must always be able to take over — the agent handles first response, not the whole relationship.",
    ],
    diagram: {
      caption: "Three channels normalize into one pipeline; the agent answers, humans take over from a live dashboard.",
      layers: [
        {
          nodes: [
            { label: "Facebook", sub: "Messenger" },
            { label: "Instagram", sub: "DMs" },
            { label: "WhatsApp", sub: "Cloud API" },
          ],
        },
        {
          nodes: [{ label: "Webhook pipeline", sub: "normalize → one message model", accent: true }],
          note: "single ingestion path",
        },
        {
          nodes: [{ label: "OpenAI Agents SDK", sub: "triage + grounded reply", accent: true }],
          note: "knowledge-base grounded",
        },
        {
          nodes: [
            { label: "Supabase / PostgreSQL", sub: "conversation state" },
            { label: "Realtime dashboard", sub: "routing · analytics · KB" },
          ],
        },
      ],
    },
    decisions: [
      {
        problem:
          "Each channel spoke a different webhook dialect, and wiring the agent to all three separately would mean triple the surface area and constant drift.",
        decision:
          "Built one ingestion pipeline that verifies each channel's webhook and normalizes every inbound into a single internal message model before anything downstream sees it.",
        result:
          "The agent and dashboard are channel-agnostic — adding or changing a channel is an adapter, not a rewrite, and behavior stays identical across all three.",
      },
      {
        problem:
          "A generic LLM reply is worse than no reply — it has to answer as the business, from the business's actual knowledge.",
        decision:
          "Used the OpenAI Agents SDK with a knowledge-base-grounded system context so the responder triages intent and answers on-brand, escalating anything outside its scope.",
        result:
          "100% of first-response interactions are handled automatically while staying grounded, and edge cases route cleanly to a human.",
      },
      {
        problem:
          "Agents had no single view — they switched between three native inboxes and lost track of what was already handled.",
        decision:
          "Built a real-time dashboard on Supabase realtime for routing, live conversation tracking, analytics, and the shared knowledge base.",
        result:
          "Manual triage workload dropped 90%, and 3+ teams now work the same queue with full visibility and instant hand-off.",
      },
    ],
    deepDive: {
      title: "One message model is what makes 'omnichannel' real",
      body: [
        "The temptation with three channels is to build three integrations — three webhook handlers, three reply paths, three sets of edge cases. That works for a week and rots for a year: a fix for WhatsApp doesn't reach Instagram, and the agent's behavior quietly diverges per channel.",
        "Instead, every channel is just an adapter at the edge. Each verifies its own webhook and translates the platform's payload into one normalized internal message — same shape, same fields — before the agent or dashboard ever touch it. The intelligence lives entirely downstream of that boundary, so it only has to be built, tested, and reasoned about once.",
        "That single seam is what makes the rest cheap: the agent grounds replies the same way everywhere, the dashboard renders one unified queue, and onboarding a fourth channel later is a new adapter — not a new system. 'Omnichannel' stops being three things in a trench coat and becomes one pipeline with three doors.",
      ],
      before: { label: "Before · per-channel handling", value: "3 integrations" },
      after: { label: "After · normalize at the edge", value: "1 pipeline" },
      code: {
        caption: "The seam — adapters normalize, everything downstream is channel-agnostic (illustrative).",
        lines: [
          "# every channel maps onto ONE internal shape",
          "type Message = {",
          "  channel: 'facebook' | 'instagram' | 'whatsapp'",
          "  conversation_id: str   # stable across the thread",
          "  sender: str",
          "  text: str",
          "}",
          "",
          "# edge: verify + normalize, then hand off once",
          "msg = adapters[channel].normalize(raw_webhook)   # only place channels differ",
          "reply = await agent.respond(msg)                  # grounded, channel-agnostic",
          "adapters[channel].send(msg.conversation_id, reply)",
        ],
      },
    },
    outcomes: [
      "Handled 100% of first-response interactions across Facebook, Instagram, and WhatsApp.",
      "Reduced manual triage workload by 90%.",
      "Unified real-time dashboard with intelligent routing, analytics, and a shared knowledge base.",
      "Used simultaneously by 3+ support teams on one queue.",
    ],
    takeaways: [
      "Normalize at the edge: collapse N external formats into one internal model and build the hard part once.",
      "An AI responder is only as good as its grounding — scope it to the business's knowledge and let it escalate.",
      "Real-time visibility changes behavior: a shared live queue did more for the team than any individual automation.",
    ],
    note: "Production source is under NDA. Code shown is illustrative of the approach, not the proprietary implementation; metrics are from the live system.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
