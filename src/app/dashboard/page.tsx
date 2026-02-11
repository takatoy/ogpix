"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [usage, setUsage] = useState<{
    current: number;
    limit: number | string;
    plan: string;
    percentage: number;
  } | null>(null);
  const [keyCount, setKeyCount] = useState(0);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [resending, setResending] = useState(false);
  const [resentOk, setResentOk] = useState(false);

  useEffect(() => {
    fetch("/api/usage")
      .then((r) => r.json())
      .then(setUsage)
      .catch(() => {});
    fetch("/api/keys")
      .then((r) => r.json())
      .then((data) => setKeyCount(Array.isArray(data) ? data.length : 0))
      .catch(() => {});
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => setEmailVerified(!!data.emailVerified))
      .catch(() => {});
  }, []);

  async function resendVerification() {
    setResending(true);
    try {
      const res = await fetch("/api/auth/verify", { method: "POST" });
      if (res.ok) {
        setResentOk(true);
        setTimeout(() => setResentOk(false), 5000);
      }
    } finally {
      setResending(false);
    }
  }

  const user = session?.user as Record<string, unknown> | undefined;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-zinc-400 mb-8">
        Welcome back, {String(user?.name || user?.email || "there")}
      </p>

      {emailVerified === false && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-amber-400 text-sm">
              Verify your email
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Check your inbox to verify your email and unlock API key creation.
            </p>
          </div>
          <button
            onClick={resendVerification}
            disabled={resending || resentOk}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 rounded-lg text-xs font-medium transition shrink-0"
          >
            {resentOk ? "Sent!" : resending ? "Sending..." : "Resend email"}
          </button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <div className="text-sm text-zinc-400 mb-1">Current Plan</div>
          <div className="text-2xl font-bold capitalize">
            {usage?.plan || "free"}
          </div>
          <Link
            href="/dashboard/billing"
            className="text-violet-400 text-sm mt-2 inline-block hover:text-violet-300"
          >
            {usage?.plan === "free" ? "Upgrade" : "Manage"} &rarr;
          </Link>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <div className="text-sm text-zinc-400 mb-1">Images This Month</div>
          <div className="text-2xl font-bold">
            {usage?.current ?? 0}{" "}
            <span className="text-sm font-normal text-zinc-500">
              / {usage?.limit ?? 100}
            </span>
          </div>
          {usage && typeof usage.limit === "number" && (
            <div className="mt-3 bg-zinc-800 rounded-full h-2">
              <div
                className="bg-violet-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(usage.percentage, 100)}%` }}
              />
            </div>
          )}
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <div className="text-sm text-zinc-400 mb-1">API Keys</div>
          <div className="text-2xl font-bold">{keyCount}</div>
          <Link
            href="/dashboard/keys"
            className="text-violet-400 text-sm mt-2 inline-block hover:text-violet-300"
          >
            Manage keys &rarr;
          </Link>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Start</h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <p>
            1. Go to{" "}
            <Link
              href="/dashboard/keys"
              className="text-violet-400 hover:text-violet-300"
            >
              API Keys
            </Link>{" "}
            and create a new key
          </p>
          <p>2. Make a GET request to generate an image:</p>
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-mono text-xs overflow-x-auto text-zinc-300">
{`curl "https://ogpix.dev/api/og?template=blog&title=Hello%20World&key=YOUR_API_KEY" -o og-image.png`}
          </pre>
          <p>3. Use the URL as your og:image meta tag</p>
        </div>
      </div>
    </div>
  );
}
