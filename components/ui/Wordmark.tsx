import Link from "next/link";
import { Aperture } from "lucide-react";
import { cn } from "@/lib/utils";

/** Actorly wordmark — a camera aperture (the lens that finds you) + the name. */
export default function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Actorly — home"
      className={cn(
        "group inline-flex items-center gap-2.5 text-bone",
        className,
      )}
    >
      <Aperture
        className="h-[1.15em] w-[1.15em] text-tungsten transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[72deg]"
        strokeWidth={1.4}
      />
      <span className="font-display text-[1.35rem] font-medium tracking-[-0.02em]">
        Actorly
      </span>
    </Link>
  );
}
