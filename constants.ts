import {
  Rocket,
  ShoppingBag,
  Briefcase, Code, Users,
} from 'lucide-react';
import {
  FirstYearIcon,
  PremiumQualityIcon,
  FastDeliveryIcon,
  PixelPerfectIcon,
  SeoIcon,
  PricingIcon
} from './components/ui/Icons';

export const COMPANY_INFO = {
  name: "Get Web Fast",
  email: "getwebfast@gmail.com",
  phone: "+91 9065046908",
  whatsapp: "https://wa.link/1209a1",
  location: "Jharkhand, India (Remote)",
};

export const FEATURES = [
  {
    title: "Complete First-Year Package",
    description: "Launch without worry. Free premium hosting and a custom domain name included for your first year.",
    icon: FirstYearIcon,
  },
  {
    title: "Premium Quality, Honest Prices",
    description: "Enterprise-level quality at prices that make sense for small businesses. No compromises.",
    icon: PremiumQualityIcon,
  },
  {
    title: "Lightning-Fast 48-72h Delivery",
    description: "Fully functional, professionally designed websites live in record time without cutting corners.",
    icon: FastDeliveryIcon,
  },
  {
    title: "Pixel-Perfect Design",
    description: "We obsess over details. Clean layouts and stunning visuals that convert visitors into customers.",
    icon: PixelPerfectIcon,
  },
  {
    title: "SEO-Ready Architecture",
    description: "Built with proper structure and speed to give you a head start in search rankings immediately.",
    icon: SeoIcon,
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees. Clear, straightforward costs. What you see is exactly what you pay.",
    icon: PricingIcon,
  },
];

export const SERVICES = [
  {
    id: 1,
    title: "Business Website",
    price: "₹2,999",
    description: "A clean, modern website for small businesses wanting a strong online presence.",
    features: [
      "4–5 static pages (Home, About, Services, Contact)",
      "WordPress template-based design",
      "Fully responsive on all devices",
      "SEO-ready architecture",
      "Proper CTAs + lead integrations",
    ],
    time: "Max 3 Days",
    bestFor: "Local businesses, freelancers",
    icon: Briefcase,
  },
  {
    id: 2,
    title: "Landing Page",
    price: "₹1,999",
    description: "High-conversion single-page website built to turn traffic into leads/sales.",
    features: [
      "1-page high-impact layout",
      "Custom or Template variants",
      "Strong CTA-focused design",
      "Mobile-first approach",
      "Fast loading optimization",
    ],
    time: "Max 2 Days",
    bestFor: "Ads campaigns, product launches",
    icon: Rocket,
  },
  {
    id: 3,
    title: "E-Commerce Website",
    price: "₹4,999",
    description: "Full-fledged store to sell products smoothly with a powerful dashboard.",
    features: [
      "Complete online store setup",
      "Cart, Checkout, Payment Gateway (UPI/Cards)",
      "Admin Dashboard + CMS",
      "Inventory management",
      "Professional clean UI",
    ],
    time: "Max 5 Days",
    bestFor: "Clothing, electronics, D2C startups",
    icon: ShoppingBag,
  },
  {
    id: 4,
    title: "Portfolio Website",
    price: "₹2,499",
    description: "Stylish, modern portfolio to showcase your work professionally.",
    features: [
      "4-page website (Home, About, Gallery, Contact)",
      "Smooth animations",
      "Clean typography",
      "Fully responsive",
      "Template or Custom options",
    ],
    time: "Max 3 Days",
    bestFor: "Designers, photographers, artists",
    icon: Users,
  },
  {
    id: 5,
    title: "Premium Custom Build",
    price: "₹7,999",
    description: "Fully custom, high-end website crafted from scratch for your brand.",
    features: [
      "Completely custom UI/UX (No Templates)",
      "Advanced interactions & animations",
      "Tailored page structure",
      "Optional CMS",
      "Unlimited revisions until approval",
    ],
    time: "Max 10 Days",
    bestFor: "Startups, premium brands, tech founders",
    icon: Code,
    isPremium: true,
  },
];

export const PROJECTS = [
  {
    id: 1,
    name: "Clever — Saas Landing Page",
    category: "Agency",
    description: "Clever is a modern SaaS landing page template designed to showcase your software features effortlessly.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", // Placeholder for laptop mockup
    bg: "bg-gradient-to-br from-slate-800 to-slate-900"
  },
  {
    id: 2,
    name: "Genius — SaaS Landing Page",
    category: "SaaS",
    description: "Genius is a minimal SaaS landing page template, designed to be modern, simple, and easily adaptable to any brand.",
    image: "https://images.unsplash.com/photo-1481487484168-9b930d9b71e5?q=80&w=2617&auto=format&fit=crop",
    bg: "bg-gradient-to-br from-zinc-800 to-zinc-900"
  },
  {
    id: 3,
    name: "Sap - SaaS Website Template",
    category: "SaaS",
    description: "SAP is a landing page template designed to showcase SaaS and app information effectively.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    bg: "bg-gradient-to-br from-stone-800 to-stone-900"
  },
  {
    id: 4,
    name: "Waitlisty — Waitlist Landing Page",
    category: "Waitlist",
    description: "The ideal template for crafting a sleek and efficient waitlist landing page for your upcoming product.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop",
    bg: "bg-gradient-to-br from-indigo-950 to-slate-900"
  },

];

export const TESTIMONIALS = [
  {
    name: "Rahul S.",
    role: "Startup Founder",
    text: "Clean design, fast delivery, and zero hassle. Exactly what we needed.",
    image: "https://picsum.photos/seed/rahul/100/100",
  },
  {
    name: "Megha K.",
    role: "Boutique Owner",
    text: "They delivered my entire ecommerce store in just 3 days. Amazing work!",
    image: "https://picsum.photos/seed/megha/100/100",
  },
  {
    name: "Arjun P.",
    role: "Freelancer",
    text: "My portfolio finally looks professional. Conversions went up instantly.",
    image: "https://picsum.photos/seed/arjun/100/100",
  },
];

export const PROCESS_STEPS = [
  { id: 1, title: "Share Requirements", desc: "Goals, pages, & style." },
  { id: 2, title: "Approve Design", desc: "Clean, modern layout." },
  { id: 3, title: "Development", desc: "Fast, SEO-ready build." },
  { id: 4, title: "Launch & Support", desc: "Go live with assistance." },
];