"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, Eye } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  url: string;
}

export function GalleryInteractive({ initialItems }: { initialItems: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lightboxImg, setLightboxImg] = useState<GalleryItem | null>(null);

  const categories = [
    { label: "All", value: "ALL" },
    { label: "Projects", value: "PROJECTS" },
    { label: "Interiors", value: "INTERIORS" },
    { label: "Amenities", value: "AMENITIES" },
    { label: "Construction", value: "CONSTRUCTION" },
  ];

  const filtered = initialItems.filter(item => {
    if (activeCategory === "ALL") return true;
    return item.category?.toUpperCase() === activeCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd]">
      {/* Lightbox modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center">
            <img
              src={lightboxImg.url}
              alt={lightboxImg.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-serif text-lg font-bold">{lightboxImg.title}</p>
              <span className="text-[#c69c6d] text-xs uppercase tracking-widest">{lightboxImg.category}</span>
            </div>
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-2 right-2 bg-white/10 hover:bg-white text-white hover:text-black p-2.5 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Header matching mockup Image 5 */}
      <section className="relative h-[45vh] min-h-[340px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Gallery"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#070e1c]/80 backdrop-blur-[1px]" />
        </div>

        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="text-[#c69c6d] font-bold tracking-[0.25em] uppercase text-xs mb-3 block">
            VISUAL SHOWCASE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-4 tracking-tight">
            Gallery
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto font-light text-base md:text-lg">
            Explore our projects through captivating images.
          </p>
        </div>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="py-16 md:py-24">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          {/* Category Tabs matching mockup */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat.value
                    ? "bg-[#c69c6d] text-slate-950 shadow-md border border-[#c69c6d]"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900 shadow-2xs"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Photos Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImg(item)}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer shadow-2xs hover:shadow-xl transition-all duration-300 border border-slate-200/80 bg-slate-100"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <span className="text-[#c69c6d] text-[10px] font-bold uppercase tracking-widest mb-1">
                    {item.category}
                  </span>
                  <p className="text-white font-serif text-lg font-bold">{item.title}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-2">
                    <Eye className="w-3.5 h-3.5" /> Click to enlarge
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
