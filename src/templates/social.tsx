import React from "react";

interface SocialTemplateProps {
  title: string;
  subtitle?: string;
  author?: string;
  handle?: string;
  theme?: "light" | "dark";
}

export function SocialTemplate({
  title,
  subtitle,
  author,
  handle,
  theme = "dark",
}: SocialTemplateProps) {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px 80px",
        background: isDark
          ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 25%, #f9ca24 50%, #6ab04c 75%, #22a6b3 100%)"
          : "linear-gradient(135deg, #a29bfe 0%, #6c5ce7 50%, #fd79a8 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 50 ? "50px" : "62px",
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
            background: "rgba(255,255,255,0.3)",
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
