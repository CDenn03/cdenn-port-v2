import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#0a0a0a",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "linear-gradient(90deg, #f59e0b, #d97706)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
            background: "#1a1a1a",
            borderRadius: "100px",
            padding: "8px 20px",
          }}
        >
          <span style={{ color: "#f59e0b", fontSize: "15px", fontWeight: 700 }}>
            cdenn.dev
          </span>
        </div>

        <h1
          style={{
            color: "#FCF7F2",
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1.1,
            margin: "0 0 24px 0",
            maxWidth: "900px",
          }}
        >
          CDenn
        </h1>

        <p
          style={{
            color: "#888",
            fontSize: "28px",
            fontWeight: 400,
            margin: "0 0 48px 0",
            lineHeight: 1.4,
            maxWidth: "700px",
          }}
        >
          Full-Stack Software Developer · Next.js · TypeScript · AI Integrations
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "8px",
            padding: "10px 18px",
          }}
        >
          <span style={{ color: "#555", fontSize: "16px" }}>📍</span>
          <span style={{ color: "#888", fontSize: "16px" }}>
            Nairobi, Kenya · Available for remote work
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            right: "80px",
            bottom: "80px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "rgba(245, 158, 11, 0.08)",
            border: "2px solid rgba(245, 158, 11, 0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "110px",
            bottom: "110px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(245, 158, 11, 0.12)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
