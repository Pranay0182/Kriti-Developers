"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Sparkles, Building2 } from "lucide-react";

interface HeroSliderProps {
  images: string[];
  title: string;
  subtitle: string;
  exploreBtnText?: string;
  contactBtnText?: string;
}

export function HeroSlider({
  images,
  title,
  subtitle,
  exploreBtnText = "Explore Projects",
  contactBtnText = "Schedule Private Tour",
}: HeroSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Filter valid images or use fallbacks (strictly Kriti building images)
  const validImages = images && images.length > 0
    ? images
    : [
        "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif",
        "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif",
        "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196626089-whatsapp-image-2026-09-22-at-5.10.48-pm.avif",
      ];

  // Auto-change every 6 seconds
  useEffect(() => {
    if (validImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % validImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [validImages.length]);

  return (
    <section className="relative min-h-[calc(100vh-80px)] min-h-[640px] flex items-start overflow-hidden bg-[#050b14]">
      {/* Background Images Crossfade with Subtle Architectural Zoom */}
      <div className="absolute inset-0 z-0">
        {validImages.map((src, index) => (
          <div
            key={src + index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIdx ? "opacity-100 scale-100 z-[1]" : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={src}
              alt={`Kriti Luxury Development - Slide ${index + 1}`}
              fill
              className="object-cover object-center"
              style={{ objectFit: "cover", objectPosition: "center", width: "100%", height: "100%" }}
              priority={index === 0}
              unoptimized
            />
          </div>
        ))}

        {/* Multi-layered Cinematic Gradient Scrim: Deep obsidian vignette on left for razor sharp text, gentle warm tone */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b14]/95 via-[#050b14]/65 to-[#050b14]/20 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-[#050b14]/30 z-[2]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent z-[2]" />
      </div>

      {/* Content Container - Positioned higher up with responsive top padding */}
      <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 relative z-10 pt-6 sm:pt-8 md:pt-12 lg:pt-14 pb-16 sm:pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow Badge - Compact on mobile to stay on one sleek line */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/30 text-[#dfba8e] text-[9.5px] sm:text-[11px] font-semibold tracking-[0.12em] sm:tracking-[0.2em] uppercase mb-3.5 sm:mb-4 shadow-xl whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse shrink-0" />
            <span>Ranchi&apos;s Landmark Residences</span>
            <span className="text-amber-400/50 hidden xs:inline">•</span>
            <span className="text-amber-200/80 font-normal hidden xs:inline">Est. 2014</span>
          </div>

          {/* Headline - Slightly increased on mobile for bold luxury presence */}
          <h1 className="font-serif text-[42px] sm:text-5xl md:text-6xl lg:text-[74px] text-white mb-3.5 sm:mb-5 tracking-tight leading-[1.04] whitespace-pre-line drop-shadow-md">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-slate-300/90 mb-5 sm:mb-8 max-w-xl font-light leading-relaxed border-l-2 border-[#c69c6d]/60 pl-3.5 sm:pl-4 py-0.5">
            {subtitle}
          </p>

          {/* CTA Group - Decreased on mobile so buttons are sleek and not bulky */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 items-stretch sm:items-center">
            <Link
              href="/projects"
              prefetch={true}
              className="bg-gold-gradient hover:brightness-105 active:scale-95 text-slate-950 font-bold px-5 sm:px-7 h-11 sm:h-12 md:h-13 text-xs md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.16em] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 gold-glow border border-amber-300/50 group"
            >
              <span>{exploreBtnText}</span>
              <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              prefetch={true}
              className="border border-white/30 text-white hover:border-[#c69c6d] hover:bg-white/10 hover:text-white px-5 sm:px-7 h-11 sm:h-12 md:h-13 text-xs md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.16em] rounded-full flex items-center justify-center backdrop-blur-md font-semibold transition-all duration-300 group shadow-md"
            >
              <span>{contactBtnText}</span>
            </Link>
          </div>

          {/* Micro Trust Pills */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-6 text-xs text-slate-300/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#c69c6d]" />
              <span>RERA Registered</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#c69c6d]" />
              <span>Quality Construction</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#c69c6d]" />
              <span>Prime Ranchi Locality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hero Bar with Interactive Progress Track and Coordinates */}
      <div className="absolute bottom-0 w-full py-2.5 px-4 sm:p-6 lg:p-8 z-20 border-t border-white/10 bg-gradient-to-t from-[#050b14]/90 to-transparent backdrop-blur-xs">
        <div className="container max-w-[1536px] mx-auto px-2 sm:px-6 lg:px-12 flex flex-row justify-between items-center gap-2">
          {/* Slide Progress Counter */}
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#dfba8e]">
              0{currentIdx + 1}
            </span>

            {/* Interactive Progress lines */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {validImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="group py-1 cursor-pointer focus:outline-hidden"
                >
                  <div
                    className={`h-0.5 sm:h-1 rounded-full transition-all duration-500 overflow-hidden ${
                      idx === currentIdx
                        ? "w-7 sm:w-14 bg-white/20"
                        : "w-3 sm:w-6 bg-white/20 hover:bg-white/40"
                    }`}
                  >
                    {idx === currentIdx && (
                      <div className="h-full bg-gradient-to-r from-[#e8cfad] to-[#c69c6d] w-full animate-[progress_6s_linear]" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-slate-400">
              0{validImages.length}
            </span>
          </div>

          {/* Location & Trust Coordinates - Single compact line */}
          <div className="flex items-center text-[10px] sm:text-xs font-medium text-slate-300 whitespace-nowrap">
            <MapPin size={12} className="text-[#c69c6d] mr-1 shrink-0" />
            <span className="sm:hidden">Tilla Chowk, Ratu Road</span>
            <span className="hidden sm:inline">Tilla Chowk, Ratu Road</span>
          </div>
        </div>
      </div>
    </section>
  );
}
