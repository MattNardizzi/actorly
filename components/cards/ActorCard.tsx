import { Film, Mic, Clapperboard } from "lucide-react";
import type { Actor } from "@/lib/mock";
import Headshot from "@/components/media/Headshot";
import { cn } from "@/lib/utils";

/** The core object of the whole platform: an actor, framed as a gallery tile. */
export default function ActorCard({
  actor,
  className,
  priority = false,
}: {
  actor: Actor;
  className?: string;
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden border bg-noir-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <Headshot img={actor.img} name={actor.name} priority={priority} />

      {/* Reel badges float on the frame — neutral instrument chips. */}
      <div className="pointer-events-none absolute right-3 top-3 flex gap-1.5">
        {actor.showreel && (
          <span
            title="Has showreel"
            className="glass flex h-7 w-7 items-center justify-center rounded-full text-bone-dim transition-colors group-hover:text-bone"
          >
            <Film className="h-3.5 w-3.5" strokeWidth={1.6} />
          </span>
        )}
        {actor.voicereel && (
          <span
            title="Has voice reel"
            className="glass flex h-7 w-7 items-center justify-center rounded-full text-bone-dim transition-colors group-hover:text-bone"
          >
            <Mic className="h-3.5 w-3.5" strokeWidth={1.6} />
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-[1.12rem] font-medium leading-tight tracking-[-0.02em] text-bone">
            {actor.name}
          </h3>
        </div>

        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-bone-faint">
          {actor.location} · {actor.playingAge}
        </p>

        <p className="mt-1 text-[0.86rem] leading-snug text-bone-dim text-pretty">
          {actor.headline}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-3">
          <Clapperboard className="h-3.5 w-3.5 text-bone-faint" strokeWidth={1.5} />
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-bone-faint">
            {actor.agent ?? "Independent"}
          </span>
        </div>
      </div>
    </article>
  );
}
