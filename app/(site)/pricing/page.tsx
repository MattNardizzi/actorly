import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import CTABand from "@/components/layout/CTABand";
import PricingPlans from "@/components/pricing/PricingPlans";
import FAQ from "@/components/pricing/FAQ";
import { Kicker } from "@/components/ui/bits";
import { Reveal } from "@/components/fx/Reveal";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Actorly membership for actors — a free Spotlight profile or Pro for €9/month. Casting professionals join free. Instacast self-tapes are €5 each or €50 unlimited for a year.",
};

export default function Pricing() {
  return (
    <>
      <PageHero
        index="01"
        kicker="Membership"
        title="Priced for the work,"
        emphasis="not the waiting room."
        sub="A free profile to get seen, Pro when you're ready to work, and nothing hidden. Casting professionals join free."
        slateRight="RATES · 2026"
      />

      <section className="px-[var(--spacing-gutter)] pb-24 md:pb-32">
        <PricingPlans />
      </section>

      <section className="border-t border-ash/60 bg-noir-2 px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="mb-14 text-center">
            <Kicker className="justify-center" index="02">
              Questions
            </Kicker>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.05] text-bone text-balance">
              Everything you might ask.
            </h2>
          </Reveal>
          <FAQ />
        </div>
      </section>

      <CTABand
        title="Get on the wall."
        sub="Free to join. Upgrade when it's time to work."
        primary={{ href: "/join", label: "Create your profile" }}
        secondary={{ href: "/for-actors", label: "For actors" }}
      />
    </>
  );
}
