import React from "react";
import type { CustomStyle } from "./types";
import { PatternOverlay } from "./patterns";

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
      ? "linear-gradient(160deg, #0f172a 0%, #1e293b 100%)"
      : "linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%)");
  const textColor = custom?.color || (isDark ? "#f1f5f9" : "#0f172a");
  const accent = custom?.accent || "#3b82f6";
  const baseFontSize = custom?.fontSize ? parseInt(custom.fontSize) : null;
  const resolvedLogo = custom?.logo || logo;

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
        overflow: "hidden",
      }}
    >
      <PatternOverlay pattern={custom?.pattern || "grid"} />

      {/* Gradient accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${accent}, ${accent}00)`,
          display: "flex",
        }}
      />

      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `${accent}06`,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-250px",
          right: "-150px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `${accent}04`,
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "0 80px",
        }}
      >
        {/* Logo */}
        {resolvedLogo && (
          <img
            src={resolvedLogo}
            width={72}
            height={72}
            style={{
              marginBottom: "32px",
              borderRadius: "16px",
              objectFit: "contain",
              boxShadow: isDark
                ? "0 8px 32px rgba(0,0,0,0.3)"
                : "0 8px 32px rgba(0,0,0,0.1)",
            }}
          />
        )}

        {/* Tag */}
        {custom?.tag && (
          <div
            style={{
              display: "flex",
              padding: "6px 20px",
              background: `${accent}15`,
              border: `1px solid ${accent}30`,
              borderRadius: "20px",
              fontSize: "15px",
              fontWeight: 600,
              color: accent,
              marginBottom: "24px",
              letterSpacing: "0.5px",
            }}
          >
            {custom.tag}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: baseFontSize || (title.length > 40 ? 48 : 62),
            fontWeight: 800,
            textAlign: "center",
            maxWidth: "950px",
            lineHeight: 1.1,
            letterSpacing: "-2px",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              opacity: 0.55,
              marginTop: "20px",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Accent underline */}
        <div
          style={{
            display: "flex",
            width: "80px",
            height: "4px",
            borderRadius: "2px",
            background: accent,
            marginTop: "32px",
          }}
        />
      </div>
    </div>
  );
}
