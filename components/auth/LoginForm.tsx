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
          className="w-full border border-ash-2 bg-noir px-4 py-3 text-[0.9rem] text-bone placeholder:text-bone-faint focus:border-tungsten/50 focus:outline-none"
        />
      </label>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="kicker">Password</span>
          <Link href="/login" className="slate hover:text-bone">Forgot?</Link>
        </div>
        <div className="flex items-center border border-ash-2 bg-noir px-4 focus-within:border-tungsten/50">
          <input
            type={show ? "text" : "password"}
            required
            placeholder="Your password"
            className="w-full bg-transparent py-3 text-[0.9rem] text-bone placeholder:text-bone-faint focus:outline-none"
          />
          <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password">
            {show ? <EyeOff className="h-4 w-4 text-bone-faint" /> : <Eye className="h-4 w-4 text-bone-faint" />}
          </button>
        </div>
      </div>

      <label className="flex items-center gap-3 text-[0.84rem] text-bone-dim">
        <input type="checkbox" className="h-4 w-4 accent-[var(--color-tungsten)]" />
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
        <Link href="/portal/actor" className="border border-ash-2 py-3 text-center font-mono text-[0.72rem] uppercase tracking-[0.1em] text-bone-dim transition-colors hover:border-tungsten/40 hover:text-tungsten">
          Actor demo
        </Link>
        <Link href="/portal/casting" className="border border-ash-2 py-3 text-center font-mono text-[0.72rem] uppercase tracking-[0.1em] text-bone-dim transition-colors hover:border-tungsten/40 hover:text-tungsten">
          Casting demo
        </Link>
      </div>

      <p className="text-center text-[0.86rem] text-bone-dim">
        New to Actorly?{" "}
        <Link href="/join" className="text-tungsten link-underline">Create an account</Link>
      </p>
    </form>
  );
}
