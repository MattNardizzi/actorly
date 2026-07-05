import Link from "next/link";
import Wordmark from "@/components/ui/Wordmark";
import { Rule } from "@/components/ui/bits";

const COLUMNS = [
  {
    title: "For Actors",
    links: [
      { href: "/for-actors", label: "Build your profile" },
      { href: "/instacast", label: "Instacast self-tapes" },
      { href: "/pricing", label: "Membership" },
      { href: "/join", label: "Join as an actor" },
    ],
  },
  {
    title: "For Casting",
    links: [
      { href: "/for-casting", label: "Search the database" },
      { href: "/for-casting", label: "Post a job" },
      { href: "/portal/casting", label: "Casting workspace" },
      { href: "/join", label: "Join as a casting professional" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Actorly" },
      { href: "/contact", label: "Contact" },
      { href: "/login", label: "Log in" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
];

const ROLL = [
  "SCREEN IRELAND",
  "RTÉ",
  "THE ABBEY",
  "TG4",
  "DRUID",
  "GALWAY FILM FLEADH",
  "ARDMORE STUDIOS",
  "SCREEN PRODUCERS IRELAND",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-noir">
      {/* Credit-roll marquee */}
      <div className="flex overflow-hidden border-b py-6">
        <div
          className="marquee-track flex shrink-0 items-center gap-16 whitespace-nowrap pr-16"
          style={{ ["--marquee-dur" as string]: "50s" }}
        >
          {[...ROLL, ...ROLL].map((r, i) => (
            <span
              key={i}
              className="font-mono text-[0.66rem] uppercase tracking-[0.28em] text-bone-faint"
            >
              {r}
              <span className="ml-16 text-signal/50">+</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)] py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-bone-dim text-pretty">
              Ireland&rsquo;s casting database, rebuilt. Where actors are seen and
              casting directors see. Formerly castandhire.ie.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="kicker mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="link-underline text-[0.88rem] text-bone-dim transition-colors hover:text-bone"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Rule className="my-10" />

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone-faint">
            © {new Date().getFullYear()} Actorly — Made in Ireland
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((t) => (
              <Link
                key={t}
                href="/about"
                className="link-underline font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone-faint hover:text-bone-dim"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
