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
      <div className="border border-tungsten/30 bg-tungsten/[0.04] p-8 text-center">
        <MailCheck className="mx-auto h-10 w-10 text-tungsten" strokeWidth={1.3} />
        <h2 className="mt-5 font-display text-[1.5rem] font-light text-bone">Check your email</h2>
        <p className="mx-auto mt-3 max-w-xs text-[0.9rem] leading-relaxed text-bone-dim">
          We&rsquo;ve sent a verification link to activate your account. Click it and
          you&rsquo;re in.
        </p>
        <Link href="/login" className="link-underline mt-6 inline-block font-mono text-[0.74rem] uppercase tracking-[0.12em] text-tungsten">
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
                "flex flex-col items-start gap-2 border p-4 text-left transition-colors",
                role === r.key
                  ? "border-tungsten/50 bg-tungsten/[0.05]"
                  : "border-ash-2 hover:border-bone-faint",
              )}
            >
              <r.icon className={cn("h-5 w-5", role === r.key ? "text-tungsten" : "text-bone-faint")} strokeWidth={1.5} />
              <span className={cn("text-[0.92rem]", role === r.key ? "text-bone" : "text-bone-dim")}>{r.label}</span>
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
        <div className="flex items-center border border-ash-2 bg-noir px-4 focus-within:border-tungsten/50">
          <input
            type={show ? "text" : "password"}
            required
            placeholder="At least 8 characters"
            className="w-full bg-transparent py-3 text-[0.9rem] text-bone placeholder:text-bone-faint focus:outline-none"
          />
          <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password">
            {show ? <EyeOff className="h-4 w-4 text-bone-faint" /> : <Eye className="h-4 w-4 text-bone-faint" />}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-3 text-[0.84rem] text-bone-dim">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[var(--color-tungsten)]" />
        <span>
          I agree to Actorly&rsquo;s{" "}
          <Link href="/about" className="text-bone underline decoration-ash-2 underline-offset-2 hover:decoration-tungsten">Terms</Link>{" "}
          and{" "}
          <Link href="/about" className="text-bone underline decoration-ash-2 underline-offset-2 hover:decoration-tungsten">Privacy Policy</Link>.
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
        <Link href="/login" className="text-tungsten link-underline">Log in</Link>
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
        className="w-full border border-ash-2 bg-noir px-4 py-3 text-[0.9rem] text-bone placeholder:text-bone-faint focus:border-tungsten/50 focus:outline-none"
      />
    </label>
  );
}
