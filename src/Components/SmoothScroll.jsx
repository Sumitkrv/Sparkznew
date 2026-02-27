import { createContext, useContext, useEffect, useRef, useState } from "react";

const SmoothScrollContext = createContext(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

// Lightweight smooth scroll helper — no external dependency
function createSmoothScroller() {
  const easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

  function scrollTo(target, options = {}) {
    const { offset = 0, duration = 1200, immediate = false } = options;

    let targetY = 0;
    if (typeof target === "number") {
      targetY = target;
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      if (!el) return;
      targetY = el.getBoundingClientRect().top + window.scrollY + offset;
    } else if (target instanceof HTMLElement) {
      targetY = target.getBoundingClientRect().top + window.scrollY + offset;
    }

    if (immediate) {
      window.scrollTo(0, targetY);
      return;
    }

    const startY = window.scrollY;
    const diff = targetY - startY;
    if (Math.abs(diff) < 1) return;

    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      window.scrollTo(0, startY + diff * easedProgress);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  return { scrollTo };
}

export default function SmoothScroll({ children }) {
  const [scroller, setScroller] = useState(null);

  useEffect(() => {
    // Enable CSS smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";

    const instance = createSmoothScroller();
    setScroller(instance);

    // Anchor link interception — smooth scroll to #hash targets
    function handleAnchorClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        instance.scrollTo(target, { offset: -80 });
      }
    }
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={scroller}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
