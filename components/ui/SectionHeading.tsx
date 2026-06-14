import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
  command?: string; // kept for back-compat; no longer rendered
}) {
  return (
    <div className="mb-12">
      <Reveal>
        <div className="mb-3 flex items-center gap-3">
          <span className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--accent-ink)]">
            {index}
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
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
