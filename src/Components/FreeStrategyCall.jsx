import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Phone, Calendar, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FreeStrategyCall = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Premium Royal Purple Palette - Editorial Luxury
  const theme = {
    deepPurple: "#1A0B2E",
    royalViolet: "#4C1D95",
    electricPurple: "#7C3AED",
    lavenderGlow: "#C4B5FD",
    softLilac: "#E9D5FF",
    midViolet: "#6D28D9",
    darkPlum: "#2D1B4E",
    // Keep some old theme values for UI elements
    wisteria: "#E8D5FF",
    amethyst: "#9A6FFF",
    plum: "#8659D9",
    metallicText: "#1a1a1a",
    metallicBorder: "#C0C0C0"
  };

  const benefits = [
    "Analyze your current marketing performance",
    "Identify untapped growth opportunities",
    "Get a clear, actionable growth plan",
    "No commitment, no pressure, just value"
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${theme.deepPurple} 0%, ${theme.darkPlum} 50%, ${theme.royalViolet} 100%)`,
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{ 
                 background: 'rgba(196, 181, 253, 0.08)',
                 border: `1px solid ${theme.lavenderGlow}30`,
                 boxShadow: `0 4px 24px ${theme.electricPurple}15`
               }}>
            <Phone className="w-4 h-4" style={{ color: theme.lavenderGlow }} />
            <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: theme.softLilac }}>
              Free Strategy Call
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: 'white' }}>
            Get a Free{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r bg-clip-text text-transparent"
                    style={{ 
                      backgroundImage: `linear-gradient(135deg, ${theme.lavenderGlow}, ${theme.electricPurple})`
                    }}>
                Marketing Strategy Call
              </span>
              <div
                className="absolute bottom-1 left-0 right-0 h-3"
                style={{ backgroundColor: `${theme.electricPurple}/30` }}
              />
            </span>
          </h2>

          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: theme.softLilac, opacity: 0.9 }}>
            Not sure what's working for your brand? Get a free 15-minute strategy call where we analyze your current marketing and suggest a clear growth plan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl p-8"
                 style={{ 
                   background: 'white',
                   border: `1px solid ${theme.metallicBorder}`,
                   boxShadow: '0 4px 20px rgba(154, 111, 255, 0.1)'
                 }}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: theme.metallicText }}>
                <Calendar className="w-6 h-6" style={{ color: theme.amethyst }} />
                What You'll Get:
              </h3>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                         style={{ background: `${theme.amethyst}/10` }}>
                      <CheckCircle2 className="w-4 h-4" style={{ color: theme.amethyst }} />
                    </div>
                    <span className="text-base" style={{ color: theme.metallicText, opacity: 0.9 }}>
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right side - CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="rounded-2xl p-8 md:p-12 text-center w-full"
                 style={{ 
                   background: `linear-gradient(135deg, ${theme.plum}, ${theme.amethyst})`,
                   boxShadow: '0 8px 32px rgba(154, 111, 255, 0.3)'
                 }}>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                     style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Ready to Grow?
                </h3>
                <p className="text-white/90 text-base">
                  Take the first step towards accelerated growth
                </p>
              </div>

              <motion.button
                onClick={() => {
                  navigate('/contact');
                  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                }}
                className="w-full px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                style={{
                  background: 'white',
                  color: theme.amethyst
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Free Strategy Call
              </motion.button>

              <p className="text-white/70 text-xs mt-4">
                100% Free • No Credit Card Required
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FreeStrategyCall;
