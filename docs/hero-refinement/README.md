# Hero refinement

## Files changed in this refinement

- `src/components/hero/PhaseOneHero.jsx`: decorative atmosphere layers, dialog semantics, explicit pause before closing, Escape handling, background scroll lock and focus restoration.
- `src/components/hero/phase-one.css`: cinematic violet/amber lighting, softened nebula and distant horizon, improved headline breaks, CTA spacing, shaded category controls, tablet/narrow-mobile adjustments and focus indicators.
- `src/components/hero/HeroOrbit.jsx` (new): shaded metallic torus, emissive edge rings, slowly rotating cyan/gold highlights, halo and soft contact-shadow shaders, illuminated pedestal. Mobile uses fewer geometry segments. No bloom, textures, shadow maps, new dependencies or additional rendering passes.
- `src/components/hero/CircleOfLife3D.jsx`: opt-in hero orbit component and frame-rate-independent parallax smoothing. Non-hero scene behavior is preserved.
- `scripts/verify-hero-refinement.mjs` (new): Chrome/CDP verification with assertions and screenshots.
- This directory: verification report and desktop/tablet/mobile screenshots.

## Mentor image

Visually inspected `1.jpeg`, `2.jpeg` and `4.jpeg`. All are composed promotional posters with graphics or text surrounding the person. None is a standalone approved portrait. The clearly labeled VJ placeholder is retained. Posters remain available uncropped in the intro dialog.

## Video and interactions

The original `3.mp4` remains in one source location and is loaded through the deployment-aware URL. The native HTML5 player retains controls, inline playback and metadata preload. Opening the modal does not start playback. Closing via Escape, the close button or backdrop pauses the player before it is removed. Background scrolling is locked while open, and focus returns to the intro trigger.

See `browser-results.json` for measured playback duration, play/pause, Escape, close-button pause, focus restoration, native controls, mobile playback, registration navigation, category selection, animation pause/resume, asset responses and reduced-motion results. Mobile testing is Chrome viewport/touch emulation, not a physical iOS or Android device. WebGL testing uses Chrome software rendering.

## Responsive and build

Widths checked: 1440, 1100, 1024, 820, 768, 390 and 320 CSS pixels. Screenshots capture desktop (1440), tablet (1024) and mobile (390). Build command: `npm.cmd run build`, used because the local PowerShell execution policy blocks npm.ps1. The build passes; Vite still warns about the existing large JavaScript/Three.js chunks.

The result follows the reference's hierarchy, circular composition, gold accents and violet/orange lighting. It remains an interactive approximation of the reference illustration. The missing mentor portrait remains the largest visual difference. Lower landing sections and payment code were not changed.
