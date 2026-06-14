// Brand / agent mark — a terminal prompt glyph ">_" in a rounded chip.
export function TermMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-3)] text-black ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className="font-[family-name:var(--font-mono)] font-extrabold leading-none"
        style={{ fontSize: size * 0.46, letterSpacing: "-0.02em" }}
      >
        {">"}
      </span>
      <span
        className="absolute bg-black/80"
        style={{
          width: size * 0.26,
          height: Math.max(2, size * 0.08),
          right: size * 0.16,
          bottom: size * 0.26,
          borderRadius: 1,
        }}
      />
    </span>
  );
}
