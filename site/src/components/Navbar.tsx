"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white shadow-2xs">
      <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 flex h-16 md:h-20 items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -ml-2 text-slate-700 hover:text-[#c69c6d] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/logo.avif"
              alt="Kriti Developers"
              width={350}
              height={60}
              className="h-10 md:h-[58px] w-auto max-w-[180px] sm:max-w-[200px] md:max-w-none object-contain"
              priority
            />
          </Link>
        </div>
        
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" prefetch={true} className="text-sm font-semibold text-slate-700 hover:text-[#c69c6d] transition-colors">
            Home
          </Link>
          <Link href="/projects" prefetch={true} className="text-sm font-semibold text-slate-700 hover:text-[#c69c6d] transition-colors">
            Projects
          </Link>
          <Link href="/about" prefetch={true} className="text-sm font-semibold text-slate-700 hover:text-[#c69c6d] transition-colors">
            About
          </Link>
          <Link href="/gallery" prefetch={true} className="text-sm font-semibold text-slate-700 hover:text-[#c69c6d] transition-colors">
            Gallery
          </Link>
          <Link href="/contact" prefetch={true} className="text-sm font-semibold text-slate-700 hover:text-[#c69c6d] transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center">
          <Link
            href="/enquiry"
            prefetch={true}
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-4 py-2 md:px-6 md:py-2.5 rounded text-[10px] md:text-xs uppercase tracking-wider transition shadow-sm text-center whitespace-nowrap"
          >
            Enquire Now
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
