"use client";

import { useState } from "react";
import {
  LayoutDashboard, User, Briefcase, Send, Video, Settings as SettingsIcon,
  Eye, Star, CheckCircle2, Circle, Upload, ArrowRight, TrendingUp, Clock,
} from "lucide-react";

import PortalShell, { type NavItem } from "@/components/portal/PortalShell";
import ProfilePreview from "@/components/profile/ProfilePreview";
import { Tag } from "@/components/ui/bits";
import { ACTORS, JOBS, face } from "@/lib/mock";
import { cn } from "@/lib/utils";

const ME = ACTORS[0]; // Saoirse Ní Bhraonáin

const NAV: NavItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "profile", label: "My Profile", icon: User },
  { key: "jobs", label: "Jobs", icon: Briefcase, badge: 3 },
  { key: "applications", label: "Applications", icon: Send },
  { key: "instacast", label: "Instacast", icon: Video, badge: 1 },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

const TITLES: Record<string, { t: string; s: string }> = {
  overview: { t: "Welcome back, Saoirse", s: "Here's what's moving on your profile" },
  profile: { t: "My Profile", s: "This is what casting directors see" },
  jobs: { t: "Open jobs", s: "Roles matched to your profile" },
  applications: { t: "Applications", s: "Everywhere you've put yourself forward" },
  instacast: { t: "Instacast", s: "Your self-tape requests and history" },
  settings: { t: "Settings", s: "Notifications and account" },
};

export default function ActorPortal() {
  const [tab, setTab] = useState("overview");
  const meta = TITLES[tab];

  return (
    <PortalShell
      roleLabel="Actor"
      items={NAV}
      active={tab}
      onSelect={setTab}
      title={meta.t}
      subtitle={meta.s}
      user={{ name: ME.name, img: ME.img, meta: ME.agent ?? "Independent" }}
    >
      {tab === "overview" && <Overview onGo={setTab} />}
      {tab === "profile" && <ProfileView />}
      {tab === "jobs" && <JobsView />}
      {tab === "applications" && <ApplicationsView />}
      {tab === "instacast" && <InstacastView />}
      {tab === "settings" && <SettingsView />}
    </PortalShell>
  );
}

/* ---------------- Overview ---------------- */
function Overview({ onGo }: { onGo: (k: string) => void }) {
  const stats = [
    { icon: Eye, label: "Profile views", value: "248", sub: "this week", trend: "+18%" },
    { icon: Briefcase, label: "New matches", value: "3", sub: "open now" },
    { icon: Send, label: "Applications", value: "12", sub: "this month" },
    { icon: Star, label: "Shortlisted", value: "4", sub: "active" },
  ];
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-ash/60 bg-noir-2 p-5">
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-tungsten" strokeWidth={1.5} />
              {s.trend && (
                <span className="flex items-center gap-1 font-mono text-[0.66rem] text-tungsten">
                  <TrendingUp className="h-3 w-3" /> {s.trend}
                </span>
              )}
            </div>
            <p className="mt-4 font-display text-[2.2rem] font-light leading-none text-bone">{s.value}</p>
            <p className="slate mt-2">{s.label} · {s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Matched jobs */}
        <div className="border border-ash/60 bg-noir-2">
          <div className="flex items-center justify-between border-b border-ash/60 px-5 py-4">
            <span className="kicker">Matched to you</span>
            <button onClick={() => onGo("jobs")} className="slate hover:text-bone">View all →</button>
          </div>
          <div className="divide-y divide-ash/40">
            {JOBS.slice(0, 3).map((j) => (
              <div key={j.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[0.94rem] text-bone">{j.title}</span>
                    {j.paid ? <Tag tone="light">Paid</Tag> : <Tag>Pro-bono</Tag>}
                  </div>
                  <p className="slate mt-1 truncate">{j.category} · {j.house}</p>
                </div>
                <button onClick={() => onGo("jobs")} className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-tungsten hover:text-tungsten-soft">
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Verification + strength */}
        <div className="space-y-6">
          <div className="border border-tungsten/30 bg-tungsten/[0.04] p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-tungsten" />
              <span className="text-[0.92rem] text-bone">Verified profile</span>
            </div>
            <p className="mt-2 text-[0.84rem] leading-relaxed text-bone-dim">
              Approved by admin — you can apply to any open job. Keep your reels current to
              rank higher in search.
            </p>
          </div>

          <div className="border border-ash/60 bg-noir-2 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="kicker">Profile strength</span>
              <span className="font-mono text-[0.8rem] text-tungsten">92%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-ash/60">
              <div className="h-full rounded-full bg-tungsten" style={{ width: "92%" }} />
            </div>
            <button onClick={() => onGo("profile")} className="mt-4 flex items-center gap-1.5 text-[0.82rem] text-bone-dim hover:text-bone">
              Add a 2025 credit to reach 100% <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Profile ---------------- */
function ProfileView() {
  return (
    <div className="mx-auto max-w-[900px] space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border border-ash/60 bg-noir-2 px-5 py-4">
        <span className="text-[0.9rem] text-bone-dim">Everything below is live on your public profile.</span>
        <button className="inline-flex items-center gap-2 rounded-full border border-ash-2 px-4 py-2 text-[0.78rem] text-bone transition-colors hover:border-tungsten hover:text-tungsten">
          Edit profile
        </button>
      </div>
      <ProfilePreview actor={ME} />
    </div>
  );
}

/* ---------------- Jobs ---------------- */
function JobsView() {
  return (
    <div className="space-y-5">
      {JOBS.map((j) => (
        <JobCard key={j.id} job={j} />
      ))}
    </div>
  );
}

function JobCard({ job }: { job: (typeof JOBS)[number] }) {
  const [applied, setApplied] = useState<Record<string, boolean>>({});
  return (
    <div className="border border-ash/60 bg-noir-2">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ash/50 p-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-[1.4rem] font-light text-bone">{job.title}</h3>
            {job.paid ? <Tag tone="light">Paid</Tag> : <Tag>Pro-bono</Tag>}
          </div>
          <p className="slate mt-1">{job.category} · {job.house} · {job.location}</p>
          <p className="mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-bone-dim text-pretty">{job.logline}</p>
        </div>
        <div className="text-right">
          <p className="slate">Deadline</p>
          <p className="font-mono text-[0.82rem] text-tungsten">
            {new Date(job.deadline).toLocaleDateString("en-IE", { day: "numeric", month: "short" })}
          </p>
        </div>
      </div>
      <div className="divide-y divide-ash/40">
        {job.roles.map((r) => (
          <div key={r.name} className="flex items-center justify-between gap-4 p-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.8rem] uppercase tracking-[0.1em] text-bone">{r.name}</span>
                {r.selfTape && <Tag tone="record">Self-tape</Tag>}
              </div>
              <p className="slate mt-1">{r.gender} · {r.ageRange} · {r.ethnicity}</p>
              <p className="mt-2 max-w-xl text-[0.86rem] text-bone-dim">{r.description}</p>
            </div>
            <button
              onClick={() => setApplied((a) => ({ ...a, [r.name]: true }))}
              disabled={applied[r.name]}
              className={cn(
                "shrink-0 rounded-full px-5 py-2.5 text-[0.78rem] font-medium transition-colors",
                applied[r.name]
                  ? "border border-tungsten/40 text-tungsten"
                  : "bg-tungsten text-noir hover:bg-tungsten-soft",
              )}
            >
              {applied[r.name] ? "Applied ✓" : "Apply"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Applications ---------------- */
function ApplicationsView() {
  const apps = [
    { title: "The Quiet Land", role: "MÁIRE", status: "Shortlisted", tone: "light" as const, date: "2 Jul" },
    { title: "Guinness — 'The Return'", role: "THE DAUGHTER", status: "Self-tape requested", tone: "record" as const, date: "1 Jul" },
    { title: "Fair City", role: "DR. AMARA", status: "Applied", tone: "default" as const, date: "30 Jun" },
    { title: "Sea Wall", role: "ALEX", status: "Not this time", tone: "default" as const, date: "24 Jun" },
  ];
  return (
    <div className="border border-ash/60 bg-noir-2">
      <div className="hidden grid-cols-[2fr_1.5fr_1.5fr_1fr] gap-4 border-b border-ash/60 px-5 py-3 sm:grid">
        {["Project", "Role", "Status", "Applied"].map((h) => (
          <span key={h} className="kicker">{h}</span>
        ))}
      </div>
      <div className="divide-y divide-ash/40">
        {apps.map((a) => (
          <div key={a.title + a.role} className="grid grid-cols-2 items-center gap-4 px-5 py-4 sm:grid-cols-[2fr_1.5fr_1.5fr_1fr]">
            <span className="text-[0.92rem] text-bone">{a.title}</span>
            <span className="font-mono text-[0.76rem] uppercase tracking-[0.1em] text-bone-dim">{a.role}</span>
            <span><Tag tone={a.tone}>{a.status}</Tag></span>
            <span className="slate">{a.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Instacast ---------------- */
function InstacastView() {
  const [plan, setPlan] = useState<"single" | "unlimited">("single");
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="border border-rec/30 bg-rec/[0.03]">
        <div className="flex items-center gap-2 border-b border-ash/50 px-5 py-4">
          <span className="rec-dot h-2.5 w-2.5 rounded-full bg-rec" />
          <span className="kicker">Requested — record now</span>
        </div>
        <div className="p-5">
          <h3 className="font-display text-[1.4rem] font-light text-bone">Bóthar · MARCUS</h3>
          <p className="slate mt-1">Requested by IADT Grad Films · due 15 Jul</p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 border border-dashed border-ash-2 bg-noir/50 py-12 text-center">
            <Upload className="h-8 w-8 text-rec" strokeWidth={1.3} />
            <p className="text-[0.9rem] text-bone">Drop your self-tape — MP4 / MOV</p>
            <p className="slate">or record in-browser</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="border border-ash/60 bg-noir-2 p-5">
          <span className="kicker">Choose how to send</span>
          <div className="mt-4 space-y-3">
            {[
              { key: "single" as const, price: "€5", label: "This tape", sub: "One-off processing fee" },
              { key: "unlimited" as const, price: "€50", label: "Unlimited · 1 year", sub: "All tapes for 12 months" },
            ].map((o) => (
              <button
                key={o.key}
                onClick={() => setPlan(o.key)}
                className={cn(
                  "flex w-full items-center gap-4 border p-4 text-left transition-colors",
                  plan === o.key ? "border-tungsten/50 bg-tungsten/[0.05]" : "border-ash-2 hover:border-bone-faint",
                )}
              >
                <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border", plan === o.key ? "border-tungsten" : "border-ash-2")}>
                  {plan === o.key && <span className="h-2.5 w-2.5 rounded-full bg-tungsten" />}
                </span>
                <span className="flex-1">
                  <span className="block text-[0.92rem] text-bone">{o.label}</span>
                  <span className="slate">{o.sub}</span>
                </span>
                <span className="font-display text-[1.5rem] font-light text-tungsten">{o.price}</span>
              </button>
            ))}
          </div>
          <button className="mt-4 w-full rounded-full bg-rec/90 py-3.5 text-[0.82rem] font-medium text-bone transition-colors hover:bg-rec">
            Pay &amp; send tape
          </button>
        </div>

        <div className="border border-ash/60 bg-noir-2 p-5">
          <span className="kicker">Recently sent</span>
          <div className="mt-4 space-y-3">
            {[
              { p: "Fair City · JAY", d: "28 Jun", r: 5 },
              { p: "Smother · GUEST", d: "12 Jun", r: 6 },
            ].map((t) => (
              <div key={t.p} className="flex items-center justify-between gap-3 border-b border-ash/40 pb-3 last:border-0">
                <div>
                  <p className="text-[0.86rem] text-bone">{t.p}</p>
                  <p className="slate">Sent {t.d}</p>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5, 6].map((s) => (
                    <Star key={s} className={cn("h-3 w-3", s <= t.r ? "text-tungsten" : "text-ash-2")} fill={s <= t.r ? "currentColor" : "none"} strokeWidth={1.5} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Settings ---------------- */
function SettingsView() {
  const [n, setN] = useState({ jobs: true, news: false, phone: true, digest: false });
  const rows = [
    { key: "jobs" as const, label: "New job alerts", desc: "Roles that match your profile" },
    { key: "news" as const, label: "Newsletter", desc: "Industry news, monthly" },
    { key: "phone" as const, label: "Casting can call me", desc: "Share your number with verified casting" },
    { key: "digest" as const, label: "Daily digest only", desc: "One summary email a day, nothing more" },
  ];
  return (
    <div className="mx-auto max-w-[760px] space-y-6">
      <div className="border border-ash/60 bg-noir-2">
        <div className="border-b border-ash/60 px-5 py-4"><span className="kicker">Notifications</span></div>
        {rows.map((r) => (
          <div key={r.key} className="flex items-center justify-between border-b border-ash/40 px-5 py-4 last:border-0">
            <div>
              <p className="text-[0.92rem] text-bone">{r.label}</p>
              <p className="slate">{r.desc}</p>
            </div>
            <button
              onClick={() => setN((s) => ({ ...s, [r.key]: !s[r.key] }))}
              aria-label={`Toggle ${r.label}`}
              className={cn("relative h-6 w-11 shrink-0 rounded-full border transition-colors", n[r.key] ? "border-tungsten/50 bg-tungsten/20" : "border-ash-2 bg-noir")}
            >
              <span className={cn("absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all", n[r.key] ? "left-6 bg-tungsten" : "left-1 bg-bone-faint")} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 border border-ash/60 bg-noir-2 px-5 py-4">
        <Clock className="h-4 w-4 text-bone-faint" />
        <p className="text-[0.86rem] text-bone-dim">Or <button className="text-bone underline decoration-ash-2 underline-offset-2 hover:decoration-tungsten">unsubscribe from everything</button> — you&rsquo;ll still see jobs when you log in.</p>
      </div>
    </div>
  );
}
