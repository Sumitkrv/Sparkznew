import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from './SmoothScroll.jsx';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const lenis = useSmoothScroll();

  useEffect(() => {
    // Don't scroll to top if there's a hash (section link)
    if (hash) return;

    if (lenis) {
      // Use Lenis for instant scroll to top (no animation on route change)
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback for when Lenis isn't ready yet
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, lenis]);

  return null;
};

export default ScrollToTop;