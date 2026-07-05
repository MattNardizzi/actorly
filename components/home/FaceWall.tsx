import { ACTORS, face, type Actor } from "@/lib/mock";
import { cn } from "@/lib/utils";

/* Deterministic per-column face selection (no Math.random → hydration-safe). */
function columnFaces(col: number, count: number): Actor[] {
  const out: Actor[] = [];
  for (let i = 0; i < count; i++) {
    out.push(ACTORS[(col * 5 + i * 7 + 3) % ACTORS.length]);
  }
  return out;
}

/* Each column drifts at its own speed; alternate columns drift downward. */
const COLUMNS = [
  { dur: "52s", dir: "normal" as const },
  { dur: "63s", dir: "reverse" as const },
  { dur: "46s", dir: "normal" as const },
  { dur: "58s", dir: "reverse" as const },
  { dur: "69s", dir: "normal" as const },
  { dur: "50s", dir: "reverse" as const },
];

/* Show fewer columns on smaller screens. */
const COL_VISIBILITY = [
  "",
  "",
  "hidden sm:block",
  "hidden md:block",
  "hidden lg:block",
  "hidden xl:block",
];

function Tile({ actor, index }: { actor: Actor; index: number }) {
  return (
    <div className="group/tile relative overflow-hidden bg-char">
      <div className="aspect-[3/4] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={face(actor.img)}
          alt={`${actor.name} — headshot`}
          loading="lazy"
          className="duotone h-full w-full scale-105 object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-100"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100"
      />
      {/* HUD caption — rises on hover. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-2.5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:translate-y-0 group-hover/tile:opacity-100">
        <p className="on-image truncate font-display text-[0.8rem] font-medium leading-tight">
          {actor.name}
        </p>
        <p className="on-image-dim mt-0.5 slate">
          REG-{String(index + 1).padStart(3, "0")} · {actor.location}
        </p>
      </div>
    </div>
  );
}

/**
 * The face-wall — a living, drifting field of Irish headshots. The cosmos move,
 * but every image is a real actor looking for the room. Cool-graded until brought
 * up under the cursor. Pure-CSS drift (server component, no hydration cost); frozen
 * under reduced motion. Fills its positioned parent.
 */
export default function FaceWall({
  className,
  tilesPerColumn = 5,
}: {
  className?: string;
  tilesPerColumn?: number;
}) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="flex h-full min-h-full gap-2.5 px-2.5">
        {COLUMNS.map((c, ci) => {
          const faces = columnFaces(ci, tilesPerColumn);
          const doubled = [...faces, ...faces];
          return (
            <div
              key={ci}
              className={cn("relative flex-1 overflow-hidden", COL_VISIBILITY[ci])}
            >
              <div
                className="col-drift flex flex-col gap-2.5 will-change-transform"
                style={{
                  ["--drift-dur" as string]: c.dur,
                  animationDirection: c.dir,
                }}
              >
                {doubled.map((a, i) => (
                  <Tile key={`${ci}-${i}`} actor={a} index={(ci * tilesPerColumn + i) % (ACTORS.length)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
