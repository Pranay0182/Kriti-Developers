import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column matching mockup Image 10/11 */}
          <div className="space-y-6 text-center lg:text-left">
            <span className="text-[#c69c6d] font-bold tracking-[0.25em] uppercase text-xs block">
              PAGE NOT FOUND
            </span>
            <h1 className="font-serif text-7xl sm:text-9xl font-bold text-slate-900 tracking-tight">
              404
            </h1>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800">
              This Address Doesn't Exist.
            </h2>
            <p className="text-slate-500 text-lg font-light max-w-md mx-auto lg:mx-0">
              Let's get you home. The page you are looking for has been moved or was never constructed.
            </p>

            <div className="pt-4 flex justify-center lg:justify-start">
              <Link
                href="/"
                className="bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-8 py-4 rounded text-xs uppercase tracking-widest transition shadow-lg flex items-center gap-2"
              >
                <Home className="w-4 h-4" /> Back to Home <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Visual matching mockup Image 10/11 */}
          <div className="relative h-[480px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Architectural space"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
