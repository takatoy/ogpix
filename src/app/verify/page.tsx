"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Suspense } from "react";

function VerifyContent() {
  const params = useSearchParams();
  const success = params.get("success") === "true";
  const error = params.get("error");

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-md mx-auto px-4 sm:px-6 pt-16 sm:pt-24 text-center">
        {success ? (
          <>
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-emerald-400"
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
            </div>
            <h1 className="text-2xl font-bold mb-3">Email verified!</h1>
            <p className="text-zinc-400 mb-8">
              Your email has been verified. You can now create API keys and start
              generating OG images.
            </p>
            <Link
              href="/dashboard/keys"
              className="inline-block px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold transition"
            >
              Create your first API key
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-3">Verification failed</h1>
            <p className="text-zinc-400 mb-8">
              {error === "missing_token"
                ? "No verification token provided."
                : "This verification link is invalid or has expired. Please request a new one from your dashboard."}
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold transition"
            >
              Go to dashboard
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen">
          <Nav />
          <div className="max-w-md mx-auto px-4 sm:px-6 pt-16 sm:pt-24 text-center">
            <p className="text-zinc-400">Verifying...</p>
          </div>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
