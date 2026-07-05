"use client";

import { useState } from "react";
import {
  Search, Plus, Briefcase, Users, Mail, MessageSquare, X, Trash2, Send,
} from "lucide-react";

import PortalShell, { type NavItem } from "@/components/portal/PortalShell";
import CastingSearch from "@/components/casting/CastingSearch";
import AgentsCopyTool from "@/components/casting/AgentsCopyTool";
import ApplicantsBoard from "@/components/casting/ApplicantsBoard";
import { Tag } from "@/components/ui/bits";
import { JOBS, face } from "@/lib/mock";
import { cn } from "@/lib/utils";

const NAV: NavItem[] = [
  { key: "search", label: "Search actors", icon: Search },
  { key: "post", label: "Post a job", icon: Plus },
  { key: "jobs", label: "My jobs", icon: Briefcase, badge: 5 },
  { key: "applicants", label: "Applications", icon: Users, badge: 214 },
  { key: "agents", label: "Agents", icon: Mail },
  { key: "messages", label: "Messages", icon: MessageSquare, badge: 2 },
];

const TITLES: Record<string, { t: string; s: string }> = {
  search: { t: "Search the database", s: "12,480 Irish actors, fifteen ways to find them" },
  post: { t: "Post a casting call", s: "Live to matched actors in minutes" },
  jobs: { t: "My jobs", s: "Everything you've posted" },
  applicants: { t: "Applications", s: "Shortlist by instinct" },
  agents: { t: "Agents directory", s: "Copy a BCC list and send from your inbox" },
  messages: { t: "Messages", s: "Talk to talent, in-platform" },
};

export default function CastingPortal() {
  const [tab, setTab] = useState("search");
  const meta = TITLES[tab];
  return (
    <PortalShell
      roleLabel="Casting"
      items={NAV}
      active={tab}
      onSelect={setTab}
      title={meta.t}
      subtitle={meta.s}
      user={{ name: "Deirdre Molloy", img: 48, meta: "Casting Director" }}
    >
      {tab === "search" && <CastingSearch defaultOpen />}
      {tab === "post" && <PostJob />}
      {tab === "jobs" && <MyJobs onView={() => setTab("applicants")} />}
      {tab === "applicants" && <ApplicantsBoard />}
      {tab === "agents" && (
        <div className="mx-auto max-w-[640px]">
          <AgentsCopyTool />
        </div>
      )}
      {tab === "messages" && <Messages />}
    </PortalShell>
  );
}

/* ---------------- Post a job ---------------- */
const CATEGORIES = [
  "Student Film", "Feature Film", "Short Film", "TV Series", "Advertisement",
  "Theatre", "Print", "Live Event", "Music Video", "Voice Work", "Radio",
];

function PostJob() {
  const [paid, setPaid] = useState(true);
  const [category, setCategory] = useState("Feature Film");
  const [sendTo, setSendTo] = useState("all");
  const [roles, setRoles] = useState([{ name: "", selfTape: true }]);

  return (
    <div className="mx-auto max-w-[820px] space-y-6">
      <Section title="The project">
        <Labeled label="Project title">
          <input className="input" placeholder="e.g. The Quiet Land" defaultValue="" />
        </Labeled>
        <div className="grid gap-4 sm:grid-cols-2">
          <Labeled label="Category">
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Labeled>
          <Labeled label="Application deadline">
            <input type="date" className="input" />
          </Labeled>
        </div>
        <Labeled label="Logline / description">
          <textarea rows={3} className="input resize-none" placeholder="What's the project, and the tone you're casting for?" />
        </Labeled>
      </Section>

      <Section title="Remuneration">
        <div className="flex gap-3">
          {[{ k: true, l: "Paid" }, { k: false, l: "Pro-bono" }].map((o) => (
            <button
              key={o.l}
              onClick={() => setPaid(o.k)}
              className={cn(
                "flex-1 border px-4 py-3 text-[0.86rem] transition-colors",
                paid === o.k ? "border-tungsten/50 bg-tungsten/[0.05] text-bone" : "border-ash-2 text-bone-dim hover:text-bone",
              )}
            >
              {o.l}
            </button>
          ))}
        </div>
        <Labeled label={paid ? "Rate & usage" : "What the actor receives"}>
          <input className="input" placeholder={paid ? "e.g. €2,500 buyout, EU usage, 2 years" : "e.g. Expenses, meals, copy of film, festival credit"} />
        </Labeled>
      </Section>

      <Section title="Roles" action={
        <button onClick={() => setRoles((r) => [...r, { name: "", selfTape: true }])} className="inline-flex items-center gap-1.5 text-[0.78rem] text-tungsten hover:text-tungsten-soft">
          <Plus className="h-4 w-4" /> Add role
        </button>
      }>
        <div className="space-y-4">
          {roles.map((role, i) => (
            <div key={i} className="border border-ash/60 bg-noir p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="kicker">Role {String(i + 1).padStart(2, "0")}</span>
                {roles.length > 1 && (
                  <button onClick={() => setRoles((r) => r.filter((_, j) => j !== i))} aria-label="Remove role">
                    <Trash2 className="h-4 w-4 text-bone-faint hover:text-rec" />
                  </button>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input className="input" placeholder="Character name" />
                <input className="input" placeholder="Age range (e.g. 26–32)" />
                <input className="input" placeholder="Gender" />
                <input className="input" placeholder="Ethnicity" />
              </div>
              <textarea rows={2} className="input mt-3 resize-none" placeholder="Character description" />
              <label className="mt-3 flex items-center gap-3 text-[0.84rem] text-bone-dim">
                <button
                  type="button"
                  onClick={() => setRoles((r) => r.map((x, j) => j === i ? { ...x, selfTape: !x.selfTape } : x))}
                  className={cn("relative h-6 w-11 rounded-full border transition-colors", role.selfTape ? "border-rec/50 bg-rec/20" : "border-ash-2 bg-noir")}
                >
                  <span className={cn("absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all", role.selfTape ? "left-6 bg-rec" : "left-1 bg-bone-faint")} />
                </button>
                Allow self-tape auditions for this role
              </label>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Send to">
        <div className="space-y-3">
          {[
            { k: "all", l: "All matched actors", n: "8,214 eligible" },
            { k: "independent", l: "Independent actors only", n: "3,902 eligible" },
            { k: "agented", l: "Agented actors only", n: "4,312 eligible" },
          ].map((o) => (
            <button key={o.k} onClick={() => setSendTo(o.k)} className={cn("flex w-full items-center gap-4 border p-4 text-left transition-colors", sendTo === o.k ? "border-tungsten/50 bg-tungsten/[0.05]" : "border-ash-2 hover:border-bone-faint")}>
              <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border", sendTo === o.k ? "border-tungsten" : "border-ash-2")}>
                {sendTo === o.k && <span className="h-2.5 w-2.5 rounded-full bg-tungsten" />}
              </span>
              <span className="flex-1 text-[0.9rem] text-bone">{o.l}</span>
              <span className="font-mono text-[0.7rem] text-bone-faint">{o.n}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end gap-3">
          <button className="rounded-full border border-ash-2 px-5 py-3 text-[0.8rem] text-bone-dim hover:text-bone">Save draft</button>
          <button className="inline-flex items-center gap-2 rounded-full bg-tungsten px-6 py-3 text-[0.82rem] font-medium text-noir hover:bg-tungsten-soft">
            <Send className="h-4 w-4" /> Post job
          </button>
        </div>
      </Section>
    </div>
  );
}

/* ---------------- My jobs ---------------- */
function MyJobs({ onView }: { onView: () => void }) {
  return (
    <div className="space-y-4">
      {JOBS.map((j) => (
        <div key={j.id} className="flex flex-wrap items-center justify-between gap-4 border border-ash/60 bg-noir-2 p-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-[1.3rem] font-light text-bone">{j.title}</h3>
              {j.paid ? <Tag tone="light">Paid</Tag> : <Tag>Pro-bono</Tag>}
            </div>
            <p className="slate mt-1">{j.category} · {j.roles.length} roles · deadline {new Date(j.deadline).toLocaleDateString("en-IE", { day: "numeric", month: "short" })}</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="font-display text-[1.6rem] font-light text-tungsten">{j.applicants}</p>
              <p className="slate">applicants</p>
            </div>
            <button onClick={onView} className="rounded-full border border-ash-2 px-5 py-2.5 text-[0.78rem] text-bone transition-colors hover:border-tungsten hover:text-tungsten">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Messages ---------------- */
function Messages() {
  const threads = [
    { id: "t1", name: "Saoirse Ní Bhraonáin", agent: "The Lisa Richards Agency", last: "Thursday works, thank you!", img: 5, unread: true },
    { id: "t2", name: "Cillian Mac Cárthaigh", agent: null, last: "Attaching my Sea Wall tape now.", img: 12, unread: true },
    { id: "t3", name: "Aoife Doherty", agent: null, last: "Would love to read for Pegeen.", img: 9, unread: false },
    { id: "t4", name: "Chiamaka Okafor", agent: "Teresa Daly Associates", last: "Thanks for the callback!", img: 44, unread: false },
  ];
  const [active, setActive] = useState(threads[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <div className="border border-ash/60 bg-noir-2">
        <div className="border-b border-ash/60 px-5 py-4"><span className="kicker">Inbox</span></div>
        <div className="divide-y divide-ash/40">
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t)}
              className={cn("flex w-full items-center gap-3 px-5 py-4 text-left transition-colors", active.id === t.id ? "bg-char" : "hover:bg-char/60")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={face(t.img)} alt="" className="duotone h-10 w-10 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.88rem] text-bone">{t.name}</p>
                <p className="slate truncate">{t.last}</p>
              </div>
              {t.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-tungsten" />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-[520px] flex-col border border-ash/60 bg-noir-2">
        <div className="flex items-center gap-3 border-b border-ash/60 px-5 py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={face(active.img)} alt="" className="duotone h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="text-[0.9rem] text-bone">{active.name}</p>
            {active.agent && <p className="slate">via {active.agent}</p>}
          </div>
        </div>
        <div className="flex-1 space-y-3 p-5">
          <div className="max-w-[75%] border border-ash/50 bg-noir px-4 py-2.5 text-[0.86rem] text-bone-dim">
            Hi {active.name.split(" ")[0]} — really strong tape. Could you come in Thursday?
          </div>
          <div className="ml-auto max-w-[75%] border border-tungsten/30 bg-tungsten/[0.06] px-4 py-2.5 text-[0.86rem] text-bone">
            {active.last}
          </div>
          {active.agent && (
            <div className="flex items-center gap-2 rounded border border-tungsten/25 bg-tungsten/[0.04] px-3 py-2">
              <MessageSquare className="h-3.5 w-3.5 text-tungsten" />
              <p className="slate text-tungsten/80">This conversation is also shared with {active.agent}</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-ash/60 p-4">
          <input className="input flex-1" placeholder="Write a message…" />
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-tungsten text-noir hover:bg-tungsten-soft" aria-label="Send">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- shared bits ---------------- */
function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="border border-ash/60 bg-noir-2">
      <div className="flex items-center justify-between border-b border-ash/60 px-5 py-4">
        <span className="kicker">{title}</span>
        {action}
      </div>
      <div className="space-y-4 p-5">{children}</div>
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="kicker mb-2 block">{label}</span>
      {children}
    </label>
  );
}
