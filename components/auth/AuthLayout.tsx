import { face, ACTORS } from "@/lib/mock";
import Wordmark from "@/components/ui/Wordmark";
import { Slate } from "@/components/ui/bits";
import { TextReveal, Reveal } from "@/components/fx/Reveal";

/** Cinematic split auth frame — a wall of faces on the left, the form on the right. */
export default function AuthLayout({
  title,
  sub,
  quote,
  quoteBy,
  children,
}: {
  title: string;
  sub: string;
  quote: string;
  quoteBy: string;
  children: React.ReactNode;
}) {
  const faces = [ACTORS[0], ACTORS[6], ACTORS[13], ACTORS[4], ACTORS[9], ACTORS[1]];
  return (
    <section className="grid min-h-[100svh] md:grid-cols-[1.05fr_1fr]">
      {/* Left — the wall of faces */}
      <div className="relative hidden overflow-hidden border-r border-ash/60 bg-noir-2 md:block">
        {/* the cold face-wall register */}
        <div className="absolute inset-0 grid grid-cols-3">
          {faces.map((a) => (
            <div key={a.id} className="group relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={face(a.img)} alt="" className="duotone h-full w-full object-cover opacity-[0.62]" />
              {/* hairline register between tiles */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ boxShadow: "inset 0 0 0 0.5px var(--line-soft)" }}
              />
            </div>
          ))}
        </div>

        {/* reading grade — seats the faces in the dark */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-noir/30" />

        {/* faint blueprint register drawn over the wall */}
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(120%_90%_at_30%_60%,black,transparent_78%)]"
        />

        {/* cold signal key-light */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full opacity-60 blur-[90px]"
          style={{ background: "radial-gradient(circle, rgba(124,143,255,0.16), transparent 68%)" }}
        />

        {/* viewfinder corners over the whole wall */}
        <div className="brackets pointer-events-none absolute inset-0" />

        <div className="absolute inset-0 flex flex-col justify-between p-10">
          <div className="flex items-center gap-3">
            <span className="signal-dot h-2 w-2 rounded-full bg-signal" aria-hidden />
            <Slate scene="00" take="01" roll="THE WAY IN" />
          </div>

          <blockquote className="max-w-md">
            <TextReveal
              as="p"
              className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-light leading-[1.15] text-bone text-balance"
              delay={0.15}
            >
              &ldquo;{quote}&rdquo;
            </TextReveal>
            <footer className="mt-4 flex items-center gap-3 slate">
              <span className="h-px w-8" style={{ background: "var(--line-strong)" }} aria-hidden />
              {quoteBy}
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right — the form */}
      <div className="relative flex items-center justify-center px-[var(--spacing-gutter)] py-24">
        {/* faint register behind the form for cohesion */}
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(90%_70%_at_50%_18%,black,transparent_72%)]"
        />
        <div className="relative w-full max-w-md">
          <div className="mb-10 md:hidden">
            <Wordmark />
          </div>
          <Reveal>
            <h1 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-light leading-tight tracking-[-0.03em] text-bone text-balance">
              {title}
            </h1>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-bone-dim text-pretty">{sub}</p>
          </Reveal>
          <Reveal delay={0.12} className="mt-9">
            {children}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
