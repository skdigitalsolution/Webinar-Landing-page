# Phase 7 — final polish and QA

## Scope and audit
The existing single-page landing page was refined in place. See [audit before edits](AUDIT-BEFORE.md). Existing uncommitted work, client assets, routes, assessment calculations, reflection context and payment safeguards were preserved. All 12 protected source hashes match the pre-edit baseline; see [integrity and bundle measurements](integrity-and-bundles.json). No dependencies, public pages, payment integration or deployment were added.

## Changes
- `src/components/hero/CircleOfLife.jsx`: defer scene loading until idle/visible, remove duplicate reference-hero controls and invalid description references.
- `src/components/hero/CircleOfLife3D.jsx`: avoid allocating hidden core geometry in the reference hero; lower particles to 16 mobile/40 desktop, cap desktop DPR at 1.25, clean up context-loss listeners, direct AdaptiveDpr import.
- `src/components/hero/HeroOrbit.jsx`: lower ring tessellation while preserving metallic depth, lighting and hover motion.
- `src/components/landing/FourPillarsSection.jsx`: expandable details with explicit accessible controls; all pillar content remains available.
- `src/pages/LandingPage.jsx`: remove unused About-page stylesheet import, load scoped polish, descriptive title.
- `src/pages/polish.css`: consistent section spacing, gold registration buttons, clearer focus outlines, readable pillar/table/chart labels and larger learning icons.
- `src/index.css`: restrict Tailwind scanning to source and HTML, avoiding generated QA/document artifacts.
- Registration PricingCard, RegistrationForm and CheckoutSummary: nested card headings use h3.
- `index.html`: description, theme color, Open Graph and Twitter metadata using the existing client poster. Canonical and og:url await the confirmed domain; social image needs an absolute production URL when deployed.
- `scripts/verify-phase-seven.mjs` and this directory: reproducible browser audit and review artifacts.

## Visual review
The approved reference's violet background, gold hierarchy, serif headline and three-zone hero remain. Hero screenshots were inspected at desktop and mobile sizes. Pillar details now collapse to reduce scrolling; default desktop document height falls from 22,724 to 21,965 px. Exact photographic matching remains blocked by the missing standalone mentor portrait. The labelled VJ placeholder remains; the full approved poster is retained in the mentor section. No photograph was invented or distorted. Book illustrations remain labelled placeholders.

Review captures (reduced motion): [desktop hero](desktop-hero.jpg), [full desktop](desktop-full.jpg), [mobile hero](mobile-hero.jpg), [full mobile](mobile-full.jpg), [registration](registration.jpg), [assessment](assessment.jpg). The fixed mobile registration bar is hidden only during document screenshot capture to avoid an overlay appearing midway down a long image; its actual behavior was separately tested.

## Verification
- `npm.cmd run build`: PASS. Existing large-JavaScript-chunk warning remains.
- `node --test tests/*.test.js`: 14 passed, 0 failed, including calculation ties, aspirational differences, input validation and contact-free checkout preview.
- Final Chrome audit: no duplicate IDs, broken aria-controls targets or console errors. Pillar expansion/collapse passes.
- Responsive emulation: 360, 390, 768, 1024 and 1440 px, no horizontal overflow. These are browser emulations, not physical devices.
- Registration/FAQ/CTA regression: [results](../phase-six/browser-results.json), rerun during Phase 7. Required validation, first-error focus, India prefix, unchecked acknowledgment, preview invalidation, demo contact restrictions, clear/refresh, FAQ keyboard controls, hash targets and mobile bar visibility passed. The browser run completed its assertions and saved results before a subsequent screenshot timed out; Phase 7 screenshots were captured separately.
- Assessment keyboard change and shared priority behavior remain verified in the regression suite; protected calculation/state sources are unchanged.
- Video plays, pauses and has native controls; measured duration 29.024989 seconds. The rerun advanced playback while muted. Existing modal Escape/close pause behavior is preserved; video source is unchanged. No sound autoplay. The 48.4 MB original remains a delivery/performance concern, not silently recompressed.
- No non-GET/HEAD requests or local/session storage writes in the form regression. No live registration or successful payment is simulated.
- Normal-motion hero renders, and injected WebGL context loss removes the canvas in favor of the static fallback; both runs have zero console errors. See [motion](motion-browser.json) and [fallback](fallback-browser.json).
- No lint script or Lighthouse installation is available. No Lighthouse score or full accessibility certification is claimed. Semantic headings, labels, focus styling and control references were checked; a complete contrast/screen-reader audit remains outstanding.

## Measured performance and limits
Same local production assets; Chrome headless, software rendering, unthrottled local server. These are individual lab samples, not field percentiles or controlled benchmarks.
- Baseline reduced-motion software-rendered sample: LCP 6,012 ms; CLS 0.00324.
- Normal-motion final sample: LCP 5,920 ms; CLS 0.00316.
- GPU-disabled reduced-motion capture sample: LCP 1,712 ms; CLS 0.00324. Different rendering conditions mean this cannot establish an improvement over baseline. Later capture samples can vary; raw final data is in `final-browser.json`.
- Fallback stress sample: LCP 13,112 ms; CLS 0.00314. Concurrent local browser work substantially affects timings. Loading performance is not signed off for production.
- INP: unavailable; observer produced no qualifying interaction entries. No inferred or fabricated score.
- CSS: 167,724 ? 155,705 bytes; Node gzip 31,544 ? 29,932 bytes.
- Main JS: 641,979 ? 642,529 bytes; gzip 208,594 ? 208,799.
- Lazy Three JS: 927,111 ? 927,209 bytes; gzip 243,202 ? 243,231. Runtime geometry/rendering cost was reduced, not claimed as a JavaScript size reduction. Large chunks need future dependency/bundle work.

## Client approvals and launch blockers
Confirm exact webinar duration (the supplied schedule is retained), specific AI demonstrations, mentor credentials and a standalone approved portrait, official book artwork/delivery format, WhatsApp/Telegram access conditions, refund policy, Zoom joining-link delivery, legal policies/support contact, production domain and production payment readiness.

Payments intentionally remain `Payment Setup Pending`: no order backend, signature verification, webhooks or production checkout exists. Do not open registration or present this as payment-ready until approved and implemented. No fake testimonials, earnings claims, community links or payment confirmations were added. No deployment was performed; Phase 8 was not started.
