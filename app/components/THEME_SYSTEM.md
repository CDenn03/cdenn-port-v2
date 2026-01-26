# Theme System with next-themes

This project uses `next-themes` for robust dark/light mode support with CSS-based configuration instead of a Tailwind config file.

## 🎨 Features

- **CSS-Based Configuration**: Uses `@theme inline` and CSS custom properties
- **System Preference Detection**: Automatically detects user's system theme preference
- **Persistent Storage**: Theme choice is saved in localStorage
- **No Hydration Mismatch**: Proper SSR handling prevents layout shifts
- **Smooth Transitions**: CSS transitions for theme changes
- **Custom Variant**: Uses `@custom-variant dark (&:is(.dark *))` for dark mode

## 🔧 Implementation

### 1. CSS Configuration

```css
/* app/globals.css */
@import "tailwindcss";
@import "tailwindcss/utilities";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  /* ... other theme variables */
}

:root {
  --primary: #10b981; /* emerald-500 */
  --background: #fafafa; /* zinc-50 */
  --foreground: #0f172a; /* slate-900 */
  /* ... light theme variables */
}

.dark {
  --primary: #10b981; /* consistent emerald-500 */
  --background: #09090b; /* zinc-950 */
  --foreground: #fafafa; /* zinc-50 */
  /* ... dark theme variables */
}
```

### 2. ThemeProvider Setup

```tsx
// app/layout.tsx
import { ThemeProvider } from "./providers/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 3. Custom Hook

```tsx
// app/hooks/useTheme.ts
import { useTheme as useNextTheme } from "next-themes";

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return {
    theme,
    resolvedTheme,
    toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
    mounted
  };
};
```

### 4. Theme Toggle Component

```tsx
// app/components/ui/ThemeToggle.tsx
export const ThemeToggle = () => {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();
  
  if (!mounted) return <div />; // Prevent hydration mismatch
  
  return (
    <button onClick={toggleTheme}>
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};
```

## 🎯 Usage in Components

### Method 1: Using Tailwind Classes (Recommended)
```tsx
export const MyComponent = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100">
      Content automatically adapts to theme
    </div>
  );
};
```

### Method 2: Using CSS Custom Properties
```tsx
export const MyComponent = () => {
  return (
    <div className="bg-background text-foreground border-border">
      Uses CSS custom properties that change with theme
    </div>
  );
};
```

### Method 3: Using the Hook (for dynamic styling)
```tsx
import { useTheme } from "@/app/hooks/useTheme";

export const MyComponent = () => {
  const { resolvedTheme, mounted } = useTheme();
  
  if (!mounted) return null;
  
  const isDark = resolvedTheme === "dark";
  
  return (
    <div className={isDark ? "bg-zinc-900" : "bg-white"}>
      Content
    </div>
  );
};
```

## 🚀 Benefits of CSS-Based Configuration

1. **No Config File**: Everything is defined in CSS using `@theme inline`
2. **CSS Custom Properties**: Seamless theme switching with CSS variables
3. **Better Performance**: No JavaScript required for theme application
4. **Flexible**: Easy to add new theme variables and utilities
5. **Standards Compliant**: Uses modern CSS features like `@custom-variant`

## 🎨 Color Scheme

### Light Theme
- Background: `#fafafa` (zinc-50)
- Foreground: `#0f172a` (slate-900)
- Primary: `#10b981` (emerald-500)

### Dark Theme
- Background: `#09090b` (zinc-950)
- Foreground: `#fafafa` (zinc-50)
- Primary: `#10b981` (emerald-500)

## 📱 Theme Options

- `light`: Force light mode
- `dark`: Force dark mode  
- `system`: Follow system preference (default)

The theme automatically updates when the user changes their system preference, and all CSS custom properties update accordingly.