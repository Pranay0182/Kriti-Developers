"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <div className="container max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 flex h-16 md:h-20 items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 shrink">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -ml-2 text-slate-700 hover:text-[#c69c6d] transition-colors rounded-lg focus:outline-hidden shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          
          <Link href="/" className="flex items-center group py-0.5 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/logo.avif"
              alt="Kriti Developers"
              width={400}
              height={75}
              className="h-11 sm:h-12 md:h-[62px] lg:h-[68px] w-auto max-w-[210px] sm:max-w-[260px] md:max-w-none object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          </Link>
        </div>
        
        <div className="hidden md:flex gap-5 lg:gap-8 xl:gap-10 items-center shrink-0">
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
              className="text-xs uppercase tracking-[0.14em] lg:tracking-[0.18em] font-semibold text-slate-700 hover:text-[#c69c6d] transition-all duration-200 relative py-1 group whitespace-nowrap"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#d8b082] to-[#c69c6d] transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Phone Call */}
          <a
            href="tel:+919570822345"
            className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-slate-800 hover:text-slate-950 transition-all py-1.5 sm:py-2 px-3 sm:px-4 rounded-full bg-slate-50 hover:bg-amber-500/10 border border-slate-200 hover:border-[#c69c6d]/60 whitespace-nowrap shrink-0 shadow-2xs"
            aria-label="Call +91 95708 22345"
          >
            <Phone className="w-3.5 h-3.5 text-[#c69c6d] shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap tracking-wide font-medium">+91 95708 22345</span>
            <span className="sm:hidden text-xs font-bold text-slate-800">Call</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 md:top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl flex flex-col py-4 px-6 gap-2 z-50">
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
          <Link href="/contact" prefetch={true} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-700 hover:text-[#c69c6d] transition-colors py-3 border-b border-slate-50">
            Contact
          </Link>
          <div className="pt-2">
            <a
              href="tel:+919570822345"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 95708 22345</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
