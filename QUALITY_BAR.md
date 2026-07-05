# Actorly — The Quality Bar (the Standards Agent enforces this)

The site is **not done** until an adversarial review passes with **zero material findings on
two consecutive passes**. "Material" = anything a discerning creative director would flag.
Grade every dimension 1–10; anything under 9 is a finding.

## 1. Art direction & distinctiveness
- [ ] Reads as *designed*, not templated. Zero generic-AI tells (no Inter body, no purple
      gradients, no default shadows, no cookie-cutter hero → 3-cards → CTA).
- [ ] The "Screen Test" concept is legible on every page. Palette + type + motifs cohere.
- [ ] Someone remembers *one specific thing* (the spotlight / grain / developing headshots).

## 2. Motion & sequencing
- [ ] Lenis smooth scroll active; feels inertial, not native.
- [ ] One easing curve across the whole site. Nothing lands at once — staggered cascades.
- [ ] At least one pinned/scrubbed ScrollTrigger scene per major page.
- [ ] Text reveals via mask, not opacity-only. 60fps, no layout thrash, no jank.
- [ ] `prefers-reduced-motion` fully handled — no broken/blank states.

## 3. Craft & detail
- [ ] 8px spacing system; optical alignment; intentional type scale (Fraunces contrast used).
- [ ] Every interactive element has a considered hover/focus/active state.
- [ ] Real, plausible Irish content — no lorem ipsum, no "Actor Name 1".
- [ ] Custom cursor / spotlight behaves well and never traps the pointer.

## 4. Responsive & accessible
- [ ] Flawless mobile (375), tablet (768), desktop (1280+). No horizontal scroll ever.
- [ ] Contrast passes WCAG AA for text. Visible focus rings. Semantic landmarks + aria.
- [ ] Keyboard navigable. Motion-reduced + touch devices degrade gracefully.

## 5. Completeness (floor plan)
- [ ] Public: Home · For Actors · For Casting Directors · Instacast · Pricing/Join · About · Contact · Login/Join.
- [ ] Actor portal (designed, mock): profile builder, jobs feed, apply, Instacast upload, settings, activation.
- [ ] Casting portal (designed, mock): search+filters, post a job, agents copy-tool, applications (thumbnails, 1–6 rating, shortlist), self-tapes, messaging.
- [ ] Admin: activation queue.
- [ ] Every nav link resolves. Nothing is a dead end.

## 6. Engineering
- [ ] Next 16 / React 19 / TS. `npm run build` passes clean. Zero console errors/warnings in browser.
- [ ] No hydration errors. Client-only FX guarded. Images optimized. Fast first paint.
- [ ] SEO: title/description/OG per page. Favicon. Sensible metadata. Deploys clean on Vercel.

## The gate
Done ≡ (all boxes) ∧ (Standards Agent: 0 material findings ×2) ∧ (live on Vercel) ∧ (verified in browser).
