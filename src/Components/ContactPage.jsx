import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, ShieldCheck } from "lucide-react";

const theme = {
  primary: "#5B3A8F",
  secondary: "#9A6FFF",
  accent: "#25D366"
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "f54f79a1-d81b-47e6-a21b-f268740ebcba",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          from_name: "PR Sparkz Contact Form",
          subject: "New Contact Form Submission"
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-20 -mt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-gray-900">
            Get Your Free Strategy Call
          </h2>

          <p className="text-center text-gray-600 mb-10">
            Takes less than 60 seconds · No spam · No obligation
          </p>

          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center">
              ✓ Thank you! We'll contact you within 24 hours.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center">
              Something went wrong. Please try again or contact us directly.
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              required
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address (optional)"
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone / WhatsApp Number"
              required
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Briefly tell us about your goal (optional)"
              rows="4"
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl text-lg font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
              }}
            >
              {isSubmitting ? "Sending..." : "Get Free Strategy Call →"}
            </button>

            <p className="text-center text-sm text-gray-500">
              ✔ Response within 24 hours · ✔ Real experts · ✔ No spam
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const ContactPage = () => {
  const [visible] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* HERO */}
      <div
        className="relative text-center text-white min-h-screen flex flex-col justify-center items-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1A0B2E 0%, #2D1B4E 50%, #4C1D95 100%)",
          paddingTop: "clamp(7rem, 12vw, 10rem)",
          paddingBottom: "clamp(8rem, 15vw, 12rem)"
        }}
      >
        {/* Subtle Grid Overlay for Depth */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(#C4B5FD 1px, transparent 1px), linear-gradient(90deg, #C4B5FD 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="relative z-10 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black mb-6 px-4"
          >
            Get a Free Growth Strategy for Your Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 px-4"
          >
            Tell us about your goals and our experts will reach out within
            <span className="font-semibold"> 24 hours </span>
            with a clear action plan.
          </motion.p>

          {/* TRUST */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/85 text-sm px-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} /> No spam. No pressure.
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} /> 24-hour response
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} /> Real human support
            </div>
          </div>

          {/* QUICK CONTACT */}
          <div className="grid md:grid-cols-2 gap-6 mt-14 max-w-4xl mx-auto px-4">
            <a
              href="mailto:info@prsparkz.com"
              className="rounded-2xl p-6 bg-white/15 backdrop-blur border border-white/30 transition-all duration-300 hover:bg-white/25 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <Mail className="mx-auto mb-3" />
              <p className="font-semibold">Email</p>
              <p className="text-white/80 text-sm">info@prsparkz.com</p>
            </a>
            
            <div
              className="rounded-2xl p-6 bg-white/15 backdrop-blur border border-white/30 transition-all duration-300 hover:bg-white/25 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <Clock className="mx-auto mb-3" />
              <p className="font-semibold">Hours</p>
              <p className="text-white/80 text-sm">Mon–Fri · 9AM–6PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <ContactForm />

      {/* WHATSAPP CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl p-10 text-center border"
          style={{
            background: "linear-gradient(135deg, #1A0B2E 0%, #2D1B4E 50%, #4C1D95 100%)",
            borderColor: "#4C1D95"
          }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
            Prefer instant conversation?
          </h3>

          <p className="text-gray-600 mb-8">
            Chat directly with our team on WhatsApp
          </p>

          <a
            href="https://wa.me/917738715711?text=Hi%2C%20I%27m%20interested%20in%20PR%20Sparkz%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white transition-transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}, #128C7E)`
            }}
          >
            Chat on WhatsApp →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
