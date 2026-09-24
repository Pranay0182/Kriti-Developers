import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#050b14] text-white pt-20 pb-12 border-t border-amber-500/20 relative overflow-hidden">
      <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Logo & Description */}
          <div className="col-span-1 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-transparent.png"
                alt="Kriti Developers"
                width={1922}
                height={315}
                className="h-12 sm:h-14 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Crafting architectural landmarks and sustainable residential communities across Ranchi, Jharkhand for over a decade.
            </p>
            <div className="text-xs text-slate-400 pt-2 space-y-1.5 font-light">
              <p className="text-slate-300">Circular Road, Lalpur, Ranchi, Jharkhand - 834001</p>
              <p>Direct Desk: <a href="tel:+919876543210" className="text-[#dfba8e] hover:underline font-semibold">+91 98765 43210</a></p>
              <p>Email: <a href="mailto:info@kritidevelopers.in" className="text-slate-300 hover:text-[#c69c6d] transition-colors">info@kritidevelopers.in</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:pl-8">
            <h4 className="font-serif font-bold text-white mb-6 uppercase text-xs tracking-[0.2em] text-[#dfba8e]">Navigation</h4>
            <div className="flex flex-col space-y-3.5">
              {[
                { name: "Home", href: "/" },
                { name: "Projects Portfolio", href: "/projects" },
                { name: "About Us", href: "/about" },
                { name: "Media Gallery", href: "/gallery" },
                { name: "Contact & Location", href: "/contact" }
              ].map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.href} 
                  prefetch={true} 
                  className="text-slate-400 hover:text-[#dfba8e] text-sm font-light transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]/40 group-hover:bg-[#c69c6d] transition-colors" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="col-span-1">
            <h4 className="font-serif font-bold text-white mb-6 uppercase text-xs tracking-[0.2em] text-[#dfba8e]">Developments</h4>
            <div className="flex flex-col space-y-3.5">
              {[
                { name: "Ongoing Residences", href: "/projects?filter=ongoing" },
                { name: "Upcoming Pre-Launches", href: "/projects?filter=upcoming" },
                { name: "Delivered Communities", href: "/projects?filter=completed" }
              ].map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.href} 
                  prefetch={true} 
                  className="text-slate-400 hover:text-[#dfba8e] text-sm font-light transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]/40 group-hover:bg-[#c69c6d] transition-colors" />
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-3">
                <Link 
                  href="/enquiry" 
                  prefetch={true} 
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-slate-950 font-bold px-4 py-2 rounded-full bg-gold-gradient hover:brightness-105 transition-all shadow-sm"
                >
                  Schedule Site Tour →
                </Link>
              </div>
            </div>
          </div>

          {/* Socials & Compliance */}
          <div className="col-span-1 flex flex-col justify-between">
            <div>
              <h4 className="font-serif font-bold text-white mb-6 uppercase text-xs tracking-[0.2em] text-[#dfba8e]">Connect With Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-400/50 hover:text-[#dfba8e] hover:bg-white/5 transition-all text-slate-400"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-400/50 hover:text-[#dfba8e] hover:bg-white/5 transition-all text-slate-400"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-8">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Kriti Developers. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">RERA Registered Entity • Jharkhand</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
