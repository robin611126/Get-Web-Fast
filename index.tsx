import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ReactLenis } from 'lenis/react';
import { useAnimationFrame } from 'framer-motion';

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useAnimationFrame((time) => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.raf(time);
    }
  });

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{ lerp: 0.05, wheelMultiplier: 1.2, smoothWheel: true, syncTouch: true, touchMultiplier: 2 }}
    >
      {children}
    </ReactLenis>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SmoothScrolling>
          <App />
        </SmoothScrolling>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);