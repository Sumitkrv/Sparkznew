import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Clients = React.memo(() => {
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const logoBrands = [
    { name: "Moon7", logo: "/images/Logos/moon7-logo1-.png" },
    { name: "PR Sparkz", logo: "/images/Logos/pr sparkz final logo_1.png" },
    { name: "TP Logo", logo: "/images/Logos/tp-logo-ph.png" },
    { name: "Vortex", logo: "/images/Logos/vortex logo.png" },
    { name: "Yellow", logo: "/images/Logos/yellow.png" },
    { name: "Vibhu Kitchen Equipments", logo: "/images/Logos/vibhu.png" }
  ];

  // Adjust marquee speed and duplication based on screen size
  const getMarqueeSpeed = () => {
    if (isMobile) return 40;
    if (window.innerWidth < 1024) return 35;
    return 30;
  };

  const getMarqueeDistance = () => {
    if (isMobile) return -1200;
    if (window.innerWidth < 1024) return -1400;
    return -1600;
  };

  const allLogos = [...logoBrands, ...logoBrands, ...logoBrands];

  return (
    <div ref={containerRef} id="clients" className="relative w-full overflow-hidden">
      {/* MOBILE LAYOUT: Video maintains aspect ratio (< xl) */}
      <section className="block xl:hidden w-full mt-[80px]">
        {/* Video Container - Maintains 16:9 aspect ratio */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%', background: 'linear-gradient(135deg, #7C3AED, #9333EA)' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute top-0 left-0 w-full h-full object-contain"
          >
            <source src="/sumit4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Subtle overlay on video */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20" />
        </div>
      </section>

      {/* DESKTOP LAYOUT: Full screen video (≥ xl) */}
      <section className="hidden xl:block relative w-full h-screen overflow-hidden mt-[88px]" style={{ background: 'linear-gradient(135deg, #7C3AED, #9333EA)' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ 
            objectPosition: 'center center'
          }}
        >
          <source src="/sumit4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />
      </section>

      {/* Logo Marquee Section */}
      <div className="relative py-12 md:py-16 overflow-hidden bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12 text-center px-4"
        >
          <h3 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#8666A5] mb-3 md:mb-4" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Trusted By Leading Brands
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-[#6b4d7a] max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
            Partnering with industry leaders to create exceptional results
          </p>
        </motion.div>

        {/* Infinite Logo Marquee */}
        <div className="relative py-6 md:py-8">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-32 z-20 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-32 z-20 pointer-events-none bg-gradient-to-l from-white to-transparent" />
          
          <motion.div
            className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12"
            animate={{
              x: [0, getMarqueeDistance()],
            }}
            transition={{
              duration: getMarqueeSpeed(),
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {allLogos.map((brand, index) => (
              <motion.div
                key={`${brand.name}-${index}`}
                className="group relative flex-shrink-0 w-24 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 lg:w-40 lg:h-28 xl:w-48 xl:h-32 rounded-lg md:rounded-xl backdrop-blur-sm flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 cursor-pointer bg-white"
                style={{
                  border: '1px solid #8666A5',
                  boxShadow: '0 2px 8px rgba(134, 102, 165, 0.1)',
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -4,
                  boxShadow: '0 6px 20px rgba(134, 102, 165, 0.15)',
                  transition: { duration: 0.2 }
                }}
                onMouseEnter={() => setHoveredLogo(brand.name)}
                onMouseLeave={() => setHoveredLogo(null)}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  
                  <motion.div
                    className="absolute inset-0 rounded-lg md:rounded-xl"
                    style={{
                      border: '1px solid transparent',
                    }}
                    animate={{
                      borderColor: hoveredLogo === brand.name ? 'rgba(134, 102, 165, 0.3)' : 'transparent',
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
});

Clients.displayName = 'Clients';

export default Clients;