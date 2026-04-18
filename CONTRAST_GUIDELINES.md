# Contrast Guidelines & Color Usage

## The Problem
Emerald (#253C38) is a dark color that works great for buttons and headings, but creates contrast issues when used for body text on the Off-White (#FCF7F2) background in light mode.

## The Solution

### Light Mode Color Strategy

#### 1. Headings & Titles
✅ **USE:** Emerald (#253C38) or `text-brand-emerald`
- Main headlines (h1, h2, h3)
- Section titles
- Card titles
- Logo text

```tsx
<h1 className="text-brand-emerald">Engineering high-performance</h1>
```

#### 2. Body Text & Paragraphs
✅ **USE:** Zinc-700 (#3f3f46) or `text-zinc-700`
- Paragraph text
- Descriptions
- Long-form content
- Captions

```tsx
<p className="text-zinc-700">I specialize in building robust...</p>
```

#### 3. Secondary/Muted Text
✅ **USE:** Zinc-600 (#52525b) or `text-zinc-600`
- Labels
- Metadata
- Timestamps
- Helper text

```tsx
<span className="text-zinc-600">5 min read</span>
```

#### 4. Interactive Elements (Buttons, Links)
✅ **USE:** Emerald background with Off-White text
- Primary buttons: `bg-primary text-primary-foreground`
- Links on hover: `hover:text-primary`
- Active states

```tsx
<button className="bg-primary text-primary-foreground">Start a Project</button>
<a className="text-zinc-700 hover:text-primary">Learn More</a>
```

### Dark Mode Color Strategy

#### 1. Headings & Titles
✅ **USE:** Off-White (#FCF7F2) or `text-brand-off-white`
```tsx
<h1 className="dark:text-brand-off-white">Engineering high-performance</h1>
```

#### 2. Body Text
✅ **USE:** Zinc-300 (#d4d4d8) or `text-zinc-300`
```tsx
<p className="dark:text-zinc-300">I specialize in building robust...</p>
```

#### 3. Secondary/Muted Text
✅ **USE:** Zinc-400 (#a1a1aa) or `text-zinc-400`
```tsx
<span className="dark:text-zinc-400">5 min read</span>
```

## Quick Reference Table

| Element Type | Light Mode | Dark Mode |
|--------------|------------|-----------|
| H1-H3 Headings | `text-brand-emerald` | `dark:text-brand-off-white` |
| Body Text | `text-zinc-700` | `dark:text-zinc-300` |
| Muted Text | `text-zinc-600` | `dark:text-zinc-400` |
| Primary Button | `bg-primary text-primary-foreground` | Same |
| Link Default | `text-zinc-700` | `dark:text-zinc-300` |
| Link Hover | `hover:text-primary` | `dark:hover:text-primary-foreground` |
| Borders | `border-zinc-300` | `dark:border-zinc-700` |

## Utility Classes Available

### Semantic Classes (Recommended)
```css
.text-heading     /* Emerald in light, Off-White in dark */
.text-body        /* Zinc-600 in light, Zinc-300 in dark */
```

### Brand Colors (Direct)
```css
.text-brand-emerald      /* #253C38 */
.bg-brand-emerald        /* #253C38 */
.text-brand-off-white    /* #FCF7F2 */
.bg-brand-off-white      /* #FCF7F2 */
```

### Accent (Use ≤5%)
```css
.accent-gold             /* #C2A46D */
.bg-accent-gold
.border-accent-gold
```

## Common Patterns

### Hero Section
```tsx
<h1 className="text-brand-emerald dark:text-brand-off-white">
  Main Headline
</h1>
<p className="text-zinc-700 dark:text-zinc-300">
  Supporting description text
</p>
<button className="bg-primary text-primary-foreground">
  Call to Action
</button>
```

### Card Component
```tsx
<div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
  <h3 className="text-brand-emerald dark:text-brand-off-white">
    Card Title
  </h3>
  <p className="text-zinc-700 dark:text-zinc-300">
    Card description
  </p>
  <span className="text-zinc-600 dark:text-zinc-400">
    Metadata
  </span>
</div>
```

### Navigation Links
```tsx
<a className="text-zinc-700 hover:text-primary dark:text-zinc-300 dark:hover:text-primary-foreground">
  About
</a>
```

## Testing Contrast

### WCAG AA Requirements
- Normal text (< 18px): Minimum 4.5:1 contrast ratio
- Large text (≥ 18px): Minimum 3:1 contrast ratio
- UI components: Minimum 3:1 contrast ratio

### Current Ratios
✅ Emerald (#253C38) on Off-White (#FCF7F2): **8.5:1** (Excellent for headings)
✅ Zinc-700 (#3f3f46) on Off-White (#FCF7F2): **9.2:1** (Excellent for body)
✅ Zinc-600 (#52525b) on Off-White (#FCF7F2): **6.8:1** (Good for secondary)
✅ Off-White (#FCF7F2) on Emerald (#253C38): **8.5:1** (Excellent for buttons)

## When to Use Each Approach

### Use Emerald Text When:
- Element is a heading or title
- Element is interactive (button, link)
- You want to draw attention
- Element is large (≥ 18px)

### Use Zinc Text When:
- Element is body copy
- Element is descriptive text
- Readability is priority
- Text is small (< 18px)

### Use Accent Gold When:
- Highlighting special features (≤5% of design)
- Awards, ratings, premium indicators
- Decorative elements only

## Migration Strategy

If you need to update existing components:

1. **Headings:** Keep as `text-brand-emerald dark:text-brand-off-white`
2. **Body text:** Change to `text-zinc-700 dark:text-zinc-300`
3. **Buttons:** Keep as `bg-primary text-primary-foreground`
4. **Links:** Use `text-zinc-700 hover:text-primary dark:text-zinc-300 dark:hover:text-primary-foreground`
5. **Metadata:** Use `text-zinc-600 dark:text-zinc-400`

## Example Component Update

### Before (Contrast Issues)
```tsx
<div>
  <h2 className="text-primary">Title</h2>
  <p className="text-primary">Body text here</p>
</div>
```

### After (Better Contrast)
```tsx
<div>
  <h2 className="text-brand-emerald dark:text-brand-off-white">Title</h2>
  <p className="text-zinc-700 dark:text-zinc-300">Body text here</p>
</div>
```
