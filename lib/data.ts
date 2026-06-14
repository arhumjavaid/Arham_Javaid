// Central content source — derived from Arham Javaid's CV.

export const profile = {
  name: "Arham Javaid",
  firstName: "Arham",
  roles: [
    "Full Stack Developer",
    "AI / LLM Integration Engineer",
    "React & Node.js Specialist",
    "MCP & Agentic AI Builder",
  ],
  tagline:
    "I build scalable web, mobile, and enterprise SaaS platforms — and wire them up with AI agents that actually ship.",
  location: "Karachi, Pakistan",
  email: "arhum.javaid@gmail.com",
  phone: "+92 333-2482067",
  links: {
    github: "https://github.com/arhumjavaid",
    linkedin: "https://linkedin.com/in/arham-javaid-8b1807285",
    email: "mailto:arhum.javaid@gmail.com",
  },
  resume: "/Arham_Javaid_CV.pdf",
  photo: "/Mine.png", // drop a square/portrait photo at public/arham.jpg
  summary:
    "Full Stack Developer with 1+ years of experience building scalable web, mobile, and enterprise SaaS platforms using React, Node.js, TypeScript, and PostgreSQL. Skilled in Clean Architecture API design and AI/LLM integration via the OpenAI Agents SDK, LangChain, and the Model Context Protocol (MCP).",
};

// `target` is the number to count up to; prefix/suffix wrap it.
export const stats = [
  { target: 10, prefix: "", suffix: "k+", label: "Monthly active users served" },
  { target: 3, prefix: "", suffix: "+", label: "Production apps shipped" },
  { target: 627, prefix: "", suffix: "+", label: "DB migrations maintained" },
  { target: 80, prefix: "", suffix: "%", label: "Faster AI first-response time" },
];

export const skillGroups = [
  {
    title: "Frontend",
    icon: "Layout",
    items: ["React.js", "Next.js", "React Native", "Expo", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Redux"],
  },
  {
    title: "Backend",
    icon: "Server",
    items: ["Node.js", "Express.js", "Python", "REST APIs", "JWT", "OAuth2", "RBAC", "MFA/TOTP", "AES-256", "Rate Limiting"],
  },
  {
    title: "Databases",
    icon: "Database",
    items: ["PostgreSQL", "MongoDB", "Supabase", "Redis", "Sequelize ORM", "Knex.js"],
  },
  {
    title: "AI & MCP",
    icon: "Sparkles",
    items: ["OpenAI Agents SDK", "LangChain", "AWS Bedrock", "Model Context Protocol (MCP)", "Prompt Engineering"],
  },
  {
    title: "Cloud & DevOps",
    icon: "Cloud",
    items: ["AWS (Lambda, SQS, S3, RDS, EventBridge)", "Docker", "CI/CD", "Serverless Framework", "Vercel", "Git"],
  },
  {
    title: "Testing & Tools",
    icon: "FlaskConical",
    items: ["Jest", "Integration Testing", "Postman"],
  },
];

export type Project = {
  title: string;
  period: string;
  stack: string[];
  problem: string;
  approach: string;
  highlights: string[];
  featured: boolean;
  proprietary?: boolean;
  company?: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "Enterprise SaaS Platform for IT Infrastructure Monitoring",
    period: "2025 – Present",
    stack: ["TypeScript", "Node.js", "Python", "AWS", "PostgreSQL", "LangChain", "MCP"],
    problem:
      "A multi-tenant monitoring platform needed to onboard new clients fast and stay reliable across hundreds of evolving modules.",
    approach:
      "Architected a Clean Architecture REST API (Controller / Usecase / Repository) with 51+ modules, an event-driven AWS backbone, and LLM-powered automation tooling.",
    highlights: [
      "51+ modules under Clean Architecture, cutting new-tenant onboarding time by 40%",
      "627+ PostgreSQL migrations with pooling, query streaming & index optimization",
      "Schema snapshots cut test setup from 60s → under 2s (97% reduction)",
      "Python + LangChain + MCP tooling over AWS Lambda/SQS/S3/Bedrock — 1,000+ daily automation events",
    ],
    featured: true,
    proprietary: true,
    company: "Sparktrum",
  },
  {
    title: "Omnichannel AI Support Platform",
    period: "2025 – Present",
    stack: ["Python", "Expo", "Supabase", "PostgreSQL", "OpenAI SDK"],
    problem:
      "Support teams were drowning in first-response triage across Facebook, Instagram, and WhatsApp.",
    approach:
      "Built AI chatbots on the OpenAI Agents SDK behind webhook pipelines, plus a unified real-time dashboard for routing, tracking, and analytics.",
    highlights: [
      "Handled 100% of first-response interactions across 3 social platforms",
      "Reduced manual triage workload by 90%",
      "Unified real-time dashboard with intelligent routing, analytics & knowledge base",
      "Used simultaneously by 3+ support teams",
    ],
    featured: true,
    proprietary: true,
    company: "Sparktrum",
  },
  {
    title: "Centralized IAM Platform",
    period: "2025",
    stack: ["Python", "React", "Docker", "PostgreSQL", "OAuth2", "RBAC"],
    problem:
      "Each application maintained its own duplicated auth logic, creating drift and risk.",
    approach:
      "Implemented centralized authentication & authorization across apps with OAuth2, JWT, and RBAC, containerized with Docker.",
    highlights: [
      "Single source of auth across 4+ applications",
      "OAuth2 + JWT + RBAC with Docker for consistent deployment",
      "Eliminated per-app auth duplication",
    ],
    featured: false,
    proprietary: true,
    company: "Sparktrum",
  },
  {
    title: "AI Customer Support Bot — WhatsApp Demo",
    period: "2025",
    stack: ["Node.js", "TypeScript", "Express", "OpenAI SDK", "React", "Vercel"],
    problem:
      "Small businesses want instant, on-brand customer support without building and hosting a bot from scratch.",
    approach:
      "A stateless, WhatsApp-style chat where a business pastes its name and FAQs and an OpenAI agent answers as their support rep — built with Clean Architecture and TypeScript strict mode, deployable to Vercel.",
    highlights: [
      "System-prompt builder turns a business's name + FAQs into the agent's knowledge base",
      "WhatsApp-style chat UI (green bubbles) with a live typing indicator",
      "'Change business' reset to demo any company instantly",
      "Stateless & Vercel-ready (gpt-4o-mini) with clean api / agents / types separation",
    ],
    featured: true,
    proprietary: false,
    demo: "https://ai-support-chatbot-zeta.vercel.app/",
    github: "https://github.com/arhumjavaid/AI_Support_Chatbot",
  },
];

export const experience = [
  {
    role: "Full Stack Developer",
    company: "Sparktrum",
    location: "Karachi, Pakistan (Hybrid)",
    period: "Jan 2025 – Present",
    points: [
      "Engineered 3+ production web & mobile apps with React, React Native, Expo, and Next.js — serving 10,000+ MAU across iOS, Android, and Web.",
      "Architected real-time backend services & REST APIs with Node.js, Express, Supabase, and PostgreSQL — JWT/OAuth2 auth and RBAC across 5+ concurrent client tenants.",
      "Developed an AI-powered customer support system with Python and the OpenAI Agents SDK, streamlining 100% of first-response interactions and cutting average first-response time by 80%.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "CodeAlpha",
    location: "Remote",
    period: "Dec 2023 – Feb 2024",
    points: [
      "Translated Figma mockups into pixel-perfect, responsive React components with Tailwind CSS — 5+ features across 5 sprints.",
      "Integrated REST APIs and optimized rendering — cut unnecessary re-renders by 30% and improved average page load by 25%.",
    ],
  },
];

export const education = {
  school: "University of Karachi (UBIT)",
  degree: "Bachelor of Science in Computer Science",
  location: "Karachi, Pakistan",
  period: "Dec 2022 – Dec 2026",
};

export const certifications = [
  "Panaversity: Prompt and Context Engineering — Effective AI Communication (AI-101)",
  "Panaversity: AI-Driven Development with Python and Agentic AI (AI-201)",
];

// Tagged knowledge base powering the keyless "Ask my Portfolio" chatbot.
// `keywords` capture query vocabulary that may not appear verbatim in `text`.
export type KnowledgeEntry = { text: string; keywords: string[] };

export const knowledgeEntries: KnowledgeEntry[] = [
  {
    text: `Arham Javaid is a Full Stack Developer based in Karachi, Pakistan with 1+ years of professional experience. He builds scalable web, mobile, and enterprise SaaS platforms using React, Node.js, TypeScript, and PostgreSQL, and specializes in AI/LLM integration with the OpenAI Agents SDK, LangChain, and the Model Context Protocol (MCP).`,
    keywords: ["who", "intro", "introduction", "summary", "about", "bio", "yourself", "fullstack", "full", "developer", "engineer", "overview", "background", "years"],
  },
  {
    text: `Arham currently works as a Full Stack Developer at Sparktrum (Jan 2025 – Present, Hybrid in Karachi). There he shipped 3+ production web and mobile apps serving 10,000+ monthly active users across iOS, Android, and Web, architected real-time backends and REST APIs (Node.js, Express, Supabase, PostgreSQL) with JWT/OAuth2 and RBAC across 5+ tenants, and built an AI customer support system that cut average first-response time by 80%.`,
    keywords: ["work", "job", "experience", "sparktrum", "current", "company", "employer", "role", "position", "fulltime", "now", "career", "professional", "users", "mau"],
  },
  {
    text: `Before Sparktrum, Arham was a Frontend Developer Intern at CodeAlpha (Dec 2023 – Feb 2024, Remote), turning Figma mockups into pixel-perfect responsive React components and cutting re-renders by 30% and page load time by 25%.`,
    keywords: ["internship", "intern", "codealpha", "frontend", "previous", "first", "figma", "remote", "earlier", "history", "experience"],
  },
  {
    text: `Arham's flagship project is an Enterprise SaaS Platform for IT Infrastructure Monitoring (TypeScript, Node.js, Python, AWS). It uses Clean Architecture with 51+ modules, a PostgreSQL schema across 627+ migrations, schema snapshots that cut test setup from 60s to under 2s (97% reduction), and Python + LangChain + MCP tooling on AWS Lambda/SQS/S3/Bedrock handling 1,000+ daily automation events.`,
    keywords: ["project", "projects", "biggest", "best", "flagship", "main", "enterprise", "saas", "monitoring", "infrastructure", "clean", "architecture", "aws", "migrations", "scale", "complex", "proud", "work"],
  },
  {
    text: `At Sparktrum, Arham built the Omnichannel AI Support Platform (Python, Expo, Supabase, PostgreSQL, OpenAI SDK) that handles 100% of first-response interactions across Facebook, Instagram, and WhatsApp via webhook pipelines, reducing manual triage by 90%, with a unified real-time dashboard for routing, analytics, and a knowledge base used by 3+ support teams.`,
    keywords: ["project", "ai", "support", "automation", "openai", "agents", "whatsapp", "instagram", "facebook", "llm", "agent", "omnichannel", "platform", "dashboard"],
  },
  {
    text: `Arham also built an open-source AI Customer Support Bot demo (Node.js, TypeScript, Express, OpenAI SDK) — a WhatsApp-style chat where a business pastes its FAQs and an AI agent answers customer questions. It uses Clean Architecture and TypeScript strict mode and is live at ai-support-chatbot-zeta.vercel.app (source on github.com/arhumjavaid/AI_Support_Chatbot).`,
    keywords: ["project", "projects", "chatbot", "bot", "demo", "whatsapp", "open", "source", "github", "live", "support", "openai", "node", "typescript", "express"],
  },
  {
    text: `Arham also built a Centralized IAM Platform (Python, React, Docker, OAuth2, RBAC) unifying authentication and authorization across 4+ applications, containerized with Docker, eliminating per-app auth duplication.`,
    keywords: ["project", "projects", "iam", "auth", "authentication", "security", "oauth", "rbac", "docker", "other", "more"],
  },
  {
    text: `Arham's tech stack and skills: Frontend — React, Next.js, React Native, Expo, TypeScript, Tailwind, Redux. Backend — Node.js, Express, Python, REST APIs, JWT, OAuth2, RBAC, MFA/TOTP, AES-256. Databases — PostgreSQL, MongoDB, Supabase, Redis, Sequelize, Knex. AI & MCP — OpenAI Agents SDK, LangChain, AWS Bedrock, Model Context Protocol, Prompt Engineering. Cloud & DevOps — AWS (Lambda, SQS, S3, RDS, EventBridge), Docker, CI/CD, Serverless, Vercel, Git. Testing — Jest, Integration Testing, Postman.`,
    keywords: ["skill", "skills", "tech", "stack", "technology", "technologies", "tools", "languages", "frameworks", "know", "use", "frontend", "backend", "database", "databases", "cloud", "devops", "proficient", "expertise"],
  },
  {
    text: `Arham is pursuing a B.S. in Computer Science at the University of Karachi (UBIT), Dec 2022 – Dec 2026. He holds Panaversity certifications in Prompt & Context Engineering (AI-101) and AI-Driven Development with Python and Agentic AI (AI-201).`,
    keywords: ["education", "study", "studied", "school", "university", "degree", "college", "ubit", "karachi", "computer", "science", "certification", "certifications", "certificate", "courses", "qualification", "academic", "graduate"],
  },
  {
    text: `You can reach Arham by email at arhum.javaid@gmail.com, on GitHub at github.com/arhumjavaid, or on LinkedIn at linkedin.com/in/arham-javaid-8b1807285. He is open to full-stack and AI engineering roles, freelance, and collaborations.`,
    keywords: ["contact", "reach", "email", "hire", "hiring", "github", "linkedin", "connect", "message", "touch", "available", "freelance", "opportunity", "phone", "social"],
  },
];

// Plain-text view used for the OpenAI system context.
export const knowledgeBase = knowledgeEntries.map((e) => e.text);

// Rotating teasers shown when hovering the floating chat launcher.
export const chatTeasers = [
  "Ask me anything about Arham 👋",
  "Curious about his biggest project?",
  "What's his experience with AI & MCP?",
  "Want to know his tech stack?",
  "How did he cut response time by 80%?",
  "Looking to hire? Ask me how to reach him.",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Ask AI", href: "#ask-ai" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
