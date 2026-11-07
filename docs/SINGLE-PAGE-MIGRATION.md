# Single-page migration audit and plan

## Audit and backup
The workspace contained a React/Vite JSX frontend, reusable UI/layout components, two working orbital-scene entry points, SVG assessment, editable learning/bonus data, and a restricted browser-only registration demo. There was no Git repository, backend/API source, database, Razorpay SDK, order creation, webhook verification or verified payment-return route. No approved reference image, official portrait, book covers or testimonials were present. No dependency installation or deployment is required.

Before source changes, the existing src, docs, public, tests and root configuration were archived in `.backups/before-single-page-20261107-190820-549.zip`. Previous page implementations remain in source. Original Phase 1 documents remain historical planning records.

## Migration plan
1. Preserve the existing project and all uncommitted work via the source archive.
2. Compose `/` from existing components, with one navbar/footer and one lazy orbital canvas. Share pillar selection with that scene.
3. Add embedded modes to assessment/registration so state, validation, consent restrictions and summary behavior have one implementation. Disable their separate page animation effects in embedded mode.
4. Reuse learning timeline/preview, mentor presentation, books and support-resource previews. Keep all unapproved assets and offers honestly labeled.
5. Replace route navigation with section anchors. Redirect legacy URLs, preserve browser history and respect reduced motion. Leave unknown API-like URLs unredirected; there are no existing backend or payment-return routes to migrate.
6. Run unit/build checks and browser verification of section order, anchors, state persistence, validation, WebGL fallback, reduced motion and responsive layouts. Retain old source after verification for recovery.

## Final public surface
`/` contains `#home`, `#problems`, `#circle-of-life`, `#assessment`, `#learning`, `#mentor`, `#benefits`, `#register`, `#faq`, followed by a final CTA/footer. `/about`, `/circle-of-life`, `/assessment`, `/what-youll-learn`, `/learn`, `/benefits`, `/register` and `/testimonials-faq` redirect to corresponding sections. The former design-system route redirects to home; its implementation remains in source. Compatibility hash aliases `#registration`, `#life-dimensions` and `#life-explorer` scroll to the current sections.

Assessment ratings and registration demo details remain transient component state and survive same-page navigation; refresh clears them. No analytics, registration submission, card capture, payment IDs, receipts, database writes or payment-success simulation are introduced.

## Payment and client approvals
Live payments remain disabled. The payment control reads “Proceed to Payment – ₹199” and identifies integration as pending. The fictional-data demo remains clearly labeled, with an unchecked acknowledgement because approved Terms/Privacy Policy are unavailable. Backend order creation, server-controlled amounts, signature/webhook verification, idempotent registration fulfillment, approved legal/support/refund information and Zoom access delivery are still required before live collection/payment.

The currently supplied event schedule is 22 November 2026, 11:00 AM–1:00 PM IST. Earlier material states three hours; final duration sign-off remains pending. Bonus format, eligibility and delivery, WhatsApp arrangements, Telegram access, mentor credentials/assets and testimonials also require approval. No exact visual match to an absent reference is claimed.

## Verification completed
- All 12 assessment/registration unit tests passed.
- Production build passed; Vite retains its large-chunk advisory for the main/Three.js bundles. No lint script is configured.
- Browser checks verified section order, one header/footer/main/canvas, one registration form, six outcomes/modules, four books and no duplicate IDs.
- Desktop/tablet/mobile overflow checks passed at 1440, 1024, 768, 390 and 320 pixels. Screenshots were inspected on desktop and mobile.
- Navbar/registration anchors, mobile keyboard and emulated-touch navigation, native back/forward, legacy redirects, state persistence across anchors, assessment reset/ties, demo validation and disabled payment status passed.
- Software WebGL rendering, reduced-motion static mode, context-loss recovery and startup with WebGL disabled were exercised.
- No unexpected console errors, registration/assessment transmissions, browser-storage writes or payment-provider requests were observed in the full browser check. Unknown API-like URLs were not redirected.
- The original five Phase 1 documents retain their original SHA-256 hashes. The backup archive was opened and contains 113 entries.
