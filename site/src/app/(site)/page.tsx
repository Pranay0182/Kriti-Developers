import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Home as HomeIcon, CheckCircle2 } from "lucide-react";
import { ProjectCard, ProjectStatus } from "@/components/ProjectCard";
import { HeroSlider } from "@/components/HeroSlider";
import { ScrollReveal } from "@/components/ScrollReveal";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let activeProjects: any[] = [];
  let completedProjects: any[] = [];
  let featuredProject: any = null;
  let heroImage = "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif";
  let heroTitle = "Creating\nSpaces.\nShaping\nLifestyles.";
  let heroSubtitle = "Thoughtfully designed homes for a better tomorrow.";
  
  let featuredTag = "Featured Project";
  let featuredTitle = "KRITI HEIGHTS";
  let featuredSubtitle = "Premium Residences in Morabadi, Ranchi";
  let featuredDesc = "A thoughtfully planned residential development. Designed for modern living with panoramic views and world-class leisure.";
  let featuredImage = "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif";
  let featuredSlug = "kriti-heights";

  let findYourNextTitle = "Find Your Next Address\nwith Kriti Developers.";
  let findYourNextImage = "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196626089-whatsapp-image-2026-09-22-at-5.10.48-pm.avif";
  let findYourNextCta = "Enquire Now";

  let yearsExperience = "40+";
  let ranchiExperience = "20+";
  let projectsDelivered = "50+";
  let qualityConstruction = "100%";

  let settingsMap: Record<string, any> = {};

  try {
    // Single parallel query for projects and site settings
    const [projRes, setRes] = await Promise.all([
      pool.query('SELECT * FROM "project" ORDER BY "createdAt" DESC'),
      pool.query('SELECT "key", "value" FROM "site_setting"').catch(() => ({ rows: [] }))
    ]);

    const allProjects = projRes.rows;
    for (const r of setRes.rows) {
      settingsMap[r.key] = r.value;
    }

    // 1. Settings overrides from Admin Panel
    if (settingsMap.hero) {
      if (settingsMap.hero.heroImage) heroImage = settingsMap.hero.heroImage;
      if (settingsMap.hero.title) heroTitle = settingsMap.hero.title;
      if (settingsMap.hero.subtitle) heroSubtitle = settingsMap.hero.subtitle;
    }

    if (settingsMap.featured) {
      if (settingsMap.featured.tag) featuredTag = settingsMap.featured.tag;
      if (settingsMap.featured.title) featuredTitle = settingsMap.featured.title;
      if (settingsMap.featured.subtitle) featuredSubtitle = settingsMap.featured.subtitle;
      if (settingsMap.featured.description) featuredDesc = settingsMap.featured.description;
      if (settingsMap.featured.image) featuredImage = settingsMap.featured.image;
      if (settingsMap.featured.slug) featuredSlug = settingsMap.featured.slug;
    }

    if (settingsMap.findYourNext) {
      if (settingsMap.findYourNext.title) findYourNextTitle = settingsMap.findYourNext.title;
      if (settingsMap.findYourNext.image) findYourNextImage = settingsMap.findYourNext.image;
      if (settingsMap.findYourNext.ctaText) findYourNextCta = settingsMap.findYourNext.ctaText;
    }

    if (settingsMap.milestones) {
      if (settingsMap.milestones.yearsExperience) yearsExperience = settingsMap.milestones.yearsExperience;
      if (settingsMap.milestones.ranchiExperience) ranchiExperience = settingsMap.milestones.ranchiExperience;
      if (settingsMap.milestones.projectsDelivered) {
        const pd = String(settingsMap.milestones.projectsDelivered);
        projectsDelivered = pd.includes("50+") ? "50+" : pd;
      } else if (settingsMap.milestones.happyFamilies && settingsMap.milestones.happyFamilies !== "500+") {
        projectsDelivered = String(settingsMap.milestones.happyFamilies);
      }
      if (settingsMap.milestones.qualityConstruction) qualityConstruction = settingsMap.milestones.qualityConstruction;
    }

    // 2. All Projects for Landmark Projects section (Ongoing, Upcoming, and Completed)
    activeProjects = allProjects.map(p => ({
      title: p.title,
      slug: p.slug,
      location: p.location,
      configuration: p.configuration,
      status: p.status as ProjectStatus,
      imageUrl: p.heroImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    }));

    // 3. Completed Projects for Delivered Projects section down below
    completedProjects = allProjects
      .filter(p => p.status === 'COMPLETED')
      .map(p => ({
        title: p.title,
        slug: p.slug,
        location: p.location,
        configuration: p.configuration,
        status: p.status as ProjectStatus,
        imageUrl: p.heroImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
      }));

    // 4. Featured Project fallback from DB if not customized
    featuredProject = allProjects.find(p => p.isFeatured) || allProjects.find(p => p.status === 'ONGOING') || allProjects[0];
    if (featuredProject && !settingsMap.featured?.title) {
      featuredTitle = featuredProject.title;
      featuredSubtitle = featuredProject.subtitle || `Premium Residences in ${featuredProject.location}`;
      featuredDesc = featuredProject.description;
      if (featuredProject.heroImage) featuredImage = featuredProject.heroImage;
      featuredSlug = featuredProject.slug;
    }
  } catch (err) {
    console.error("DB error fetching home projects:", err);
  }

  // Fallbacks if database is initial or empty
  if (activeProjects.length === 0) {
    activeProjects = [
      {
        title: "Kriti Heights",
        slug: "kriti-heights",
        location: "Morabadi, Ranchi",
        configuration: "2 & 3 BHK Luxury Residences",
        status: "ONGOING" as ProjectStatus,
        imageUrl: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif"
      },
      {
        title: "Kriti Greens",
        slug: "kriti-greens",
        location: "Bariatu, Ranchi",
        configuration: "3 & 4 BHK Eco Living",
        status: "ONGOING" as ProjectStatus,
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Kriti Urban",
        slug: "kriti-urban",
        location: "Kanke Road, Ranchi",
        configuration: "Signature Smart Homes",
        status: "UPCOMING" as ProjectStatus,
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
      }
    ];
  }

  if (completedProjects.length === 0) {
    completedProjects = [
      {
        title: "Dayal Apartment",
        slug: "dayal-apartment",
        location: "Bariatu, Ranchi",
        configuration: "3 BHK Flats",
        status: "COMPLETED" as ProjectStatus,
        imageUrl: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif"
      },
      {
        title: "Shiv Shakti Apartment",
        slug: "shiv-shakti-apartment",
        location: "Morabadi, Ranchi",
        configuration: "2 & 3 BHK Apartments",
        status: "COMPLETED" as ProjectStatus,
        imageUrl: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif"
      }
    ];
  }

  // Collect hero slides - strictly Kriti building images
  let heroImages: string[] = [];
  if (settingsMap.hero?.images && Array.isArray(settingsMap.hero.images) && settingsMap.hero.images.length > 0) {
    heroImages = settingsMap.hero.images.filter(Boolean);
  } else if (settingsMap.hero?.heroImage) {
    heroImages = [
      settingsMap.hero.heroImage,
      "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif",
      "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196626089-whatsapp-image-2026-09-22-at-5.10.48-pm.avif"
    ];
  } else {
    heroImages = [
      "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif",
      "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif",
      "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196626089-whatsapp-image-2026-09-22-at-5.10.48-pm.avif"
    ];
  }

  // Replace default street-level photo with cinematic luxury villa dusk render for CTA banner if default
  if (!settingsMap.findYourNext?.image) {
    findYourNextImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop";
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc]">
      {/* Dynamic Multi-Image Hero Slider with auto-rotation */}
      <HeroSlider
        images={heroImages}
        title={heroTitle}
        subtitle={heroSubtitle}
        exploreBtnText={settingsMap.hero?.exploreBtnText}
        contactBtnText={settingsMap.hero?.contactBtnText}
      />

      {/* Active Projects Showcase */}
      <section className="py-12 sm:py-16 md:py-20 bg-white relative">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-[#c69c6d] text-xs font-bold tracking-[0.2em] uppercase mb-2.5">
                  <span>✦</span>
                  <span>Curated Developments</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-950 font-bold tracking-tight">
                  Landmark Projects
                </h2>
                <p className="text-base md:text-lg text-slate-500 font-light mt-1.5 max-w-xl">
                  Thoughtfully designed residential homes across Ranchi.
                </p>
              </div>
              <Link 
                href="/projects" 
                prefetch={true}
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-900 hover:text-[#c69c6d] transition-colors py-2 px-4 rounded-full border border-slate-200 hover:border-[#c69c6d]/50"
              >
                <span>View All Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-[#c69c6d]" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {activeProjects.slice(0, 3).map((project, i) => (
                <ProjectCard key={i} {...project} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Kriti Developers - Editorial Heritage Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#fafbfc] border-t border-slate-100 relative overflow-hidden">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 relative z-10">
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-[#c69c6d] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                  <span>✦</span>
                  <span>A Legacy of Trust</span>
                </div>
                
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-950 mb-6 font-bold leading-[1.15]">
                  Shaping Ranchi&apos;s Skyline with <span className="text-gold-gradient">Architectural Finesse</span>
                </h2>

                <p className="text-slate-600 text-base md:text-lg mb-6 leading-relaxed font-light">
                  Kriti Developers is an experienced construction firm in Ranchi, built on a foundation of trust and commitment to exceed customer expectations. Focusing on residential, commercial, and land development, our partners independently bring over 40 years of industry background to deliver residences on time with uncompromised efficacy.
                </p>

                {/* Value Pillars List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {[
                    "100% RERA Approved Developments",
                    "Prime Urban Corridors in Ranchi",
                    "Vastu-Compliant Master Planning",
                    "Earthquake-Resistant RCC Framing",
                    "Strict On-Time Possession Schedules",
                    "Dedicated Post-Handover Care"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-800 font-medium">
                      <div className="w-5 h-5 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#c69c6d]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href="/about"
                    prefetch={true}
                    className="bg-gold-gradient hover:brightness-105 active:scale-95 text-slate-950 font-bold px-8 py-4 rounded-full text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-md gold-glow inline-flex items-center gap-2"
                  >
                    <span>Discover Our Story</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/gallery"
                    prefetch={true}
                    className="px-6 py-4 rounded-full text-xs uppercase tracking-[0.16em] text-slate-700 hover:text-slate-950 font-bold transition-colors border border-slate-200 hover:border-slate-300"
                  >
                    Media Gallery
                  </Link>
                </div>
              </div>

              {/* Architectural Visual with Floating Badge */}
              <div className="lg:col-span-5 relative">
                <div className="relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
                    alt="About Kriti Developers"
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Floating Heritage Badge */}
                  <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-slate-950/80 p-5 rounded-2xl border border-white/10 text-white shadow-xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#dfba8e]">Proven Track Record</p>
                      <p className="font-serif text-xl font-bold mt-0.5">40+ Years of Trust</p>
                      <p className="text-xs text-slate-300 font-light">Built on commitment and efficacy</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-slate-950 font-bold text-sm shrink-0 shadow">
                      40+ Yrs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section - Obsidian Luxury Band */}
      <section className="py-10 sm:py-14 bg-[#050b14] border-y border-amber-500/20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 relative z-10">
          <ScrollReveal direction="up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="flex flex-col items-center justify-center text-center p-3">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gold-gradient mb-1.5 tracking-tight">
                  {yearsExperience}
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-[0.18em]">Years Industry Legacy</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-3 pt-6 md:pt-3">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gold-gradient mb-1.5 tracking-tight">
                  {ranchiExperience}
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-[0.18em]">Years in Ranchi</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-3 pt-6 md:pt-3">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gold-gradient mb-1.5 tracking-tight">
                  {projectsDelivered}
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-[0.18em]">Duplex, Simplex & Apartments</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-3 pt-6 md:pt-3">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gold-gradient mb-1.5 tracking-tight">
                  {qualityConstruction}
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-[0.18em]">Quality Construction</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Kriti - Architectural Numbered Cards */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-[#c69c6d] text-xs font-bold tracking-[0.2em] uppercase mb-2.5">
                <span>✦</span>
                <span>The Kriti Distinction</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-950 font-bold tracking-tight">
                Why Discerning Buyers Choose Us
              </h2>
              <p className="text-slate-500 text-base md:text-lg font-light mt-2">
                Built on uncompromising engineering, transparency, and superior architectural design.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  num: "01",
                  title: "Prime Locations", 
                  desc: "Strategic addresses in Morabadi, Kanke Road, Doranda, Ratu Road, and Chiraundi with immediate proximity to top schools, hospitals, and transit hubs.", 
                  icon: <MapPin className="h-6 w-6 text-[#c69c6d]" /> 
                },
                { 
                  num: "02",
                  title: "Premium Construction", 
                  desc: "Earthquake-resistant RCC structures engineered with top-tier steel, solid masonry, and grade-A vitrified finishes.", 
                  icon: <HomeIcon className="h-6 w-6 text-[#c69c6d]" /> 
                },
                { 
                  num: "03",
                  title: "Modern Amenities", 
                  desc: "Gated security, high-speed automated elevators, landscaped rooftop gardens, and club recreational zones.", 
                  icon: <CheckCircle2 className="h-6 w-6 text-[#c69c6d]" /> 
                },
                { 
                  num: "04",
                  title: "Transparent Process", 
                  desc: "Zero hidden costs, complete title clarity, strict RERA adherence, and proactive possession tracking.", 
                  icon: <CheckCircle2 className="h-6 w-6 text-[#c69c6d]" /> 
                }
              ].map((feature, i) => (
                <div 
                  key={i} 
                  className="group relative flex flex-col p-8 bg-[#fdfdfd] border border-slate-200/80 rounded-3xl hover:border-[#c69c6d]/50 hover:shadow-[0_20px_40px_-15px_rgba(198,156,109,0.18)] transition-all duration-500 overflow-hidden"
                >
                  {/* Architectural Numbering Watermark */}
                  <span className="font-serif text-5xl font-bold text-slate-100 group-hover:text-amber-100/60 transition-colors duration-300 absolute top-6 right-6 select-none pointer-events-none">
                    {feature.num}
                  </span>

                  {/* Icon Container with Glow */}
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shrink-0">
                    {feature.icon}
                  </div>

                  <h4 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-[#c69c6d] transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Project Showcase Banner */}
      <section className="py-0 bg-[#050b14] text-white overflow-hidden relative border-y border-amber-500/20">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
            <div className="lg:col-span-6 p-8 sm:p-10 lg:p-14 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#dfba8e] text-xs font-semibold tracking-[0.2em] uppercase mb-3.5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                <span>{featuredTag}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-2.5 tracking-tight font-bold text-white">
                {featuredTitle}
              </h2>

              <p className="text-gold-light font-medium mb-4 text-base sm:text-lg">
                {featuredSubtitle}
              </p>

              <p className="text-slate-300 text-sm sm:text-base mb-6 max-w-lg leading-relaxed font-light">
                {featuredDesc}
              </p>

              {/* Quick Specs Micro-Grid */}
              <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-4 mb-6 max-w-lg text-xs">
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Location</span>
                  <span className="text-white font-semibold text-sm">Morabadi</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Typology</span>
                  <span className="text-white font-semibold text-sm">2 & 3 BHK</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Handover</span>
                  <span className="text-white font-semibold text-sm">2027</span>
                </div>
              </div>

              <Link
                href={`/projects/${featuredSlug}`}
                prefetch={true}
                className="bg-gold-gradient hover:brightness-105 active:scale-95 text-slate-950 font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.16em] w-fit transition-all duration-300 gold-glow flex items-center gap-2 shadow-xl"
              >
                <span>Explore Masterplan</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full w-full overflow-hidden">
              <Image
                src={featuredImage}
                alt={`Featured Project ${featuredTitle}`}
                fill
                loading="lazy"
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050b14] via-transparent to-transparent z-[1]" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Delivered Projects Section - Completed residences */}
      {completedProjects.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-slate-50 border-t border-slate-100 relative">
          <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
            <ScrollReveal direction="up">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6 border-b border-slate-200 pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-bold tracking-[0.2em] uppercase mb-2.5 border border-emerald-200/50">
                    <span>✦</span>
                    <span>Delivered Landmarks</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-950 font-bold tracking-tight">
                    Delivered Projects
                  </h2>
                  <p className="text-base md:text-lg text-slate-500 font-light mt-1.5 max-w-xl">
                    Successfully completed and handed-over residences across Ranchi.
                  </p>
                </div>
                <Link 
                  href="/projects?filter=completed" 
                  prefetch={true}
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-900 hover:text-[#c69c6d] transition-colors py-2 px-4 rounded-full border border-slate-200 hover:border-[#c69c6d]/50 bg-white shadow-2xs"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-[#c69c6d]" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150} direction="up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {completedProjects.slice(0, 3).map((project, i) => (
                  <ProjectCard key={i} {...project} />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Find Your Next Address Banner CTA with Architectural Twilight Render */}
      <section className="bg-[#050b14] text-white border-t border-amber-500/20 overflow-hidden">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px]">
            <div className="lg:col-span-6 p-8 sm:p-10 lg:p-14 flex flex-col justify-center z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#dfba8e] text-xs font-semibold tracking-[0.2em] uppercase mb-3.5 w-fit">
                <span>✦</span>
                <span>Personalized Real Estate Advisory</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight font-bold whitespace-pre-line text-white">
                {findYourNextTitle}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base mb-6 max-w-lg font-light leading-relaxed">
                Schedule a private consultation and walk through floor plans with our senior architectural consultants in Ranchi.
              </p>

              <Link
                href="/enquiry"
                prefetch={true}
                className="bg-gold-gradient hover:brightness-105 active:scale-95 text-slate-950 font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.16em] w-fit transition-all duration-300 gold-glow flex items-center gap-2 shadow-xl"
              >
                <span>{findYourNextCta}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full w-full overflow-hidden">
              <Image
                src={findYourNextImage}
                alt="Luxury properties"
                fill
                loading="lazy"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050b14] via-transparent to-transparent z-[1]" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Our Presence - Interactive Locality Showcase */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-[#c69c6d] text-xs font-bold tracking-[0.2em] uppercase mb-2.5">
                  <span>✦</span>
                  <span>Regional Footprint</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-950 font-bold tracking-tight">
                  Our Presence Across Ranchi
                </h2>
                <p className="text-slate-500 text-base md:text-lg font-light mt-1.5">
                  Positioned in Jharkhand’s most sought-after residential and commercial sectors.
                </p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={150} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 items-stretch">
              {/* Headquarters Card */}
              <div className="md:col-span-1 flex flex-col justify-center p-8 rounded-3xl border border-[#c69c6d]/40 bg-gradient-to-b from-[#fdfbf9] to-[#fbf7f1] shadow-md">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center mb-4 text-[#c69c6d]">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-slate-950">Ranchi</h3>
                <p className="text-xs text-[#c69c6d] font-bold uppercase tracking-[0.16em] mt-1 mb-3">Jharkhand Headquarters</p>
                <p className="text-slate-500 text-xs leading-relaxed">Central corporate office handling acquisitions, architectural design, and customer care.</p>
              </div>
              
              {/* Key Locality Enclaves */}
              {[
                { name: "Morabadi", desc: "Tagore Hill & Morabadi Ground Corridor", tag: "Prime Residential" },
                { name: "Kanke Road", desc: "Urban Arterial Hub & Premium Living", tag: "High Demand Zone" },
                { name: "Doranda", desc: "Historic Cultural Corridor & South Ranchi Hub", tag: "Established Zone" },
                { name: "Ratu Road", desc: "Tilla Chowk Corridor & Central Connectivity", tag: "Prime Corridor" },
                { name: "Chiraundi", desc: "Serene Residential Landscape & Growth Hub", tag: "Emerging Enclave" }
              ].map((locality, i) => (
                <div key={i} className="group p-7 rounded-3xl border border-slate-200/80 bg-[#fdfdfd] hover:border-[#c69c6d]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-amber-500/10 flex items-center justify-center transition-colors">
                        <HomeIcon className="h-5 w-5 text-slate-700 group-hover:text-[#c69c6d] transition-colors" />
                      </div>
                      <span className="flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200/60 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-xl text-slate-900 group-hover:text-[#c69c6d] transition-colors mb-1">{locality.name}</h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">{locality.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{locality.tag}</span>
                    <span className="text-[#c69c6d] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
