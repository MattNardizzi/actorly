"use client";

import { useMemo, useState } from "react";
import { Star, Film, Mic, Check, ArrowDownUp, Send, Video } from "lucide-react";
import { ACTORS, face } from "@/lib/mock";
import { cn } from "@/lib/utils";

type Filter = "reel" | "agented" | "independent" | "contacted" | "tape";

/** Casting's applicant shortlist for a role — rate 1–6, filter, sort, batch-act. */
export default function ApplicantsBoard() {
  const applicants = ACTORS.slice(0, 8);
  const [ratings, setRatings] = useState<Record<string, number>>({
    a1: 6, a2: 4, a7: 6, a5: 5, a8: 3,
  });
  const [contacted, setContacted] = useState<Set<string>>(new Set(["a1", "a5"]));
  const [tapes] = useState<Set<string>>(new Set(["a1", "a7"]));
  const [filters, setFilters] = useState<Set<Filter>>(new Set());
  const [sort, setSort] = useState<"recent" | "rating" | "name">("rating");

  const toggleFilter = (f: Filter) =>
    setFilters((s) => {
      const n = new Set(s);
      if (n.has(f)) n.delete(f); else n.add(f);
      return n;
    });

  const shown = useMemo(() => {
    let list = applicants.filter((a) => {
      if (filters.has("reel") && !a.showreel) return false;
      if (filters.has("agented") && !a.agent) return false;
      if (filters.has("independent") && a.agent) return false;
      if (filters.has("contacted") && !contacted.has(a.id)) return false;
      if (filters.has("tape") && !tapes.has(a.id)) return false;
      return true;
    });
    list = [...list].sort((x, y) => {
      if (sort === "rating") return (ratings[y.id] ?? 0) - (ratings[x.id] ?? 0);
      if (sort === "name") return x.name.localeCompare(y.name);
      return 0;
    });
    return list;
  }, [applicants, filters, contacted, tapes, ratings, sort]);

  const sixes = applicants.filter((a) => ratings[a.id] === 6).length;

  const FILTER_CHIPS: { key: Filter; label: string; icon?: React.ElementType }[] = [
    { key: "reel", label: "Has reel", icon: Film },
    { key: "agented", label: "Agented" },
    { key: "independent", label: "Independent" },
    { key: "contacted", label: "Contacted" },
    { key: "tape", label: "Sent tape", icon: Video },
  ];

  return (
    <div className="border bg-noir-2">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b p-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[0.82rem] uppercase tracking-[0.1em] text-bone">MÁIRE</span>
            <span className="slate">· The Quiet Land</span>
          </div>
          <p className="slate mt-1"><span className="tabular-nums">{applicants.length}</span> applicants · <span className="tabular-nums">{sixes}</span> rated six</p>
        </div>
        <button
          onClick={() => setSort((s) => (s === "rating" ? "recent" : s === "recent" ? "name" : "rating"))}
          className="inline-flex items-center gap-2 rounded-[2px] border border-ash-2 px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-bone-dim transition-colors hover:border-signal/50 hover:text-bone"
        >
          <ArrowDownUp className="h-3.5 w-3.5" />
          {sort === "rating" ? "Rating" : sort === "recent" ? "Most recent" : "A–Z"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 border-b bg-noir/40 p-4">
        {FILTER_CHIPS.map((c) => {
          const on = filters.has(c.key);
          return (
            <button
              key={c.key}
              onClick={() => toggleFilter(c.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                on ? "border-signal/60 bg-signal/10 text-signal-ink" : "border-ash-2 text-bone-dim hover:border-bone-faint hover:text-bone",
              )}
            >
              {c.icon && <c.icon className="h-3 w-3" />}
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((a) => {
          const rating = ratings[a.id] ?? 0;
          const isContacted = contacted.has(a.id);
          return (
            <div key={a.id} className="group overflow-hidden border bg-noir transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-signal/40">
              <div className="relative aspect-[3/4] overflow-hidden bg-char">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={face(a.img)} alt={a.name} className="duotone h-full w-full object-cover" />
                <div className="brackets pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-60" aria-hidden />
                <div className="absolute right-2 top-2 flex gap-1">
                  {a.showreel && <Badge><Film className="h-3 w-3" /></Badge>}
                  {a.voicereel && <Badge><Mic className="h-3 w-3" /></Badge>}
                  {tapes.has(a.id) && <Badge tone="rec"><Video className="h-3 w-3" /></Badge>}
                </div>
                <div className="scrim-b absolute inset-x-0 bottom-0 p-2 pt-6">
                  <p className="on-image truncate text-[0.82rem]">{a.name}</p>
                  <p className="slate on-image-dim truncate">{a.agent ?? "Independent"}</p>
                </div>
              </div>

              {/* Rating 1–6 */}
              <div className="flex items-center justify-between gap-1 px-2 py-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5, 6].map((s) => (
                    <button
                      key={s}
                      onClick={() => setRatings((r) => ({ ...r, [a.id]: r[a.id] === s ? 0 : s }))}
                      aria-label={`Rate ${s}`}
                    >
                      <Star
                        className={cn("h-3.5 w-3.5 transition-colors", s <= rating ? "text-signal" : "text-ash-2 hover:text-bone-faint")}
                        fill={s <= rating ? "currentColor" : "none"}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setContacted((c) => { const n = new Set(c); if (n.has(a.id)) n.delete(a.id); else n.add(a.id); return n; })}
                className={cn(
                  "flex w-full items-center justify-center gap-1.5 border-t py-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] transition-colors",
                  isContacted ? "bg-signal/[0.06] text-signal-ink" : "text-bone-faint hover:text-bone",
                )}
              >
                {isContacted ? <><Check className="h-3 w-3" /> Contacted</> : "Mark contacted"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Batch bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-noir/40 p-4">
        <span className="slate"><span className="tabular-nums">{sixes}</span> favourites (rated six)</span>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-ash-2 px-4 py-2 text-[0.76rem] text-bone transition-colors hover:border-signal/60 hover:text-signal-ink">
            <Send className="h-3.5 w-3.5" /> Message favourites
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-rec/40 bg-rec/10 px-4 py-2 text-[0.76rem] text-rec transition-colors hover:bg-rec/20">
            <Video className="h-3.5 w-3.5" /> Invite to self-tape
          </button>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "rec" }) {
  return (
    <span
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-full border bg-black/35 backdrop-blur-sm",
        tone === "rec" ? "border-white/25 text-rec" : "border-white/25 text-white",
      )}
    >
      {children}
    </span>
  );
}
