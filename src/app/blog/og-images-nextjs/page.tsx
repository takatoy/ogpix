import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "How to Add Dynamic OG Images to Your Next.js App | ogpix",
  description:
    "Step-by-step tutorial: add dynamic Open Graph images to Next.js with ogpix API. Works with App Router and Pages Router. 5 minute setup.",
};

export default function OgImagesNextjs() {
  return (
    <div className="min-h-screen">
      <Nav />
      <article className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-violet-400 hover:text-violet-300 mb-4 inline-block"
          >
            &larr; Back to blog
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            How to Add Dynamic OG Images to Your Next.js App
          </h1>
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <time>Feb 9, 2026</time>
            <span>-</span>
            <span>5 min read</span>
          </div>
        </div>

        <div className="prose-invert space-y-6 text-zinc-300 leading-relaxed">
          <p>
            This tutorial shows you how to add dynamic OG images to a Next.js
            application in under 5 minutes using the ogpix API. The result:
            every page on your site gets a unique, branded preview image when
            shared on social media.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Prerequisites
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>A Next.js application (App Router or Pages Router)</li>
            <li>
              An ogpix API key (
              <Link href="/signup" className="text-violet-400 hover:text-violet-300">
                sign up free
              </Link>
              )
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Step 1: Get your API key
          </h2>
          <p>
            Sign up at ogpix.dev, go to your dashboard, and create an API key.
            The free plan includes 100 images per month.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Step 2: Add OG image meta tags (App Router)
          </h2>
          <p>
            In Next.js App Router, use the <code>metadata</code> export or{" "}
            <code>generateMetadata</code> function:
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 my-4">
            <pre className="text-sm font-mono text-zinc-300 overflow-x-auto">
{`// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  const ogImage = \`https://ogpix.dev/api/og?\` +
    \`template=blog\` +
    \`&title=\${encodeURIComponent(post.title)}\` +
    \`&author=\${encodeURIComponent(post.author)}\` +
    \`&site=myblog.com\` +
    \`&key=YOUR_API_KEY\`;

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Step 2 (alt): Pages Router
          </h2>
          <p>If you&apos;re using the Pages Router, add the meta tags in your Head component:</p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 my-4">
            <pre className="text-sm font-mono text-zinc-300 overflow-x-auto">
{`// pages/blog/[slug].tsx
import Head from "next/head";

export default function BlogPost({ post }) {
  const ogImage = \`https://ogpix.dev/api/og?\` +
    \`template=blog\` +
    \`&title=\${encodeURIComponent(post.title)}\` +
    \`&author=\${encodeURIComponent(post.author)}\` +
    \`&key=YOUR_API_KEY\`;

  return (
    <>
      <Head>
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      {/* ... */}
    </>
  );
}`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Step 3: Choose your template
          </h2>
          <p>
            ogpix offers 4 templates: <code>blog</code>, <code>product</code>,{" "}
            <code>social</code>, and <code>minimal</code>. Each accepts
            different parameters. Try them in the{" "}
            <Link
              href="/playground"
              className="text-violet-400 hover:text-violet-300"
            >
              playground
            </Link>{" "}
            to find what works for your site.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Step 4: Test your images
          </h2>
          <p>
            Use these tools to verify your OG images display correctly:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Twitter Card Validator</li>
            <li>LinkedIn Post Inspector</li>
            <li>Facebook Sharing Debugger</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            That&apos;s it!
          </h2>
          <p>
            Every page now gets a unique OG image automatically. When you add
            new blog posts, the images are generated on the fly - no manual
            work required.
          </p>

          <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-6 mt-10">
            <h3 className="text-lg font-semibold text-white mb-2">
              Get started with ogpix
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              100 free images/month. Set up in 5 minutes.
            </p>
            <Link
              href="/signup"
              className="inline-block px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
