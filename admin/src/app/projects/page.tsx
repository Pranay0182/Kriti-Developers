"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/AdminHeader";
import { Plus, Search, Building2, ExternalLink, Trash2, Edit, CheckCircle2, Clock } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete property "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting project");
    }
  };

  const filtered = projects.filter(p => {
    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase()) ||
      p.configuration?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <AdminHeader
        title="Properties Portfolio"
        description="Create, update, and manage developments displayed on the public website."
        action={
          <Link
            href="/projects/new"
            className="flex items-center gap-2 bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm shadow transition"
          >
            <Plus className="w-4 h-4" /> Add Property
          </Link>
        }
      />

      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Controls: Search and Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, location, or unit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50 focus:border-[#c69c6d]"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto">
            {["ALL", "ONGOING", "UPCOMING", "COMPLETED"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  statusFilter === tab
                    ? "bg-[#0b1528] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table of Properties */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Type & Config</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Possession</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                      Loading properties portfolio...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                      No matching properties found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-50/60 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                            {proj.heroImage ? (
                              <img src={proj.heroImage} alt={proj.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <Building2 className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-base">{proj.title}</p>
                            <p className="text-xs text-slate-500">/projects/{proj.slug}</p>
                            {proj.isFeatured && (
                              <span className="inline-block mt-1 text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                                Featured on Home
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">{proj.type || "Residential"}</p>
                        <p className="text-xs text-slate-500">{proj.configuration}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {proj.location}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {proj.possession}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          proj.status === "ONGOING" ? "bg-amber-100 text-amber-900 border border-amber-200" :
                          proj.status === "UPCOMING" ? "bg-blue-100 text-blue-900 border border-blue-200" :
                          "bg-slate-100 text-slate-800 border border-slate-200"
                        }`}>
                          {proj.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`http://localhost:3000/projects/${proj.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
                            title="View on Live Site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <Link
                            href={`/projects/${proj.id}`}
                            className="p-1.5 rounded hover:bg-amber-50 text-[#c69c6d] hover:text-[#b58b5c] transition"
                            title="Edit Property"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(proj.id, proj.title)}
                            className="p-1.5 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                            title="Delete Property"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
