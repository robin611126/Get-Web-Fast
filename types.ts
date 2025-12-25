import React from 'react';

// Changed from LucideIcon to React.ElementType to support both Lucide and Custom Icons
export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Service {
  id: number;
  title: string;
  price: string;
  description: string;
  features: string[];
  time: string;
  bestFor: string;
  icon: React.ElementType;
  isPremium?: boolean;
}

export interface ScrollingBannerItem {
  id: string;
  text: string;
  direction: 'left' | 'right';
  speed: number;
  is_active: boolean;
  order_index: number;
}