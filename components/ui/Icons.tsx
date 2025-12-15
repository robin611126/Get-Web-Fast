import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

// --- Features Icons ---

// 1. Complete First-Year Package
export const FirstYearIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_first_year)">
      <path d="M12.0001 13.3008C11.8701 13.3008 11.7401 13.2708 11.6201 13.2008L2.79008 8.09083C2.44008 7.88083 2.31008 7.42083 2.52008 7.06083C2.73008 6.70083 3.19008 6.58083 3.55008 6.79083L12.0001 11.6808L20.4001 6.82083C20.7601 6.61083 21.2201 6.74083 21.4301 7.09083C21.6401 7.45083 21.5101 7.91083 21.1601 8.12083L12.3901 13.2008C12.2601 13.2608 12.1301 13.3008 12.0001 13.3008Z" fill="currentColor"/>
      <path d="M12 22.3591C11.59 22.3591 11.25 22.0191 11.25 21.6091V12.5391C11.25 12.1291 11.59 11.7891 12 11.7891C12.41 11.7891 12.75 12.1291 12.75 12.5391V21.6091C12.75 22.0191 12.41 22.3591 12 22.3591Z" fill="currentColor"/>
      <path d="M11.9999 22.75C11.1199 22.75 10.2499 22.56 9.55989 22.18L4.21989 19.21C2.76989 18.41 1.63989 16.48 1.63989 14.82V9.17C1.63989 7.51 2.76989 5.59 4.21989 4.78L9.55989 1.82C10.9299 1.06 13.0699 1.06 14.4399 1.82L19.7799 4.79C21.2299 5.59 22.3599 7.52 22.3599 9.18V14.83C22.3599 16.49 21.2299 18.41 19.7799 19.22L14.4399 22.18C13.7499 22.56 12.8799 22.75 11.9999 22.75ZM11.9999 2.75C11.3699 2.75 10.7499 2.88 10.2899 3.13L4.94989 6.1C3.98989 6.63 3.13989 8.07 3.13989 9.17V14.82C3.13989 15.92 3.98989 17.36 4.94989 17.9L10.2899 20.87C11.1999 21.38 12.7999 21.38 13.7099 20.87L19.0499 17.9C20.0099 17.36 20.8599 15.93 20.8599 14.82V9.17C20.8599 8.07 20.0099 6.63 19.0499 6.09L13.7099 3.12C13.2499 2.88 12.6299 2.75 11.9999 2.75Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip_first_year"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 2. Premium Quality, Honest Prices
export const PremiumQualityIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_premium)">
      <path d="M5.30005 9.30003C4.89005 9.30003 4.54005 9.02003 4.45005 8.62003L4.19005 7.49003C4.07005 6.95003 3.64005 6.53003 3.11005 6.40003L1.97005 6.13003C1.58005 6.05003 1.30005 5.70003 1.30005 5.28003C1.30005 4.87003 1.58005 4.52003 1.98005 4.43003L3.11005 4.17003C3.65005 4.05003 4.07005 3.62003 4.20005 3.09003L4.47005 1.95003C4.55005 1.56003 4.90005 1.28003 5.32005 1.28003C5.73005 1.28003 6.08005 1.56003 6.17005 1.96003L6.43005 3.09003C6.55005 3.63003 6.98005 4.05003 7.51005 4.18003L8.65005 4.45003C9.04005 4.53003 9.32005 4.88003 9.32005 5.30003C9.32005 5.71003 9.04005 6.06003 8.65005 6.14003L7.51005 6.40003C6.97005 6.52003 6.55005 6.95003 6.43005 7.48003L6.16005 8.63003C6.08005 9.02003 5.72005 9.30003 5.30005 9.30003ZM4.31005 5.29003C4.72005 5.54003 5.06005 5.88003 5.30005 6.29003C5.55005 5.88003 5.89005 5.54003 6.30005 5.30003C5.89005 5.05003 5.55005 4.71003 5.31005 4.30003C5.06005 4.71003 4.72005 5.05003 4.31005 5.29003Z" fill="currentColor"/>
      <path d="M19 16.25H5C2.76 16.25 1.25 14.74 1.25 12.5V10C1.25 9.59 1.59 9.25 2 9.25C2.41 9.25 2.75 9.59 2.75 10V12.5C2.75 13.18 2.97 14.75 5 14.75H19C21.03 14.75 21.25 13.18 21.25 12.5V7.5C21.25 6.82 21.03 5.25 19 5.25H12C11.59 5.25 11.25 4.91 11.25 4.5C11.25 4.09 11.59 3.75 12 3.75H19C21.24 3.75 22.75 5.26 22.75 7.5V12.5C22.75 14.74 21.24 16.25 19 16.25Z" fill="currentColor"/>
      <path d="M16.5 13.25H7.5C7.09 13.25 6.75 12.91 6.75 12.5C6.75 12.09 7.09 11.75 7.5 11.75H16.5C16.91 11.75 17.25 12.09 17.25 12.5C17.25 12.91 16.91 13.25 16.5 13.25Z" fill="currentColor"/>
      <path d="M17 8.75H15C14.59 8.75 14.25 8.41 14.25 8C14.25 7.59 14.59 7.25 15 7.25H17C17.41 7.25 17.75 7.59 17.75 8C17.75 8.41 17.41 8.75 17 8.75Z" fill="currentColor"/>
      <path d="M8 21.75C7.59 21.75 7.25 21.41 7.25 21V19C7.25 18.59 7.59 18.25 8 18.25C8.41 18.25 8.75 18.59 8.75 19V21C8.75 21.41 8.41 21.75 8 21.75Z" fill="currentColor"/>
      <path d="M12 21.75C11.59 21.75 11.25 21.41 11.25 21V19C11.25 18.59 11.59 18.25 12 18.25C12.41 18.25 12.75 18.59 12.75 19V21C12.75 21.41 12.41 21.75 12 21.75Z" fill="currentColor"/>
      <path d="M16 21.75C15.59 21.75 15.25 21.41 15.25 21V19C15.25 18.59 15.59 18.25 16 18.25C16.41 18.25 16.75 18.59 16.75 19V21C16.75 21.41 16.41 21.75 16 21.75Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip_premium"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 3. Lightning-Fast 48-72h Delivery
export const FastDeliveryIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_fast)">
      <path d="M9.31994 13.2805H12.4099V20.4805C12.4099 21.5405 13.7299 22.0405 14.4299 21.2405L21.9999 12.6405C22.6599 11.8905 22.1299 10.7205 21.1299 10.7205H18.0399V3.52046C18.0399 2.46046 16.7199 1.96046 16.0199 2.76046L8.44994 11.3605C7.79994 12.1105 8.32994 13.2805 9.31994 13.2805Z" fill="currentColor"/>
      <path d="M8.5 4.75H1.5C1.09 4.75 0.75 4.41 0.75 4C0.75 3.59 1.09 3.25 1.5 3.25H8.5C8.91 3.25 9.25 3.59 9.25 4C9.25 4.41 8.91 4.75 8.5 4.75Z" fill="currentColor"/>
      <path d="M7.5 20.75H1.5C1.09 20.75 0.75 20.41 0.75 20C0.75 19.59 1.09 19.25 1.5 19.25H7.5C7.91 19.25 8.25 19.59 8.25 20C8.25 20.41 7.91 20.75 7.5 20.75Z" fill="currentColor"/>
      <path d="M4.5 12.75H1.5C1.09 12.75 0.75 12.41 0.75 12C0.75 11.59 1.09 11.25 1.5 11.25H4.5C4.91 11.25 5.25 11.59 5.25 12C5.25 12.41 4.91 12.75 4.5 12.75Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip_fast"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 4. Pixel-Perfect Design
export const PixelPerfectIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_pixel)">
      <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="currentColor"/>
      <path d="M14 17.75H10C7.93 17.75 6.25 16.07 6.25 14V10C6.25 7.93 7.93 6.25 10 6.25H14C16.07 6.25 17.75 7.93 17.75 10V14C17.75 16.07 16.07 17.75 14 17.75ZM10 7.75C8.76 7.75 7.75 8.76 7.75 10V14C7.75 15.24 8.76 16.25 10 16.25H14C15.24 16.25 16.25 15.24 16.25 14V10C16.25 8.76 15.24 7.75 14 7.75H10Z" fill="currentColor"/>
      <path d="M12 17.75C11.59 17.75 11.25 17.41 11.25 17V7C11.25 6.59 11.59 6.25 12 6.25C12.41 6.25 12.75 6.59 12.75 7V17C12.75 17.41 12.41 17.75 12 17.75Z" fill="currentColor"/>
      <path d="M17 12.75H7C6.59 12.75 6.25 12.41 6.25 12C6.25 11.59 6.59 11.25 7 11.25H17C17.41 11.25 17.75 11.59 17.75 12C17.75 12.41 17.41 12.75 17 12.75Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip_pixel"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 5. SEO-Ready Architecture
export const SeoIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_seo)">
      <path d="M11.5 21C16.75 21 21 16.75 21 11.5C21 6.25 16.75 2 11.5 2C6.25 2 2 6.25 2 11.5C2 16.75 6.25 21 11.5 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 22L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 10H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 13H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip_seo"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 6. Transparent Pricing
export const PricingIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_pricing)">
      <path d="M7.2 7.76007C7.2 7.98007 7.01 8.17007 6.79 8.14007C6.57 8.14007 6.38 7.95007 6.38 7.73007C6.38 7.51007 6.57 7.32007 6.79 7.32007C6.99584 7.32007 7.2 7.51763 7.2 7.73007" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22.6899 13.79L21.6099 14.04C20.8399 14.22 20.2299 14.82 20.0499 15.6L19.7999 16.68C19.7799 16.79 19.6099 16.79 19.5799 16.68L19.3299 15.6C19.1499 14.83 18.5499 14.22 17.7699 14.04L16.6899 13.79C16.5799 13.77 16.5799 13.6 16.6899 13.57L17.7699 13.32C18.5399 13.14 19.1499 12.54 19.3299 11.76L19.5799 10.68C19.5999 10.57 19.7699 10.57 19.7999 10.68L20.0499 11.76C20.2299 12.53 20.8299 13.14 21.6099 13.32L22.6899 13.57C22.7999 13.59 22.7999 13.76 22.6899 13.79Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M17.56 18.86L15.46 20.96C14.29 22.13 12.39 22.13 11.22 20.96L2.09997 11.84C1.53997 11.28 1.21997 10.51 1.21997 9.72004V7.26004C1.21997 6.46004 1.53997 5.70004 2.09997 5.14004L4.16997 3.07004C4.72997 2.51004 5.47997 2.20004 6.26997 2.19004L8.95997 2.17004C9.76997 2.17004 10.55 2.49004 11.12 3.07004L17.27 9.33004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip_pricing"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// --- Process Icons ---

// 1. Discovery Phase
export const DiscoveryIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_discovery)">
      <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 3C15.97 5.92 16.46 8.96 16.46 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16V15C5.92 15.97 8.96 16.46 12 16.46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 8.99961C8.84 7.04961 15.16 7.04961 21 8.99961" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.2 21.4C19.9673 21.4 21.4 19.9673 21.4 18.2C21.4 16.4327 19.9673 15 18.2 15C16.4327 15 15 16.4327 15 18.2C15 19.9673 16.4327 21.4 18.2 21.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 22L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip_discovery"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 2. Design Concept
export const DesignConceptIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_design)">
      <path d="M13.2698 23.2495H10.7498C10.0498 23.2495 9.41978 22.9495 8.99978 22.4395C8.62978 21.9795 8.48978 21.3895 8.61978 20.8295L9.02978 19.0195C9.10978 18.6795 9.40978 18.4395 9.75978 18.4395H14.2598C14.6098 18.4395 14.9098 18.6795 14.9898 19.0195L15.3998 20.8295C15.5298 21.4295 15.4098 22.0095 15.0398 22.4695C14.6297 22.9595 13.9898 23.2495 13.2698 23.2495ZM10.3598 19.9196L10.0798 21.1495C10.0498 21.2995 10.1098 21.4195 10.1698 21.4895C10.2998 21.6495 10.5098 21.7395 10.7498 21.7395H13.2698C13.5298 21.7395 13.7498 21.6595 13.8698 21.5095C13.9498 21.4095 13.9698 21.2895 13.9398 21.1395L13.6598 19.9095H10.3598V19.9196Z" fill="currentColor"/>
      <path d="M14.26 19.9208C14.05 19.9208 13.85 19.8408 13.7 19.6708C13.43 19.3608 13.45 18.8907 13.76 18.6107L15.49 17.0707C16.18 16.4607 16.15 16.3108 15.64 15.6708L12.59 11.8007C12.42 11.5907 12.22 11.4707 12.01 11.4707C11.8 11.4707 11.6 11.5907 11.43 11.8007L8.38002 15.6708C7.84002 16.3608 7.85002 16.5108 8.51002 17.0508L10.26 18.6107C10.57 18.8807 10.6 19.3608 10.32 19.6708C10.04 19.9808 9.57002 20.0107 9.26002 19.7307L7.53002 18.1907C6.27002 17.1607 6.16002 16.0607 7.20002 14.7407L10.25 10.8707C10.7 10.3007 11.34 9.9707 12.01 9.9707C12.68 9.9707 13.32 10.3007 13.77 10.8707L16.82 14.7407C17.85 16.0407 17.75 17.0807 16.49 18.1907L14.76 19.7307C14.61 19.8607 14.43 19.9208 14.26 19.9208Z" fill="currentColor"/>
      <path d="M12.0098 14.3992C11.5998 14.3992 11.2598 14.0592 11.2598 13.6492V11.1191C11.2598 10.7091 11.5998 10.3691 12.0098 10.3691C12.4198 10.3691 12.7598 10.7091 12.7598 11.1191V13.6492C12.7598 14.0692 12.4198 14.3992 12.0098 14.3992Z" fill="currentColor"/>
      <path d="M12 6.29003C11.5 6.29003 11 6.10002 10.62 5.72002L9.84002 4.94006C9.08002 4.18006 9.08002 2.94005 9.84002 2.18005L10.62 1.40008C11.38 0.640078 12.62 0.640078 13.38 1.40008L14.16 2.18005C14.92 2.94005 14.92 4.18006 14.16 4.94006L13.38 5.72002C13 6.10002 12.5 6.29003 12 6.29003ZM12 2.33007C11.88 2.33007 11.77 2.37008 11.68 2.46008L10.9 3.24004C10.82 3.32004 10.77 3.44005 10.77 3.56005C10.77 3.68005 10.82 3.79006 10.9 3.88006L11.68 4.66003C11.85 4.83003 12.15 4.83003 12.32 4.66003L13.1 3.88006C13.18 3.80006 13.23 3.68005 13.23 3.56005C13.23 3.44005 13.18 3.33004 13.1 3.24004L12.32 2.46008C12.23 2.38008 12.12 2.33007 12 2.33007Z" fill="currentColor"/>
      <path d="M20.55 14.0606H19.45C18.37 14.0606 17.5 13.1805 17.5 12.1105V11.0106C17.5 9.93056 18.38 9.06055 19.45 9.06055H20.55C21.63 9.06055 22.5 9.94056 22.5 11.0106V12.1105C22.5 13.1905 21.62 14.0606 20.55 14.0606ZM19.45 10.5605C19.2 10.5605 19 10.7606 19 11.0106V12.1105C19 12.3605 19.2 12.5606 19.45 12.5606H20.55C20.8 12.5606 21 12.3605 21 12.1105V11.0106C21 10.7606 20.8 10.5605 20.55 10.5605H19.45Z" fill="currentColor"/>
      <path d="M4.55 14.0606H3.45C2.37 14.0606 1.5 13.1805 1.5 12.1105V11.0106C1.5 9.93056 2.38 9.06055 3.45 9.06055H4.55C5.63 9.06055 6.5 9.94056 6.5 11.0106V12.1105C6.5 13.1905 5.62 14.0606 4.55 14.0606ZM3.45 10.5605C3.2 10.5605 3 10.7606 3 11.0106V12.1105C3 12.3605 3.2 12.5606 3.45 12.5606H4.55C4.8 12.5606 5 12.3605 5 12.1105V11.0106C5 10.7606 4.8 10.5605 4.55 10.5605H3.45Z" fill="currentColor"/>
      <path d="M18.5402 10.8502C18.3502 10.8502 18.1602 10.7802 18.0102 10.6302L12.7102 5.33023C12.4202 5.04023 12.4202 4.56023 12.7102 4.27023C13.0002 3.98023 13.4802 3.98023 13.7702 4.27023L19.0702 9.57022C19.3602 9.86022 19.3602 10.3402 19.0702 10.6302C18.9202 10.7802 18.7302 10.8502 18.5402 10.8502Z" fill="currentColor"/>
      <path d="M5.4599 10.8502C5.2699 10.8502 5.0799 10.7802 4.9299 10.6302C4.6399 10.3402 4.6399 9.86022 4.9299 9.57022L10.2299 4.27023C10.5199 3.98023 10.9999 3.98023 11.2899 4.27023C11.5799 4.56023 11.5799 5.04023 11.2899 5.33023L5.9899 10.6302C5.8399 10.7802 5.6499 10.8502 5.4599 10.8502Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip_design"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 3. Development & Testing
export const DevelopmentIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_development)">
      <path d="M8 10L6 12L8 14" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10L18 12L16 14" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 9.66992L11 14.33" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.29998 7.97 2.84998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip_development"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 4. Launch & Support
export const LaunchSupportIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_launch)">
      <path d="M6.87988 18.1501V16.0801" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 18.1498V14.0098" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17.1201 18.1497V11.9297" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17.1199 5.84961L16.6599 6.38961C14.1099 9.36961 10.6899 11.4796 6.87988 12.4296" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.1899 5.84961H17.1199V8.76961" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12.97V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip_launch"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// --- About Us Icons ---

// 1. Our Story
export const OurStoryIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_story)">
      <path d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z" fill="currentColor"/>
      <path d="M14.08 14.1499C11.29 12.2899 6.73996 12.2899 3.92996 14.1499C2.65996 14.9999 1.95996 16.1499 1.95996 17.3799C1.95996 18.6099 2.65996 19.7499 3.91996 20.5899C5.31996 21.5299 7.15996 21.9999 8.99996 21.9999C10.84 21.9999 12.68 21.5299 14.08 20.5899C15.34 19.7399 16.04 18.5999 16.04 17.3599C16.03 16.1299 15.34 14.9899 14.08 14.1499Z" fill="currentColor"/>
      <path d="M19.9901 7.3401C20.1501 9.2801 18.7701 10.9801 16.8601 11.2101C16.8501 11.2101 16.8501 11.2101 16.8401 11.2101H16.8101C16.7501 11.2101 16.6901 11.2101 16.6401 11.2301C15.6701 11.2801 14.7801 10.9701 14.1101 10.4001C15.1401 9.4801 15.7301 8.1001 15.6101 6.6001C15.5401 5.7901 15.2601 5.0501 14.8401 4.4201C15.2201 4.2301 15.6601 4.1101 16.1101 4.0701C18.0701 3.9001 19.8201 5.3601 19.9901 7.3401Z" fill="currentColor"/>
      <path d="M21.99 16.5904C21.91 17.5604 21.29 18.4004 20.25 18.9704C19.25 19.5204 17.99 19.7804 16.74 19.7504C17.46 19.1004 17.88 18.2904 17.96 17.4304C18.06 16.1904 17.47 15.0004 16.29 14.0504C15.62 13.5204 14.84 13.1004 13.99 12.7904C16.2 12.1504 18.98 12.5804 20.69 13.9604C21.61 14.7004 22.08 15.6304 21.99 16.5904Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip_story"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 2. What Drives Us
export const WhatDrivesUsIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_drives)">
      <path d="M17.1999 12.4004C14.5499 12.4004 12.3999 14.5504 12.3999 17.2004C12.3999 18.1004 12.6499 18.9504 13.0999 19.6704C13.9299 21.0604 15.4499 22.0004 17.1999 22.0004C18.9499 22.0004 20.4799 21.0604 21.2999 19.6704C21.7399 18.9504 21.9999 18.1004 21.9999 17.2004C21.9999 14.5504 19.8499 12.4004 17.1999 12.4004ZM19.5799 16.5704L17.0199 18.9304C16.8799 19.0604 16.6899 19.1304 16.5099 19.1304C16.3199 19.1304 16.1299 19.0604 15.9799 18.9104L14.7999 17.7304C14.5099 17.4404 14.5099 16.9604 14.7999 16.6704C15.0899 16.3804 15.5699 16.3804 15.8599 16.6704L16.5299 17.3404L18.5599 15.4604C18.8599 15.1804 19.3399 15.2004 19.6199 15.5004C19.8999 15.8104 19.8799 16.2904 19.5799 16.5704Z" fill="currentColor"/>
      <path d="M22 8.73062C22 9.92062 21.81 11.0206 21.48 12.0406C21.42 12.2506 21.17 12.3106 20.99 12.1806C19.9 11.3706 18.57 10.9406 17.2 10.9406C13.73 10.9406 10.9 13.7706 10.9 17.2406C10.9 18.3206 11.18 19.3806 11.71 20.3206C11.87 20.6006 11.68 20.9606 11.38 20.8506C8.97 20.0306 4.1 17.0406 2.52 12.0406C2.19 11.0206 2 9.92062 2 8.73062C2 5.64062 4.49 3.14063 7.56 3.14063C9.37 3.14063 10.99 4.02062 12 5.37062C13.01 4.02062 14.63 3.14063 16.44 3.14063C19.51 3.14062 22 5.64062 22 8.73062Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip_drives"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 3. Our Approach
export const OurApproachIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_approach)">
      <path d="M13.01 2.92031L18.91 5.54031C20.61 6.29031 20.61 7.53031 18.91 8.28031L13.01 10.9003C12.34 11.2003 11.24 11.2003 10.57 10.9003L4.67002 8.28031C2.97002 7.53031 2.97002 6.29031 4.67002 5.54031L10.57 2.92031C11.24 2.62031 12.34 2.62031 13.01 2.92031Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path opacity="0.4" d="M3 11C3 11.84 3.63 12.81 4.4 13.15L11.19 16.17C11.71 16.4 12.3 16.4 12.81 16.17L19.6 13.15C20.37 12.81 21 11.84 21 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path opacity="0.4" d="M3 16C3 16.93 3.55 17.77 4.4 18.15L11.19 21.17C11.71 21.4 12.3 21.4 12.81 21.17L19.6 18.15C20.45 17.77 21 16.93 21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip_approach"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 4. Our Promise
export const OurPromiseIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_promise)">
      <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.88 11.53C16.88 11.92 16.57 12.23 16.18 12.23C15.79 12.23 15.48 11.92 15.48 11.53V11.35L12.76 14.07C12.61 14.22 12.41 14.29 12.2 14.27C11.99 14.25 11.8 14.14 11.69 13.96L10.67 12.44L8.29 14.82C8.15 14.96 7.98 15.02 7.8 15.02C7.62 15.02 7.44 14.95 7.31 14.82C7.04 14.55 7.04 14.11 7.31 13.83L10.29 10.85C10.44 10.7 10.64 10.63 10.85 10.65C11.06 10.67 11.25 10.78 11.36 10.96L12.38 12.48L14.49 10.37H14.31C13.92 10.37 13.61 10.06 13.61 9.67C13.61 9.28 13.92 8.97 14.31 8.97H16.17C16.26 8.97 16.35 8.99 16.44 9.02C16.61 9.09 16.75 9.23 16.82 9.4C16.86 9.49 16.87 9.58 16.87 9.67V11.53H16.88Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip_promise"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// --- Contact Icons ---

// 1. Email us here
export const EmailIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_email)">
      <path d="M21.3 12.2305H17.82C16.84 12.2305 15.97 12.7705 15.53 13.6505L14.69 15.3105C14.49 15.7105 14.09 15.9605 13.65 15.9605H10.37C10.06 15.9605 9.62 15.8905 9.33 15.3105L8.49 13.6605C8.05 12.7905 7.17 12.2405 6.2 12.2405H2.7C2.31 12.2405 2 12.5505 2 12.9405V16.2005C2 19.8305 4.18 22.0005 7.82 22.0005H16.2C19.63 22.0005 21.74 20.1205 22 16.7805V12.9305C22 12.5505 21.69 12.2305 21.3 12.2305Z" fill="currentColor"/>
      <path d="M12.75 2C12.75 1.59 12.41 1.25 12 1.25C11.59 1.25 11.25 1.59 11.25 2V4H12.75V2Z" fill="currentColor"/>
      <path d="M22 9.81V10.85C21.78 10.77 21.54 10.73 21.3 10.73H17.82C16.27 10.73 14.88 11.59 14.19 12.97L13.44 14.45H10.58L9.83 12.98C9.14 11.59 7.75 10.73 6.2 10.73H2.7C2.46 10.73 2.22 10.77 2 10.85V9.81C2 6.17 4.17 4 7.81 4H11.25V7.19L10.53 6.47C10.24 6.18 9.76 6.18 9.47 6.47C9.18 6.76 9.18 7.24 9.47 7.53L11.47 9.53C11.48 9.54 11.49 9.54 11.49 9.55C11.56 9.61 11.63 9.66 11.71 9.69C11.81 9.73 11.9 9.75 12 9.75C12.1 9.75 12.19 9.73 12.28 9.69C12.37 9.66 12.46 9.6 12.53 9.53L14.53 7.53C14.82 7.24 14.82 6.76 14.53 6.47C14.24 6.18 13.76 6.18 13.47 6.47L12.75 7.19V4H16.19C19.83 4 22 6.17 22 9.81Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip_email"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 2. Location
export const LocationIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_location)">
      <path d="M11.9999 14.1695C9.86988 14.1695 8.12988 12.4395 8.12988 10.2995C8.12988 8.15945 9.86988 6.43945 11.9999 6.43945C14.1299 6.43945 15.8699 8.16945 15.8699 10.3095C15.8699 12.4495 14.1299 14.1695 11.9999 14.1695ZM11.9999 7.93945C10.6999 7.93945 9.62988 8.99945 9.62988 10.3095C9.62988 11.6195 10.6899 12.6795 11.9999 12.6795C13.3099 12.6795 14.3699 11.6195 14.3699 10.3095C14.3699 8.99945 13.2999 7.93945 11.9999 7.93945Z" fill="currentColor"/>
      <path d="M11.9999 22.76C10.5199 22.76 9.02993 22.2 7.86993 21.09C4.91993 18.25 1.65993 13.72 2.88993 8.33C3.99993 3.44 8.26993 1.25 11.9999 1.25C11.9999 1.25 11.9999 1.25 12.0099 1.25C15.7399 1.25 20.0099 3.44 21.1199 8.34C22.3399 13.73 19.0799 18.25 16.1299 21.09C14.9699 22.2 13.4799 22.76 11.9999 22.76ZM11.9999 2.75C9.08993 2.75 5.34993 4.3 4.35993 8.66C3.27993 13.37 6.23993 17.43 8.91993 20C10.6499 21.67 13.3599 21.67 15.0899 20C17.7599 17.43 20.7199 13.37 19.6599 8.66C18.6599 4.3 14.9099 2.75 11.9999 2.75Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip_location"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);

// 3. Or give us a call
export const PhoneCallIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    {...props}
  >
    <g clipPath="url(#clip_phone_call)">
      <path d="M17.45 22.75C16.32 22.75 15.13 22.48 13.9 21.96C12.7 21.45 11.49 20.75 10.31 19.9C9.14 19.04 8.01 18.08 6.94 17.03C5.88 15.96 4.92 14.83 4.07 13.67C3.21 12.47 2.52 11.27 2.03 10.11C1.51 8.87 1.25 7.67 1.25 6.54C1.25 5.76 1.39 5.02 1.66 4.33C1.94 3.62 2.39 2.96 3 2.39C3.77 1.63 4.65 1.25 5.59 1.25C5.98 1.25 6.38 1.34 6.72 1.5C7.11 1.68 7.44 1.95 7.68 2.31L10 5.58C10.21 5.87 10.37 6.15 10.48 6.43C10.61 6.73 10.68 7.03 10.68 7.32C10.68 7.7 10.57 8.07 10.36 8.42C10.21 8.69 9.98 8.98 9.69 9.27L9.01 9.98C9.02 10.01 9.03 10.03 9.04 10.05C9.16 10.26 9.4 10.62 9.86 11.16C10.35 11.72 10.81 12.23 11.27 12.7C11.86 13.28 12.35 13.74 12.81 14.12C13.38 14.6 13.75 14.84 13.97 14.95L13.95 15L14.68 14.28C14.99 13.97 15.29 13.74 15.58 13.59C16.13 13.25 16.83 13.19 17.53 13.48C17.79 13.59 18.07 13.74 18.37 13.95L21.69 16.31C22.06 16.56 22.33 16.88 22.49 17.26C22.64 17.64 22.71 17.99 22.71 18.34C22.71 18.82 22.6 19.3 22.39 19.75C22.18 20.2 21.92 20.59 21.59 20.95C21.02 21.58 20.4 22.03 19.68 22.32C18.99 22.6 18.24 22.75 17.45 22.75ZM5.59 2.75C5.04 2.75 4.53 2.99 4.04 3.47C3.58 3.9 3.26 4.37 3.06 4.88C2.85 5.4 2.75 5.95 2.75 6.54C2.75 7.47 2.97 8.48 3.41 9.52C3.86 10.58 4.49 11.68 5.29 12.78C6.09 13.88 7 14.95 8 15.96C9 16.95 10.08 17.87 11.19 18.68C12.27 19.47 13.38 20.11 14.48 20.57C16.19 21.3 17.79 21.47 19.11 20.92C19.62 20.71 20.07 20.39 20.48 19.93C20.71 19.68 20.89 19.41 21.04 19.09C21.16 18.84 21.22 18.58 21.22 18.32C21.22 18.16 21.19 18 21.11 17.82C21.08 17.76 21.02 17.65 20.83 17.52L17.51 15.16C17.31 15.02 17.13 14.92 16.96 14.85C16.74 14.76 16.65 14.67 16.31 14.88C16.11 14.98 15.93 15.13 15.73 15.33L14.97 16.08C14.58 16.46 13.98 16.55 13.52 16.38L13.25 16.26C12.84 16.04 12.36 15.7 11.83 15.25C11.35 14.84 10.83 14.36 10.2 13.74C9.71 13.24 9.22 12.71 8.71 12.12C8.24 11.57 7.9 11.1 7.69 10.71L7.57 10.41C7.51 10.18 7.49 10.05 7.49 9.91C7.49 9.55 7.62 9.23 7.87 8.98L8.62 8.2C8.82 8 8.97 7.81 9.07 7.64C9.15 7.51 9.18 7.4 9.18 7.3C9.18 7.22 9.15 7.1 9.1 6.98C9.03 6.82 8.92 6.64 8.78 6.45L6.46 3.17C6.36 3.03 6.24 2.93 6.09 2.86C5.93 2.79 5.76 2.75 5.59 2.75ZM13.95 15.01L13.79 15.69L14.06 14.99C14.01 14.98 13.97 14.99 13.95 15.01Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip_phone_call"><rect width="24" height="24" fill="white"/></clipPath>
    </defs>
  </svg>
);