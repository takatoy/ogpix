"use client";

import { useState, useEffect, useCallback } from "react";

const TEMPLATES = ["blog", "product", "social", "minimal"] as const;
type Template = (typeof TEMPLATES)[number];

const TEMPLATE_FIELDS: Record<
  Template,
  { key: string; label: string; placeholder: string }[]
> = {
  blog: [
    { key: "title", label: "Title", placeholder: "How to Build a SaaS in One Weekend" },
    { key: "subtitle", label: "Subtitle", placeholder: "A step-by-step guide for developers" },
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
    { key: "subtitle", label: "Subtitle", placeholder: "Check it out and let me know" },
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
  { label: "Ocean", bg: "linear-gradient(145deg, #0c1445 0%, #1a3a6b 50%, #2196F3 100%)", color: "#ffffff", accent: "#2196F3" },
  { label: "Sunset", bg: "linear-gradient(145deg, #2d1b00 0%, #e65100 50%, #ff9800 100%)", color: "#ffffff", accent: "#ff9800" },
  { label: "Forest", bg: "linear-gradient(145deg, #0d1f0d 0%, #1b5e20 50%, #4caf50 100%)", color: "#ffffff", accent: "#4caf50" },
  { label: "Rose", bg: "linear-gradient(145deg, #1a0011 0%, #880e4f 50%, #e91e63 100%)", color: "#ffffff", accent: "#e91e63" },
  { label: "Slate", bg: "#1e293b", color: "#e2e8f0", accent: "#64748b" },
  { label: "Midnight", bg: "linear-gradient(145deg, #020617 0%, #0f172a 50%, #1e293b 100%)", color: "#e2e8f0", accent: "#6366f1" },
  { label: "Ember", bg: "linear-gradient(145deg, #1c1917 0%, #44403c 50%, #78716c 100%)", color: "#fafaf9", accent: "#f97316" },
];

const PATTERNS = [
  { label: "Auto", value: "" },
  { label: "Dots", value: "dots" },
  { label: "Grid", value: "grid" },
  { label: "Diagonal", value: "diagonal" },
  { label: "None", value: "none" },
];

interface ApiKeyData {
  id: string;
  name: string;
  keyPreview: string;
  key: string;
}

export default function BuilderPage() {
  const [template, setTemplate] = useState<Template>("blog");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [customBg, setCustomBg] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [customAccent, setCustomAccent] = useState("");
  const [customFontSize, setCustomFontSize] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [customPattern, setCustomPattern] = useState("");
  const [imageKey, setImageKey] = useState(0);
  const [keys, setKeys] = useState<ApiKeyData[]>([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const loadKeys = useCallback(() => {
    fetch("/api/keys")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setKeys(data);
          if (data.length > 0 && !selectedKey) {
            setSelectedKey(data[0].key);
          }
        }
      })
      .catch(() => {});
  }, [selectedKey]);

  useEffect(() => {
    loadKeys();
  }, [loadKeys]);

  function buildParams() {
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
    if (customTag) params.set("tag", customTag);
    if (customPattern) params.set("pattern", customPattern);
    return params;
  }

  function getPreviewUrl() {
    const params = buildParams();
    params.set("preview", "true");
    return `/api/og?${params.toString()}`;
  }

  function getProductionUrl() {
    const params = buildParams();
    params.set("key", selectedKey || "YOUR_API_KEY");
    return `https://ogpix-red.vercel.app/api/og?${params.toString()}`;
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

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Image Builder</h1>
      <p className="text-zinc-400 mb-6">
        Design your OG image and get production-ready URLs with your API key.
      </p>

      <div className="grid lg:grid-cols-[340px_1fr] gap-6 overflow-hidden">
        {/* Controls */}
        <div className="space-y-5">
          {/* Template */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Template</label>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTemplate(t); setFields({}); }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition ${
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
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition flex-1 ${
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

          {/* Content fields */}
          <div className="space-y-3">
            <label className="text-sm text-zinc-400 block">Content</label>
            {TEMPLATE_FIELDS[template].map((field) => (
              <div key={field.key}>
                <label className="text-xs text-zinc-500 mb-1 block">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={fields[field.key] || ""}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition"
                />
              </div>
            ))}
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Tag / badge</label>
              <input
                type="text"
                placeholder="e.g. Tutorial, New, v2.0"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition"
              />
            </div>
          </div>

          {/* Presets */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Color presets</label>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_STYLES.map((p) => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-medium transition"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Pattern</label>
            <div className="flex flex-wrap gap-1.5">
              {PATTERNS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => { setCustomPattern(p.value); setImageKey((k) => k + 1); }}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                    customPattern === p.value
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced */}
          <div className="space-y-3">
            <label className="text-sm text-zinc-400 block">Advanced</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Background</label>
                <input
                  type="text" placeholder="#1a1a2e" value={customBg}
                  onChange={(e) => setCustomBg(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs focus:outline-none focus:border-violet-500 transition"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Text color</label>
                <input
                  type="text" placeholder="#ffffff" value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs focus:outline-none focus:border-violet-500 transition"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Accent</label>
                <input
                  type="text" placeholder="#8b5cf6" value={customAccent}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs focus:outline-none focus:border-violet-500 transition"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Font size</label>
                <input
                  type="text" placeholder="64" value={customFontSize}
                  onChange={(e) => setCustomFontSize(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs focus:outline-none focus:border-violet-500 transition"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setImageKey((k) => k + 1)}
            className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold text-sm transition"
          >
            Generate image
          </button>
        </div>

        {/* Preview & output */}
        <div className="space-y-4 min-w-0">
          {/* Preview */}
          <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={imageKey}
              src={getPreviewUrl()}
              alt="OG image preview"
              className="w-full aspect-[1200/630]"
            />
          </div>

          {/* API key selector */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">API Key</label>
            {keys.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No API keys yet.{" "}
                <a href="/dashboard/keys" className="text-violet-400 hover:text-violet-300">
                  Create one
                </a>{" "}
                to get production URLs.
              </p>
            ) : (
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition"
              >
                {keys.map((k) => (
                  <option key={k.id} value={k.key}>
                    {k.name} ({k.keyPreview})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Production URL */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-zinc-400">Production URL</label>
              <button
                onClick={() => copyToClipboard(getProductionUrl(), "url")}
                className="text-xs text-violet-400 hover:text-violet-300 transition"
              >
                {copied === "url" ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 overflow-x-auto">
              <code className="text-xs font-mono text-zinc-300 break-all">
                {getProductionUrl()}
              </code>
            </div>
          </div>

          {/* HTML meta tag */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-zinc-400">HTML meta tag</label>
              <button
                onClick={() =>
                  copyToClipboard(
                    `<meta property="og:image" content="${getProductionUrl()}" />`,
                    "html"
                  )
                }
                className="text-xs text-violet-400 hover:text-violet-300 transition"
              >
                {copied === "html" ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 overflow-x-auto">
              <code className="text-xs font-mono text-zinc-300 break-all">
                {`<meta property="og:image" content="${getProductionUrl()}" />`}
              </code>
            </div>
          </div>

          {/* Next.js snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-zinc-400">Next.js metadata</label>
              <button
                onClick={() => {
                  const snippet = `export const metadata = {\n  openGraph: {\n    images: ["${getProductionUrl()}"],\n  },\n};`;
                  copyToClipboard(snippet, "nextjs");
                }}
                className="text-xs text-violet-400 hover:text-violet-300 transition"
              >
                {copied === "nextjs" ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 overflow-x-auto">
              <pre className="text-xs font-mono text-zinc-300">{`export const metadata = {
  openGraph: {
    images: ["${getProductionUrl()}"],
  },
};`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
