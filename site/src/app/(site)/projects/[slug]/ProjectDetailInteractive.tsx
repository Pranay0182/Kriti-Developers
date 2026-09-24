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
  Mail,
  Loader2,
  FileText
} from "lucide-react";

interface ProjectDetailInteractiveProps {
  project: any;
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

  const floorPlans = project.floorPlans && project.floorPlans.length > 0
    ? project.floorPlans
    : [
        { name: "2 BHK - Floor Plan", planType: "2 BHK", size: "1200 Sq. Ft.", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" },
        { name: "3 BHK - Floor Plan", planType: "3 BHK", size: "1650 Sq. Ft.", url: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop" }
      ];

  const currentPlan = floorPlans[activePlanIdx] || floorPlans[0];

  const galleryImages = project.images && project.images.length > 0
    ? project.images
    : [
        "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif",
        "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif",
        "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196626089-whatsapp-image-2026-09-22-at-5.10.48-pm.avif",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
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
                      placeholder="+91 98765 43210"
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

      {/* Hero Section matching mockup Image 3 */}
      <section className="relative h-[65vh] min-h-[520px] w-full flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.heroImage || "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1c]/90 via-[#070e1c]/45 to-transparent" />
        </div>

        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block bg-[#c69c6d] text-slate-950 text-xs font-extrabold px-3.5 py-1 tracking-widest uppercase mb-3 rounded-xs shadow">
                {project.status || "ONGOING"}
              </span>
              <h1 className="font-serif text-5xl md:text-7xl text-white mb-2 leading-tight tracking-tight">
                {project.title}
              </h1>
              <p className="text-slate-200 text-lg md:text-xl font-light">
                {project.subtitle || "Premium Residences in Ranchi"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-6 py-3.5 rounded-sm text-sm tracking-wide shadow-lg transition flex items-center gap-2"
              >
                Enquire Now <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => alert("Downloading brochure...")}
                className="bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/40 font-semibold px-5 py-3.5 rounded-sm text-sm transition flex items-center gap-2 backdrop-blur-xs"
              >
                <Download className="w-4 h-4" /> Download Brochure
              </button>

              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/40 font-semibold px-4 py-3.5 rounded-sm text-sm transition flex items-center gap-2 backdrop-blur-xs"
                >
                  <Play className="w-4 h-4 fill-current" /> Watch Video
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky In-Page Navigation Bar matching mockup */}
      <div className="sticky top-0 z-30 bg-[#0b1528] text-white border-b border-slate-800 shadow-md">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 flex items-center gap-8 overflow-x-auto text-xs uppercase tracking-widest py-3.5">
          {[
            { id: "overview", label: "Overview" },
            { id: "highlights", label: "Highlights" },
            { id: "amenities", label: "Amenities" },
            { id: "floor-plans", label: "Floor Plans" },
            { id: "gallery", label: "Gallery" },
            { id: "location", label: "Location" },
            { id: "specifications", label: "Specifications" },
          ].map((tab) => (
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

      {/* Main Content Layout (Left Column + Right Sticky Card) */}
      <div className="py-16 md:py-24 bg-[#fafbfc]">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-16">
              {/* Section 1: Overview */}
              <section id="overview" className="scroll-mt-24 space-y-4">
                <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block">Overview</span>
                <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold">About the Project</h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                  {project.description}
                </p>
              </section>

              {/* Section 2: Project Highlights matching exact mockup */}
              <section id="highlights" className="scroll-mt-24 space-y-6">
                <div>
                  <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block">Features</span>
                  <h2 className="font-serif text-3xl text-slate-900 font-bold">Project Highlights</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { name: "Swimming Pool", icon: Waves },
                    { name: "Clubhouse", icon: Home },
                    { name: "Landscaped Gardens", icon: Trees },
                    { name: "24/7 Security", icon: ShieldCheck },
                    { name: "Gymnasium", icon: Dumbbell },
                    { name: "Kids Play Area", icon: Sparkles },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center gap-3 hover:border-[#c69c6d]/50 hover:shadow-xs transition"
                      >
                        <div className="w-12 h-12 rounded-full bg-amber-50 text-[#c69c6d] flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <p className="font-semibold text-slate-800 text-sm">{item.name}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section 3: Gallery Preview */}
              <section id="gallery" className="scroll-mt-24 space-y-6">
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

                  {/* 4 Smaller Images in 2x2 Grid on Right */}
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
              </section>

              {/* Section 4: Floor Plans matching exact mockup */}
              <section id="floor-plans" className="scroll-mt-24 space-y-6">
                <div>
                  <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block">Layouts</span>
                  <h2 className="font-serif text-3xl text-slate-900 font-bold">Floor Plans</h2>
                </div>

                {/* Plan Switcher Tabs */}
                <div className="flex items-center gap-3">
                  {floorPlans.map((fp: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActivePlanIdx(idx)}
                      className={`px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition ${
                        activePlanIdx === idx
                          ? "bg-[#c69c6d] text-slate-950 shadow-sm"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {fp.planType || fp.name}
                    </button>
                  ))}
                </div>

                {/* Plan Display Card matching mockup */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs flex flex-col md:flex-row items-center gap-8">
                  <div
                    onClick={() => setLightboxImg(currentPlan.url)}
                    className="relative w-full md:w-1/2 h-72 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group"
                  >
                    <Image
                      src={currentPlan.url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"}
                      alt={currentPlan.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-1 rounded">
                      Click to Enlarge
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-slate-900">{currentPlan.name}</h3>
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <span className="font-medium">Super Built-up Area:</span>
                      <span className="font-bold text-slate-900">{currentPlan.size || "1200 Sq. Ft."}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Optimized for natural cross-ventilation, expansive balconies, and private entrance foyers.
                    </p>
                    <button
                      onClick={() => alert("Downloading plan...")}
                      className="bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-5 py-2.5 rounded text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Plan
                    </button>
                  </div>
                </div>
              </section>

              {/* Section 5: Location & Nearby Landmarks matching mockup */}
              <section id="location" className="scroll-mt-24 space-y-6">
                <div>
                  <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block">Connectivity</span>
                  <h2 className="font-serif text-3xl text-slate-900 font-bold">Location & Landmarks</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  {/* Map mockup */}
                  <div className="relative h-72 rounded-xl overflow-hidden border border-slate-200">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117223.77977461939!2d85.25134731802955!3d23.343204812836267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104aa5db7dd%3A0xdc09d49d6899f43e!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                    />
                  </div>

                  {/* Nearby Landmarks list matching mockup 3 */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-[#c69c6d]">Nearby Landmarks</h3>
                    <div className="divide-y divide-slate-100 text-sm">
                      {(project.landmarks && project.landmarks.length > 0 ? project.landmarks : [
                        { name: "Birsa Munda Airport (IXR)", distance: "8 km" },
                        { name: "Ranchi Railway Station", distance: "5 km" },
                        { name: "RIMS Hospital, Bariatu", distance: "3 km" },
                        { name: "Morabadi Ground & Stadium", distance: "1.5 km" },
                        { name: "Tagore Hill", distance: "2.5 km" },
                      ]).map((lm: any, idx: number) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between">
                          <span className="text-slate-700 font-medium flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]" /> {lm.name}
                          </span>
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {lm.distance}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: Specifications matching mockup */}
              <section id="specifications" className="scroll-mt-24 space-y-6">
                <div>
                  <span className="text-[#c69c6d] text-xs font-bold uppercase tracking-widest block">Technical</span>
                  <h2 className="font-serif text-3xl text-slate-900 font-bold">Specifications</h2>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
                  {(project.specifications && project.specifications.length > 0 ? project.specifications : [
                    { category: "Structure", details: "RCC framed earthquake resistant structure with high-grade solid block masonry." },
                    { category: "Flooring", details: "Premium vitrified tiles in living, dining, and bedrooms; anti-skid ceramic tiles in bathrooms and balconies." },
                    { category: "Kitchen", details: "Polished granite platform with stainless steel sink and 2 ft dado ceramic tiles above counter." },
                    { category: "Doors & Windows", details: "Teak wood main door with digital smart lock; UPVC sliding windows with bug mesh." },
                    { category: "Electrical", details: "Concealed copper wiring with modular switches (Schneider/Legrand) and MCB protection." },
                  ]).map((sp: any, idx: number) => (
                    <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
                      <span className="w-36 shrink-0 font-bold text-slate-900 text-xs uppercase tracking-wider text-[#c69c6d]">
                        {sp.category}
                      </span>
                      <p className="text-sm text-slate-600 leading-relaxed">{sp.details}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sticky Stats Card matching mockup Image 3 */}
            <div className="lg:col-span-1 sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Quick Facts</span>
                  <h3 className="font-serif text-xl font-bold text-slate-900">{project.title}</h3>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#c69c6d]" /> Location
                    </span>
                    <span className="font-semibold text-slate-800">{project.location}</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c69c6d]" /> Status
                    </span>
                    <span className="font-semibold text-[#c69c6d] uppercase text-xs px-2 py-0.5 rounded bg-amber-50">
                      {project.status || "Ongoing"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#c69c6d]" /> Type
                    </span>
                    <span className="font-semibold text-slate-800">{project.type || "Residential"}</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Home className="w-4 h-4 text-[#c69c6d]" /> Configuration
                    </span>
                    <span className="font-semibold text-slate-800">{project.configuration}</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#c69c6d]" /> Possession
                    </span>
                    <span className="font-semibold text-slate-800">{project.possession}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
                  >
                    Enquire Now <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => alert("Downloading brochure...")}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-lg text-xs transition border border-slate-200 flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Brochure
                  </button>
                </div>
              </div>

              {/* Call Card */}
              <div className="bg-[#0b1528] text-white p-6 rounded-2xl shadow-sm text-center space-y-3">
                <Phone className="w-8 h-8 text-[#c69c6d] mx-auto" />
                <p className="font-semibold text-sm">Need immediate assistance?</p>
                <p className="text-xs text-slate-300">Speak directly with our property specialist</p>
                <a
                  href="tel:+919876543210"
                  className="inline-block text-sm font-bold text-[#c69c6d] hover:text-white transition"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner matching mockup Image 3 */}
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
