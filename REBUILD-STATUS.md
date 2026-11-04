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


## Independent hiring gate follow-up — 4 November 2026, PR #2

This supplements the earlier audit; previously accepted source assets and project curation were not reset.

### Verified problems and repairs
1. **uWallet World Cup sequence:** previously only the first typography board was tested; two more typography boards appeared after developed artwork. All three source lettering boards (indices 2, 6, 12) now precede art-direction studies (3, 4, 9) and developed executions (0, 5, 7, 8, 10, 11, 13, 14). The original brief-only board remains represented as editable context instead of a duplicate image. Credit and rollout limitations remain explicit.
2. **Multi-brand overlap:** its original Behance cover prominently repeated Devil's Palace imagery despite that work having a separate case. The site preview and case opener now use an actual food concept from the multi-brand source (image 2). The selected gallery limits itself to images 10, 11 and 15 after the opening; the original source and nonfeatured work remain preserved and accessible.
3. **Saudi Royal opening:** the original cover was a delivery rider even though the prior approved curation chose the family/meal concept as the representative lead. The preview and case opener now use original image 4 and omit its duplicate from the case gallery; delivery and other executions remain accessible.
4. **Hiring first fold:** the 1440×900 screenshot had no artwork above the fold. The typography/hero hierarchy was tightened while keeping the source image aspect ratios intact. Updated browser screenshots show both first project images entering the first desktop viewport.
5. **Visual stage labels and lazy artwork:** the old stage eyebrow said 'VISUAL DEVELOPMENT' even on typography and final execution headings; stage labels now reflect the actual stage. Artwork placeholder aspect ratios and critical-image loading eliminate empty/lazy image slots without cropping.

### Current verification
- PR: https://github.com/Mahmoud-abd-elwahab/portfolio/pull/2
- Updated QA: https://github.com/Mahmoud-abd-elwahab/portfolio/actions/runs/41908337617 — success on commit a24106696cee8d975d3ffd7c134354d4b49f665c.
- Tests additionally check: three World Cup stages and loaded artwork, all twelve first case artworks decoded in browser, no duplicate featured image for Saudi/multi-brand, early homepage artwork, responsive overflow, keyboard lightbox, reduced-motion and source integrity.
- Actual review images from the action artifact were inspected for typography, development, executions, homepage and mobile/tablet behavior.
- The repository remains 12 unique source projects and 237 original source media items.

### Remaining release condition
A PR check does not prove public Pages deployment. The new `.github/workflows/production-pages-smoke.yml` is designed to compare actual public HTTP-served HTML/CSS/JS/assets and CV bytes with the merged repository. Final delivery must cite the Pages deployment and **successful production smoke job for the merged commit**. If the smoke job fails, report this as a blocker instead of declaring an agency-ready published site.

### Hiring judgment (not a guaranteed hiring outcome)
- Lead: Uwallet Campaigns, Saudi Royal Nutrition, uWallet World Cup 2026, The Devil's Palace.
- Supporting work: uWallet product campaign visuals, Olivewood, Automotive exploration, Multi-brand selections, Food visual studies.
- Earlier/secondary: Big Chips, GYM Time, Al-Aqsa poster.
- Editorial claims are bounded by visible source evidence. The agency recruiter still has to judge actual artwork quality and role fit, not just code correctness or successful automated tests.

## Hiring-oriented editorial refinement — 4 November 2026, PR #3

- Reviewable branch: `fix/hiring-case-curation-mobile-20261104`; PR: https://github.com/Mahmoud-abd-elwahab/portfolio/pull/3
- Kept the existing white editorial site, twelve unique cases, project order, and all 237 original image boards. No original image was modified or removed.
- Homepage: strengthened graphic-design/campaign positioning, made the About and contact copy directly relevant to agency hiring, retained verified email/CV, and added a Behance footer link.
- Mobile: reduced portrait/intro height, simplified the Work heading hierarchy, and kept the first project artwork much earlier in the scroll. Fixed the mobile width overflow caused by the longer hiring CTA and wrapped footer links.
- Olivewood: five actual Key Visual executions are featured instead of embedded text-only boards. Text-only source boards remain preserved in the repository/Behance; the source credit confirms Graphic Designer execution under approved creative direction in collaboration with an Art Director, and this is now stated as editable HTML.
- Uwallet entertainment and World Cup: refined the case explanations to connect product visibility with visual treatment, without adding campaign performance assertions.
- Saudi Royal: reduced featured selections while keeping the remaining original artwork available in the expandable source gallery.
- Updated static release tests to check cross-page asset revision coherence, and extended browser QA with hiring CTA, mobile first fold, and Olivewood image/credit checks.
- **PASS**: GitHub Actions `Portfolio hiring-readiness QA` run https://github.com/Mahmoud-abd-elwahab/portfolio/actions/runs/41912977070 for code commit `5154accf915b2fdc207e89111f66baf21c799afc`. Static source audit and browser suite passed on desktop, tablet and mobile. Screenshots from the successful run were reviewed, including the revised 390px homepage first fold.
- **Not published by this PR**: GitHub Pages still serves the default `main` branch pending merge. Do not describe this PR as deployed. Production smoke verification must run against the merge commit and verify served bytes before a live release is certified.
