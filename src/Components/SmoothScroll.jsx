import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

const SmoothScrollContext = createContext(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Respect accessibility preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Guard against double init in React 18 StrictMode
    if (lenisRef.current) {
      lenisRef.current.destroy();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Single RAF loop — no duplicates
    function raf(time) {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

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
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
