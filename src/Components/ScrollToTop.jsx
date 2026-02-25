import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Don't scroll to top if there's a hash (section link)
    if (hash) {
      return;
    }

    // Force scroll to top immediately and aggressively
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Multiple attempts to ensure scroll happens
    const scrollAttempts = [0, 10, 50, 100];
    const timeouts = scrollAttempts.map(delay => 
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, delay)
    );

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;