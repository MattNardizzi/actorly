"use client";

import { useState } from "react";
import {
  ShieldCheck, Users, BarChart3, CheckCircle2, Circle, Check, MessageSquareWarning,
} from "lucide-react";

import PortalShell, { type NavItem } from "@/components/portal/PortalShell";
import { Tag } from "@/components/ui/bits";
import { ACTORS, face, STATS } from "@/lib/mock";

const NAV: NavItem[] = [
  { key: "activation", label: "Activation queue", icon: ShieldCheck, badge: 4 },
  { key: "members", label: "Members", icon: Users },
  { key: "reports", label: "Reports", icon: BarChart3 },
];

const TITLES: Record<string, { t: string; s: string }> = {
  activation: { t: "Activation queue", s: "Actors requesting verification" },
  members: { t: "Members", s: "The whole roster" },
  reports: { t: "Reports", s: "Platform at a glance" },
};

export default function AdminPortal() {
  const [tab, setTab] = useState("activation");
  const meta = TITLES[tab];
  return (
    <PortalShell
      roleLabel="Admin"
      items={NAV}
      active={tab}
      onSelect={setTab}
      title={meta.t}
      subtitle={meta.s}
      user={{ name: "Actorly Admin", img: 13, meta: "Administrator" }}
    >
      {tab === "activation" && <ActivationQueue />}
      {tab === "members" && <Members />}
      {tab === "reports" && <Reports />}
    </PortalShell>
  );
}

/* ---------------- Activation queue ---------------- */
function ActivationQueue() {
  const queue = [ACTORS[5], ACTORS[11], ACTORS[8], ACTORS[2]];
  const [decisions, setDecisions] = useState<Record<string, "approved" | "changes">>({});

  const pending = queue.filter((a) => !decisions[a.id]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 border bg-noir-2 px-5 py-4">
        <ShieldCheck className="h-5 w-5 text-signal" />
        <p className="flex-1 text-[0.9rem] text-bone-dim">
          <span className="text-bone">{pending.length} actors</span> waiting for verification.
          Approve those who meet the minimum: avatar, past experience and training.
        </p>
      </div>

      {pending.length === 0 && (
        <div className="glow relative overflow-hidden border border-signal/30 bg-signal/[0.04] py-16 text-center">
          <div className="brackets pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <CheckCircle2 className="mx-auto h-10 w-10 text-signal" strokeWidth={1.3} />
          <p className="mt-4 text-[0.95rem] text-bone">Queue clear — every request handled.</p>
        </div>
      )}

      <div className="space-y-4">
        {pending.map((a) => {
          const meetsMin = a.credits.length > 0; // has experience; training assumed present
          return (
            <div key={a.id} className="group flex flex-col gap-5 border bg-noir-2 p-5 transition-colors duration-500 hover:border-signal/30 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={face(a.img)} alt={a.name} className="duotone h-16 w-16 rounded-full object-cover ring-1 ring-inset ring-signal/15" />
                <div>
                  <h3 className="font-display text-[1.3rem] font-light tracking-[-0.02em] text-bone">{a.name}</h3>
                  <p className="slate mt-0.5">{a.location} · requested 2 Jul</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 md:ml-4">
                {[
                  { label: "Avatar", ok: true },
                  { label: "Experience", ok: a.credits.length > 0 },
                  { label: "Training", ok: meetsMin },
                ].map((c) => (
                  <span key={c.label} className="flex items-center gap-1.5 text-[0.8rem]">
                    {c.ok ? <CheckCircle2 className="h-4 w-4 text-signal" /> : <Circle className="h-4 w-4 text-bone-faint" />}
                    <span className={c.ok ? "text-bone-dim" : "text-bone-faint"}>{c.label}</span>
                  </span>
                ))}
              </div>

              <div className="flex gap-3 md:ml-auto">
                <button
                  onClick={() => setDecisions((d) => ({ ...d, [a.id]: "changes" }))}
                  className="inline-flex items-center gap-2 rounded-full border border-ash-2 px-4 py-2.5 text-[0.78rem] text-bone-dim transition-colors hover:border-bone-faint hover:text-bone"
                >
                  <MessageSquareWarning className="h-4 w-4" /> Request changes
                </button>
                <button
                  onClick={() => setDecisions((d) => ({ ...d, [a.id]: "approved" }))}
                  className="inline-flex items-center gap-2 rounded-full bg-tungsten px-5 py-2.5 text-[0.78rem] font-medium text-noir transition-colors hover:bg-tungsten-soft"
                >
                  <Check className="h-4 w-4" /> Approve
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {Object.keys(decisions).length > 0 && (
        <div className="border bg-noir-2">
          <div className="border-b px-5 py-4"><span className="kicker">Just handled</span></div>
          <div className="divide-y divide-[color:var(--line)]">
            {queue.filter((a) => decisions[a.id]).map((a) => (
              <div key={a.id} className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-char/50">
                <span className="text-[0.9rem] text-bone">{a.name}</span>
                <Tag tone={decisions[a.id] === "approved" ? "light" : "default"}>
                  {decisions[a.id] === "approved" ? "Approved" : "Changes requested"}
                </Tag>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Members ---------------- */
function Members() {
  return (
    <div className="border bg-noir-2">
      <div className="hidden grid-cols-[2fr_1.5fr_1.5fr_1fr] gap-4 border-b px-5 py-3 md:grid">
        {["Actor", "Location", "Agent", "Status"].map((h) => <span key={h} className="kicker">{h}</span>)}
      </div>
      <div className="divide-y divide-[color:var(--line)]">
        {ACTORS.map((a) => (
          <div key={a.id} className="grid grid-cols-2 items-center gap-4 px-5 py-3 transition-colors hover:bg-char/50 md:grid-cols-[2fr_1.5fr_1.5fr_1fr]">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={face(a.img)} alt="" className="duotone h-9 w-9 rounded-full object-cover" />
              <span className="text-[0.9rem] text-bone">{a.name}</span>
            </div>
            <span className="slate hidden md:block">{a.location}</span>
            <span className="slate hidden md:block">{a.agent ?? "Independent"}</span>
            <Tag tone="light">Verified</Tag>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Reports ---------------- */
function Reports() {
  const tiles = [
    { label: "Total actors", value: STATS.actors.toLocaleString("en-IE") },
    { label: "Casting professionals", value: STATS.castingDirectors.toLocaleString("en-IE") },
    { label: "Productions cast", value: STATS.productionsCast.toLocaleString("en-IE") },
    { label: "Agencies", value: String(STATS.agents) },
    { label: "Pending activation", value: "4" },
    { label: "Self-tapes this week", value: "312" },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {tiles.map((t, i) => (
        <div
          key={t.label}
          className="group relative overflow-hidden border bg-noir-2 p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-signal/40"
        >
          <span className="pointer-events-none absolute right-4 top-4 font-mono text-[0.56rem] tracking-[0.16em] text-bone-faint/60">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="font-display text-[2.4rem] font-light leading-none tracking-[-0.02em] text-bone tabular-nums transition-colors group-hover:text-signal-ink">{t.value}</p>
          <p className="slate mt-3">{t.label}</p>
        </div>
      ))}
    </div>
  );
}
