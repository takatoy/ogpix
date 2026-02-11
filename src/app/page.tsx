import Link from "next/link";
import { Nav } from "@/components/nav";

const CODE_EXAMPLE = `// Generate an OG image with one API call
const imageUrl = \`https://ogpix.dev/api/og?
  template=blog
  &title=\${encodeURIComponent("My Blog Post")}
  &author=John Doe
  &theme=dark
  &key=YOUR_API_KEY\`;

// Use it in your HTML
<meta property="og:image" content={imageUrl} />`;

const TEMPLATES = [
  {
    name: "Blog",
    params: "template=blog&title=How%20to%20Build%20a%20SaaS%20in%20One%20Weekend&author=Sarah%20Chen&site=devblog.io&theme=dark",
  },
  {
    name: "Product",
    params: "template=product&title=Ship%20Faster%20Than%20Ever&subtitle=The%20developer%20tool%20you%27ve%20been%20waiting%20for&theme=dark",
  },
  {
    name: "Social",
    params: "template=social&title=Just%20launched%20my%20new%20project!&author=Alex%20Rivera&handle=alexdev&theme=dark",
  },
  {
    name: "Minimal",
    params: "template=minimal&title=Less%20is%20More&subtitle=A%20guide%20to%20minimalist%20design&site=minimal.design&theme=dark",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <div className="text-center">
          <div className="inline-block px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm mb-6">
            Dynamic OG images via API
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Beautiful OG images.
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              One API call.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Generate stunning Open Graph images for your blog posts, product
            pages, and social media with a simple REST API. No design tools
            needed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/signup"
              className="px-8 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold text-lg transition"
            >
              Start free
            </Link>
            <Link
              href="/docs"
              className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold text-lg transition"
            >
              View docs
            </Link>
          </div>
          <p className="text-sm text-zinc-500 mt-4">
            100 free images/month. No credit card required.
          </p>
        </div>
      </section>

      {/* Template Previews */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Professional templates
        </h2>
        <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">
          Choose from beautiful, customizable templates. Pass your content via
          URL parameters and get a perfect image back.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {TEMPLATES.map((t) => (
            <div key={t.name} className="group">
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50 hover:border-violet-500/50 transition">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/og?preview=true&${t.params}`}
                  alt={`${t.name} template`}
                  className="w-full aspect-[1200/630]"
                />
              </div>
              <p className="text-sm text-zinc-400 mt-2 font-medium">
                {t.name} template
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Code Example */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Dead simple API</h2>
            <p className="text-zinc-400 mb-6">
              Just a GET request with your content as query parameters. Returns a
              PNG image. Works with any language, framework, or static site
              generator.
            </p>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm">
                  1
                </span>
                Sign up and get your API key
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm">
                  2
                </span>
                Choose a template and customize
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm">
                  3
                </span>
                Use the URL as your og:image
              </li>
            </ul>
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 overflow-x-auto">
            <pre className="text-sm text-zinc-300 font-mono whitespace-pre">
              {CODE_EXAMPLE}
            </pre>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Simple pricing
        </h2>
        <p className="text-zinc-400 text-center mb-12">
          Start free, scale as you grow.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <PricingCard
            name="Free"
            price={0}
            features={["100 images/month", "All templates", "API access", "Community support"]}
          />
          <PricingCard
            name="Pro"
            price={9}
            features={["5,000 images/month", "All templates", "API access", "Priority support", "Custom branding"]}
            highlighted
          />
          <PricingCard
            name="Business"
            price={29}
            features={["Unlimited images", "All templates", "API access", "Priority support", "Custom branding", "SLA guarantee"]}
          />
        </div>
        <div className="text-center mt-8">
          <Link
            href="/pricing"
            className="text-violet-400 hover:text-violet-300 text-sm"
          >
            See full pricing details &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center bg-gradient-to-br from-violet-600/20 to-pink-600/20 border border-violet-500/20 rounded-2xl p-6 sm:p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to generate beautiful OG images?
          </h2>
          <p className="text-zinc-400 mb-8">
            Join developers who use ogpix to make their content stand out.
          </p>
          <Link
            href="/signup"
            className="px-8 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold text-lg transition inline-block"
          >
            Get started free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-zinc-500">
            <span>
              <span className="text-violet-400 font-semibold">og</span>pix
            </span>
            <div className="flex gap-6">
              <Link href="/pricing" className="hover:text-zinc-300 transition">
                Pricing
              </Link>
              <Link href="/docs" className="hover:text-zinc-300 transition">
                Docs
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 text-xs text-zinc-600">
            <Link
              href="/legal/terms"
              className="hover:text-zinc-400 transition"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/privacy"
              className="hover:text-zinc-400 transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/tokushoho"
              className="hover:text-zinc-400 transition"
            >
              特定商取引法に基づく表記
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PricingCard({
  name,
  price,
  features,
  highlighted,
}: {
  name: string;
  price: number;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 ${
        highlighted
          ? "border-violet-500 bg-violet-500/5"
          : "border-zinc-800 bg-zinc-900/50"
      }`}
    >
      {highlighted && (
        <div className="text-xs text-violet-400 font-semibold mb-2 uppercase tracking-wider">
          Most popular
        </div>
      )}
      <h3 className="text-lg font-semibold">{name}</h3>
      <div className="mt-2 mb-4">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-zinc-500">/mo</span>
      </div>
      <ul className="space-y-2 text-sm text-zinc-400">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-violet-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className={`block text-center mt-6 py-2 rounded-lg font-medium text-sm transition ${
          highlighted
            ? "bg-violet-600 hover:bg-violet-500"
            : "bg-zinc-800 hover:bg-zinc-700"
        }`}
      >
        {price === 0 ? "Start free" : "Get started"}
      </Link>
    </div>
  );
}
