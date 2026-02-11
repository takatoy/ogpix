import type { Metadata } from "next";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "API Documentation - OG Image Generation | ogpix",
  description:
    "ogpix API docs: Generate dynamic Open Graph images with a simple GET request. Supports blog, product, social, and minimal templates.",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8">API Documentation</h1>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-violet-400">
              Getting Started
            </h2>
            <p className="text-zinc-400 mb-4">
              ogpix generates Open Graph images via a simple GET request. Sign up
              for a free account, grab your API key, and start generating images.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-violet-400">
              Base URL
            </h2>
            <code className="block bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm font-mono">
              GET /api/og
            </code>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-violet-400">
              Authentication
            </h2>
            <p className="text-zinc-400 mb-4">
              Pass your API key as a query parameter or via the Authorization
              header:
            </p>
            <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm font-mono overflow-x-auto text-zinc-300">
{`# Query parameter
GET /api/og?key=ogpix_abc123&title=Hello

# Authorization header
GET /api/og?title=Hello
Authorization: Bearer ogpix_abc123`}
            </pre>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-violet-400">
              Parameters
            </h2>
            <div className="border border-zinc-800 rounded-lg overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead className="bg-zinc-900">
                  <tr>
                    <th className="text-left p-3 font-semibold">Parameter</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="p-3 font-mono text-violet-300">template</td>
                    <td className="p-3 text-zinc-400">string</td>
                    <td className="p-3 text-zinc-400">
                      Template name: <code>blog</code>, <code>product</code>,{" "}
                      <code>social</code>, <code>minimal</code>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-violet-300">title</td>
                    <td className="p-3 text-zinc-400">string</td>
                    <td className="p-3 text-zinc-400">
                      Main title text (required)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-violet-300">subtitle</td>
                    <td className="p-3 text-zinc-400">string</td>
                    <td className="p-3 text-zinc-400">Subtitle or description</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-violet-300">author</td>
                    <td className="p-3 text-zinc-400">string</td>
                    <td className="p-3 text-zinc-400">
                      Author name (blog, social templates)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-violet-300">date</td>
                    <td className="p-3 text-zinc-400">string</td>
                    <td className="p-3 text-zinc-400">
                      Date string (blog template)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-violet-300">site</td>
                    <td className="p-3 text-zinc-400">string</td>
                    <td className="p-3 text-zinc-400">
                      Site name (blog, minimal templates)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-violet-300">handle</td>
                    <td className="p-3 text-zinc-400">string</td>
                    <td className="p-3 text-zinc-400">
                      Social handle (social template)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-violet-300">logo</td>
                    <td className="p-3 text-zinc-400">url</td>
                    <td className="p-3 text-zinc-400">
                      Logo URL (product template)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-violet-300">theme</td>
                    <td className="p-3 text-zinc-400">string</td>
                    <td className="p-3 text-zinc-400">
                      <code>dark</code> (default) or <code>light</code>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-violet-300">key</td>
                    <td className="p-3 text-zinc-400">string</td>
                    <td className="p-3 text-zinc-400">Your API key</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-violet-400">
              Templates
            </h2>
            <div className="grid gap-4">
              {[
                {
                  name: "blog",
                  desc: "Title, author, date, site name with gradient background. Perfect for blog posts and articles.",
                },
                {
                  name: "product",
                  desc: "Centered product name and tagline with optional logo. Clean, professional look.",
                },
                {
                  name: "social",
                  desc: "Bold text with avatar and handle. Colorful gradient background for social sharing.",
                },
                {
                  name: "minimal",
                  desc: "Simple title with subtle branding. Monochrome design for a clean look.",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
                >
                  <code className="text-violet-300 font-semibold">
                    {t.name}
                  </code>
                  <p className="text-zinc-400 text-sm mt-1">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-violet-400">
              Examples
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-zinc-300 text-sm mb-2 font-semibold">
                  Blog post OG image:
                </p>
                <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm font-mono overflow-x-auto text-zinc-300">
{`GET /api/og?template=blog&title=My%20Amazing%20Post&author=Jane&site=myblog.com&key=YOUR_KEY`}
                </pre>
              </div>
              <div>
                <p className="text-zinc-300 text-sm mb-2 font-semibold">
                  Product launch:
                </p>
                <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm font-mono overflow-x-auto text-zinc-300">
{`GET /api/og?template=product&title=Introducing%20SuperApp&subtitle=The%20future%20is%20here&theme=dark&key=YOUR_KEY`}
                </pre>
              </div>
              <div>
                <p className="text-zinc-300 text-sm mb-2 font-semibold">
                  Using in HTML:
                </p>
                <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm font-mono overflow-x-auto text-zinc-300">
{`<meta property="og:image" content="https://ogpix.dev/api/og?template=blog&title=My%20Post&key=YOUR_KEY" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-violet-400">
              Rate Limits
            </h2>
            <p className="text-zinc-400">
              All plans are rate limited to 10 requests per second per API key.
              If you exceed this, you&apos;ll receive a 429 status code.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-violet-400">
              Response
            </h2>
            <p className="text-zinc-400 mb-4">
              Successful requests return a <code>200</code> status with a PNG
              image (1200x630px). The Content-Type header is{" "}
              <code>image/png</code>.
            </p>
            <p className="text-zinc-400">Error responses return JSON:</p>
            <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm font-mono overflow-x-auto text-zinc-300 mt-2">
{`{
  "error": "Usage limit exceeded",
  "current": 100,
  "limit": 100,
  "upgrade": "https://ogpix.dev/pricing"
}`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
