import React from "react";
import { motion } from "framer-motion";

const WhyChooseUsHeader = () => (
  <section 
    className="relative bg-white overflow-hidden"
    style={{
      paddingTop: "clamp(60px, 8vw, 100px)",
      paddingBottom: "clamp(60px, 8vw, 100px)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'system-ui', sans-serif",
    }}
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-12"
      >
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
          Why Choose Us
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4"
          style={{ color: "#1F1F1F" }}
        >
          Transform Your Digital Presence
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We craft data-driven, AI-powered strategies that spark visibility, growth, and engagement—because your brand's success is ours.
        </p>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-6 md:gap-12"
      >
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">100+</p>
          <p className="text-xs md:text-sm text-gray-600 font-medium uppercase tracking-wide">Trusted by 100+ brands</p>
        </div>
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">4.9/5</p>
          <p className="text-xs md:text-sm text-gray-600 font-medium uppercase tracking-wide">4.9/5 rating</p>
        </div>
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">Award</p>
          <p className="text-xs md:text-sm text-gray-600 font-medium uppercase tracking-wide">Award-winning agency</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default WhyChooseUsHeader;
