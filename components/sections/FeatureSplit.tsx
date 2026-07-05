import { Check } from "lucide-react";
import { Kicker } from "@/components/ui/bits";
import { Reveal } from "@/components/fx/Reveal";
import { cn } from "@/lib/utils";

/** Alternating text / media feature row. */
export default function FeatureSplit({
  index,
  kicker,
  title,
  body,
  bullets,
  media,
  reverse = false,
}: {
  index?: string;
  kicker: string;
  title: string;
  body: string;
  bullets?: string[];
  media: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
      <Reveal className={cn(reverse && "md:order-2")}>
        <Kicker index={index}>{kicker}</Kicker>
        <h3 className="mt-5 max-w-md font-display text-[clamp(1.7rem,3.4vw,2.7rem)] font-light leading-[1.08] text-bone text-balance">
          {title}
        </h3>
        <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-bone-dim text-pretty">
          {body}
        </p>
        {bullets && (
          <ul className="mt-7 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-tungsten" strokeWidth={2} />
                <span className="text-[0.92rem] text-bone-dim">{b}</span>
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      <Reveal delay={0.1} className={cn(reverse && "md:order-1")}>
        {media}
      </Reveal>
    </div>
  );
}
