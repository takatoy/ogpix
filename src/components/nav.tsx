"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export function Nav() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-violet-400">og</span>pix
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-zinc-400 hover:text-white transition"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 pb-4 space-y-1">
          <Link href="/playground" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition">
            Playground
          </Link>
          <Link href="/pricing" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition">
            Pricing
          </Link>
          <Link href="/docs" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition">
            Docs
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition">
                Dashboard
              </Link>
              <button onClick={() => { signOut(); setOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-lg transition">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition">
                Log in
              </Link>
              <Link href="/signup" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-medium text-violet-400 hover:text-violet-300 hover:bg-zinc-800/50 rounded-lg transition">
                Sign up free
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
