import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout Components
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";

// Page Components
import Hero from "./Components/Hero.jsx";
import AboutUs from "./Components/AboutUs.jsx";
import Services from "./Components/Services.jsx";
import WhyPRSparkz from "./Components/WhyPRSparkz.jsx";
import FreeStrategyCall from "./Components/FreeStrategyCall.jsx";
import Portfolio from "./Components/Portfolio.jsx";
import Team from "./Components/Team.jsx";
import ServicesPage from "./Components/ServicesPage.jsx";
import ContactPage from "./Components/ContactPage.jsx";
import WhyChooseUsHeader from "./Components/WhyChooseUsHeader.jsx";

// UI Components
import Testimonials from "./Components/Testimonials.jsx";
import ContactForm from "./Components/ContactForm.jsx";

// Utility Components
import ScrollToTop from "./Components/ScrollToTop.jsx";

function App() {
  return (
    <div className="font-sans bg-black text-white relative overflow-x-hidden">
      {/* Content Layer */}
      <div className="relative overflow-x-hidden">
        <ScrollToTop />
        <NavBar />
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
        <Footer />
      </div>
    </div>
  );
}

export default App;
