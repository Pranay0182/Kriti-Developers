import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Home as HomeIcon, CheckCircle2 } from "lucide-react";
import { ProjectCard, ProjectStatus } from "@/components/ProjectCard";
import { HeroSlider } from "@/components/HeroSlider";
import pool from "@/lib/db";

export const revalidate = 60;

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

  let yearsExperience = "10+";
  let projectsDelivered = "5+";
  let happyFamilies = "500+";
  let sqftDeveloped = "2M+";

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
      if (settingsMap.milestones.projectsDelivered) projectsDelivered = settingsMap.milestones.projectsDelivered;
      if (settingsMap.milestones.happyFamilies) happyFamilies = settingsMap.milestones.happyFamilies;
      if (settingsMap.milestones.sqftDeveloped) sqftDeveloped = settingsMap.milestones.sqftDeveloped;
    }

    // 2. Active Projects
    activeProjects = allProjects
      .filter(p => p.status === 'ONGOING' || p.status === 'UPCOMING')
      .slice(0, 3)
      .map(p => ({
        title: p.title,
        slug: p.slug,
        location: p.location,
        configuration: p.configuration,
        status: p.status as ProjectStatus,
        imageUrl: p.heroImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
      }));

    // 3. Featured Project fallback from DB if not customized
    featuredProject = allProjects.find(p => p.isFeatured) || allProjects.find(p => p.status === 'ONGOING') || allProjects[0];
    if (featuredProject && !settingsMap.featured?.title) {
      featuredTitle = featuredProject.title;
      featuredSubtitle = featuredProject.subtitle || `Premium Residences in ${featuredProject.location}`;
      featuredDesc = featuredProject.description;
      if (featuredProject.heroImage) featuredImage = featuredProject.heroImage;
      featuredSlug = featuredProject.slug;
    }

    // 4. Completed Projects
    const completedList = allProjects.filter(p => p.status === 'COMPLETED');
    if (!settingsMap.milestones?.projectsDelivered) {
      projectsDelivered = `${Math.max(completedList.length, 5)}+`;
    }
    completedProjects = completedList.slice(0, 3).map(p => ({
      title: p.title,
      slug: p.slug,
      location: p.location,
      year: p.possession ? p.possession.replace(/[^0-9]/g, "") || "Delivered" : "Delivered",
      img: p.heroImage || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop"
    }));
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
        configuration: "2 & 3 BHK Apartments",
        status: "ONGOING" as ProjectStatus,
        imageUrl: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif"
      },
      {
        title: "Kriti Greens",
        slug: "kriti-greens",
        location: "Bariatu, Ranchi",
        configuration: "3 BHK Luxury Homes",
        status: "ONGOING" as ProjectStatus,
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Kriti Urban",
        slug: "kriti-urban",
        location: "Kanke Road, Ranchi",
        configuration: "Premium Residences",
        status: "UPCOMING" as ProjectStatus,
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop"
      }
    ];
  }

  if (completedProjects.length === 0) {
    completedProjects = [
      { title: "Kriti Residency", slug: "kriti-residency", location: "Harmu, Ranchi", year: "2024", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" },
      { title: "Kriti Enclave", slug: "kriti-enclave", location: "Lalpur, Ranchi", year: "2022", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop" },
      { title: "Kriti Gardens", slug: "kriti-gardens", location: "Namkum, Ranchi", year: "2021", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop" }
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Multi-Image Hero Slider with auto-rotation */}
      <HeroSlider
        images={heroImages}
        title={heroTitle}
        subtitle={heroSubtitle}
      />

      {/* Active Projects matching mockup */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-200 pb-6">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl text-slate-900 mb-3 font-bold">Active Projects</h2>
              <p className="text-lg text-slate-500 font-light">
                Discover our developments currently taking shape.
              </p>
            </div>
            <Link href="/projects" className="text-[#c69c6d] font-bold text-sm uppercase tracking-wider hover:underline flex items-center group">
              View All Projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {activeProjects.map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* About Kriti Developers matching mockup */}
      <section className="py-20 lg:py-28 bg-[#fafbfc]">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#c69c6d] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                BUILDING A BETTER TOMORROW
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-slate-900 mb-6 font-bold">
                About Kriti Developers
              </h2>
              <p className="text-slate-600 text-lg mb-4 leading-relaxed font-light">
                At Kriti Developers, we believe in creating more than just homes. We build communities, deliver lasting value, and create spaces that enhance lives for generations.
              </p>
              <p className="text-slate-600 text-base mb-8 leading-relaxed font-light">
                With a legacy of over a decade in real estate excellence, our unwavering commitment to quality architecture, transparent processes, and timely delivery has made us a trusted name across Ranchi, Jharkhand. Every project we undertake is a testament to our dedication to shaping modern, sustainable lifestyles.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-8 py-3.5 rounded text-xs uppercase tracking-wider transition shadow-md"
              >
                Know More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="relative h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
                alt="About Kriti Developers"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section matching mockup */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-200">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 font-serif text-[#c69c6d]">{yearsExperience}</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Years of Experience</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 font-serif text-[#c69c6d]">{projectsDelivered}</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Projects Delivered</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 font-serif text-[#c69c6d]">{happyFamilies}</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Happy Families</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 font-serif text-[#c69c6d]">{sqftDeveloped}</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Sq. Ft. Developed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Kriti matching mockup */}
      <section className="py-20 lg:py-28 bg-[#fafbfc]">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#c69c6d] font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
              OUR ADVANTAGE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 font-bold">
              Why Choose Kriti
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Prime Locations", desc: "Strategically located for better connectivity", icon: <MapPin className="h-8 w-8 text-[#c69c6d] mb-4" /> },
              { title: "Quality Construction", desc: "Built with the highest standards", icon: <HomeIcon className="h-8 w-8 text-[#c69c6d] mb-4" /> },
              { title: "Modern Amenities", desc: "Designed for a modern lifestyle", icon: <CheckCircle2 className="h-8 w-8 text-[#c69c6d] mb-4" /> },
              { title: "Transparent Process", desc: "Clear communication at every step", icon: <CheckCircle2 className="h-8 w-8 text-[#c69c6d] mb-4" /> }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left p-8 bg-white border border-slate-200/80 rounded-2xl hover:shadow-lg transition-shadow">
                {feature.icon}
                <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project Banner matching mockup */}
      <section className="py-0 bg-[#070e1c] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="p-12 lg:p-24 flex flex-col justify-center">
            <span className="text-[#c69c6d] font-bold mb-3 block tracking-widest uppercase text-xs">{featuredTag}</span>
            <h2 className="font-serif text-4xl md:text-6xl mb-3 uppercase tracking-wider leading-tight font-bold">
              {featuredTitle}
            </h2>
            <p className="text-[#c69c6d] font-medium mb-6 text-lg">
              {featuredSubtitle}
            </p>
            <p className="text-slate-300 text-base md:text-lg mb-10 max-w-md leading-relaxed font-light">
              {featuredDesc}
            </p>
            <Link
              href={`/projects/${featuredSlug}`}
              prefetch={true}
              className="bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-8 py-4 rounded text-xs uppercase tracking-widest w-fit transition shadow-lg flex items-center gap-2"
            >
              Explore Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative h-full min-h-[400px] lg:min-h-[600px] w-full overflow-hidden">
            <Image
              src={featuredImage}
              alt={`Featured Project ${featuredTitle}`}
              fill
              className="object-cover object-right"
              style={{ objectFit: "cover", objectPosition: "right", width: "100%", height: "100%" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Completed Projects matching mockup */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-200 pb-6">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl text-slate-900 mb-3 font-bold">Completed Projects</h2>
              <p className="text-lg text-slate-500 font-light">
                Delivered with pride, built for a better tomorrow.
              </p>
            </div>
            <Link href="/projects?filter=completed" prefetch={true} className="text-[#c69c6d] font-bold text-sm uppercase tracking-wider hover:underline flex items-center group">
              View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedProjects.map((project, i) => (
              <Link key={i} href={`/projects/${project.slug}`} prefetch={true} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#c69c6d] transition mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-slate-400 text-xs mb-3">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-[#c69c6d]" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-[#c69c6d] text-xs font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                    Completed • {project.year}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Find Your Next Address Banner CTA matching mockup */}
      <section className="bg-[#070e1c] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="p-12 lg:p-24 flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight font-bold whitespace-pre-line">
              {findYourNextTitle}
            </h2>
            <Link
              href="/enquiry"
              prefetch={true}
              className="bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-8 py-4 rounded text-xs uppercase tracking-widest w-fit transition shadow-lg flex items-center gap-2"
            >
              {findYourNextCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative h-full min-h-[380px] lg:min-h-[480px] w-full overflow-hidden">
            <Image
              src={findYourNextImage}
              alt="Luxury properties"
              fill
              className="object-cover object-right"
              style={{ objectFit: "cover", objectPosition: "right", width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </section>

      {/* Our Presence matching mockup */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 mb-12 text-center md:text-left font-bold">
            Our Presence
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="col-span-1 flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-200 bg-[#fafbfc]">
              <MapPin className="h-12 w-12 text-[#c69c6d] mb-3" />
              <h3 className="font-bold text-xl text-slate-900">Ranchi</h3>
              <p className="text-xs text-[#c69c6d] font-bold uppercase tracking-wider mt-1">Jharkhand Headquarters</p>
            </div>
            
            <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { name: "Morabadi", current: true },
                { name: "Kanke Road", current: true },
                { name: "Bariatu", current: true },
                { name: "Lalpur", current: true }
              ].map((locality, i) => (
                <div key={i} className="p-6 rounded-xl border border-slate-200/80 bg-white">
                  <HomeIcon className="h-6 w-6 mx-auto mb-2 text-[#c69c6d]" />
                  <p className="font-bold text-slate-900 text-sm">{locality.name}</p>
                  <p className="text-[11px] text-emerald-600 mt-1 uppercase font-bold">Active Zone</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
