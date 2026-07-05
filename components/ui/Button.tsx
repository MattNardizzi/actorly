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
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.82rem] font-medium tracking-wide transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-offset-4 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-tungsten text-noir hover:bg-tungsten-soft",
  ghost:
    "border border-ash-2 text-bone hover:border-tungsten hover:text-tungsten bg-transparent",
  record:
    "bg-rec/10 border border-rec/40 text-rec hover:bg-rec/20",
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

  return magnetic ? <Magnetic strength={0.3} className="inline-block">{el}</Magnetic> : el;
}
