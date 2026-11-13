# Portfolio redesign plan

Status: awaiting approval. No code has been written. Based on the audit of 12 Nov 2026 and the owner's answers to the 21 brand questions.

---

## 1. Brand direction

### Positioning

**Memorable line (verbatim, used as the deck sentence):**
> Product-minded full-stack engineer building reliable operational systems.

**Headline (recommended):**
> I build operational systems that keep working.

The headline makes a claim in your own voice and sets to two lines at desktop display size. The positioning line sits directly beneath it as the deck, so the sentence a stranger should remember appears on the page word for word. Using the positioning line as the headline instead would set to three lines and describe a role rather than make a claim. Your call, flagged as open decision D3.

Seniority is never stated. It is carried by scope of ownership ("Solo developer", "Frontend lead"), by architecture decisions described in the case studies, and by code you can show.

### Personality

Precise, trustworthy, warm. Expressed as restraint, accurate detail, and generous space, not as effects.

Avoided: futuristic, flashy, corporate.

### Voice

First person, direct, technically specific, with restrained warmth.

| Do | Don't |
| --- | --- |
| Name the constraint and the outcome in one sentence | Use "world-class", "bulletproof", "seamless", "innovative", "production-grade" |
| Say what you owned and what you decided | Promise absolute reliability or zero failure |
| Label illustrative data as illustrative | Imply a number is measured when it is a target |
| Prefer a concrete noun to an adjective | Claim a live status without a source and a failure state |
| Write "I" for your work, "you" for the reader | Invent testimonials, logos, clients or metrics |

### Name and mark

**CDenn** is the brand. "Dennis Ndung'u" appears as the person behind it in the identity line of the first viewport and in the About page, which fixes the audit finding that a visitor could not tell whose portfolio this is.

The existing mark stays in place for this redesign. You said the logo can change; refining it is tracked as open decision D6 and is out of scope for the phases below so it does not block the build.

---

## 2. Design system

Expressed as semantic tokens. Components read token names, never raw values, so a palette change never requires a page edit.

### Colour

Light mode leads. Dark mode is complete and separately specified, not an inversion, because the same hue reads differently on a new ground.

**Light mode**

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#F4F2EC` | Page ground, warm stone |
| `surface` | `#FBFAF6` | Cards, inputs |
| `surface-alt` | `#E9E6DD` | Alternate bands, table headers |
| `ink` | `#141E1B` | Headlines and body |
| `ink-muted` | `#3E4A45` | Secondary text |
| `ink-subtle` | `#55615B` | Captions, metadata. Lightest text permitted |
| `line` | `#D9D5C9` | Hairline separation |
| `line-strong` | `#717B75` | Input and control boundaries |
| `primary` | `#1E4C41` | The one action colour |
| `primary-hover` | `#163A32` | Hover and pressed |
| `on-primary` | `#F7F5EE` | Text on primary |
| `primary-tint` | `#D8E6DF` | Secondary button, soft highlight |
| `on-primary-tint` | `#163A32` | Text on the tint |
| `link` | `#1E4C41` | Links, always underlined in running text |
| `focus` | `#1E4C41` | Focus ring |
| `accent` | `#F2C600` | Signal yellow. Fill only |
| `on-accent` | `#141E1B` | Text on the accent fill |
| `danger` | `#A12A18` | Error text and borders |

**Dark mode**

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#0C1311` | Near-black, emerald-tinted |
| `surface` | `#121C19` | Cards |
| `surface-alt` | `#1A2622` | Bands |
| `ink` | `#F0EEE6` | Primary text |
| `ink-muted` | `#BBC4BE` | Secondary text |
| `ink-subtle` | `#98A49E` | Lightest text permitted |
| `line` | `#253230` | Hairlines |
| `line-strong` | `#677670` | Control boundaries |
| `primary` | `#8FD4B9` | Lighter mint, so it reads on the dark ground |
| `on-primary` | `#0C1311` | Text on primary |
| `accent` | `#F5D23B` | Signal yellow, brighter |
| `focus` | `#F5D23B` | Focus ring, yellow in dark mode |
| `danger` | `#FF8B79` | Error text |

**Verified contrast (computed from these values, WCAG 2.x formula)**

| Pair | Light | Dark | Needs |
| --- | --- | --- | --- |
| `ink` on `canvas` | 15.24 | 16.19 | 4.5 |
| `ink` on `surface-alt` | 13.67 | 13.45 | 4.5 |
| `ink-muted` on `canvas` | 8.26 | 10.52 | 4.5 |
| `ink-subtle` on `surface-alt` | 5.18 | 6.05 | 4.5 |
| `on-primary` on `primary` | 8.89 | 11.00 | 4.5 |
| `on-primary-tint` on `primary-tint` | 9.67 | 9.27 | 4.5 |
| `link` on `canvas` | 8.66 | 11.00 | 4.5 |
| `on-accent` on `accent` | 10.44 | 11.50 | 4.5 |
| `danger` on `canvas` | 6.56 | 8.26 | 4.5 |
| `line-strong` on `canvas` | 3.91 | 3.94 | 3.0 |
| `focus` on `canvas` | 8.66 | 12.68 | 3.0 |

All 24 pairs in the contract pass in both modes.

**Colour rules**

- One primary action per view.
- `accent` against the light page measures **1.46:1**. It is a fill carrying `on-accent` text and nothing else. It is never text on light, never a thin icon, never a border, and never the focus ring in light mode. In dark mode it measures 12.68:1 against the ground, so it serves as the focus ring there.
- Proportions: roughly 70% canvas and surface, 20% ink, 8% emerald, 2% yellow. If yellow covers more than a badge, a highlighted figure or one small call-out, remove it.
- Status is never colour alone. Every state carries a word.
- This replaces the current muted gold `#B08D4F`, which measures 2.67:1 on the existing ground and fails as text. You asked for a clearer warm accent "if testing supports it": the test supports the change, with the fill-only constraint above.

### Typography

Aeonik is a commercial CoType release and you hold no licence, so it cannot ship. Two routes:

1. **Recommended.** A Google-hosted geometric grotesque in Aeonik's category, chosen by a rendered specimen test at 12px, 16px and 56px before anything else is built. Candidates: **Schibsted Grotesk**, **Hanken Grotesk**, **Onest**. All are variable, already supported by the `next/font/google` setup in the stack, and carry no licence ambiguity.
2. **Alternative.** Self-host a Fontshare face such as General Sans or Switzer, which sit closer to Aeonik. My sources disagree on whether these are OFL or Fontshare's own ITF Free Font License, so you would need to read the licence yourself before I add the files. I will not assert these are clear for commercial use.

Inter is removed either way.

A second typeface is not proposed. If you want a serif for case-study pull quotes and story sections, say so and I will add exactly one, used only there.

**Type scale.** Ten roles, every line height a multiple of 4px.

| Role | Desktop | Mobile | Use |
| --- | --- | --- | --- |
| `hero` | 56 / 56 | 36 / 40 | The one statement in the first viewport |
| `display` | 44 / 48 | 30 / 36 | Section openers, case-study titles |
| `headline` | 32 / 36 | 26 / 32 | Page and section headings |
| `title` | 20 / 28 | 20 / 28 | Card and row titles |
| `subtitle` | 18 / 28 | 17 / 28 | The deck sentence, section intros |
| `quote` | 20 / 32 | 18 / 28 | Pull quotes |
| `body` | 16 / 24 | 16 / 24 | Running text |
| `body-sm` | 14 / 20 | 14 / 20 | Metadata, captions |
| `label` | 14 / 20 | 14 / 20 | Buttons, field labels |
| `caption` | 12 / 16 | 12 / 16 | Eyebrows, table headers, tracked |

Two weights only, 400 and 600. Body measure capped at 70 characters. Display tracking tightens to -0.02em; nothing below 18px gets negative tracking.

### Spacing, shape, elevation, motion

- **Spacing.** A 4-point scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96, 128. Section rhythm 96px to 128px on desktop and 64px to 80px on mobile, which delivers the breathing space you asked for. Related items 8px to 16px apart, groups 32px or more.
- **Radius.** `control` 4px, `card` 8px, `chip` 4px. The current 2px radius sits off the 4-point grid and moves to 4px.
- **Elevation.** `raised` is a 1px hairline. Nothing carries a shadow at rest. `floating` is a soft shadow reserved for things that genuinely float: the mobile menu and the CV dialog.
- **Motion.** Durations 120ms, 200ms, 320ms with one easing curve. Colour, background and border transitions only. No entrance animation on content, so every page is readable before any script runs. This retires the scroll-reveal dependency that currently gates content on JavaScript. `prefers-reduced-motion` removes all transitions.

### Components

Primitives: Button (primary, secondary, ghost), Link, Card, Chip, Field (label, hint, error), Input, Textarea, Select (native), Table, SkipLink, Dialog, ThemeToggle.

Composites: SiteHeader, MobileMenu (dialog), Footer, StatusBar, EvidenceRow, ProjectRow, ProjectCard, CaseStudyHeader, ArticleCard, ContactForm, BackToTop.

Retired: `ScrollProgress` and `BackgroundAmbience` (decoration with no task), `TestimonialsSection` and `StatsSection` (no real data), `Reveal` and `useReveal` (content should not depend on JS), `CustomSelect` (replaced by a native select), `OptimizedImage` (unused, duplicates `next/image`).

---

## 3. Information architecture

| Route | Purpose | Primary action |
| --- | --- | --- |
| `/` | Who I am, what I build, three proofs, one next step | View selected work |
| `/solutions` | The full archive, scannable for comparison | Open a case study |
| `/solutions/[slug]` | One case study: constraint, approach, evidence, stack | Start a conversation |
| `/services` | For direct clients: three specialisms and engagement models | Start a conversation |
| `/services/[slug]` | One specialism in depth | Start a conversation |
| `/writing` | Index of published pieces | Read a piece |
| `/writing/[slug]` | One article. **New route** | Read next |
| `/about` | Dennis behind CDenn: principles, background, profiles | Start a conversation |
| `/privacy` | Policy and data requests | Submit a request |

Primary navigation: Work, Writing, About, Contact. Services moves into the footer and the case-study pages, since recruiters outrank clients in your audience ranking. `/writing` enters primary navigation only when the first article is published, otherwise it waits in the footer.

### Home, first viewport

This is the dashboard. One screen, no scrolling needed to understand you.

**Desktop (1440 x 900)**

1. Header: CDenn mark, Work / Writing / About / Contact, theme toggle
2. Identity line: `CDenn · Dennis Ndung'u · Nairobi, working across time zones`, with a small portrait at about 72px
3. H1 `hero`: the headline
4. Deck `subtitle`: the positioning line verbatim
5. Status chip: availability, with a visible "updated" date
6. Primary button **View selected work**, with **Start a conversation** as a quiet text link beside it
7. Selected proof: three compact rows, Opsis / Bancassurance Platform / WarehouseLens, each one line of capability

**Mobile (390 x 844)**

Identity line, H1, deck trimmed to two lines, status chip, the primary button full width, then the first proof row begins and signals scroll. The portrait sits inside the identity line, not as a separate column, so it never pushes the action below the fold. The current layout puts the portrait around 615px down and costs the first screen; that goes.

Below the fold: selected work in full, what I do, writing (when live), contact, footer.

### Solutions index

Answers one question: which case study should I open? Each row carries number, title, year, role, category, the constraint in one sentence, one evidence item, and the stack as text. Full narrative lives in the case study. The current index repeats description, evidence and stack for all ten projects and runs 7,710px on mobile.

### Case study

Title and category, the constraint, my role and dates, approach, evidence table (typed, see below), stack, links, then adjacent projects and one contact action. Three home projects plus the rest of the archive all get case studies, with the story section where one exists.

---

## 4. Dashboard sections, data and states

Every section below is manually maintained with a visible update date. Nothing claims to be live.

| Section | Purpose | Data source | Empty | Loading | Error |
| --- | --- | --- | --- | --- | --- |
| Identity | Name, brand, specialisation | `data/profile.ts` | n/a, always present | none, static | none, static |
| Availability | What I am open to, and when it was last confirmed | `data/status.ts` with `updatedAt` | Omit the chip entirely rather than imply availability | none | If `updatedAt` is older than 60 days the build warns and the chip shows the date only, without a claim |
| Selected proof | Three strongest projects | `featured: true` in `portfolio.ts`, enforced at exactly 3 | Render what exists, no placeholder tile | none | Build fails if more or fewer than 3 are flagged |
| Evidence | Typed proof per project | `evidence[]` on each solution | Omit the row. Never "N/A" | none | Build fails if an item has no `kind` |
| What I do | Specialisms | `data/specialisms.ts` | Hide the section | none | none |
| Writing | Published pieces | `data/writing.ts`, only entries with a real route | Hide on home; `/writing` shows an honest "not yet published" note with no invented dates | none | none |
| Contact and CV | Convert | POST to `/api/contact`, CV as a checkbox in the form | n/a | Button disabled with visible progress | Inline message in words, announced in a live region |

Explicitly **not** presented as live, per your answer: GitHub activity, deployment status, uptime, request volume, any project metric.

### The evidence model

This implements your rule that a number survives only when its baseline, method and date can be described. Every proof item gets a `kind`, and the UI labels it:

| `kind` | Meaning | Rendered as |
| --- | --- | --- |
| `measured` | A real measurement with baseline, method and date | The figure, plus the method on the case study |
| `capability` | An implementation fact | A plain statement, no figure styling |
| `test` | Test or backtest evidence, linkable where the repo is public | The figure, labelled as test evidence |
| `target` | A design goal, not an outcome | Prefixed "Target" |
| `demo` | A deployed reference with illustrative data | Labelled illustrative |
| `confidential` | A client claim that cannot be shown | Labelled NDA, no figure |

Applying it to what exists today:

| Current claim | Proposed `kind` | Action |
| --- | --- | --- |
| Opsis `<200MB / <5% CPU` | `target` | Relabel. The prose already says "targeting" |
| WarehouseLens 155 tests + eval harness | `test` | Keep if you can point at the suite; otherwise convert |
| WarehouseLens 6 roles / 21 permissions | `capability` | Keep as a statement |
| Bancassurance maker-checker, 7 entities | `confidential` | Keep, labelled NDA |
| Email Refiner `-40%` editing time, `<1s` | needs your answer | Convert to capability unless you can describe baseline, method and date |
| Ndoa Plan "10+ wedding events" | needs your answer | Convert unless you can evidence it |
| E&M 40% page-load improvement, "3+ product teams" | needs your answer | Convert unless you can describe the measurement |
| Placeholder testimonials (John Smith, Jane Doe) | delete | Removed from source in Phase 1 |

Tracked as open decision D4.

---

## 5. Accessibility and responsive requirements

Acceptance level is WCAG 2.2 AA, as you specified.

- **Keyboard.** Every interactive element reachable and operable. Visible focus everywhere. The mobile menu and the CV dialog get full dialog semantics: `role="dialog"`, `aria-modal`, an accessible name, initial focus, focus containment, Escape to close, and focus returned to the opener. The menu button gets `aria-expanded` and `aria-controls`. These are the two P0 findings from the audit.
- **Forms.** Native `<select>` replaces `CustomSelect`. Labels are visible and associated. Required means required on both client and server, with the same allowlist. Results are announced through a live region and focus moves to the outcome.
- **Zoom.** No horizontal scroll and no clipping at 200% zoom, verified at a 640px effective width.
- **Touch.** Every target at least 44x44px. The theme toggle (36px), menu button (40px), footer social icons (36px) and the text-only CV and social links (20 to 24px) all grow.
- **Motion.** `prefers-reduced-motion` removes transitions. No content depends on an animation to appear.
- **Structure.** One `h1` per page, correct heading order, semantic landmarks, a skip link on every page, descriptive link text, `aria-hidden` on decorative SVG.
- **Colour.** All 24 contrast pairs verified per mode in the build. No status conveyed by colour alone.

**Breakpoints**

| Name | Range | What changes |
| --- | --- | --- |
| Phone | to 639px | One column, 16px gutters, display sizes step down, tables scroll inside their own box, menu becomes a dialog |
| Tablet | 640 to 1023px | Two-column pairs return, inline navigation appears |
| Desktop | 1024px and up | Twelve-column grid, identity beside proof, case-study sidebar appears |

Mobile is designed as its own composition, not a stacked desktop. The primary action stays in the first screen at 390px.

---

## 6. Phases

Dependencies may be added where necessary, as you allowed. Each one will be named, pinned, and justified before I add it.

### Phase 0: Decisions (no code)

Resolve D1 to D7 in section 7. Typeface specimen test rendered at three sizes for your pick. Output is a one-page decision record. Nothing ships.

### Phase 1: Stabilise

Correctness and truth, with no visual change.

- **Files:** `components/sections/HeroSection.tsx`, `components/layout/Navbar.tsx`, `components/sections/contact/CustomSelect.tsx`, `components/sections/ContactSection.tsx`, `components/sections/RequestCV.tsx`, `components/sections/contact/utils.ts`, `app/api/{contact,privacy,request-cv}/route.ts`, `app/lib/email.ts`, `data/portfolio.ts`, `app/{writing,privacy}/page.tsx`, `app/sitemap.ts`, `app/layout.tsx`, `README.md`
- **Work:** dialog semantics for the mobile menu and CV; native select with matching server validation; live regions and focus management on all three forms; skip link; delete placeholder testimonials and the duplicate writing array; fix the budget currency bug that relabels the same number as USD or KES by time zone; add abuse protection and enum allowlists to the three email endpoints and stop returning provider errors to the client; add canonicals to `/writing` and `/privacy`, unbrand child titles, add `/writing` to the sitemap, stop stamping every sitemap entry with the current date; replace the create-next-app README and document the environment variables.
- **Non-goals:** no palette, type, layout or copy change.
- **Acceptance:** keyboard path through menu, CV and contact works with no trap; Escape closes both overlays and focus returns; submitting each form announces its result; no placeholder person remains in source; a flood of requests to each endpoint is throttled.
- **Validation:** `npm run lint`, `npm run build`, manual keyboard pass, a scripted POST burst against each endpoint.

### Phase 2: Tokens and primitives

- **Files:** `app/globals.css` split into `styles/tokens.css`, `styles/foundation.css`, `styles/components.css`; `app/layout.tsx` for the font; new `components/ui/*` primitives
- **Work:** the palette and type scale above as semantic tokens; the 4-point spacing, radius and motion scales; shared component recipes; retire the dead chart, sidebar and self-referencing font variables the audit found; a contrast check that runs in the build and fails on a regression, reusing the checker already written for `my-themes`.
- **Non-goals:** no page or content change. Pages keep their current structure and will look transitional until Phase 3.
- **Acceptance:** no literal hex or `text-slate-*` outside the token files; every type line height a multiple of 4px; both modes pass all 24 pairs in the build; no new dependency beyond the chosen font.
- **Validation:** `npm run build` with the contrast gate, a token-usage grep, screenshots at 1440 and 390 to confirm nothing broke.

### Phase 3: Key journeys

- **Files:** `app/page.tsx`, `PortfolioClient.tsx`, `components/sections/{HeroSection,AboutSection,SolutionsSection,ContactSection}.tsx`, `components/layout/{Navbar,Footer,SubpageNav}.tsx`, `app/solutions/page.tsx`, `app/solutions/[slug]/page.tsx`
- **Work:** the first-viewport dashboard; status bar from `data/status.ts`; exactly three featured projects; the scannable solutions index; the case-study template with the evidence table; one contact form with the CV checkbox; move static content out of the client boundary so hero, about, work and footer render on the server.
- **Non-goals:** services and about pages untouched; no new illustration yet.
- **Acceptance:** at 1440x900 and 390x844 the first screen shows identity, specialisation, availability with its date, one primary action and the first proof; exactly one primary button per view; home page height drops materially from the current 8,104px desktop and 13,366px mobile; no horizontal overflow at either width or at 200% zoom.
- **Validation:** full-page screenshots at both widths, keyboard pass, zoom check, `npm run build`.

### Phase 4: Content, proof and writing

- **Files:** `data/portfolio.ts`, new `data/{status,profile,specialisms,writing}.ts`, `app/about/page.tsx`, `app/services/**`, `app/writing/page.tsx`, new `app/writing/[slug]/page.tsx`, `app/page.tsx` structured data
- **Work:** the typed evidence model applied to all ten projects; metric conversions from D4; copy rewritten to the voice rules, removing every banned absolute from the services pages; About reordered to lead with Dennis, principles and background rather than the name explanation; the article route and index; FAQ structured data either rendered as visible content or removed.
- **Non-goals:** no new projects invented; no testimonial added until you supply real ones.
- **Acceptance:** every evidence item carries a `kind` and renders with its label; no banned word appears in any page; no unsourced figure remains; `/writing` either lists real pieces or states plainly that none are published.
- **Validation:** a grep gate for the banned vocabulary, `npm run build`, a read-through of all ten case studies.

### Phase 5: Polish and validation

- **Files:** any remaining literal colours on service and privacy pages, `next.config.ts`
- **Work:** dark-mode pass on every route; case-study imagery for the three projects without screenshots (see risk R1); remove the unused Picsum, Unsplash and placeholder image domains; tighten the CSP that currently allows `unsafe-inline`; blur placeholders and an LCP check, since the navbar logo and hero portrait are both priority-loaded today.
- **Non-goals:** no analytics, per your answer.
- **Acceptance:** every route reviewed in both modes at both widths; keyboard, 200% zoom and reduced-motion all pass; Lighthouse run recorded as a baseline.
- **Validation:** screenshot matrix across all routes, modes and widths; keyboard and zoom passes; Lighthouse.

---

## 7. Risks and open decisions

### Risks

**R1. Two of your three home projects have no imagery.** Bancassurance is under NDA with no screenshot, and WarehouseLens has `image: undefined`. Only Opsis has a real one. The home page would lead with two branded placeholder covers, which undercuts the premium feel. Proposal: draw an architecture diagram in SVG for each, built from the theme tokens, showing the trust boundary for WarehouseLens and the tenant and approval boundary for Bancassurance. Diagrams are honest, show engineering judgement, and need no client assets. I need to know what you can show under the NDA.

**R2. Font licence.** Aeonik cannot ship. If you prefer a Fontshare face over a Google-hosted one, the licence needs your reading before I add any files.

**R3. Yellow accent is fill-only.** Measured at 1.46:1 against the light page. If you want yellow to carry emphasis as text or as a rule, it cannot do so on a light ground at AA. The alternative is a darker amber, which loses the pop you liked.

**R4. The archive is large.** Ten case studies with real narrative is a lot of writing. Phase 4 can land the three home projects first and fill the rest incrementally.

**R5. Project dates.** Several projects are dated 2026 and marked ongoing. Confirm these before launch.

**R6. Scope creep from the visual rewrite.** You allowed one. The phases keep services, about and privacy on tokens only until Phase 4 so the main journeys land first.

### Open decisions

| # | Decision | Recommendation |
| --- | --- | --- |
| D1 | Typeface: which of Schibsted Grotesk, Hanken Grotesk or Onest, or self-host a Fontshare face | Pick from a rendered specimen in Phase 0 |
| D2 | A second typeface for quotes and story sections | No, unless you want it |
| D3 | Headline wording: my shorter claim, or your positioning line verbatim | My claim as H1, your line as the deck |
| D4 | Which of the listed figures you can substantiate with baseline, method and date | Keep only those; convert the rest |
| D5 | Services section: keep and rewrite, or retire | Keep, since direct clients are in your audience, and rewrite the copy |
| D6 | Wordmark refinement now or later | Later, separately |
| D7 | What Bancassurance and WarehouseLens can show visually | Architecture diagrams, pending your NDA answer |
| D8 | Whether `/writing` enters primary navigation before the first piece is live | No, footer until it ships |

### Coherence with the theme library

The Emerald Ledger theme in `my-themes` was built as this direction's draft and uses Inter. Once D1 and the accent are settled, I will update that theme to match, so the library and the portfolio stay in sync. That is a small change in the other repo and is not part of these phases.

---

Awaiting your approval, and answers to D1, D3, D4 and D7 before Phase 1.

---

## 8. Decision record and progress

### Decisions taken (12 Nov 2026)

| # | Decision | Outcome |
| --- | --- | --- |
| Plan | Approved by the owner | Phase 1 proceeded |
| D7 | What the NDA permits | **Bancassurance is NDA**, so diagram or redacted artefacts only. **WarehouseLens can show everything**, so real screenshots of warehouselens.cdenn.dev can be captured in Phase 3 or 5 |
| D1 | Typeface | **Onest**, chosen from a rendered specimen of Onest, Schibsted Grotesk and Hanken Grotesk at 12/16/56px. Hanken set the headline to three lines at 56px and was eliminated; Schibsted's tabular figures spaced unevenly. Schibsted Grotesk is the fallback if the owner wants more editorial character. Binds in Phase 2 only |
| D3 | Headline | Recommendation taken: "I build operational systems that keep working." as the H1, with the owner's positioning line verbatim as the deck. Reversible in one data file |
| D4 | Unsubstantiated figures | Not yet answered. The honest default from the owner's own rule applies: **convert all four to capability statements** in Phase 4, and restore any figure they can describe with a baseline, method and date |

Still open: D2 (a serif for quotes), D5 (services kept and rewritten), D6 (wordmark), D8 (`/writing` in primary nav).

### Phase 1 complete and verified

Delivered in three parallel slices with no file overlap: accessibility and forms, API hardening, and content truth plus SEO.

Verified by execution, not by inspection:

- Skip link is the first focusable element and resolves to `#main`, which now exists on all 11 pages.
- Mobile menu and CV overlay are real dialogs: `role="dialog"`, `aria-modal`, an accessible name, focus moved in on open, and focus **restored to the trigger** after Escape (confirmed by keyboard, not a programmatic click).
- Focus left the open mobile menu **0 times in 18 tabs**. The audit found 42 reachable background controls.
- The rewritten forms pass the new server validation (503 mail-not-configured, so validation passed), while the old display-string payloads are correctly rejected with 400. Honeypot submissions return 200 and send nothing.
- Guard order proven by status code: 415 wrong content type, 403 foreign origin, 429 on the 6th rapid request, 400 on an invalid choice or an over-long field.
- 0px horizontal overflow at 640px, the 200% zoom proxy.
- Mobile screenshot is visually identical to the pre-change audit capture, as Phase 1 required.

Known limitation recorded at the time: the rate limiter is in-memory, so on serverless it is per-instance and resets on redeploy. It raises the cost of flooding one form; it is not a hard ceiling. A durable limit needs a shared store or an edge rule.

### Typography, resolved (12 Nov 2026)

Three faces, each with a job that does not overlap. Chosen from rendered specimens of 13 sans faces, 6 serifs and 4 monos at the real sizes with the real copy, not from reputation.

| Tier | Face | Source | Licence | Loaded by |
| --- | --- | --- | --- | --- |
| Primary | Switzer | Fontshare | ITF Free Font License | `next/font/local`, variable woff2 |
| Secondary | Newsreader | Google Fonts | SIL OFL | `next/font/google` |
| Tertiary | Geist Mono | Google Fonts | SIL OFL | `next/font/google` |

Fontshare's licence page states plainly that all its fonts are free for personal and commercial use, under either ITF's FFL or the SIL OFL. The earlier ambiguity came from aggregator sites and is resolved. §02 Limitations and §03 Embedding of the FFL were not read in full and should be skimmed before shipping a self-hosted webfont.

Eliminated, with the observed reason: Hanken Grotesk set the headline to three lines at 56px; Schibsted Grotesk spaced tabular figures unevenly; Space Grotesk read techy and retro; Outfit was too round; Instrument Serif was too delicate at body size; Gambetta too light; Zodiak display-only. Satoshi and Supreme could not be judged because their 600 weight failed to load in the specimen.

| Role | Face | Weight | Desktop | Mobile | Tracking |
| --- | --- | --- | --- | --- | --- |
| `hero` | Switzer | 600 | 56 / 56 | 36 / 40 | -0.02em |
| `display` | Switzer | 600 | 44 / 48 | 30 / 36 | -0.02em |
| `headline` | Switzer | 600 | 32 / 36 | 26 / 32 | -0.015em |
| `title` | Switzer | 600 | 20 / 28 | 20 / 28 | -0.01em |
| `subtitle` | Switzer | 400 | 18 / 28 | 17 / 28 | 0 |
| `quote` | Newsreader | 400 | 20 / 32 | 18 / 28 | 0 |
| `body` | Switzer | 400 | 16 / 24 | 16 / 24 | 0 |
| `body-sm` | Switzer | 400 | 14 / 20 | 14 / 20 | 0 |
| `label` | Switzer | 600 | 14 / 20 | 14 / 20 | 0 |
| `caption` | Switzer | 600 | 12 / 16 | 12 / 16 | 0.08em |
| `code` | Geist Mono | 400 | 14 / 24 | 14 / 24 | 0 |
| `figure` | Switzer | 600 | inherits | inherits | 0, `tabular-nums` |

Rules:

- Switzer takes no third weight. More emphasis comes from size or colour.
- Newsreader never appears in UI, buttons, labels, nav or headings, and at most one quote block per viewport.
- Geist Mono is confined to `<pre>` and `<code>`. Evidence figures use Switzer with `tabular-nums`, because mono spreading into labels and metadata is the generic look the owner asked to avoid.
- Nothing below 18px takes negative tracking. 12px is the floor for any text.

Fallback stacks: Switzer → `system-ui, -apple-system, "Segoe UI", sans-serif`; Newsreader → `Georgia, "Times New Roman", serif`; Geist Mono → `ui-monospace, "SF Mono", Menlo, monospace`.

Because `next/font` self-hosts Google faces at build time, the site makes no runtime third-party font request, which is consistent with shipping no behavioural analytics.

Open before Phase 2: committing Switzer's woff2 files to the repo needs the owner's nod, since they are new binary assets.

### Phase 2 complete and verified (12 Nov 2026)

The first phase that changes how the site looks. Typeface, palette, scale and a build-time contrast gate, with no page restructuring.

**Typeface decision reversed on new evidence.** Switzer was chosen on looks and approved, but reading the ITF FFL in full showed §02 forbids making the font available through a "repository" or "publicly accessible servers", and `CDenn03/cdenn-port-v2` is public. §01 permits self-hosting on your own server, so serving it from cdenn.dev would be fine; committing the woff2 to a public repo would not, and git history is effectively permanent. No font file was committed. **Mona Sans** replaced it: the closest OFL face in the specimen, second-tightest of the thirteen tested, delivered by `next/font/google` with no committed binaries and no licence risk. Hubot Sans was rejected on sight because its capital I has crossbars and the headline opens with "I build".

Shipped:

- `src/app/styles/tokens.css`, `foundation.css`, `components.css`, with `globals.css` reduced to an entry point. The dead chart, sidebar and self-referencing font variables are gone, as are the unused line-clamp and off-system spacing helpers.
- Three faces by role: Mona Sans structural, Newsreader for quotes only, Geist Mono for code only. Inter removed.
- The verified palette, the twelve-role type scale with every line height on the 4-point grid, and 4-point spacing, radius and motion scales.
- `scripts/check-contrast.mjs`, wired as `npm run build`'s first step. It reads the real values out of `tokens.css`, so it cannot drift from what ships.
- 562 literal colours removed from 24 files, and **278 `dark:` variants deleted** rather than translated, because the tokens define both modes and those variants only flipped a literal. Two files keep literal hex by necessity and were updated by hand: `opengraph-image.tsx` renders at the edge with no stylesheet, and `ConsoleEasterEgg.tsx` styles console output.
- Dead code removed: the unused `components/index.ts` barrel, `OptimizedImage`, `BackgroundAmbience`, and inert `prose` classes.

Three token gaps the migration exposed, now closed: `--success` as a standalone positive text colour (the old code misused `on-success-tint`, whose name implies it sits on the tint); `--scrim`/`--on-scrim`, a fixed-luminance pair for a label over arbitrary imagery, which neither the canvas nor the primary can serve; and the confirmation that `--line` at 1.40:1 cannot bound a control, so inputs use `--line-strong` at 4.20:1.

Verified by execution:

- The contrast gate reports **27/27 pairs passing in both modes**, and a deliberately broken token was confirmed to exit 1 and stop `next build` before it ran. A gate that cannot fail is worthless, so this was tested rather than assumed.
- All **20 route/mode combinations** audited in a real browser: correct canvas, 0px horizontal overflow, Mona Sans loaded, and **zero** text nodes below 3:1 by walking every text node against its nearest painted ancestor. Worst measured text anywhere is 5.78:1 light and 7.29:1 dark.
- 0px overflow at 390px in both modes and at 640px, the 200% zoom proxy.
- Lint, typecheck and build clean.
- Looked at: home light and dark, about light. The About page previously sat on a lighter, pinker cream with a visible seam under the sticky nav; it now matches the canvas exactly.

Accent discipline held: every accent text and stroke usage is scoped to `dark:`, where it measures 12.68:1. In light mode it stays a fill at 1.46:1, and the gate prints a warning if anyone raises it, because doing so would silently legitimise accent borders on light grounds.

Deferred to Phase 4 and flagged by the workers rather than changed: the absolute claims in the services copy ("bulletproof", "every edge case covered", "exactly once"), the 30-day GDPR commitment on `/privacy`, and `/about` still opening with the name etymology. Also noted: both forms' `focus:outline-none` was removed so the global focus ring applies again.

### D4 resolved, and the evidence model (12 Nov 2026)

The owner answered D4: drop the figures that cannot be substantiated rather than keep them with a caveat. Their own rule applied — keep a number only when its baseline, method and date can be described.

`Solution.results` was renamed to `Solution.evidence`. The old name invited every line to be read as an outcome, and most are not: of 33 items across ten projects, 27 are implementation facts, 3 are client claims that cannot be shown, 1 is a demo deployment, 1 is a design target and 1 is test evidence. None is a production measurement. Each item now carries a `kind` (`measured`, `capability`, `test`, `target`, `demo`, `confidential`), and `measured` requires a `method`.

`src/app/lib/evidence.ts` decides how a kind is presented, in one place:

- The case-study page prints a badge on every item plus a key explaining only the kinds that study uses, so a page of plain capabilities carries no explanation of measurement it never claims.
- Compact surfaces (home cards, the index rows, the hero proof list) prefix only the kinds that would otherwise be misread: `Target`, `Under NDA`, `Demo`, `Measured`. A `capability` or `test` line already describes itself ("Drift over SQLite", "155 tests and an evaluation harness"), and prefixing those would be noise.

Figures dropped: a 40% page-load improvement, "3+ product teams", Email Refiner's `-40%` and `<1s`, and Ndoa Plan's "10+". Opsis's `<200MB / <5% CPU` became `kind: "target"`, which is what it always was. A 27-line commented-out InsureMaster block claiming an LCP of 2.1s, 10,000 users and 99.9% uptime was deleted outright rather than left in the file.

Banned absolutes removed from the services pages and `/about`: "bulletproof", "production-proven" (three places), "production-grade", "production-ready", "Every edge case covered", "every shilling must be accounted for", "ensures no payment is lost or double-counted", "preventing data loss", "Tenant Isolation That Holds Under Audit", "Every query, every endpoint, every background job", "impossible to skip", "exactly once", "survives app restarts and process death", "account for every transaction", and "Leveraging". Each was replaced with the mechanism that makes the claim true — "idempotency keys so a replay does not apply the same change twice" rather than "exactly once" — so the copy says more than it did, not less. A grep for the full banned list now returns nothing across `src/`, `README.md` and `public/llms.txt`.

### Phase 3 complete and verified (12 Nov 2026)

New data files, all manually maintained: `data/status.ts` (availability plus `updatedAt`, with `scripts/check-status.mjs` in the build), `data/profile.ts` (identity and headline strings) and `data/specialisms.ts` (the four areas, each with the work that evidences it).

The status gate **warns** rather than fails when the claim is more than 60 days old, and **fails** only on a missing, malformed or future date. Blocking a deploy over an old date would mean an urgent fix cannot ship until unrelated copy is edited, and the page discloses the date to the reader either way.

Shipped:

- **The first viewport.** Identity line with a 72px portrait, the H1, the deck verbatim, four named specialisms, the availability chip with its confirmation date, one primary action, and three proof rows reading from `featured`. At 390x844 the whole set clears the fold, which took two-across actions and two-column specialism links to achieve.
- **Exactly three featured projects**: Opsis, the bancassurance platform and WarehouseLens. Email Refiner, Ndoa Plan, Sefer and Near Field were un-featured. The homepage and the mobile menu both derive from the flag, so this was a three-line data edit.
- **Static content off the client boundary.** `PortfolioClient.tsx` is deleted. It existed to read `mounted` from the theme hook and pulled the headline, the portrait and every case-study string into the client bundle with it. `page.tsx` now composes the page on the server; `ScrollProgress` and `BackToTop` are the only parts that need the browser. `Footer` and `SubpageNav` also became server components — each was client code solely to pick a logo from the resolved theme, which two `<Image>`s toggled by the `dark` class do with none. The CV dialog is now its own island, `RequestCVButton`.
- **Scannable solutions index and case-study evidence table**, both rendering `kind` through the shared helper.
- **The CV request is a checkbox on the contact form**, not a second form behind a dialog. The server treats only a literal `true` as consent and prints it in the subject line and body.
- The remaining compatibility aliases were retired from every Phase 3 file; only `/services/**`, `/about`, `/privacy` and `/writing` still use them, which is Phase 4's scope.

Two defects found by looking rather than by reasoning:

- **Three header controls were under 44px** and had survived Phase 1: the theme toggle at 36px, the menu button at 40px and the logo link at 36px. Phase 1 verified focus behaviour, not target size. Fixed, along with the footer's 36px social icons and its 22px column links.
- **`bg-primary` as a project cover is wrong in dark mode.** The dark primary is a light mint, so a 16:9 cover filled with it read as a broken image, not a cover. Rather than a `dark:` override, this is now a token pair of its own, `--cover` / `--on-cover`: the deep primary in light, the raised surface in dark. The contrast gate learned to follow a one-level `var()` alias so it could measure the new pair, and now reports **28/28 in both modes**.

Verified by execution across 48 combinations (2 modes × 4 widths × 6 routes):

- **0px horizontal overflow everywhere**, including at the 640x512 200%-zoom proxy.
- Exactly one `h1` on every route.
- Every first-viewport element inside the fold at 1440x900, 834x1112 and 390x844. At 390 the first proof row ends at 837px of 844. At the zoom proxy the actions and proof fall below a 512px fold, which is expected: 1.4.10 requires no content loss and no horizontal scroll, not that a fold still fits.
- Home page height fell from **8,104px to 5,743px desktop** and **13,366px to 9,786px mobile**.
- Keyboard: the skip link is still first and 48px; focus left the open mobile menu **0 times in 24 tabs** and returned to "Open menu" on Escape; the CV dialog opens on Enter, takes first focus on its close button, leaked focus **0 times in 14 tabs**, and returned focus to "Request CV". Every visited control had a visible focus ring.
- One control remains under 44px on the home page: the CV checkbox at 24x24, which meets 2.5.8 AA. Its label wraps the text, so the effective target is the whole row. `/about`'s inline links are still 22px and are Phase 4's scope.
- Contrast gate, typecheck, lint and build all clean.

Judgement recorded: the mono face stays on technology-name lists. The spec said "code only", and a stack list is not code, but these are library and tool identifiers and the convention reads correctly. It was removed from the "In progress" badge, which is plain label text.

### Image placeholders, and R1 closed (12 Nov 2026)

`ProjectCover` now states one thing: why there is no image. It renders two cases that look identical but are not, keyed off the existing `nda` flag:

- `nda: true` → a lock and "Interface not shown. Client work under NDA." This is written to stand permanently. The bancassurance platform may never be able to show anything, so the copy is a settled answer rather than a promise.
- Anything else → "Screenshots not published yet." No date is implied, so it does not become a lie if the capture is never taken. This covers WarehouseLens, Steward and the GIK Souls app.

Conflating the two would mean either claiming a confidentiality restriction that does not exist, or implying a client's system is merely unphotographed when it is actually off limits.

Three fixes came out of looking at it rather than reasoning about it:

- **The cover was repeating the category, title and summary** that every surface already shows immediately beside it. On an NDA case study the title appeared three times on one screen. The cover now carries the statement alone, with the project title in `sr-only` text so a screen reader meeting the image region knows which project it belongs to.
- **An image-less hero at 16:9 was ~700px of empty grid** between the heading and the writing. It is now a short band, `h-40 sm:h-48`. The bancassurance case study fell from 2,332px to 1,947px and WarehouseLens from 2,536px to 2,151px.
- A hairline grid drawn from `currentColor` at 7% was added, so the block reads as a cover that was designed rather than an image that failed to load. It needs no token of its own and holds in both modes.

The statement sits at 80% opacity, measured at **6.35:1 light and 9.08:1 dark** against the cover fill, so it clears AA without being as loud as a heading.

Swapping in real imagery is a one-line data edit — set `image` and the cover disappears — and the slot is commented in `data/portfolio.ts` for both cases.

**R1 is closed as a blocker.** It assumed the three home projects needed custom artwork before Phase 4 could proceed. They do not: the NDA case is answered honestly by the cover, and the pending cases say so plainly. An SVG architecture diagram for bancassurance is now optional rather than required, and only if the client clears one.

### The constraint narrative removed (13 Nov 2026)

The owner read the finished home page and called out that "constraint" had become a tic. They were right, and it was mine: six uses in the copy, carrying a label on every project card, the opening line of "How I work", the contact headline and the brief textarea's placeholder. A word doing that much work stops meaning anything.

Replaced with language that varies by job rather than one synonym swapped for another:

| Was | Now |
| --- | --- |
| "The constraint." on each card | "What it has to get right." |
| "Challenge" as the case-study heading | "What it has to get right" — the same label for the same field, which it was not before |
| "I start from the constraint, not the stack." | "I start from what a system has to guarantee, not from the stack." |
| "Start with the constraint." | "Start a conversation." — the same words as the hero button that scrolls there, so the label and its destination agree |
| "Time zones are not a constraint." | "Time zones are not an issue." — closer to the owner's own answer |
| "The product, the constraint, and what success looks like." | "The product, what is breaking or missing, and what success looks like." |

The unreferenced `#challenge` anchor became `#requirement` to match its heading.

**A second tic surfaced only by measuring.** `scripts`-level greps conflate copy with identifiers, so `.taste-skill/probe-tics.mjs` now counts words in `main.innerText` on the rendered page, which is the only count that describes reading. It found "built" at 25 occurrences in 548 content words on `/solutions` — because `capability` is 27 of the 33 evidence items, so the badge printed "BUILT" twenty times down the page.

Fixed by inverting the rule: **a badge marks an exception, and its absence is the default.** `evidenceBadge` returns `null` for `capability`, and each page states once that an unlabelled line is an implementation fact. The case-study key prints a "No label" row for it, sorted last. Badge counts on `/solutions` fell from 20 to 0 for the default kind, while the six items that genuinely need a label — one target, one demo, one test, three under NDA — now stand out instead of hiding in a wall of identical chips. "built" dropped from 25 to 6, and those six are prose.

Verified: zero "constraint" in the rendered text of `/`, `/solutions` and a case study. 48 combinations still show 0px horizontal overflow, one `h1` per route, and every first-viewport element inside the fold at all three real widths.

### Next

Phase 4, content and proof: `/about` reordered to lead with Dennis rather than the name etymology, the services pages rewritten to the voice rules beyond the banned-word removal already done, the `/writing` route and its first pieces, and the FAQ structured data either rendered as visible content or dropped. Real imagery can land whenever it is ready; it is a data edit, not a phase.

