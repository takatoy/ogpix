"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function Nav() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-violet-400">og</span>pix
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/playground"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Playground
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Docs
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-zinc-400 hover:text-white transition"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm text-zinc-500 hover:text-white transition"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-zinc-400 hover:text-white transition"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg font-medium transition"
              >
                Sign up free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
