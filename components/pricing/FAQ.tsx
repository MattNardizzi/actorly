"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Stagger } from "@/components/fx/Reveal";

const QA = [
  {
    q: "Do casting directors pay to use Actorly?",
    a: "No — searching the database, messaging actors and posting jobs are all free for casting professionals. The only paid element on the casting side is receiving Instacast self-tapes, which carry a small processing fee paid by the actor.",
  },
  {
    q: "What's the difference between Spotlight and Pro for actors?",
    a: "Spotlight is a free, fully-searchable profile — you appear in casting searches and can browse every job. Pro adds showreel and voice-reel hosting, unlimited job applications, priority placement in search results, PDF résumé import and reduced Instacast fees.",
  },
  {
    q: "How much does a self-tape cost?",
    a: "Instacast is €5 per tape, or €50 for unlimited self-tapes for a full year. You only pay at the moment you send — it's never a hidden subscription.",
  },
  {
    q: "Do I have to be approved before I can apply for jobs?",
    a: "Yes. To keep the database real for casting directors, every actor is verified once by our team. The minimum is an avatar headshot, your past experience and your training. Once that's in place you request activation and an administrator reviews your profile.",
  },
  {
    q: "I'm on castandhire.ie already — what happens to my account?",
    a: "Actorly is the same community and database, rebuilt from the ground up. Existing members carry over — you'll simply arrive to a profile that finally does your work justice.",
  },
  {
    q: "Can casting directors contact me by phone?",
    a: "Only if you allow it. You choose whether to share your number in your notification settings — casting directors can then message you to your phone. Turn it off any time.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Stagger className="mx-auto max-w-[800px] divide-y border-y">
      {QA.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="group">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-baseline gap-4">
                <span
                  className={cn(
                    "inline-block w-6 shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.16em] transition-colors duration-500",
                    isOpen ? "text-signal" : "text-bone-faint",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-display text-[1.15rem] font-light tracking-[-0.02em] transition-colors duration-500",
                    isOpen ? "text-signal-ink" : "text-bone-dim group-hover:text-bone",
                  )}
                >
                  {item.q}
                </span>
              </span>
              <Plus
                className={cn(
                  "mt-1 h-5 w-5 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isOpen ? "rotate-45 text-signal" : "text-bone-faint group-hover:text-bone-dim",
                )}
                strokeWidth={1.5}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="ml-[1.5rem] max-w-2xl border-l border-signal/40 pl-[1rem] text-[0.94rem] leading-relaxed text-bone-dim text-pretty">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Stagger>
  );
}
