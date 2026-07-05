import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/fx/Magnetic";

type Variant = "primary" | "ghost" | "record";
type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3 text-[0.8rem] font-medium tracking-[0.01em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-offset-4 select-none overflow-hidden";

const variants: Record<Variant, string> = {
  // Cold arc-light on obsidian — the gallery button.
  primary: "bg-tungsten text-noir hover:bg-tungsten-soft",
  // Hairline instrument button — border lights to signal on hover.
  ghost:
    "border border-ash-2 text-bone bg-transparent hover:border-signal/60 hover:text-bone hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-signal)_20%,transparent),0_18px_50px_-24px_color-mix(in_srgb,var(--color-signal)_40%,transparent)]",
  // Recording — Instacast only.
  record: "border border-rec/40 bg-rec/10 text-rec hover:bg-rec/20",
};

export default function Button({
  children,
  href,
  variant = "primary",
  arrow = false,
  magnetic = true,
  className,
  onClick,
  type = "button",
}: Props) {
  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2.5">
      {variant === "record" && (
        <span className="rec-dot h-2 w-2 rounded-full bg-rec" aria-hidden />
      )}
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </span>
  );

  const classes = cn(base, variants[variant], className);

  const el = href ? (
    <Link href={href} className={classes} onClick={onClick}>
      {inner}
    </Link>
  ) : (
    <button type={type} className={classes} onClick={onClick}>
      {inner}
    </button>
  );

  return magnetic ? (
    <Magnetic strength={0.3} className="inline-block">
      {el}
    </Magnetic>
  ) : (
    el
  );
}
