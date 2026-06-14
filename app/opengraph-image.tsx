import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Arham Javaid — Full-Stack & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#3df5a0";
const BG = "#06080a";
const FG = "#dbe7e0";

export default async function OpengraphImage() {
  // Embed the portrait as a data URL (Satori needs inline image data).
  let photo = "";
  try {
    const buf = await readFile(join(process.cwd(), "public", "Mine.png"));
    photo = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: BG,
          color: FG,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* phosphor glow */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -120,
            width: 760,
            height: 760,
            display: "flex",
            backgroundImage: `radial-gradient(circle, rgba(61,245,160,0.28), rgba(6,8,10,0) 70%)`,
          }}
        />
        {/* subtle grid bar at the very top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            display: "flex",
            backgroundImage: `linear-gradient(90deg, ${ACCENT}, rgba(61,245,160,0))`,
          }}
        />

        {/* left: text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px",
            width: photo ? "62%" : "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: ACCENT, marginBottom: 26 }}>
            <div style={{ width: 14, height: 14, borderRadius: 99, backgroundColor: ACCENT, display: "flex" }} />
            Available for work
          </div>

          <div style={{ display: "flex", fontSize: 80, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            Arham Javaid
          </div>
          <div style={{ display: "flex", fontSize: 42, fontWeight: 700, color: ACCENT, marginTop: 10 }}>
            Full-Stack &amp; AI Engineer
          </div>

          <div style={{ display: "flex", fontSize: 26, color: "#9fb0a8", marginTop: 26, lineHeight: 1.4, maxWidth: 560 }}>
            I build multi-tenant SaaS platforms and the AI agents that run on them.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 40 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: ACCENT,
              }}
            >
              <div style={{ width: 15, height: 15, backgroundColor: "#03130c", transform: "rotate(45deg)", display: "flex" }} />
            </div>
            <div style={{ display: "flex", fontSize: 26, color: FG }}>Ask my AI anything →</div>
          </div>
        </div>

        {/* right: portrait */}
        {photo ? (
          <div style={{ display: "flex", width: "38%", alignItems: "center", justifyContent: "center", padding: 48 }}>
            <div
              style={{
                display: "flex",
                padding: 4,
                borderRadius: 30,
                backgroundImage: `linear-gradient(140deg, ${ACCENT}, rgba(61,245,160,0.15))`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo}
                width={336}
                height={416}
                style={{ borderRadius: 26, objectFit: "cover" }}
                alt=""
              />
            </div>
          </div>
        ) : null}
      </div>
    ),
    { ...size }
  );
}
