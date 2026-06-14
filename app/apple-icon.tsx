import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon (iOS rounds the corners itself, so we go full-bleed).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3df5a0",
          color: "#03130c",
          fontSize: 96,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: -3,
        }}
      >
        AJ
      </div>
    ),
    { ...size }
  );
}
