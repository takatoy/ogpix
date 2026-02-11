import React from "react";
import type { CustomStyle } from "./types";

interface SocialTemplateProps {
  title: string;
  subtitle?: string;
  author?: string;
  handle?: string;
  theme?: "light" | "dark";
  custom?: CustomStyle;
}

export function SocialTemplate({
  title,
  subtitle,
  author,
  handle,
  theme = "dark",
  custom,
}: SocialTemplateProps) {
  const isDark = theme === "dark";

  const bg =
    custom?.bg ||
    (isDark
      ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
      : "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)");
  const textColor = custom?.color || (isDark ? "#ffffff" : "#1a1a2e");
  const accent = custom?.accent || (isDark ? "#e94560" : "#c0392b");
  const baseFontSize = custom?.fontSize ? parseInt(custom.fontSize) : null;

  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 70px",
        background: bg,
        color: textColor,
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "60px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: `2px solid ${accent}20`,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "80px",
          right: "100px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: `2px solid ${accent}15`,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-40px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `${accent}08`,
          display: "flex",
        }}
      />

      {/* Top section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
        {/* Tag */}
        {custom?.tag && (
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "6px 16px",
              background: `${accent}25`,
              borderRadius: "20px",
              fontSize: "15px",
              fontWeight: 700,
              color: accent,
              marginBottom: "8px",
            }}
          >
            {custom.tag}
          </div>
        )}

        {/* Quote marks for visual flair */}
        <div
          style={{
            display: "flex",
            fontSize: "80px",
            fontWeight: 900,
            color: `${accent}30`,
            lineHeight: 0.8,
            marginBottom: "-10px",
          }}
        >
          &ldquo;
        </div>

        <div
          style={{
            display: "flex",
            fontSize:
              baseFontSize || (title.length > 60 ? 40 : title.length > 40 ? 48 : 56),
            fontWeight: 800,
            lineHeight: 1.2,
            maxWidth: "950px",
            letterSpacing: "-1px",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              opacity: 0.65,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Bottom: author info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          position: "relative",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            fontWeight: 800,
            color: "white",
            boxShadow: `0 4px 16px ${accent}40`,
          }}
        >
          {(author || "U")[0].toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {author && (
            <div style={{ display: "flex", fontSize: "20px", fontWeight: 700 }}>
              {author}
            </div>
          )}
          {handle && (
            <div style={{ display: "flex", fontSize: "17px", opacity: 0.5 }}>
              @{handle}
            </div>
          )}
        </div>

        {/* Logo */}
        {custom?.logo && (
          <img
            src={custom.logo}
            width={36}
            height={36}
            style={{
              marginLeft: "auto",
              borderRadius: "8px",
              objectFit: "contain",
            }}
          />
        )}
      </div>
    </div>
  );
}
