import type { Metadata } from "next";
import { Video, Upload, Inbox, Star, Check } from "lucide-react";

import PageHero from "@/components/layout/PageHero";
import CTABand from "@/components/layout/CTABand";
import Button from "@/components/ui/Button";
import { Kicker, Tag } from "@/components/ui/bits";
import { Reveal, Stagger } from "@/components/fx/Reveal";
import Headshot from "@/components/media/Headshot";
import { ACTORS } from "@/lib/mock";

export const metadata: Metadata = {
  title: "Instacast — Self-tapes",
  description:
    "Instacast is Actorly's self-tape system. Record at home, upload, and send straight to the casting director's dashboard. €5 per tape or €50 for unlimited for a year.",
};

const STEPS = [
  { icon: Inbox, n: "01", title: "The request", body: "A casting director requests a self-tape for your role. It appears in your portal with the sides and the brief." },
  { icon: Video, n: "02", title: "The record", body: "Record at home, on any device. Re-take until it's the one. No app to install, no wrangling files." },
  { icon: Upload, n: "03", title: "The send", body: "Upload and send through Actorly. €5 per tape, or €50 for unlimited for a year — paid securely at send." },
  { icon: Star, n: "04", title: "The verdict", body: "It lands in their dashboard against your application — rated, shortlisted, downloaded or forwarded." },
];

export default function Instacast() {
  return (
    <>
      <PageHero
        index="01"
        kicker="Instacast — self-tapes"
        title="Record at home."
        emphasis="Sent while you sleep."
        sub="Instacast is the self-tape system built into Actorly. When casting asks for a tape, you record, upload and send it straight to their dashboard — no transfers, no chasing, no lost links."
        glow="rec"
        slateRight="SYSTEM · INSTACAST"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/join" variant="record" arrow>
            Start sending tapes
          </Button>
          <div className="flex items-center gap-2">
            <span className="rec-dot h-2.5 w-2.5 rounded-full bg-rec" />
            <span className="slate text-rec/80">€5 per tape · €50 unlimited / year</span>
          </div>
        </div>
      </PageHero>

      {/* How it works */}
      <section className="px-[var(--spacing-gutter)] pb-24 md:pb-32">
        <div className="mx-auto max-w-[1500px]">
          <Stagger className="grid gap-px overflow-hidden border border-ash/60 bg-ash/60 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="group bg-noir-2 p-7 transition-colors duration-500 hover:bg-char">
                <div className="mb-8 flex items-center justify-between">
                  <s.icon className="h-6 w-6 text-rec" strokeWidth={1.4} />
                  <span className="font-mono text-[0.85rem] text-bone-faint">{s.n}</span>
                </div>
                <h3 className="font-display text-[1.35rem] font-light text-bone">{s.title}</h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-bone-dim">{s.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The tape, framed */}
      <section className="border-y border-ash/60 bg-noir-2 px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Kicker index="02">The studio in your pocket</Kicker>
            <h2 className="mt-5 max-w-md font-display text-[clamp(1.8rem,3.6vw,2.9rem)] font-light leading-[1.08] text-bone text-balance">
              One clean pipe from your front room to their shortlist.
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "Records on phone, tablet or laptop — no install",
                "Attached to the exact role you're taping for",
                "Casting rates it 1–6, downloads or forwards it",
                "You control the file; it's gone when the job closes",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-rec" strokeWidth={2} />
                  <span className="text-[0.94rem] text-bone-dim">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-video overflow-hidden border border-ash-2 bg-char frame">
              <Headshot img={ACTORS[5].img} name={ACTORS[5].name} ratio="square" className="h-full" />
              <div className="absolute inset-0 bg-noir/20" />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rec-dot h-2.5 w-2.5 rounded-full bg-rec" />
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-bone">REC 00:42</span>
              </div>
              <div className="absolute right-4 top-4 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-bone-dim">
                Bóthar · MARCUS · Take 3
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-bone-dim">{ACTORS[5].name}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-rec/50 text-rec">
                  <Upload className="h-4 w-4" strokeWidth={1.6} />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mb-14 text-center">
            <Kicker className="justify-center" index="03">
              Two ways to pay
            </Kicker>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.05] text-bone text-balance">
              Pay per tape, or never think about it again.
            </h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col border border-ash/70 bg-noir-2 p-8">
                <span className="slate">Pay as you go</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-[3.5rem] font-light leading-none text-bone">€5</span>
                  <span className="text-bone-dim">/ tape</span>
                </div>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-bone-dim">
                  A flat processing fee each time you send a self-tape. No commitment —
                  ideal if you tape now and then.
                </p>
                <div className="mt-auto pt-8">
                  <Button href="/join" variant="ghost" magnetic={false} className="w-full">
                    Send a single tape
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative flex h-full flex-col border border-rec/40 bg-rec/[0.05] p-8 glow">
                <div className="absolute right-6 top-6">
                  <Tag tone="record">Best value</Tag>
                </div>
                <span className="slate text-rec/80">Unlimited</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-[3.5rem] font-light leading-none text-tungsten">€50</span>
                  <span className="text-bone-dim">/ year</span>
                </div>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-bone-dim">
                  Unlimited self-tapes for twelve months. If you&rsquo;re taping for even a
                  handful of roles, it pays for itself — then keeps paying.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {["Unlimited sends for a year", "Priority upload processing", "Tape history in your portal"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-[0.86rem] text-bone-dim">
                      <Check className="h-4 w-4 text-tungsten" strokeWidth={2} /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Button href="/join" arrow magnetic={false} className="w-full">
                    Go unlimited
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
          <p className="mt-6 text-center slate">Payments processed securely at the point of send</p>
        </div>
      </section>

      <CTABand
        kicker="Lights, camera"
        title="Your next tape, sent in a tap."
        sub="Instacast comes free with every Actorly profile — you only pay when you send."
        primary={{ href: "/join", label: "Create your profile" }}
        secondary={{ href: "/for-actors", label: "For actors" }}
      />
    </>
  );
}
