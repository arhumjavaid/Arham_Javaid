// macOS-style terminal window title bar with traffic-light dots.
export function WindowBar({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-soft)] px-4 py-2.5">
      <span className="term-dots">
        <i style={{ background: "#ff5f56" }} />
        <i style={{ background: "#ffbd2e" }} />
        <i style={{ background: "#27c93f" }} />
      </span>
      <span className="ml-1 truncate font-[family-name:var(--font-mono)] text-xs text-muted">{title}</span>
    </div>
  );
}
