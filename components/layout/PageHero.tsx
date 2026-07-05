import { Kicker } from "@/components/ui/bits";
import { TextReveal, Reveal } from "@/components/fx/Reveal";
import { cn } from "@/lib/utils";

/** Consistent interior-page hero — keeps every page anchored to the same frame. */
export default function PageHero({
  index,
  kicker,
  title,
  emphasis,
  sub,
  slateRight,
  glow = "tungsten",
  children,
}: {
  index?: string;
  kicker: string;
  title: string;
  emphasis?: string;
  sub?: string;
  slateRight?: string;
  glow?: "tungsten" | "rec" | "none";
  children?: React.ReactNode;
}) {
  const glowColor =
    glow === "rec"
      ? "rgba(225,68,52,0.13)"
      : glow === "none"
        ? "transparent"
        : "rgba(232,184,114,0.15)";

  return (
    <section className="relative overflow-hidden px-[var(--spacing-gutter)] pb-16 pt-[150px] md:pb-24 md:pt-[200px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[80vh] -translate-x-1/2 rounded-full opacity-70 blur-[90px]"
        style={{ background: `radial-gradient(circle, ${glowColor}, transparent 68%)` }}
      />
      <div className="relative mx-auto max-w-[1500px]">
        <Reveal>
          <div className="flex items-center justify-between">
            <Kicker index={index}>{kicker}</Kicker>
            {slateRight && <span className="slate hidden md:block">{slateRight}</span>}
          </div>
        </Reveal>

        <h1
          className={cn(
            "mt-8 max-w-5xl font-display font-light leading-[0.98] tracking-[-0.02em] text-bone text-balance",
            "text-[clamp(2.4rem,6.5vw,5.5rem)]",
          )}
        >
          <TextReveal as="span" className="block" delay={0.08}>
            {title}
          </TextReveal>
          {emphasis && (
            <TextReveal as="span" className="block italic text-tungsten" delay={0.2}>
              {emphasis}
            </TextReveal>
          )}
        </h1>

        {sub && (
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-bone-dim text-pretty">
              {sub}
            </p>
          </Reveal>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
