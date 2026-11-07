# VAILYF AI — Sitemap

## Proposed nine-screen information architecture
These are proposed React Router paths for future implementation. The approved nine-screen image remains the master visual reference; whether any screens should instead be same-page anchor sections must be confirmed when reviewing that image.

```text
Homepage                         /
├── About Us / Mentor             /about
├── Circle of Life                /circle-of-life
│   └── Life Balance Assessment    /assessment
├── What You'll Learn             /learn
├── Benefits & Bonuses            /benefits
├── Pricing & Registration        /register
│   └── Thank You / Success       /thank-you
└── Testimonials & FAQ            /testimonials-faq
```

Hierarchy indicates discovery and conversion relationships; all proposed paths are root-level routes. Success requires verified registration, not merely navigation to its URL.

| Screen | Purpose and sections | Content/features | CTA destination |
| --- | --- | --- | --- |
| Homepage | Introduce webinar; hero, mentor preview, framework preview, offer summary | Approved value proposition; responsive navigation | Register → `/register`; mentor → `/about`; framework → `/circle-of-life` |
| About Us / Mentor | Build trust; biography, credentials, approach | Approved portrait and verified mentor evidence | Register → `/register`; framework → `/circle-of-life` |
| Circle of Life | Explain framework; introduction, dimensions, visual, assessment invitation | Approved dimension labels; glowing 3D visual and static fallback | Assessment → `/assessment`; Register → `/register` |
| Life Balance Assessment | Encourage reflection; introduction, questions, results | Approved scale/scoring, validation and restart | Begin/results → internal assessment states; Register → `/register` |
| What You'll Learn | Explain outcomes; topic cards, curriculum, audience | Confirmed learning copy | Register → `/register`; benefits → `/benefits` |
| Benefits & Bonuses | Explain value; benefits, inclusions, bonus conditions | Confirmed resources and delivery terms | Pricing / Register → `/register` |
| Pricing & Registration | Collect registration; offer summary, form, policies, payment | ₹199; approved schedule/inclusions; payment states | Pay → selected external provider; verified success → `/thank-you` |
| Testimonials & FAQ | Resolve objections; testimonials, FAQ, support | Genuine permission-approved endorsements; accessible FAQ | Register → `/register`; support → pending approved contact |
| Thank You / Success | Confirm purchase; status, reference, joining instructions, support | Verified payment; approved Zoom delivery and event details | Join → authorized Zoom link; calendar → confirmed event; support → approved contact |

## Shared navigation and external destinations
Proposed header exposes core discovery links and a prominent registration CTA; mobile navigation must remain accessible. Footer destinations for privacy, terms, refunds and support await approved content and placement. They may use approved external documents or inline policy content; no additional website screen is authorized by this plan.

External destinations include Meta Ads entry, selected payment checkout, Zoom webinar, and later approved consultation booking. WhatsApp, Telegram and calendar destinations are conditional on approval. The ₹24,000 program offer is a downstream business stage, with no extra website route specified.

## Journey
Meta Ads → Homepage or approved campaign landing entry → discovery screens as needed → Pricing & Registration → ₹199 payment → verified Thank You → Zoom Webinar → ₹500 consultation booking → ₹24,000 premium program offer.

The ₹500 fee adjustment policy remains pending. No CTA should promise an adjustment until confirmed. Implementation of this sitemap awaits Phase 2 approval.
