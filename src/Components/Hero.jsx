import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleCTAClick = useCallback(() => {
    navigate('/contact');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }, [navigate]);

  return (
    <>
      {/* MOBILE LAYOUT: Video above, CTA below (< 768px) */}
      <section className="block md:hidden w-full mt-[80px]">
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
            <source src="/sumit3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Subtle overlay on video */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20" />
        </div>

        {/* CTA Section - Below Video */}
        <div className="w-full bg-gradient-to-b from-white via-[#FAFAFA] to-white py-8 px-4">
          <div className="max-w-md mx-auto text-center space-y-4">
            <button 
              onClick={handleCTAClick}
              className="
                w-full max-w-xs mx-auto block
                px-6 py-3.5 
                rounded-xl 
                font-bold text-sm tracking-wide
                shadow-2xl shadow-purple-500/20
                hover:shadow-purple-500/40 hover:scale-105
                transform transition-all duration-300 ease-out
                active:scale-95
                focus:outline-none focus:ring-4 focus:ring-purple-400/50
              "
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 50%, #8B5CF6 100%)',
                color: '#FFFFFF'
              }}
            >
              Get Free Marketing Strategy Call
            </button>
            <p className="text-slate-600 text-xs leading-relaxed px-4">
              Trusted by growing startups, founders & brands across industries.
            </p>
          </div>
        </div>
      </section>

      {/* TABLET (md/lg): Button & text above video, like mobile */}
      <section className="hidden md:block xl:hidden w-full mt-[88px] bg-gradient-to-b from-white via-[#FAFAFA] to-white">
        {/* Video First, then CTA Section - for iPad/tablet */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%', background: 'linear-gradient(135deg, #7C3AED, #9333EA)' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute top-0 left-0 w-full h-full object-contain"
          >
            <source src="/sumit3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20" />
        </div>
        {/* CTA Section - Below Video */}
        <div className="w-full py-10 px-4">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <button 
              onClick={handleCTAClick}
              className="
                w-full max-w-md mx-auto block
                px-8 py-4
                rounded-2xl 
                font-bold text-base tracking-wide
                shadow-2xl shadow-purple-500/20
                hover:shadow-purple-500/40 hover:scale-105
                transform transition-all duration-300 ease-out
                active:scale-95
                focus:outline-none focus:ring-4 focus:ring-purple-400/50
                backdrop-blur-sm
              "
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 50%, #8B5CF6 100%)',
                color: '#FFFFFF'
              }}
            >
              Get Free Marketing Strategy Call
            </button>
            <p className="text-slate-700 text-base font-medium tracking-wide">
              Trusted by growing startups, founders & brands across industries.
            </p>
          </div>
        </div>
      </section>

      {/* DESKTOP (xl+): Video with overlaid CTA */}
      <section className="hidden xl:block relative w-full h-screen mt-[88px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #7C3AED, #9333EA)' }}>
        {/* Background Video - Full coverage */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/sumit3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/60" />
        {/* CTA Overlay - Centered bottom */}
        <div className="absolute inset-x-0 bottom-0 pb-24 xl:pb-32">
          <div className="max-w-3xl mx-auto text-center px-6 space-y-5">
            <button 
              onClick={handleCTAClick}
              className="
                inline-block
                px-10 py-5
                rounded-2xl 
                font-bold text-lg tracking-wide
                shadow-2xl shadow-purple-500/30
                hover:shadow-purple-400/50 hover:scale-105 hover:-translate-y-1
                transform transition-all duration-300 ease-out
                active:scale-95
                focus:outline-none focus:ring-4 focus:ring-purple-400/60
                backdrop-blur-sm
              "
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 50%, #8B5CF6 100%)',
                color: '#FFFFFF'
              }}
            >
              Get Free Marketing Strategy Call
            </button>
            <p className="text-white/90 text-base font-medium tracking-wide">
              Trusted by growing startups, founders & brands across industries.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}