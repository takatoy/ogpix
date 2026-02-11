import React from "react";
import type { CustomStyle } from "./types";

interface ProductTemplateProps {
  title: string;
  subtitle?: string;
  logo?: string;
  theme?: "light" | "dark";
  custom?: CustomStyle;
}

export function ProductTemplate({
  title,
  subtitle,
  logo,
  theme = "dark",
  custom,
}: ProductTemplateProps) {
  const isDark = theme === "dark";

  const bg =
    custom?.bg ||
    (isDark
      ? "linear-gradient(to bottom right, #111827, #1f2937)"
      : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)");
  const textColor = custom?.color || (isDark ? "white" : "#111827");
  const accent =
    custom?.accent || "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)";
  const baseFontSize = custom?.fontSize ? parseInt(custom.fontSize) : null;

  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        color: textColor,
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: accent,
          display: "flex",
        }}
      />
      {logo && (
        <img
          src={logo}
          width={80}
          height={80}
          style={{ marginBottom: "30px", borderRadius: "16px" }}
        />
      )}
      <div
        style={{
          display: "flex",
          fontSize:
            baseFontSize ||
            (title.length > 40 ? "52px" : "68px"),
          fontWeight: 800,
          textAlign: "center",
          maxWidth: "900px",
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            opacity: 0.7,
            marginTop: "20px",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
