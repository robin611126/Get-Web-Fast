import { LucideIcon } from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Service {
  id: number;
  title: string;
  price: string;
  description: string;
  features: string[];
  time: string;
  bestFor: string;
  icon: LucideIcon;
  isPremium?: boolean;
}
