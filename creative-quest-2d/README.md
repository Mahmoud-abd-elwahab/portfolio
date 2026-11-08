# Creative Quest 2D — v0.3

## Play
https://mahmoud-abd-elwahab.github.io/portfolio/creative-quest-2d/

## Implemented
- 30 playable levels across 3 worlds: Observation (1–10), Tension (11–20), Insight (21–30).
- 3 Boss Battles, 5 distinct puzzle modes (select, pair, classify, evidence, open response) plus existing structured open-response exercises.
- New fictional scenarios spanning more than a dozen sectors; no reuse of the Samsung/Netflix/IKEA/food-ordering exercises in the user's training.
- 2D top-down explorable map, on-screen joystick, tap-to-walk, keyboard controls, experience points, unlocks, and save in browser Local Storage.
- Preserves v0.2 save data from the same browser and origin (key `creative-quest-2d-v02`).
- Manual honest rubric evaluation for free writing (not semantic AI grading). Boss Battle can hand off to ChatGPT and requires manual completion confirmation.
- Offline PWA where the browser supports it; export progress as JSON from menu.

## Not implemented yet
- Levels 31–500, actual Territory doors and branching creative worlds, professional sprites/animations, cloud progress synchronization, automatic ChatGPT grading.

## Validation
- JavaScript syntax checked for every script.
- Headless logic harness checks all worlds, content schemas, level progression, XP, and save migration.
- Browser rendering tests blocked by execution environment; on-device QA required before considering the release fully verified.