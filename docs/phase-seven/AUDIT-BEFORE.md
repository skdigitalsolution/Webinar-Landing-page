# Phase 7 audit — recorded before fixes

The current public router serves one landing page and redirects legacy marketing paths to its anchors. No backend, Razorpay orders, signature/webhook verification or payment-status routes exist. Registration/payment flags remain disabled. Existing uncommitted changes and deleted .gitkeep files will be preserved.

Confirmed issues:
1. index.html has a generic title and no description, Open Graph or Twitter metadata. Final domain is not confirmed; no canonical should be invented.
2. The hero builds four hidden core meshes/geometries even when displaying the ring-only variant. Desktop DPR currently reaches 1.5, and particles number 65 desktop / 24 mobile. The scene chunk is 927,111 bytes and the entry chunk 641,979 bytes before this phase.
3. Hidden hero dimension controls always reference a description ID even when no description is rendered.
4. Long pillar details are expanded by default. Repeated bridge spacing and generous slider minimum heights add avoidable scroll length, especially on mobile.
5. Several labels in the assessment, categories and credentials are very small. Gold CTA styling varies between sections. The learning outcome icons are constrained by an older selector.
6. about.css is imported by LandingPage despite the active mentor using rapport-specific classes. About.jsx retains its own stylesheet import for its standalone component; no route/component files will be deleted.
7. Tailwind scans automatically; documentation/test-script strings can contribute unnecessary generated styles. Source scanning can be restricted to src and index.html while retaining legacy components.
8. The supplied MP4 is 48,377,200 bytes. It is already near-viewport/modal mounted, metadata-preloaded and never auto-plays. Preserve the original; record loading behavior and do not invent transcoding results.
9. Hero mentor portrait remains a labeled placeholder. The complete supplied poster is used in mentor authority. Official covers, legal policies, final duration, joining/bonus terms and production payment readiness remain client dependencies.

Baseline bundle sizes are recorded in before-bundles.json. Browser baseline and post-change observations will use explicitly reported local Chrome conditions, not invented Lighthouse scores. No Lighthouse/lint package is installed or configured in the project.
