import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white shadow-2xs">
      <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 flex h-20 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.avif"
              alt="Kriti Developers"
              width={350}
              height={60}
              className="h-[58px] w-auto object-contain"
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
            className="bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wider transition shadow-sm"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
