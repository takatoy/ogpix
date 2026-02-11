import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "The Complete Guide to Dynamic OG Image Generation | ogpix",
  description:
    "Learn what dynamic OG images are, why they matter, and how to generate them automatically for every page on your site using an API.",
};

export default function DynamicOgImagesGuide() {
  return (
    <div className="min-h-screen">
      <Nav />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-violet-400 hover:text-violet-300 mb-4 inline-block"
          >
            &larr; Back to blog
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            The Complete Guide to Dynamic OG Image Generation
          </h1>
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <time>Feb 10, 2026</time>
            <span>-</span>
            <span>8 min read</span>
          </div>
        </div>

        <div className="prose-invert space-y-6 text-zinc-300 leading-relaxed">
          <p>
            When you share a link on Twitter, LinkedIn, Slack, or Discord, the
            preview card that appears is powered by{" "}
            <strong>Open Graph (OG) meta tags</strong>. The most impactful of
            these is the <code>og:image</code> tag, which controls the image
            shown in the preview.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            What are dynamic OG images?
          </h2>
          <p>
            Static OG images are single images used across your entire site.
            Dynamic OG images are <strong>generated on the fly</strong> for each
            page, embedding the page&apos;s unique title, author, date, or other
            content directly into the image.
          </p>
          <p>
            For example, a blog with 100 posts can have 100 unique OG images,
            each showing that specific post&apos;s title and author - without
            manually creating any of them.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Why dynamic OG images matter
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Higher click-through rates:</strong> Links with custom
              images get significantly more engagement than those with generic
              previews or no image at all.
            </li>
            <li>
              <strong>Professional appearance:</strong> Custom OG images signal
              quality and effort, building trust with potential visitors.
            </li>
            <li>
              <strong>Brand consistency:</strong> Every shared link reinforces
              your brand with consistent colors, fonts, and style.
            </li>
            <li>
              <strong>Zero manual work:</strong> Once set up, every new page
              automatically gets a perfect preview image.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            How to generate dynamic OG images
          </h2>
          <p>There are several approaches:</p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            1. Self-hosted with Satori / @vercel/og
          </h3>
          <p>
            You can use Vercel&apos;s open-source{" "}
            <code>@vercel/og</code> library to render React components as
            images. This works well but requires you to build, maintain, and
            host the image generation infrastructure yourself.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            2. Headless browser (Puppeteer/Playwright)
          </h3>
          <p>
            Spin up a headless browser, render an HTML page, and take a
            screenshot. This is flexible but slow (1-5 seconds per image) and
            resource-intensive.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            3. Use an API service like ogpix
          </h3>
          <p>
            The simplest approach: make a GET request with your content as
            parameters, and get back a PNG image. No infrastructure to maintain,
            no code to write beyond a single meta tag.
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 my-6">
            <pre className="text-sm font-mono text-zinc-300 overflow-x-auto">
{`<!-- Just add this meta tag to your HTML -->
<meta
  property="og:image"
  content="https://ogpix.dev/api/og?template=blog&title=My+Post&author=Jane"
/>`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Choosing the right approach
          </h2>
          <p>
            If you need full control and have engineering resources, self-hosting
            with <code>@vercel/og</code> is a solid option. If you want to get
            up and running in minutes with zero maintenance, an API service
            handles everything for you.
          </p>

          <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-6 mt-10">
            <h3 className="text-lg font-semibold text-white mb-2">
              Try ogpix free
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              Generate dynamic OG images with a simple API call. 100 free
              images/month, no credit card required.
            </p>
            <Link
              href="/playground"
              className="inline-block px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition"
            >
              Try the playground
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
