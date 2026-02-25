import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar,
  Palette,
  Home,
  Target as TargetIcon,
  PenTool,
  Laptop,
  Users,
  Rocket,
  TrendingUp
} from "lucide-react";

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

const AboutJourney = React.memo(({ isVisible }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const wisteriaGradient = `linear-gradient(135deg, ${theme.wisteria}, ${theme.lavender}, ${theme.orchid})`;
  const lavenderGradient = `linear-gradient(135deg, ${theme.lavender}, ${theme.orchid}, ${theme.mauve})`;
  const amethystGradient = `linear-gradient(135deg, ${theme.amethyst}, ${theme.orchid}, ${theme.plum})`;

  const journeyMilestones = [
    {
      year: "2008",
      title: "Creative Beginning",
      description: "Began career in Fashion Designing with fashion shows and creative styling",
      icon: Palette,
      color: wisteriaGradient
    },
    {
      year: "2010",
      title: "Stepping into Events",
      description: "Transitioned into Event Management as Event & Kiosk Planner",
      icon: Calendar,
      color: lavenderGradient
    },
    {
      year: "2011-2017",
      title: "Foundation Years",
      description: "Strengthened core skills in organization and planning",
      icon: Home,
      color: amethystGradient
    },
    {
      year: "2018",
      title: "The Comeback",
      description: "Contributed to Kamal Nath Ji political campaign planning",
      icon: TargetIcon,
      color: `linear-gradient(135deg, ${theme.plum}, ${theme.amethyst})`
    },
    {
      year: "2019-2020",
      title: "Creative Execution",
      description: "Event Theming & Concept Development",
      icon: PenTool,
      color: `linear-gradient(135deg, ${theme.amethyst}, ${theme.lavender})`
    },
    {
      year: "2021-2022",
      title: "Digital Expansion",
      description: "Digital Marketing under CD, managing platforms and IDE projects",
      icon: Laptop,
      color: `linear-gradient(135deg, ${theme.lavender}, ${theme.orchid})`
    },
    {
      year: "2022-2023",
      title: "Independent Growth",
      description: "Freelancer across events, digital, and brand assignments",
      icon: Users,
      color: `linear-gradient(135deg, ${theme.orchid}, ${theme.mauve})`
    },
    {
      year: "Sept 2023",
      title: "PR Sparkz Born",
      description: "Launched digital marketing company, first client: Vortex",
      icon: Rocket,
      color: `linear-gradient(135deg, ${theme.mauve}, ${theme.amethyst})`
    },
    {
      year: "2024-2025",
      title: "Scaling Brands",
      description: "Working with multiple brands for digital growth and execution",
      icon: TrendingUp,
      color: `linear-gradient(135deg, ${theme.violet}, ${theme.wisteria})`
    }
  ];

  return (
    <div className="mb-32 relative -mx-[100vw] px-[100vw] overflow-hidden" style={{
      background: `linear-gradient(135deg, ${theme.deepPurple} 0%, ${theme.darkPlum} 50%, ${theme.royalViolet} 100%)`
    }}>
      {/* Animated Background System - Light Beams Breaking Through */}
      {!isMobile && (
      <>
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
        {/* Grid Pattern Overlay - Subtle Depth */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${theme.lavenderGlow} 1px, transparent 1px), linear-gradient(90deg, ${theme.lavenderGlow} 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
             style={{
               border: `1px solid rgba(255,255,255,0.2)`,
               background: cardGradient,
               boxShadow: `0 4px 24px rgba(0,0,0,0.3)`
             }}>
          <Calendar className="w-4 h-4" style={{ color: '#FFFFFF' }} />
          <span className="text-sm font-semibold tracking-wider uppercase text-white">
            The Journey
          </span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          <span className="text-white">From Fashion to </span>
          <span className="text-white" style={{ textShadow: `0 2px 20px ${theme.wisteria}60` }}>
            Digital Entrepreneurship
          </span>
        </h2>
        
        <p className="text-white text-lg max-w-2xl mx-auto font-light" style={{ opacity: 0.9 }}>
          A 15-year evolution of skills, experiences, and entrepreneurial spirit
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Timeline Line - hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
             style={{
               background: `linear-gradient(to bottom, transparent, ${theme.wisteria}30, ${theme.lavender}60, ${theme.amethyst}30, transparent)`,
               boxShadow: `0 0 20px ${theme.wisteria}20`
             }} />
        
        <div className="space-y-8 sm:space-y-12">
          {journeyMilestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className={`flex items-center gap-4 md:gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-left pl-0`}>
                    <motion.div
                      className="inline-block p-4 sm:p-6 rounded-xl sm:rounded-2xl w-full md:max-w-md relative overflow-hidden"
                      style={{
                        border: `1px solid rgba(255,255,255,0.4)`,
                        borderTop: `2px solid rgba(255,255,255,0.65)`,
                        borderLeft: `1.5px solid rgba(255,255,255,0.5)`,
                        background: `
                          linear-gradient(145deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.18) 70%, rgba(255,255,255,0.25) 100%),
                          linear-gradient(135deg, ${theme.midnightPurple}F8 0%, ${theme.violet}F0 25%, ${theme.amethyst}EC 50%, ${theme.plum}E8 75%, ${theme.violet}ED 100%)
                        `,
                        boxShadow: `
                          0 18px 60px rgba(0,0,0,0.8),
                          0 8px 25px rgba(0,0,0,0.5),
                          0 0 0 1px rgba(255,255,255,0.35),
                          inset 0 3px 6px rgba(255,255,255,0.6),
                          inset 0 -3px 10px rgba(0,0,0,0.4),
                          inset 0 0 40px rgba(255,255,255,0.12)
                        `
                      }}
                      whileHover={{ 
                        scale: 1.03, 
                        y: -8,
                        borderColor: 'rgba(255,255,255,0.5)',
                        boxShadow: `
                          0 25px 70px rgba(0,0,0,0.9),
                          0 12px 35px rgba(154,111,255,0.4),
                          0 0 0 1px rgba(255,255,255,0.45),
                          inset 0 4px 8px rgba(255,255,255,0.7),
                          inset 0 -4px 12px rgba(0,0,0,0.5),
                          inset 0 0 50px rgba(255,255,255,0.18)
                        `
                      }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ 
                            background: milestone.color,
                            border: `1px solid rgba(255,255,255,0.2)`,
                            boxShadow: `0 4px 24px rgba(0,0,0,0.3)`
                          }}
                          whileHover={{ 
                            scale: 1.1, 
                            rotate: 5,
                            boxShadow: `0 6px 30px rgba(0,0,0,0.4)`
                          }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <div className="text-2xl font-bold text-white">
                            {milestone.year}
                          </div>
                          <h4 className="text-lg font-bold text-white">{milestone.title}</h4>
                        </div>
                      </div>
                      <p className="text-white relative z-10" style={{ opacity: 0.9 }}>{milestone.description}</p>
                      
                      {/* Special highlight for PR Sparkz launch */}
                      {milestone.year === "Sept 2023" && (
                        <div 
                          className="mt-4 p-3 rounded-lg"
                          style={{
                            border: `1px solid rgba(255,255,255,0.2)`,
                            background: cardGradient,
                            boxShadow: `0 4px 24px rgba(0,0,0,0.3)`
                          }}>
                          <div className="flex items-center gap-2">
                            <Rocket className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                            <span className="text-sm font-medium text-white">
                              First Client: Vortex • Branding, Strategy & Execution
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Center Dot - hidden on mobile */}
                  <div className="hidden md:block relative z-10">
                    <motion.div
                      className="w-6 h-6 rounded-full border-2"
                      style={{ 
                        background: milestone.color,
                        borderColor: theme.midnightPurple,
                        boxShadow: `0 0 15px ${milestone.color}`
                      }}
                      whileHover={{ scale: 1.5 }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: index * 0.5
                      }}
                    />
                  </div>
                  
                  {/* Spacer - hidden on mobile */}
                  <div className="hidden md:block flex-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
    </div>
    </div>
  );
});

AboutJourney.displayName = 'AboutJourney';

export default AboutJourney;
