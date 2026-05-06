"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const NUM_FRAMES = 240;
const FRAME_DIGITS = 3;

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(FRAME_DIGITS, "0");
  return `/frames/ezgif-frame-${paddedIndex}.jpg`;
};

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll();
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, NUM_FRAMES]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= NUM_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      img.onerror = () => {
        console.error("Failed to load", img.src);
        // increment anyway so it doesn't get stuck forever
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImages(loadedImages);
  }, []);

  const renderFrame = useCallback((index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // The current image (1-indexed array mapping)
    const img = images[Math.min(NUM_FRAMES - 1, Math.max(0, index - 1))];
    if (img && img.complete) {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate object-fit: cover equivalent logic for canvas
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        // Image is wider than canvas
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        // Image is taller than canvas
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  }, [images]);

  // Render initial frame when images finish loading
  useEffect(() => {
    if (imagesLoaded === NUM_FRAMES) {
      renderFrame(1);
    }
  }, [imagesLoaded, renderFrame]);

  // Render on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    // latest is a float, we round to nearest frame
    const index = Math.round(latest);
    requestAnimationFrame(() => renderFrame(index));
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(Math.round(frameIndex.get()));
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing
    
    return () => window.removeEventListener("resize", handleResize);
  }, [images, renderFrame, frameIndex]);

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-primary-bg -z-10">
      {/* Loading state indicator - fades out when complete */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000 z-10"
        style={{ opacity: imagesLoaded === NUM_FRAMES ? 0 : 1, pointerEvents: "none" }}
      >
        <div className="text-white/40 font-medium tracking-widest text-sm uppercase">
          Loading Cinematic Sequence {Math.round((imagesLoaded / NUM_FRAMES) * 100)}%
        </div>
      </div>
      
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover"
      />
    </div>
  );
}
