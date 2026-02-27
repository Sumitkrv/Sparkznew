import { createContext, useContext, useEffect } from "react";

const SmoothScrollContext = createContext(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

// Native smooth scroll API
const scrollAPI = {
  scrollTo(target, options = {}) {
    const { offset = 0, immediate = false } = options;

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

    window.scrollTo({
      top: targetY,
      behavior: immediate ? 'auto' : 'smooth'
    });
  }
};

// Global anchor link handler - call this once in your app
export function useAnchorLinks() {
  useEffect(() => {
    function handleAnchorClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        scrollAPI.scrollTo(target, { offset: -80 });
      }
    }
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);
}

export default function SmoothScroll({ children }) {
  useAnchorLinks();
  return (
    <SmoothScrollContext.Provider value={scrollAPI}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
