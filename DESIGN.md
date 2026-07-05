# Actorly — Art Direction: "THE REGISTER" (stark white)

> A white room, gallery light, a wall of faces. Actorly is a casting *instrument*:
> the whole of Irish talent read as a bright, high-key gallery of faces on a stark
> white canvas, with a viewfinder HUD laid over it in thin dark hairlines.
> cosmos.so's clean white gallery, given the sharpness of a film scanner.
> The interface is monochrome; the faces are the only colour.

This replaced both the rejected v1 ("Screen Test" — warm amber, Fraunces serif,
letterbox) and the interim dark draft. **Stark white always.** If it feels warm or
murky, it's wrong.

## Concept
The site is a **register** — a casting roster, an image-registration grid, a cold
tonal register. Faces live on an edge-to-edge white canvas; a casting-instrument
HUD (registration ticks, live coordinate/timecode readout, an edge progress
reticle) frames everything. Clean, crisp, futuristic, quiet-luxury.

## Palette — stark white + one electric signal
Monochrome UI: white grounds, near-black ink, hairline rules. Exactly ONE
chromatic accent (`signal`) for live/active/focus/emphasis; `rec` red reserved
for recording / Instacast only.

> ⚠️ TOKEN-NAME CAVEAT: legacy Tailwind color names are kept as the palette API —
> but their VALUES are light. `noir` = the WHITE ground. `bone` = the DARK ink.
> `tungsten` = the dark button fill. Do not read the names literally.

| Token (class)   | Value     | Meaning now                                 |
|-----------------|-----------|---------------------------------------------|
| `noir`          | `#FFFFFF` | Base ground — stark white                    |
| `noir-2`        | `#F6F7F9` | Second ground / sections                     |
| `char` / `char-2` | `#F0F1F4` / `#E8EAEE` | Elevated surfaces, cards      |
| `ash` / `ash-2` | `#E3E5EA` / `#D2D5DB` | Light borders / controls       |
| `bone`          | `#0C0D10` | Primary ink — near-black                     |
| `bone-dim`      | `#565A63` | Secondary text                               |
| `bone-faint`    | `#8A8E97` | Tertiary / captions / HUD                    |
| `tungsten`      | `#0C0D10` | **The dark fill** — primary buttons          |
| `signal`        | `#3646DD` | **The one accent** — live / active / focus   |
| `rec`           | `#E23129` | Recording red — Instacast / self-tape ONLY   |

CSS vars for hairlines: `--line`, `--line-soft`, `--line-strong` (near-black at
low alpha). On-image helpers (theme-independent): `.on-image`, `.on-image-dim`,
`.scrim-b` — anything sitting ON a photo gets a dark scrim + light ink.

## Type — three voices
- **Archivo** (`font-display`) — technical grotesque. Headlines, wordmark, big statements.
- **Hanken Grotesk** (`font-sans`) — clean neutral grotesque. Body, UI, forms, tables.
- **Martian Mono** (`font-mono`) — wide technical mono. The HUD voice: kickers, slate,
  codes, coordinates, timecodes. The domain signature. Small + tracked.

## Signature motifs (the unforgettable things)
1. **The HUD** — fixed viewfinder overlay: corner registration ticks, live readout
   (`POS %`, pointer `X/Y`, rolling 24fps timecode), edge progress reticle. (`components/fx/HUD.tsx`)
2. **The face-wall** — a living, drifting masonry of headshots behind the hero; the
   cosmos move, but every image is a real actor. (`components/home/FaceWall.tsx`)
3. **The reticle cursor** — a registration ring + centre dot in mix-blend-difference;
   opens/targets on interactive elements. (`components/fx/CursorLight.tsx`)
4. **The gallery grade** — `.duotone`: faces slightly desaturated, resolving to full
   colour under hover. The gallery brings faces up under light.
5. **Video stills** — self-tape mocks read as real recordings: dark top gradient +
   `.scrim-b`, red REC chrome, light on-image captions, light viewfinder corners.

## Motion law (one clock per concern, one curve)
- Smooth scroll: **Lenis** on its own `autoRaf` clock; ScrollTrigger syncs from its
  scroll events. Deliberately NOT wired into gsap.ticker — isolated clocks mean a
  scroll-chain error can never kill the site's animation.
- Reveals: **CSS-driven, IO-triggered, fail-visible** (`components/fx/Reveal.tsx` +
  the `.rv-*` classes in globals.css). JS only toggles classes; CSS transitions on
  `--ease-cine` do the motion. No reveal can ever leave content hidden.
- Set pieces: **GSAP ScrollTrigger** for pinned/scrubbed scenes (CastWall) and
  Magnetic/counters. Master easing `--ease-cine: cubic-bezier(0.16,1,0.3,1)`.
- Stagger 40–90ms; reveals 0.9–1.4s. Certain, never bouncy.
- `prefers-reduced-motion`: reveals never engage (content simply present), drifts
  and pulses freeze, Lenis disabled → native scroll.

## The hard rule
**Preserve every capability.** Re-skin, never rewrite logic. Every route, useState,
filter, form, rating, toggle, copy-tool and mock flow stays wired. No lorem ipsum —
real Irish industry content (Screen Ireland, RTÉ, the Abbey, TG4, Druid) verbatim.

## Voice / copy
Sparse, confident, a little literary. Screenwriter's economy. Irish, not
leprechaun-Irish.
