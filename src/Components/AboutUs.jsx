import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSmoothScroll } from './SmoothScroll.jsx';
import { scrollToTop } from '../utils/navigation.js';
import AboutHeroSection from './AboutHeroSection';
import AboutFounder from './AboutFounder';
import AboutJourney from './AboutJourney';
import AboutValues from './AboutValues';
import AboutCTA from './AboutCTA';
import { 
  Diamond,
  Quote
} from "lucide-react";

const theme = {
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

const AboutUs = React.memo(() => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);
  const lenis = useSmoothScroll();

  // Force scroll to top when component mounts
  useEffect(() => {
    scrollToTop(lenis, true);
  }, [lenis]);

  const cardGradient = `
    linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.12) 75%, rgba(255,255,255,0.22) 100%),
    linear-gradient(135deg, ${theme.midnightPurple}FA 0%, ${theme.violet}F2 20%, ${theme.amethyst}ED 40%, ${theme.plum}E8 60%, ${theme.violet}EC 80%, ${theme.midnightPurple}F2 100%)
  `;

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden"
      style={{ 
        paddingBottom: 'clamp(3rem, 8vw, 6rem)',
        background: '#FFFFFF'
      }}
    >
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Hero Header */}
        <div className="relative -mx-[100vw] px-[100vw] mb-24 min-h-screen flex items-center overflow-hidden" style={{
          background: `linear-gradient(135deg, #1A0B2E 0%, #2D1B4E 50%, #4C1D95 100%)`,
          paddingTop: 'clamp(7rem, 12vw, 10rem)',
          paddingBottom: 'clamp(8rem, 15vw, 12rem)'
        }}>
          {/* Subtle Grid Overlay for Depth */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
            style={{
              backgroundImage: `linear-gradient(#C4B5FD 1px, transparent 1px), linear-gradient(90deg, #C4B5FD 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center py-24 relative"
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {/* Wisteria Top Accent */}
                <div className="flex items-center justify-center gap-4 mb-12 relative">
                  <div className="h-px w-20" style={{ background: `linear-gradient(90deg, transparent, ${theme.wisteria}80, transparent)` }}></div>
                  <motion.div 
                    className="relative"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Diamond className="w-6 h-6" style={{ color: theme.wisteria }} />
                  </motion.div>
                  <div className="h-px w-20" style={{ background: `linear-gradient(90deg, transparent, ${theme.wisteria}80, transparent)` }}></div>
                </div>
                {/* Main Headline */}
                <div className="relative mb-12">
                  <motion.h1 
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    PR SPARKZ
                  </motion.h1>
                  {/* Animated Metallic Underline */}
                  <div className="relative h-1 w-64 mx-auto overflow-hidden rounded-full">
                    <motion.div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${theme.lavender}, ${theme.orchid}, ${theme.amethyst}, ${theme.orchid}, ${theme.lavender}, transparent)`,
                        boxShadow: `0 0 25px ${theme.lavender}60, 0 0 50px ${theme.orchid}30`
                      }}
                      animate={{
                        x: ['-50%', '50%', '-50%'],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                        width: '30%'
                      }}
                      animate={{
                        x: ['-100%', '400%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </div>
                {/* Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-4xl mx-auto relative"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight px-12">
                    <span className="text-white">From Challenges to </span>
                    <span className="relative">
                      <span 
                        className="relative z-10 text-white"
                        style={{
                          textShadow: `0 2px 20px ${theme.wisteria}60`
                        }}>
                        Shining Solutions
                      </span>
                    </span>
                  </h2>
                  <p className="text-lg sm:text-xl text-white leading-relaxed font-light px-12" style={{ opacity: 0.9 }}>
                    We transform brand problems into visibility, growth, and lasting impact through 
                    comprehensive digital solutions and strategic execution.
                  </p>
                  <motion.div 
                    className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full relative overflow-hidden group"
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
                  >
                    <Quote className="w-5 h-5 relative z-10" style={{ color: '#FFFFFF' }} />
                    <span className="font-medium relative z-10 text-white">
                      "Brands come to us with problems. They leave with momentum."
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Mission & Founder Section */}
        <AboutHeroSection isVisible={isVisible} />
        {/* Founder Spotlight */}
        <AboutFounder isVisible={isVisible} />
        {/* Journey Timeline */}
        <AboutJourney isVisible={isVisible} />
        {/* Core Values */}
        <AboutValues isVisible={isVisible} />
        {/* CTA Section */}
        <AboutCTA isVisible={isVisible} />
      </div>
    </section>
  );
});

AboutUs.displayName = 'AboutUs';

export default AboutUs;
