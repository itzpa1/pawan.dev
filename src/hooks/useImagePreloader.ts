"use client";
import { useEffect, useState, useRef } from "react";

// Global cache to track loaded images across component unmounts/remounts
const globalImageCache = new Set<string>();

export const useImagePreloader = (images: string[]) => {
  // Check if all images are already in cache to initialize state correctly
  const allImagesCached = images.every((src) => globalImageCache.has(src));
  const [imagesPreloaded, setImagesPreloaded] = useState(allImagesCached);
  const previousImagesRef = useRef<string[]>([]);

  useEffect(() => {
    // Avoid re-running if images array hasn't deeply changed
    if (
      previousImagesRef.current.length === images.length &&
      previousImagesRef.current.every((img, index) => img === images[index])
    ) {
      return;
    }
    previousImagesRef.current = images;

    if (images.length === 0) {
      setImagesPreloaded(true);
      return;
    }

    let isMounted = true;

    const preloadImages = async () => {
      const promises = images.map((src) => {
        // Validation for src
        if (!src) return Promise.resolve();

        // If already cached, resolve immediately
        if (globalImageCache.has(src)) {
          return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          // Important: Set these before setting src in some browsers, but mostly ok here.
          // Ensuring we cache even on error to avoid infinite retry loops affecting UX
          img.onload = () => {
            globalImageCache.add(src);
            resolve();
          };
          img.onerror = () => {
            // Mark as "handled" even if failed so we don't block
            globalImageCache.add(src);
            resolve();
          };
        });
      });

      await Promise.all(promises);

      if (isMounted) {
        setImagesPreloaded(true);
      }
    };

    // If already cached, allow immediate state update (though state init handled it, effective for updates)
    if (images.every((src) => globalImageCache.has(src))) {
      setImagesPreloaded(true);
    } else {
      setImagesPreloaded(false);
      preloadImages();
    }

    return () => {
      isMounted = false;
    };
  }, [images]);

  return { imagesPreloaded };
};
