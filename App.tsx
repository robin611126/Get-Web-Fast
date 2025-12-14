import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, Menu, X, ArrowRight, ExternalLink, 
  MessageCircle, Phone, Mail, MapPin, ChevronRight,
  Star, Rocket, Sparkles, ArrowUpRight, Crown, Quote,
  Search, PenTool, Code, Layout, Send, 
  Linkedin, Instagram, Twitter, Facebook,
  Users, Heart, Zap, Shield, User
} from 'lucide-react';
import { COMPANY_INFO, FEATURES, SERVICES, PROJECTS, TESTIMONIALS, PROCESS_STEPS } from './constants';
import { GridBackground, ParticleDrift } from './components/ui/Backgrounds';
import { SpotlightCard } from './components/ui/Spotlight';

// --- Helpers ---

// Helper to generate dynamic WhatsApp links with context
const getWhatsAppUrl = (message?: string) => {
  if (!message) return COMPANY_INFO.whatsapp;
  // Clean phone number for api
  const phone = "919065046908"; 
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

const openMapLocation = () => {
  const query = encodeURIComponent(COMPANY_INFO.location);
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
};

// Programmatic scroll handler to prevent URL hash issues
const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Sub Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact-us' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#030014]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <img 
            src="https://i.ibb.co/yKx6Mtq/gwf-logo.png" 
            alt="Get Web Fast" 
            className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(91,64,255,0.3)]" 
            onError={(e) => {
              // Fallback if the direct link guess fails, revert to the provided page link or hide
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
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#contact-us"
            onClick={(e) => handleSmoothScroll(e, '#contact-us')}
            className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(91,64,255,0.5)] transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#030014] border-b border-white/10"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleSmoothScroll(e, link.href);
                  }}
                  className="text-lg text-slate-300 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact-us"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleSmoothScroll(e, '#contact-us');
                }}
                className="mt-4 flex items-center justify-center w-full py-3 bg-secondary/10 text-secondary border border-secondary/20 rounded-lg cursor-pointer"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[120vh] flex flex-col items-center pt-32 lg:pt-48 overflow-visible">
      
      {/* --- Cosmic Horizon Background --- */}
      {/* Top light bloom */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-primary/20 blur-[120px] rounded-[100%] pointer-events-none z-0 mix-blend-screen"></div>
      {/* Secondary glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-secondary/10 blur-[100px] rounded-[100%] pointer-events-none z-0"></div>
      
      <div className="max-w-5xl mx-auto px-6 w-full flex flex-col items-center relative z-10 text-center">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-secondary mb-8 hover:bg-white/10 transition-colors backdrop-blur-md cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          Accepting New Projects for 2025
          <ArrowRight size={12} className="ml-1 opacity-50" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1] md:leading-[1.1]"
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
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
        >
          Modern, responsive websites delivered in days — not weeks.
        </motion.p>
        
        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center mb-20"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={getWhatsAppUrl("Hi, I want to start a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-indigo-600 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(91,64,255,0.4)] hover:shadow-[0_0_60px_rgba(91,64,255,0.6)] transition-shadow border border-white/10"
            >
              WhatsApp Now <MessageCircle size={18} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={getWhatsAppUrl("Hi, I'd like to book a consultation call.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-medium text-center hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
            >
              Book a Call
            </motion.a>
          </div>

          <p className="text-sm text-slate-500 font-medium tracking-wide">
             Fast, clean, SEO-ready builds for businesses and startups.
          </p>
        </motion.div>

        {/* --- 3D Dashboard Mockup Centerpiece --- */}
        <motion.div
           initial={{ opacity: 0, y: 100, rotateX: 20 }}
           animate={{ opacity: 1, y: 0, rotateX: 0 }}
           transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.2 }}
           className="relative w-full max-w-6xl mx-auto perspective-[2000px] group"
        >
           {/* The Mockup Container - Tilted Perspective */}
          <div className="relative z-10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-[#0F0E1F] aspect-[16/9] md:aspect-[21/9] transform transition-transform duration-700 hover:scale-[1.01] hover:shadow-[0_0_80px_rgba(91,64,255,0.15)]">
            
            {/* Glossy sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none z-20"></div>

            {/* Browser Header */}
            <div className="h-10 bg-[#030014] border-b border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <div className="mx-auto h-6 w-1/3 bg-white/5 rounded-full text-[10px] flex items-center justify-center text-slate-500 font-mono border border-white/5">
                getwebfast.com
              </div>
            </div>

            {/* Inner Website Content (Miniature) */}
            <div className="h-full w-full bg-background relative overflow-hidden flex flex-col">
                {/* Internal Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                
                {/* Layout Content */}
                <div className="p-8 md:p-12 grid grid-cols-12 gap-6 h-full">
                    {/* Left Sidebar */}
                    <div className="hidden md:block col-span-2 h-full rounded-lg border border-white/5 bg-white/5 p-4 flex flex-col gap-3">
                        <div className="w-8 h-8 rounded bg-primary/20 mb-4"></div>
                        {[1,2,3,4,5].map(i => (
                            <div key={i} className="h-2 w-full bg-white/10 rounded"></div>
                        ))}
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="col-span-12 md:col-span-7 flex flex-col gap-6">
                        {/* Hero Banner inside Mockup */}
                        <div className="h-48 rounded-lg bg-gradient-to-r from-surface to-black border border-white/5 relative overflow-hidden p-6 flex flex-col justify-center">
                            <div className="w-32 h-6 bg-secondary/20 rounded mb-4"></div>
                            <div className="w-3/4 h-8 bg-gradient-to-r from-white to-white/40 rounded mb-2"></div>
                            <div className="w-1/2 h-8 bg-gradient-to-r from-white to-white/40 rounded"></div>
                        </div>
                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4">
                            {[1,2,3].map(i => (
                                <div key={i} className="h-24 rounded-lg bg-white/5 border border-white/5 p-4">
                                    <div className="w-8 h-8 rounded-full bg-white/10 mb-2"></div>
                                    <div className="w-16 h-3 bg-white/20 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="hidden md:block col-span-3 h-full rounded-lg bg-black/40 border border-white/5 p-4 relative overflow-hidden">
                        {/* Abstract Chart */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-between px-2 pb-2 gap-1">
                             {[30, 50, 40, 70, 50, 80, 60].map((h, i) => (
                                <div key={i} className="flex-1 bg-gradient-to-t from-primary/50 to-secondary/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Floating Popups - Positioned Absolute Relative to the Mockup Container */}
          
          {/* Left Popup - Performance */}
          <motion.div 
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -left-4 md:-left-12 top-1/4 z-30"
          >
             <div className="p-4 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl flex items-center gap-4 hover:border-green-500/50 transition-colors">
               <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                 <CheckCircle2 size={20} />
               </div>
               <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Performance</div>
                  <div className="text-sm font-bold text-white">100/100 Score</div>
               </div>
             </div>
          </motion.div>
          
          {/* Right Popup - Sales/Turnaround */}
          <motion.div 
             animate={{ y: [0, 15, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute -right-4 md:-right-12 bottom-1/3 z-30"
          >
             <div className="p-4 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl flex items-center gap-4 hover:border-secondary/50 transition-colors">
               <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <Rocket size={20} />
               </div>
               <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Delivery</div>
                  <div className="text-sm font-bold text-white">48 Hours</div>
               </div>
             </div>
          </motion.div>

        </motion.div>
        
        {/* Reflection under the mockup */}
        <div className="absolute bottom-[-100px] left-0 right-0 h-[200px] bg-gradient-to-t from-[#030014] via-[#030014] to-transparent z-20"></div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  const values = [
    {
      title: "Our Story",
      description: "Get Web Fast was born from a simple belief: every business deserves a stunning website without the wait. We saw too many talented entrepreneurs held back by slow agencies and inflated prices, so we built a streamlined approach that delivers in 48-72 hours.",
      icon: Rocket
    },
    {
      title: "What Drives Us",
      description: "We're not just building websites; we're building digital foundations for dreams. Every project represents someone's vision, and that responsibility drives us to deliver excellence from the first conversation to launch day.",
      icon: Heart
    },
    {
      title: "Our Approach",
      description: "Speed doesn't mean shortcuts. We combine efficiency with quality using proven design principles, modern technology, and strategic SEO. Whether you're launching or scaling, we make your online presence powerful and professional.",
      icon: Zap
    },
    {
      title: "Our Promise",
      description: "Transparency, reliability, and genuine care. No hidden fees, no confusing jargon, no endless delays—just honest communication, clear pricing, and a beautiful website delivered exactly when we promise.",
      icon: Shield
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
                        {[1,2,3].map(i => (
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
                     onClick={(e) => handleSmoothScroll(e, '#contact-us')}
                     className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
                   >
                     Contact Us <ArrowUpRight size={16} />
                   </a>
                   <a 
                     href="#projects"
                     onClick={(e) => handleSmoothScroll(e, '#projects')}
                     className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                   >
                     View Projects <ArrowUpRight size={16} />
                   </a>
                </div>

                {/* Team Mini Cards */}
                <div className="flex flex-wrap gap-4">
                   <div className="flex items-center gap-3 pr-6 border-r border-white/10">
                      <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" alt="Ryan" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <div className="text-sm font-bold text-white">Ryan Matthews</div>
                         <div className="text-xs text-slate-500">Co Founder</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="David" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <div className="text-sm font-bold text-white">David Parker</div>
                         <div className="text-xs text-slate-500">Co Founder</div>
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

const Services = () => {
  const calculateOriginalPrice = (priceStr: string) => {
    // Simple helper to generate a fake "original" price that is 70% higher
    const numericValue = parseInt(priceStr.replace(/[^0-9]/g, ''));
    if (isNaN(numericValue)) return priceStr;
    const originalPrice = Math.floor(numericValue * 1.7);
    return `₹${originalPrice.toLocaleString('en-IN')}`;
  };

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
           
           {SERVICES.map((service) => {
             // Identify if this is the Business Website service to highlight it
             const isPopular = service.title === "Business Website";
             const isPremium = service.title === "Premium Custom Build";
             const originalPrice = calculateOriginalPrice(service.price);
             const whatsappLink = getWhatsAppUrl(`Hi, I'm interested in the ${service.title} plan. Can you tell me more?`);
             
             return (
               <div 
                key={service.id} 
                className={`
                  relative p-8 md:p-10 rounded-2xl border group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(91,64,255,0.15)]
                  ${isPremium ? 'md:col-span-2 bg-[#080810] border-purple-500/40 shadow-[0_0_80px_rgba(168,85,247,0.15)]' : ''}
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

                 {/* Most Popular Badge */}
                 {isPopular && (
                    <div className="absolute top-0 right-0 z-20">
                      <div className="bg-gradient-to-bl from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl shadow-lg">
                        MOST POPULAR
                      </div>
                    </div>
                 )}
                 
                 {/* Premium Badge */}
                 {isPremium && (
                    <div className="absolute top-0 right-0 z-20">
                      <div className="flex items-center gap-2 bg-gradient-to-bl from-purple-600 to-pink-600 text-white text-[10px] font-bold px-5 py-2 rounded-bl-2xl shadow-[0_5px_20px_rgba(168,85,247,0.4)]">
                        <Crown size={12} className="text-yellow-300 fill-yellow-300" />
                        ELITE TIER
                      </div>
                    </div>
                 )}
                 
                 {/* Spotlight/Glow Effect for Popular Card */}
                 {isPopular && (
                   <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>
                 )}

                 <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Top Row */}
                    <div className="flex justify-between items-start mb-6">
                       <h3 className={`text-2xl md:text-3xl font-bold text-white 
                         ${isPopular ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200' : ''}
                         ${isPremium ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-200 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' : ''}
                       `}>
                         {service.title}
                       </h3>
                       <a 
                         href={whatsappLink}
                         target="_blank"
                         rel="noopener noreferrer"
                         className={`flex items-center gap-1.5 px-4 py-2 rounded-full border bg-white/5 hover:bg-white hover:text-black transition-all text-xs font-semibold uppercase tracking-wide group-hover:translate-x-1 duration-300
                            ${isPremium ? 'border-purple-500/30 text-purple-200 hover:border-white' : 'border-white/10 hover:border-white'}
                         `}
                       >
                         Contact Us <ArrowUpRight size={14}/>
                       </a>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed max-w-xl">
                      {service.description}
                    </p>
                    
                    {/* Price Tag with Comparison */}
                    <div className="mb-8">
                       <div className="flex items-center gap-3 mb-2">
                         <span className="text-slate-600 line-through text-lg font-medium decoration-slate-600/50 decoration-2">{originalPrice}</span>
                         <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isPremium ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-green-400/10 text-green-400 border border-green-400/20'}`}>
                           Save 40%
                         </span>
                       </div>
                       <div className={`text-4xl font-bold text-white flex items-baseline gap-2 ${isPremium ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : ''}`}>
                         {service.price} 
                         <span className="text-sm font-normal text-slate-500 uppercase tracking-wide">/ starting</span>
                       </div>
                    </div>

                    {/* Features List */}
                    <ul className={`grid sm:grid-cols-2 gap-y-3 gap-x-6 mt-auto ${isPremium ? 'md:grid-cols-3' : ''}`}>
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300 group-hover:text-slate-200 transition-colors">
                           <CheckCircle2 className={`shrink-0 mt-0.5 
                             ${isPopular ? 'text-blue-400' : ''} 
                             ${isPremium ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : ''}
                             ${!isPopular && !isPremium ? 'text-emerald-400' : ''}
                           `} size={16} />
                           <span>{f}</span>
                        </li>
                      ))}
                    </ul>
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
  return (
    <section id="projects" className="py-32 relative bg-[#030014] overflow-hidden">
      {/* Radial Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-wider text-blue-400 uppercase mb-6 backdrop-blur-md"
          >
             Works
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore Our Recent Projects</h2>
          <p className="text-slate-400 text-lg max-w-2xl">
             Browse through our portfolio showcasing diverse, innovative web design projects and client successes.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl border border-white/10 bg-[#0A0A12] overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(91,64,255,0.15)]"
            >
              {/* Image Container - Studio Style */}
              <div className={`relative h-[320px] ${project.bg} flex items-center justify-center p-8 overflow-hidden`}>
                 {/* Abstract Grid inside container */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                 
                 {/* Laptop/Screen Simulation */}
                 <div className="relative w-full max-w-lg aspect-[16/10] rounded-lg bg-black border-[4px] border-black shadow-2xl transform group-hover:scale-[1.02] group-hover:-translate-y-2 transition-transform duration-700">
                    {/* Screen Content */}
                    <div className="w-full h-full rounded bg-white overflow-hidden relative">
                         <img 
                           src={project.image} 
                           alt={project.name} 
                           className="w-full h-full object-cover"
                         />
                         {/* Gloss Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"></div>
                    </div>
                    {/* Laptop Base Hint */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[120%] h-3 bg-black/20 blur-xl rounded-full"></div>
                 </div>

                 {/* View Project Button Overlay */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 bg-black/40 backdrop-blur-sm">
                    <a 
                      href={getWhatsAppUrl(`Hi, I like the ${project.name} design. Can you build something similar?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-white text-black font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl"
                    >
                      View Project <ExternalLink size={16} />
                    </a>
                 </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-3">
                       <h3 className="text-xl font-bold text-white">{project.name}</h3>
                       <span className="px-3 py-1 rounded-full bg-white/10 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                          {project.category}
                       </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                       {project.description}
                    </p>
                </div>
                
                <a 
                  href={getWhatsAppUrl(`Hi, I like the ${project.name} design. Can you build something similar?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-secondary transition-colors"
                >
                  Request this style <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
           <a 
              href={getWhatsAppUrl("Hi, I'd like to see more of your work.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all group"
            >
             View All Works 
             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </a>
        </div>

      </div>
    </section>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-[#030014]">
        {/* Background Beams - recreating the vertical lines in reference */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0 transform -skew-x-12 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16">
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-wider text-blue-400 uppercase mb-6 backdrop-blur-md"
                 >
                    Testimonials
                 </motion.div>
                 
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Client Success Stories
                 </h2>
                 <p className="text-slate-400 text-lg max-w-2xl">
                    Discover what our clients say about their experiences and success working with us.
                 </p>
            </div>

            {/* Featured Testimonial Card */}
            <div className="relative max-w-4xl mx-auto">
                {/* Glow under the card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-3xl opacity-20 blur-xl"></div>
                
                <div className="relative rounded-3xl bg-[#050510] border border-white/10 p-8 md:p-16 flex flex-col items-center text-center overflow-hidden">
                    {/* Inner glowing mesh */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none"></div>
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10 flex flex-col items-center"
                        >
                            <Quote size={48} className="text-white mb-8 fill-white/20" />
                            
                            <p className="text-xl md:text-2xl font-medium text-slate-200 mb-8 leading-relaxed max-w-2xl">
                                "{TESTIMONIALS[activeIndex].text}"
                            </p>
                            
                            <div className="flex gap-1 mb-8">
                                {[1,2,3,4,5].map((_, i) => (
                                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="p-1 rounded-full border border-white/10 bg-white/5">
                                    <img 
                                        src={TESTIMONIALS[activeIndex].image} 
                                        alt={TESTIMONIALS[activeIndex].name} 
                                        className="w-12 h-12 rounded-full object-cover" 
                                    />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-white text-lg">{TESTIMONIALS[activeIndex].name}</div>
                                    <div className="text-sm text-blue-400 font-medium">{TESTIMONIALS[activeIndex].role}</div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {TESTIMONIALS.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
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
      icon: Search,
      color: "bg-blue-500/20 text-blue-400"
    },
    {
      id: "02",
      title: "Design Concept",
      desc: "Creating initial design concepts based on insights gathered during the discovery phase.",
      icon: PenTool,
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      id: "03",
      title: "Development & Testing",
      desc: "Building and refining the website, ensuring functionality and compatibility across devices.",
      icon: Code,
      color: "bg-indigo-500/20 text-indigo-400"
    },
    {
      id: "04",
      title: "Launch & Support",
      desc: "Deploying the finalized website and providing ongoing support to ensure long-term success.",
      icon: Rocket,
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

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="contact-us" className="py-32 relative bg-[#030014] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-wider text-blue-400 uppercase mb-6 backdrop-blur-md">
            Contact Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch With Us
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Reach out to us for inquiries, collaborations, or to discuss your project needs.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Mail,
              label: "Email us here",
              value: COMPANY_INFO.email,
              action: `mailto:${COMPANY_INFO.email}`,
              color: "text-blue-400",
              bgColor: "bg-blue-500/10",
              onClick: null
            },
            {
              icon: MapPin,
              label: "Location",
              value: COMPANY_INFO.location,
              action: "#",
              color: "text-purple-400",
              bgColor: "bg-purple-500/10",
              onClick: (e: React.MouseEvent) => { e.preventDefault(); openMapLocation(); }
            },
            {
              icon: Phone,
              label: "Or give us a call",
              value: "Book a call",
              action: getWhatsAppUrl("Hi, I'd like to book a call."),
              color: "text-teal-400",
              bgColor: "bg-teal-500/10",
              onClick: null
            }
          ].map((card, idx) => (
            <motion.a
              key={idx}
              href={card.action}
              onClick={card.onClick as any}
              target={card.action.startsWith('http') ? "_blank" : undefined}
              rel={card.action.startsWith('http') ? "noopener noreferrer" : undefined}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-2xl border border-white/10 bg-[#0A0A12] overflow-hidden flex flex-col justify-between min-h-[160px] cursor-pointer hover:shadow-[0_20px_40px_-15px_rgba(91,64,255,0.15)]"
            >
               {/* Grid Pattern */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px]"></div>
               
               <div className="relative z-10 flex justify-between items-start">
                 <div className={`w-10 h-10 rounded-lg ${card.bgColor} ${card.color} flex items-center justify-center border border-white/5`}>
                   <card.icon size={20} />
                 </div>
                 <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-black transition-all">
                   <ArrowUpRight size={16} />
                 </div>
               </div>

               <div className="relative z-10 mt-6">
                 <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{card.label}</div>
                 <div className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">{card.value}</div>
               </div>
            </motion.a>
          ))}
        </div>

        {/* Contact Form Container */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-[#05050A] p-8 md:p-12 relative overflow-hidden">
           {/* Glow Effect */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none"></div>
           
           <div className="relative z-10 text-center mb-10">
              <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
              <p className="text-slate-400 text-sm">Use our convenient contact form to reach out with questions, feedback, or collaboration inquiries.</p>
           </div>

           <form onSubmit={handleFormSubmit} className="relative z-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide ml-1">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                      required
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide ml-1">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                      required
                    />
                 </div>
              </div>
              
              <div className="space-y-2">
                 <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide ml-1">Message</label>
                 <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                    required
                 ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                Send Message
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </form>
        </div>

      </div>
    </section>
  );
};

const Footer = () => {
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
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#1DA1F2] hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#E1306C] hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#0077B5] hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-secondary"/> <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">{COMPANY_INFO.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-secondary"/> <a href={getWhatsAppUrl("Hi, calling from website.")} className="hover:text-white transition-colors">{COMPANY_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={16} className="text-secondary"/> 
                <a href={getWhatsAppUrl("Hi, I have a query.")} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">WhatsApp Message</a>
              </li>
              <li className="flex items-center gap-3 cursor-pointer" onClick={openMapLocation}>
                <MapPin size={16} className="text-secondary"/> <span className="hover:text-white transition-colors">{COMPANY_INFO.location}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => handleSmoothScroll(e, '#home')}
                  className="hover:text-secondary transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleSmoothScroll(e, '#about')}
                  className="hover:text-secondary transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleSmoothScroll(e, '#services')}
                  className="hover:text-secondary transition-colors cursor-pointer"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  onClick={(e) => handleSmoothScroll(e, '#projects')}
                  className="hover:text-secondary transition-colors cursor-pointer"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="#process" 
                  onClick={(e) => handleSmoothScroll(e, '#process')}
                  className="hover:text-secondary transition-colors cursor-pointer"
                >
                  Process
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-slate-600 text-sm">
          &copy; 2025 Get Web Fast. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const App = () => {
  return (
    <div className="min-h-screen bg-[#030014] text-white selection:bg-secondary/30 selection:text-white">
      <GridBackground />
      <ParticleDrift />
      
      <Navbar />
      
      <main>
        <Hero />
        <WhyChooseUs />
        <Services />
        <Projects />
        <Testimonials />
        <Process />
        <AboutUs />
        <ContactUs />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;