"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  fallbackSrc?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  fill = false,
  className = "",
  sizes,
  priority = false,
  width,
  height,
  fallbackSrc = "/assets/images/placeholder.png"
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setImgSrc(fallbackSrc);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
      )}
      
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${fill ? "object-cover" : ""}`}
        sizes={sizes}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
      />
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm">
          Image unavailable
        </div>
      )}
    </div>
  );
};