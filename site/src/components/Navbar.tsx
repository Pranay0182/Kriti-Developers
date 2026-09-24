"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 flex h-16 md:h-20 items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -ml-2 text-slate-700 hover:text-[#c69c6d] transition-colors rounded-lg focus:outline-hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link href="/" className="flex items-center group py-0.5" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/logo.avif"
              alt="Kriti Developers"
              width={400}
              height={75}
              className="h-11 sm:h-12 md:h-[62px] lg:h-[66px] w-auto max-w-[185px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-none object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          </Link>
        </div>
        
        <div className="hidden md:flex gap-8 lg:gap-10 items-center">
          {[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: "About", href: "/about" },
            { name: "Gallery", href: "/gallery" },
            { name: "Contact", href: "/contact" }
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              prefetch={true} 
              className="text-xs uppercase tracking-[0.18em] font-semibold text-slate-700 hover:text-[#c69c6d] transition-all duration-200 relative py-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#d8b082] to-[#c69c6d] transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Quick Phone Call on desktop */}
          <a
            href="tel:+919876543210"
            className="hidden lg:flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-600 hover:text-[#c69c6d] transition-colors py-2 px-3 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200"
          >
            <Phone className="w-3.5 h-3.5 text-[#c69c6d]" />
            <span>+91 98765 43210</span>
          </a>

          <Link
            href="/enquiry"
            prefetch={true}
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-gold-gradient hover:brightness-105 active:scale-95 text-slate-950 font-bold px-3 py-1.5 md:px-6 md:py-2.5 rounded-full text-[11px] md:text-xs uppercase tracking-wider transition-all duration-300 gold-glow text-center whitespace-nowrap border border-amber-300/40"
          >
            <span className="sm:hidden">Enquire</span>
            <span className="hidden sm:inline">Enquire Now</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 md:top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl flex flex-col py-4 px-6 gap-2">
          <Link href="/" prefetch={true} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-700 hover:text-[#c69c6d] transition-colors py-3 border-b border-slate-50">
            Home
          </Link>
          <Link href="/projects" prefetch={true} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-700 hover:text-[#c69c6d] transition-colors py-3 border-b border-slate-50">
            Projects
          </Link>
          <Link href="/about" prefetch={true} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-700 hover:text-[#c69c6d] transition-colors py-3 border-b border-slate-50">
            About
          </Link>
          <Link href="/gallery" prefetch={true} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-700 hover:text-[#c69c6d] transition-colors py-3 border-b border-slate-50">
            Gallery
          </Link>
          <Link href="/contact" prefetch={true} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-700 hover:text-[#c69c6d] transition-colors py-3">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
