# Design System Implementation

## Color System

### Primary Color - Emerald
- **HEX:** `#253C38`
- **RGB:** `37, 60, 56`
- **Usage:** Logo, primary UI, headings
- **CSS Variable:** `--primary`
- **Utility Classes:** `.text-emerald`, `.bg-emerald`

### Secondary Color - Off-White
- **HEX:** `#FCF7F2`
- **RGB:** `252, 247, 242`
- **Usage:** Backgrounds, negative space
- **CSS Variable:** `--secondary`
- **Utility Classes:** `.text-off-white`, `.bg-off-white`

### Accent Color - Muted Gold
- **HEX:** `#C2A46D`
- **Usage:** Minimal highlights only (≤5%)
- **CSS Variable:** `--accent`
- **Utility Classes:** `.accent-gold`, `.bg-accent-gold`, `.border-accent-gold`

### Color Combinations (Approved)
1. Emerald logo on Off-White background
2. Off-White logo on Emerald background
3. Black logo on Off-White (fallback)
4. White logo on black (fallback)

### Accessibility
✅ Emerald (#253C38) on Off-White (#FCF7F2) passes WCAG AA/AAA for text

## Typography

### Primary Typeface
- **Font:** Inter (free alternative to Satoshi)
- **Weights Available:** 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)

### Font Usage

#### Headlines
- **Weight:** 600-700 (Medium to Bold)
- **Tracking:** -1% to -2% (`letter-spacing: -0.01em` to `-0.02em`)
- **Case:** Sentence case or ALL CAPS (for labels only)
- **Line Height:** 1.2

#### Body Text
- **Weight:** 400 (Regular)
- **Line Height:** 1.6 (1.5-1.7 range)
- **Max Width:** 70ch (65-75 characters)

#### UI / Labels
- **Weight:** 500 (Medium)
- **Letter Spacing:** +1% (`letter-spacing: 0.01em`)
- **Class:** `.ui-label` or `.label-caps` for uppercase

### CSS Classes

```css
/* Headlines */
h1 { font-weight: 700; letter-spacing: -0.02em; }
h2 { font-weight: 600; letter-spacing: -0.015em; }
h3, h4 { font-weight: 600; letter-spacing: -0.01em; }

/* Body */
p { max-width: 70ch; line-height: 1.6; }

/* UI Labels */
.ui-label { font-weight: 500; letter-spacing: 0.01em; }
.label-caps { text-transform: uppercase; font-weight: 500; letter-spacing: 0.05em; }
```

## Spacing & Layout

### Grid System
- **Base Grid:** 8px system
- **Utility Classes:** `.space-1` (8px), `.space-2` (16px), `.space-3` (24px), etc.
- Layouts align to consistent vertical rhythm

### Logo Clear Space
- **Minimum:** Width of inner "C" stroke
- **Recommended:** 2× minimum for premium feel

## Theme Implementation

### Light Mode
- Background: Off-White (#FCF7F2)
- Foreground: Emerald (#253C38)
- Focus Ring: Emerald

### Dark Mode
- Background: Emerald (#253C38)
- Foreground: Off-White (#FCF7F2)
- Focus Ring: Off-White

## Usage Examples

### Headings (High Contrast)
```tsx
<h1 className="text-4xl font-bold text-brand-emerald dark:text-brand-off-white">
  Main Headline
</h1>
<h2 className="text-3xl font-semibold text-brand-emerald dark:text-brand-off-white">
  Section Title
</h2>
```

### Body Text (Optimized Readability)
```tsx
<p className="text-base leading-relaxed max-w-prose text-zinc-700 dark:text-zinc-300">
  Body content with optimal readability and proper contrast...
</p>
```

### Secondary Text
```tsx
<span className="text-sm text-zinc-600 dark:text-zinc-400">
  Metadata or helper text
</span>
```

### UI Labels
```tsx
<label className="ui-label text-zinc-700 dark:text-zinc-300">Form Label</label>
<span className="label-caps text-zinc-600 dark:text-zinc-400">Category</span>
```

### Buttons & Interactive Elements
```tsx
{/* Primary button - Emerald background */}
<button className="bg-primary text-primary-foreground">
  Start a Project
</button>

{/* Link with hover */}
<a className="text-zinc-700 hover:text-primary dark:text-zinc-300 dark:hover:text-primary-foreground">
  Learn More
</a>
```

### Accent Usage (≤5%)
```tsx
<span className="accent-gold">★ Featured</span>
<div className="border-l-4 border-accent-gold">Highlighted content</div>
```

### Color Combinations
```tsx
{/* Card with proper contrast */}
<div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
  <h3 className="text-brand-emerald dark:text-brand-off-white">Title</h3>
  <p className="text-zinc-700 dark:text-zinc-300">Description</p>
</div>

{/* Primary button */}
<button className="bg-primary text-primary-foreground">Action</button>
```

## Contrast Ratios (WCAG Compliance)

### Light Mode
- Emerald on Off-White: **8.5:1** ✅ AAA (headings, buttons)
- Zinc-700 on Off-White: **9.2:1** ✅ AAA (body text)
- Zinc-600 on Off-White: **6.8:1** ✅ AA (secondary text)

### Dark Mode
- Off-White on Emerald: **8.5:1** ✅ AAA (all text)
- Zinc-300 on Emerald: **5.2:1** ✅ AA (body text)

## Color Usage Rules

1. **Headings:** Always use Emerald in light mode, Off-White in dark mode
2. **Body Text:** Use Zinc-700 (light) / Zinc-300 (dark) for readability
3. **Interactive Elements:** Emerald background with Off-White text
4. **Hover States:** Transition to primary color
5. **Accent Gold:** Maximum 5% of design elements

## Notes
- Keep geometric precision in typography
- Maintain strong contrast in all UI contexts
- Use accent color sparingly (≤5% of design)
- Follow 8px grid system for consistent spacing
- Ensure WCAG AA/AAA compliance for all text
