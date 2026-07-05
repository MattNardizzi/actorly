"use client";

import { useEffect, useRef } from "react";
import { Renderer, Triangle, Program, Mesh } from "ogl";
import { prefersReducedMotion } from "@/lib/gsap";

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uOpacity;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    // Chunky, film-like grain sampled in device space.
    vec2 st = vUv * uResolution * 0.5;
    float g = hash(st + uTime * 57.0);
    // Bias toward mid-grey so overlay blend reads as luminance flicker.
    float v = mix(0.35, 0.85, g);
    gl_FragColor = vec4(vec3(v), uOpacity);
  }
`;

/**
 * Live WebGL film grain over the entire site. Advanced at ~24fps (film cadence)
 * rather than 60 — the flicker feels like real stock. Freezes on reduced motion.
 */
export default function Grain({ opacity = 0.5 }: { opacity?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    const renderer = new Renderer({ alpha: true, dpr: 1 });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uOpacity: { value: opacity },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    };
    resize();
    window.addEventListener("resize", resize);
    mount.appendChild(gl.canvas);

    const reduce = prefersReducedMotion();
    let raf = 0;
    let last = 0;
    const frameMs = 1000 / 24;

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < frameMs) return;
      last = t;
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };

    if (reduce) {
      program.uniforms.uTime.value = 0.5;
      renderer.render({ scene: mesh });
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.canvas.remove();
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, [opacity]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] mix-blend-overlay opacity-[0.5]"
      style={{ contain: "strict" }}
    />
  );
}
