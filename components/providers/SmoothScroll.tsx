"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Inertial smooth-scroll (Lenis) on its own autoRaf clock, with ScrollTrigger
 * synced from Lenis scroll events. Deliberately NOT wired into gsap.ticker:
 * sharing one clock means any exception in the scroll chain can kill every
 * GSAP tween on the site. Isolated clocks = isolated failures.
 * Disabled entirely under prefers-reduced-motion → native scroll, no easing.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.25,
      wheelMultiplier: 1,
      autoRaf: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Expose for programmatic scrolls (anchor links, "back to top").
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
