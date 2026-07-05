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
        "group/profile relative overflow-hidden border bg-noir-2 frame transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-signal/30",
        className,
      )}
    >
      {/* register code — pins the card to the instrument */}
      <div className="pointer-events-none absolute right-5 top-5 z-10 hidden items-center gap-2 sm:flex">
        <span className="signal-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-bone-faint">
          REG · {actor.name.split(" ")[0].toUpperCase()}
        </span>
      </div>

      {/* Header — headshot + identity */}
      <div className="grid sm:grid-cols-[minmax(0,224px)_1fr]">
        <div className="brackets relative aspect-[3/4] bg-char sm:aspect-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={face(actor.img)}
            alt={`${actor.name} — headshot`}
            className="duotone h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/profile:grayscale-0 group-hover/profile:brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-2 via-transparent to-transparent sm:bg-gradient-to-r" />
        </div>

        <div className="flex flex-col justify-between gap-4 p-6 md:p-7">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="slate">Playing age {actor.playingAge}</span>
              <span className="text-bone-faint">·</span>
              <span className="slate">{actor.gender}</span>
            </div>
            <h3 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.1rem)] font-light leading-[1.02] tracking-[-0.03em] text-bone">
              {actor.name}
            </h3>
            <p className="mt-2 text-[0.94rem] leading-relaxed text-bone-dim text-pretty">{actor.headline}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {actor.showreel && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-signal-ink">
                <Film className="h-3 w-3" strokeWidth={1.6} /> Showreel
              </span>
            )}
            {actor.voicereel && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-signal-ink">
                <Mic className="h-3 w-3" strokeWidth={1.6} /> Voice reel
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ash-2 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone-dim">
              {actor.agent ?? "Independent"}
            </span>
          </div>
        </div>
      </div>

      {/* Reel players (mock) */}
      <div className="grid gap-px border-t sm:grid-cols-2" style={{ background: "var(--line)" }}>
        {[
          { label: "Showreel", meta: "2:14 · 2025", on: actor.showreel },
          { label: "Voice reel", meta: "1:38 · 2025", on: actor.voicereel },
        ].map((r) => (
          <div
            key={r.label}
            className="group/reel flex items-center gap-3 bg-noir-2 p-4 transition-colors duration-500 hover:bg-char"
          >
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-500",
                r.on
                  ? "border-signal/50 text-signal-ink group-hover/reel:border-signal group-hover/reel:text-signal"
                  : "border-ash-2 text-bone-faint",
              )}
            >
              <Play className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
            </span>
            <div>
              <p className="text-[0.84rem] text-bone">{r.label}</p>
              <p className="slate">{r.on ? r.meta : "Not uploaded"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Attribute grid */}
      <div className="grid grid-cols-2 gap-px border-t sm:grid-cols-4" style={{ background: "var(--line)" }}>
        {stats.map((s) => (
          <div
            key={s.label}
            className="group/stat bg-noir-2 p-4 transition-colors duration-500 hover:bg-char"
          >
            <s.icon
              className="h-4 w-4 text-bone-faint transition-colors duration-500 group-hover/stat:text-signal"
              strokeWidth={1.5}
            />
            <p className="mt-2 slate">{s.label}</p>
            <p className="text-[0.88rem] text-bone">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Skills / accents / languages */}
      <div className="space-y-5 border-t p-6 md:p-7">
        <AttrRow label="Skills" items={actor.skills} />
        <AttrRow label="Accents" items={actor.accents} />
        <AttrRow label="Languages" items={actor.languages} icon />
      </div>

      {/* Selected credits */}
      <div className="border-t p-6 md:p-7">
        <p className="kicker mb-5">Selected credits</p>
        <ul className="flex flex-col gap-px" style={{ background: "var(--line-soft)" }}>
          {actor.credits.map((c) => (
            <li
              key={c.title}
              className="group/credit flex items-baseline justify-between gap-4 bg-noir-2 py-3 transition-colors duration-300"
            >
              <div>
                <p className="text-[0.94rem] text-bone transition-colors duration-300 group-hover/credit:text-signal-ink">
                  {c.title}
                </p>
                <p className="slate">
                  {c.role} · {c.house}
                </p>
              </div>
              <span className="font-mono text-[0.72rem] tracking-[0.08em] text-bone-faint">{c.year}</span>
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
