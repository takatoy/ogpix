import React from "react";
import type { CustomStyle } from "./types";
import { PatternOverlay } from "./patterns";

interface BlogTemplateProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  site?: string;
  theme?: "light" | "dark";
  custom?: CustomStyle;
}

export function BlogTemplate({
  title,
  subtitle,
  author,
  date,
  site,
  theme = "dark",
  custom,
}: BlogTemplateProps) {
  const isDark = theme === "dark";

  const bg =
    custom?.bg ||
    (isDark
      ? "linear-gradient(145deg, #0a0a1a 0%, #1a1035 40%, #2d1b69 100%)"
      : "linear-gradient(145deg, #fafafe 0%, #eef0ff 40%, #e0e7ff 100%)");
  const textColor = custom?.color || (isDark ? "#ffffff" : "#1a1a2e");
  const accent = custom?.accent || (isDark ? "#8b5cf6" : "#6d28d9");
  const baseFontSize = custom?.fontSize ? parseInt(custom.fontSize) : null;

  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: bg,
        color: textColor,
        fontFamily: "sans-serif",
        overflow: "hidden",
      }}
    >
      <PatternOverlay pattern={custom?.pattern || "dots"} />

      {/* Accent top bar */}
      <div
        style={{
          display: "flex",
          height: "5px",
          background: `linear-gradient(90deg, ${accent}, ${accent}88 50%, transparent)`,
        }}
      />

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `${accent}08`,
          border: `1px solid ${accent}15`,
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          padding: "60px 80px 50px",
          position: "relative",
        }}
      >
        {/* Tag / site name */}
        {(custom?.tag || site) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            {custom?.tag && (
              <div
                style={{
                  display: "flex",
                  padding: "6px 16px",
                  background: `${accent}20`,
                  border: `1px solid ${accent}40`,
                  borderRadius: "20px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: accent,
                  letterSpacing: "0.5px",
                }}
              >
                {custom.tag}
              </div>
            )}
            {site && (
              <div
                style={{
                  display: "flex",
                  fontSize: "18px",
                  opacity: 0.5,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {site}
              </div>
            )}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: baseFontSize || (title.length > 70 ? 42 : title.length > 45 ? 52 : 60),
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-1.5px",
            maxWidth: "950px",
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
              opacity: 0.6,
              marginTop: "16px",
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Bottom: author & date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "auto",
            paddingTop: "30px",
          }}
        >
          {/* Author avatar */}
          {author && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${accent}, ${accent}88)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {author[0].toUpperCase()}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  {author}
                </div>
                {date && (
                  <div
                    style={{
                      display: "flex",
                      fontSize: "15px",
                      opacity: 0.5,
                    }}
                  >
                    {date}
                  </div>
                )}
              </div>
            </div>
          )}

          {!author && date && (
            <div style={{ display: "flex", fontSize: "18px", opacity: 0.5 }}>
              {date}
            </div>
          )}

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
    </div>
  );
}
