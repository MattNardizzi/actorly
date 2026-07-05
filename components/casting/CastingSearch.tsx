"use client";

import { useMemo, useState } from "react";
import { Search, Film, Mic, X, SlidersHorizontal } from "lucide-react";
import { ACTORS, FILTERS, type Actor } from "@/lib/mock";
import ActorCard from "@/components/cards/ActorCard";
import { cn } from "@/lib/utils";

type MultiKey = "gender" | "ethnicity" | "hair" | "eyes" | "build";

const CHIP_GROUPS: { key: MultiKey; label: string; options: string[] }[] = [
  { key: "gender", label: "Gender", options: FILTERS.gender },
  { key: "build", label: "Body type", options: FILTERS.build },
  { key: "hair", label: "Hair", options: FILTERS.hair },
  { key: "eyes", label: "Eyes", options: FILTERS.eyes },
  { key: "ethnicity", label: "Ethnicity", options: FILTERS.ethnicity },
];

/** A genuinely working casting search over the roster — the platform's core tool. */
export default function CastingSearch({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(defaultOpen);
  const [reels, setReels] = useState({ showreel: false, voicereel: false });
  const [sel, setSel] = useState<Record<MultiKey, string[]>>({
    gender: [], ethnicity: [], hair: [], eyes: [], build: [],
  });

  const toggle = (key: MultiKey, val: string) =>
    setSel((s) => ({
      ...s,
      [key]: s[key].includes(val) ? s[key].filter((v) => v !== val) : [...s[key], val],
    }));

  const activeCount =
    Object.values(sel).reduce((n, a) => n + a.length, 0) +
    (reels.showreel ? 1 : 0) +
    (reels.voicereel ? 1 : 0);

  const clearAll = () => {
    setSel({ gender: [], ethnicity: [], hair: [], eyes: [], build: [] });
    setReels({ showreel: false, voicereel: false });
    setQuery("");
  };

  const results = useMemo(() => {
    return ACTORS.filter((a: Actor) => {
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (reels.showreel && !a.showreel) return false;
      if (reels.voicereel && !a.voicereel) return false;
      for (const { key } of CHIP_GROUPS) {
        const picks = sel[key];
        if (!picks.length) continue;
        const val = key === "ethnicity" ? a.ethnicity : (a[key] as string);
        // "Any" ethnicity always matches an ethnicity filter
        if (key === "ethnicity" && picks.includes("Any")) continue;
        if (!picks.includes(val)) return false;
      }
      return true;
    });
  }, [query, reels, sel]);

  return (
    <div className="frame relative border bg-noir-2">
      {/* viewfinder corners on the instrument */}
      <span className="brackets pointer-events-none absolute inset-0 z-10 opacity-70" aria-hidden />

      {/* Search bar */}
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
        <div className="group flex flex-1 items-center gap-3 border border-ash-2 bg-noir px-4 py-3 transition-colors duration-500 focus-within:border-signal/50">
          <Search className="h-4 w-4 shrink-0 text-bone-faint transition-colors group-focus-within:text-signal" strokeWidth={1.7} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search actors by name…"
            className="w-full bg-transparent text-[0.9rem] text-bone placeholder:text-bone-faint focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              <X className="h-4 w-4 text-bone-faint transition-colors hover:text-bone" />
            </button>
          )}
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex items-center justify-center gap-2 border px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open || activeCount
              ? "border-signal/50 text-signal-ink"
              : "border-ash-2 text-bone-dim hover:border-bone-faint hover:text-bone",
          )}
        >
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1.7} />
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-signal/50 bg-signal/15 px-1.5 text-[0.7rem] font-medium text-signal-ink">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters */}
      {open && (
        <div className="space-y-5 border-b bg-noir/40 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="kicker mr-2 w-16">Reels</span>
            <FilterChip active={reels.showreel} onClick={() => setReels((r) => ({ ...r, showreel: !r.showreel }))}>
              <Film className="h-3 w-3" /> Has showreel
            </FilterChip>
            <FilterChip active={reels.voicereel} onClick={() => setReels((r) => ({ ...r, voicereel: !r.voicereel }))}>
              <Mic className="h-3 w-3" /> Has voice reel
            </FilterChip>
          </div>

          {CHIP_GROUPS.map((g) => (
            <div key={g.key} className="flex flex-wrap items-start gap-2">
              <span className="kicker mr-2 w-16 shrink-0 pt-1.5">{g.label}</span>
              <div className="flex flex-wrap gap-2">
                {g.options.map((opt) => (
                  <FilterChip key={opt} active={sel[g.key].includes(opt)} onClick={() => toggle(g.key, opt)}>
                    {opt}
                  </FilterChip>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Result count */}
      <div className="flex items-center justify-between px-5 py-4">
        <p className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-bone-dim">
          <span className="signal-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
          {results.length} {results.length === 1 ? "actor" : "actors"} match
        </p>
        {activeCount > 0 && (
          <button onClick={clearAll} className="slate transition-colors hover:text-signal-ink">
            Clear all
          </button>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4 p-5 pt-0 sm:grid-cols-3 lg:grid-cols-4">
        {results.map((a) => (
          <ActorCard key={a.id} actor={a} />
        ))}
        {results.length === 0 && (
          <p className="col-span-full py-12 text-center text-[0.9rem] text-bone-faint">
            No actors match those filters. Loosen the brief.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        active
          ? "border-signal/70 bg-signal/10 text-signal-ink"
          : "border-ash-2 text-bone-dim hover:border-bone-faint hover:text-bone",
      )}
    >
      {children}
    </button>
  );
}
