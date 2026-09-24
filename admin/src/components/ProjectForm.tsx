"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/ImageUploader";
import { BrochureUploader } from "@/components/BrochureUploader";
import { Plus, Trash2, Save, ArrowLeft, Loader2, Check } from "lucide-react";
import Link from "next/link";

interface ProjectFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const COMMON_AMENITIES = [
  "Swimming Pool",
  "Clubhouse",
  "Landscaped Gardens",
  "24/7 Security",
  "Gymnasium",
  "Kids Play Area",
  "Jogging Track",
  "Yoga Pavilion",
  "Solar Power Integration",
  "Electric Car Charging",
  "Intercom & CCTV",
  "Power Backup",
];

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "media" | "amenities" | "floorPlans" | "landmarks" | "specs">("general");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    subtitle: initialData?.subtitle || "",
    status: initialData?.status || "ONGOING",
    type: initialData?.type || "Residential",
    location: initialData?.location || "Ranchi",
    configuration: initialData?.configuration || "2 & 3 BHK",
    possession: initialData?.possession || "2027",
    description: initialData?.description || "",
    heroImage: initialData?.heroImage || "",
    brochureUrl: initialData?.brochureUrl || "",
    videoUrl: initialData?.videoUrl || "",
    isFeatured: initialData?.isFeatured || false,
    amenities: initialData?.amenities?.map((a: any) => typeof a === "string" ? a : a.name) || ["Swimming Pool", "Clubhouse", "Landscaped Gardens", "24/7 Security", "Gymnasium", "Kids Play Area"],
    landmarks: initialData?.landmarks || [
      { name: "Birsa Munda Airport (IXR)", distance: "8 km" },
      { name: "Ranchi Railway Station", distance: "5 km" },
      { name: "RIMS Hospital, Bariatu", distance: "3 km" },
    ],
    floorPlans: initialData?.floorPlans || [
      { name: "2 BHK - Floor Plan", planType: "2 BHK", size: "1200 Sq. Ft.", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" }
    ],
    specifications: initialData?.specifications || [
      { category: "Structure", details: "RCC framed earthquake resistant structure." },
      { category: "Flooring", details: "Vitrified tiles in living and dining rooms." },
      { category: "Kitchen", details: "Granite counter top with stainless steel sink." }
    ]
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: !isEditing ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") : prev.slug
    }));
  };

  const toggleAmenity = (name: string) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(name);
      return {
        ...prev,
        amenities: exists ? prev.amenities.filter((a: string) => a !== name) : [...prev.amenities, name]
      };
    });
  };

  const addLandmark = () => {
    setFormData(prev => ({
      ...prev,
      landmarks: [...prev.landmarks, { name: "", distance: "" }]
    }));
  };

  const removeLandmark = (index: number) => {
    setFormData(prev => ({
      ...prev,
      landmarks: prev.landmarks.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateLandmark = (index: number, field: string, val: string) => {
    setFormData(prev => {
      const updated = [...prev.landmarks];
      updated[index][field] = val;
      return { ...prev, landmarks: updated };
    });
  };

  const addFloorPlan = () => {
    setFormData(prev => ({
      ...prev,
      floorPlans: [...prev.floorPlans, { name: "", planType: "2 BHK", size: "", url: "" }]
    }));
  };

  const removeFloorPlan = (index: number) => {
    setFormData(prev => ({
      ...prev,
      floorPlans: prev.floorPlans.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateFloorPlan = (index: number, field: string, val: string) => {
    setFormData(prev => {
      const updated = [...prev.floorPlans];
      updated[index][field] = val;
      return { ...prev, floorPlans: updated };
    });
  };

  const addSpec = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { category: "", details: "" }]
    }));
  };

  const removeSpec = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateSpec = (index: number, field: string, val: string) => {
    setFormData(prev => {
      const updated = [...prev.specifications];
      updated[index][field] = val;
      return { ...prev, specifications: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEditing ? `/api/projects/${initialData.id}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Save failed");
      }

      router.push("/projects");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top action header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-6 py-2.5 rounded-lg text-sm shadow transition disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isEditing ? "Update Property" : "Publish Property"}
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
        {[
          { key: "general", label: "1. Overview & Info" },
          { key: "media", label: "2. Cloudflare R2 Media" },
          { key: "amenities", label: "3. Amenities & Highlights" },
          { key: "floorPlans", label: "4. Floor Plans" },
          { key: "landmarks", label: "5. Nearby Landmarks" },
          { key: "specs", label: "6. Specifications" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
              activeTab === tab.key
                ? "border-[#c69c6d] text-[#c69c6d] bg-white rounded-t-lg"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: General Info */}
      {activeTab === "general" && (
        <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Property Overview</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Property Name *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Kriti Heights"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">URL Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. kriti-heights"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Tagline / Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Premium Residences in Morabadi, Ranchi"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Development Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
              >
                <option value="ONGOING">ONGOING (Active Development)</option>
                <option value="UPCOMING">UPCOMING (Pre-Launch)</option>
                <option value="COMPLETED">COMPLETED (Handed Over)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Property Type</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="Residential / Luxury Villas / Commercial"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">City / Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ranchi"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Configurations Offered</label>
              <input
                type="text"
                value={formData.configuration}
                onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                placeholder="2 & 3 BHK Apartments"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Possession Year / Date</label>
              <input
                type="text"
                value={formData.possession}
                onChange={(e) => setFormData({ ...formData, possession: e.target.value })}
                placeholder="2027"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-[#c69c6d] rounded border-slate-300 focus:ring-[#c69c6d]"
                />
                <span className="text-sm font-semibold text-slate-800">Pin as Featured Project on Home Page</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">About the Project Description</label>
              <textarea
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Comprehensive details about the property..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50 leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Media */}
      {activeTab === "media" && (
        <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Cloudflare R2 Media Assets</h3>

          <div className="space-y-6">
            <ImageUploader
              label="Primary Hero Façade Image"
              value={formData.heroImage}
              onChange={(url) => setFormData({ ...formData, heroImage: url })}
              helperText="High-resolution exterior render stored securely in Cloudflare R2 bucket 'images'."
            />

            <div className="pt-4 border-t border-slate-100 space-y-6">
              <BrochureUploader
                label="Official Project Brochure (PDF)"
                value={formData.brochureUrl}
                onChange={(url) => setFormData({ ...formData, brochureUrl: url })}
                helperText="Upload the developer's official brochure PDF. Buyers can download this directly from the project page."
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Video Walkthrough URL</label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50 max-w-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Amenities & Highlights */}
      {activeTab === "amenities" && (
        <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Project Highlights & Amenities</h3>
              <p className="text-xs text-slate-500">Select the features included in this development</p>
            </div>
            <span className="text-xs font-bold text-[#c69c6d] bg-amber-50 px-2.5 py-1 rounded">
              {formData.amenities.length} Selected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {COMMON_AMENITIES.map((am) => {
              const isSelected = formData.amenities.includes(am);
              return (
                <div
                  key={am}
                  onClick={() => toggleAmenity(am)}
                  className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer transition ${
                    isSelected
                      ? "bg-[#c69c6d] text-slate-950 border-[#c69c6d] shadow-xs font-bold"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>{am}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#c69c6d]" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Floor Plans */}
      {activeTab === "floorPlans" && (
        <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Floor Plans & Layouts</h3>
              <p className="text-xs text-slate-500">Add 2 BHK, 3 BHK, and Penthouse unit layouts</p>
            </div>
            <button
              type="button"
              onClick={addFloorPlan}
              className="flex items-center gap-1.5 text-xs font-bold text-[#c69c6d] hover:text-[#b58b5c] bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Floor Plan
            </button>
          </div>

          <div className="space-y-4">
            {formData.floorPlans.map((plan: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Floor Plan #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFloorPlan(idx)}
                    className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Plan Title</label>
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => updateFloorPlan(idx, "name", e.target.value)}
                      placeholder="e.g. 2 BHK - Floor Plan"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Plan Type</label>
                    <input
                      type="text"
                      value={plan.planType}
                      onChange={(e) => updateFloorPlan(idx, "planType", e.target.value)}
                      placeholder="2 BHK / 3 BHK / 4 BHK"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Super Built-up Area</label>
                    <input
                      type="text"
                      value={plan.size}
                      onChange={(e) => updateFloorPlan(idx, "size", e.target.value)}
                      placeholder="e.g. 1200 Sq. Ft."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <ImageUploader
                      label="Floor Plan Schematic Image"
                      value={plan.url}
                      onChange={(url) => updateFloorPlan(idx, "url", url)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Nearby Landmarks */}
      {activeTab === "landmarks" && (
        <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Nearby Landmarks & Connectivity</h3>
              <p className="text-xs text-slate-500">Show proximity to stations, airports, hospitals, and universities</p>
            </div>
            <button
              type="button"
              onClick={addLandmark}
              className="flex items-center gap-1.5 text-xs font-bold text-[#c69c6d] hover:text-[#b58b5c] bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Landmark
            </button>
          </div>

          <div className="space-y-3">
            {formData.landmarks.map((lm: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={lm.name}
                  onChange={(e) => updateLandmark(idx, "name", e.target.value)}
                  placeholder="e.g. Birsa Munda Airport (IXR)"
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                />
                <input
                  type="text"
                  value={lm.distance}
                  onChange={(e) => updateLandmark(idx, "distance", e.target.value)}
                  placeholder="e.g. 7 km"
                  className="w-36 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                />
                <button
                  type="button"
                  onClick={() => removeLandmark(idx)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Specifications */}
      {activeTab === "specs" && (
        <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Technical Specifications</h3>
              <p className="text-xs text-slate-500">Provide detailed construction and architectural specs</p>
            </div>
            <button
              type="button"
              onClick={addSpec}
              className="flex items-center gap-1.5 text-xs font-bold text-[#c69c6d] hover:text-[#b58b5c] bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Specification
            </button>
          </div>

          <div className="space-y-4">
            {formData.specifications.map((sp: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={sp.category}
                    onChange={(e) => updateSpec(idx, "category", e.target.value)}
                    placeholder="Category e.g. Structure / Flooring / Electrical"
                    className="w-64 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold uppercase text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(idx)}
                    className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={sp.details}
                  onChange={(e) => updateSpec(idx, "details", e.target.value)}
                  placeholder="Details and brands used..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
