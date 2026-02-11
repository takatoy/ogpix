"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function BillingPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  const [usage, setUsage] = useState<{
    plan: string;
    current: number;
    limit: number | string;
  } | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/usage")
      .then((r) => r.json())
      .then(setUsage)
      .catch(() => {});
  }, []);

  async function handleUpgrade(plan: "pro" | "business") {
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session");
      }
    } finally {
      setLoading(null);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Billing</h1>
      <p className="text-zinc-400 mb-8">Manage your subscription and plan.</p>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6 text-emerald-400 text-sm">
          Payment successful! Your plan has been upgraded.
        </div>
      )}

      {canceled && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 text-yellow-400 text-sm">
          Payment canceled. Your plan was not changed.
        </div>
      )}

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-8">
        <div className="text-sm text-zinc-400 mb-1">Current plan</div>
        <div className="text-2xl font-bold capitalize mb-1">
          {usage?.plan || "free"}
        </div>
        <div className="text-sm text-zinc-400">
          {usage?.plan === "free" && "100 images/month"}
          {usage?.plan === "pro" && "5,000 images/month - $9/month"}
          {usage?.plan === "business" && "Unlimited images - $29/month"}
        </div>
      </div>

      {usage?.plan !== "business" && (
        <div className="grid md:grid-cols-2 gap-6">
          {usage?.plan !== "pro" && (
            <div className="border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-bold">Pro</h3>
              <div className="text-3xl font-bold mt-2">
                $9<span className="text-sm font-normal text-zinc-500">/mo</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li>5,000 images/month</li>
                <li>All templates</li>
                <li>Priority support</li>
              </ul>
              <button
                onClick={() => handleUpgrade("pro")}
                disabled={loading !== null}
                className="w-full mt-6 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-lg font-medium text-sm transition"
              >
                {loading === "pro" ? "Redirecting..." : "Upgrade to Pro"}
              </button>
            </div>
          )}
          <div className="border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-bold">Business</h3>
            <div className="text-3xl font-bold mt-2">
              $29<span className="text-sm font-normal text-zinc-500">/mo</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>Unlimited images</li>
              <li>All templates</li>
              <li>Priority support + SLA</li>
            </ul>
            <button
              onClick={() => handleUpgrade("business")}
              disabled={loading !== null}
              className="w-full mt-6 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-lg font-medium text-sm transition"
            >
              {loading === "business"
                ? "Redirecting..."
                : "Upgrade to Business"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
