import React from "react";

interface BlogTemplateProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  site?: string;
  theme?: "light" | "dark";
}

export function BlogTemplate({
  title,
  subtitle,
  author,
  date,
  site,
  theme = "dark",
}: BlogTemplateProps) {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: isDark
          ? "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      {site && (
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            opacity: 0.8,
            marginBottom: "20px",
            textTransform: "uppercase",
            letterSpacing: "3px",
          }}
        >
          {site}
        </div>
      )}
      <div
        style={{
          display: "flex",
          fontSize: title.length > 60 ? "48px" : "64px",
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: subtitle ? "20px" : "0",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            opacity: 0.8,
            marginBottom: "30px",
          }}
        >
          {subtitle}
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginTop: "auto",
        }}
      >
        {author && (
          <div style={{ display: "flex", fontSize: "22px", fontWeight: 600 }}>
            {author}
          </div>
        )}
        {author && date && (
          <div style={{ display: "flex", fontSize: "22px", opacity: 0.5 }}>
            |
          </div>
        )}
        {date && (
          <div style={{ display: "flex", fontSize: "22px", opacity: 0.7 }}>
            {date}
          </div>
        )}
      </div>
    </div>
  );
}
