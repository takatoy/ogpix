import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Pricing - OG Image Generation API | ogpix",
  description:
    "ogpix pricing: Free (100 images/mo), Pro $9/mo (5,000 images/mo), Business $29/mo (unlimited). Generate dynamic Open Graph images via API.",
};

const PLANS = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for trying out ogpix",
    features: [
      "100 images/month",
      "All 4 templates",
      "API access",
      "Community support",
      "Standard resolution (1200x630)",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 9,
    description: "For developers and small teams",
    features: [
      "5,000 images/month",
      "All 4 templates",
      "API access",
      "Priority email support",
      "Custom branding",
      "Remove ogpix watermark",
      "Up to 5 API keys",
    ],
    cta: "Get Pro",
    highlighted: true,
  },
  {
    name: "Business",
    price: 29,
    description: "For growing businesses",
    features: [
      "Unlimited images",
      "All 4 templates",
      "API access",
      "Priority support + SLA",
      "Custom branding",
      "Remove ogpix watermark",
      "Up to 5 API keys",
      "99.9% uptime SLA",
    ],
    cta: "Get Business",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <h1 className="text-4xl font-bold text-center mb-4">Pricing</h1>
        <p className="text-zinc-400 text-center mb-12 max-w-lg mx-auto">
          Start free, upgrade when you need more. All plans include access to
          every template and the full API.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 flex flex-col ${
                plan.highlighted
                  ? "border-violet-500 bg-violet-500/5 relative"
                  : "border-zinc-800 bg-zinc-900/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-600 rounded-full text-xs font-semibold">
                  Most popular
                </div>
              )}
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="text-zinc-400 text-sm mt-1">{plan.description}</p>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-extrabold">${plan.price}</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-300 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-violet-400 shrink-0 mt-0.5"
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
                className={`block text-center mt-8 py-3 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? "bg-violet-600 hover:bg-violet-500"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4">FAQ</h3>
          <div className="max-w-2xl mx-auto space-y-6 text-left">
            <div>
              <h4 className="font-semibold mb-1">
                What counts as an image generation?
              </h4>
              <p className="text-zinc-400 text-sm">
                Each API call to /api/og that returns an image counts as one
                generation. Cached results from CDN don&apos;t count.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Can I cancel anytime?</h4>
              <p className="text-zinc-400 text-sm">
                Yes, you can cancel your subscription at any time. You&apos;ll
                keep access until the end of your billing period.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">
                What happens if I exceed my limit?
              </h4>
              <p className="text-zinc-400 text-sm">
                API calls will return a 403 error with a message to upgrade.
                Your existing images will continue to work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
