"use client";

import { useEffect, useRef } from "react";

/**
 * The spotlight motif made literal: a warm radial light that trails the pointer,
 * plus a minimal focus dot. Pointer-fine devices only; never traps the cursor
 * (pointer-events: none). Silent on touch and reduced-motion.
 */
export default function CursorLight() {
  const lightRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    const light = lightRef.current!;
    const dot = dotRef.current!;
    document.documentElement.classList.add("hide-native-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let lx = mx;
    let ly = my;
    let dx = mx;
    let dy = my;
    let raf = 0;
    let hot = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement | null;
      hot = !!target?.closest(
        "a, button, [role='button'], input, textarea, select, [data-hot]",
      );
    };
    const onDown = () => dot.classList.add("scale-[0.6]");
    const onUp = () => dot.classList.remove("scale-[0.6]");

    const loop = () => {
      raf = requestAnimationFrame(loop);
      // Light lags for weight; dot tracks tightly.
      lx += (mx - lx) * 0.09;
      ly += (my - ly) * 0.09;
      dx += (mx - dx) * 0.28;
      dy += (my - dy) * 0.28;
      light.style.transform = `translate3d(${lx - 300}px, ${ly - 300}px, 0)`;
      dot.style.transform = `translate3d(${dx - 5}px, ${dy - 5}px, 0) scale(${hot ? 2.1 : 1})`;
      dot.style.opacity = hot ? "0.35" : "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    if (!reduce) loop();
    else {
      light.style.opacity = "0.5";
    }

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
      <div
        ref={lightRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-[600px] w-[600px] rounded-full opacity-70 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(232,184,114,0.14) 0%, rgba(232,184,114,0.05) 32%, transparent 62%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-[10px] w-[10px] rounded-full bg-tungsten mix-blend-difference transition-[transform,opacity] duration-200 ease-out will-change-transform"
      />
    </>
  );
}
