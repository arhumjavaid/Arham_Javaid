import { ChevronDown } from "lucide-react";
import type { Diagram } from "@/lib/caseStudies";

// Renders a structured architecture diagram as themed, layered nodes.
// Layers flow top → bottom; nodes within a layer sit side by side (parallel).
export function DiagramFlow({ diagram }: { diagram: Diagram }) {
  return (
    <figure className="m-0">
      <div className="flex flex-col items-center gap-1 px-4 py-7 sm:px-6">
        {diagram.layers.map((layer, li) => (
          <div key={li} className="flex w-full flex-col items-center">
            <div className="flex flex-wrap items-stretch justify-center gap-2.5">
              {layer.nodes.map((n, ni) => (
                <div
                  key={ni}
                  className={[
                    "min-w-[7.5rem] rounded-lg border px-3 py-2 text-center transition-colors",
                    n.accent
                      ? "border-[color:color-mix(in_srgb,var(--color-accent)_50%,var(--border))] bg-[color:color-mix(in_srgb,var(--color-accent)_8%,var(--card))]"
                      : "border-[var(--border)] bg-[var(--card)]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "font-[family-name:var(--font-mono)] text-xs font-semibold",
                      n.accent ? "text-[var(--accent-ink)]" : "text-[var(--fg)]",
                    ].join(" ")}
                  >
                    {n.label}
                  </div>
                  {n.sub && <div className="mt-0.5 text-[10px] leading-tight text-muted">{n.sub}</div>}
                </div>
              ))}
            </div>

            {layer.note && (
              <div className="mt-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-muted">
                {layer.note}
              </div>
            )}

            {li < diagram.layers.length - 1 && (
              <ChevronDown size={16} className="my-1 text-[var(--color-accent)]" aria-hidden />
            )}
          </div>
        ))}
      </div>
      {diagram.caption && (
        <figcaption className="border-t border-[var(--border)] px-5 py-2.5 font-[family-name:var(--font-mono)] text-[11px] text-muted">
          {diagram.caption}
        </figcaption>
      )}
    </figure>
  );
}
