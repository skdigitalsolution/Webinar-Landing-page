> Historical Phase 9 handoff. The current registration destination is /#register on the single landing page; see SINGLE-PAGE-MIGRATION.md. No live payment integration has been added.

# Registration frontend — Phase 9 handoff

## Current state
`/register` is the only registration route. Shared registration CTAs resolve through `src/data/webinar.js`. Live registration remains closed. The form is explicitly demo-only because approved Terms and Privacy Policy, payment services and registration storage are absent.

The user-provided schedule remains Sunday, 22 November 2026, 11:00 AM–1:00 PM IST. Earlier material says three hours while WhatsApp and the latest briefs say two hours. Final duration sign-off remains pending; do not expose contradictory session lengths in public copy. Phase 1 source documents are preserved.

## Separation of responsibilities
- `registration.js`: demo fixtures, legal availability, product name and factual/pending FAQ content.
- `registrationValidation.js`: normalization, required/format checks and separate demo-only contact restrictions.
- `Register.jsx`: transient form state, focus management, validation and stale-preview invalidation.
- `checkoutPreview.js`: pure non-payment summary generation; no HTTP request, SDK, identifiers, receipt or success branch.
- `CheckoutSummary.jsx`: product, quantity, total, event details and a permanently disabled “Payments Coming Soon” control.

Demo details exist only in component memory and are cleared on unmount/reload. Do not log values, place them in URLs, use browser persistence or send them to analytics. The preview accepts example-domain email addresses and a fictional test phone fixture; it must not be used for real registration. The checkbox is an unchecked demo acknowledgement, not consent to unpublished policies or unrelated promotional messaging. The checkout-preview object deliberately excludes contact information.

## Requirements before a separately approved live integration
1. Obtain genuine, approved and accessible Terms, Privacy Policy, refund policy and support details. Approve registration communication and any separate optional marketing consent.
2. Confirm final date/time/duration, ticket inclusions, bonus eligibility/delivery, receipts and tax treatment. Current display is ₹199 for one ticket; no extra charges or invented tax claims are added.
3. Implement trusted backend order creation with server-controlled product, amount and currency. Do not trust browser totals or expose secrets in frontend configuration.
4. Implement provider verification and idempotent registration fulfillment on the server. Browser returns/query parameters alone must never establish payment success.
5. Define real pending, cancelled, failed and verified-success behavior and approved Zoom access delivery. No such transaction is simulated in Phase 9.
6. Approve collection/storage/retention and test the real integration in the chosen provider's test environment before opening registration.

No backend endpoint or Razorpay dependency is configured. Enabling a UI flag alone cannot turn this demo into checkout.

