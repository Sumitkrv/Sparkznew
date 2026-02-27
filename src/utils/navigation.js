// Utility function to smooth scroll to sections
// Accepts an optional Lenis instance for buttery smooth scrolling
export const scrollToSection = (sectionId, offset = 80, lenis = null) => {
  const element = document.getElementById(sectionId);
  if (element) {
    if (lenis) {
      lenis.scrollTo(element, { offset: -offset });
    } else {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
};

// Navigation handler for section links with cross-page support
export const handleSectionClick = (e, sectionId, offset = 80, navigate = null, lenis = null) => {
  e.preventDefault();
  
  // Check if we're already on the home page
  const isOnHomePage = window.location.pathname === '/';
  
  if (isOnHomePage) {
    // We're on home page, just scroll to section
    scrollToSection(sectionId, offset, lenis);
  } else {
    // We're on a different page, need to navigate to home first
    if (navigate) {
      // Use React Router navigate
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSection(sectionId, offset, lenis);
      }, 100);
    } else {
      // Fallback: redirect to home with hash
      window.location.href = `/#${sectionId}`;
    }
  }
};

// Scroll to top — uses Lenis if available, falls back to window.scrollTo
export const scrollToTop = (lenis = null, immediate = false) => {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'instant' : 'smooth' });
  }
};

// Handle hash-based navigation on page load
export const handleHashNavigation = (lenis = null) => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    // Longer delay to ensure page is fully loaded and rendered
    setTimeout(() => {
      scrollToSection(hash, 80, lenis);
    }, 300);
  } else {
    // No hash, ensure we're at the top of the page
    scrollToTop(lenis, true);
  }
};