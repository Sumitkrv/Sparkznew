import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, Sparkles, MessageCircle, Mail, Menu, Phone } from 'lucide-react';
import { scrollToSection, handleHashNavigation, scrollToTop } from '../utils/navigation.js';
import { useSmoothScroll } from './SmoothScroll.jsx';

const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [isFloatingNavHovered, setIsFloatingNavHovered] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useSmoothScroll();

  // Window resize detection
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setMobileOpenDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll detection with throttling for better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled(scrolled);
          
          const heroHeight = window.innerHeight * 0.8;
          const footer = document.querySelector('footer');
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY;
          
          // Show floating nav after hero, but hide when near footer
          let shouldShow = scrollTop > heroHeight;
          
          if (footer) {
            const footerTop = footer.getBoundingClientRect().top + scrollTop;
            const distanceToFooter = footerTop - scrollTop - windowHeight;
            
            // Hide when footer is within 200px of viewport
            if (distanceToFooter < 200) {
              shouldShow = false;
            }
          } else {
            // Fallback: hide when near bottom of page
            if (scrollTop + windowHeight > documentHeight - 300) {
              shouldShow = false;
            }
          }
          
          setShowFloatingNav(shouldShow);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation
  useEffect(() => {
    handleHashNavigation(lenis);
  }, [location.pathname, lenis]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setMobileOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Purple Color Palette
  const theme = {
    wisteria: "#E8D5FF",        // Lightest purple
    lavender: "#D4BDFF",
    orchid: "#C19EFF",
    mauve: "#AD85FF",
    amethyst: "#9A6FFF",
    plum: "#8659D9",
    aubergine: "#7343C0",
    violet: "#5E2FA8",
    midnightPurple: "#4A1F8F",  // Darkest purple
    headerGradient1: "#5B3A8F",
    headerGradient2: "#6B4FA0",
    headerGradient3: "#7B5FB5",
    metallicText: "#2C2C2C",
    lightText: "#FFFFFF"
  };

  const handleNavSectionClick = (e, sectionId) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // Already on home page, just scroll
      scrollToSection(sectionId, 80, lenis);
    } else {
      // Navigate to home first, then scroll
      navigate('/', { replace: false });
      setTimeout(() => {
        scrollToSection(sectionId, 80, lenis);
      }, 100);
    }
    
    // Close mobile menu
    if (windowWidth < 1024) {
      setIsMenuOpen(false);
      setMobileOpenDropdown(null);
    }
  };

  const handlePageClick = (e, path) => {
    e.preventDefault();
    
    // Close mobile menu
    setIsMenuOpen(false);
    setMobileOpenDropdown(null);
    
    // Always scroll to top first
    scrollToTop(lenis);
    
    // If already on the same page, just return after scrolling
    if (location.pathname === path) {
      return;
    }
    
    // Navigate to the page (ScrollToTop component will handle additional scrolling)
    navigate(path);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: '◉', isSection: false },
    { label: 'About', path: '/about', icon: '◈', isSection: false },
    { label: 'Portfolio', path: '/portfolio', icon: '◆', isSection: false },
    { label: 'Services', path: '/services', icon: '◎', isSection: false },
    { label: 'Contact', path: '/contact', icon: '◐', isSection: false }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav ref={menuRef} className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-gradient-to-b from-white/95 via-[#E8D5FF]/90 to-white/95 backdrop-blur-xl border-b border-[#D4BDFF] py-2 sm:py-2 md:py-3' 
          : 'bg-white/95 backdrop-blur-lg py-4 sm:py-4 md:py-5'
      }`} style={{ 
        fontFamily: "'Montserrat', sans-serif", 
        minHeight: windowWidth < 768 ? '80px' : 'auto',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none'
      }}>
        
        {/* Premium metallic overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-30"
          }`}
          style={{
            background: `linear-gradient(135deg, rgba(230, 230, 250, 0.1), rgba(216, 191, 216, 0.1), transparent)`
          }}
        />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between">
            {/* Premium Logo - No circle */}
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close mobile menu
                setIsMenuOpen(false);
                setMobileOpenDropdown(null);
                
                // Smooth scroll to top via Lenis
                scrollToTop(lenis);
                
                // If not on home page, navigate
                if (location.pathname !== '/') {
                  navigate('/');
                }
              }}
              className="group cursor-pointer interactive relative focus:outline-none"
            >
              <div className="flex items-center justify-center transition-all duration-300 group-hover:scale-105 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                <img 
                  src="/logo.png" 
                  alt="PR Sparkz" 
                  className="object-contain w-full h-full"
                  style={{ outline: 'none', border: 'none' }}
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1.5 xl:space-x-2">
              {navItems.map((item, index) => (
                <div
                  key={item.label}
                  className="relative group"
                >
                  {item.isSection ? (
                    <a
                      href={item.path}
                      onClick={(e) => handleNavSectionClick(e, item.path.substring(1))}
                      className="nav-item group relative px-4 xl:px-6 py-2.5 rounded-xl transition-all duration-300 flex items-center interactive focus:outline-none focus:ring-2 focus:ring-purple-300"
                      style={{
                        background: `linear-gradient(135deg, rgba(230, 230, 250, 0.05), white)`
                      }}
                    >
                      <div className="flex items-center relative z-10">
                        <span className="font-semibold transition-all duration-300 tracking-wide text-sm xl:text-base"
                              style={{ color: theme.metallicText }}>
                          {item.label}
                        </span>
                      </div>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                           style={{
                             background: `linear-gradient(135deg, rgba(230, 230, 250, 0.3), white)`,
                             border: `1px solid rgba(179, 157, 219, 0.3)`
                           }}></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full group-hover:w-3/4 transition-all duration-300"
                           style={{
                             background: `linear-gradient(90deg, ${theme.amethyst}, ${theme.plum})`
                           }}></div>
                    </a>
                  ) : (
                    <a
                      href={item.path}
                      onClick={(e) => handlePageClick(e, item.path)}
                      className={`nav-item group relative px-4 xl:px-6 py-2.5 rounded-xl transition-all duration-300 flex items-center interactive focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                        isActive(item.path) ? '' : ''
                      }`}
                      style={{
                        background: isActive(item.path) 
                          ? `linear-gradient(135deg, rgba(230, 230, 250, 0.2), white)`
                          : `linear-gradient(135deg, rgba(230, 230, 250, 0.05), white)`
                      }}
                    >
                      <div className="flex items-center relative z-10">
                        <span className={`font-semibold transition-all duration-300 tracking-wide text-sm xl:text-base ${
                          isActive(item.path) ? '' : ''
                        }`}
                              style={{ 
                                color: theme.metallicText
                              }}>
                          {item.label}
                        </span>
                      </div>
                      
                      {/* Active/Hover effects */}
                      <div className="absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                           style={{
                             background: `linear-gradient(135deg, rgba(230, 230, 250, 0.3), white)`,
                             border: `1px solid rgba(179, 157, 219, 0.3)`
                           }}></div>
                      
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                        isActive(item.path) ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                      }`}
                           style={{
                             background: `linear-gradient(90deg, ${theme.amethyst}, ${theme.plum})`
                           }}></div>
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Premium CTA Button */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <a 
                href="tel:+917738715711" 
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 interactive cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300"
                style={{
                  background: `linear-gradient(135deg, ${theme.wisteria}, white)`,
                  border: `1px solid ${theme.lavender}`
                }}
              >
                <Phone className="w-4 h-4" style={{ color: theme.amethyst }} />
                <span className="font-semibold text-sm" style={{ color: theme.metallicText }}>
                  +91 773 871 5711
                </span>
              </a>
              <a href="/contact" onClick={(e) => handlePageClick(e, '/contact')} 
                 className="group relative overflow-hidden px-6 xl:px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl interactive cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300"
                 style={{
                   background: `linear-gradient(135deg, ${theme.plum}, ${theme.amethyst})`,
                   boxShadow: `0 4px 20px rgba(154, 111, 255, 0.3)`
                 }}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#7343C0] via-[#5E2FA8] to-[#4A1F8F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 font-bold text-sm xl:text-base flex items-center space-x-2 tracking-wide"
                      style={{ color: theme.lightText }}>
                  <Phone className="w-4 h-4" />
                  <span>Free Strategy Call</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden relative rounded-xl flex items-center justify-center group hover:scale-105 transition-all duration-300 interactive w-11 h-11 min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-purple-300`}
              style={{
                background: `linear-gradient(135deg, ${theme.wisteria}, white)`,
                border: `1px solid ${theme.lavender}`
              }}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-5 h-5">
                <span className={`absolute block h-0.5 w-5 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'top-2 rotate-45' : 'top-1'
                }`}
                      style={{ background: theme.amethyst }}></span>
                <span className={`absolute block h-0.5 w-5 rounded-full top-2 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
                      style={{ background: theme.amethyst }}></span>
                <span className={`absolute block h-0.5 w-5 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'top-2 -rotate-45' : 'top-3'
                }`}
                      style={{ background: theme.amethyst }}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-400 z-40 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
             style={{
               background: `linear-gradient(135deg, white, ${theme.wisteria})`,
               borderBottom: `1px solid ${theme.lavender}`
             }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="space-y-1.5">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.isSection ? (
                    <a
                      href={item.path}
                      onClick={(e) => {
                        handleNavSectionClick(e, item.path.substring(1));
                        setIsMenuOpen(false);
                        setMobileOpenDropdown(null);
                      }}
                      className="group flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 interactive cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300"
                      style={{
                        background: `linear-gradient(135deg, rgba(230, 230, 250, 0.1), white)`
                      }}
                    >
                      <div className="flex items-center">
                        <span className="font-semibold group-hover:scale-105 text-base transition-all duration-300"
                              style={{ color: theme.metallicText }}>
                          {item.label}
                        </span>
                      </div>
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24"
                           style={{ stroke: theme.plum }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ) : (
                    <a
                      href={item.path}
                      onClick={(e) => handlePageClick(e, item.path)}
                      className={`group flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 interactive focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                        isActive(item.path) ? '' : ''
                      }`}
                      style={{
                        background: isActive(item.path)
                          ? `linear-gradient(135deg, rgba(230, 230, 250, 0.3), white)`
                          : `linear-gradient(135deg, rgba(230, 230, 250, 0.1), white)`
                      }}
                    >
                      <div className="flex items-center">
                        <span className={`font-semibold text-base transition-all duration-300 ${
                          isActive(item.path)
                            ? ''
                            : 'group-hover:scale-105'
                        }`}
                              style={{ 
                                color: theme.metallicText
                              }}>
                          {item.label}
                        </span>
                      </div>
                      <svg className={`w-4 h-4 transition-all duration-300 ${
                        isActive(item.path)
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`} 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24"
                           style={{ stroke: theme.amethyst }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile CTA Button */}
            <div className="mt-5 pt-5 space-y-3" style={{ borderTop: `1px solid ${theme.lavender}` }}>
              <a 
                href="tel:+917738715711"
                className="w-full group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] interactive cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300"
                style={{
                  background: `linear-gradient(135deg, ${theme.wisteria}, white)`,
                  border: `1px solid ${theme.lavender}`
                }}
              >
                <Phone className="w-5 h-5" style={{ color: theme.amethyst }} />
                <span className="font-semibold text-base" style={{ color: theme.metallicText }}>
                  Call: +91 773 871 5711
                </span>
              </a>
              <a 
                href="/contact"
                onClick={(e) => {
                  handlePageClick(e, '/contact');
                  setIsMenuOpen(false);
                  setMobileOpenDropdown(null);
                }}
                className="w-full group relative overflow-hidden px-6 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] block interactive cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300"
                style={{
                  background: `linear-gradient(135deg, ${theme.plum}, ${theme.amethyst})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7343C0] via-[#5E2FA8] to-[#4A1F8F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 font-bold flex items-center justify-center space-x-2 text-base"
                      style={{ color: theme.lightText }}>
                  <Phone className="w-5 h-5" />
                  <span>Free Strategy Call</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Navigation Sidebar - Hidden on mobile/tablet */}
      <div 
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 hidden lg:block ${
          showFloatingNav && location.pathname === '/' ? 'lg:opacity-100 lg:translate-x-0' : 'opacity-0 -translate-x-20 pointer-events-none'
        }`}
        onMouseEnter={() => setIsFloatingNavHovered(true)}
        onMouseLeave={() => setIsFloatingNavHovered(false)}
      >
        <div className="relative">
          {/* Floating Icon Button */}
          <div className="relative group">
            <button className="relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    style={{
                      background: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`,
                      border: `2px solid ${theme.lavender}`,
                      boxShadow: '0 4px 15px rgba(154, 111, 255, 0.3)'
                    }}>
              <Menu className="w-6 h-6 transition-colors duration-300" 
                    style={{ stroke: theme.lightText }} 
                    strokeWidth={2.5} />
            </button>
          </div>

          {/* Bridge element */}
          <div className={`absolute left-12 top-1/2 -translate-y-1/2 w-8 h-20 transition-all duration-300 ${
            isFloatingNavHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}></div>

          {/* Sections Menu - Fixed color gradient syntax */}
          <div className={`absolute left-16 top-1/2 -translate-y-1/2 transition-all duration-500 ${
            isFloatingNavHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-8 scale-90 pointer-events-none'
          }`}>
            <div className="relative">
              <div className="relative space-y-3">
                {[
                  { label: 'Services', section: 'services', Icon: Briefcase },
                  { label: 'Why Us', section: 'why-pr-sparkz', Icon: Sparkles },
                  { label: 'Testimonials', section: 'testimonials', Icon: MessageCircle }
                ].map((item, index) => {
                  const IconComponent = item.Icon;
                  return (
                    <div key={item.label} style={{ animationDelay: `${index * 50}ms` }} className="animate-[float-in_0.3s_ease-out_forwards]">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (location.pathname === '/') {
                            scrollToSection(item.section, 80, lenis);
                          } else {
                            navigate('/');
                            setTimeout(() => scrollToSection(item.section, 80, lenis), 100);
                          }
                        }}
                        className="group relative flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300"
                      >
                        {/* Circular icon button */}
                        <div className={`relative w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-300 shadow-lg group-hover:shadow-xl z-10`}
                             style={{
                               background: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`,
                               boxShadow: '0 4px 15px rgba(154, 111, 255, 0.3)'
                             }}>
                          <IconComponent className="w-5 h-5" style={{ stroke: theme.lightText }} strokeWidth={2.5} />
                          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        {/* Label tooltip */}
                        <div className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-300 pointer-events-none z-20">
                          <div className="relative">
                            <div className="backdrop-blur-xl rounded-full px-5 py-2.5 shadow-xl"
                                 style={{ 
                                   background: `linear-gradient(135deg, rgba(232, 213, 255, 0.95), white)`,
                                   border: `2px solid ${theme.amethyst}`,
                                   boxShadow: '0 8px 25px rgba(154, 111, 255, 0.3)'
                                 }}>
                              <span className="font-semibold text-sm whitespace-nowrap"
                                    style={{ color: theme.metallicText }}>
                                {item.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        
        @keyframes float-in {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .nav-item {
          animation: float-in 0.5s ease-out forwards;
          opacity: 0;
        }

        .interactive {
          transition: all 0.3s ease;
        }

        .interactive:focus {
          outline: none;
        }

        .interactive:focus-visible {
          outline: 2px solid rgba(123, 104, 238, 0.6);
          outline-offset: 2px;
        }

        a, button {
          -webkit-tap-highlight-color: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          .interactive,
          .nav-item {
            transition: none;
            animation: none;
          }
        }

        /* Remove logo outline specifically */
        .logo-container:focus,
        .logo-container *:focus {
          outline: none !important;
          box-shadow: none !important;
        }

        img[alt="PR Sparkz"] {
          border: none !important;
          outline: none !important;
        }

        @media (max-width: 767px) {
          button, a, .interactive {
            min-height: 44px;
            min-width: 44px;
          }
          
          nav {
            min-height: 80px;
          }
        }

        @media (max-width: 480px) {
          .max-w-7xl {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          nav {
            min-height: 75px;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .max-w-7xl {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default ModernNavbar;