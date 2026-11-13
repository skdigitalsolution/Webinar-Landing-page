# Phase 1 implementation

Only the navbar, hero, event information bar and intro media were changed. Existing lower-page sections, routing, assessment, registration preview and payment behavior were preserved. Pre-existing changes in App.jsx and deleted .gitkeep files were left alone.

## Files

- `src/components/hero/PhaseOneHero.jsx`: three-zone hero, exact requested copy, mentor authority placeholder, intro dialog and client artwork links.
- `src/components/hero/phase-one.css`: reference-inspired typography, colors, glow, responsive layouts and scoped header styling.
- `src/components/hero/CircleOfLife.jsx`, `CircleOfLife3D.jsx`: optional hero ring variant; existing non-hero scene remains available. Lazy React Three Fiber scene with torus rings, pointer parallax, floating movement, particles (24 mobile / 65 desktop), limited DPR, visibility pause and reduced-motion/static fallback. Accessible HTML category buttons and gold lotus/AI overlays.
- `src/components/ui/LotusMark.jsx`: reusable vector lotus.
- `src/components/media/PremiumVideo.jsx`: responsive HTML5 player, native play/pause, mute, seek and fullscreen controls; metadata preload; mounted only when opened; no automatic playback.
- `src/components/layout/Navbar.jsx`, `src/data/navigation.js`: lotus brand, About anchor, registration button and existing responsive navigation.
- `src/pages/LandingPage.jsx`: mounts Phase 1 hero; existing later sections preserved.
- `index.html`, `public/images/lotus.svg`: matching favicon.
- `scripts/verify-phase-one.mjs`: local Chrome/CDP verification; screenshots and results in this directory.

## Assets

All required assets exist. The approved reference was visually inspected and was not embedded into the webpage. The three promotional JPEGs are shown uncropped in the introduction dialog's expandable artwork gallery, preserving their intended promotional context. The actual MP4 is referenced in its original location, with deployment-base-aware URLs. It was not copied to another source directory. Vite's dist output contains the normal deployment copy.

No standalone approved mentor photograph exists. A labeled VJ placeholder remains; no portrait was extracted from promotional designs. Client-supplied authority details are used exactly in the hero.

## Verification

`npm.cmd run build` passed (PowerShell blocks npm.ps1, hence npm.cmd). Vite reports large JavaScript chunks, including the lazy Three.js bundle; this is a remaining performance limitation. All 12 existing Node tests passed.

See `browser-results.json` for actual desktop/mobile, CTA, media, reduced-motion and console results. Chrome required execution outside the filesystem sandbox because its GPU process could not start inside it. Browser testing uses software WebGL; physical-device GPU performance is not established.

## Differences and remaining approval

The three-zone layout, serif headline, gold CTA/lotus, glowing circular nodes, purple authority card and event bar follow the supplied reference. The backdrop uses CSS lighting and star points, without the reference's illustrated mountain landscape. The ring and AI composition are interactive approximations, not a pixel-exact recreation of the rendered illustration. The missing portrait is the largest visual difference. The mobile layout is intentionally stacked.

Existing later sections retain their previous design; no Phase 2 work was performed. Promotional artwork is available in the intro dialog rather than added as new marketing sections. Registration still leads to the existing demo-only form; payment integration is unchanged.

Event values use the existing centralized `src/data/webinar.js` configuration: 22 November 2026, 11 AM–1 PM IST, Zoom, ₹199. That file already records the historical two/three-hour discrepancy and need for final schedule approval.
