import React from "react";

interface MinimalTemplateProps {
  title: string;
  subtitle?: string;
  site?: string;
  theme?: "light" | "dark";
}

export function MinimalTemplate({
  title,
  subtitle,
  site,
  theme = "dark",
}: MinimalTemplateProps) {
  const isDark = theme === "dark";

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
        background: isDark ? "#000000" : "#ffffff",
        color: isDark ? "#ffffff" : "#000000",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: title.length > 50 ? "52px" : "72px",
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
