// Subtle CRT overlay — scanlines + a slow phosphor sweep. Dark mode only.
export function CRT() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[55] hidden dark:block">
      <div
        className="absolute inset-0"
        style={{
          background: "repeating-linear-gradient(to bottom, transparent 0 2px, rgba(0,0,0,0.4) 2px 3px)",
          opacity: 0.06,
        }}
      />
      <div
        className="crt-sweep absolute inset-x-0 h-24"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(61,245,160,0.05), transparent)" }}
      />
    </div>
  );
}
