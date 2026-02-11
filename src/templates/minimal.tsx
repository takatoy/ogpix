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

  const bg = custom?.bg || (isDark ? "#000000" : "#ffffff");
  const textColor = custom?.color || (isDark ? "#ffffff" : "#000000");
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
      }}
    >
      {custom?.accent && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: custom.accent,
            display: "flex",
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          fontSize:
            baseFontSize ||
            (title.length > 50 ? "52px" : "72px"),
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-2px",
          maxWidth: "900px",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            display: "flex",
            fontSize: "26px",
            opacity: 0.5,
            marginTop: "20px",
            letterSpacing: "-0.5px",
          }}
        >
          {subtitle}
        </div>
      )}
      {site && (
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            opacity: 0.3,
            marginTop: "auto",
            paddingTop: "40px",
          }}
        >
          {site}
        </div>
      )}
    </div>
  );
}
