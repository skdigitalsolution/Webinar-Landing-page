# VAILYF AI — Product Requirements Document

## Status and scope
Phase 1: planning and documentation only. No implementation is authorized in this phase. Phase 2 requires explicit client approval.

Product: a premium webinar landing page website comprising nine screens. The client reports approval of a supplied nine-screen futuristic dark design. That image is the master visual reference for future development; it was not present in the workspace or attached to this request, so visual fidelity cannot yet be assessed. Do not invent reference-specific layouts or assets.

## Workspace baseline
The project directory was inspected on 7 November 2026 and was empty, including hidden entries. No package.json, React/Vite configuration, source code, assets, or existing documentation was found. This phase adds only the five requested Markdown files under docs/.

## Business objective and funnel
Guide visitors from understanding the webinar to paying ₹199 and receiving reliable joining instructions. Subsequent business stages are:

Meta Ads → Landing Page → ₹199 Webinar Registration → Zoom Webinar → ₹500 One-to-One Consultation Booking → ₹24,000 Premium Program Offer.

The ₹500 consultation fee adjustment policy is pending confirmation. Do not describe it as refundable, credited, deducted, or adjustable until approved. Consultation and premium program fulfillment are downstream business stages; their application screens and integrations are not included in the nine-screen scope unless separately approved.

## Audience and experience
Visitors arrive from Meta Ads or direct links to evaluate the mentor, understand the life balance proposition, review the offer, and register. The journey must be clear on desktop, tablet, and mobile, with readable content, accessible controls, and a clear distinction between payment success and failure.

## Nine-screen requirements
Routes and section structures below are planning proposals, subject to the master reference and Phase 2 approval. Detailed content inputs are tracked in CONTENT-REQUIREMENTS.md.

| Screen / proposed route | Purpose | Sections and content | Features | CTA destinations |
| --- | --- | --- | --- | --- |
| Homepage `/` | Explain the webinar proposition and begin registration | Hero; approved webinar title and value proposition; mentor introduction; Circle of Life preview; offer summary | Responsive navigation; approved hero visuals; concise funnel entry | Register → `/register`; Meet the Mentor → `/about`; Explore Circle → `/circle-of-life` |
| About Us / Mentor `/about` | Establish genuine trust and explain the mentor's approach | Mentor biography; approved portrait; verified credentials; mission and approach | Accessible biography and verified proof content | Register → `/register`; Explore Circle → `/circle-of-life` |
| Circle of Life `/circle-of-life` | Explain the central framework | Framework introduction; approved dimensions and labels; visual explanation; assessment invitation | Glowing 3D Circle of Life with readable static fallback; interaction only after framework approval | Assess Life Balance → `/assessment`; Register → `/register` |
| Life Balance Assessment `/assessment` | Help visitors reflect on their balance | Introduction; approved questions and scale; completion guidance; results explanation | Proposed questionnaire, validation, restart and indicative results; scoring, persistence and data use pending approval; no diagnostic claims | Begin → assessment questions; View Results → results within this screen; Register → `/register` |
| What You'll Learn `/learn` | Make approved learning outcomes clear | Outcome overview; curriculum or topic cards; intended audience; learning expectations | Scannable outcomes; curriculum content subject to confirmation | Register → `/register`; View Benefits → `/benefits` |
| Benefits & Bonuses `/benefits` | Explain the confirmed offer and supporting resources | Core benefits; included resources; bonus availability and access conditions | Clear distinction between confirmed inclusions and pending internal candidates; no unapproved bonus claims | Register → `/register`; View Pricing → `/register` |
| Pricing & Registration `/register` | Convert interest into a ₹199 paid registration | Webinar summary; ₹199 price; approved date, time and duration; inclusions; registration form; policy links; payment step | Validated minimal form; checkout handoff; pending, failed and cancelled states; trusted payment verification requirement | Pay ₹199 → selected payment provider; verified payment success → `/thank-you`; Retry → payment step |
| Testimonials & FAQ `/testimonials-faq` | Resolve objections using approved evidence | Genuine testimonials with permission; FAQ on schedule, access, inclusions, recordings, refunds and support | Accessible FAQ accordion; omit unapproved endorsements and unanswered policy promises | Register → `/register`; Support → approved channel, destination pending |
| Thank You / Success `/thank-you` | Confirm a verified registration and explain next steps | Payment/registration status; reference; confirmed webinar schedule; Zoom access instructions; approved support contact | Server-verified success state; pending verification fallback; secure access delivery; prevent false confirmation from direct route visits | Join Webinar → authorized Zoom access; Add to Calendar → confirmed event; Support → approved channel; later consultation invite → approved booking destination after webinar |

## Design requirements
Use the client-approved image as the master visual reference once available. Direction supplied by the client: midnight navy cosmic backgrounds; neon purple, electric blue and cyan accents; premium golden CTAs; glassmorphism cards; a glowing 3D Circle of Life; rich but smooth animations; responsive desktop, tablet and mobile layouts. Final composition, typography, dimensions and assets must be derived from the reference, not assumed. Maintain legibility, visible focus and sufficient contrast despite glow and transparency.

## Functional boundaries and measurement
Primary conversion is a verified ₹199 registration. Proposed measurement events are landing view, register CTA click, checkout start, verified payment success and webinar access click. Assessment completion, webinar attendance, consultation booking and premium conversion may be measured only where approved integrations and consent permit. No numeric business targets are supplied. Advertising pixels and consent requirements need approval before implementation.

## Phase acceptance criteria
- All nine screens have purpose, sections, content, features and CTA destinations documented.
- Funnel prices and pending commercial policies are accurately recorded.
- Stack, design direction, routes, customer journey and content inputs are documented.
- Missing details remain explicitly pending, with no fabricated credentials, endorsements or claims.
- Only the five requested documentation files are created; no frontend code, dependencies or configuration changes occur.

## Client decisions required
Resolve webinar duration (WhatsApp: 2 hours; another document: 3 hours); exact ₹199 inclusions; whether four books, WhatsApp tips and Telegram access are included; mentor credentials; recording availability; refund policy; and ₹500 consultation fee adjustment policy. Use only genuine, permission-approved testimonials. Also supply the master design image, approved copy and assets, schedule/timezone, support details, provider choices and payment/access requirements before dependent implementation.
