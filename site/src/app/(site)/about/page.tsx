import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Shield, Lightbulb, CheckCircle2, Building, Users, Calendar, MapPin } from "lucide-react";

export const metadata = {
  title: "About Us | Kriti Developers",
  description: "A leading construction firm in Ranchi, shaping the real estate landscape for more than two decades with over 35 years of industry leadership.",
};

export default function AboutPage() {
  const stats = [
    { value: "40+", label: "Years Industry Background" },
    { value: "20+", label: "Years Shaping Ranchi" },
    { value: "50+", label: "Duplex, Simplex & Apartments" },
    { value: "100%", label: "Quality Construction" },
  ];

  const values = [
    {
      title: "Quality Construction",
      subtitle: "Uncompromised efficacy",
      description: "From foundation to finishing, we employ the finest construction materials and rigorous engineering standards.",
      icon: Award,
    },
    {
      title: "Trust & Transparency",
      subtitle: "Built on commitment",
      description: "Clear communication, transparent dealings, on-schedule delivery, and zero hidden clauses for complete peace of mind.",
      icon: Shield,
    },
    {
      title: "Innovative Designs",
      subtitle: "Forward-thinking living",
      description: "Smart space optimization, modern aesthetics, and functional architecture built to exceed customer expectations.",
      icon: Lightbulb,
    },
  ];

  const leadership = [
    {
      name: "Rajesh Kumar",
      role: "Managing Director",
      bio: "Over 20 years of real estate leadership, guiding Kriti Developers from foundation to Jharkhand's premier luxury home builder.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Anita Sharma",
      role: "Director",
      bio: "Spearheading sustainable architecture and client-centric designs that elevate everyday lifestyle and well-being.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Vikram Sethi",
      role: "Head - Projects",
      bio: "Oversees site engineering excellence, strict safety compliance, and on-time structural handovers across all developments.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-28 bg-[#fafbfc] border-b border-slate-100">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[#c69c6d] font-bold tracking-[0.2em] uppercase text-xs block">
                ABOUT KRITI DEVELOPERS
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.15] font-bold tracking-tight">
                Building on Trust. <br />
                <span className="text-[#c69c6d] italic font-normal">Delivering with Efficacy.</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed max-w-xl font-light">
                Kriti Developers is a leading construction firm in the city of Ranchi, built on a foundation of trust and commitment to exceed customer expectations. We are dedicated to providing exceptional service across residential projects, commercial developments, and land acquisitions.
              </p>

              <div className="pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-7 py-3.5 rounded text-xs uppercase tracking-wider transition shadow-md"
                >
                  Explore Developments <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative h-[420px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196626089-whatsapp-image-2026-09-22-at-5.10.48-pm.avif"
                alt="Kriti Developers Ranchi"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl space-y-6">
            <span className="text-[#c69c6d] font-bold tracking-[0.2em] uppercase text-xs block">
              OUR STORY & LEGACY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-bold">
              Shaping Ranchi&apos;s Real Estate Landscape for Over Two Decades
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
              We have been shaping the real estate landscape in Ranchi for more than two decades, and the partners of the firm independently bring a background of over 35 years in the real estate industry.
            </p>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
              Renowned for our quality construction, innovative designs, and exceptional customer service, the projects undertaken by us range from low-cost housing to high-end bungalows and multi-storeyed apartments in premier localities like Kanke Road, Morabadi, Chiraundi, Ratu Road, Doranda, and beyond.
            </p>
            <p className="text-slate-700 text-base md:text-lg font-medium">
              We are committed to deliver on time with uncompromised efficacy.
            </p>
            <div className="pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-6 py-3 rounded text-xs uppercase tracking-wider transition shadow-sm"
              >
                Our Developments <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Row */}
      <section className="py-16 bg-[#0b1528] text-white">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="pt-6 md:pt-0 px-4 space-y-2">
                <p className="font-serif text-4xl sm:text-5xl font-bold text-[#c69c6d]">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-slate-300 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Values matching exact mockup */}
      <section className="py-20 lg:py-28 bg-[#fafbfc]">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[#c69c6d] font-bold tracking-[0.2em] uppercase text-xs block">
              OUR PILLARS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-bold">
              Our Core Values
            </h2>
            <p className="text-slate-500 text-sm">The principles that steer every brick we lay and every family we welcome home.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-amber-50 text-[#c69c6d] flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">{v.title}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#c69c6d]">{v.subtitle}</p>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 6. Our Presence Section matching exact mockup */}
      <section className="py-20 bg-[#0b1528] text-white">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[#c69c6d] font-bold tracking-[0.2em] uppercase text-xs block">
                FOOTPRINT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Expanding Our Horizon Across Eastern India
              </h2>
              <p className="text-slate-300 text-base leading-relaxed font-light">
                With deep roots in Ranchi, Kriti Developers is creating prime residential communities across Jharkhand's premier growth corridors, delivering lasting value and architectural excellence.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {["Morabadi", "Kanke Road", "Doranda", "Ratu Road", "Chiraundi"].map((locality, idx) => (
                  <span
                    key={idx}
                    className={`px-4 py-2 rounded-full text-xs font-semibold ${
                      idx === 0
                        ? "bg-[#c69c6d] text-slate-950 font-bold"
                        : "bg-slate-800 text-slate-300 border border-slate-700"
                    }`}
                  >
                    {locality}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-7 py-3 rounded text-xs uppercase tracking-wider transition shadow"
                >
                  View All Developments <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden border border-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Our Presence"
                fill
                className="object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
