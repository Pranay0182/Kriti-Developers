"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Building2,
  Download,
  Play,
  CheckCircle2,
  Waves,
  Dumbbell,
  ShieldCheck,
  Trees,
  Home,
  Sparkles,
  ArrowRight,
  X,
  Phone,
  Loader2,
  Maximize2,
} from "lucide-react";

interface ProjectDetailInteractiveProps {
  project: any;
}

function getAmenityIcon(name: string) {
  const n = (name || "").toLowerCase();
  if (n.includes("pool") || n.includes("swim") || n.includes("water")) return Waves;
  if (n.includes("gym") || n.includes("fitness") || n.includes("workout")) return Dumbbell;
  if (n.includes("garden") || n.includes("park") || n.includes("green") || n.includes("tree") || n.includes("lawn")) return Trees;
  if (n.includes("security") || n.includes("cctv") || n.includes("guard") || n.includes("gate") || n.includes("fire")) return ShieldCheck;
  if (n.includes("club") || n.includes("community") || n.includes("hall") || n.includes("lounge")) return Home;
  if (n.includes("play") || n.includes("kid") || n.includes("child")) return Sparkles;
  if (n.includes("power") || n.includes("backup") || n.includes("generator")) return Sparkles;
  if (n.includes("car") || n.includes("parking") || n.includes("ev") || n.includes("charg")) return Sparkles;
  return CheckCircle2;
}

export function ProjectDetailInteractive({ project }: ProjectDetailInteractiveProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [activePlanIdx, setActivePlanIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Form submission state
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          email: formEmail,
          project: project.title,
          location: project.location,
          message: formMessage,
          source: "PROJECT_DETAILS_MODAL",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitted(false);
          setFormName("");
          setFormPhone("");
          setFormEmail("");
          setFormMessage("");
        }, 2000);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting enquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Only real data added through admin - NO fake defaults!
  const floorPlans: any[] = (project.floorPlans || []).filter(
    (fp: any) => fp && (fp.url?.trim() || fp.name?.trim())
  );
  const currentPlan = floorPlans[activePlanIdx] || floorPlans[0] || null;

  const galleryImages: string[] = (project.images || []).filter(
    (url: any) => typeof url === "string" && url.trim().length > 0
  );

  const amenitiesList: string[] = (project.amenities || []).filter(
    (name: any) => typeof name === "string" && name.trim().length > 0
  );

  const landmarksList: any[] = (project.landmarks || []).filter(
    (lm: any) => lm && lm.name && lm.name.trim().length > 0
  );

  const specificationsList: any[] = (project.specifications || []).filter(
    (sp: any) => sp && sp.category && sp.details
  );

  const hasLocation = Boolean(project.location && project.location.trim().length > 0);

  // Dynamic tabs based ONLY on sections that actually have data
  const navTabs = [
    { id: "overview", label: "Overview" },
    ...(amenitiesList.length > 0 ? [{ id: "highlights", label: "Highlights" }] : []),
    ...(galleryImages.length > 0 ? [{ id: "gallery", label: "Gallery" }] : []),
    ...(floorPlans.length > 0 ? [{ id: "floor-plans", label: "Floor Plans" }] : []),
    ...(hasLocation || landmarksList.length > 0 ? [{ id: "location", label: "Location" }] : []),
    ...(specificationsList.length > 0 ? [{ id: "specifications", label: "Specifications" }] : []),
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <img src={lightboxImg} alt="Preview" className="max-w-full max-h-full object-contain rounded" />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white text-white hover:text-black p-2 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-slate-900 font-bold">Enquiry Received</h3>
                <p className="text-sm text-slate-600">Our relationship manager will call you shortly regarding {project.title}.</p>
              </div>
            ) : (
              <div>
                <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block mb-1">Schedule Visit / Pricing</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Enquire About {project.title}</h3>
                <p className="text-xs text-slate-500 mb-6">Leave your details below for floor plans, price quote & site visit.</p>

                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Rahul Senapati"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+91 95708 22345"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Specific Query</label>
                    <textarea
                      rows={2}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Interested in 3 BHK facing east, high floor..."
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold py-3 rounded-lg text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                    Submit Enquiry
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section - True Full Screen & Adjusted Image Framing */}
      <section className="relative min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-5rem)] h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] w-full flex flex-col justify-end pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-[#070e1c]">
        {/* Background Image with Ambient Backdrop & Optimal Architectural Framing */}
        <div className="absolute inset-0 z-0">
          {/* Subtle Ambient Blur for high aspect-ratio images to fill wide screens seamlessly */}
          <Image
            src={project.heroImage || "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif"}
            alt=""
            fill
            className="object-cover object-center filter blur-3xl scale-110 opacity-35 pointer-events-none"
            priority
          />
          {/* Main Hero Image - object-[center_18%] ensures the upper building, roofline, and architecture are in full view without being cut off */}
          <Image
            src={project.heroImage || "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif"}
            alt={project.title}
            fill
            className="object-cover object-[center_22%] sm:object-[center_16%] transition-transform duration-1000 ease-out"
            priority
          />
          {/* Natural Vignette and Bottom Gradient for crystal-clear readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1c] via-[#070e1c]/45 via-40% to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070e1c]/80 via-[#070e1c]/30 via-50% to-transparent hidden md:block" />
        </div>

        {/* Top-Right "View Photo" Lightbox Trigger */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
          <button
            onClick={() => setLightboxImg(project.heroImage || "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif")}
            className="bg-black/50 hover:bg-black/80 text-white border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition flex items-center gap-1.5 shadow-md"
            title="View full high-res photo"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#c69c6d]" /> View Photo
          </button>
        </div>

        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-block bg-[#c69c6d] text-slate-950 text-xs font-extrabold px-3.5 py-1 tracking-widest uppercase mb-3 rounded-xs shadow">
                {project.status || "ONGOING"}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-white mb-2 leading-tight tracking-tight drop-shadow-md">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-slate-200 text-base sm:text-lg md:text-xl font-light drop-shadow">
                  {project.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-6 py-3.5 rounded-sm text-sm tracking-wide shadow-lg transition flex items-center gap-2"
              >
                Enquire Now <ArrowRight className="w-4 h-4" />
              </button>

              {project.brochureUrl && project.brochureUrl !== "#" ? (
                <a
                  href={project.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/40 font-semibold px-5 py-3.5 rounded-sm text-sm transition flex items-center gap-2 backdrop-blur-xs shadow-md"
                >
                  <Download className="w-4 h-4" /> Download Brochure
                </a>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/40 font-semibold px-5 py-3.5 rounded-sm text-sm transition flex items-center gap-2 backdrop-blur-xs shadow-md"
                >
                  <Download className="w-4 h-4" /> Request Brochure
                </button>
              )}

              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/40 font-semibold px-4 py-3.5 rounded-sm text-sm transition flex items-center gap-2 backdrop-blur-xs shadow-md"
                >
                  <Play className="w-4 h-4 fill-current" /> Watch Video
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky In-Page Navigation Bar - Docks under main navbar (top-16 / md:top-20) */}
      {navTabs.length > 1 && (
        <div className="sticky top-16 md:top-20 z-30 bg-[#0b1528] text-white border-b border-slate-800 shadow-md">
          <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 flex items-center gap-8 overflow-x-auto text-xs uppercase tracking-widest py-3.5">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`font-semibold hover:text-[#c69c6d] transition whitespace-nowrap pb-1 ${
                  activeTab === tab.id ? "text-[#c69c6d] border-b-2 border-[#c69c6d]" : "text-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Layout (Left Column + Right Sticky Card) */}
      <div className="py-16 md:py-24 bg-[#fafbfc]">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-16">
              {/* Section 1: Overview */}
              {project.description && (
                <section id="overview" className="scroll-mt-32 md:scroll-mt-36 space-y-4">
                  <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block">Overview</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold">About the Project</h2>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal whitespace-pre-line">
                    {project.description}
                  </p>
                </section>
              )}

              {/* Section 2: Project Highlights & Amenities - ONLY if added in admin */}
              {amenitiesList.length > 0 && (
                <section id="highlights" className="scroll-mt-32 md:scroll-mt-36 space-y-6">
                  <div>
                    <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block">Features</span>
                    <h2 className="font-serif text-3xl text-slate-900 font-bold">Project Highlights & Amenities</h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {amenitiesList.map((name: string, i: number) => {
                      const Icon = getAmenityIcon(name);
                      return (
                        <div
                          key={i}
                          className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center gap-3 hover:border-[#c69c6d]/50 hover:shadow-xs transition"
                        >
                          <div className="w-12 h-12 rounded-full bg-amber-50 text-[#c69c6d] flex items-center justify-center">
                            <Icon className="w-6 h-6" />
                          </div>
                          <p className="font-semibold text-slate-800 text-sm">{name}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Section 3: Gallery Preview - ONLY if added in admin */}
              {galleryImages.length > 0 && (
                <section id="gallery" className="scroll-mt-32 md:scroll-mt-36 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block">Visuals</span>
                      <h2 className="font-serif text-3xl text-slate-900 font-bold">Gallery</h2>
                    </div>
                    <Link
                      href="/gallery"
                      className="text-xs font-bold text-[#c69c6d] hover:text-[#b58b5c] uppercase tracking-wider flex items-center gap-1"
                    >
                      View All Gallery <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {galleryImages.length === 1 ? (
                    <div
                      onClick={() => setLightboxImg(galleryImages[0])}
                      className="relative h-72 sm:h-96 rounded-2xl overflow-hidden cursor-pointer group shadow-2xs border border-slate-200"
                    >
                      <Image
                        src={galleryImages[0]}
                        alt={`${project.title} gallery`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white text-xs font-semibold uppercase tracking-wider bg-black/60 px-3.5 py-2 rounded">
                          View Photo
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-3.5">
                      {/* Featured Large Image on Left */}
                      <div
                        onClick={() => setLightboxImg(galleryImages[0])}
                        className="lg:col-span-3 relative h-72 sm:h-96 rounded-2xl overflow-hidden cursor-pointer group shadow-2xs border border-slate-200"
                      >
                        <Image
                          src={galleryImages[0]}
                          alt={`${project.title} featured`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="text-white text-xs font-semibold uppercase tracking-wider bg-black/60 px-3.5 py-2 rounded">
                            View Photo
                          </span>
                        </div>
                      </div>

                      {/* Smaller Images in Grid on Right */}
                      <div className="lg:col-span-2 grid grid-cols-2 gap-3.5">
                        {galleryImages.slice(1, 5).map((url: string, idx: number) => (
                          <div
                            key={idx}
                            onClick={() => setLightboxImg(url)}
                            className="group relative h-36 sm:h-[184px] rounded-xl overflow-hidden cursor-pointer shadow-2xs border border-slate-200"
                          >
                            <Image
                              src={url}
                              alt={`${project.title} gallery ${idx + 2}`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <span className="text-white text-[10px] font-semibold uppercase tracking-wider bg-black/60 px-2 py-1 rounded">
                                View
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Section 4: Floor Plans - ONLY if added in admin */}
              {floorPlans.length > 0 && currentPlan && (
                <section id="floor-plans" className="scroll-mt-32 md:scroll-mt-36 space-y-6">
                  <div>
                    <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block">Layouts</span>
                    <h2 className="font-serif text-3xl text-slate-900 font-bold">Floor Plans</h2>
                  </div>

                  {/* Plan Switcher Tabs */}
                  {floorPlans.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-1">
                      {floorPlans.map((fp: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setActivePlanIdx(idx)}
                          className={`px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                            activePlanIdx === idx
                              ? "bg-[#c69c6d] text-slate-950 shadow-sm"
                              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {fp.planType || fp.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Plan Display Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs flex flex-col md:flex-row items-center gap-8">
                    {currentPlan.url ? (
                      <div
                        onClick={() => setLightboxImg(currentPlan.url)}
                        className="relative w-full md:w-1/2 h-72 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group"
                      >
                        <Image
                          src={currentPlan.url}
                          alt={currentPlan.name || "Floor Plan"}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-1 rounded">
                          Click to Enlarge
                        </div>
                      </div>
                    ) : null}

                    <div className={`${currentPlan.url ? "w-full md:w-1/2" : "w-full"} space-y-4`}>
                      <h3 className="font-serif text-2xl font-bold text-slate-900">{currentPlan.name}</h3>
                      {currentPlan.size && (
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <span className="font-medium">Super Built-up Area:</span>
                          <span className="font-bold text-slate-900">{currentPlan.size}</span>
                        </div>
                      )}
                      {currentPlan.url && (
                        <a
                          href={currentPlan.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="inline-flex bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-5 py-2.5 rounded text-xs uppercase tracking-wider transition items-center gap-2 shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" /> Download Plan
                        </a>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* Section 5: Location & Nearby Landmarks - ONLY if added in admin */}
              {(hasLocation || landmarksList.length > 0) && (
                <section id="location" className="scroll-mt-32 md:scroll-mt-36 space-y-6">
                  <div>
                    <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block">Connectivity</span>
                    <h2 className="font-serif text-3xl text-slate-900 font-bold">
                      {landmarksList.length > 0 ? "Location & Landmarks" : "Location"}
                    </h2>
                  </div>

                  <div className={`grid grid-cols-1 ${landmarksList.length > 0 && hasLocation ? "md:grid-cols-2" : ""} gap-8 items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-xs`}>
                    {/* Map if location exists */}
                    {hasLocation && (
                      <div className="relative h-72 rounded-xl overflow-hidden border border-slate-200">
                        <iframe
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(
                            project.location.toLowerCase().includes("ranchi")
                              ? project.location
                              : `${project.location}, Ranchi, Jharkhand`
                          )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={false}
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Nearby Landmarks list - ONLY real landmarks added in admin */}
                    {landmarksList.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-[#c69c6d]">Nearby Landmarks</h3>
                        <div className="divide-y divide-slate-100 text-sm">
                          {landmarksList.map((lm: any, idx: number) => (
                            <div key={idx} className="py-2.5 flex items-center justify-between">
                              <span className="text-slate-700 font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]" /> {lm.name}
                              </span>
                              {lm.distance && (
                                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                  {lm.distance}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Section 6: Specifications - ONLY real specs added in admin */}
              {specificationsList.length > 0 && (
                <section id="specifications" className="scroll-mt-32 md:scroll-mt-36 space-y-6">
                  <div>
                    <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block">Technical</span>
                    <h2 className="font-serif text-3xl text-slate-900 font-bold">Specifications</h2>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
                    {specificationsList.map((sp: any, idx: number) => (
                      <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
                        <span className="w-36 shrink-0 font-bold text-slate-900 text-xs uppercase tracking-wider text-[#c69c6d]">
                          {sp.category}
                        </span>
                        <p className="text-sm text-slate-600 leading-relaxed">{sp.details}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sticky Stats Card */}
            <div className="lg:col-span-1 sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Quick Facts</span>
                  <h3 className="font-serif text-xl font-bold text-slate-900">{project.title}</h3>
                </div>

                <div className="space-y-4 text-sm">
                  {project.location && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#c69c6d]" /> Location
                      </span>
                      <span className="font-semibold text-slate-800">{project.location}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c69c6d]" /> Status
                    </span>
                    <span className="font-semibold text-[#c69c6d] uppercase text-xs px-2 py-0.5 rounded bg-amber-50">
                      {project.status || "Ongoing"}
                    </span>
                  </div>

                  {project.type && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#c69c6d]" /> Type
                      </span>
                      <span className="font-semibold text-slate-800">{project.type}</span>
                    </div>
                  )}

                  {project.configuration && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Home className="w-4 h-4 text-[#c69c6d]" /> Configuration
                      </span>
                      <span className="font-semibold text-slate-800">{project.configuration}</span>
                    </div>
                  )}

                  {project.possession && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#c69c6d]" /> Possession
                      </span>
                      <span className="font-semibold text-slate-800">{project.possession}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
                  >
                    Enquire Now <ArrowRight className="w-4 h-4" />
                  </button>

                  {project.brochureUrl && project.brochureUrl !== "#" ? (
                    <a
                      href={project.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="w-full bg-slate-50 hover:bg-[#c69c6d] hover:text-slate-950 text-slate-700 font-semibold py-2.5 rounded-lg text-xs transition border border-slate-200 flex items-center justify-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Brochure
                    </a>
                  ) : (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-lg text-xs transition border border-slate-200 flex items-center justify-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" /> Request Brochure
                    </button>
                  )}
                </div>
              </div>

              {/* Call Card */}
              <div className="bg-[#0b1528] text-white p-6 rounded-2xl shadow-sm text-center space-y-3">
                <Phone className="w-8 h-8 text-[#c69c6d] mx-auto" />
                <p className="font-semibold text-sm">Need immediate assistance?</p>
                <p className="text-xs text-slate-300">Speak directly with our property specialist</p>
                <a
                  href="tel:+919570822345"
                  className="inline-block text-sm font-bold text-[#c69c6d] hover:text-white transition"
                >
                  +91 95708 22345
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <section className="bg-[#0b1528] text-white py-12 border-t border-slate-800">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1">
              Interested in this Project?
            </h3>
            <p className="text-slate-400 text-sm">
              Fill the form and our team will get in touch with you.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-8 py-3.5 rounded text-sm uppercase tracking-wider shadow-lg transition flex items-center gap-2 whitespace-nowrap"
          >
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
