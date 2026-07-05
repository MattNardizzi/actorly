import Link from "next/link";
import { ArrowUpRight, Clapperboard, Search, Sparkles, Upload } from "lucide-react";

import Button from "@/components/ui/Button";
import { Kicker, Tag, Rule } from "@/components/ui/bits";
import { TextReveal, Reveal, Stagger } from "@/components/fx/Reveal";
import StatCounter from "@/components/home/StatCounter";
import CastWall from "@/components/home/CastWall";
import FaceWall from "@/components/home/FaceWall";
import Headshot from "@/components/media/Headshot";
import { ACTORS, STATS } from "@/lib/mock";

export default function Home() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-20 pt-[68px]">
        {/* the living wall of faces */}
        <FaceWall />

        {/* cold key-light behind the headline */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[42%] h-[75vh] w-[75vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(124,143,255,0.16), rgba(200,214,255,0.05) 45%, transparent 70%)",
          }}
        />
        {/* reading stage — faces stay vivid up top; the lower canvas resolves to a
            clean white field where the headline, sub-copy and buttons live. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.30) 28%, rgba(255,255,255,0.9) 54%, #ffffff 72%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1600px] px-[var(--spacing-gutter)]">
          <Reveal>
            <Kicker index="01" className="mb-8">
              Formerly castandhire.ie — reborn
            </Kicker>
          </Reveal>

          <h1 className="hero-type text-bone">
            <TextReveal as="span" className="block" delay={0.1}>
              Where actors are
            </TextReveal>
            <TextReveal as="span" className="block text-signal-ink" delay={0.24}>
              seen.
            </TextReveal>
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal delay={0.5}>
              <p className="max-w-md text-[1.05rem] leading-relaxed text-bone-dim text-pretty">
                Ireland&rsquo;s casting database — profiles, showreels, self-tapes
                and jobs in one place, built for the work and the people who do it.
              </p>
            </Reveal>

            <Reveal delay={0.6} className="flex flex-wrap items-center gap-4">
              <Button href="/join" arrow>
                Join as an actor
              </Button>
              <Button href="/for-casting" variant="ghost">
                I&rsquo;m casting
              </Button>
            </Reveal>
          </div>
        </div>

        {/* scroll cue */}
        <div className="relative mx-auto mt-14 flex w-full max-w-[1600px] items-center gap-4 px-[var(--spacing-gutter)]">
          <span className="h-8 w-px bg-gradient-to-b from-signal/60 to-transparent" aria-hidden />
          <span className="slate">Scroll — the room is warming up</span>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="border-y bg-noir-2 py-20">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          <Stagger className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <StatCounter value={STATS.actors} suffix="+" label="Actors on the roster" />
            <StatCounter value={STATS.castingDirectors} suffix="+" label="Casting professionals" />
            <StatCounter value={STATS.productionsCast} suffix="+" label="Productions cast" />
            <StatCounter value={STATS.agents} label="Agencies represented" />
          </Stagger>
        </div>
      </section>

      {/* ===================== TWO AUDIENCES ===================== */}
      <section className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)] py-24 md:py-32">
        <Reveal className="mb-14">
          <Kicker index="02">Two sides of the lens</Kicker>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(2rem,4.8vw,4.2rem)] font-light leading-[1.02] tracking-[-0.035em] text-bone text-balance">
            One database. The actor building a career, and the director who&rsquo;ll{" "}
            <span className="sheen">change it.</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              href: "/for-actors",
              tag: "For actors",
              title: "Be ready when the call comes.",
              body: "Headshots, showreel, voice reel, training and skills — a profile that says everything before you walk in the room. Upload your PDF résumé and we build it for you.",
              actor: ACTORS[0],
            },
            {
              href: "/for-casting",
              tag: "For casting",
              title: "Find the face you haven't met yet.",
              body: "Search 12,000+ Irish actors by fifteen attributes, post a job in minutes, request self-tapes and shortlist by feel — all in one workspace.",
              actor: ACTORS[6],
            },
          ].map((panel) => (
            <Reveal key={panel.href}>
              <Link
                href={panel.href}
                className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden border bg-noir-2 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-signal/40 md:min-h-[560px] md:p-10"
              >
                <div className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-65">
                  <Headshot img={panel.actor.img} name={panel.actor.name} ratio="square" className="h-full" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-transparent" />
                <div className="brackets pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-5 flex items-center justify-between">
                    <Tag tone="light">{panel.tag}</Tag>
                    <ArrowUpRight className="h-6 w-6 text-bone-dim transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
                  </div>
                  <h3 className="max-w-md font-display text-[clamp(1.6rem,3vw,2.5rem)] font-light leading-[1.06] tracking-[-0.03em] text-bone text-balance">
                    {panel.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-bone-dim text-pretty">
                    {panel.body}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CAST WALL ===================== */}
      <CastWall />

      {/* ===================== INSTACAST ===================== */}
      <section className="relative overflow-hidden border-y bg-noir py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 translate-x-1/3 rounded-full opacity-40 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,68,56,0.16), transparent 68%)",
          }}
        />
        <div className="relative mx-auto grid max-w-[1600px] items-center gap-14 px-[var(--spacing-gutter)] md:grid-cols-2">
          <div>
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="rec-dot h-2.5 w-2.5 rounded-full bg-rec" />
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-rec">
                  Instacast — self-tapes
                </span>
              </div>
            </Reveal>
            <h2 className="max-w-lg font-display text-[clamp(2rem,4.5vw,3.7rem)] font-light leading-[1.02] tracking-[-0.03em] text-bone text-balance">
              Record at home. In their dashboard by morning.
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-bone-dim text-pretty">
                When a casting director requests a self-tape, you record, upload and
                send it straight through Actorly — no file transfers, no chasing.
                They rate it, shortlist it, forward it.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-baseline gap-2 border border-ash-2 px-5 py-3">
                  <span className="font-display text-2xl text-bone">€5</span>
                  <span className="slate">per tape</span>
                </div>
                <div className="glow-rec flex items-baseline gap-2 border border-rec/40 px-5 py-3">
                  <span className="font-display text-2xl text-rec">€50</span>
                  <span className="slate text-rec/70">unlimited · one year</span>
                </div>
              </div>
              <div className="mt-8">
                <Button href="/instacast" variant="record" arrow magnetic>
                  How Instacast works
                </Button>
              </div>
            </Reveal>
          </div>

          {/* mock self-tape frame */}
          <Reveal delay={0.2}>
            <div className="frame relative aspect-video overflow-hidden border bg-char">
              <Headshot img={ACTORS[5].img} name={ACTORS[5].name} ratio="square" className="h-full" />
              <div className="absolute inset-0 bg-black/20" />
              {/* video-still gradients — dark top for chrome, scrim at bottom */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/60 to-transparent"
              />
              <div aria-hidden className="scrim-b pointer-events-none absolute inset-0" />
              {/* recording chrome */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rec-dot h-2.5 w-2.5 rounded-full bg-rec" />
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-rec">
                  REC 00:42
                </span>
              </div>
              <div className="on-image-dim absolute right-4 top-4 font-mono text-[0.62rem] uppercase tracking-[0.16em]">
                Bóthar · MARCUS · Take 3
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                <span className="on-image-dim font-mono text-[0.62rem] uppercase tracking-[0.16em]">
                  {ACTORS[5].name}
                </span>
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

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)] py-24 md:py-32">
        <Reveal className="mb-16">
          <Kicker index="05">The process</Kicker>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.7rem)] font-light leading-[1.02] tracking-[-0.03em] text-bone text-balance">
            From empty profile to on set, in three moves.
          </h2>
        </Reveal>

        <Stagger className="grid gap-px overflow-hidden border md:grid-cols-3" >
          {[
            {
              icon: Sparkles,
              n: "01",
              title: "Build your profile",
              body: "Upload your PDF résumé and Actorly fills it in — headshots, credits, training, skills, reels. Request activation and admin approves you for jobs.",
            },
            {
              icon: Search,
              n: "02",
              title: "Get seen",
              body: "Casting directors search on exactly the attributes that matter and post jobs that land in your inbox only when they fit you.",
            },
            {
              icon: Clapperboard,
              n: "03",
              title: "Get cast",
              body: "Apply with a cover note, send an Instacast self-tape, get shortlisted and messaged — right through the platform.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="group relative bg-noir-2 p-8 transition-colors duration-500 hover:bg-char md:p-10"
              style={{ boxShadow: "0 0 0 1px var(--line)" }}
            >
              <div className="mb-8 flex items-center justify-between">
                <step.icon className="h-6 w-6 text-signal" strokeWidth={1.4} />
                <span className="font-mono text-[0.9rem] text-bone-faint">{step.n}</span>
              </div>
              <h3 className="font-display text-[1.5rem] font-light tracking-[-0.02em] text-bone">{step.title}</h3>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-bone-dim text-pretty">
                {step.body}
              </p>
            </div>
          ))}
        </Stagger>
      </section>

      {/* ===================== CTA CLOSER ===================== */}
      <section className="relative overflow-hidden py-32 md:py-44">
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(124,143,255,0.14), transparent 68%)",
          }}
        />
        <div className="relative mx-auto max-w-[1600px] px-[var(--spacing-gutter)] text-center">
          <Kicker className="justify-center">Your move</Kicker>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.6rem,7vw,6.5rem)] font-light leading-[0.94] tracking-[-0.04em] text-bone text-balance">
            Step into the <span className="sheen">light.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[1.02rem] leading-relaxed text-bone-dim text-pretty">
            Join the actors and casting directors making Irish screen and stage.
            Free to browse. Built to get you seen.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/join" arrow>
              Create your profile
            </Button>
            <Button href="/pricing" variant="ghost">
              See membership
            </Button>
          </div>
          <Rule className="mx-auto mt-20 max-w-md" />
          <p className="mt-6 slate">A total facelift of castandhire.ie — same community, new light</p>
        </div>
      </section>
    </>
  );
}

/** Viewfinder corner brackets. */
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
