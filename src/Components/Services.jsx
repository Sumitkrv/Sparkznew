import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Premium Royal Purple Palette - Editorial Luxury
const theme = {
  deepPurple: "#1A0B2E",
  royalViolet: "#4C1D95",
  electricPurple: "#7C3AED",
  lavenderGlow: "#C4B5FD",
  softLilac: "#E9D5FF",
  midViolet: "#6D28D9",
  darkPlum: "#2D1B4E"
};

const Services = React.memo(() => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [currentSlides, setCurrentSlides] = useState([0, 0, 0]);
  const [likedCards, setLikedCards] = useState([false, false, false]);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLike = useCallback((cardIndex) => {
    setLikedCards(prev => {
      const newLiked = [...prev];
      newLiked[cardIndex] = !newLiked[cardIndex];
      return newLiked;
    });
  }, []);

  const handleComment = useCallback(() => {
    navigate('/contact');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }, [navigate]);

  const handleShare = useCallback(() => {
    const message = encodeURIComponent('Check out PRSparkz services! 🚀');
    window.open(`https://wa.me/?text=${message}`, '_blank');
  }, []);

  const services = [
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Social Media Marketing",
          description: "Strategic campaigns that drive engagement and build authentic connections with your audience.",
          imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=800&fit=crop&q=80",
        },
        {
          title: "Instagram Growth",
          description: "Organic strategies to grow your Instagram presence and reach your target audience effectively.",
          imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=800&fit=crop&q=80",
        },
        {
          title: "Facebook Advertising",
          description: "Targeted ad campaigns that maximize ROI and convert prospects into loyal customers.",
          imageUrl: "https://images.unsplash.com/photo-1611926653670-e652c37f0e02?w=800&h=800&fit=crop&q=80",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Content Creation",
          description: "Compelling content that tells your brand story and resonates with your target market.",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop&q=80",
        },
        {
          title: "Video Production",
          description: "Professional video content that captures attention and drives engagement across all platforms.",
          imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=800&fit=crop&q=80",
        },
        {
          title: "Graphic Design",
          description: "Eye-catching visuals that communicate your brand message and stand out in crowded feeds.",
          imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=800&fit=crop&q=80",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Brand Strategy",
          description: "Data-driven strategies that position your brand for sustainable growth and success.",
          imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop&q=80",
        },
        {
          title: "Market Research",
          description: "In-depth analysis of your market, competitors, and audience to inform strategic decisions.",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop&q=80",
        },
        {
          title: "Brand Identity",
          description: "Cohesive brand identity that reflects your values and resonates with your ideal customers.",
          imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=800&fit=crop&q=80",
        },
      ],
    },
  ];

  // Flatten all services for mobile view
  const allServices = useMemo(() => {
    return services.flatMap(service => service.slides);
  }, []);

  // Auto-rotate slides every 3 seconds
  useEffect(() => {
    if (isMobile) {
      // Mobile: rotate through all services in single card
      const interval = setInterval(() => {
        setMobileSlideIndex((prev) => (prev + 1) % allServices.length);
      }, 3000);
      return () => clearInterval(interval);
    } else {
      // Desktop: rotate slides in each card
      const interval = setInterval(() => {
        setCurrentSlides((prev) =>
          prev.map((slideIndex, cardIndex) => 
            (slideIndex + 1) % services[cardIndex].slides.length
          )
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, allServices.length, services]);

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'system-ui', sans-serif",
        background: `linear-gradient(135deg, ${theme.deepPurple} 0%, ${theme.darkPlum} 50%, ${theme.royalViolet} 100%)`
      }}
      aria-label="Our Services"
    >
      {/* Animated Background System - Light Beams Breaking Through */}
      {!prefersReducedMotion && window.innerWidth >= 768 && (
        <>
          {/* Primary Light Beam - Diagonal */}
          <motion.div
            className="absolute top-0 right-0 w-[800px] h-full opacity-20 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 0%, ${theme.electricPurple} 50%, transparent 100%)`,
              filter: 'blur(120px)',
              transformOrigin: 'top right'
            }}
            animate={{
              opacity: [0.15, 0.3, 0.15],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Secondary Glow Orb - Bottom Left */}
          <motion.div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-25 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${theme.electricPurple}, ${theme.midViolet}, transparent 70%)`,
              filter: 'blur(100px)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Accent Glow - Center */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${theme.lavenderGlow}, transparent 60%)`,
              filter: 'blur(90px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {/* Grid Pattern Overlay - Subtle Depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${theme.lavenderGlow} 1px, transparent 1px), linear-gradient(90deg, ${theme.lavenderGlow} 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
            style={{ color: "white" }}
          >
            Our Services
          </h2>
        </motion.div>

        {/* Instagram-Style Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isMobile ? (
            /* Mobile: Single card cycling through all services */
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-[468px] w-full mx-auto bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              {/* Header Section */}
              <header className="px-3 py-3 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-100">
                      <img
                        src="/logo.png"
                        alt="prsparkz avatar"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Username */}
                  <span className="font-semibold text-sm text-gray-900 truncate">
                    prsparkz
                  </span>
                </div>
                
                {/* Three-dot menu */}
                <button 
                  className="p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors duration-150"
                  aria-label="More options"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </header>

              {/* Image Section with Slide Indicator */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mobileSlideIndex}
                    src={allServices[mobileSlideIndex].imageUrl}
                    alt={allServices[mobileSlideIndex].title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </AnimatePresence>
                
                {/* Slide Indicator */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {mobileSlideIndex + 1}/{allServices.length}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-3 py-3 border-t border-gray-100">
                {/* Action Icons Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {/* Like button */}
                    <button
                      onClick={() => handleLike(0)}
                      className="p-2 -ml-2 hover:opacity-60 active:scale-90 transition-all duration-150"
                      aria-label="Like"
                    >
                      <Heart className={`w-6 h-6 transition-colors duration-200 ${
                        likedCards[0] ? 'fill-red-500 stroke-red-500' : 'stroke-gray-700'
                      }`} />
                    </button>
                    
                    {/* Comment button */}
                    <button 
                      onClick={handleComment}
                      className="p-2 hover:opacity-60 active:scale-90 transition-all duration-150"
                    >
                      <MessageCircle className="w-6 h-6 stroke-gray-700" />
                    </button>
                    
                    {/* Share button */}
                    <button 
                      onClick={handleShare}
                      className="p-2 hover:opacity-60 active:scale-90 transition-all duration-150"
                    >
                      <Send className="w-6 h-6 stroke-gray-700" />
                    </button>
                  </div>
                  
                  {/* Save button */}
                  <button
                    className="p-2 -mr-2 hover:opacity-60 active:scale-90 transition-all duration-150"
                    aria-label="Save"
                  >
                    <Bookmark className="w-6 h-6 stroke-gray-700" />
                  </button>
                </div>

                {/* Caption with smooth transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileSlideIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm leading-5">
                      <span className="font-semibold text-gray-900">prsparkz</span>
                      <span className="text-gray-800 ml-2 font-bold">{allServices[mobileSlideIndex].title}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {allServices[mobileSlideIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.article>
          ) : (
            /* Desktop: Three separate cards */
            services.map((service, cardIndex) => {
              const currentSlide = service.slides[currentSlides[cardIndex]];
              
              return (
                <motion.article
                  key={cardIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: cardIndex * 0.1 }}
                  className="max-w-[468px] w-full mx-auto bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden"
                >
                  {/* Header Section */}
                  <header className="px-3 py-3 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-100">
                          <img
                            src={service.avatarUrl}
                            alt={`${service.username}'s avatar`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      
                      {/* Username */}
                      <span className="font-semibold text-sm text-gray-900 truncate">
                        {service.username}
                      </span>
                    </div>
                    
                    {/* Three-dot menu */}
                    <button 
                      className="p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors duration-150"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </header>

                  {/* Image Section with Slide Indicator */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlides[cardIndex]}
                        src={currentSlide.imageUrl}
                        alt={currentSlide.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </AnimatePresence>
                    
                    {/* Slide Indicator */}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {currentSlides[cardIndex] + 1}/{service.slides.length}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="px-3 py-3 border-t border-gray-100">
                    {/* Action Icons Row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {/* Like button */}
                        <button
                          onClick={() => handleLike(cardIndex)}
                          className="p-2 -ml-2 hover:opacity-60 active:scale-90 transition-all duration-150"
                          aria-label="Like"
                        >
                          <Heart className={`w-6 h-6 transition-colors duration-200 ${
                            likedCards[cardIndex] ? 'fill-red-500 stroke-red-500' : 'stroke-gray-700'
                          }`} />
                        </button>
                        
                        {/* Comment button */}
                        <button 
                          onClick={handleComment}
                          className="p-2 hover:opacity-60 active:scale-90 transition-all duration-150"
                        >
                          <MessageCircle className="w-6 h-6 stroke-gray-700" />
                        </button>
                        
                        {/* Share button */}
                        <button 
                          onClick={handleShare}
                          className="p-2 hover:opacity-60 active:scale-90 transition-all duration-150"
                        >
                          <Send className="w-6 h-6 stroke-gray-700" />
                        </button>
                      </div>
                      
                      {/* Save button */}
                      <button
                        className="p-2 -mr-2 hover:opacity-60 active:scale-90 transition-all duration-150"
                        aria-label="Save"
                      >
                        <Bookmark className="w-6 h-6 stroke-gray-700" />
                      </button>
                    </div>

                    {/* Caption with smooth transition */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlides[cardIndex]}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm leading-5">
                          <span className="font-semibold text-gray-900">{service.username}</span>
                          <span className="text-gray-800 ml-2 font-bold">{currentSlide.title}</span>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {currentSlide.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;