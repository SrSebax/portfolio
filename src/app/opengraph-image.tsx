import { ImageResponse } from "next/og";

export const alt = "Sebastian Londoño — Desarrollador de Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 50% -20%, #1e1b4b 0%, #09090b 60%)",
          color: "#ededef",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#8b8b94" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#818cf8" }} />
          Disponible para nuevos proyectos
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>Sebastian Londoño</div>
          <div style={{ fontSize: 40, color: "#818cf8", marginTop: 20 }}>Desarrollador de Software · Web & Mobile</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8b8b94" }}>
          <span>React · Next.js · Flutter · TypeScript</span>
          <span>Medellín, Colombia</span>
        </div>
      </div>
    ),
    size,
  );
}
