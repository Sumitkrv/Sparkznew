import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const InfiniteGallery = React.memo(({
  images = [],
  className = "",
  fadeSettings = {
    fadeIn: { start: 0.1, end: 0.3 },
    fadeOut: { start: 0.7, end: 0.9 }
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.15 },
    blurOut: { start: 0.85, end: 1.0 },
    maxBlur: 5.0
  },
  speed = 30
}) => {
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || images.length === 0 || isMobile) return;

    let lastTime = performance.now();
    let rafId;

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      positionRef.current += speed * deltaTime;

      const containerWidth = container.scrollWidth / 2;

      if (positionRef.current >= containerWidth) {
        positionRef.current -= containerWidth;
      }

      container.style.transform = `translateX(-${positionRef.current}px)`;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [images, speed, isMobile]);

  if (images.length === 0) {
    return <div className={className}>No images to display</div>;
  }

  const normalizedImages = images.map((img) =>
    typeof img === 'string' ? { src: img, alt: '' } : img
  );

  const duplicatedImages = [...normalizedImages, ...normalizedImages];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={scrollContainerRef}
        className="flex gap-6 absolute left-0 top-0 h-full"
        style={{ willChange: isMobile ? "auto" : "transform" }}
      >
        {duplicatedImages.map((image, index) => (
          <motion.div
            key={`${image.src}-${index}`}
            className="relative flex-shrink-0 h-full"
            style={{ width: "400px" }}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image.src}
              alt={image.alt || `Gallery image ${(index % normalizedImages.length) + 1}`}
              className="w-full h-full object-cover rounded-xl shadow-lg"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
});

InfiniteGallery.displayName = 'InfiniteGallery';

export default InfiniteGallery;
