import type { Metadata } from "next";
import { Video, Upload, Inbox, Star, Check } from "lucide-react";

import PageHero from "@/components/layout/PageHero";
import CTABand from "@/components/layout/CTABand";
import Button from "@/components/ui/Button";
import { Kicker, Tag } from "@/components/ui/bits";
import { Reveal, TextReveal, Stagger } from "@/components/fx/Reveal";
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
        <div className="flex flex-wrap items-center gap-5">
          <Button href="/join" variant="record" arrow>
            Start sending tapes
          </Button>
          <div className="flex items-center gap-2.5 border border-rec/30 bg-rec/[0.04] px-4 py-2.5">
            <span className="rec-dot h-2.5 w-2.5 rounded-full bg-rec" />
            <span className="slate text-rec">€5 per tape · €50 unlimited / year</span>
          </div>
        </div>
      </PageHero>

      {/* How it works */}
      <section className="px-[var(--spacing-gutter)] pb-24 md:pb-32">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="mb-12">
            <Kicker index="01">The pipeline</Kicker>
          </Reveal>
          <Stagger className="grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="group relative bg-noir-2 p-8 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-char"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-rec/30 bg-rec/[0.06] text-rec transition-colors duration-500 group-hover:border-rec/50">
                    <s.icon className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                  <span className="font-mono text-[0.85rem] text-bone-faint transition-colors duration-500 group-hover:text-rec/70">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-display text-[1.35rem] font-light tracking-[-0.02em] text-bone">{s.title}</h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-bone-dim text-pretty">{s.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The tape, framed */}
      <section className="relative overflow-hidden border-y bg-noir-2 px-[var(--spacing-gutter)] py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 h-[58vh] w-[58vh] -translate-y-1/2 translate-x-1/3 rounded-full opacity-40 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(255,68,56,0.15), transparent 68%)" }}
        />
        <div className="relative mx-auto grid max-w-[1500px] items-center gap-14 md:grid-cols-2">
          <div>
            <Reveal>
              <Kicker index="02">The studio in your pocket</Kicker>
            </Reveal>
            <h2 className="mt-5 max-w-md font-display text-[clamp(1.8rem,3.6vw,2.9rem)] font-light leading-[1.06] tracking-[-0.03em] text-bone text-balance">
              <TextReveal as="span" className="block" delay={0.05}>
                One clean pipe from your front
              </TextReveal>
              <TextReveal as="span" className="block" delay={0.16}>
                room to their shortlist.
              </TextReveal>
            </h2>
            <Reveal delay={0.15}>
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
          </div>

          <Reveal delay={0.2}>
            <div className="frame relative aspect-video overflow-hidden border bg-char">
              <Headshot img={ACTORS[5].img} name={ACTORS[5].name} ratio="square" className="h-full" />
              {/* video-still grades: dark top for REC chrome, dark bottom scrim for caption */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/60 to-transparent" />
              <div className="scrim-b pointer-events-none absolute inset-0" />
              {/* recording chrome */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rec-dot h-2.5 w-2.5 rounded-full bg-rec" />
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-rec">REC 00:42</span>
              </div>
              <div className="on-image-dim absolute right-4 top-4 font-mono text-[0.66rem] uppercase tracking-[0.14em]">
                Bóthar · MARCUS · Take 3
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                <span className="on-image-dim font-mono text-[0.66rem] uppercase tracking-[0.14em]">{ACTORS[5].name}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-rec/50 text-rec">
                  <Upload className="h-4 w-4" strokeWidth={1.6} />
                </span>
              </div>
              {/* corner brackets — viewfinder */}
              <Viewfinder />
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
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.035em] text-bone text-balance">
              Pay per tape, or never think about it again.
            </h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col border bg-noir-2 p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ash-2">
                <span className="slate">Pay as you go</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-[3.5rem] font-light leading-none tracking-[-0.03em] text-bone">€5</span>
                  <span className="text-bone-dim">/ tape</span>
                </div>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-bone-dim text-pretty">
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
              <div className="glow-rec relative flex h-full flex-col border border-rec/40 bg-rec/[0.05] p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-rec/60">
                <div className="absolute right-6 top-6">
                  <Tag tone="record">Best value</Tag>
                </div>
                <span className="slate text-rec">Unlimited</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-[3.5rem] font-light leading-none tracking-[-0.03em] text-rec">€50</span>
                  <span className="text-bone-dim">/ year</span>
                </div>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-bone-dim text-pretty">
                  Unlimited self-tapes for twelve months. If you&rsquo;re taping for even a
                  handful of roles, it pays for itself — then keeps paying.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {["Unlimited sends for a year", "Priority upload processing", "Tape history in your portal"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-[0.86rem] text-bone-dim">
                      <Check className="h-4 w-4 shrink-0 text-rec" strokeWidth={2} /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Button href="/join" variant="record" arrow magnetic={false} className="w-full">
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

/** Viewfinder corner brackets — the register's framing ticks. */
function Viewfinder() {
  const corner = "absolute h-5 w-5 border-white/45";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-3">
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}
