"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

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
  contactBtnText = "Contact Us",
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

  // Auto-change every 5 seconds
  useEffect(() => {
    if (validImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % validImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [validImages.length]);

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
      {/* Background Images Crossfade */}
      <div className="absolute inset-0 z-0">
        {validImages.map((src, index) => (
          <div
            key={src + index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIdx ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
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

        {/* Elegant soft gradient so text is readable while building is illuminated and clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070e1c]/80 via-[#070e1c]/30 to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1c]/70 via-transparent to-transparent z-[2]" />
      </div>

      {/* Content Container */}
      <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 relative z-10 py-16">
        <div className="max-w-2xl">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight leading-[1.1] whitespace-pre-line drop-shadow-sm">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-lg font-light leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/projects"
              prefetch={true}
              className="bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-8 h-14 text-sm uppercase tracking-wider rounded flex items-center justify-center shadow-lg transition"
            >
              {exploreBtnText} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              prefetch={true}
              className="border border-white/60 text-white hover:bg-white hover:text-slate-950 px-8 h-14 text-sm uppercase tracking-wider rounded flex items-center justify-center backdrop-blur-xs font-semibold transition"
            >
              {contactBtnText}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Hero Bar matching mockup (Slide Dots + Location) */}
      <div className="absolute bottom-0 w-full p-6 z-20">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Slide Indicator Dots matching mockup Image 1 */}
          <div className="flex items-center gap-2">
            {validImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIdx
                    ? "w-8 h-2.5 bg-[#c69c6d] shadow-sm"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center text-white text-sm font-medium">
            <MapPin size={16} className="text-[#c69c6d] mr-2" />
            Ranchi, Jharkhand
          </div>
        </div>
      </div>
    </section>
  );
}
