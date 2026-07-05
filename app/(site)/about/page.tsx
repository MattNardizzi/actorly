import type { Metadata } from "next";
import { Eye, ShieldCheck, Sparkles, MapPin } from "lucide-react";

import PageHero from "@/components/layout/PageHero";
import CTABand from "@/components/layout/CTABand";
import { Kicker } from "@/components/ui/bits";
import { Reveal, Stagger } from "@/components/fx/Reveal";
import StatCounter from "@/components/home/StatCounter";
import { STATS } from "@/lib/mock";

export const metadata: Metadata = {
  title: "About",
  description:
    "Actorly is the total rebuild of castandhire.ie — Ireland's casting database, reimagined for actors and casting directors. Where actors are seen and casting directors see.",
};

const VALUES = [
  { icon: Eye, title: "Everyone gets seen", body: "A profile that does an actor justice, and a search that surfaces the right face — not just the loudest one." },
  { icon: ShieldCheck, title: "A real database", body: "Every actor verified once, so casting directors trust that what they're looking at is genuine and current." },
  { icon: Sparkles, title: "The work, made lighter", body: "Résumé import, self-tapes, shortlisting by feel — the busywork removed so the casting can happen." },
  { icon: MapPin, title: "Made for Ireland", body: "Built around how Irish screen and stage actually cast — from the Abbey to Screen Ireland to the Gaeltacht." },
];

export default function About() {
  return (
    <>
      <PageHero
        index="01"
        kicker="About Actorly"
        title="The casting database,"
        emphasis="rebuilt in a new light."
        sub="Actorly is the ground-up rebuild of castandhire.ie — the same Irish casting community, given the platform it always deserved."
        slateRight="EST. IRELAND"
      />

      <section className="px-[var(--spacing-gutter)] pb-24 md:pb-32">
        <div className="mx-auto max-w-[820px] space-y-8">
          <Reveal>
            <p className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light leading-[1.3] text-bone text-balance">
              For years, castandhire.ie quietly did the work — connecting Irish actors
              with the people casting them. It just never looked, or felt, like the
              talent it held.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[1.02rem] leading-relaxed text-bone-dim text-pretty">
              Actorly is that database reborn: the same roster, the same community, the
              same jobs — rebuilt from the studs into something an actor is proud to send
              and a casting director actually wants to open. Profiles that read like a
              headshot wall. Search that thinks the way you cast. Self-tapes that arrive
              rated and ready. And a surface that finally treats casting like the craft it
              is.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[1.02rem] leading-relaxed text-bone-dim text-pretty">
              We&rsquo;re not here to reinvent the industry. We&rsquo;re here to turn on the
              light — so every actor in Ireland can be seen, and everyone casting can see.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-ash/60 bg-noir-2 py-20">
        <div className="mx-auto max-w-[1500px] px-[var(--spacing-gutter)]">
          <Stagger className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <StatCounter value={STATS.actors} suffix="+" label="Actors on the roster" />
            <StatCounter value={STATS.castingDirectors} suffix="+" label="Casting professionals" />
            <StatCounter value={STATS.productionsCast} suffix="+" label="Productions cast" />
            <StatCounter value={STATS.agents} label="Agencies represented" />
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section className="px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="mb-14">
            <Kicker index="02">What we hold to</Kicker>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.05] text-bone text-balance">
              Four things we refuse to compromise.
            </h2>
          </Reveal>
          <Stagger className="grid gap-px overflow-hidden border border-ash/60 bg-ash/60 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="group bg-noir-2 p-8 transition-colors duration-500 hover:bg-char md:p-10">
                <v.icon className="h-7 w-7 text-tungsten" strokeWidth={1.3} />
                <h3 className="mt-6 font-display text-[1.5rem] font-light text-bone">{v.title}</h3>
                <p className="mt-3 max-w-md text-[0.94rem] leading-relaxed text-bone-dim text-pretty">{v.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABand
        title="Come and be seen."
        sub="Whether you act or you cast, there's a place for you on Actorly."
        primary={{ href: "/join", label: "Join Actorly" }}
        secondary={{ href: "/contact", label: "Talk to us" }}
        note="Formerly castandhire.ie · Made in Ireland"
      />
    </>
  );
}
