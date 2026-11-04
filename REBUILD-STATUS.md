# Portfolio release audit — 4 November 2026

This is a verified source-and-browser audit, not a promise of hiring outcomes.

## Decisions
- The 24 October 2026 design direction was a reference, not a constraint. White editorial homepage and original halftone portrait preserved, with restrained orange/lime accents.
- Hiring positioning: graphic design for static campaign Key Visuals, social media, Photoshop compositing and art direction. Interface motion is not a motion-design role claim.
- 12 original projects remain reachable. Homepage has nine primary cases and an expandable Earlier Projects archive for three lower-priority works.
- Original source assets remain untouched: 237 original media items and twelve covers on disk. Featured selections are editorial choices; less-relevant source boards are in expandable archives or omitted from rendering where repeated/intros only.
- The two uWallet creative routes have different verified attributions (agency work vs independent brief exploration).
- Typography boards precede their dependent advertising executions; Uwallet World Cup typography similarly precedes its social examples. Text-only brief boards have been replaced by semantic HTML where verified.
- Unverified role, results, deployment, and campaign-strategy claims are not asserted.
- Dark individual case pages, editable project copy, original aspect ratios, source attribution link, mobile navigation, accessible lightbox, reduced-motion support.

## QA results
- GitHub Actions run 41899503036, commit fbf1c1d225e72bfbe7f3bb336affabaf131bfc6b: **PASS**.
- Playwright Chromium responsive browser tests run on desktop 1440×900, tablet 834×1112, and mobile 390×844.
- All 12 deep-link cases and all 12 original covers load; checked for JavaScript exceptions and horizontal overflow.
- Static audit: 12 unique projects, 237 source media files, image path integrity, stage order, no loss/duplication in Uwallet creative routes.
- Screenshot-led visual QA completed for homepage and the opening of all twelve case pages. Each tested viewport includes work visible without cut-off or unreadable text on the opening.
- Motion is visible through hero portrait/headline entrance, card hover and understated artwork reveal; the design never depends on animation to reveal content. Reduced-motion honored.
- Mobile menu, lightbox Escape/focus restoration, archive disclosure, and card lazy-load through actual scrolling tested.
- Last-minute renamed case titles and curation are included in the successful run above.

## Release gate not independently proven yet
- Actual GitHub Pages hosted production response and cache invalidation after merge. A successful Git commit or local browser test does not prove the public site updated.
- This audit establishes technical QA and source fidelity for the chosen presentation, not guaranteed hiring selection or campaign effectiveness.
