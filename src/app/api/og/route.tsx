import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import React from "react";
import { BlogTemplate } from "@/templates/blog";
import { ProductTemplate } from "@/templates/product";
import { SocialTemplate } from "@/templates/social";
import { MinimalTemplate } from "@/templates/minimal";
import { validateApiKey } from "@/lib/api-key";
import { checkUsageLimit, incrementUsage } from "@/lib/usage";
import { rateLimit } from "@/lib/rate-limit";
import type { CustomStyle } from "@/templates/types";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const template = searchParams.get("template") || "blog";
    const title = searchParams.get("title") || "Hello World";
    const subtitle = searchParams.get("subtitle") || undefined;
    const author = searchParams.get("author") || undefined;
    const date = searchParams.get("date") || undefined;
    const site = searchParams.get("site") || undefined;
    const handle = searchParams.get("handle") || undefined;
    const logo = searchParams.get("logo") || undefined;
    const theme = (searchParams.get("theme") as "light" | "dark") || "dark";
    const preview = searchParams.get("preview") === "true";

    // Custom style params
    const custom: CustomStyle = {};
    if (searchParams.get("bg")) custom.bg = searchParams.get("bg")!;
    if (searchParams.get("color")) custom.color = searchParams.get("color")!;
    if (searchParams.get("accent")) custom.accent = searchParams.get("accent")!;
    if (searchParams.get("fontSize"))
      custom.fontSize = searchParams.get("fontSize")!;
    if (searchParams.get("tag")) custom.tag = searchParams.get("tag")!;
    if (searchParams.get("pattern"))
      custom.pattern = searchParams.get("pattern") as CustomStyle["pattern"];
    if (logo) custom.logo = logo;
    const hasCustom = Object.keys(custom).length > 0 ? custom : undefined;

    // API key authentication
    const apiKey =
      searchParams.get("key") ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    let authenticated = false;

    if (apiKey) {
      // Rate limit by API key
      const { allowed: rateLimitAllowed } = rateLimit(apiKey, 10, 1000);
      if (!rateLimitAllowed) {
        return new Response("Rate limit exceeded", { status: 429 });
      }

      const result = await validateApiKey(apiKey);
      if (!result) {
        return new Response("Invalid API key", { status: 401 });
      }

      // Check usage limits
      const usage = await checkUsageLimit(result.user.id, result.user.plan);
      if (!usage.allowed) {
        return new Response(
          JSON.stringify({
            error: "Usage limit exceeded",
            current: usage.current,
            limit: usage.limit,
            upgrade: "https://ogpix.dev/pricing",
          }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }

      // Track usage
      await incrementUsage(result.user.id);
      authenticated = true;
    }

    // Require API key for clean images (non-preview)
    if (!authenticated && !preview) {
      return new Response(
        JSON.stringify({
          error: "API key required",
          message:
            "Add your API key as ?key=YOUR_KEY or use preview=true for watermarked images",
          signup: "https://ogpix.dev/signup",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate template
    let element: React.ReactElement;

    switch (template) {
      case "product":
        element = (
          <ProductTemplate
            title={title}
            subtitle={subtitle}
            logo={logo}
            theme={theme}
            custom={hasCustom}
          />
        );
        break;
      case "social":
        element = (
          <SocialTemplate
            title={title}
            subtitle={subtitle}
            author={author}
            handle={handle}
            theme={theme}
            custom={hasCustom}
          />
        );
        break;
      case "minimal":
        element = (
          <MinimalTemplate
            title={title}
            subtitle={subtitle}
            site={site}
            theme={theme}
            custom={hasCustom}
          />
        );
        break;
      case "blog":
      default:
        element = (
          <BlogTemplate
            title={title}
            subtitle={subtitle}
            author={author}
            date={date}
            site={site}
            theme={theme}
            custom={hasCustom}
          />
        );
        break;
    }

    // Wrap with watermark for unauthenticated preview requests
    if (!authenticated && preview) {
      element = (
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "1200px",
            height: "630px",
          }}
        >
          {element}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "1200px",
              height: "630px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "72px",
                fontWeight: 900,
                color: "rgba(255,255,255,0.15)",
                transform: "rotate(-25deg)",
                letterSpacing: "8px",
              }}
            >
              ogpix.dev
            </div>
          </div>
        </div>
      );
    }

    return new ImageResponse(element, {
      width: 1200,
      height: 630,
    });
  } catch (e) {
    console.error("OG image generation error:", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
