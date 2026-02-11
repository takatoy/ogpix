"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import Link from "next/link";

const TEMPLATES = ["blog", "product", "social", "minimal"] as const;
type Template = (typeof TEMPLATES)[number];

const TEMPLATE_FIELDS: Record<Template, { key: string; label: string; placeholder: string }[]> = {
  blog: [
    { key: "title", label: "Title", placeholder: "How to Build a SaaS in One Weekend" },
    { key: "subtitle", label: "Subtitle", placeholder: "A step-by-step guide" },
    { key: "author", label: "Author", placeholder: "Sarah Chen" },
    { key: "date", label: "Date", placeholder: "Feb 2026" },
    { key: "site", label: "Site name", placeholder: "devblog.io" },
  ],
  product: [
    { key: "title", label: "Product name", placeholder: "Ship Faster Than Ever" },
    { key: "subtitle", label: "Tagline", placeholder: "The developer tool you've been waiting for" },
    { key: "logo", label: "Logo URL", placeholder: "https://example.com/logo.png" },
  ],
  social: [
    { key: "title", label: "Text", placeholder: "Just launched my new project!" },
    { key: "subtitle", label: "Subtitle", placeholder: "Check it out" },
    { key: "author", label: "Name", placeholder: "Alex Rivera" },
    { key: "handle", label: "Handle", placeholder: "alexdev" },
  ],
  minimal: [
    { key: "title", label: "Title", placeholder: "Less is More" },
    { key: "subtitle", label: "Subtitle", placeholder: "A guide to minimalist design" },
    { key: "site", label: "Site name", placeholder: "minimal.design" },
  ],
};

const PRESET_STYLES = [
  { label: "Default", bg: "", color: "", accent: "" },
  { label: "Ocean", bg: "linear-gradient(135deg, #0c1445 0%, #1a3a6b 50%, #2196F3 100%)", color: "#ffffff", accent: "#2196F3" },
  { label: "Sunset", bg: "linear-gradient(135deg, #2d1b00 0%, #e65100 50%, #ff9800 100%)", color: "#ffffff", accent: "#ff9800" },
  { label: "Forest", bg: "linear-gradient(135deg, #0d1f0d 0%, #1b5e20 50%, #4caf50 100%)", color: "#ffffff", accent: "#4caf50" },
  { label: "Rose", bg: "linear-gradient(135deg, #1a0011 0%, #880e4f 50%, #e91e63 100%)", color: "#ffffff", accent: "#e91e63" },
  { label: "Slate", bg: "#1e293b", color: "#e2e8f0", accent: "#64748b" },
];

export default function PlaygroundPage() {
  const [template, setTemplate] = useState<Template>("blog");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [customBg, setCustomBg] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [customAccent, setCustomAccent] = useState("");
  const [customFontSize, setCustomFontSize] = useState("");
  const [imageKey, setImageKey] = useState(0);

  function getImageUrl() {
    const params = new URLSearchParams();
    params.set("template", template);
    params.set("theme", theme);
    params.set("preview", "true");
    for (const field of TEMPLATE_FIELDS[template]) {
      const value = fields[field.key] || field.placeholder;
      params.set(field.key, value);
    }
    if (customBg) params.set("bg", customBg);
    if (customColor) params.set("color", customColor);
    if (customAccent) params.set("accent", customAccent);
    if (customFontSize) params.set("fontSize", customFontSize);
    return `/api/og?${params.toString()}`;
  }

  function getApiUrl() {
    const params = new URLSearchParams();
    params.set("template", template);
    params.set("theme", theme);
    for (const field of TEMPLATE_FIELDS[template]) {
      const value = fields[field.key] || field.placeholder;
      params.set(field.key, value);
    }
    if (customBg) params.set("bg", customBg);
    if (customColor) params.set("color", customColor);
    if (customAccent) params.set("accent", customAccent);
    if (customFontSize) params.set("fontSize", customFontSize);
    params.set("key", "YOUR_API_KEY");
    return `https://ogpix.dev/api/og?${params.toString()}`;
  }

  function handleFieldChange(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function applyPreset(preset: (typeof PRESET_STYLES)[number]) {
    setCustomBg(preset.bg);
    setCustomColor(preset.color);
    setCustomAccent(preset.accent);
    setImageKey((k) => k + 1);
  }

  function handleGenerate() {
    setImageKey((k) => k + 1);
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Template Playground</h1>
          <p className="text-zinc-400">
            Try all templates live. Customize colors, fonts, and content.
            Sign up for watermark-free images.
          </p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Controls */}
          <div className="space-y-6">
            {/* Template selector */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Template
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTemplate(t);
                      setFields({});
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                      template === t
                        ? "bg-violet-600 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">Theme</label>
              <div className="flex gap-2">
                {(["dark", "light"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition flex-1 ${
                      theme === t
                        ? "bg-violet-600 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-3">
              <label className="text-sm text-zinc-400 block">Content</label>
              {TEMPLATE_FIELDS[template].map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-zinc-500 mb-1 block">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={fields[field.key] || ""}
                    onChange={(e) =>
                      handleFieldChange(field.key, e.target.value)
                    }
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition"
                  />
                </div>
              ))}
            </div>

            {/* Style presets */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Color presets
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_STYLES.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset)}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-medium transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom style */}
            <div className="space-y-3">
              <label className="text-sm text-zinc-400 block">
                Custom style
              </label>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">
                  Background (color or CSS gradient)
                </label>
                <input
                  type="text"
                  placeholder="#1a1a2e or linear-gradient(...)"
                  value={customBg}
                  onChange={(e) => setCustomBg(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">
                  Text color
                </label>
                <input
                  type="text"
                  placeholder="#ffffff"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">
                  Accent color
                </label>
                <input
                  type="text"
                  placeholder="#8b5cf6"
                  value={customAccent}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">
                  Title font size (px)
                </label>
                <input
                  type="text"
                  placeholder="64"
                  value={customFontSize}
                  onChange={(e) => setCustomFontSize(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-3 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold transition"
            >
              Generate image
            </button>

            <Link
              href="/signup"
              className="block text-center py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition"
            >
              Sign up for watermark-free images
            </Link>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={imageKey}
                src={getImageUrl()}
                alt="OG image preview"
                className="w-full aspect-[1200/630]"
              />
            </div>

            {/* API URL */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                API URL
              </label>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-xs font-mono text-zinc-300 break-all">
                  {getApiUrl()}
                </code>
              </div>
            </div>

            {/* HTML snippet */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                HTML meta tag
              </label>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-xs font-mono text-zinc-300 break-all">
                  {`<meta property="og:image" content="${getApiUrl()}" />`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
