import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Shield, Lightbulb, CheckCircle2, Building, Users, Calendar, MapPin } from "lucide-react";

export const metadata = {
  title: "About Us | Kriti Developers",
  description: "Building With Purpose. We create spaces that inspire better living for generations across Ranchi, Jharkhand.",
};

export default function AboutPage() {
  const stats = [
    { value: "10+", label: "Years of Experience" },
    { value: "5+", label: "Projects Delivered" },
    { value: "500+", label: "Happy Families" },
    { value: "2M+", label: "Sq. Ft. Developed" },
  ];

  const values = [
    {
      title: "Quality",
      subtitle: "Uncompromising standards",
      description: "From foundation to finishing, we employ the finest construction materials and rigorous engineering checks.",
      icon: Award,
    },
    {
      title: "Integrity",
      subtitle: "Transparent and trustworthy",
      description: "Clear communication at every phase, on-schedule delivery, and zero hidden clauses for complete peace of mind.",
      icon: Shield,
    },
    {
      title: "Innovation",
      subtitle: "Forward-thinking designs",
      description: "Smart space optimization, sustainable energy features, and architectural aesthetics built to withstand generations.",
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
      {/* 1. Hero Section matching mockup Image 4 */}
      <section className="relative py-20 lg:py-28 bg-[#fafbfc] border-b border-slate-100">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[#c69c6d] font-bold tracking-[0.2em] uppercase text-xs block">
                ABOUT KRITI DEVELOPERS
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.15] font-bold tracking-tight">
                Building <br />
                <span className="text-[#c69c6d] italic font-normal">With Purpose.</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed max-w-xl font-light">
                We create spaces that inspire better living for generations across Ranchi. Every structure we raise is crafted with unwavering precision, timeless elegance, and human-centric design.
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
                alt="Building With Purpose"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section matching mockup */}
      <section className="py-20 bg-white">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl space-y-6">
            <span className="text-[#c69c6d] font-bold tracking-[0.2em] uppercase text-xs block">
              OUR STORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-bold">
              Crafting Ranchi's Finest Addresses
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Kriti Developers was founded with a simple vision: to create high-quality, thoughtfully designed spaces that enhance the lives of our customers. Over the last decade, we have transformed visionary architectural blueprints into thriving communities where families grow and memories flourish across Ranchi, Jharkhand.
            </p>
            <div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-6 py-3 rounded text-xs uppercase tracking-wider transition shadow-sm"
              >
                Our Journey <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Row matching exact mockup */}
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

      {/* 5. Leadership Team matching exact mockup */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[#c69c6d] font-bold tracking-[0.2em] uppercase text-xs block">
              MANAGEMENT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-bold">
              Leadership Team
            </h2>
            <p className="text-slate-500 text-sm">Guided by industry visionaries committed to architectural integrity and customer delight.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, i) => (
              <div key={i} className="bg-[#fafbfc] rounded-2xl overflow-hidden border border-slate-200/80 group">
                <div className="relative h-80 overflow-hidden bg-slate-100">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-slate-900">{leader.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#c69c6d]">{leader.role}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-light pt-2">{leader.bio}</p>
                </div>
              </div>
            ))}
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
                {["Morabadi", "Kanke Road", "Bariatu", "Lalpur", "Harmu"].map((locality, idx) => (
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
