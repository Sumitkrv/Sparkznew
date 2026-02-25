import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Services from "./Services";
import { Sparkles, Play, Award, TrendingUp, Target, CheckCircle2, ArrowRight, Zap, Shield, Star, ArrowUpRight, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
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

const ServicesPage = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [currentSlides, setCurrentSlides] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [likedCards, setLikedCards] = useState([false, false, false, false, false, false, false, false]);

  const handleLike = (cardIndex) => {
    setLikedCards(prev => {
      const newLiked = [...prev];
      newLiked[cardIndex] = !newLiked[cardIndex];
      return newLiked;
    });
  };

  const handleComment = () => {
    navigate('/contact');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleShare = () => {
    const message = encodeURIComponent('Check out PRSparkz services! 🚀');
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // 8 service cards data - Instagram style with multiple slides per card
  const serviceCards = [
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Social Media Marketing",
          description: "Strategic campaigns that drive engagement and build authentic connections with your audience.",
          imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=800&fit=crop&q=80",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Instagram Growth",
          description: "Organic strategies to grow your Instagram presence and reach your target audience effectively.",
          imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=800&fit=crop&q=80",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
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
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Video Production",
          description: "Professional video content that captures attention and drives engagement across all platforms.",
          imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=800&fit=crop&q=80",
        },
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
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
      ],
    },
    {
      username: "prsparkz",
      avatarUrl: "/logo.png",
      slides: [
        {
          title: "Market Research",
          description: "In-depth analysis of your market, competitors, and audience to inform strategic decisions.",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop&q=80",
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
        {!prefersReducedMotion && (
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
                <div 
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-xl"
                  style={{
                    background: 'rgba(196, 181, 253, 0.08)',
                    border: `1px solid ${theme.lavenderGlow}30`,
                    boxShadow: `0 4px 24px ${theme.electricPurple}15`
                  }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: theme.lavenderGlow }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span 
                    className="text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{ color: theme.softLilac }}
                  >
                    PR • Branding • Digital Authority
                  </span>
                  <Zap className="w-4 h-4" style={{ color: theme.lavenderGlow }} />
                </div>
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
                We craft strategic PR and digital narratives that elevate brands, 
                shape perception, and drive measurable growth.
              </motion.p>
            </div>
            {/* RIGHT: Abstract Growth System - 5 columns */}
            <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] hidden lg:block">
              {/* ...existing code... */}
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
};

export default ServicesPage;
