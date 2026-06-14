import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  title,
  subtitle,
  command,
}: {
  index: string;
  title: string;
  subtitle?: string;
  command?: string;
}) {
  const cmd = command || `cat ${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.md`;
  return (
    <div className="mb-12">
      <Reveal>
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-soft)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs sm:text-sm">
          <span className="prompt" />
          <span className="text-[var(--fg)]">{cmd}</span>
          <span className="caret-block ml-0.5" />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-[var(--accent-ink)]">{index}</span>{" "}
          <span className="text-muted">/</span> {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
