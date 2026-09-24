"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.8, // Luxurious, slow smooth glide
        lerp: 0.08, // Smooth velocity dampening
        smoothWheel: true,
        wheelMultiplier: 0.65, // Gentle wheel sensitivity so user never flies down fast
        touchMultiplier: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}

