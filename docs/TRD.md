# VAILYF AI — Technical Requirements Document

## Baseline and implementation gate
Phase 1 is documentation only. The inspected workspace was empty: React and Vite are not configured, and no dependencies or source files exist. All architecture below describes future implementation proposals. Do not install packages, configure tooling, create components or begin Phase 2 without approval.

## Required frontend stack
| Technology | Planned role |
| --- | --- |
| React + Vite | UI application and development/build tooling |
| JavaScript (JSX) | Application language; do not use TypeScript |
| Tailwind CSS | Responsive styling and design tokens |
| React Router | Nine screen routes and route fallback |
| Three.js | 3D rendering foundation |
| React Three Fiber | React integration for the Circle of Life scene |
| Drei | Scene helpers and rendering utilities |
| GSAP | Coordinated timelines and complex scene/scroll animation |
| Framer Motion | UI transitions and interaction animation |
| Lucide React | Consistent interface icons |

Versions, compatibility, hosting and package configuration will be selected and verified during an approved implementation phase. Assign each animated element one controlling animation system to avoid conflicting transforms.

## Proposed application architecture
- Client-rendered React application with shared navigation, footer and reusable visual styles, using routes in SITEMAP.md.
- Route-specific content for all nine screens; shared registration CTAs resolve to `/register`.
- Theme derived from the master image: midnight navy, purple/blue/cyan accents, gold primary actions and glass surfaces. Exact tokens await reference inspection.
- Separate approved content from UI logic so pending claims cannot accidentally become published copy.
- Lazy-load heavy 3D and route assets; provide a static, readable Circle of Life fallback when WebGL is unavailable or reduced motion is requested.
- Host must support direct route loading and refresh through an SPA fallback. An unknown route needs a helpful recovery state without adding a tenth business screen.

## Screen-level technical behavior
| Screen | Technical requirements |
| --- | --- |
| Homepage | Responsive hero and navigation; meaningful content available without waiting for 3D effects |
| About Us / Mentor | Optimized approved portrait; semantic biography and credentials |
| Circle of Life | Responsive canvas; approved labels available as ordinary text; fallback on rendering failure; no hover-only essential information |
| Life Balance Assessment | Schema and scoring pending; validate all required answers; support keyboard interaction and restart; display indicative results only after valid completion; persistence requires an approved data policy |
| What You'll Learn | Semantic, readable curriculum/outcome sections; no unsupported promises |
| Benefits & Bonuses | Render approved inclusions and delivery conditions only |
| Pricing & Registration | ₹199 offer summary; validated minimum registration details; payment handoff and retry/cancel/pending handling |
| Testimonials & FAQ | Permission-approved testimonial records; semantic accordion with accessible expanded state |
| Thank You / Success | Confirm status from trusted payment/registration services; show pending or failure when verification is incomplete; disclose Zoom access only according to the approved delivery method |

## External services and trust boundaries
Payment provider, backend/serverless platform, registration storage, notification service and Zoom provisioning method are not selected. The required frontend stack alone cannot securely verify payments or store secrets.

Proposed payment flow: create an order through a trusted service → open hosted/provider checkout → receive return and/or webhook → verify signature and paid amount/currency server-side → idempotently record registration → return authorized status → show success and deliver access. A browser query parameter or client state must never establish payment success. Handle duplicate callbacks, refreshes, delayed confirmation, failed payment and retries without duplicate registrations or charges caused by application logic.

Store secrets only in trusted server environments. Keep personal data and payment details out of URLs and analytics. Prefer provider-hosted payment collection; do not collect card data in this application. Determine applicable privacy/consent obligations and policy copy before collecting production data.

Zoom access may use a secure confirmation message, authorized link or integration; the client must choose the approach. WhatsApp and Telegram links must be approved before display. No automated messaging, booking integration or premium program checkout is assumed.

## Assessment constraints
Client must supply dimensions, question text, response scale, formula, thresholds and interpretation copy. No clinical diagnosis or invented scoring. Default proposal is transient in-session answers with no personal data storage; any retention or lead capture requires an explicit approved purpose and policy.

## Quality requirements for later phases
- Responsive layouts across desktop, tablet and mobile; exact breakpoints follow approved design and content testing.
- Semantic landmarks, logical headings, keyboard access, visible focus, form labels and helpful error messages; target WCAG 2.2 AA, subject to implementation verification.
- Respect reduced motion; pause or simplify costly offscreen animations; avoid flashing and layout shifts.
- Optimize images, split heavy code and limit rendering workload on mobile; measurable performance budgets are pending.
- Provide page titles, descriptions, meaningful links and social sharing metadata; confirm indexing requirements and whether prerendering is needed.
- Verify direct navigation, all CTAs, mobile overflow, fallback rendering, assessment validation and payment states in later implementation checks.
- Validate the full payment journey in the selected provider's test environment before launch; do not use live charges as routine testing.

## Dependencies and unresolved decisions
Master image and final assets; schedule and duration; offer inclusions; mentor proof; testimonials and permission evidence; refund/recording policies; consultation adjustment policy; payment provider and tax/receipt treatment; registration fields; hosting/domain; Zoom access; support; approved analytics and consent approach. No external service is configured during Phase 1.
