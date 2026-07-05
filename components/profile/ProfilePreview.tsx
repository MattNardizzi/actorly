import { Film, Mic, MapPin, Ruler, Eye, Scissors, Play, Languages } from "lucide-react";
import type { Actor } from "@/lib/mock";
import { face } from "@/lib/mock";
import { Tag } from "@/components/ui/bits";
import { cn } from "@/lib/utils";

/** A rich, realistic actor profile — the object the whole platform serves. */
export default function ProfilePreview({
  actor,
  className,
}: {
  actor: Actor;
  className?: string;
}) {
  const stats = [
    { icon: MapPin, label: "Based", value: actor.location },
    { icon: Ruler, label: "Height", value: actor.height },
    { icon: Eye, label: "Eyes", value: actor.eyes },
    { icon: Scissors, label: "Hair", value: actor.hair },
  ];

  return (
    <div
      className={cn(
        "overflow-hidden border border-ash/70 bg-noir-2 frame",
        className,
      )}
    >
      {/* Header — headshot + identity */}
      <div className="grid sm:grid-cols-[minmax(0,200px)_1fr]">
        <div className="relative aspect-[3/4] bg-char sm:aspect-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={face(actor.img)}
            alt={`${actor.name} — headshot`}
            className="duotone h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-2 via-transparent to-transparent sm:bg-gradient-to-r" />
        </div>

        <div className="flex flex-col justify-between gap-4 p-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="slate">Playing age {actor.playingAge}</span>
              <span className="text-bone-faint">·</span>
              <span className="slate">{actor.gender}</span>
            </div>
            <h3 className="mt-2 font-display text-[1.9rem] font-light leading-tight text-bone">
              {actor.name}
            </h3>
            <p className="mt-1 text-[0.92rem] text-bone-dim">{actor.headline}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {actor.showreel && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-tungsten/40 px-3 py-1 text-[0.7rem] text-tungsten">
                <Film className="h-3 w-3" /> Showreel
              </span>
            )}
            {actor.voicereel && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-tungsten/40 px-3 py-1 text-[0.7rem] text-tungsten">
                <Mic className="h-3 w-3" /> Voice reel
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ash-2 px-3 py-1 text-[0.7rem] text-bone-dim">
              {actor.agent ?? "Independent"}
            </span>
          </div>
        </div>
      </div>

      {/* Reel players (mock) */}
      <div className="grid gap-px border-t border-ash/60 bg-ash/50 sm:grid-cols-2">
        {[
          { label: "Showreel", meta: "2:14 · 2025", on: actor.showreel },
          { label: "Voice reel", meta: "1:38 · 2025", on: actor.voicereel },
        ].map((r) => (
          <div key={r.label} className="flex items-center gap-3 bg-noir-2 p-4">
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border",
                r.on ? "border-tungsten/50 text-tungsten" : "border-ash-2 text-bone-faint",
              )}
            >
              <Play className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
            </span>
            <div>
              <p className="text-[0.82rem] text-bone">{r.label}</p>
              <p className="slate">{r.on ? r.meta : "Not uploaded"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Attribute grid */}
      <div className="grid grid-cols-2 gap-px border-t border-ash/60 bg-ash/50 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-noir-2 p-4">
            <s.icon className="h-4 w-4 text-bone-faint" strokeWidth={1.5} />
            <p className="mt-2 slate">{s.label}</p>
            <p className="text-[0.86rem] text-bone">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Skills / accents / languages */}
      <div className="space-y-5 border-t border-ash/60 p-6">
        <AttrRow label="Skills" items={actor.skills} />
        <AttrRow label="Accents" items={actor.accents} />
        <AttrRow label="Languages" items={actor.languages} icon />
      </div>

      {/* Selected credits */}
      <div className="border-t border-ash/60 p-6">
        <p className="kicker mb-4">Selected credits</p>
        <ul className="space-y-3">
          {actor.credits.map((c) => (
            <li key={c.title} className="flex items-baseline justify-between gap-4 border-b border-ash/40 pb-3 last:border-0">
              <div>
                <p className="text-[0.92rem] text-bone">{c.title}</p>
                <p className="slate">
                  {c.role} · {c.house}
                </p>
              </div>
              <span className="font-mono text-[0.72rem] text-bone-faint">{c.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AttrRow({
  label,
  items,
  icon = false,
}: {
  label: string;
  items: string[];
  icon?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5">
      <p className="kicker flex shrink-0 items-center gap-1.5 sm:w-24">
        {icon && <Languages className="h-3 w-3" />}
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((i) => (
          <Tag key={i}>{i}</Tag>
        ))}
      </div>
    </div>
  );
}
