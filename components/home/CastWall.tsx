"use client";

import { useRef } from "react";
import { registerGsap, gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ACTORS } from "@/lib/mock";
import ActorCard from "@/components/cards/ActorCard";
import { Kicker } from "@/components/ui/bits";

/**
 * The emotional centre: a pinned section you scroll *through* horizontally,
 * a wall of Irish talent developing out of the dark. On small screens / reduced
 * motion it degrades to a native horizontal snap-scroll.
 */
export default function CastWall() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const sec = section.current;
      const trk = track.current;
      if (!sec || !trk) return;
      if (prefersReducedMotion() || window.innerWidth < 900) return;

      const getScroll = () => trk.scrollWidth - window.innerWidth * 0.92;

      const tween = gsap.to(trk, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${getScroll()}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="relative overflow-hidden bg-noir-2 py-24 md:py-0"
      aria-label="Featured Irish talent"
    >
      <div className="md:flex md:h-screen md:flex-col md:justify-center">
        <div className="mb-12 px-[var(--spacing-gutter)] md:mb-16">
          <Kicker index="03">The cast wall</Kicker>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.05] text-bone text-balance">
            Every face on Actorly is a real actor,{" "}
            <span className="italic text-tungsten">looking for the room.</span>
          </h2>
        </div>

        <div
          ref={track}
          className="flex gap-5 overflow-x-auto px-[var(--spacing-gutter)] pb-4 [scrollbar-width:none] md:overflow-visible md:pb-0 md:[-webkit-overflow-scrolling:touch]"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {ACTORS.map((a, i) => (
            <div
              key={a.id}
              className="w-[74vw] shrink-0 sm:w-[46vw] md:w-[300px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <ActorCard actor={a} priority={i < 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
