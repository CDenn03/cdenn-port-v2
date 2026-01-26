# Image Configuration Guide

## 🖼️ Next.js Image Optimization

This project uses Next.js `Image` component for optimal performance and loading. External image hostnames must be configured in `next.config.ts`.

## ⚙️ Current Configuration

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
```

## 🎯 Configured Hostnames

- **picsum.photos** - Lorem Picsum placeholder images
- **images.unsplash.com** - Unsplash images
- **via.placeholder.com** - Placeholder.com images

## 🔧 Adding New External Image Sources

To add a new external image hostname:

1. Update `next.config.ts`:
```typescript
{
  protocol: 'https',
  hostname: 'your-image-host.com',
  port: '',
  pathname: '/**',
}
```

2. Restart the development server after config changes

## 🛠️ Components

### Standard Next.js Image
```tsx
import Image from "next/image";

<Image
  src="https://picsum.photos/800/600"
  alt="Description"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 60vw"
/>
```

### OptimizedImage Component (with error handling)
```tsx
import { OptimizedImage } from "@/app/components/ui/OptimizedImage";

<OptimizedImage
  src="https://picsum.photos/800/600"
  alt="Description"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 60vw"
  fallbackSrc="/assets/images/placeholder.png"
/>
```

## 📱 Responsive Images

Use the `sizes` prop for responsive images:

```tsx
// For full-width on mobile, 60% on desktop
sizes="(max-width: 768px) 100vw, 60vw"

// For half-width on mobile, 50% on desktop
sizes="(max-width: 768px) 50vw, 50vw"
```

## 🚀 Performance Tips

1. **Use `priority`** for above-the-fold images
2. **Set proper `sizes`** for responsive images
3. **Use `fill`** for container-sized images
4. **Provide `width` and `height`** for fixed-size images

## 🔍 Troubleshooting

### Error: "hostname not configured"
- Add the hostname to `remotePatterns` in `next.config.ts`
- Restart the development server

### Images not loading
- Check network connectivity
- Verify the image URL is accessible
- Use `OptimizedImage` component for better error handling

### Slow loading
- Optimize image sizes at the source
- Use appropriate `sizes` prop
- Consider using `priority` for important images