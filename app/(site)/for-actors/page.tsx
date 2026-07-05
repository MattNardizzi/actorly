import type { Metadata } from "next";
import { FileText, Sparkles, Bell, Film, Upload, CheckCircle2, Circle } from "lucide-react";

import PageHero from "@/components/layout/PageHero";
import CTABand from "@/components/layout/CTABand";
import FeatureSplit from "@/components/sections/FeatureSplit";
import ProfilePreview from "@/components/profile/ProfilePreview";
import Button from "@/components/ui/Button";
import { Kicker, Tag } from "@/components/ui/bits";
import { Reveal } from "@/components/fx/Reveal";
import Headshot from "@/components/media/Headshot";
import { ACTORS, JOBS } from "@/lib/mock";

export const metadata: Metadata = {
  title: "For Actors",
  description:
    "Build a casting profile that gets you seen — headshots, showreel, voice reel, training and skills. Upload your PDF résumé and Actorly fills it in. Apply to jobs and send self-tapes with Instacast.",
};

export default function ForActors() {
  return (
    <>
      <PageHero
        index="01"
        kicker="For actors"
        title="Everything on your résumé,"
        emphasis="on one page that gets seen."
        sub="Headshots, showreel, voice reel, training, skills, languages, accents — a profile built the way casting directors actually search. Upload your PDF résumé and we'll populate it for you."
        slateRight="ROLE · THE ACTOR"
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/join" arrow>
            Create your profile
          </Button>
          <Button href="/pricing" variant="ghost">
            See membership
          </Button>
        </div>
      </PageHero>

      {/* The profile itself */}
      <section className="px-[var(--spacing-gutter)] pb-24 md:pb-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mb-8 text-center">
            <Kicker className="justify-center" index="02">
              Your profile
            </Kicker>
            <p className="mt-4 text-[0.9rem] text-bone-faint">
              This is a live example. Yours looks like this the moment you finish it.
            </p>
          </Reveal>
          <Reveal>
            <ProfilePreview actor={ACTORS[0]} />
          </Reveal>
        </div>
      </section>

      {/* Feature rows */}
      <section className="space-y-28 px-[var(--spacing-gutter)] py-8 md:space-y-40">
        <div className="mx-auto max-w-[1500px]">
          <FeatureSplit
            index="03"
            kicker="Résumé import"
            title="Upload your résumé. We build the rest."
            body="Drop in your PDF and Actorly reads your credits, training and skills, then drafts your whole profile. Review, tweak, publish — minutes, not an afternoon."
            bullets={[
              "Credits, training and skills parsed automatically",
              "Every field editable before you publish",
              "Add headshots, gallery and reels in one flow",
            ]}
            media={<ResumeDropMock />}
          />
        </div>

        <div className="mx-auto max-w-[1500px]">
          <FeatureSplit
            reverse
            index="04"
            kicker="Reels"
            title="Reels that play where it matters."
            body="Your showreel and voice reel live on your profile and travel with every application. Casting can filter for actors who have them — so having them gets you found."
            bullets={[
              "Showreel + voice reel hosted on your profile",
              "Searchable: casting can filter for reels",
              "Plays inline in every application you send",
            ]}
            media={<Headshot img={ACTORS[13].img} name={ACTORS[13].name} ratio="portrait" className="frame" />}
          />
        </div>

        <div className="mx-auto max-w-[1500px]">
          <FeatureSplit
            index="05"
            kicker="Jobs"
            title="Only the jobs that actually fit you."
            body="When a casting director posts a role, it lands in your inbox only if you match the brief — gender, playing age, the lot. Click through, apply beside the role, add a cover note."
            media={<JobsFeedMock />}
          />
        </div>

        <div className="mx-auto max-w-[1500px]">
          <FeatureSplit
            reverse
            index="06"
            kicker="Instacast"
            title="Send a self-tape without leaving home."
            body="Asked for a tape? Record, upload and send it straight through Actorly. €5 a tape, or €50 for unlimited for a year. It lands in the casting director's dashboard, rated and ready."
            media={<SelfTapeMock />}
          />
        </div>
      </section>

      {/* Activation */}
      <section className="border-y border-ash/60 bg-noir-2 px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="mb-14">
            <Kicker index="07">Getting approved</Kicker>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.06] text-bone text-balance">
              A quick review keeps the database real.
            </h2>
            <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-bone-dim">
              To apply for jobs, you&rsquo;re verified by our team once. The minimum
              is small — then request activation and we take it from there.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { done: true, title: "Avatar headshot", body: "One clear, current headshot as your avatar." },
              { done: true, title: "Past experience", body: "Your credits — imported from your résumé or added by hand." },
              { done: false, title: "Training", body: "Where you trained. The last piece before you request activation." },
            ].map((s, i) => (
              <div key={s.title} className="border border-ash/60 bg-noir p-7">
                <div className="mb-5 flex items-center justify-between">
                  {s.done ? (
                    <CheckCircle2 className="h-6 w-6 text-tungsten" strokeWidth={1.5} />
                  ) : (
                    <Circle className="h-6 w-6 text-bone-faint" strokeWidth={1.5} />
                  )}
                  <span className="font-mono text-[0.8rem] text-bone-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-[1.3rem] font-light text-bone">{s.title}</h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-bone-dim">{s.body}</p>
              </div>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-wrap items-center gap-4 border border-tungsten/30 bg-tungsten/[0.04] p-6">
            <Sparkles className="h-5 w-5 text-tungsten" />
            <p className="flex-1 text-[0.92rem] text-bone-dim">
              Minimum met? <span className="text-bone">Request activation</span> and an
              administrator reviews your profile — approving you, or pointing out what to
              polish first.
            </p>
            <Button href="/join" variant="ghost" className="px-5 py-2.5 text-[0.78rem]">
              Start your profile
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Notifications control */}
      <section className="px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Kicker index="08">On your terms</Kicker>
            <h2 className="mt-5 max-w-md font-display text-[clamp(1.7rem,3.4vw,2.7rem)] font-light leading-[1.08] text-bone text-balance">
              You decide what reaches you.
            </h2>
            <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-bone-dim">
              New jobs, newsletters, or nothing at all. Change it any time from your
              settings — and give casting directors your number only if you want to be
              reachable by phone.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-ash/70 bg-noir-2 frame">
              <div className="flex items-center gap-2 border-b border-ash/60 px-5 py-3">
                <Bell className="h-4 w-4 text-tungsten" />
                <span className="kicker">Notification settings</span>
              </div>
              {[
                { label: "New job alerts", desc: "Roles that match your profile", on: true },
                { label: "Newsletter", desc: "Industry news, monthly", on: false },
                { label: "Casting can call me", desc: "Share your number with verified casting", on: true },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-ash/40 px-5 py-4 last:border-0">
                  <div>
                    <p className="text-[0.92rem] text-bone">{row.label}</p>
                    <p className="slate">{row.desc}</p>
                  </div>
                  <Toggle on={row.on} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Your next role is a profile away."
        sub="Free to join. Build your profile, request activation, and start applying."
        primary={{ href: "/join", label: "Create your profile" }}
        secondary={{ href: "/pricing", label: "See membership" }}
        note="Formerly castandhire.ie — same community, rebuilt for actors"
      />
    </>
  );
}

/* ---- Mock media panels ---- */
function ResumeDropMock() {
  return (
    <div className="border border-ash/70 bg-noir-2 p-6 frame">
      <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-ash-2 bg-noir/50 py-10 text-center">
        <FileText className="h-8 w-8 text-tungsten" strokeWidth={1.3} />
        <p className="text-[0.9rem] text-bone">Drop your résumé — PDF</p>
        <p className="slate">or browse files</p>
      </div>
      <div className="mt-5 space-y-2">
        {[
          "Parsed — 6 credits",
          "Parsed — 3 training entries",
          "Parsed — 9 skills",
        ].map((l) => (
          <div key={l} className="flex items-center gap-2 text-[0.82rem] text-bone-dim">
            <CheckCircle2 className="h-4 w-4 text-tungsten" strokeWidth={1.6} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function JobsFeedMock() {
  return (
    <div className="divide-y divide-ash/50 border border-ash/70 bg-noir-2 frame">
      {JOBS.slice(0, 4).map((j) => (
        <div key={j.id} className="flex items-center justify-between gap-4 p-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[0.92rem] text-bone">{j.title}</span>
              {j.paid ? (
                <Tag tone="light">Paid</Tag>
              ) : (
                <Tag>Pro-bono</Tag>
              )}
            </div>
            <p className="slate mt-1">
              {j.category} · {j.house}
            </p>
          </div>
          <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-tungsten">
            Apply
          </span>
        </div>
      ))}
    </div>
  );
}

function SelfTapeMock() {
  return (
    <div className="relative aspect-video overflow-hidden border border-ash-2 bg-char frame">
      <Headshot img={ACTORS[5].img} name={ACTORS[5].name} ratio="square" className="h-full" />
      <div className="absolute inset-0 bg-noir/25" />
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className="rec-dot h-2.5 w-2.5 rounded-full bg-rec" />
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-bone">REC 00:37</span>
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-bone-dim">
          Bóthar · MARCUS
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-rec/50 text-rec">
          <Upload className="h-4 w-4" strokeWidth={1.6} />
        </span>
      </div>
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
        on ? "border-tungsten/50 bg-tungsten/20" : "border-ash-2 bg-noir"
      }`}
    >
      <span
        className={`absolute h-4 w-4 rounded-full transition-all ${
          on ? "left-6 bg-tungsten" : "left-1 bg-bone-faint"
        }`}
      />
    </span>
  );
}
