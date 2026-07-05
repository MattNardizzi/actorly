# Actorly — Handoff (read this first in any new thread)

## What Actorly is
A **total rebrand + rebuild of castandhire.ie → actorly.ie**: a subscription casting
database for **actors and casting directors in Ireland** (Matt is building it for a friend).
- **Actors** build a profile (headshots, showreel, voice reel, training, skills, gallery,
  languages, accents, physical stats, phone), can upload a PDF résumé to auto-fill it,
  apply to jobs, and send self-tapes.
- **Casting directors** search the database by ~15 attributes, post jobs, request self-tapes,
  shortlist applicants (1–6 rating), and message actors. No profile to build.
- **Agents** are a directory (adult / child / model / UK-based) casting can copy for BCC.
- **Instacast** = the self-tape system: €5 per tape or €50 unlimited for a year (Stripe later).
- **Admin** approves actor activation once minimum profile (avatar + experience + training) is met.

Full feature brief is long — see the original spec; the sitemap below captures the shape.

## Status (as of 2026-07-04)
- **Phase 1 built:** cinematic public site + designed, clickable **mock** portal screens.
  Backend is NOT built (no DB, no auth, no email, no payments — forms are front-end mocks).
- **⚠️ The v1 visual design ("Screen Test" — warm cinematic dark, Fraunces + Courier Prime +
  Instrument Sans, tungsten/amber spotlight, film grain, letterbox) was REJECTED by the
  client's friend. A COMPLETE REDESIGN is planned. Do NOT reuse the v1 look — start a fresh
  aesthetic once the new direction is known.**
- Before redesigning, get: (a) what specifically was disliked, (b) reference sites / a direction.

## Sitemap (the durable floor plan — survives any redesign)
Public: `/` · `/for-actors` · `/for-casting` · `/instacast` · `/pricing` · `/about` · `/contact` · `/login` · `/join`
Portal (designed, mock): `/portal/actor` · `/portal/casting` · `/portal/admin` (last two not yet built)

## Tech stack (SOTA as of build)
Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 (CSS-first `@theme`)
· GSAP 3.15 (+ ScrollTrigger, SplitText) · Lenis · Motion (Framer) · OGL (WebGL) · lucide-react.
Deploy target: **Vercel**. Dev: `npm run dev` (repo has `.claude/launch.json`, port 3210).

## Reuse vs replace in the redesign
**KEEP (logic/skeleton, design-agnostic):**
- `lib/mock.ts` — authentic Irish actors, jobs, agents, filter vocab. Reuse as-is.
- `lib/utils.ts` — `cn`, `euro`, `clamp`, `lerp`.
- `components/casting/CastingSearch.tsx` — a genuinely working roster search/filter. Logic reusable.
- `components/casting/AgentsCopyTool.tsx` — working copy-to-clipboard BCC tool. Logic reusable.
- Routing, page structure, the mock form flows (JoinForm email-verify mock, etc.).

**REPLACE (pure skin — the redesign):**
- `app/globals.css` design tokens + all utility classes.
- Fonts and type system. Color palette. All component styling.
- The "Screen Test" motifs: `components/fx/*` (Grain, CursorLight), duotone, letterbox, slate.
- `DESIGN.md` / `QUALITY_BAR.md` describe the v1 direction — rewrite for the new one.

## Next steps
1. New thread → share the friend's feedback + a design direction.
2. Restyle against the new direction, keeping the skeleton/logic above.
3. Build remaining portal screens (`/portal/casting`, `/portal/admin`).
4. Then Phase 2: real backend (DB + Auth + Resend email + Stripe for Instacast).
