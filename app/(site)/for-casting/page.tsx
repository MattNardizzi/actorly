import type { Metadata } from "next";
import { Users, Star, Download, Forward, MessageSquare, Send } from "lucide-react";

import PageHero from "@/components/layout/PageHero";
import CTABand from "@/components/layout/CTABand";
import FeatureSplit from "@/components/sections/FeatureSplit";
import CastingSearch from "@/components/casting/CastingSearch";
import AgentsCopyTool from "@/components/casting/AgentsCopyTool";
import Button from "@/components/ui/Button";
import { Kicker, Tag } from "@/components/ui/bits";
import { Reveal } from "@/components/fx/Reveal";
import { face, JOBS } from "@/lib/mock";

export const metadata: Metadata = {
  title: "For Casting Directors",
  description:
    "Search 12,000+ Irish actors by fifteen attributes, post jobs in minutes, request self-tapes with Instacast, shortlist by feel and message actors — all in one casting workspace.",
};

export default function ForCasting() {
  return (
    <>
      <PageHero
        index="01"
        kicker="For casting directors"
        title="Find the face"
        emphasis="you haven't met yet."
        sub="Search the whole of Irish talent by the attributes that matter, post a job in minutes, request self-tapes and shortlist by instinct — in one workspace built for the way you actually cast."
        slateRight="ROLE · THE DIRECTOR"
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/join" arrow>
            Join as casting
          </Button>
          <Button href="/portal/casting" variant="ghost">
            Open the workspace
          </Button>
        </div>
      </PageHero>

      {/* Live search */}
      <section className="px-[var(--spacing-gutter)] pb-24 md:pb-32">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="mb-6">
            <Kicker index="02">Search the database</Kicker>
            <p className="mt-3 text-[0.9rem] text-bone-faint">
              This one&rsquo;s live — try the filters. Gender, body type, hair, eyes,
              ethnicity, reels and more.
            </p>
          </Reveal>
          <Reveal>
            <CastingSearch defaultOpen />
          </Reveal>
        </div>
      </section>

      {/* Post a job */}
      <section className="border-t border-ash/60 px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <FeatureSplit
            index="03"
            kicker="Post a job"
            title="A casting call, live in minutes."
            body="Set the project, category and deadline, mark it paid or pro-bono with the terms, then add each role — character, age range, gender, ethnicity, and whether they can self-tape for it."
            bullets={[
              "Every category: feature, short, TV, theatre, ad, voice, music video, print",
              "Per-role self-tape toggle",
              "Paid or pro-bono, with the terms spelled out",
            ]}
            media={<JobPostMock />}
          />
        </div>
      </section>

      {/* Send options + agents */}
      <section className="border-t border-ash/60 bg-noir-2 px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="mb-14">
            <Kicker index="04">Who gets it</Kicker>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.06] text-bone text-balance">
              Send to the whole database — and to the agents, your way.
            </h2>
            <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-bone-dim">
              Send the job to every eligible actor on Actorly — or just the independents,
              or just those with agents. Then grab a ready-made BCC list of agents by
              category and send from your own inbox.
            </p>
          </Reveal>

          <div className="grid items-start gap-6 md:grid-cols-[1fr_1.1fr]">
            <div className="space-y-3">
              {[
                { label: "All actors", desc: "Everyone who matches the role's criteria", n: "8,214 eligible" },
                { label: "Independent only", desc: "Actors without an agent", n: "3,902 eligible" },
                { label: "Agented only", desc: "Actors represented by an agency", n: "4,312 eligible" },
              ].map((o, i) => (
                <label
                  key={o.label}
                  className="flex cursor-pointer items-center gap-4 border border-ash/60 bg-noir p-5 transition-colors hover:border-tungsten/40"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      i === 0 ? "border-tungsten" : "border-ash-2"
                    }`}
                  >
                    {i === 0 && <span className="h-2.5 w-2.5 rounded-full bg-tungsten" />}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[0.95rem] text-bone">{o.label}</span>
                    <span className="slate">{o.desc}</span>
                  </span>
                  <span className="font-mono text-[0.7rem] text-bone-faint">{o.n}</span>
                </label>
              ))}
              <div className="flex items-center gap-3 border border-ash/60 bg-noir/50 p-5">
                <Send className="h-4 w-4 text-tungsten" />
                <p className="text-[0.86rem] text-bone-dim">
                  Actors get an email only if they fit the role — right gender, right
                  playing age. No spray-and-pray.
                </p>
              </div>
            </div>

            <Reveal delay={0.1}>
              <AgentsCopyTool />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="border-t border-ash/60 px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <FeatureSplit
            reverse
            index="05"
            kicker="Applications"
            title="Shortlist by instinct, not spreadsheets."
            body="Every applicant appears as a thumbnail under the role. Rate each one to six, filter by reels, agents or who you've contacted, and sort by recent or name. The ones you love rise to the top."
            bullets={[
              "1–6 rating on every thumbnail",
              "Filter: has reel · agented · contacted · sent a self-tape",
              "Batch-message or invite your favourites in one action",
            ]}
            media={<ApplicantsMock />}
          />
        </div>
      </section>

      {/* Self-tapes */}
      <section className="border-t border-ash/60 bg-noir-2 px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <FeatureSplit
            index="06"
            kicker="Instacast"
            title="Self-tapes, in your dashboard by morning."
            body="Request a tape and it comes back through Actorly — attached to the right actor, the right role. Rate it one to six, download it, or forward it to a colleague who isn't on the platform."
            bullets={[
              "Tapes attached to the exact role and applicant",
              "Rate, download, or forward to anyone",
              "Batch-invite all your sixes to tape at once",
            ]}
            media={<TapeGridMock />}
          />
        </div>
      </section>

      {/* Messaging */}
      <section className="border-t border-ash/60 px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1500px] items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Kicker index="07">Messaging</Kicker>
            <h2 className="mt-5 max-w-md font-display text-[clamp(1.7rem,3.4vw,2.7rem)] font-light leading-[1.08] text-bone text-balance">
              Talk to actors without leaving Actorly.
            </h2>
            <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-bone-dim">
              A simple, built-in inbox. Message an actor, they reply in-platform. If
              they&rsquo;re represented, Actorly tells you the message also reaches their
              agent — no surprises, no crossed wires.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ChatMock />
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Cast your next project in the light."
        sub="Free to search. Join to post jobs, request self-tapes and message talent."
        primary={{ href: "/join", label: "Join as casting" }}
        secondary={{ href: "/portal/casting", label: "Preview the workspace" }}
        note="Casting professionals — no profile to build, just the work"
      />
    </>
  );
}

/* ---- Mock media ---- */
function JobPostMock() {
  const job = JOBS[0];
  return (
    <div className="border border-ash/70 bg-noir-2 frame">
      <div className="flex items-center justify-between border-b border-ash/60 px-5 py-3">
        <span className="kicker">New casting call</span>
        <Tag tone="light">Draft</Tag>
      </div>
      <div className="space-y-4 p-5">
        <Field label="Project title" value={job.title} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category" value={job.category} />
          <Field label="Deadline" value="28 Jul 2026" />
        </div>
        <Field label="Remuneration" value={job.pay} />
        <div className="border-t border-ash/50 pt-4">
          <p className="kicker mb-3">Roles</p>
          <div className="space-y-2">
            {job.roles.map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-2 border border-ash/50 bg-noir px-3 py-2.5">
                <div>
                  <span className="font-mono text-[0.74rem] uppercase tracking-[0.1em] text-bone">{r.name}</span>
                  <p className="slate mt-0.5">{r.gender} · {r.ageRange}</p>
                </div>
                {r.selfTape && <Tag tone="record">Self-tape</Tag>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="kicker mb-1.5">{label}</p>
      <div className="border border-ash-2 bg-noir px-3 py-2.5 text-[0.86rem] text-bone">{value}</div>
    </div>
  );
}

function ApplicantsMock() {
  const imgs = [5, 12, 9, 44, 33, 20];
  return (
    <div className="border border-ash/70 bg-noir-2 p-5 frame">
      <div className="mb-4 flex items-center gap-2">
        <Users className="h-4 w-4 text-tungsten" />
        <span className="kicker">MÁIRE · 214 applicants</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {imgs.map((n, i) => (
          <div key={n} className="group relative aspect-[3/4] overflow-hidden border border-ash/60 bg-char">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={face(n)} alt="Applicant thumbnail" className="duotone h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-noir/80 px-2 py-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <Star
                    key={s}
                    className={`h-2.5 w-2.5 ${s <= ((i % 6) + 1) ? "text-tungsten" : "text-ash-2"}`}
                    fill={s <= ((i % 6) + 1) ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TapeGridMock() {
  const imgs = [15, 60, 25];
  return (
    <div className="border border-ash/70 bg-noir-2 p-5 frame">
      <div className="mb-4 flex items-center gap-2">
        <span className="rec-dot h-2 w-2 rounded-full bg-rec" />
        <span className="kicker">Self-tapes · SEÁN</span>
      </div>
      <div className="space-y-3">
        {imgs.map((n, i) => (
          <div key={n} className="flex items-center gap-3 border border-ash/60 bg-noir p-3">
            <div className="relative h-14 w-20 shrink-0 overflow-hidden bg-char">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={face(n)} alt="Self-tape still" className="duotone h-full w-full object-cover" />
              <span className="absolute left-1 top-1 rec-dot h-1.5 w-1.5 rounded-full bg-rec" />
            </div>
            <div className="flex-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <Star key={s} className={`h-3 w-3 ${s <= (6 - i) ? "text-tungsten" : "text-ash-2"}`} fill={s <= (6 - i) ? "currentColor" : "none"} strokeWidth={1.5} />
                ))}
              </div>
              <p className="slate mt-1">Take {i + 1} · 1:0{i + 2}</p>
            </div>
            <div className="flex gap-2 text-bone-faint">
              <Download className="h-4 w-4 hover:text-bone" />
              <Forward className="h-4 w-4 hover:text-bone" />
              <MessageSquare className="h-4 w-4 hover:text-bone" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="border border-ash/70 bg-noir-2 frame">
      <div className="flex items-center gap-3 border-b border-ash/60 px-5 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={face(5)} alt="" className="duotone h-8 w-8 rounded-full object-cover" />
        <div>
          <p className="text-[0.88rem] text-bone">Saoirse Ní Bhraonáin</p>
          <p className="slate">via The Lisa Richards Agency</p>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="max-w-[80%] border border-ash/50 bg-noir px-4 py-2.5 text-[0.86rem] text-bone-dim">
          Hi Saoirse — loved your tape for Máire. Could you come in Thursday?
        </div>
        <div className="ml-auto max-w-[80%] border border-tungsten/30 bg-tungsten/[0.06] px-4 py-2.5 text-[0.86rem] text-bone">
          Absolutely — Thursday works. Thank you! I&rsquo;ll be there.
        </div>
        <div className="flex items-center gap-2 rounded border border-tungsten/25 bg-tungsten/[0.04] px-3 py-2">
          <MessageSquare className="h-3.5 w-3.5 text-tungsten" />
          <p className="slate text-tungsten/80">This conversation is also shared with the actor&rsquo;s agent</p>
        </div>
      </div>
    </div>
  );
}
