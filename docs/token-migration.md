# Token migration table

Phase 2 replaces every literal colour in the pages with a semantic token. Use this table exactly, so files migrated by different people end up identical.

## The principle that removes most of the work

The tokens already define both modes. `.dark` in `src/app/styles/tokens.css` re-specifies every colour, so **a `dark:` variant that exists only to flip a literal colour must be deleted, not translated.**

```diff
- className="bg-[#FCF7F2] text-slate-900 dark:bg-[#0a0a0a] dark:text-[#FCF7F2]"
+ className="bg-background text-foreground"
```

Keep a `dark:` variant only when it expresses a genuinely different *decision* in dark mode, not a different value for the same decision. The one legitimate example in this codebase is the accent: it may be a stroke or text in dark mode but never in light, so `dark:text-accent` and `dark:border-accent` stay.

## Mapping

### Page and surface backgrounds

| Literal | Token |
| --- | --- |
| `bg-[#FCF7F2]`, `bg-[#fcf7f2]` | `bg-background` |
| `bg-white` | `bg-surface` |
| `bg-zinc-50`, `bg-zinc-100`, `bg-[#f5f5f5]` | `bg-surface-alt` |
| `dark:bg-[#0a0a0a]`, `dark:bg-[#111]`, `dark:bg-black` | delete |
| `dark:bg-[#1a1a1a]`, `dark:bg-[#151917]` | delete |
| `dark:bg-[#1f2522]`, `dark:bg-[#1d2220]` (hover tints) | delete, keep the light `hover:bg-section-stone` |

### Text

| Literal | Token |
| --- | --- |
| `text-slate-900`, `text-black`, `text-[#0f172a]` | `text-foreground` |
| `text-zinc-700`, `text-zinc-600`, `text-zinc-500` | `text-muted-foreground` |
| `text-zinc-400`, `text-[#555555]`, `text-[#888888]` | `text-ink-subtle` |
| `text-white`, `text-[#FCF7F2]` on a dark fill | `text-on-primary` if it sits on `bg-primary`, else `text-foreground` |
| `dark:text-*` that only flips the above | delete |
| `text-red-500`, `text-red-600` | `text-destructive` |

### Borders and rules

| Literal | Token |
| --- | --- |
| `border-zinc-200`, `border-zinc-300`, `border-[#e4e4e7]` | `border-border` |
| `border-zinc-700`, `dark:border-[#1a1a1a]`, `dark:border-[#2a2a2a]` | delete |
| An input or control boundary | `border-line-strong` |

### Action colours

| Literal | Token |
| --- | --- |
| `hover:bg-[#1b2d2a]`, `hover:bg-[#1a2e29]` | `hover:bg-primary-hover` |
| `bg-[#253c38]`, `bg-[#253C38]` | `bg-primary` |
| `text-[#253c38]` | `text-primary` |

### Placeholders

| Literal | Token |
| --- | --- |
| `placeholder-zinc-400`, `placeholder:text-zinc-400` | `placeholder:text-ink-subtle` |
| `dark:placeholder-[#555555]` | delete |

## Token names available

Colour: `canvas surface surface-alt ink ink-muted ink-subtle line line-strong primary primary-hover on-primary primary-tint on-primary-tint link focus accent on-accent danger danger-tint on-danger-tint success-tint on-success-tint`

Compatibility aliases, also valid: `background foreground muted-foreground border input ring primary-foreground destructive card section-stone`

Type: `text-hero text-display text-headline text-title text-subtitle text-quote text-body text-body-sm text-label text-caption text-code`

Shape: `rounded-control rounded-card rounded-chip`. Elevation: `shadow-raised shadow-floating`. Families: `font-primary font-secondary font-mono`.

## Rules

- Do not change layout, spacing, copy, structure or behaviour. Colour and font only.
- Do not introduce a new literal colour. If nothing fits, stop and say which token is missing.
- Keep every `aria-*`, `id`, `href` and handler exactly as it is.
- Spacing stays as it is in this phase, even where it is off the 4-point grid. Spacing is Phase 3.

## Two files are deliberately excluded

`src/app/opengraph-image.tsx` and `src/app/components/ConsoleEasterEgg.tsx` cannot use CSS variables: one renders at the edge with inline styles and no stylesheet, the other styles `console.log` output. They keep literal hex, updated by hand to the new palette.

## Verify after changing a file

```bash
npx tsc --noEmit          # must print nothing
npx eslint src            # must print nothing
npm run build             # runs the contrast gate first, then builds
```

Then look at your pages at 1440px in both modes. A page whose background no longer matches the home page's canvas means a literal was missed.
