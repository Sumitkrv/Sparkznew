import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const WhyPRSparkz = React.memo(() => {
  const navigate = useNavigate();

  const features = [
    {
      number: "01",
      title: "Strategy First, Execution Second",
      description: "We don't jump into tactics. Every campaign starts with a clear strategy aligned to your business goals.",
      points: [
        "Detailed audience research and market analysis",
        "Custom roadmap built for sustainable growth",
        "Clear milestones and success metrics from day one"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80",
    },
    {
      number: "02",
      title: "Data-Driven Campaigns, Not Guesswork",
      description: "Every decision is backed by data. We track, analyze, and optimize continuously to maximize results.",
      points: [
        "Real-time analytics and performance tracking",
        "A/B testing to identify what works best",
        "Transparent reporting with actionable insights"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80",
    },
    {
      number: "03",
      title: "ROI-Focused Marketing Decisions",
      description: "We're here to grow your business, not inflate vanity metrics. Every dollar spent is measured against real returns.",
      points: [
        "Focus on conversions and qualified leads",
        "Budget optimization for maximum efficiency",
        "Clear ROI tracking on every campaign"
      ],
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&q=80",
    }
  ];

  return (
    <section
      id="why-pr-sparkz"
      className="relative bg-white overflow-hidden"
      style={{
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'system-ui', sans-serif",
      }}
      aria-label="Why Choose PRSparkz"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            What Makes Us Different
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            More than an agency — we're your growth partner
          </h3>
        </motion.div>

        {/* Carousel Section for Features */}
        <WhyPRSparkzCarousel features={features} />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-100 rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="inline-block bg-blue-600 text-white text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full mb-4">
            Limited Time Offer
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Digital Presence?
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Book your strategy session and discover how our proven methodologies can deliver measurable growth for your business.
          </p>
          
          <button
            onClick={() => {
              navigate('/contact');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
            className="bg-gray-900 text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-gray-800 transition-colors duration-300 mb-8"
          >
            Schedule Free Consultation
          </button>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm">
              <span className="text-blue-600">✓</span>
              <span className="text-gray-700">No long-term contracts</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm">
              <span className="text-blue-600">✓</span>
              <span className="text-gray-700">Flexible month-to-month plans</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm">
              <span className="text-blue-600">✓</span>
              <span className="text-gray-700">Results guaranteed</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm">
              <span className="text-blue-600">✓</span>
              <span className="text-gray-700">Performance-based approach</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

WhyPRSparkz.displayName = 'WhyPRSparkz';

// Carousel component for WhyPRSparkz features
function WhyPRSparkzCarousel({ features }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  // Auto-rotation every 6 seconds (reduced on mobile)
  React.useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const rotationTime = isMobile ? 8000 : 6000;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, rotationTime);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleNext = () => setCurrentIndex((index) => (index + 1) % features.length);
  const handlePrevious = () => setCurrentIndex((index) => (index - 1 + features.length) % features.length);
  
  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      handleNext();
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      handlePrevious();
    }
  };

  const currentFeature = features[currentIndex];

  return (
    <div 
      className="w-full max-w-5xl mx-auto px-4 mb-16"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Desktop layout */}
      <div className="hidden md:flex relative items-center">
        {/* Image */}
        <div className="w-[420px] h-[320px] rounded-3xl overflow-hidden bg-gray-200 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <img
                src={currentFeature.image}
                alt={currentFeature.title}
                width={420}
                height={320}
                className="w-full h-full object-cover"
                draggable={false}
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 ml-[-60px] z-10 max-w-xl flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="mb-6">
                <div className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full mb-3">
                  {currentFeature.number}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentFeature.title}
                </h2>
              </div>
              <p className="text-black text-base leading-relaxed mb-6">
                {currentFeature.description}
              </p>
              <ul className="space-y-2 mb-4">
                {currentFeature.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden max-w-sm mx-auto text-center bg-transparent">
        {/* Image */}
        <div className="w-full aspect-video bg-gray-200 rounded-3xl overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <img
                src={currentFeature.image}
                alt={currentFeature.title}
                width={400}
                height={240}
                className="w-full h-full object-cover"
                draggable={false}
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card content */}
        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full mb-3">
                {currentFeature.number}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {currentFeature.title}
              </h2>
              <p className="text-black text-sm leading-relaxed mb-4">
                {currentFeature.description}
              </p>
              <ul className="space-y-2 mb-4">
                {currentFeature.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default WhyPRSparkz;
