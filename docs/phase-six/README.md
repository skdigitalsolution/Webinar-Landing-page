# Phase 6 — Registration, FAQ, Final CTA and Footer

## Files

Created:
- `src/components/layout/MobileRegistrationCTA.jsx`: viewport/focus-aware mobile shortcut with safe-area support and reduced-motion entrance.
- `src/components/landing/phase-six.css`: scoped ticket, form, summary, FAQ, final invitation and footer styling.
- `scripts/verify-phase-six.mjs`: production functional, motion and final-copy/screenshot checks.
- This directory: report, protected hashes, browser/motion results and screenshots.

Modified:
- `src/components/registration/PricingCard.jsx`: premium gold/violet ticket using centralized event data, decorative edge detail and form-preview action.
- `src/components/registration/RegistrationForm.jsx`: clear preview wording; retains existing accessible fields, validation and demo safeguards.
- `src/components/registration/CheckoutSummary.jsx`: product/quantity/total overview and explicit Payment Setup Pending/legal setup messaging.
- `src/components/registration/RegistrationFAQ.jsx`: button-based accordion with expanded/controls semantics, inert hidden regions, keyboard navigation, plus/minus icons and reduced-motion animation.
- `src/components/layout/Footer.jsx`: gold lotus brand, exact tagline, deduplicated same-page links and conditional approved policy/contact links.
- `src/components/landing/Sections.jsx`: exact registration/final copy, scoped styles and `#final-cta` anchor.
- `src/pages/LandingPage.jsx`: replaces the former unconditional mobile bar with the new adaptive component.
- `src/data/registration.js`: adds the audience question; keeps unresolved joining-link, refund and book answers out of the public FAQ.
- `src/data/landing.js`: tracks the final CTA in document order.

No routes, packages, backend services, payment SDKs or additional WebGL scenes were added. Earlier phases, original assets/video, assessment, shared planning, registration normalization/validation and checkout-preview calculations were preserved. See protected-files.json.

## Registration and checkout

`#register` uses the supplied heading and expert-guided description. The desktop/tablet layout is ticket left/form right, stacked on mobile. Price, date, time and Zoom details come from `src/data/webinar.js`: ₹199, Sunday 22 November 2026, 11 AM–1 PM IST, online via Zoom. The historical two-/three-hour conflict remains recorded internally for final approval; no contradictory public duration was introduced.

The form retains Full Name, Email Address and India +91 Mobile Number, explicit labels, required state, inline errors, invalid-state descriptions, focus management and an initially unchecked required acknowledgement. The legal documents are not approved, so the checkbox truthfully acknowledges the browser-only demo rather than pretending to accept unpublished policies. Real registration remains disabled. Existing fictional-data restrictions remain: reserved example-domain emails and the supplied test-number fixture. Generic name/email/India-phone validation remains separate and unchanged.

The sample loader leaves the acknowledgement unchecked. Invalid submission focuses the first invalid field; successful local preview focuses the checkout summary. Editing any field invalidates that preview. Clear removes all details and the acknowledgement. Data is held only in component memory; no localStorage, network submission, URL parameters or frontend console logging were added.

The checkout overview always shows product, ticket, quantity 1, total ₹199, date/time and Zoom. It deliberately excludes contact details. A validated demo is labeled as such and never reports registration/payment success. Payment remains disabled before and after validation.

## Payment audit and launch gates

No Razorpay SDK/backend, order creation endpoint, signature verification, webhook handler or payment reconciliation service exists in the inspected project. Existing configuration is `mode: demo`, `paymentEnabled: false`, `backendOrderEndpoint: null`, with live registration closed. No keys, receipts or fake transactions were created. The payment control explicitly says Payment Setup Pending. A UI flag alone cannot turn this preview into secure checkout.

Before any separately approved live integration: approve genuine Privacy Policy, Terms, refund policy and registration/contact handling; confirm ticket/event/bonus details; implement server-controlled orders and amounts, signature/webhook verification, authoritative status reconciliation and idempotent fulfillment. No live payment activation was performed in Phase 6.

## FAQ and footer

Five supported questions are public: webinar purpose, audience, schedule, online format and learning themes. Joining-link delivery, book terms and refunds are retained as null/unapproved configuration entries and omitted from the public accordion until approved. No delivery method, refund rule, recording policy or device feature was invented.

Accordion buttons support Enter/Space through native button behavior and optional Arrow Up/Down, Home/End focus navigation. Each controls an always-present labeled region. Closed content is aria-hidden/inert; height/opacity transitions respect reduced motion.

The footer has a gold lotus, VAILYF AI, Life • Clarity • Balance, and seven unique same-page navigation links. Privacy/Terms are non-link pending labels until approved URLs exist. No contact details or social links are fabricated.

## CTA/mobile audit

All six desktop registration anchors were clicked in the browser and reached `#register` with the target heading below the sticky navbar. Every same-page hash target in the page existed. The ticket action focuses the registration form. The mobile Register Now shortcut was separately tested.

The mobile bar appears only at mobile sizes and hides when the registration form, checkout summary, final CTA or footer is in view. It also hides while an input/select/textarea is focused, including earlier assessment/planning controls, and is suppressed while a video dialog is open. It respects safe-area insets. The final CTA uses the exact supplied copy and a working registration anchor without timers, discounts or urgency claims.

## Verification

- `npm.cmd run build`: passed. npm.cmd is used because the local PowerShell policy blocks npm.ps1. The existing Vite bundle-size warning remains.
- `node --test tests/*.test.js`: all 14 tests passed.
- Lint: no lint script or lint configuration is present; no lint pass is claimed.
- Protected source hashes match the pre-change snapshot.
- Completed functional run: browser-results.json.
- Separate normal-motion run: motion-results.json.
- Final copy/captures: copy-check.json and screenshots.

The functional run verified one registration form, ₹199 pricing/total, unchecked acknowledgement, empty/malformed input errors, +91 normalization, demo-only contact restrictions, preview invalidation and clearing, disabled payment, FAQ keyboard/expand-collapse, all registration links and navbar offset, footer link deduplication, mobile-bar navigation/hiding, existing assessment and original 29.024989-second video playback, zero network writes, empty local/session storage, refresh clearing details and zero console/runtime/network errors.

Widths tested: 1440, 1024, 768, 390 and 320px, with no horizontal overflow. Registration measured two columns at desktop/tablet and one at mobile widths. Chrome uses software rendering and mobile viewport/touch emulation; physical iOS/Android hardware was not tested. Screenshots use reduced motion and may crop sections taller than 1900px.

## Pending client confirmations

- Approved Privacy Policy, Terms, refund policy and support/contact details.
- Final event duration/sign-off, joining-link delivery method and any recording policy.
- Book eligibility, format and delivery; WhatsApp/Telegram conditions.
- Secure backend/payment integration and explicit authorization to enable live registration.

Phase 6 ends here. No Phase 7 development was performed.
