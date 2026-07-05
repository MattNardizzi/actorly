# Actorly — Art Direction: "Screen Test"

> The hush before the camera rolls. A single warm light finds a face in the dark.
> Actorly is where actors are *seen* and casting directors *see*. Every screen should
> feel like the moment of discovery on a soundstage.

## Concept
A casting platform rebuilt as a **film title sequence** crossed with a **casting studio**.
Not "dark SaaS." Warm, filmic, human, restrained. The performer is the light source.

## Palette (warm cinematic — never blue-black)
| Token            | Hex        | Use                                             |
|------------------|------------|-------------------------------------------------|
| `--noir`         | `#0B0A08`  | Base — a darkened theatre, warm not cold        |
| `--noir-2`       | `#100D0A`  | Second ground / sections                        |
| `--char`         | `#17130D`  | Elevated surfaces, cards                        |
| `--ash`          | `#2A2318`  | Hairline borders                                |
| `--bone`         | `#EFE7D8`  | Primary text — warm paper / film leader         |
| `--bone-dim`     | `#A99E88`  | Secondary text                                  |
| `--bone-faint`   | `#6B6252`  | Tertiary / captions                             |
| `--tungsten`     | `#E8B872`  | THE accent — the spotlight that finds you       |
| `--tungsten-deep`| `#C6924A`  | Accent pressed / gradients                      |
| `--rec`          | `#E14434`  | Recording red — Instacast / self-tapes ONLY     |

Discipline: amber is used **sparingly** — a light, not a paint. Red appears *only* around
recording / self-tape moments (the REC dot). Everything else lives in bone-on-noir.

## Type — three voices
- **Fraunces** (`--font-display`) — cinematic high-contrast serif. The emotional voice:
  headlines, the big statements. Uses italic for lyrical moments.
- **Courier Prime** (`--font-mono`) — the actual screenwriter's font. The *domain signature*:
  slate/clapperboard metadata, kickers, role names, `SCENE 01 · TAKE 03`, technical chrome.
- **Instrument Sans** (`--font-sans`) — clean neutral UI: body copy, buttons, forms, tables.

## Signature motifs (the unforgettable things)
1. **The spotlight** — a warm radial light tied to the cursor; reveals content from the dark.
2. **Film grain** — a live WebGL grain + vignette over the entire site. Subtle, always moving.
3. **Letterbox framing** — 2.39:1 bars frame hero moments; text rises out of the black bar.
4. **Headshots that "develop"** — images resolve from dark→lit / duotone→full on scroll;
   WebGL displacement warp on hover, like light moving across a face.
5. **The slate** — Courier metadata in the corners like a clapperboard (ROLL / TAKE / SCENE).

## Motion law (one clock, one curve)
- Smooth scroll: **Lenis** inertial. This is the "expensive" feel.
- Sequencing: **GSAP ScrollTrigger** — pinned scenes, scrubbed timelines, choreographed.
- Reveals: **SplitText** line-by-line, rising from a clip-mask (out of the letterbox).
- Master easing: `--ease-cine: cubic-bezier(0.16, 1, 0.3, 1)` (slow expo-out). Used everywhere.
- Stagger: 40–80ms. Nothing lands at once — it **cascades**.
- Duration: reveals 0.9–1.4s. Cinematic = slow and certain, never bouncy.
- `prefers-reduced-motion`: full graceful fallback — content simply present, no transforms.

## Voice / copy
Sparse, confident, a little literary. Screenwriter's economy. Irish, but not leprechaun-Irish —
just the real industry (Screen Ireland, RTÉ, the Gaeltacht, Dublin/Galway/Cork productions).
