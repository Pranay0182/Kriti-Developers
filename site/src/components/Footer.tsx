import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0b1528] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-800/80">
          {/* Logo & Description */}
          <div className="col-span-1 space-y-4">
            <Link href="/" className="inline-block mb-2">
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
              Creating spaces that stand the test of time. Thoughtfully planned developments for modern living across Ranchi, Jharkhand.
            </p>
            <div className="text-xs text-slate-400 pt-2 space-y-1">
              <p>Circular Road, Lalpur, Ranchi, Jharkhand - 834001</p>
              <p>Phone: <a href="tel:+919876543210" className="text-slate-200 hover:text-[#c69c6d] font-medium">+91 98765 43210</a></p>
              <p>Email: <a href="mailto:info@kritidevelopers.in" className="text-slate-200 hover:text-[#c69c6d] font-medium">info@kritidevelopers.in</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:pl-8">
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider text-[#c69c6d]">Quick Links</h4>
            <div className="flex flex-col space-y-3">
              <Link href="/" prefetch={true} className="text-slate-400 hover:text-white text-sm transition-colors">Home</Link>
              <Link href="/projects" prefetch={true} className="text-slate-400 hover:text-white text-sm transition-colors">Projects Portfolio</Link>
              <Link href="/about" prefetch={true} className="text-slate-400 hover:text-white text-sm transition-colors">About Us</Link>
              <Link href="/gallery" prefetch={true} className="text-slate-400 hover:text-white text-sm transition-colors">Media Gallery</Link>
              <Link href="/contact" prefetch={true} className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link>
            </div>
          </div>

          {/* Projects */}
          <div className="col-span-1">
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider text-[#c69c6d]">Projects</h4>
            <div className="flex flex-col space-y-3">
              <Link href="/projects?filter=ongoing" prefetch={true} className="text-slate-400 hover:text-white text-sm transition-colors">Ongoing Projects</Link>
              <Link href="/projects?filter=upcoming" prefetch={true} className="text-slate-400 hover:text-white text-sm transition-colors">Upcoming Pre-Launches</Link>
              <Link href="/projects?filter=completed" prefetch={true} className="text-slate-400 hover:text-white text-sm transition-colors">Delivered Communities</Link>
              <Link href="/enquiry" prefetch={true} className="text-[#c69c6d] hover:underline text-sm font-semibold pt-2">Schedule Site Visit →</Link>
            </div>
          </div>

          {/* Follow Us & Policies */}
          <div className="col-span-1 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider text-[#c69c6d]">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-700/80 flex items-center justify-center hover:border-[#c69c6d] hover:text-[#c69c6d] transition-colors text-slate-400"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-700/80 flex items-center justify-center hover:border-[#c69c6d] hover:text-[#c69c6d] transition-colors text-slate-400"
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
          <p className="text-slate-400">Excellence in Every Structure • RERA Approved</p>
        </div>
      </div>
    </footer>
  );
}
