# cdenn.dev

Personal portfolio and service site for Dennis Ndung'u (CDenn), a full-stack
developer based in Nairobi, Kenya. It presents case studies of shipped work,
three service pages, an about page, and contact forms that deliver submissions
by email. There is no database and no analytics: the only persisted data is
whatever a visitor chooses to send through a form, which is forwarded straight
to an inbox.

## Stack

Versions below are the ones currently installed, not just the ranges declared
in `package.json`.

| Package | Declared | Installed |
| --- | --- | --- |
| next | `16.1.4` | 16.1.4 |
| react | `19.2.3` | 19.2.3 |
| react-dom | `19.2.3` | 19.2.3 |
| typescript | `^5` | 5.9.3 |
| tailwindcss | `^4` | 4.1.18 |
| @tailwindcss/postcss | `^4` | 4.1.18 |
| eslint | `^9` | 9.39.2 |
| eslint-config-next | `16.1.4` | 16.1.4 |
| lucide-react | `^0.563.0` | 0.563.0 |
| motion | `^12.29.0` | 12.29.0 |
| next-themes | `^0.4.6` | 0.4.6 |
| react-social-icons | `^6.25.0` | 6.25.0 |
| resend | `^6.11.0` | 6.11.0 |

Other details worth knowing:

- Next.js **App Router**, with all application code under `src/app`.
- Typography is **Inter**, loaded through `next/font/google` in
  `src/app/layout.tsx`. (The template this repo started from used Geist; it is
  no longer in the project.)
- Light/dark theming is handled by `next-themes` via
  `src/app/providers/ThemeProvider.tsx`. The theme is applied in a pre-paint
  script so nothing flashes on first load.
- Transactional email goes through **Resend**, wrapped by the shared helpers in
  `src/app/lib/email.ts`.
- TypeScript is `strict`, and the `@/*` path alias resolves from the repository
  root — so imports look like `@/src/app/data/portfolio`.

## Running it

Requires Node.js 20 or newer (developed on 24.15.0).

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build     # production build
npm start         # serve the production build
npm run lint      # eslint
npx tsc --noEmit  # type check
```

### Open question: which package manager?

Both `package-lock.json` and `pnpm-lock.yaml` are committed, so the intended
package manager is ambiguous and the two lockfiles can drift apart. Neither has
been deleted yet, because picking one is a decision for the repository owner.
Until that is settled, use whichever lockfile matches your tooling and avoid
regenerating the other one in a commit.

## Environment variables

See `.env.example` for the full list with per-variable notes. In short:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes, for forms | Resend API key used to send form email |
| `CONTACT_EMAIL` | yes, for forms | Inbox that form submissions are delivered to |
| `CONTACT_FROM_EMAIL` | no | Verified sender address; falls back to Resend's shared test sender |
| `NEXT_PUBLIC_BOOKING_URL` | no | Public booking link on the contact section; hidden when unset |

The first three are server-only and must not be prefixed with
`NEXT_PUBLIC_`. If `RESEND_API_KEY` or `CONTACT_EMAIL` is missing, the form
routes respond with a 503 and log which variable is absent, rather than
crashing the page.

Note that `.gitignore` currently ignores `.env*`, which also catches
`.env.example`. Add a `!.env.example` negation if the example file should be
tracked.

## Routes

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/app/page.tsx` → `PortfolioClient.tsx` | Single-page homepage: hero, about, solutions, contact. Structured data (Person, Organization, WebSite, FAQ) is emitted here. |
| `/about` | `src/app/about/page.tsx` | Long-form brand and background page |
| `/solutions` | `src/app/solutions/page.tsx` | Case-study index |
| `/solutions/[slug]` | `src/app/solutions/[slug]/page.tsx` | Case-study detail, statically generated from the `solutions` data via `generateStaticParams` |
| `/services` | `src/app/services/page.tsx` | Services overview |
| `/services/multi-tenant-saas` | `src/app/services/multi-tenant-saas/page.tsx` | Service detail |
| `/services/fintech-automation` | `src/app/services/fintech-automation/page.tsx` | Service detail |
| `/services/offline-first-apps` | `src/app/services/offline-first-apps/page.tsx` | Service detail |
| `/writing` | `src/app/writing/page.tsx` | Topics in progress; no published articles yet |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy policy plus a privacy-request form |
| `404` | `src/app/not-found.tsx` | Not-found page |

Generated routes:

| Route | File |
| --- | --- |
| `/sitemap.xml` | `src/app/sitemap.ts` |
| `/robots.txt` | `src/app/robots.ts` |
| `/opengraph-image` | `src/app/opengraph-image.tsx` |

API routes, all `POST`-only and all sending mail through
`src/app/lib/email.ts`:

| Route | File |
| --- | --- |
| `/api/contact` | `src/app/api/contact/route.ts` |
| `/api/privacy` | `src/app/api/privacy/route.ts` |
| `/api/request-cv` | `src/app/api/request-cv/route.ts` |

## Where the content lives

All editable content is plain TypeScript data, not a CMS:

- `src/app/data/portfolio.ts` — the `solutions` array (every case study, and the
  source for `/solutions/[slug]`) and the `experiences` array rendered by the
  about section.
- `src/app/data/social.ts` — social profile links and the `sameAs` list used by
  the structured data.
- `src/app/data/contact-options.ts` — the contact form's project-type and budget
  choices. This is the single source of truth: the client renders `label` and
  the API route validates `value`, so both sides must change together.
- `src/app/types/index.ts` — the shared types those data files are checked
  against.
- `src/app/writing/page.tsx` and `src/app/privacy/page.tsx` hold their own copy
  inline, since neither is reused anywhere else.

When adding a route, add it to `src/app/sitemap.ts` too. Solution detail pages
are derived from the `solutions` array and need no sitemap edit.

## Content rules

Two conventions in the data are deliberate and worth preserving:

- Only set `nda: true` on a solution whose code genuinely cannot be shared. A
  project that merely lacks a screenshot gets a neutral placeholder, so the site
  never claims a confidentiality restriction that does not exist.
- Do not add metrics, testimonials, or article listings that are not real. A
  previous version of this repo shipped placeholder testimonials and invented
  statistics; they have been removed.

## Deployment

Deployed on Vercel. The canonical host is `https://www.cdenn.dev` — the naked
domain redirects there, and `src/app/sitemap.ts` and the metadata
`metadataBase` both use the `www` form so no sitemap entry is a redirect URL.
Set the environment variables above in the Vercel project before deploying, or
the forms will return 503 in production.
