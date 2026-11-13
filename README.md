# cdenn.dev

Portfolio site for Dennis Ndung'u, a Frontend Engineer in Nairobi, Kenya, and
CDenn, the personal brand his independent work runs under. CDenn is a brand,
not a registered company, and the site and its structured data say so.

The site presents three systems in depth, a wider archive of case studies,
three service pages, an about page, and contact forms that deliver by email.
There is no database and no analytics: the only data kept is whatever a visitor
sends through a form, which goes straight to an inbox.

Live at [www.cdenn.dev](https://www.cdenn.dev).

## Stack

- Next.js 16 (App Router) and React 19, with all application code under
  `src/app`
- TypeScript in `strict` mode. The `@/*` alias resolves from the repository
  root, so imports look like `@/src/app/data/portfolio`.
- Tailwind CSS 4 over a token system in `src/app/styles/tokens.css`
- `next-themes` for light and dark mode, applied before paint so nothing
  flashes on first load
- `motion` for scroll reveals, which respect reduced-motion settings
- Resend for form email, wrapped by `src/app/lib/email.ts`
- Fonts in `src/app/fonts.ts`: Mona Sans (structure), Newsreader (pull quotes
  and case-study story paragraphs), Geist Mono (code and tags). All are SIL OFL
  and self-hosted by `next/font`.

## Running it

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run build` | Runs both checks below, then `next build` |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check:contrast` | Fails if any token text or boundary pair drops below WCAG 2.2 AA (4.5:1 text, 3:1 boundaries) |
| `npm run check:status` | Warns when the availability date in `src/app/data/status.ts` is stale; fails only if the date is missing or malformed |

Both `package-lock.json` and `pnpm-lock.yaml` are committed. Use whichever
matches your tooling and avoid regenerating the other in a commit.

## Environment variables

See `.env.example` for per-variable notes.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes, for forms | Resend API key used to send form email |
| `CONTACT_EMAIL` | yes, for forms | Inbox that submissions are delivered to |
| `CONTACT_FROM_EMAIL` | no | Verified sender; falls back to Resend's shared test sender |
| `NEXT_PUBLIC_BOOKING_URL` | no | Booking link in the contact section; hidden when unset |

The first three are server-only and must not take the `NEXT_PUBLIC_` prefix.
If `RESEND_API_KEY` or `CONTACT_EMAIL` is missing, the form routes return 503
and log which variable is absent instead of crashing the page.

## The homepage

`src/app/page.tsx` composes the sections in order and emits the structured
data (Person, Brand, WebSite, FAQ):

1. `HeroSection`: identity line, headline, deck, stack, dated availability,
   actions, and a "Selected proof" list of the featured projects
2. `AtAGlance`: six facts and the scope sentence separating employer work,
   independent CDenn work and personal projects
3. `SolutionsSection`: the three featured systems, each with attribution, the
   problem, the value mapped, a "what was built / how it pays for itself" table
   and what it proves, followed by "Other work"
4. `AboutSection`: "How I work", "Where I'm most useful" and Experience
5. `ContactSection`: hiring and client-engagement copy, then the project brief
   form with an optional CV request
6. `Footer`

## Where the content lives

All content is plain TypeScript data, not a CMS:

| File | Holds |
| --- | --- |
| `src/app/data/profile.ts` | Name, brand, headline, deck, stack line, portrait |
| `src/app/data/status.ts` | The availability claim and the date it was last confirmed |
| `src/app/data/specialisms.ts` | The four focus areas: gap, response, evidence and link |
| `src/app/data/portfolio.ts` | `experiences` and the `solutions` array that drives every case study |
| `src/app/data/social.ts` | Social links and the structured-data `sameAs` list |
| `src/app/data/contact-options.ts` | Form choices; the client renders `label`, the API validates `value` |
| `src/app/types/index.ts` | The shared types the data is checked against |

Within `solutions`:

- `featured: true` puts a project on the homepage. Featured projects appear in
  array order, so reordering the array reorders the page.
- `home` holds the homepage write-up, kept separate from the long-form
  `story` / `challenge` / `solution` fields used on `/solutions/[slug]`.
- `attribution` states who the work was for, and appears on the case-study
  profile.
- Every `evidence` item has a `kind`: `capability`, `test`, `target`, `demo`,
  `confidential` or `measured`. Only exceptions get a visible badge; an
  unbadged line is an implementation fact. `measured` needs a `method`.

## Content rules

These are deliberate and worth keeping:

- **Attribute every project.** Employer client work, independent CDenn work
  and personal projects are labelled as such, and are never blurred together.
- **No unsupported figures.** A design goal is a `target`, not a result. A
  deployment on illustrative data is a `demo`. No invented metrics, testimonials
  or article listings.
- **`nda: true` only when the code genuinely cannot be shared.** A project that
  just lacks a screenshot gets a neutral placeholder instead.
- **Plain punctuation.** No em or en dashes in site copy; use hyphens.
- **No seniority labels** (junior, mid-level, senior) in titles or copy.

## Routes

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Homepage; see above |
| `/about` | `src/app/about/page.tsx` | Long-form background page |
| `/solutions` | `src/app/solutions/page.tsx` | Case-study index |
| `/solutions/[slug]` | `src/app/solutions/[slug]/page.tsx` | Case-study detail, statically generated from `solutions` |
| `/services` | `src/app/services/page.tsx` | Services overview |
| `/services/multi-tenant-saas` | `src/app/services/multi-tenant-saas/page.tsx` | Service detail |
| `/services/fintech-automation` | `src/app/services/fintech-automation/page.tsx` | Service detail |
| `/services/offline-first-apps` | `src/app/services/offline-first-apps/page.tsx` | Service detail |
| `/writing` | `src/app/writing/page.tsx` | Topics in progress; nothing published yet |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy policy and privacy-request form |
| `404` | `src/app/not-found.tsx` | Not-found page |

Generated: `/sitemap.xml` (`src/app/sitemap.ts`), `/robots.txt`
(`src/app/robots.ts`) and `/opengraph-image` (`src/app/opengraph-image.tsx`).

API routes, all `POST`-only and all sending mail through `src/app/lib/email.ts`:
`/api/contact`, `/api/privacy` and `/api/request-cv`, each in
`src/app/api/<name>/route.ts`.

When adding a route, add it to `src/app/sitemap.ts`. Case-study pages come from
`solutions` and need no sitemap edit.

## Deployment

Deployed on Vercel. The canonical host is `https://www.cdenn.dev`: the bare
domain redirects there, and the sitemap and `metadataBase` both use the `www`
form so no sitemap entry is a redirect. Set the environment variables above in
the Vercel project, or the forms return 503 in production.

After changing the site title, description or Open Graph image, run the URL
through [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) so
shared links and the LinkedIn Featured card pick up the new preview.
