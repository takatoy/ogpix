"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsagePage() {
  const [usage, setUsage] = useState<{
    current: number;
    limit: number | string;
    plan: string;
    percentage: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/usage")
      .then((r) => r.json())
      .then(setUsage)
      .catch(() => {});
  }, []);

  if (!usage) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-8">Usage</h1>
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  const isUnlimited = usage.limit === "unlimited";
  const limitNum = isUnlimited ? Infinity : (usage.limit as number);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Usage</h1>
      <p className="text-zinc-400 mb-8">
        Track your image generation usage for the current billing period.
      </p>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-zinc-400 mb-1">
              Images generated this month
            </div>
            <div className="text-3xl font-bold">
              {usage.current.toLocaleString()}
              <span className="text-lg font-normal text-zinc-500">
                {" "}
                / {isUnlimited ? "Unlimited" : limitNum.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-zinc-400 mb-1">Plan</div>
            <div className="text-lg font-semibold capitalize">{usage.plan}</div>
          </div>
        </div>

        {!isUnlimited && (
          <>
            <div className="bg-zinc-800 rounded-full h-4 overflow-hidden">
              <div
                className={`h-4 rounded-full transition-all ${
                  usage.percentage > 90
                    ? "bg-red-500"
                    : usage.percentage > 70
                    ? "bg-yellow-500"
                    : "bg-violet-500"
                }`}
                style={{ width: `${Math.min(usage.percentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-zinc-500 mt-2">
              <span>{usage.percentage}% used</span>
              <span>
                {(limitNum - usage.current).toLocaleString()} remaining
              </span>
            </div>
          </>
        )}
      </div>

      {usage.plan === "free" && (
        <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-6">
          <h3 className="font-semibold mb-2">Need more images?</h3>
          <p className="text-zinc-400 text-sm mb-4">
            Upgrade to Pro for 5,000 images/month or Business for unlimited
            generations.
          </p>
          <Link
            href="/dashboard/billing"
            className="inline-block px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition"
          >
            Upgrade plan
          </Link>
        </div>
      )}
    </div>
  );
}
