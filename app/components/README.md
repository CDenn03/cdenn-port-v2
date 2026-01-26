# Components Structure

This directory contains all the React components organized by their purpose:

## 📁 Structure

```
components/
├── ui/                    # Reusable UI components
│   ├── Reveal.tsx        # Animation wrapper component
│   ├── ScrollProgress.tsx # Progress bar component
│   ├── BackToTop.tsx     # Back to top button
│   ├── BackgroundAmbience.tsx # Background gradient effects
│   └── GlobalStyles.tsx  # Dynamic global styles
├── layout/               # Layout components
│   ├── Navbar.tsx        # Navigation header
│   └── Footer.tsx        # Site footer
├── sections/             # Page sections
│   ├── HeroSection.tsx   # Hero/landing section
│   ├── StatsSection.tsx  # Statistics display
│   ├── AboutSection.tsx  # About me section
│   ├── ExperienceSection.tsx # Work experience timeline
│   ├── SolutionsSection.tsx  # Featured projects
│   ├── TestimonialsSection.tsx # Client testimonials
│   ├── WritingSection.tsx     # Blog articles
│   └── ContactSection.tsx     # Contact form
└── index.ts              # Barrel exports
```

## 🎯 Key Features

- **Next.js Image Optimization**: All images use `next/image` for optimal performance
- **TypeScript Support**: Full type safety with custom interfaces
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animation**: Smooth animations with Framer Motion
- **Theme Support**: Dark/light mode with system preference detection
- **Accessibility**: ARIA labels and semantic HTML

## 🚀 Usage

Import components using the barrel export:

```tsx
import { HeroSection, Navbar, Reveal } from '@/app/components';
```

Or import directly:

```tsx
import { HeroSection } from '@/app/components/sections/HeroSection';
```

## 📱 Responsive Breakpoints

- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🎨 Theme System

Components receive `isDark` prop for theme-aware styling:

```tsx
<Component isDark={theme === "dark"} />
```