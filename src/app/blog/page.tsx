import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Blog - OG Image Tips & Tutorials | ogpix",
  description:
    "Learn about Open Graph images, dynamic OG image generation, and how to make your content stand out on social media.",
};

const POSTS = [
  {
    slug: "dynamic-og-images-guide",
    title: "The Complete Guide to Dynamic OG Image Generation",
    description:
      "Learn what dynamic OG images are, why they matter, and how to generate them automatically for every page on your site.",
    date: "Feb 10, 2026",
    readTime: "8 min read",
  },
  {
    slug: "og-images-nextjs",
    title: "How to Add Dynamic OG Images to Your Next.js App",
    description:
      "A practical tutorial on adding dynamic Open Graph images to a Next.js application using ogpix API. Works with App Router and Pages Router.",
    date: "Feb 9, 2026",
    readTime: "5 min read",
  },
  {
    slug: "why-og-images-matter",
    title: "Why OG Images Matter: The Data Behind Social Sharing",
    description:
      "Posts with custom OG images get significantly more engagement. Here's why Open Graph images are critical for your content strategy.",
    date: "Feb 8, 2026",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-zinc-400 mb-12">
          Tips, tutorials, and insights on Open Graph images and social sharing.
        </p>

        <div className="space-y-8">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <article className="border border-zinc-800 rounded-xl p-6 hover:border-violet-500/50 transition bg-zinc-900/30">
                <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
                  <time>{post.date}</time>
                  <span>-</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-violet-400 transition">
                  {post.title}
                </h2>
                <p className="text-zinc-400 text-sm">{post.description}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
