import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Target,
  TrendingUp,
  PenTool,
  Crown,
  Palette,
  Target as TargetIcon,
  Rocket,
  Clock,
  Globe
} from "lucide-react";

// UPDATED COLOR PALETTE - WHITE BACKGROUND WITH PURPLE ACCENTS
const theme = {
  wisteria: "#8B5FBF",     // Darker purple for contrast on white
  lavender: "#7B4CB2",     // Medium purple
  orchid: "#6A39A5",       // Rich purple
  mauve: "#5A2698",        // Deep purple
  amethyst: "#4A138B",     // Royal purple
  plum: "#3A007E",         // Very deep purple
  aubergine: "#2A0071",    // Dark purple
  violet: "#1A0064",       // Darkest purple
  lightBg: "#F9F7FF",      // Very light purple background
  white: "#FFFFFF"         // Pure white
};

// Card gradient for consistent styling - updated for white background
const cardGradient = `
  linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%),
  linear-gradient(135deg, rgba(139,95,191,0.05) 0%, rgba(123,76,178,0.03) 100%)
`;

const AboutHeroSection = React.memo(({ isVisible }) => {
  return (
    <>
      {/* Professional Mission Section */}
      <motion.section
        className="py-24 px-4 sm:px-8 md:px-16 lg:px-0 bg-white relative"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Mission Statement */}
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-7 border-2"
              style={{
                borderColor: theme.amethyst,
                background: `linear-gradient(135deg, rgba(255,255,255,0.98) 0%, ${theme.wisteria}15 100%)`,
                boxShadow: `0 2px 12px ${theme.wisteria}22, inset 0 2px 4px #fff8`
              }}>
              <Sparkles className="w-5 h-5" style={{ color: theme.amethyst }} />
              <span className="text-base font-semibold tracking-wider uppercase" style={{ color: theme.amethyst }}>
                Our Why
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ color: '#18122B' }}>
              Elevating Brands<br className="hidden md:inline" />
              <span className="block bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${theme.wisteria}, ${theme.lavender}, ${theme.amethyst})` }}>
                Through Strategic Innovation
              </span>
            </h1>
            <blockquote className="text-xl sm:text-2xl font-light italic border-l-4 pl-6 py-4 rounded-r-lg mb-7"
              style={{ borderColor: theme.wisteria, background: `${theme.wisteria}0D`, color: '#3B3663' }}>
              "PR Sparkz was created to turn brand challenges into visibility, growth, and lasting impact."
            </blockquote>
            <p className="text-lg sm:text-xl leading-relaxed mb-4" style={{ color: '#4B5563' }}>
              Sparkz stands for light, energy, and brilliance. We empower brands to stand out through branding, web development, digital marketing, PR, and on-ground activations—delivering holistic solutions that drive measurable results.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: '#4B5563' }}>
              At PR Sparkz, we don’t just promote brands—we help them shine.
            </p>
          </div>
          {/* Right: The Sparkz Difference Card */}
          <div className="flex-1 min-w-0 w-full">
            <motion.div
              className="rounded-3xl shadow-xl border border-[rgba(139,95,191,0.18)] bg-white p-10 md:p-14 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #fff 80%, ${theme.wisteria}08 100%)`,
                boxShadow: `0 12px 48px ${theme.wisteria}18, 0 2px 8px #0001`
              }}
              whileHover={{
                boxShadow: `0 18px 64px ${theme.amethyst}22, 0 4px 16px #0002`,
                borderColor: theme.amethyst
              }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${theme.amethyst}55 0%, transparent 80%)` }} />
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border"
                  style={{ borderColor: theme.wisteria, background: `${theme.wisteria}10` }}>
                  <Crown className="w-5 h-5" style={{ color: theme.amethyst }} />
                  <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: theme.amethyst }}>
                    The Sparkz Difference
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mt-4 mb-2" style={{ color: '#18122B' }}>
                  Where challenges meet innovative solutions
                </h3>
                <p className="font-light text-base sm:text-lg" style={{ color: '#6B7280' }}>
                  Empowering brands to shine in a crowded world
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                {/* Strategy */}
                <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full mb-3 border-2"
                    style={{ borderColor: theme.lavender, background: `${theme.lavender}10` }}>
                    <Target className="w-7 h-7" style={{ color: theme.lavender }} />
                  </div>
                  <div className="font-semibold text-lg mb-1" style={{ color: theme.lavender }}>Strategy</div>
                  <div className="text-sm text-gray-500">Insight-driven planning for impactful brand growth.</div>
                </div>
                {/* Execution */}
                <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full mb-3 border-2"
                    style={{ borderColor: theme.amethyst, background: `${theme.amethyst}10` }}>
                    <PenTool className="w-7 h-7" style={{ color: theme.amethyst }} />
                  </div>
                  <div className="font-semibold text-lg mb-1" style={{ color: theme.amethyst }}>Execution</div>
                  <div className="text-sm text-gray-500">Creative, seamless delivery across every touchpoint.</div>
                </div>
                {/* Growth */}
                <div className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full mb-3 border-2"
                    style={{ borderColor: theme.wisteria, background: `${theme.wisteria}10` }}>
                    <TrendingUp className="w-7 h-7" style={{ color: theme.wisteria }} />
                  </div>
                  <div className="font-semibold text-lg mb-1" style={{ color: theme.wisteria }}>Growth</div>
                  <div className="text-sm text-gray-500">Sustainable results that elevate your brand’s future.</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
});

AboutHeroSection.displayName = 'AboutHeroSection';

export default AboutHeroSection;