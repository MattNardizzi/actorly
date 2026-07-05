import Button from "@/components/ui/Button";
import { Kicker, Rule } from "@/components/ui/bits";
import { Reveal } from "@/components/fx/Reveal";

/** Reusable closing call-to-action band. */
export default function CTABand({
  kicker = "Your move",
  title,
  sub,
  primary,
  secondary,
  note,
}: {
  kicker?: string;
  title: string;
  sub?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  note?: string;
}) {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(232,184,114,0.13), transparent 68%)" }}
      />
      <div className="relative mx-auto max-w-[1500px] px-[var(--spacing-gutter)] text-center">
        <Reveal>
          <Kicker className="justify-center">{kicker}</Kicker>
        </Reveal>
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.2rem,6vw,5rem)] font-light leading-[1] tracking-[-0.02em] text-bone text-balance">
          {title}
        </h2>
        {sub && (
          <p className="mx-auto mt-6 max-w-md text-[1.02rem] leading-relaxed text-bone-dim text-pretty">
            {sub}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href={primary.href} arrow>
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="ghost">
              {secondary.label}
            </Button>
          )}
        </div>
        {note && (
          <>
            <Rule className="mx-auto mt-16 max-w-md" />
            <p className="mt-6 slate">{note}</p>
          </>
        )}
      </div>
    </section>
  );
}
