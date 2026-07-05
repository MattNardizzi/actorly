import { cn } from "@/lib/utils";

/** Screenplay-slate kicker — the domain signature, sits above headlines. */
export function Kicker({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index?: string;
}) {
  return (
    <span className={cn("kicker inline-flex items-center gap-3", className)}>
      {index && <span className="text-tungsten">{index}</span>}
      <span className="h-px w-8 bg-ash-2" aria-hidden />
      {children}
    </span>
  );
}

/** Small pill tag for skills, accents, categories. */
export function Tag({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "light" | "record";
}) {
  const tones = {
    default: "border-ash-2 text-bone-dim",
    light: "border-tungsten/40 text-tungsten",
    record: "border-rec/40 text-rec",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A hairline rule. */
export function Rule({ className }: { className?: string }) {
  return <div className={cn("rule", className)} aria-hidden />;
}

/** Clapperboard corner metadata — decorative, pins a section to the "soundstage". */
export function Slate({
  scene,
  take,
  roll,
  className,
}: {
  scene?: string;
  take?: string;
  roll?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "slate flex flex-wrap items-center gap-x-5 gap-y-1",
        className,
      )}
      aria-hidden
    >
      {scene && (
        <span>
          SCENE <span className="text-bone-dim">{scene}</span>
        </span>
      )}
      {take && (
        <span>
          TAKE <span className="text-bone-dim">{take}</span>
        </span>
      )}
      {roll && (
        <span>
          ROLL <span className="text-bone-dim">{roll}</span>
        </span>
      )}
    </div>
  );
}
