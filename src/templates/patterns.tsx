import React from "react";

export function DotsPattern({ color = "rgba(255,255,255,0.06)" }: { color?: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        backgroundImage: `radial-gradient(${color} 1.5px, transparent 1.5px)`,
        backgroundSize: "30px 30px",
      }}
    />
  );
}

export function GridPattern({ color = "rgba(255,255,255,0.04)" }: { color?: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

export function DiagonalPattern({ color = "rgba(255,255,255,0.03)" }: { color?: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, ${color} 20px, ${color} 21px)`,
      }}
    />
  );
}

export function PatternOverlay({ pattern, color }: { pattern?: string; color?: string }) {
  if (!pattern || pattern === "none") return null;
  switch (pattern) {
    case "dots":
      return <DotsPattern color={color} />;
    case "grid":
      return <GridPattern color={color} />;
    case "diagonal":
      return <DiagonalPattern color={color} />;
    default:
      return null;
  }
}
