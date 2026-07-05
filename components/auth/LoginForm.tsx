"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [show, setShow] = useState(false);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <label className="block">
        <span className="kicker mb-2 block">Email</span>
        <input
          type="email"
          required
          placeholder="you@email.ie"
          className="input placeholder:text-bone-faint"
        />
      </label>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="kicker">Password</span>
          <Link href="/login" className="slate transition-colors hover:text-signal-ink">Forgot?</Link>
        </div>
        <div className="input flex items-center gap-2 !py-0 !pr-2 focus-within:border-signal/60 focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-signal)_12%,transparent)]">
          <input
            type={show ? "text" : "password"}
            required
            placeholder="Your password"
            className="w-full bg-transparent py-3 text-[0.9rem] text-bone placeholder:text-bone-faint focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label="Toggle password"
            className="text-bone-faint transition-colors hover:text-signal-ink"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <label className="flex items-center gap-3 text-[0.84rem] text-bone-dim">
        <input type="checkbox" className="h-4 w-4 accent-[var(--color-signal)]" />
        Keep me signed in
      </label>

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-tungsten px-7 py-3.5 text-[0.84rem] font-medium text-noir transition-colors hover:bg-tungsten-soft"
      >
        Log in
        <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
      </button>

      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/portal/actor"
          className="rounded-[2px] border border-ash-2 py-3 text-center font-mono text-[0.72rem] uppercase tracking-[0.1em] text-bone-dim transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-signal/40 hover:text-signal-ink"
        >
          Actor demo
        </Link>
        <Link
          href="/portal/casting"
          className="rounded-[2px] border border-ash-2 py-3 text-center font-mono text-[0.72rem] uppercase tracking-[0.1em] text-bone-dim transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-signal/40 hover:text-signal-ink"
        >
          Casting demo
        </Link>
      </div>

      <p className="text-center text-[0.86rem] text-bone-dim">
        New to Actorly?{" "}
        <Link href="/join" className="text-signal-ink link-underline">Create an account</Link>
      </p>
    </form>
  );
}
