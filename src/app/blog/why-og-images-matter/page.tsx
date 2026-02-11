import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Why OG Images Matter: The Data Behind Social Sharing | ogpix",
  description:
    "Posts with custom OG images get more clicks and engagement. Learn why Open Graph images are critical for your content strategy.",
};

export default function WhyOgImagesMatter() {
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
            Why OG Images Matter: The Data Behind Social Sharing
          </h1>
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <time>Feb 8, 2026</time>
            <span>-</span>
            <span>4 min read</span>
          </div>
        </div>

        <div className="prose-invert space-y-6 text-zinc-300 leading-relaxed">
          <p>
            Every time someone shares your link, there&apos;s a split-second
            decision: does the recipient click it or scroll past? The single
            biggest factor in that decision is the <strong>preview image</strong>
            .
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            The visual web
          </h2>
          <p>
            Social media platforms are visual-first. Twitter, LinkedIn, Slack,
            Discord, iMessage - they all render link previews using Open Graph
            tags. The <code>og:image</code> tag controls what image appears in
            that preview.
          </p>
          <p>
            Links without a custom OG image typically show either nothing (a
            blank card), a tiny favicon, or a generic screenshot of the page.
            None of these are compelling.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            What the data shows
          </h2>
          <p>
            Research and case studies consistently show that social media posts
            with images outperform text-only posts:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Posts with images receive significantly higher engagement rates
              across all major platforms.
            </li>
            <li>
              Custom preview images increase click-through rates compared to
              generic or missing previews.
            </li>
            <li>
              Branded images with clear titles help users decide whether the
              content is relevant to them before clicking.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            The problem with static OG images
          </h2>
          <p>
            Many sites use a single static image as their OG image across all
            pages. This means every shared link looks the same, which creates
            two problems:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>No differentiation:</strong> Users can&apos;t tell the
              difference between two links from the same site.
            </li>
            <li>
              <strong>No context:</strong> The image doesn&apos;t tell the user
              what the specific page is about.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Dynamic OG images solve this
          </h2>
          <p>
            With dynamic OG images, every page gets a unique preview that
            includes the page&apos;s title, author, or other relevant content.
            This means:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Each shared link has a unique, contextual preview</li>
            <li>Users immediately understand what the page is about</li>
            <li>Your brand is consistently represented</li>
            <li>No manual image creation for each page</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Who should use dynamic OG images?
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Blogs & content sites:</strong> Each article gets a unique
              preview with its title and author.
            </li>
            <li>
              <strong>SaaS products:</strong> Documentation pages, changelogs,
              and feature pages all get branded previews.
            </li>
            <li>
              <strong>E-commerce:</strong> Product pages show the product name
              and tagline.
            </li>
            <li>
              <strong>Developer tools:</strong> API docs, tutorials, and guides
              get unique, informative previews.
            </li>
          </ul>

          <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-6 mt-10">
            <h3 className="text-lg font-semibold text-white mb-2">
              Start generating OG images
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              Try ogpix free - 100 images/month, no credit card. See the
              difference dynamic OG images make.
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
