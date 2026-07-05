"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { registerGsap, gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/* -------------------------------------------------------------------------- */
/*  TextReveal — headline lines rise out of a mask, staggered. The signature.  */
/* -------------------------------------------------------------------------- */
export function TextReveal({
  as: Tag = "span",
  children,
  className,
  delay = 0,
  stagger = 0.09,
  duration = 1.15,
  start = "top 88%",
  once = true,
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

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const split = new SplitText(el, { type: "lines", mask: "lines" });
      gsap.set(el, { autoAlpha: 1 });
      gsap.from(split.lines, {
        yPercent: 118,
        duration,
        ease: "cine",
        stagger,
        delay,
        scrollTrigger: once
          ? { trigger: el, start }
          : { trigger: el, start, toggleActions: "restart none none reverse" },
      });

      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ visibility: "hidden" }}
      data-reveal-text
    >
      {children}
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
  start = "top 90%",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.from(el, {
        autoAlpha: 0,
        y,
        duration,
        ease: "cine",
        delay,
        scrollTrigger: { trigger: el, start },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
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
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const kids = Array.from(el.children);
      if (!kids.length) return;
      gsap.from(kids, {
        autoAlpha: 0,
        y,
        duration: 1,
        ease: "cine",
        stagger,
        scrollTrigger: { trigger: el, start },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
