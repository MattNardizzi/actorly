"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/* CSS-driven reveals, IO-triggered, FAIL-VISIBLE.
   JS only toggles classes: .rv-pre (start position, added just before observing)
   and .rv-in (settled, added on viewport entry). The motion itself is a CSS
   transition on the cine curve — it cannot be stalled by any JS ticker, is
   immune to Strict-Mode double effects and HMR, and if JS never runs the
   content is simply visible. See globals.css "Reveal primitives". */

const useReveal = (
  ref: React.RefObject<HTMLElement | null>,
  prep: (el: HTMLElement) => void,
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (el.classList.contains("rv-in")) return; // already revealed (HMR/remount)

    prep(el);
    el.classList.add("rv-pre");
    // Commit the start state before observing so the transition can run.
    void el.offsetHeight;

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      el.classList.add("rv-in");
      obs.disconnect();
    };
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) fire();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    obs.observe(el);
    // Above-the-fold: fire next frame if already in view (IO's initial callback
    // can be missed under React Strict-Mode double effects).
    const rafId = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.94 && r.bottom > 0) fire();
    });

    return () => {
      done = true;
      cancelAnimationFrame(rafId);
      obs.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/* -------------------------------------------------------------------------- */
/*  TextReveal — a headline line rises out of a clip mask. The signature.      */
/*  Compose one per line (the call sites already do) for the cascade.          */
/* -------------------------------------------------------------------------- */
export function TextReveal({
  as: Tag = "span",
  children,
  className,
  delay = 0,
  duration = 1.15,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useReveal(ref, (el) => {
    el.style.setProperty("--rv-dur", `${duration}s`);
    el.style.setProperty("--rv-delay", `${delay}s`);
  });

  return (
    <Tag ref={ref} className={cn("rv-mask", className)} data-reveal-text>
      <span className="rv-line">{children}</span>
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reveal — generic block fade+rise on scroll into view.                      */
/* -------------------------------------------------------------------------- */
export function Reveal({
  children,
  className,
  y = 44,
  delay = 0,
  duration = 1.0,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useReveal(ref, (el) => {
    el.style.setProperty("--rv-y", `${y}px`);
    el.style.setProperty("--rv-dur", `${duration}s`);
    el.style.setProperty("--rv-delay", `${delay}s`);
  });

  return (
    <div ref={ref} className={cn("rv-block", className)}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stagger — reveal direct children in a cascade (cards, list items).         */
/* -------------------------------------------------------------------------- */
export function Stagger({
  children,
  className,
  y = 40,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useReveal(ref, (el) => {
    el.style.setProperty("--rv-y", `${y}px`);
    Array.from(el.children).forEach((kid, i) => {
      kid.classList.add("rv-kid");
      (kid as HTMLElement).style.transitionDelay = `${i * stagger}s`;
    });
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
