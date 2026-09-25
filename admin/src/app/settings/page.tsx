"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { ImageUploader } from "@/components/ImageUploader";
import { Save, ShieldCheck, CheckCircle2, Loader2, Sparkles, Building, Phone, Mail, Clock, LayoutTemplate, X, Plus } from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    hero: {
      title: "Creating\nSpaces.\nShaping\nLifestyles.",
      subtitle: "Thoughtfully designed homes for a better tomorrow.",
      heroImage: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif",
      images: [
        "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif",
        "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif",
        "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196626089-whatsapp-image-2026-09-22-at-5.10.48-pm.avif",
      ],
      exploreBtnText: "Explore Projects",
      contactBtnText: "Contact Us",
    },
    featured: {
      tag: "Featured Project",
      title: "KRITI HEIGHTS",
      subtitle: "Premium Residences in Morabadi, Ranchi",
      description: "A thoughtfully planned residential development. Designed for modern living with panoramic views and world-class leisure.",
      image: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif",
      slug: "kriti-heights",
    },
    findYourNext: {
      title: "Find Your Next Address\nwith Kriti Developers.",
      image: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196626089-whatsapp-image-2026-09-22-at-5.10.48-pm.avif",
      ctaText: "Enquire Now",
    },
    milestones: {
      yearsExperience: "10+",
      projectsDelivered: "5+",
      happyFamilies: "500+",
      sqftDeveloped: "2M+",
    },
    contact: {
      officeAddress: "Kriti Developers, Circular Road, Lalpur, Ranchi, Jharkhand - 834001",
      phone: "+91 95708 22345",
      email: "info@kritidevelopers.in",
      workingHoursMonSat: "Mon - Sat: 9:00 AM - 7:00 PM",
      workingHoursSun: "Sun: 10:00 AM - 4:00 PM",
    },
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.settings) {
          setSettings((prev) => ({
            ...prev,
            ...data.settings,
            hero: { ...prev.hero, ...(data.settings.hero || {}) },
            featured: { ...prev.featured, ...(data.settings.featured || {}) },
            findYourNext: { ...prev.findYourNext, ...(data.settings.findYourNext || {}) },
            milestones: { ...prev.milestones, ...(data.settings.milestones || {}) },
            contact: { ...prev.contact, ...(data.settings.contact || {}) },
          }));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save settings");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600 font-medium">
          <Loader2 className="w-6 h-6 animate-spin text-[#c69c6d]" />
          Loading Site Settings...
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16">
      <AdminHeader
        title="Visual Sections & Site Settings"
        description="Manage hero background, featured showcase ('Kriti Heights'), 'Find Your Next Address' banner, and company credentials."
      />

      <div className="p-8 max-w-5xl mx-auto space-y-8">
        {/* Status Notification */}
        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-sm font-semibold shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Settings saved successfully! Changes are live on your public website.
          </div>
        )}

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm font-semibold shadow-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: Hero Section */}
          <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#c69c6d] flex items-center justify-center">
                <LayoutTemplate className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Homepage Hero Section</h3>
                <p className="text-xs text-slate-500">Configure top hero background image and primary brand headline.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Hero Main Heading
                  </label>
                  <textarea
                    rows={4}
                    value={settings.hero.title}
                    onChange={(e) =>
                      setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value } })
                    }
                    placeholder="Creating&#10;Spaces.&#10;Shaping&#10;Lifestyles."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Use line breaks to split title lines on large screens.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Hero Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.hero.subtitle}
                    onChange={(e) =>
                      setSettings({ ...settings, hero: { ...settings.hero, subtitle: e.target.value } })
                    }
                    placeholder="Thoughtfully designed homes for a better tomorrow."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hero Slideshow Images (Auto-rotates every 5s)
                  </label>
                  <p className="text-[11px] text-slate-400 mb-3">All images cycle automatically with smooth crossfade and interactive dots.</p>

                  {/* Grid of current hero slides */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {((settings.hero as any).images || [settings.hero.heroImage].filter(Boolean)).map((imgUrl: string, idx: number) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden border border-slate-200 group h-32 bg-slate-100 shadow-2xs">
                        <img src={imgUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute top-1.5 left-1.5 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          Slide {idx + 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const current = (settings.hero as any).images || [settings.hero.heroImage].filter(Boolean);
                            const updated = current.filter((_: any, i: number) => i !== idx);
                            setSettings({
                              ...settings,
                              hero: {
                                ...settings.hero,
                                images: updated,
                                heroImage: updated[0] || "",
                              } as any,
                            });
                          }}
                          className="absolute top-1.5 right-1.5 bg-rose-600 hover:bg-rose-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition shadow"
                          title="Remove slide"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <ImageUploader
                  label="Upload Additional Slide (Cloudflare R2)"
                  value=""
                  onChange={(url) => {
                    if (!url) return;
                    const current = (settings.hero as any).images || [settings.hero.heroImage].filter(Boolean);
                    const updated = [...current, url];
                    setSettings({
                      ...settings,
                      hero: {
                        ...settings.hero,
                        images: updated,
                        heroImage: updated[0] || url,
                      } as any,
                    });
                  }}
                  helperText="Upload any high-res architectural photo to add it to the auto-rotating Hero slider."
                />
              </div>
            </div>
          </div>

          {/* Section 2: Featured Project Banner ("Kriti Heights") */}
          <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#c69c6d] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Featured Project Showcase ("Kriti Heights")</h3>
                <p className="text-xs text-slate-500">Edit the large featured showcase text, image, and destination link.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Section Tag
                    </label>
                    <input
                      type="text"
                      value={settings.featured.tag}
                      onChange={(e) =>
                        setSettings({ ...settings, featured: { ...settings.featured, tag: e.target.value } })
                      }
                      placeholder="Featured Project"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Project Slug
                    </label>
                    <input
                      type="text"
                      value={settings.featured.slug}
                      onChange={(e) =>
                        setSettings({ ...settings, featured: { ...settings.featured, slug: e.target.value } })
                      }
                      placeholder="kriti-heights"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Project Heading / Title
                  </label>
                  <input
                    type="text"
                    value={settings.featured.title}
                    onChange={(e) =>
                      setSettings({ ...settings, featured: { ...settings.featured, title: e.target.value } })
                    }
                    placeholder="KRITI HEIGHTS"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Project Subtitle
                  </label>
                  <input
                    type="text"
                    value={settings.featured.subtitle}
                    onChange={(e) =>
                      setSettings({ ...settings, featured: { ...settings.featured, subtitle: e.target.value } })
                    }
                    placeholder="Premium Residences in Morabadi, Ranchi"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={settings.featured.description}
                    onChange={(e) =>
                      setSettings({ ...settings, featured: { ...settings.featured, description: e.target.value } })
                    }
                    placeholder="A thoughtfully planned residential development..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                  />
                </div>
              </div>

              <div>
                <ImageUploader
                  label="Featured Showcase Image (Cloudflare R2)"
                  value={settings.featured.image}
                  onChange={(url) =>
                    setSettings({ ...settings, featured: { ...settings.featured, image: url } })
                  }
                  helperText="Main showcase photo displayed alongside project highlights."
                />
              </div>
            </div>
          </div>

          {/* Section 3: "Find Your Next Address" Banner */}
          <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#c69c6d] flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">"Find Your Next Address" Call-to-Action Banner</h3>
                <p className="text-xs text-slate-500">Configure headline, CTA button label, and background imagery.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Banner Headline
                  </label>
                  <textarea
                    rows={3}
                    value={settings.findYourNext.title}
                    onChange={(e) =>
                      setSettings({ ...settings, findYourNext: { ...settings.findYourNext, title: e.target.value } })
                    }
                    placeholder="Find Your Next Address&#10;with Kriti Developers."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={settings.findYourNext.ctaText}
                    onChange={(e) =>
                      setSettings({ ...settings, findYourNext: { ...settings.findYourNext, ctaText: e.target.value } })
                    }
                    placeholder="Enquire Now"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                  />
                </div>
              </div>

              <div>
                <ImageUploader
                  label="Banner Background Image (Cloudflare R2)"
                  value={settings.findYourNext.image}
                  onChange={(url) =>
                    setSettings({ ...settings, findYourNext: { ...settings.findYourNext, image: url } })
                  }
                  helperText="Full-bleed backdrop photo for the lead generation banner."
                />
              </div>
            </div>
          </div>

          {/* Section 4: Corporate Milestones & Stats */}
          <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider border-b border-slate-100 pb-3">
              Corporate Milestones (Showcased across Home & About pages)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Years Experience</label>
                <input
                  type="text"
                  value={settings.milestones.yearsExperience}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      milestones: { ...settings.milestones, yearsExperience: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Projects Delivered</label>
                <input
                  type="text"
                  value={settings.milestones.projectsDelivered}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      milestones: { ...settings.milestones, projectsDelivered: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Happy Families</label>
                <input
                  type="text"
                  value={settings.milestones.happyFamilies}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      milestones: { ...settings.milestones, happyFamilies: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Area Developed</label>
                <input
                  type="text"
                  value={settings.milestones.sqftDeveloped}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      milestones: { ...settings.milestones, sqftDeveloped: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Contact Details */}
          <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider border-b border-slate-100 pb-3">
              Corporate Office & Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={settings.contact.phone}
                  onChange={(e) =>
                    setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Official Email</label>
                <input
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) =>
                    setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Office Address</label>
                <input
                  type="text"
                  value={settings.contact.officeAddress}
                  onChange={(e) =>
                    setSettings({ ...settings, contact: { ...settings.contact, officeAddress: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c69c6d]"
                />
              </div>
            </div>
          </div>

          {/* Sticky Save Bar */}
          <div className="sticky bottom-4 z-40 bg-[#0b1528] text-white p-4 rounded-xl shadow-xl flex items-center justify-between border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#c69c6d]" />
              <span>All uploads stored in Cloudflare R2 and synced to Supabase PostgreSQL.</span>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-8 py-3 rounded-lg text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save All Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
