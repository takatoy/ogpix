import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import React from "react";
import { BlogTemplate } from "@/templates/blog";
import { ProductTemplate } from "@/templates/product";
import { SocialTemplate } from "@/templates/social";
import { MinimalTemplate } from "@/templates/minimal";
import { validateApiKey } from "@/lib/api-key";
import { checkUsageLimit, incrementUsage } from "@/lib/usage";
import { rateLimit } from "@/lib/rate-limit";

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

    // API key authentication
    const apiKey =
      searchParams.get("key") ||
      req.headers.get("authorization")?.replace("Bearer ", "");

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
          />
        );
        break;
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
