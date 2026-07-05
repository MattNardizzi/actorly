import { face } from "@/lib/mock";
import { cn } from "@/lib/utils";

const ratios: Record<string, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  tall: "aspect-[2/3]",
};

/**
 * A headshot that lives in the dark until looked at — the "developing" motif.
 * Plain <img> (external portraits) with the duotone treatment + a floor gradient.
 */
export default function Headshot({
  img,
  name,
  className,
  ratio = "portrait",
  priority = false,
}: {
  img: number;
  name: string;
  className?: string;
  ratio?: keyof typeof ratios;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-char", ratios[ratio], className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={face(img)}
        alt={`${name} — headshot`}
        loading={priority ? "eager" : "lazy"}
        className="duotone h-full w-full scale-105 object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir via-noir/10 to-transparent opacity-90"
        aria-hidden
      />
    </div>
  );
}
