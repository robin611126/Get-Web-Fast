export const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
      <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      {/* Glow blobs - Optimized */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[80px] animate-blob will-change-transform"></div>
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[80px] animate-blob animation-delay-2000 will-change-transform"></div>
      {/* Removed third blob for mobile performance */}
    </div>
  );
};

export const ParticleDrift = () => {
  // A simplified particle effect using CSS for performance
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
      {/* We would typically use Canvas for 1000s of particles, but for a "Vercel-like" clean look, 
            subtle noise and a few floating distinct elements are better. 
            Using a noise texture overlay here. */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
};