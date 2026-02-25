import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const theme = {
  deepPurple: "#1A0B2E",
  royalViolet: "#4C1D95",
  electricPurple: "#7C3AED",
  lavenderGlow: "#C4B5FD",
  softLilac: "#E9D5FF",
  midViolet: "#6D28D9",
  darkPlum: "#2D1B4E",
  wisteria: "#E8D5FF",
  lavender: "#D4BDFF",
  orchid: "#C19EFF",
  mauve: "#AD85FF",
  amethyst: "#9A6FFF",
  plum: "#8659D9",
  aubergine: "#7343C0",
  violet: "#5E2FA8",
  midnightPurple: "#4A1F8F"
};

const cardGradient = `
  linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.12) 75%, rgba(255,255,255,0.22) 100%),
  linear-gradient(135deg, ${theme.midnightPurple}FA 0%, ${theme.violet}F2 20%, ${theme.amethyst}ED 40%, ${theme.plum}E8 60%, ${theme.violet}EC 80%, ${theme.midnightPurple}F2 100%)
`;

const AboutCTA = React.memo(({ isVisible, scrollToSection }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleTransformClick = () => {
    navigate('/contact');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleSuccessStoriesClick = () => {
    navigate('/contact');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  return (
    <div className="mb-12 sm:mb-16 md:mb-20 relative -mx-[100vw] px-[100vw]" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.div 
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-8 md:p-12"
            style={{ 
              background: `linear-gradient(135deg, ${theme.deepPurple} 0%, ${theme.darkPlum} 50%, ${theme.royalViolet} 100%)`,
              border: `1px solid ${theme.lavenderGlow}30`,
              boxShadow: `
                0 35px 100px rgba(0,0,0,0.5),
                0 15px 40px rgba(124, 58, 237, 0.3),
                0 0 0 1px ${theme.lavenderGlow}20
              `
            }}
            animate={!isMobile ? {
              boxShadow: [
                `0 35px 100px rgba(0,0,0,0.5), 0 15px 40px rgba(124, 58, 237, 0.3), 0 0 0 1px ${theme.lavenderGlow}20`,
                `0 40px 110px rgba(124, 58, 237, 0.4), 0 20px 50px rgba(124, 58, 237, 0.5), 0 0 0 1px ${theme.lavenderGlow}40`,
                `0 35px 100px rgba(0,0,0,0.5), 0 15px 40px rgba(124, 58, 237, 0.3), 0 0 0 1px ${theme.lavenderGlow}20`
              ]
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Animated Background System - Light Beams */}
            {!isMobile && (
            <motion.div
              className="absolute top-0 right-0 w-[400px] h-full opacity-20 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, transparent 0%, ${theme.electricPurple} 50%, transparent 100%)`,
                filter: 'blur(80px)',
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
            )}
            {!isMobile && (
            <motion.div
              className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-25 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${theme.electricPurple}, ${theme.midViolet}, transparent 70%)`,
                filter: 'blur(60px)',
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            )}
            {/* Grid Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(${theme.lavenderGlow} 1px, transparent 1px), linear-gradient(90deg, ${theme.lavenderGlow} 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
              }}
            />
            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Ready to Shine Brighter?
              </h2>
              
              <p className="text-white text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto font-light" style={{ opacity: 0.9 }}>
                Let's transform your brand challenges into visible growth and lasting impact. 
                Partner with PR Sparkz for end-to-end solutions that make your brand shine.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                {/* Start Your Transformation Button - Contact Us */}
                <motion.button 
                  type="button"
                  onClick={handleTransformClick}
                  aria-label="Start your transformation - Contact us"
                  className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden cursor-pointer"
                  style={{ 
                    border: `1px solid rgba(255,255,255,0.2)`,
                    background: cardGradient,
                    boxShadow: `0 4px 24px rgba(0,0,0,0.3)`
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: 'rgba(255,255,255,0.4)',
                    boxShadow: `0 8px 32px rgba(0,0,0,0.4)`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 text-white">Start Your Transformation</span>
                  <ArrowRight 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 relative z-10" 
                    style={{ color: '#FFFFFF' }} 
                    aria-hidden="true"
                  />
                </motion.button>
                
                {/* View Our Success Stories Button - Client Portfolio */}
                <motion.button 
                  type="button"
                  onClick={handleSuccessStoriesClick}
                  aria-label="View our success stories - Client portfolio"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 relative overflow-hidden cursor-pointer"
                  style={{ 
                    border: `1px solid rgba(255,255,255,0.2)`,
                    color: '#FFFFFF',
                    background: cardGradient,
                    boxShadow: `0 4px 24px rgba(0,0,0,0.3)`
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: 'rgba(255,255,255,0.4)',
                    boxShadow: `0 8px 32px rgba(0,0,0,0.4)`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">View Our Success Stories</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

AboutCTA.displayName = 'AboutCTA';

export default AboutCTA;