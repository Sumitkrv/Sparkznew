import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle,
  Megaphone,
  Users,
  Sparkles,
  TrendingUp,
  Zap,
  Menu,
  X
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { scrollToSection, scrollToTop } from '../utils/navigation.js';
import { useSmoothScroll } from './SmoothScroll.jsx';

const Testimonials = () => {
  const navigate = useNavigate();
  const lenis = useSmoothScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileNavigation, setShowMobileNavigation] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Purple Color Palette
  const theme = {
    wisteria: "#E8D5FF",
    lavender: "#D4BDFF",
    orchid: "#C19EFF",
    mauve: "#AD85FF",
    amethyst: "#9A6FFF",
    plum: "#8659D9",
    aubergine: "#7343C0",
    violet: "#5E2FA8",
    midnightPurple: "#4A1F8F",
    headerGradient1: "#5B3A8F",
    headerGradient2: "#6B4FA0",
    headerGradient3: "#7B5FB5",
    metallicText: "#1a1a1a",
    metallicBorder: "#C0C0C0"
  };

  // Removed unused parallax scroll tracking (was mapping to constant values)

  const testimonials = [
    { 
      id: 1,
      name: "Shikha Khandelwal", 
      role: "Founder",
      company: "BK Shikha",
      text: "My profile was completely transformed. Within a month, I experienced 4x growth and a massive increase in subscribers — all organic, without paid ads.",
      rating: 5,
      platform: "Social Media",
      stats: "4x growth",
      gradient: "from-[#9A6FFF] to-[#8659D9]"
    },
    { 
      id: 2,
      name: "Harsh Aggarwal", 
      role: "Co-founder",
      company: "Moon7 Silverhub",
      text: "Our offline events were managed with precision. From on-ground marketing to digital promotions, the reach and impact were outstanding.",
      rating: 5,
      platform: "Events & Marketing",
      stats: "Outstanding reach",
      gradient: "from-[#C19EFF] to-[#9A6FFF]"
    },
    { 
      id: 3,
      name: "Sujata Chauhan", 
      role: "MD",
      company: "Vortex Splash",
      text: "Highly active and creative team. The marketing approach was smooth, effective, and results-driven.",
      rating: 5,
      platform: "Digital Marketing",
      stats: "Results-driven",
      gradient: "from-[#D4BDFF] to-[#C19EFF]"
    },
    { 
      id: 4,
      name: "Rohit Mehra", 
      role: "Founder",
      company: "TasteBuds Café",
      text: "The social media strategy completely changed our customer engagement. Within 6 weeks, footfall increased by 3x, and our online orders grew significantly.",
      rating: 5,
      platform: "Social Media",
      stats: "3x footfall",
      gradient: "from-[#AD85FF] to-[#9A6FFF]"
    },
    { 
      id: 5,
      name: "Neha Kapoor", 
      role: "Owner",
      company: "Aurora Jewellery",
      text: "The creative campaigns were flawless. From concept to execution, every detail was handled professionally, giving our brand a premium online presence.",
      rating: 5,
      platform: "Digital Marketing",
      stats: "Premium presence",
      gradient: "from-[#9A6FFF] to-[#8659D9]"
    },
    { 
      id: 6,
      name: "Vikram Singh", 
      role: "CEO",
      company: "GreenLeaf Organics",
      text: "The team brought fresh ideas and executed them with precision. Sales conversions increased, and our brand visibility across digital platforms skyrocketed.",
      rating: 5,
      platform: "Digital Marketing",
      stats: "Sales up",
      gradient: "from-[#C19EFF] to-[#9A6FFF]"
    },
    { 
      id: 7,
      name: "Ayesha Reddy", 
      role: "Co-founder",
      company: "LuxeTreats Chocolates",
      text: "Their marketing approach is both innovative and practical. The engagement on our campaigns went through the roof, and customer feedback has been overwhelmingly positive.",
      rating: 5,
      platform: "Social Media",
      stats: "Engagement soared",
      gradient: "from-[#D4BDFF] to-[#C19EFF]"
    },
    { 
      id: 8,
      name: "Ananya Sharma", 
      role: "Director",
      company: "StyleHub Fashion",
      text: "The creative direction and brand storytelling elevated our entire campaign. We saw a 250% increase in engagement and our best quarter yet.",
      rating: 5,
      platform: "Social Media",
      stats: "250% engagement",
      gradient: "from-[#AD85FF] to-[#9A6FFF]"
    },
    { 
      id: 9,
      name: "Rajesh Kumar", 
      role: "Founder",
      company: "TechFlow Solutions",
      text: "Outstanding results in B2B lead generation. The targeted campaigns brought us qualified leads and our conversion rate doubled within 2 months.",
      rating: 5,
      platform: "Digital Marketing",
      stats: "2x conversions",
      gradient: "from-[#9A6FFF] to-[#8659D9]"
    },
    { 
      id: 10,
      name: "Priya Malhotra", 
      role: "Owner",
      company: "Bliss Spa & Wellness",
      text: "The brand refresh was exactly what we needed. Our social presence grew tremendously and we're now fully booked weeks in advance.",
      rating: 5,
      platform: "Social Media",
      stats: "Fully booked",
      gradient: "from-[#C19EFF] to-[#9A6FFF]"
    },
    { 
      id: 11,
      name: "Kabir Mehta", 
      role: "Co-founder",
      company: "EcoNest Homes",
      text: "From zero to hero in 90 days. Their strategic approach to content and community building transformed our brand's digital footprint completely.",
      rating: 5,
      platform: "Digital Marketing",
      stats: "Zero to hero",
      gradient: "from-[#D4BDFF] to-[#C19EFF]"
    },
    { 
      id: 12,
      name: "Meera Iyer", 
      role: "CEO",
      company: "Artisan Crafts Co.",
      text: "The influencer collaborations and PR strategies opened doors we never thought possible. Our revenue grew 5x in just one quarter.",
      rating: 5,
      platform: "Events & Marketing",
      stats: "5x revenue",
      gradient: "from-[#AD85FF] to-[#9A6FFF]"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying || isHovered || isMobile) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 10000); // Increased from 8000 to reduce animation frequency
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, testimonials.length, isMobile]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30;
    const isRightSwipe = distance < -30;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  const getPlatformIcon = (platform) => {
    switch(platform) {
      case "Social Media": return MessageCircle;
      case "Events & Marketing": return Users;
      case "Digital Marketing": return Megaphone;
      default: return Sparkles;
    }
  };

  // Responsive column splitting
  const getColumnsForCurrentView = () => {
    if (isMobile) {
      return {
        left: [],
        center: testimonials,
        right: []
      };
    } else if (window.innerWidth < 1280) {
      // For tablets and smaller laptops
      const left = testimonials.filter((_, i) => i % 2 === 0);
      const center = [];
      const right = testimonials.filter((_, i) => i % 2 === 1);
      return { left, center, right };
    } else {
      // For desktop
      const left = testimonials.filter((_, i) => i % 3 === 0);
      const center = testimonials.filter((_, i) => i % 3 === 1);
      const right = testimonials.filter((_, i) => i % 3 === 2);
      return { left, center, right };
    }
  };

  const columns = getColumnsForCurrentView();

  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      className="relative py-8 md:py-12 lg:py-20 overflow-hidden bg-gradient-to-b from-[#FAFAFA] to-white"
      style={{ 
        fontFamily: "'Montserrat', sans-serif"
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Subtle metallic background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 rounded-full blur-2xl sm:blur-3xl"
             style={{ background: theme.orchid }} />
        <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 rounded-full blur-2xl sm:blur-3xl"
             style={{ background: theme.lavender }} />
      </div>

      <motion.div 
        className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 md:px-4 lg:px-5 py-1 md:py-2 rounded-full mb-4 md:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{ 
              background: `linear-gradient(135deg, ${theme.wisteria}, white)`,
              border: `1px solid ${theme.metallicBorder}`
            }}
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" style={{ color: theme.amethyst }} />
            <span className="font-semibold text-xs md:text-sm tracking-wide"
                  style={{ color: theme.metallicText }}>
              CLIENT SUCCESS STORIES
            </span>
          </motion.div>

          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 px-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: theme.metallicText }}
          >
            What Our{" "}
            <span className="bg-gradient-to-r bg-clip-text text-transparent"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`
                  }}>
              Clients Say
            </span>
          </motion.h2>

          <motion.p 
            className="text-sm md:text-base lg:text-lg max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ color: theme.metallicText, opacity: 0.8 }}
          >
            Real results from real clients who trusted us with their brand
          </motion.p>
        </motion.div>

        {/* 3-Column Layout with Different Animations */}
        <div className="max-w-7xl mx-auto mb-8 md:mb-12 lg:mb-16">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* LEFT COLUMN - Only show on xl screens and up */}
            {columns.left.length > 0 && (
              <div className="hidden xl:block relative h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden">
                <motion.div 
                  className="space-y-4 md:space-y-6 absolute"
                  animate={{ 
                    y: [0, -40 * columns.left.length] 
                  }}
                  transition={{
                    duration: isMobile ? 40 : 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {[...columns.left, ...columns.left].map((testimonial, index) => {
                    const Icon = getPlatformIcon(testimonial.platform);
                    return (
                      <motion.div
                        key={`left-${testimonial.id}-${index}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                          duration: 0.6,
                          ease: "easeOut"
                        }}
                        className="rounded-xl p-4 md:p-6 shadow-lg transition-all group relative"
                        style={{ 
                          background: `linear-gradient(135deg, white, ${theme.wisteria})`,
                          border: `1px solid ${theme.metallicBorder}`
                        }}
                        whileHover={{ scale: 1.02, zIndex: 10 }}
                      >
                        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r ${testimonial.gradient}`} />
                        
                        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                          <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-lg md:text-xl lg:text-2xl font-bold flex-shrink-0`}>
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-sm md:text-base truncate" style={{ color: theme.metallicText }}>{testimonial.name}</h4>
                            <p className="text-xs md:text-sm text-gray-600 truncate">{testimonial.role}, {testimonial.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-1 mb-2 md:mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" style={{ color: theme.amethyst }} />
                          ))}
                        </div>
                        
                        <p className="text-xs md:text-sm mb-3 md:mb-4 line-clamp-3 md:line-clamp-4" style={{ color: theme.metallicText, opacity: 0.8 }}>
                          "{testimonial.text}"
                        </p>
                        
                        <div className="flex items-center justify-between pt-2 md:pt-3" style={{ borderTop: `1px solid ${theme.metallicBorder}` }}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-3 h-3 md:w-4 md:h-4" style={{ color: theme.amethyst }} />
                            <span className="text-xs md:text-sm" style={{ color: theme.metallicText, opacity: 0.8 }}>{testimonial.platform}</span>
                          </div>
                          <div className={`px-2 py-1 md:px-3 md:py-1 rounded-lg bg-gradient-to-r ${testimonial.gradient} text-white text-xs font-semibold whitespace-nowrap`}>
                            {testimonial.stats}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
                {/* Gradient overlays for smooth fade */}
                <div className="absolute top-0 left-0 right-0 h-10 md:h-20 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-10 md:h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
              </div>
            )}

            {/* CENTER COLUMN - Main carousel */}
            <div className={`flex flex-col justify-center ${isMobile ? 'h-auto min-h-[500px]' : 'h-[400px] md:h-[600px] lg:h-[800px]'}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl relative mx-2 sm:mx-0"
                style={{ 
                  background: `linear-gradient(135deg, white, ${theme.wisteria})`,
                  border: `1px solid ${theme.metallicBorder}`
                }}
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onTouchMove={isMobile ? handleTouchMove : undefined}
                onTouchEnd={isMobile ? handleTouchEnd : undefined}
              >
                {/* Header Badge */}
                <div className="flex items-center justify-center mb-4 md:mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full"
                       style={{ 
                         background: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`
                       }}>
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    <span className="text-white font-semibold text-xs md:text-sm">FEATURED CLIENT</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.9, rotateY: isMobile ? 0 : 10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: isMobile ? 0 : -10 }}
                    transition={{ duration: isMobile ? 0.4 : 0.7, ease: "easeInOut" }}
                  >
                    {/* Profile Section */}
                    <motion.div 
                      className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6"
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <motion.div 
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br ${testimonials[activeIndex].gradient} flex items-center justify-center text-white text-xl md:text-2xl font-bold flex-shrink-0`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                      >
                        {testimonials[activeIndex].name.charAt(0)}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg md:text-xl font-bold mb-1 truncate" style={{ color: theme.metallicText }}>
                          {testimonials[activeIndex].name}
                        </h4>
                        <p className="text-xs md:text-sm font-medium mb-1 truncate" style={{ color: theme.metallicText, opacity: 0.8 }}>
                          {testimonials[activeIndex].role}
                        </p>
                        <p className="text-xs truncate" style={{ color: theme.metallicText, opacity: 0.6 }}>
                          {testimonials[activeIndex].company}
                        </p>
                      </div>
                    </motion.div>

                    {/* Stars */}
                    <motion.div 
                      className="flex gap-1 mb-3 md:mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: 0.4 + (i * 0.1), type: "spring", stiffness: 300 }}
                        >
                          <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" style={{ color: theme.amethyst }} />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Testimonial Text */}
                    <motion.div 
                      className={`p-3 md:p-4 lg:p-5 rounded-xl mb-4 md:mb-5`}
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.wisteria}/20, white)`,
                        borderLeft: `4px solid ${theme.amethyst}`
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <motion.p 
                        className="text-sm md:text-base leading-relaxed italic"
                        style={{ color: theme.metallicText }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                      >
                        "{testimonials[activeIndex].text}"
                      </motion.p>
                    </motion.div>

                    {/* Stats & Platform */}
                    <motion.div 
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 md:p-4 rounded-xl"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.wisteria}/10, white)`
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <motion.div 
                        className="flex items-center gap-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.4 }}
                      >
                        {(() => {
                          const Icon = getPlatformIcon(testimonials[activeIndex].platform);
                          return <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: theme.amethyst }} />;
                        })()}
                        <span className="text-xs md:text-sm font-medium" style={{ color: theme.metallicText, opacity: 0.8 }}>
                          {testimonials[activeIndex].platform}
                        </span>
                      </motion.div>
                      <motion.div 
                        className={`px-3 py-1 md:px-4 md:py-2 rounded-lg bg-gradient-to-r ${testimonials[activeIndex].gradient} text-white font-bold text-xs md:text-sm flex items-center gap-2 whitespace-nowrap`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1, type: "spring", stiffness: 200 }}
                      >
                        <motion.div
                          animate={{ y: [0, -3, 0] }}
                          transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
                        >
                          <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                        </motion.div>
                        {testimonials[activeIndex].stats}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="mt-6">
                  {/* Navigation Dots - Only show on desktop */}
                  {!isMobile && (
                    <div className="flex justify-center gap-2 mb-4">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === activeIndex 
                              ? 'w-8' 
                              : 'w-2'
                          }`}
                          style={{ 
                            background: index === activeIndex 
                              ? theme.amethyst 
                              : theme.metallicBorder 
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Mobile: Simple counter with arrows */}
                  {isMobile && (
                    <div className="flex items-center justify-between px-4">
                      <button
                        onClick={handlePrev}
                        className="p-3 rounded-full"
                        style={{ 
                          background: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      
                      <div className="text-center">
                        <div className="text-sm font-semibold" style={{ color: theme.amethyst }}>
                          {activeIndex + 1} / {testimonials.length}
                        </div>
                        <div className="text-xs text-gray-500">Swipe to explore</div>
                      </div>
                      
                      <button
                        onClick={handleNext}
                        className="p-3 rounded-full"
                        style={{ 
                          background: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN - Only show on xl screens and up */}
            {columns.right.length > 0 && (
              <div className="hidden xl:block relative h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden">
                <motion.div 
                  className="space-y-4 md:space-y-6 absolute"
                  animate={{ 
                    y: [-40 * columns.right.length, 0] 
                  }}
                  transition={{
                    duration: isMobile ? 40 : 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {[...columns.right, ...columns.right].map((testimonial, index) => {
                    const Icon = getPlatformIcon(testimonial.platform);
                    return (
                      <motion.div
                        key={`right-${testimonial.id}-${index}`}
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                          duration: 0.6,
                          ease: "easeOut"
                        }}
                        className="rounded-xl p-4 md:p-6 shadow-lg transition-all group relative"
                        style={{ 
                          background: `linear-gradient(135deg, white, ${theme.wisteria})`,
                          border: `1px solid ${theme.metallicBorder}`
                        }}
                        whileHover={{ scale: 1.02, zIndex: 10 }}
                      >
                        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r ${testimonial.gradient}`} />
                        
                        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                          <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-lg md:text-xl lg:text-2xl font-bold flex-shrink-0`}>
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-sm md:text-base truncate" style={{ color: theme.metallicText }}>{testimonial.name}</h4>
                            <p className="text-xs md:text-sm text-gray-600 truncate">{testimonial.role}, {testimonial.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-1 mb-2 md:mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" style={{ color: theme.amethyst }} />
                          ))}
                        </div>
                        
                        <p className="text-xs md:text-sm mb-3 md:mb-4 line-clamp-3 md:line-clamp-4" style={{ color: theme.metallicText, opacity: 0.8 }}>
                          "{testimonial.text}"
                        </p>
                        
                        <div className="flex items-center justify-between pt-2 md:pt-3" style={{ borderTop: `1px solid ${theme.metallicBorder}` }}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-3 h-3 md:w-4 md:h-4" style={{ color: theme.amethyst }} />
                            <span className="text-xs md:text-sm" style={{ color: theme.metallicText, opacity: 0.8 }}>{testimonial.platform}</span>
                          </div>
                          <div className={`px-2 py-1 md:px-3 md:py-1 rounded-lg bg-gradient-to-r ${testimonial.gradient} text-white text-xs font-semibold whitespace-nowrap`}>
                            {testimonial.stats}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
                {/* Gradient overlays for smooth fade */}
                <div className="absolute top-0 left-0 right-0 h-10 md:h-20 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-10 md:h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 mx-2 sm:mx-0"
          style={{ 
            background: `linear-gradient(135deg, ${theme.wisteria}, white)`,
            border: `1px solid ${theme.metallicBorder}`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 px-2" style={{ color: theme.metallicText }}>
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-4" style={{ color: theme.metallicText, opacity: 0.8 }}>
            Let's create measurable results for your brand together
          </p>
          
          <motion.button 
            onClick={() => {
              navigate('/contact');
              setTimeout(() => scrollToTop(lenis), 100);
            }}
            className="px-6 py-3 md:px-8 md:py-4 font-semibold text-sm md:text-base rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`,
              color: 'white'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Journey
            <Zap className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;