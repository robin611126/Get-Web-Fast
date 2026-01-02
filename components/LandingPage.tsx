import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2, Menu, X, ArrowRight, ExternalLink,
  MessageCircle, Phone, Mail, MapPin,
  Star, Rocket, ArrowUpRight, Crown, Quote,
  Linkedin, Instagram, Facebook, Youtube,
  Lock, Briefcase, ShoppingBag, Users, Code, Globe, Smartphone, Sparkles
} from 'lucide-react';
import { cms, ServiceItem, ProjectItem, TestimonialItem, ScrollingBannerItem } from '../lib/cms';
import { COMPANY_INFO, FEATURES, SERVICES, PROJECTS, TESTIMONIALS } from '../constants';
import { GridBackground, ParticleDrift } from './ui/Backgrounds';
import { SpotlightCard } from './ui/Spotlight';
import {
  DiscoveryIcon, DesignConceptIcon, DevelopmentIcon, LaunchSupportIcon,
  OurStoryIcon, WhatDrivesUsIcon, OurApproachIcon, OurPromiseIcon,
  EmailIcon, LocationIcon, PhoneCallIcon
} from './ui/Icons';
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { cn } from "../lib/utils";
import { SEO } from "../lib/seo";

// --- Helpers ---

const getWhatsAppUrl = (message?: string) => {
  if (!message) return COMPANY_INFO.whatsapp;
  const phone = "919065046908";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

const openMapLocation = () => {
  const query = encodeURIComponent(COMPANY_INFO.location);
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
};

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Sub Components ---

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href.startsWith('/')) {
      // Internal route link (like /blog)
      navigate(href);
      window.scrollTo(0, 0);
    } else if (href.startsWith('#')) {
      // Hash link
      if (location.pathname !== '/') {
        // If we are on blog page, go to home then scroll
        navigate('/');
        // Small timeout to allow navigation to complete before scrolling
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // We are on home page, just scroll
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#030014]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <img
            src="https://i.ibb.co/yKx6Mtq/gwf-logo.png"
            alt="Get Web Fast"
            className="h-14 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(91,64,255,0.3)]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact-us"
            onClick={(e) => handleNavClick(e, '#contact-us')}
            className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(91,64,255,0.5)] transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[#030014] border-t border-b border-white/10 shadow-2xl flex flex-col p-6 gap-4 md:hidden"
            style={{ maxHeight: '85vh', overflowY: 'auto' }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact-us"
              onClick={(e) => handleNavClick(e, '#contact-us')}
              className="mt-2 flex items-center justify-center w-full py-4 bg-primary text-white font-bold rounded-xl active:scale-95 transition-transform"
            >
              Contact Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative md:min-h-screen flex flex-col items-center pt-24 md:pt-40 lg:pt-44 pb-12 md:pb-20">
      {/* --- Cosmic Horizon Background --- */}
      <div className="absolute inset-x-0 top-0 h-[600px] md:h-[800px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/10 blur-[80px] rounded-full opacity-50"></div>
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-secondary/10 blur-[60px] rounded-full opacity-40"></div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 w-full flex flex-col items-center relative z-10 text-center">

        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <AnimatedGradientText>
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Accepting New Projects for 2026
            </span>
            <ArrowRight size={12} className="ml-1 opacity-50 text-white" />
          </AnimatedGradientText>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-[6.5rem] xl:text-8xl font-black tracking-normal text-white mb-8 leading-[1.1] md:leading-[0.9] drop-shadow-2xl"
        >
          Websites Delivered Fast. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-primary drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Built to Convert.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 mb-8 md:mb-10 max-w-2xl leading-relaxed"
        >
          Modern, responsive websites delivered in days — not weeks.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center mb-12 md:mb-20 w-full"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full sm:w-auto">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={getWhatsAppUrl("Hi, I want to start a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-indigo-600 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(91,64,255,0.4)] hover:shadow-[0_0_60px_rgba(91,64,255,0.6)] transition-shadow border border-white/10 w-full sm:w-auto"
            >
              WhatsApp Now <MessageCircle size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={getWhatsAppUrl("Hi, I'd like to book a consultation call.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-medium text-center hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm w-full sm:w-auto"
            >
              Book a Call
            </motion.a>
          </div>

          <p className="text-sm text-slate-500 font-medium tracking-wide">
            Fast, clean, SEO-ready builds for businesses and startups.
          </p>
        </motion.div>


      </div>
    </section>
  );
};

const ScrollingText = () => {
  const [banners, setBanners] = useState<ScrollingBannerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await cms.getAllScrollingBanners();
      if (data && data.length > 0) {
        setBanners(data.filter((b: any) => b.is_active));
      } else {
        setBanners([
          { id: 'd1', text: 'GET WEB FAST. GET FOUND. GET CUSTOMERS.', direction: 'left', speed: 30, is_active: true, order_index: 0 },
          { id: 'd2', text: 'WEBSITES DELIVERED IN 48 HOURS. START NOW.', direction: 'right', speed: 35, is_active: true, order_index: 1 }
        ]);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return null;

  return (
    <div className="w-full bg-black border-y border-white/20 overflow-hidden py-1.5 md:py-2 relative z-20 flex flex-col divide-y divide-white/10">
      {/* Background Subtle Grid - Made lighter/smaller */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      {banners.map((banner) => (
        <div key={banner.id} className="relative w-full flex whitespace-nowrap overflow-hidden select-none py-2 md:py-2">
          {/* Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

          <motion.div
            className="flex gap-12 md:gap-24 items-center will-change-transform"
            initial={{ x: banner.direction === 'left' ? "0%" : "-50%" }}
            animate={{ x: banner.direction === 'left' ? "-50%" : "0%" }}
            transition={{
              ease: "linear",
              duration: banner.speed || 30,
              repeat: Infinity,
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-12 md:gap-24 items-center shrink-0">
                <span className={`
                    text-3xl md:text-6xl font-black italic tracking-tighter whitespace-pre
                     ${i % 2 === 0 ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-700'}
                  `}>
                  {banner.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="py-32 relative bg-[#030014] overflow-hidden">
      {/* Background Ambience / Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-[#030014] to-[#030014] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20 relative">

          {/* Decorative "Wand" Beams */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none opacity-60">
            <div className="absolute left-[30%] top-0 w-[2px] h-[300px] bg-gradient-to-b from-blue-500 to-transparent -rotate-[35deg] blur-[1px]"></div>
            <div className="absolute left-[30%] top-0 w-[40px] h-[300px] bg-gradient-to-b from-blue-500/30 to-transparent -rotate-[35deg] blur-2xl"></div>

            <div className="absolute right-[30%] top-0 w-[2px] h-[300px] bg-gradient-to-b from-indigo-500 to-transparent rotate-[35deg] blur-[1px]"></div>
            <div className="absolute right-[30%] top-0 w-[40px] h-[300px] bg-gradient-to-b from-indigo-500/30 to-transparent rotate-[35deg] blur-2xl"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold tracking-wider text-blue-400 uppercase mb-6 backdrop-blur-sm relative z-10"
          >
            Why Us
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg relative z-10"
          >
            Why Get Web Fast <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Stands Out</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl leading-relaxed relative z-10"
          >
            Discover why we excel in delivering innovative, client-focused web design solutions that actually convert.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <SpotlightCard
              key={idx}
              className="p-8 h-full bg-[#05050A] border-white/[0.08] hover:border-blue-500/30 transition-all duration-500 group"
              spotlightColor="rgba(59, 130, 246, 0.15)"
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-300">
                  <feature.icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>

                {/* Subtle shine effect on hover */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// Icon mapping for dynamic services
const ICON_MAP: Record<string, React.ElementType> = {
  Rocket, Briefcase, ShoppingBag, Users, Code, Globe, Smartphone
};

const Services = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await cms.getAllServices();
      setServices(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const calculateOriginalPrice = (priceStr: string) => {
    // Simple helper to generate a fake "original" price that is 50% higher (multiplied by 2)
    const numericValue = parseInt(priceStr.replace(/[^0-9]/g, ''));
    if (isNaN(numericValue)) return priceStr;
    const originalPrice = Math.floor(numericValue * 2);
    return `₹${originalPrice.toLocaleString('en-IN')}`;
  };

  if (loading) return <div className="py-24 bg-[#030014] text-center text-white">Loading Services...</div>;

  return (
    <section id="services" className="py-24 bg-[#030014] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold tracking-wider text-blue-400 uppercase mb-6">
            Services
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Core Services</span>
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Discover our comprehensive range of services tailored to enhance your digital presence and drive business growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

          {services.map((service) => {
            // Check for tags
            const isPopular = service.tags?.includes('Most Popular') || service.title === "Business Website";
            const isPremium = service.is_premium;

            // Icon mapping
            const IconComp = ICON_MAP[service.icon_name] || Rocket;

            // Price Calculation
            const finalPrice = service.price; // Assuming this is the discounted price stored in DB or regular price
            const originalPrice = service.original_price || (service.discount_percent > 0 ? `₹${Math.floor(parseInt(service.price.replace(/[^0-9]/g, '')) * (100 / (100 - service.discount_percent))).toLocaleString('en-IN')}` : null);

            const whatsappLink = getWhatsAppUrl(`Hi, I'm interested in the ${service.title} plan. Can you tell me more?`);

            return (
              <div
                key={service.id}
                className={`
                  relative rounded-3xl border group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(91,64,255,0.15)] flex flex-col
                  ${isPremium
                    ? 'md:col-span-2 bg-[#080810] border-purple-500/40 shadow-[0_0_80px_rgba(168,85,247,0.15)] p-6 md:p-10'
                    : 'p-6 md:p-8'
                  }
                  ${!isPremium && isPopular
                    ? 'border-blue-500/50 bg-[#0A0A1B] shadow-[0_0_50px_rgba(59,130,246,0.1)]'
                    : !isPremium
                      ? 'border-white/[0.08] bg-[#05050A] hover:border-white/20'
                      : ''
                  }
                `}
              >
                {/* Premium Animated Background */}
                {isPremium && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black opacity-80 z-0"></div>
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.2),transparent_50%)] z-0 pointer-events-none"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/30 blur-[100px] rounded-full pointer-events-none"></div>
                  </>
                )}

                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute top-0 right-0 z-20">
                    <div className="bg-gradient-to-bl from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl shadow-lg uppercase tracking-wider">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Premium Badge */}
                {isPremium && (
                  <div className="absolute top-0 right-0 z-20">
                    <div className="flex items-center gap-2 bg-gradient-to-bl from-purple-600 to-pink-600 text-white text-[10px] font-bold px-5 py-2 rounded-bl-2xl shadow-[0_5px_20px_rgba(168,85,247,0.4)] uppercase tracking-wider">
                      <Crown size={12} className="text-yellow-300 fill-yellow-300" />
                      Elite Tier
                    </div>
                  </div>
                )}

                {/* Spotlight Effect */}
                {isPopular && (
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none mx-auto w-full"></div>
                )}

                <div className="relative z-10 flex flex-col h-full">

                  {/* Header Row: Icon and Title */}
                  <div className={`flex items-start gap-4 ${isPremium ? 'mb-6' : 'mb-4'}`}>
                    <div className={`rounded-2xl text-white group-hover:scale-110 transition-transform shadow-lg shrink-0
                        ${isPremium ? 'p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-purple-500/10' : 'p-2.5 bg-white/5 border border-white/10'}
                      `}>
                      <IconComp size={isPremium ? 28 : 24} className={isPremium ? 'text-purple-300' : 'text-blue-300'} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-white mb-1
                          ${isPremium ? 'text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-200 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'text-xl md:text-2xl'}
                       `}>
                        {service.title}
                      </h3>
                      {/* Tags */}
                      {service.tags && service.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {service.tags.filter(t => t !== 'Most Popular').map(tag => (
                            <span key={tag} className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border border-white/10 text-slate-400 bg-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-slate-400 text-sm leading-relaxed max-w-xl group-hover:text-slate-300 transition-colors ${isPremium ? 'mb-6' : 'mb-6'}`}>
                    {service.description}
                  </p>

                  {/* Pricing Section - Highly Visual */}
                  <div className={`rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm relative overflow-hidden group-hover:bg-white/[0.05] transition-colors ${isPremium ? 'mb-6 p-4' : 'mb-6 p-3'}`}>
                    {/* Coupon Badge */}
                    {service.coupon_code && (
                      <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg border-l border-b border-green-500/20 flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></div>
                        USE: {service.coupon_code}
                      </div>
                    )}

                    <div className="flex flex-col">
                      {/* Discount Label */}
                      {(service.discount_percent > 0 || originalPrice) && (
                        <div className="flex items-center gap-2 mb-0.5">
                          {service.discount_percent > 0 && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                              {service.discount_percent}% OFF
                            </span>
                          )}
                          {originalPrice && (
                            <span className="text-slate-500 line-through text-xs font-medium decoration-slate-600/50 decoration-2">
                              {originalPrice}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Main Price */}
                      <div className="flex items-baseline gap-1">
                        <span className={`font-bold text-white tracking-tight ${isPremium ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>{finalPrice}</span>
                        <span className="text-xs font-medium text-slate-500">/ starting</span>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className={`grid sm:grid-cols-2 gap-x-4 ${isPremium ? 'md:grid-cols-3 gap-y-2 mb-6' : 'gap-y-2 mb-6'}`}>
                    {service.features.map((f, i) => (
                      <li key={i} className={`flex items-start gap-2 text-slate-300 group-hover:text-slate-200 transition-colors ${isPremium ? 'text-sm' : 'text-xs md:text-sm'}`}>
                        <CheckCircle2 className={`shrink-0 mt-0.5 
                             ${isPopular ? 'text-blue-400' : ''} 
                             ${isPremium ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : ''}
                             ${!isPopular && !isPremium ? 'text-emerald-400' : ''}
                           `} size={14} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wide transition-all duration-300
                          ${isPremium
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] text-white border border-transparent'
                          : isPopular
                            ? 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                            : 'bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white'
                        }
                        `}
                    >
                      Book Now <ArrowRight size={14} />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation / Other Services Style */}
        <div className="mt-20 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-slate-700"></div>
            <span className="text-sm text-slate-500 font-medium uppercase tracking-widest">Other Capabilities</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-slate-700"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {['Social Post Design', 'Branding', 'Packaging Design', 'SEO', 'Content Writing', 'App Development'].map((item, i) => (
              <a
                key={i}
                href={getWhatsAppUrl(`Hi, I need help with ${item}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] text-slate-400 text-xs font-medium hover:bg-white/5 hover:text-white hover:border-white/10 transition-all cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await cms.getAllProjects();
      setProjects(data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <div className="py-24 bg-[#030014] text-center text-white">Loading Projects...</div>;

  return (
    <section id="projects" className="py-24 bg-[#030014] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold tracking-wider text-blue-400 uppercase mb-6">
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            A selection of our recent work across various industries.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030014] to-transparent z-20 pointer-events-none" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030014] to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex gap-6 w-max will-change-transform"
            animate={{ x: "-50%" }}
            transition={{
              ease: "linear",
              duration: 60,
              repeat: Infinity
            }}
          >
            {/* Duplicated List for Infinite Loop (Triple ensure enough width) */}
            {[...projects.slice(0, 6), ...projects.slice(0, 6), ...projects.slice(0, 6)].map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                className="group relative rounded-xl overflow-hidden border border-white/10 bg-[#0A0A12] flex-shrink-0 w-[280px] md:w-[380px]"
              >
                <Link to={`/projects/${project.slug || '#'}`} className="block h-full">
                  <div className={`h-40 ${project.bg_class || 'bg-slate-800'} relative overflow-hidden`}>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-full text-white">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="mb-2 md:mb-4">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1 block">{project.category}</span>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{project.name}</h3>
                    </div>
                    {/* Description removed for minimal toggle */}
                    <div className="md:hidden flex items-center gap-2 text-xs font-medium text-white group-hover:underline decoration-blue-500 underline-offset-4">
                      View Case Study <ArrowRight size={14} className="text-blue-500" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        {/* View All Projects Button */}
        <div className="mt-16 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-full border border-white/10 transition-all hover:scale-105"
          >
            View All Projects <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await cms.getAllTestimonials();
      setItems(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (items.length === 0 || isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [items, isPaused, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  if (loading) return null;
  if (items.length === 0) return null;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#030014]">
      {/* Background Beams */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0 transform -skew-x-12 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-wider text-blue-400 uppercase mb-6 backdrop-blur-md"
          >
            Testimonials
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Client Success Stories
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Discover what our clients say about their experiences and success working with us.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div
          className="relative max-w-5xl mx-auto min-h-[400px] md:min-h-[500px] flex items-center justify-center transition-all"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card Container with Premium Glass Effect */}
          <div className="relative w-full rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-b from-white/[0.08] to-transparent p-[1px] shadow-2xl shadow-blue-900/20 overflow-hidden">
            {/* Inner background */}
            <div className="absolute inset-0 bg-[#030014]/80 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem]"></div>

            {/* Decorative Gradients */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/30 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/30 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative rounded-[2rem] md:rounded-[2.5rem] grid grid-cols-1 place-items-center text-center min-h-[350px] md:min-h-[450px] overflow-hidden">

              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) handleNext();
                    else if (swipe > swipeConfidenceThreshold) handlePrev();
                  }}
                  className="col-start-1 row-start-1 z-10 flex flex-col items-center justify-center w-full h-full px-6 py-12 md:px-16 md:py-16 cursor-grab active:cursor-grabbing"
                >
                  {/* Watermark Quote (Hidden on mobile to save space) */}
                  <Quote size={80} className="absolute -top-6 -left-2 md:-top-10 md:left-10 text-white/[0.03] fill-white/[0.03] pointer-events-none rotate-12 scale-150 hidden md:block" />

                  {/* Main Quote Icon */}
                  <div className="mb-6 md:mb-8 p-3 md:p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 shadow-lg shadow-blue-500/10">
                    <Quote size={24} className="text-blue-400 fill-blue-400/50 md:w-8 md:h-8" />
                  </div>

                  <p className="text-lg md:text-3xl font-medium text-white mb-8 md:mb-10 leading-relaxed max-w-3xl select-none relative z-10 font-[Stack Sans Notch] tracking-tight">
                    "{items[currentIndex].text}"
                  </p>

                  <div className="flex flex-col items-center gap-3 md:gap-4">
                    <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl shadow-blue-500/20">
                      <div className="p-0.5 rounded-full bg-[#030014]">
                        <img
                          src={items[currentIndex].image}
                          alt={items[currentIndex].name}
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover pointer-events-none"
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-bold text-white text-lg md:text-2xl mb-0.5 md:mb-1">{items[currentIndex].name}</div>
                      <div className="text-xs md:text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase tracking-widest">{items[currentIndex].role}</div>
                    </div>

                    <div className="flex gap-1 mt-1 md:mt-2">
                      {[...Array(items[currentIndex].rating || 5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] md:w-4 md:h-4" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Arrows (Desktop) */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-transparent transition-all z-20 hidden md:block group backdrop-blur-md"
          >
            <ArrowRight size={20} className="rotate-180 group-hover:scale-110 transition-transform md:w-6 md:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-transparent transition-all z-20 hidden md:block group backdrop-blur-md"
          >
            <ArrowRight size={20} className="group-hover:scale-110 transition-transform md:w-6 md:h-6" />
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-2 md:gap-3 z-20">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-6 md:w-8 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      id: "01",
      title: "Discovery Phase",
      desc: "Understanding your brand, objectives, and target audience to define project goals.",
      icon: DiscoveryIcon,
      color: "bg-blue-500/20 text-blue-400"
    },
    {
      id: "02",
      title: "Design Concept",
      desc: "Creating initial design concepts based on insights gathered during the discovery phase.",
      icon: DesignConceptIcon,
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      id: "03",
      title: "Development & Testing",
      desc: "Building and refining the website, ensuring functionality and compatibility across devices.",
      icon: DevelopmentIcon,
      color: "bg-indigo-500/20 text-indigo-400"
    },
    {
      id: "04",
      title: "Launch & Support",
      desc: "Deploying the finalized website and providing ongoing support to ensure long-term success.",
      icon: LaunchSupportIcon,
      color: "bg-teal-500/20 text-teal-400"
    }
  ];

  return (
    <section id="process" className="py-32 relative bg-black overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-wider text-blue-400 uppercase mb-6 backdrop-blur-md">
            Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Design Process
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Explore our streamlined approach to creating bespoke websites that align with your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div key={step.id} className="group relative p-8 rounded-2xl border border-white/10 bg-[#05050A] overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(91,64,255,0.15)]">
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

              {/* Hover Glow */}
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${step.color} border border-white/5`}>
                    <step.icon size={24} />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                    Step {step.id}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo(0, 0);
    } else if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const values = [
    {
      title: "Our Story",
      description: "Get Web Fast was born from a simple belief: every business deserves a stunning website without the wait. We saw too many talented entrepreneurs held back by slow agencies and inflated prices, so we built a streamlined approach that delivers in 48-72 hours.",
      icon: OurStoryIcon
    },
    {
      title: "What Drives Us",
      description: "We're not just building websites; we're building digital foundations for dreams. Every project represents someone's vision, and that responsibility drives us to deliver excellence from the first conversation to launch day.",
      icon: WhatDrivesUsIcon
    },
    {
      title: "Our Approach",
      description: "Speed doesn't mean shortcuts. We combine efficiency with quality using proven design principles, modern technology, and strategic SEO. Whether you're launching or scaling, we make your online presence powerful and professional.",
      icon: OurApproachIcon
    },
    {
      title: "Our Promise",
      description: "Transparency, reliability, and genuine care. No hidden fees, no confusing jargon, no endless delays—just honest communication, clear pricing, and a beautiful website delivered exactly when we promise.",
      icon: OurPromiseIcon
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-[#030014] overflow-hidden">
      {/* Background decorative glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Split Layout: Image Left, Content Right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Get Web Fast Team"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Floating Badge on Image */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-[#0F0E1F]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl max-w-xs hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0F0E1F] bg-gray-600 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${i + 20}/100/100`} alt="Team" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-white font-bold text-lg">15+</span>
              </div>
              <p className="text-slate-400 text-xs">Dedicated creative professionals ready to build your vision.</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-wider text-blue-400 uppercase mb-6">
              About Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Discover Who We Are and Our Mission
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Discover who we are and our mission at Get Web Fast. We are a passionate team of creative professionals dedicated to crafting exceptional web design solutions that transform businesses. Our mission is to empower entrepreneurs and small businesses with fast, affordable, and innovative websites that not only captivate visitors but also drive real results.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#contact-us"
                onClick={(e) => handleNavClick(e, '#contact-us')}
                className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                Contact Us <ArrowUpRight size={16} />
              </a>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, '#projects')}
                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2"
              >
                View Projects <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Team Mini Cards */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 pr-6 border-r border-white/10">
                <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" alt="Shivam" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Shivam Welfort</div>
                  <div className="text-xs text-slate-500">Founder</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="Faishal" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Faishal Ahmad</div>
                  <div className="text-xs text-slate-500">Founder</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Grid - The "Dynamic" Part */}
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((val, idx) => (
            <SpotlightCard
              key={idx}
              className="p-8 bg-[#0A0A12] border-white/5 hover:border-blue-500/20 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(91,64,255,0.15)] transition-all duration-500"
              spotlightColor="rgba(91, 64, 255, 0.1)"
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 mb-6">
                  <val.icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{val.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {val.description}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactUs = () => {
  const contactMethods = [
    {
      icon: EmailIcon,
      title: "Email Us",
      value: COMPANY_INFO.email,
      link: `mailto:${COMPANY_INFO.email}`,
      action: "Send Email"
    },
    {
      icon: PhoneCallIcon,
      title: "Call Us",
      value: COMPANY_INFO.phone,
      link: `tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`,
      action: "Call Now"
    },
    {
      icon: LocationIcon,
      title: "Visit Us",
      value: COMPANY_INFO.location,
      link: "#",
      onClick: openMapLocation,
      action: "Get Directions"
    }
  ];

  return (
    <section id="contact-us" className="py-24 relative bg-black overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-wider text-blue-400 uppercase mb-6 backdrop-blur-md">
            Contact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Let's discuss how we can help you achieve your goals. Reach out to us directly or book a consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, idx) => (
            <SpotlightCard
              key={idx}
              className="h-full p-8 bg-[#05050A] border-white/10 flex flex-col hover:border-blue-500/30 transition-all duration-300"
              spotlightColor="rgba(59, 130, 246, 0.1)"
            >
              <div className="flex flex-col items-center text-center h-full w-full">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <method.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-slate-400 mb-6 flex-1 flex items-center justify-center">{method.value}</p>

                <div className="mt-auto w-full">
                  {method.onClick ? (
                    <button
                      onClick={method.onClick}
                      className="w-full py-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center"
                    >
                      {method.action}
                    </button>
                  ) : (
                    <a
                      href={method.link}
                      className="w-full py-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center"
                    >
                      {method.action}
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* CTA Box */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-white/10 p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Prefer WhatsApp?
            </h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Chat directly with our team for quick questions and project inquiries. We usually respond within an hour.
            </p>
            <a
              href={getWhatsAppUrl("Hi, I'm interested in working with Get Web Fast.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-900/20"
            >
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo(0, 0);
    } else if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="contact" className="bg-black pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <a href="/" className="block mb-6">
              <img
                src="https://i.ibb.co/yKx6Mtq/gwf-logo.png"
                alt="Get Web Fast"
                className="h-20 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </a>
            <p className="text-slate-400 max-w-md mb-8">
              We build fast, modern websites for small businesses, creators, and startups.
              Focus on clean design and results you can measure.
            </p>
            <div className="flex gap-4">
              <a href={getWhatsAppUrl("Hi, I'm contacting you via your website.")} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-secondary hover:text-black transition-all">
                <ExternalLink size={18} />
              </a>
              <a href="https://www.instagram.com/getwebfast?igsh=dzd2YjRsNDl3bXo1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#E1306C] hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/share/1FedTp7rSE/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#1877F2] hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://www.linkedin.com/in/get-web-fast-387a593a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#0077B5] hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://youtube.com/@getwebfast?si=HlTplP4vSGZw2CRY" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#FF0000] hover:text-white transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-secondary" /> <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">{COMPANY_INFO.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-secondary" /> <a href={getWhatsAppUrl("Hi, calling from website.")} className="hover:text-white transition-colors">{COMPANY_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={16} className="text-secondary" />
                <a href={getWhatsAppUrl("Hi, I have a query.")} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">WhatsApp Message</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer" onClick={openMapLocation}>
                <MapPin size={16} className="text-secondary" /> <span className="hover:text-white transition-colors">{COMPANY_INFO.location}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <a
                  href="/"
                  className="hover:text-secondary transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-secondary transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="hover:text-secondary transition-colors cursor-pointer"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  onClick={(e) => handleNavClick(e, '/blog')}
                  className="hover:text-secondary transition-colors cursor-pointer"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-slate-600 text-xs">
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            <span className="text-slate-500">Icons by: </span>
            <a href="https://www.flaticon.com/authors/darius-dan" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Darius Dan</a>,
            <a href="https://www.flaticon.com/authors/smashicons" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Smashicons</a>,
            <a href="https://www.flaticon.com/authors/triangle-squad" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Triangle Squad</a>,
            <a href="https://www.flaticon.com/authors/vector-squad" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Vector Squad</a>,
            <a href="https://www.flaticon.com/authors/foxland" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Foxland</a>
            <span> from Flaticon</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p>&copy; 2025 Get Web Fast. All rights reserved.</p>
            <a
              href="/admin"
              onClick={(e) => handleNavClick(e, '/admin')}
              className="flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity mt-2"
            >
              <Lock size={10} /> <span>Admin Access</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const LandingPage = () => {
  return (
    <>
      <SEO
        title="High-Performance Websites & SEO"
        description="We build blazing fast, beautiful websites that rank high on Google. Expert web development and SEO services."
        url="https://www.getwebfast.online/"
      />
      <GridBackground />
      <ParticleDrift />
      <Navbar />
      <main>
        <Hero />
        <ScrollingText />
        <WhyChooseUs />
        <Services />
        <Projects />
        <Testimonials />
        <Process />
        <AboutUs />
        <ContactUs />
        <ContactForm />
      </main>

    </>
  );
};

const ContactForm = () => {
  const [state, handleSubmit] = React.useReducer((state: any, action: any) => {
    if (action.type === 'submitting') {
      return { submitting: true, succeeded: false, errors: [] };
    }
    if (action.type === 'success') {
      return { submitting: false, succeeded: true, errors: [] };
    }
    if (action.type === 'error') {
      return { submitting: false, succeeded: false, errors: action.errors };
    }
    return state;
  }, {
    submitting: false,
    succeeded: false,
    errors: []
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ type: 'submitting' });
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/mnnekjzz", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        handleSubmit({ type: 'success' });
        (e.target as HTMLFormElement).reset();
      } else {
        const data = await response.json();
        handleSubmit({ type: 'error', errors: data.errors });
      }
    } catch (error) {
      handleSubmit({ type: 'error', errors: [{ message: "Something went wrong. Please try again." }] });
    }
  };

  return (
    <section className="py-32 relative bg-[#030014] overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold tracking-wider text-blue-400 uppercase mb-6"
          >
            Free Consultation
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Get a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">FREE Quote</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Have a project in mind? Fill out the form below and our team will get back to you within 24 hours to discuss your vision.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="bg-[#0A0A12]/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Inner lighting effect */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            {state.succeeded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400 shadow-[0_0_40px_rgba(74,222,128,0.2)]">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                <p className="text-slate-400 text-lg max-w-md">Thank you for reaching out. We have received your message and will be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-300 ml-1 group-focus-within:text-blue-400 transition-colors">Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-3 group">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-300 ml-1 group-focus-within:text-blue-400 transition-colors">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="space-y-3 group">
                    <label htmlFor="phone" className="text-sm font-semibold text-slate-300 ml-1 group-focus-within:text-blue-400 transition-colors">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-3 group">
                    <label htmlFor="subject" className="text-sm font-semibold text-slate-300 ml-1 group-focus-within:text-blue-400 transition-colors">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                      placeholder="What's your project about?"
                    />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-300 ml-1 group-focus-within:text-blue-400 transition-colors">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell us more about your requirements..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white font-bold py-5 rounded-xl transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-3 text-lg"
                  >
                    {state.submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>Send Message <ArrowRight size={20} /></>
                    )}
                  </button>
                </div>

                {state.errors && state.errors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
                  >
                    {state.errors.map((err: any, i: number) => (
                      <p key={i}>{err.message}</p>
                    ))}
                  </motion.div>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};