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
      ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 25%, #f9ca24 50%, #6ab04c 75%, #22a6b3 100%)"
      : "linear-gradient(135deg, #a29bfe 0%, #6c5ce7 50%, #fd79a8 100%)");
  const textColor = custom?.color || "white";
  const baseFontSize = custom?.fontSize ? parseInt(custom.fontSize) : null;

  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px 80px",
        background: bg,
        color: textColor,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            fontSize:
              baseFontSize ||
              (title.length > 50 ? "50px" : "62px"),
            fontWeight: 900,
            lineHeight: 1.15,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              opacity: 0.9,
              textShadow: "0 1px 5px rgba(0,0,0,0.15)",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: custom?.accent || "rgba(255,255,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          {(author || "U")[0].toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {author && (
            <div style={{ display: "flex", fontSize: "22px", fontWeight: 700 }}>
              {author}
            </div>
          )}
          {handle && (
            <div style={{ display: "flex", fontSize: "18px", opacity: 0.8 }}>
              @{handle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
