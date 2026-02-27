import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Services from "./Services";
import { Sparkles, Play, Award, TrendingUp, Target, CheckCircle2, ArrowRight, Zap, Shield, Star, ArrowUpRight, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useSmoothScroll } from './SmoothScroll.jsx';
import { scrollToTop } from '../utils/navigation.js';

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

const ServicesPage = React.memo(() => {
  const navigate = useNavigate();
  const lenis = useSmoothScroll();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [currentSlides, setCurrentSlides] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [likedCards, setLikedCards] = useState([false, false, false, false, false, false, false, false]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
    setTimeout(() => scrollToTop(lenis), 100);
  }, [navigate, lenis]);

  const handleShare = useCallback(() => {
    const message = encodeURIComponent('Check out PRSparkz services! 🚀');
    window.open(`https://wa.me/?text=${message}`, '_blank');
  }, []);

  // Force scroll to top when component mounts
  useEffect(() => {
    scrollToTop(lenis, true);
  }, [lenis]);

  // 8 service cards data - Instagram style with multiple slides per card
  const serviceCards = [
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Social Media Marketing",
          description: "Strategic campaigns that drive engagement and build authentic connections with your audience.",
          imageUrl: "/images/services/Social Media.jpg",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Digital Marketing",
          description: "Comprehensive digital strategies that maximize your online presence and drive measurable results.",
          imageUrl: "/images/services/Digital Marketing.jpg",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Influencer Marketing",
          description: "Connect with the right influencers to amplify your brand message and reach new audiences.",
          imageUrl: "/images/services/Influencer Marketing.jpg",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Campaign Planning",
          description: "Strategic campaign development that delivers impactful results and drives brand growth.",
          imageUrl: "/images/services/Campaign Planning.jpg",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Celebrity Branding",
          description: "Leverage celebrity partnerships to elevate your brand and create powerful connections.",
          imageUrl: "/images/services/Celebrity Branding.jpg",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Web Development",
          description: "Custom websites that deliver exceptional user experiences and drive conversions.",
          imageUrl: "/images/services/Web Development.jpg",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "AI Solutions",
          description: "Cutting-edge AI technology to automate processes and enhance your marketing performance.",
          imageUrl: "/images/services/AI Solutions.jpg",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Offline Marketing",
          description: "Impactful offline campaigns that create memorable brand experiences and connections.",
          imageUrl: "/images/services/Offline Marketing.jpg",
        },
      ],
    }
  ];

  return (
    <section 
      id="services-page" 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden"
      style={{ background: theme.deepPurple }}
    >
      {/* Award-Winning Hero Section - Editorial Luxury */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Deep Purple Foundation Layer */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${theme.deepPurple} 0%, ${theme.darkPlum} 50%, ${theme.royalViolet} 100%)`
          }}
        />
        {/* Animated Background System - Light Beams Breaking Through */}
        {!prefersReducedMotion && !isMobile && (
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
        {/* Main Content Container - Asymmetrical Layout */}
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10 w-full py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[80vh]">
            {/* LEFT: Editorial Copy Section - 7 columns */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
               
                  
                 
              </motion.div>
              {/* Main Headline - Staggered Editorial Style */}
              <div className="space-y-2 lg:space-y-3">
                {[
                  "Turn Visibility",
                  "Into Authority",
                  "With PR Sparkz"
                ].map((line, index) => (
                  <motion.h1
                    key={index}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight"
                    style={{
                      color: index === 1 ? theme.lavenderGlow : 'white',
                      textShadow: index === 1 ? `0 0 60px ${theme.electricPurple}60` : 'none'
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + index * 0.15,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {line}
                  </motion.h1>
                ))}
              </div>
              {/* Subheadline - Editorial */}
              <motion.p
                className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-light"
                style={{ color: theme.softLilac }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Comprehensive solutions designed to elevate your brand and drive measurable results across all channels.
              </motion.p>
              
              {/* Feature Points */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" style={{ color: theme.lavenderGlow }} />
                    <h3 className="font-bold text-sm sm:text-base" style={{ color: 'white' }}>
                      Creative Excellence
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-light" style={{ color: theme.softLilac }}>
                    Innovative designs that stand out
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" style={{ color: theme.lavenderGlow }} />
                    <h3 className="font-bold text-sm sm:text-base" style={{ color: 'white' }}>
                      Strategic Focus
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-light" style={{ color: theme.softLilac }}>
                    Data-driven approach to success
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" style={{ color: theme.lavenderGlow }} />
                    <h3 className="font-bold text-sm sm:text-base" style={{ color: 'white' }}>
                      Proven Results
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-light" style={{ color: theme.softLilac }}>
                    Measurable impact for your brand
                  </p>
                </div>
              </motion.div>
            </div>
            {/* RIGHT: Hero Image - 5 columns, visible on all screens */}
            <div
              className="lg:col-span-5 col-span-1 relative flex items-center justify-center mt-12 lg:mt-24 h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px]"
            >
              <motion.img
                src="/images/4x/Asset 1@4x.png"
                alt="PR Sparkz - Social Media Tree"
                className="h-[95%] max-h-[480px] sm:max-h-[540px] md:max-h-[650px] w-auto object-contain"
                initial={{ opacity: 0, scale: 0.9, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>
        {/* Bottom Gradient Fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent, ${theme.deepPurple})`
          }}
        />
      </div>
      {/* Services Section - 8 Cards */}
      <div className="relative z-10 py-16" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
              style={{ color: "#1F1F1F" }}
            >
              Our Services
            </h2>
          </motion.div>
          
          {/* Instagram-Style Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {serviceCards.map((service, cardIndex) => {
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

                  {/* Image Section */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={currentSlide.imageUrl}
                      alt={currentSlide.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
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

                    {/* Caption */}
                    <div>
                      <p className="text-sm leading-5">
                        <span className="font-semibold text-gray-900">{service.username}</span>
                        <span className="text-gray-800 ml-2 font-bold">{currentSlide.title}</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {currentSlide.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

ServicesPage.displayName = 'ServicesPage';

export default ServicesPage;
