import React from "react";
import type { CustomStyle } from "./types";

interface MinimalTemplateProps {
  title: string;
  subtitle?: string;
  site?: string;
  theme?: "light" | "dark";
  custom?: CustomStyle;
}

export function MinimalTemplate({
  title,
  subtitle,
  site,
  theme = "dark",
  custom,
}: MinimalTemplateProps) {
  const isDark = theme === "dark";

  const bg = custom?.bg || (isDark ? "#0a0a0a" : "#fafafa");
  const textColor = custom?.color || (isDark ? "#ededed" : "#171717");
  const accent = custom?.accent || (isDark ? "#525252" : "#a3a3a3");
  const baseFontSize = custom?.fontSize ? parseInt(custom.fontSize) : null;

  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px 100px",
        background: bg,
        color: textColor,
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent left bar */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: 0,
          width: "4px",
          height: "120px",
          background: accent,
          display: "flex",
        }}
      />

      {/* Subtle corner decoration */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          width: "200px",
          height: "200px",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`,
          borderRadius: "50%",
          display: "flex",
        }}
      />

      {/* Tag */}
      {custom?.tag && (
        <div
          style={{
            display: "flex",
            padding: "5px 14px",
            border: `1px solid ${accent}60`,
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: 500,
            color: accent,
            marginBottom: "24px",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          {custom.tag}
        </div>
      )}

      {/* Logo */}
      {custom?.logo && (
        <img
          src={custom.logo}
          width={40}
          height={40}
          style={{
            marginBottom: "28px",
            borderRadius: "8px",
            objectFit: "contain",
          }}
        />
      )}

      {/* Title */}
      <div
        style={{
          display: "flex",
          fontSize: baseFontSize || (title.length > 50 ? 48 : 68),
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-2.5px",
          maxWidth: "900px",
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
            opacity: 0.4,
            marginTop: "20px",
            letterSpacing: "-0.5px",
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      )}

      {/* Site */}
      {site && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "17px",
            opacity: 0.25,
            marginTop: "auto",
            paddingTop: "40px",
            letterSpacing: "0.5px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "1px",
              background: textColor,
              opacity: 0.5,
              display: "flex",
            }}
          />
          {site}
        </div>
      )}
    </div>
  );
}
