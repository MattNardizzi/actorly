"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  annual: number; // per-month when billed annually
  features: string[];
  cta: string;
  highlight?: boolean;
};

const ACTOR_PLANS: Plan[] = [
  {
    name: "Spotlight",
    tagline: "Get on the wall",
    monthly: 0,
    annual: 0,
    features: [
      "Full casting profile",
      "Headshots + gallery",
      "Appear in casting searches",
      "Browse every open job",
    ],
    cta: "Create free profile",
  },
  {
    name: "Pro",
    tagline: "Get to work",
    monthly: 12,
    annual: 9,
    highlight: true,
    features: [
      "Everything in Spotlight",
      "Showreel + voice reel hosting",
      "Apply to unlimited jobs",
      "Priority placement in search",
      "PDF résumé auto-import",
      "Reduced Instacast fees",
    ],
    cta: "Go Pro",
  },
];

export default function PricingPlans() {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      {/* Billing toggle */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <button
          onClick={() => setAnnual(false)}
          className={cn(
            "font-mono text-[0.74rem] uppercase tracking-[0.14em] transition-colors",
            !annual ? "text-bone" : "text-bone-faint",
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setAnnual((a) => !a)}
          aria-label="Toggle billing period"
          className={cn(
            "relative h-7 w-14 rounded-full border transition-colors",
            annual ? "border-tungsten/50 bg-tungsten/20" : "border-ash-2 bg-noir",
          )}
        >
          <span
            className={cn(
              "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-all",
              annual ? "left-8 bg-tungsten" : "left-1 bg-bone-faint",
            )}
          />
        </button>
        <span className="flex items-center gap-2">
          <span
            className={cn(
              "font-mono text-[0.74rem] uppercase tracking-[0.14em] transition-colors",
              annual ? "text-bone" : "text-bone-faint",
            )}
          >
            Annual
          </span>
          <span className="rounded-full border border-tungsten/40 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-tungsten">
            Save 25%
          </span>
        </span>
      </div>

      {/* Actor plans */}
      <div className="mx-auto grid max-w-[900px] gap-5 md:grid-cols-2">
        {ACTOR_PLANS.map((p) => {
          const price = annual ? p.annual : p.monthly;
          return (
            <div
              key={p.name}
              className={cn(
                "flex flex-col border p-8",
                p.highlight ? "border-tungsten/40 bg-tungsten/[0.04] glow" : "border-ash/70 bg-noir-2",
              )}
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-display text-[1.5rem] font-light text-bone">{p.name}</h3>
                  <p className="slate mt-1">{p.tagline}</p>
                </div>
                {p.highlight && (
                  <span className="rounded-full border border-tungsten/40 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-tungsten">
                    Popular
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-[3.2rem] font-light leading-none text-bone">
                  €{price}
                </span>
                <span className="text-bone-dim">{price === 0 ? "forever" : "/ month"}</span>
              </div>
              <p className="mt-2 slate h-4">
                {price > 0 && annual ? `Billed €${p.annual * 12} yearly` : price > 0 ? "Billed monthly" : "No card required"}
              </p>

              <ul className="mt-7 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-tungsten" strokeWidth={2} />
                    <span className="text-[0.9rem] text-bone-dim">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/join"
                className={cn(
                  "group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.82rem] font-medium transition-colors",
                  p.highlight
                    ? "bg-tungsten text-noir hover:bg-tungsten-soft"
                    : "border border-ash-2 text-bone hover:border-tungsten hover:text-tungsten",
                )}
              >
                {p.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Casting note */}
      <div className="mx-auto mt-6 flex max-w-[900px] flex-col items-center justify-between gap-4 border border-ash/60 bg-noir-2 p-6 sm:flex-row">
        <div>
          <h3 className="font-display text-[1.25rem] font-light text-bone">Casting professionals join free</h3>
          <p className="mt-1 text-[0.88rem] text-bone-dim">
            Search, message and post jobs at no cost. You only pay to receive Instacast self-tapes.
          </p>
        </div>
        <Link
          href="/join"
          className="link-underline shrink-0 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-tungsten"
        >
          Join as casting →
        </Link>
      </div>
    </div>
  );
}
