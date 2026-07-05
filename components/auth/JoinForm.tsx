"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, MailCheck, Drama, Clapperboard } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "actor" | "casting";

export default function JoinForm() {
  const [role, setRole] = useState<Role>("actor");
  const [show, setShow] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="glass glow relative overflow-hidden rounded-[3px] border border-signal/30 p-8 text-center">
        <div className="brackets pointer-events-none absolute inset-0" />
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full opacity-70 blur-[70px]"
          style={{ background: "radial-gradient(circle, rgba(124,143,255,0.22), transparent 70%)" }}
        />
        <MailCheck className="relative mx-auto h-10 w-10 text-signal" strokeWidth={1.3} />
        <h2 className="relative mt-5 font-display text-[1.5rem] font-light tracking-[-0.02em] text-bone">Check your email</h2>
        <p className="relative mx-auto mt-3 max-w-xs text-[0.9rem] leading-relaxed text-bone-dim">
          We&rsquo;ve sent a verification link to activate your account. Click it and
          you&rsquo;re in.
        </p>
        <Link href="/login" className="link-underline relative mt-6 inline-block font-mono text-[0.74rem] uppercase tracking-[0.12em] text-signal-ink">
          Back to log in →
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-6"
    >
      {/* Role select */}
      <div>
        <p className="kicker mb-3">I&rsquo;m joining as</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "actor" as Role, label: "An actor", icon: Drama, desc: "Build a profile, get seen" },
            { key: "casting" as Role, label: "Casting", icon: Clapperboard, desc: "Search, post, message" },
          ].map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRole(r.key)}
              className={cn(
                "group relative flex flex-col items-start gap-2 rounded-[2px] border p-4 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                role === r.key
                  ? "border-signal/50 bg-signal/[0.06] shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-signal)_18%,transparent)]"
                  : "border-ash-2 hover:-translate-y-0.5 hover:border-signal/40",
              )}
            >
              <r.icon className={cn("h-5 w-5 transition-colors", role === r.key ? "text-signal" : "text-bone-faint group-hover:text-bone-dim")} strokeWidth={1.5} />
              <span className={cn("text-[0.92rem] transition-colors", role === r.key ? "text-bone" : "text-bone-dim")}>{r.label}</span>
              <span className="slate">{r.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input label="First name" name="first" placeholder="Saoirse" required />
        <Input label="Last name" name="last" placeholder="Ní Bhraonáin" />
      </div>
      <Input label="Email" name="email" type="email" placeholder="you@email.ie" required />

      <div>
        <p className="kicker mb-2">Password</p>
        <div className="input flex items-center gap-2 !py-0 !pr-2 focus-within:border-signal/60 focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-signal)_12%,transparent)]">
          <input
            type={show ? "text" : "password"}
            required
            placeholder="At least 8 characters"
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

      <label className="flex items-start gap-3 text-[0.84rem] text-bone-dim">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[var(--color-signal)]" />
        <span>
          I agree to Actorly&rsquo;s{" "}
          <Link href="/about" className="text-bone underline decoration-ash-2 underline-offset-2 transition-colors hover:decoration-signal">Terms</Link>{" "}
          and{" "}
          <Link href="/about" className="text-bone underline decoration-ash-2 underline-offset-2 transition-colors hover:decoration-signal">Privacy Policy</Link>.
        </span>
      </label>

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-tungsten px-7 py-3.5 text-[0.84rem] font-medium text-noir transition-colors hover:bg-tungsten-soft"
      >
        Create account
        <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
      </button>

      <p className="text-center text-[0.86rem] text-bone-dim">
        Already have an account?{" "}
        <Link href="/login" className="text-signal-ink link-underline">Log in</Link>
      </p>
    </form>
  );
}

function Input({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="kicker mb-2 block">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="input placeholder:text-bone-faint"
      />
    </label>
  );
}
