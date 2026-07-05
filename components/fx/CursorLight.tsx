"use client";

import { useEffect, useRef } from "react";

/**
 * The cold instrument reticle. A precise ring + centre dot tracks the pointer —
 * a viewfinder registration mark. On interactive targets the ring opens and the
 * dot hides (a "targeting" state). Uses mix-blend-difference so it stays visible
 * on the white ground AND on dark image tiles. Pointer-fine devices only; never
 * traps the cursor (pointer-events: none).
 */
export default function CursorLight() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    document.documentElement.classList.add("hide-native-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let hot = false;
    let down = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement | null;
      hot = !!target?.closest(
        "a, button, [role='button'], input, textarea, select, [data-hot]",
      );
    };
    const onDown = () => (down = true);
    const onUp = () => (down = false);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      rx += (mx - rx) * 0.35;
      ry += (my - ry) * 0.35;
      const ringScale = (hot ? 1.9 : 1) * (down ? 0.82 : 1);
      ring.style.transform = `translate3d(${rx - 17}px, ${ry - 17}px, 0) scale(${ringScale})`;
      ring.style.borderColor = hot
        ? "color-mix(in srgb, var(--color-signal) 90%, transparent)"
        : "rgba(140,140,150,0.9)";
      dot.style.transform = `translate3d(${mx - 2}px, ${my - 2}px, 0)`;
      dot.style.opacity = hot ? "0" : "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    if (!reduce) loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("hide-native-cursor");
    };
  }, []);

  return (
    <>
      {/* Registration ring. */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-[34px] w-[34px] rounded-full border will-change-transform"
        style={{
          borderColor: "rgba(140,140,150,0.9)",
          transition: "border-color 0.3s ease, transform 0.18s ease-out",
          mixBlendMode: "difference",
        }}
      />
      {/* Exact centre dot. */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-[4px] w-[4px] rounded-full mix-blend-difference transition-opacity duration-200 will-change-transform"
        style={{ background: "rgba(140,140,150,1)" }}
      />
    </>
  );
}
