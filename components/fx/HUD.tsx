"use client";

import { useEffect, useRef } from "react";

/**
 * The casting-instrument HUD. A fixed, non-interactive overlay that frames the
 * whole canvas like a viewfinder: registration ticks in each corner, a live
 * readout (scroll position, pointer coordinates, a rolling 24fps timecode) and
 * an edge progress reticle. Desktop only; static under reduced motion. This is
 * the layer that reads as an instrument, not a gallery.
 */
export default function HUD() {
  const posRef = useRef<HTMLSpanElement>(null);
  const curRef = useRef<HTMLSpanElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mx = 0;
    let my = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    const pad = (n: number, l = 2) => String(Math.floor(n)).padStart(l, "0");
    const t0 = performance.now();
    let raf = 0;
    let last = 0;

    const paint = (now: number) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (posRef.current)
        posRef.current.textContent = `POS ${pad(pct)}.${pad((pct % 1) * 10, 1)}%`;
      if (progRef.current)
        progRef.current.style.transform = `translateY(${pct * 0.01 * 100}%)`;
      if (curRef.current)
        curRef.current.textContent = `X:${pad(mx, 4)} Y:${pad(my, 4)}`;
      if (tcRef.current) {
        const s = (now - t0) / 1000;
        tcRef.current.textContent = `TC ${pad(s / 3600)}:${pad((s / 60) % 60)}:${pad(s % 60)}:${pad((s * 24) % 24)}`;
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 66) return; // ~15fps — a HUD ticks, it doesn't stream
      last = now;
      paint(now);
    };

    if (reduce) paint(t0);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const tick = "absolute h-3 w-3";
  const tickStyle = { borderColor: "var(--line-strong)" } as const;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[62] hidden md:block"
    >
      {/* Corner registration ticks. */}
      <span className={`${tick} left-4 top-4 border-l border-t`} style={tickStyle} />
      <span className={`${tick} right-4 top-4 border-r border-t`} style={tickStyle} />
      <span className={`${tick} bottom-4 left-4 border-l border-b`} style={tickStyle} />
      <span className={`${tick} bottom-4 right-4 border-r border-b`} style={tickStyle} />

      {/* Edge progress reticle — right rail. */}
      <div className="absolute right-4 top-1/2 h-40 w-px -translate-y-1/2 overflow-hidden bg-[var(--line)]">
        <div
          ref={progRef}
          className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-signal"
          style={{ boxShadow: "0 0 8px 1px color-mix(in srgb, var(--color-signal) 60%, transparent)" }}
        />
      </div>

      {/* Bottom readout strip. */}
      <div className="absolute inset-x-[var(--spacing-gutter)] bottom-5 flex items-center justify-between opacity-55">
        <div className="slate flex items-center gap-2.5">
          <span className="signal-dot h-1.5 w-1.5 rounded-full bg-signal" />
          <span className="text-bone-dim">LIVE</span>
          <span className="text-bone-faint">/ THE REGISTER</span>
        </div>
        <div className="slate flex items-center gap-3 text-bone-faint">
          <span ref={posRef}>POS 00.0%</span>
          <span className="text-ash-2">·</span>
          <span ref={curRef}>X:0000 Y:0000</span>
          <span className="text-ash-2">·</span>
          <span ref={tcRef}>TC 00:00:00:00</span>
        </div>
      </div>
    </div>
  );
}
