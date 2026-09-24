"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { ImageUploader } from "@/components/ImageUploader";
import { Plus, Trash2, Copy, Check, Filter, Image as ImageIcon, Loader2 } from "lucide-react";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // New item upload state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("PROJECTS");
  const [newUrl, setNewUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/gallery?category=${categoryFilter}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [categoryFilter]);

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) {
      alert("Please upload an image first");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle || "Gallery Photo",
          category: newCategory,
          url: newUrl,
        }),
      });

      if (res.ok) {
        const created = await res.json();
        setItems(prev => [created, ...prev]);
        setShowUploadModal(false);
        setNewTitle("");
        setNewUrl("");
      } else {
        alert("Failed to save gallery item");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems(prev => prev.filter(i => i.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <AdminHeader
        title="Cloudflare Media Gallery"
        description="Organize marketing assets, architectural renders, interiors, amenities, and construction updates."
        action={
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm shadow transition"
          >
            <Plus className="w-4 h-4" /> Upload to R2
          </button>
        }
      />

      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-5 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-lg">Upload Media to Cloudflare R2</h3>
                <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleAddMedia} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Asset Title / Caption</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Master Bedroom Living Suite"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Gallery Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                  >
                    <option value="PROJECTS">PROJECTS (Exterior Façade & Renders)</option>
                    <option value="INTERIORS">INTERIORS (Living, Bedroom, Kitchen)</option>
                    <option value="AMENITIES">AMENITIES (Pool, Gym, Clubhouse, Park)</option>
                    <option value="CONSTRUCTION">CONSTRUCTION (Live Site Progress)</option>
                  </select>
                </div>

                <ImageUploader
                  label="Image File"
                  value={newUrl}
                  onChange={(url) => setNewUrl(url)}
                  helperText="Uploaded directly to bucket 'images' on Cloudflare R2."
                />

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !newUrl}
                    className="flex items-center gap-2 bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold px-5 py-2 rounded-lg text-sm shadow transition disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    Save to Gallery
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto">
            {["ALL", "PROJECTS", "INTERIORS", "AMENITIES", "CONSTRUCTION"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  categoryFilter === cat
                    ? "bg-[#0b1528] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-slate-500 hidden sm:inline-block">
            {items.length} Assets
          </span>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-16 text-center text-slate-400 text-sm">
              Loading media gallery assets from Cloudflare R2...
            </div>
          ) : items.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 text-sm">
              No images found in this category. Upload one to start!
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition">
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={item.url}
                    alt={item.title || "Gallery image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.category}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => copyUrl(item.id, item.url)}
                      className="p-2 bg-white text-slate-800 rounded-full shadow hover:bg-slate-100 transition"
                      title="Copy Public R2 Link"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-rose-600 text-white rounded-full shadow hover:bg-rose-700 transition"
                      title="Delete Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3.5">
                  <p className="font-semibold text-slate-900 text-xs truncate">{item.title || "Untitled Asset"}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
