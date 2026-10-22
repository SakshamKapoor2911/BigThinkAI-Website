# Interactive learning design — source and preview notes

## Scope

Branch: `design/interactive-learning`. The design uses the existing Next.js, React, TypeScript and font setup, without new runtime dependencies. It replaces the homepage, adds the Learn library and eight static workshop routes, and adds a project-directions page. Existing component studies and the older roadmap remain available but are not promoted in the new navigation.

The direction combines Anusha's shared hands-on workshop materials with the previously inspected Lovable chapter/inspector patterns. This is a local implementation, not an export of the unfinished Lovable prototype. Nothing is deployed or pushed by this work.

## Selected source records

The full local source authority is the sibling `WORKSHOPS/PYONEERS-ARCHIVE/index.yaml` and `drive-index.yaml` in the parent BigTh!nkAI workspace. Private Drive documents, answer copies, contact details and the full index are not bundled into this site. These student-facing records were selected individually:

| Route | Notebook ID | Adaptation |
| --- | --- | --- |
| `/learn/computer-vision` | `1i6zCAeOtQnIlTnsTDy5rwk6tN8nISthd` | Custom 3x3 filters from the student Computer Vision notebook, cells 6–7. Browser mini lab calculates every pixel, with explicit nearest-edge padding and clipping. Synthetic sample image; no model inference or campus sensor claims. |
| `/learn/working-with-data` | `10Yi2JjnJH28dpSv-uRShvU_2ASrUbpdb` | The six-person Name/Age/Occupation table in the Intro AI/ML exercise. Preserves the inclusive 18 boundary. Keeps Age available for the exercise; a changed threshold uses the neutral Matches column name. |
| `/learn/sql` | `1i4OcynXxfHDjdvr_xlnpXISjpvSiPXFd` | SELECT/WHERE/sort concepts from the SQL student notebook. The browser uses a small curated People table and computes the selected operations; it is a query builder, not an arbitrary SQL engine or the full workshop databases. |
| `/learn/research-assistants` | `1MDbhh1wLABJiaOnFDN_uIqqfE0HRAYG8` | Question decomposition -> chunk retrieval -> context -> report. A reading guide and original resources, without fabricated live model outputs or autonomous-execution claims. |
| `/learn/python-basics` | `17uosMvsGVMUIzxAJsu697BgG8WWdTPxW` | Introductory data types, branch order, loops and functions. Uses accurate derived explanations rather than carrying the source's copy/remove comment inaccuracies forward. |
| `/learn/neural-networks` | `1eSFc7hGMsxAg_yT2EPZqKF3GggbQAAlH` | MNIST student notebook. Describes preprocessing, CNN features and evaluation without the old unsupported batching speed claim. |
| `/learn/sentiment-analysis` | `1u28dCv_npqUuyoWYB3BiJHHDF-kFGql5` | Separately identified accessible notebook from the May workshop folder; not a silent replacement of the inaccessible direct link. Explains why removing negation can lose meaning. |
| `/learn/controlled-generation` | `1tE0-4p7MaIQkogI_KdmoFzxyaJ05l-HQ` | Student controlled-generation notebook. Distinguishes structural output validity from factual correctness. |

Original slides and recording IDs are in `lib/learning.ts`. Resources were accessible through the connected Drive during archival; signed-out public availability and present-day execution of the original ML notebooks are not certified. Times shown are editorial read/explore estimates. Resource files may have changed since historical delivery; no new event dates or active cohort claims were inferred.

The community destination is `https://terplink.umd.edu/organization/bigthinkai`, corroborated on October 22, 2026 by the UMD CS directory at https://undergrad.cs.umd.edu/bigthnk-ai. The new interface replaces the old demo signup with this actual organization destination. Project cards are clearly framed as exploration directions, not current openings or completed teams.

## Motion and accessibility

Section reveals use IntersectionObserver and small CSS transforms. Content is visible before JS and is never gated on animation. Lesson rail links provide manual navigation and follow the visible section. All filter and data controls use native buttons/selects/ranges; hundreds of image pixels do not become keyboard stops. The pixel inspector has keyboard-operable row/column controls. OS reduced-motion preferences disable animations, transforms on hover, and smooth scrolling. The mobile menu returns focus to its button on Escape.

## Local run and validation

The default Webpack builder rejects an exclamation mark in this existing Windows workspace path. The repository was not relocated or patched around that environment issue. The bundled alternative works:

```powershell
node node_modules/next/dist/bin/next build --turbopack
npm run start -- --hostname 127.0.0.1 --port 3000
npm test -- --runInBand
```

The production build generates the eight workshop routes. Existing showcase files emit pre-existing lint warnings and an optional missing-framer-motion warning; no runtime animation dependency was added for the new design. Unit/interaction tests cover convolution arithmetic and clipping, the inclusive query boundary, empty results and reset, sorting/code agreement, and dynamic column labels. Browser review checks and screenshots are recorded in the parent workspace's `.work/design-preview-2026-10-22/` directory.

Public release remains a later decision after visual feedback. The layout is an implemented preview; external resource permissions, current EDGE cohorts, and original notebook compatibility need their own release review.

### Executed checks — October 22, 2026

- Turbopack production build: passed; generated all eight workshop paths.
- Jest: 4 suites, 12 tests passed, including existing navigation tests.
- Browser: homepage image changes when its filter changes; library topic filters, text search, empty results and reset work; DataFrame condition, empty result, reset, descending order and answer feedback work; SQL example returns Tommy then Karl for Age >= 25 with descending order.
- Phone-width review: homepage, vision lesson and SQL lesson had no root horizontal overflow. Menu Escape returns focus to Menu. The vision column slider responds to ArrowRight and announces its updated one-based column.
- Reduced-motion emulation: HTML/body scroll behavior is auto and button transition duration is 0s; override reset afterward. Temporary viewport override was also reset.
- Browser error log in reviewed interactions: no errors returned. This is a focused interaction review, not a claim of a complete accessibility audit or verification of every external resource.
- Final homepage and phone screenshots saved in the parent workspace preview directory. Preview server remains local at http://127.0.0.1:3000.
