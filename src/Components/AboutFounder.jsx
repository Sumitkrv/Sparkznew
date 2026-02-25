import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Crown,
  Palette,
  Target as TargetIcon,
  Rocket,
  Clock,
  Globe
} from "lucide-react";

// UPDATED COLOR PALETTE - WHITE BACKGROUND WITH PURPLE ACCENTS
const theme = {
  wisteria: "#8B5FBF",
  lavender: "#7B4CB2",
  orchid: "#6A39A5",
  mauve: "#5A2698",
  amethyst: "#4A138B",
  plum: "#3A007E",
  aubergine: "#2A0071",
  violet: "#1A0064",
  lightBg: "#F9F7FF",
  white: "#FFFFFF"
};

const cardGradient = `
  linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%),
  linear-gradient(135deg, rgba(139,95,191,0.05) 0%, rgba(123,76,178,0.03) 100%)
`;

const AboutFounder = React.memo(({ isVisible }) => {
  return (
    <motion.div
      className="mb-32 relative -mx-[100vw] px-[100vw]"
      style={{
        background: '#FFFFFF'
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div 
          className="relative"
          style={{
            background: theme.white
          }}>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left: Founder Image */}
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div 
                className="relative aspect-square rounded-2xl overflow-hidden"
                style={{
                  border: `2px solid rgba(139,95,191,0.2)`,
                  background: `rgba(139,95,191,0.05)`,
                  boxShadow: `
                    0 10px 40px rgba(139,95,191,0.1), 
                    0 0 0 1px rgba(139,95,191,0.1),
                    inset 0 1px 0 rgba(255,255,255,0.9)
                  `
                }}
              >
                <div className="relative h-full overflow-hidden">
                  <img 
                    src="/PR-FD.jpeg"
                    alt="Priyanka Rawat - Founder & CEO"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback */}
                  <div 
                    className="absolute inset-0 hidden items-center justify-center"
                    style={{
                      background: cardGradient
                    }}>
                    <div className="text-center p-8">
                      <Crown className="w-16 h-16 mx-auto mb-4" style={{ color: theme.amethyst }} />
                      <div className="text-2xl font-bold"
                           style={{ color: '#111827' }}>PRIYANKA</div>
                      <div className="text-sm font-medium" style={{ color: '#6B7280' }}>Founder & CEO</div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end p-4"
                     style={{
                       background: `linear-gradient(to top, rgba(255,255,255,0.95), transparent)`
                     }}>
                  <div>
                    <div className="font-bold text-lg" style={{ color: '#111827' }}>Priyanka Rawat</div>
                    <div className="text-sm" style={{ color: '#6B7280' }}>Founder & Owner, PR Sparkz</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12" style={{ background: 'rgba(139,95,191,0.4)' }}></div>
                <span className="text-sm font-semibold tracking-wider uppercase"
                      style={{ color: theme.amethyst }}>
                  The Journey
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ color: '#111827' }}>
                Priyanka Rawat
              </h2>
              
              <p className="text-lg sm:text-xl mb-6 font-light"
                 style={{ color: '#6B7280' }}>
                Founder & Owner, PR Sparkz
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <blockquote className="relative">
                <div className="absolute -left-6 top-0 text-4xl opacity-20"
                     style={{ color: theme.amethyst }}>
                  "
                </div>
                <p className="text-lg sm:text-xl italic border-l-4 pl-4 sm:pl-6 py-2 ml-2 sm:ml-4"
                   style={{ 
                     borderColor: theme.wisteria,
                     color: '#374151'
                   }}>
                  "For every brand problem, I build the solution."
                </p>
              </blockquote>
              
              <div className="space-y-4">
                <p className="leading-relaxed text-base sm:text-lg" style={{ color: '#4B5563' }}>
                  A <strong style={{ color: '#111827' }}>15-year journey</strong> from fashion design to entrepreneurship, Priyanka has 
                  mastered the art of turning challenges into opportunities. Her diverse experience across 
                  <strong style={{ color: '#111827' }}> fashion, events, politics, digital marketing, and brand strategy</strong> gives her 
                  a unique perspective on holistic brand growth.
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

AboutFounder.displayName = 'AboutFounder';

export default AboutFounder;
