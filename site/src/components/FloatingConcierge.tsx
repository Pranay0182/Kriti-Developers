"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Phone, Calendar, X, Sparkles } from "lucide-react";

export function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-3.5 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="mb-3 w-72 bg-[#050b14]/95 backdrop-blur-xl border border-amber-400/30 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#dfba8e]">VIP Concierge</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 transition-colors"
              aria-label="Close concierge"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed font-light">
            Connect instantly with our senior real estate advisory desk in Ranchi.
          </p>

          <div className="space-y-2.5">
            <a
              href="https://wa.me/919876543210?text=Hello%20Kriti%20Developers,%20I%20would%20like%20to%20know%20more%20about%20your%20luxury%20residences."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/30 transition-all text-xs font-semibold group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageSquare size={16} />
              </div>
              <div className="flex-1">
                <div className="text-white">Chat on WhatsApp</div>
                <div className="text-[10px] text-slate-400 font-normal">Brochure & Floorplans</div>
              </div>
            </a>

            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-amber-500/20 border border-white/5 hover:border-amber-500/30 transition-all text-xs font-semibold group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-[#dfba8e] group-hover:scale-110 transition-transform">
                <Phone size={16} />
              </div>
              <div className="flex-1">
                <div className="text-white">Direct Phone Call</div>
                <div className="text-[10px] text-slate-400 font-normal">+91 98765 43210</div>
              </div>
            </a>

            <Link
              href="/enquiry"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-2xl bg-gold-gradient hover:brightness-105 active:scale-95 text-slate-950 font-bold transition-all text-xs shadow-md group border border-amber-300/40"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-950/20 flex items-center justify-center text-slate-950 group-hover:scale-110 transition-transform">
                <Calendar size={16} />
              </div>
              <div className="flex-1">
                <div>Book Private Site Tour</div>
                <div className="text-[10px] text-slate-900/80 font-medium">Morabadi & Bariatu</div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Floating Trigger Button - Reduced size on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-1.5 sm:gap-2.5 bg-[#050b14] hover:bg-[#070e1c] text-white border border-[#c69c6d]/60 p-2 sm:px-4 sm:py-2.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-hidden"
        aria-label="Open luxury concierge"
      >
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="text-xs uppercase font-bold tracking-[0.16em] text-[#dfba8e] hidden sm:inline">
          VIP Consultation
        </span>
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gold-gradient flex items-center justify-center text-slate-950 shrink-0 shadow-sm">
          <Sparkles size={11} className="sm:hidden" />
          <Sparkles size={13} className="hidden sm:block" />
        </div>
      </button>
    </div>
  );
}
