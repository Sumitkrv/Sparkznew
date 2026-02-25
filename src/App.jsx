import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Layout Components
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";

// Critical above-fold component - load immediately
import Hero from "./Components/Hero.jsx";

// Lazy load heavy components
const Services = lazy(() => import("./Components/Services.jsx"));
const WhyPRSparkz = lazy(() => import("./Components/WhyPRSparkz.jsx"));
const Testimonials = lazy(() => import("./Components/Testimonials.jsx"));
const FreeStrategyCall = lazy(() => import("./Components/FreeStrategyCall.jsx"));
const WhyChooseUsHeader = lazy(() => import("./Components/WhyChooseUsHeader.jsx"));
const AboutUs = lazy(() => import("./Components/AboutUs.jsx"));
const ServicesPage = lazy(() => import("./Components/ServicesPage.jsx"));
const ContactPage = lazy(() => import("./Components/ContactPage.jsx"));
const Portfolio = lazy(() => import("./Components/Portfolio.jsx"));
const Team = lazy(() => import("./Components/Team.jsx"));

// Utility Components
import ScrollToTop from "./Components/ScrollToTop.jsx";

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  </div>
);

function App() {
  return (
    <div className="font-sans bg-black text-white relative overflow-x-hidden">
      {/* Content Layer */}
      <div className="relative overflow-x-hidden">
        <ScrollToTop />
        <NavBar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <WhyChooseUsHeader />
                  <Services />
                  <WhyPRSparkz />
                  <FreeStrategyCall />
                  <Testimonials />
                </>
              }
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}

export default App;
