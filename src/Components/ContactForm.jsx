import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  User, Mail, FileText, CheckCircle, Phone, Send, 
  Loader2, AlertCircle, Clock,
  MessageSquare, Building, Map,
  Linkedin,  Instagram
} from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    website: "",
    message: "",
    subject: "General Inquiry"
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Purple Color Palette
  const theme = {
    wisteria: "#E8D5FF",        // Lightest purple
    lavender: "#D4BDFF",
    orchid: "#C19EFF",
    mauve: "#AD85FF",
    amethyst: "#9A6FFF",
    plum: "#8659D9",
    aubergine: "#7343C0",
    violet: "#5E2FA8",
    midnightPurple: "#4A1F8F",  // Darkest purple
    headerGradient1: "#5B3A8F",
    headerGradient2: "#6B4FA0",
    headerGradient3: "#7B5FB5",
    metallicText: "#1a1a1a",
    metallicBorder: "#C0C0C0"
  };

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 1]);

  const WEB3FORMS_ACCESS_KEY = "f54f79a1-d81b-47e6-a21b-f268740ebcba";

  // Contact options with subjects
  const contactSubjects = [
    { value: "Influence Marketing", label: "Influence Marketing" },
    { value: "Brand Identity", label: "Brand Identity" },
    { value: "Web Development", label: "Web Development" },
    { value: "On-Ground Events", label: "On-Ground Events" },
    { value: "Support", label: "Technical Support" },
    { value: "Other", label: "Other" }
  ];

  // Company information
  const companyInfo = {
    email: "Info@prsparkz.com",
    phone: "+91 77387 15711",
    whatsapp: "917738715711",
    address: "402, RG Trade Tower, Netaji Subhash Palace, Pitampura, Delhi, 110034",
    workingHours: "Monday - Friday: 9:00 AM - 6:00 PM",
    social: {
      linkedin: "https://www.linkedin.com/in/priyanka-khandelwal-08370b240/",
     
      instagram: "https://www.instagram.com/pr_sparkz?igsh=MTZtbm01cnZ6a3V0Zw%3D%3D"
    }
  };

  // Validation functions
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.businessName.trim()) {
      errors.businessName = "Business name is required";
    } else if (formData.businessName.trim().length < 2) {
      errors.businessName = "Business name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim() && !formErrors[name]) {
      const errors = validateForm();
      setFormErrors(prev => ({ ...prev, [name]: errors[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", WEB3FORMS_ACCESS_KEY);
    formDataToSend.append("name", formData.name.trim());
    formDataToSend.append("businessName", formData.businessName.trim());
    formDataToSend.append("email", formData.email.trim());
    formDataToSend.append("phone", formData.phone.trim());
    formDataToSend.append("website", formData.website.trim() || "Not provided");
    formDataToSend.append("message", formData.message.trim());
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("from_name", "PRSparkz Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formDataToSend
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        setTimeout(() => {
          setFormData({ name: "", email: "", phone: "", businessName: "", website: "", message: "", subject: "General Inquiry" });
        }, 100);
        
        if (window.gtag) {
          window.gtag('event', 'contact_form_submit', {
            'event_category': 'engagement',
            'event_label': formData.subject
          });
        }
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      setSubmitError(true);
      
      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", businessName: "", website: "", message: "", subject: "General Inquiry" });
    setFormErrors({});
    setIsSubmitted(false);
    setSubmitError(false);
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = document.querySelector('textarea[name="message"]');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formData.message]);

  // Character counter for message
  const messageLength = formData.message.length;
  const maxMessageLength = 1000;

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="min-h-screen py-16 px-4 md:px-8"
      style={{ 
        fontFamily: "'Montserrat', sans-serif",
        background: `linear-gradient(135deg, white, ${theme.wisteria})`
      }}
    >
      <motion.div 
        className="max-w-7xl mx-auto"
        style={{ y, opacity }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                 style={{ 
                   background: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`
                 }}>
              <MessageSquare className="text-white" size={24} />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`
                }}>
              Contact Us
            </h2>
          </div>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: theme.metallicText, opacity: 0.8 }}>
            Let's start a conversation about your next big project
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Cards */}
            <div className="rounded-2xl p-8"
                 style={{ 
                   background: `linear-gradient(135deg, white, ${theme.wisteria})`,
                   border: `1px solid ${theme.metallicBorder}`
                 }}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"
                  style={{ color: theme.metallicText }}>
                <Building size={24} style={{ color: theme.amethyst }} />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-white/50">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: theme.wisteria }}>
                    <Mail size={20} style={{ color: theme.amethyst }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: theme.metallicText }}>Email Address</h4>
                    <a 
                      href={`mailto:${companyInfo.email}`}
                      className="font-medium transition-colors"
                      style={{ color: theme.amethyst }}
                    >
                      {companyInfo.email}
                    </a>
                    <p className="text-sm mt-1" style={{ color: theme.metallicText, opacity: 0.6 }}>Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-white/50">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: theme.wisteria }}>
                    <Phone size={20} style={{ color: theme.amethyst }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: theme.metallicText }}>Phone Number</h4>
                    <a 
                      href={`tel:${companyInfo.phone}`}
                      className="font-medium transition-colors"
                      style={{ color: theme.amethyst }}
                    >
                      {companyInfo.phone}
                    </a>
                    <p className="text-sm mt-1" style={{ color: theme.metallicText, opacity: 0.6 }}>Mon-Fri, 9AM-6PM IST</p>
                  </div>

                <div className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-white/50">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: '#25D366' }}>
                    <MessageSquare size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: theme.metallicText }}>WhatsApp</h4>
                    <a 
                      href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%2C%20I%27m%20interested%20in%20PR%20Sparkz%20services`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium transition-colors"
                      style={{ color: theme.amethyst }}
                    >
                      {companyInfo.phone}
                    </a>
                    <p className="text-sm mt-1" style={{ color: theme.metallicText, opacity: 0.6 }}>Quick response 24/7</p>
                  </div>
                </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${theme.metallicBorder}` }}>
                <h4 className="font-semibold mb-4" style={{ color: theme.metallicText }}>Follow Us</h4>
                <div className="flex gap-4">
                  <a
                    href={companyInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.wisteria}, white)`,
                      color: theme.metallicText,
                      border: `1px solid ${theme.metallicBorder}`
                    }}
                    aria-label="Follow us on LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                 
                  <a
                    href={companyInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.wisteria}, white)`,
                      color: theme.metallicText,
                      border: `1px solid ${theme.metallicBorder}`
                    }}
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Contact Form */}
            <div className="rounded-2xl overflow-hidden"
                 style={{ 
                   background: `linear-gradient(135deg, white, ${theme.wisteria})`,
                   border: `1px solid ${theme.metallicBorder}`
                 }}>
                {isSubmitted ? (
                  <div className="text-center py-16 px-8">
                    <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full animate-success-pulse"
                         style={{ 
                           background: `linear-gradient(135deg, #10B981, #059669)`
                         }}>
                      <CheckCircle size={48} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3" style={{ color: theme.metallicText }}>Success! 🎉</h3>
                    <p className="mb-4 max-w-md mx-auto" style={{ color: theme.metallicText, opacity: 0.8 }}>
                      Your message has been sent successfully. We'll contact you within 24 hours.
                    </p>
                    <div className="rounded-xl p-6 max-w-md mx-auto mb-8"
                         style={{ 
                           background: `linear-gradient(135deg, ${theme.wisteria}/20, white)`
                         }}>
                      <h4 className="font-semibold mb-2" style={{ color: theme.metallicText }}>What happens next?</h4>
                      <ul className="text-left space-y-2 text-sm" style={{ color: theme.metallicText, opacity: 0.8 }}>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }}></div>
                          You'll receive a confirmation email
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }}></div>
                          Our team will review your inquiry
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }}></div>
                          We'll schedule a call if needed
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={resetForm}
                      className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`,
                        color: 'white'
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="p-8">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: theme.metallicText }}>Book Your Free Strategy Call</h3>
                      <p style={{ color: theme.metallicText, opacity: 0.8 }}>Fill in your details and our team will contact you within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2" style={{ color: theme.metallicText }}>
                            Full Name *
                          </label>
                          <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2" 
                                  style={{ color: theme.amethyst }} />
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all ${
                                formErrors.name 
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                  : `border-[${theme.metallicBorder}] focus:border-[${theme.amethyst}] focus:ring-[${theme.amethyst}]/20`
                              }`}
                              placeholder="Rahul Sharma"
                              disabled={isSubmitting}
                              style={{ color: theme.metallicText }}
                            />
                          </div>
                          {formErrors.name && (
                            <p className="mt-2 text-sm flex items-center gap-1" style={{ color: '#EF4444' }}>
                              <AlertCircle size={14} /> {formErrors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2" style={{ color: theme.metallicText }}>
                            Business Name *
                          </label>
                          <div className="relative">
                            <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2" 
                                  style={{ color: theme.amethyst }} />
                            <input
                              type="text"
                              name="businessName"
                              required
                              value={formData.businessName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all ${
                                formErrors.businessName 
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                  : `border-[${theme.metallicBorder}] focus:border-[${theme.amethyst}] focus:ring-[${theme.amethyst}]/20`
                              }`}
                              placeholder="Your Company Name"
                              disabled={isSubmitting}
                              style={{ color: theme.metallicText }}
                            />
                          </div>
                          {formErrors.businessName && (
                            <p className="mt-2 text-sm flex items-center gap-1" style={{ color: '#EF4444' }}>
                              <AlertCircle size={14} /> {formErrors.businessName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2" style={{ color: theme.metallicText }}>
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2" 
                                  style={{ color: theme.amethyst }} />
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all ${
                                formErrors.phone 
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                  : `border-[${theme.metallicBorder}] focus:border-[${theme.amethyst}] focus:ring-[${theme.amethyst}]/20`
                              }`}
                              placeholder="+91 77387 15711"
                              disabled={isSubmitting}
                              style={{ color: theme.metallicText }}
                            />
                          </div>
                          {formErrors.phone && (
                            <p className="mt-2 text-sm flex items-center gap-1" style={{ color: '#EF4444' }}>
                              <AlertCircle size={14} /> {formErrors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2" style={{ color: theme.metallicText }}>
                            Email *
                          </label>
                          <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" 
                                  style={{ color: theme.amethyst }} />
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all ${
                                formErrors.email 
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                  : `border-[${theme.metallicBorder}] focus:border-[${theme.amethyst}] focus:ring-[${theme.amethyst}]/20`
                              }`}
                              placeholder="rahul.sharma@example.com"
                              disabled={isSubmitting}
                              style={{ color: theme.metallicText }}
                            />
                          </div>
                          {formErrors.email && (
                            <p className="mt-2 text-sm flex items-center gap-1" style={{ color: '#EF4444' }}>
                              <AlertCircle size={14} /> {formErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: theme.metallicText }}>
                          Website / Instagram Handle
                        </label>
                        <div className="relative">
                          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: theme.amethyst }} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                          </svg>
                          <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all"
                            style={{ 
                              borderColor: theme.metallicBorder,
                              color: theme.metallicText
                            }}
                            placeholder="yourwebsite.com or @yourbrand"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2" style={{ color: theme.metallicText }}>
                            Subject *
                          </label>
                          <div className="relative">
                            <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2" 
                                      style={{ color: theme.amethyst }} />
                            <select
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white focus:outline-none focus:border-[#7B68EE] focus:ring-2 focus:ring-[#7B68EE]/20 transition-all appearance-none cursor-pointer"
                              style={{ 
                                borderColor: theme.metallicBorder,
                                color: theme.metallicText 
                              }}
                              disabled={isSubmitting}
                            >
                              {contactSubjects.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                   style={{ color: theme.amethyst }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-semibold" style={{ color: theme.metallicText }}>
                            Your Message *
                          </label>
                          <span className={`text-sm ${
                            messageLength > maxMessageLength ? 'text-red-600' : 'text-gray-500'
                          }`}>
                            {messageLength}/{maxMessageLength}
                          </span>
                        </div>
                        <div className="relative">
                          <FileText size={18} className="absolute left-4 top-4" 
                                    style={{ color: theme.amethyst }} />
                          <textarea
                            name="message"
                            rows="5"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={maxMessageLength}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all resize-none ${
                              formErrors.message 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                : `border-[${theme.metallicBorder}] focus:border-[${theme.amethyst}] focus:ring-[${theme.amethyst}]/20`
                            }`}
                            placeholder="Tell us about your project, timeline, and budget..."
                            disabled={isSubmitting}
                            style={{ color: theme.metallicText }}
                          />
                        </div>
                        {formErrors.message && (
                          <p className="mt-2 text-sm flex items-center gap-1" style={{ color: '#EF4444' }}>
                            <AlertCircle size={14} /> {formErrors.message}
                          </p>
                        )}
                      </div>

                      {submitError && (
                        <div className="p-4 rounded-xl flex items-start gap-3 animate-shake"
                             style={{ 
                               background: '#FEF2F2',
                               border: '1px solid #FECACA'
                             }}>
                          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" style={{ color: '#DC2626' }} />
                          <div>
                            <p className="font-medium" style={{ color: '#DC2626' }}>Submission failed</p>
                            <p className="text-sm mt-1" style={{ color: '#DC2626', opacity: 0.8 }}>
                              Please try again or contact us directly via email/phone.
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 flex items-center justify-center gap-3 font-bold rounded-xl text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                          style={{ 
                            background: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`,
                            color: 'white'
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={22} className="animate-spin" />
                              Booking Your Call...
                            </>
                          ) : (
                            <>
                              <Send size={22} />
                              Book Free Strategy Call
                            </>
                          )}
                        </button>
                        <p className="text-center text-sm mt-4" style={{ color: theme.metallicText, opacity: 0.7 }}>
                          🔒 We respect your privacy. Your information is safe with us.
                        </p>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl p-8 md:p-12 shadow-2xl"
               style={{ 
                 background: `linear-gradient(135deg, ${theme.amethyst}, ${theme.plum})`
               }}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="mb-6 max-w-2xl mx-auto" style={{ color: theme.orchid }}>
              Schedule a free consultation call with our experts to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${companyInfo.email}?subject=Schedule a Consultation`}
                className="px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                style={{ 
                  background: 'white',
                  color: theme.amethyst
                }}
              >
                Schedule a Call
              </a>
              <a
                href={`tel:${companyInfo.phone}`}
                className="px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                style={{ 
                  border: '2px solid white',
                  color: 'white'
                }}
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes success-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-success-pulse {
          animation: success-pulse 2s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ContactForm;