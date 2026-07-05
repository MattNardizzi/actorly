# Actorly — The Quality Bar ("THE REGISTER")

The site is **not done** until an adversarial review passes with **zero material
findings on two consecutive passes**, and it reads *sharper and more futuristic than
cosmos.so*. "Material" = anything a discerning creative director would flag. Grade
every dimension 1–10; anything under 9 is a finding.

## 1. Art direction & distinctiveness
- [ ] Reads as *designed*, not templated. Zero generic-AI tells (no Inter body, no
      purple-on-white, no default shadows, no hero → 3-cards → CTA cliché).
- [ ] "THE REGISTER" concept legible on every page: stark white, monochrome UI,
      the faces are the only colour, Archivo/Hanken/Martian type, the instrument HUD.
- [ ] The signature is unforgettable — the HUD + the living face-wall + the reticle.
- [ ] Beyond cosmos.so: gallery *and* instrument. Precision cosmos doesn't have.

## 2. Motion & sequencing
- [ ] Lenis smooth scroll active; feels inertial, not native.
- [ ] One easing curve (`cine`) across the whole site. Staggered cascades, never all-at-once.
- [ ] ≥1 pinned/scrubbed ScrollTrigger scene per major page. More motion than v1.
- [ ] Text reveals via mask, not opacity-only. 60fps, no layout thrash, no jank.
- [ ] `prefers-reduced-motion` fully handled — no broken/blank states. HUD static.

## 3. Craft & detail
- [ ] 8px rhythm; optical alignment; intentional type scale.
- [ ] Every interactive element has a considered hover/focus/active state (signal-aware).
- [ ] Real, plausible Irish content — no lorem ipsum, no "Actor Name 1". Copy preserved.
- [ ] Reticle cursor behaves well and never traps the pointer. HUD never blocks clicks.

## 4. Responsive & accessible
- [ ] Flawless mobile (375), tablet (768), desktop (1280+). No horizontal scroll ever.
- [ ] Contrast passes WCAG AA. Visible focus rings (signal). Semantic landmarks + aria.
- [ ] Keyboard navigable. Motion-reduced + touch degrade gracefully (HUD desktop-only).

## 5. Completeness (floor plan — EVERY capability preserved)
- [ ] Public: Home · For Actors · For Casting · Instacast · Pricing · About · Contact · Login · Join.
- [ ] Actor portal: overview, profile, jobs+apply, applications, Instacast upload, settings.
- [ ] Casting portal: search+filters, post-a-job, my-jobs, applicants board (1–6 rating/filter/sort), agents copy-tool, messages.
- [ ] Admin: activation queue (approve/changes), members roster, reports.
- [ ] Every nav link resolves. Nothing is a dead end. No feature removed to fix a bug.

## 6. Engineering
- [ ] Next 16 / React 19 / TS. `npm run build` passes clean. Zero console errors/warnings.
- [ ] No hydration errors. Client-only FX guarded. Fast first paint.
- [ ] SEO: title/description/OG per page. Sensible metadata. Deploys clean on Vercel.

## The gate
Done ≡ (all boxes) ∧ (review: 0 material findings ×2) ∧ (sharper than cosmos.so) ∧
(verified in browser at 3 widths) ∧ (all capabilities intact).
