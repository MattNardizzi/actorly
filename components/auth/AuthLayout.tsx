import { face, ACTORS } from "@/lib/mock";
import Wordmark from "@/components/ui/Wordmark";

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
      {/* Left — the wall */}
      <div className="relative hidden overflow-hidden border-r border-ash/60 bg-noir-2 md:block">
        <div className="absolute inset-0 grid grid-cols-3 opacity-[0.5]">
          {faces.map((a) => (
            <div key={a.id} className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={face(a.img)} alt="" className="duotone h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-noir/30" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full opacity-60 blur-[90px]"
          style={{ background: "radial-gradient(circle, rgba(232,184,114,0.16), transparent 68%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-between p-10">
          <span className="slate">SCENE 00 · THE WAY IN</span>
          <blockquote className="max-w-md">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-light italic leading-[1.15] text-bone text-balance">
              &ldquo;{quote}&rdquo;
            </p>
            <footer className="mt-4 slate">— {quoteBy}</footer>
          </blockquote>
        </div>
      </div>

      {/* Right — the form */}
      <div className="flex items-center justify-center px-[var(--spacing-gutter)] py-24">
        <div className="w-full max-w-md">
          <div className="mb-10 md:hidden">
            <Wordmark />
          </div>
          <h1 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-light leading-tight text-bone text-balance">
            {title}
          </h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-bone-dim text-pretty">{sub}</p>
          <div className="mt-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
