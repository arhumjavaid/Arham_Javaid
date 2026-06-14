export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* terminal grid */}
      <div className="absolute inset-0 grid-bg opacity-70" />
      {/* phosphor glow from the top */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% -8%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%)",
        }}
      />
      {/* deep vignette at the bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />
    </div>
  );
}
