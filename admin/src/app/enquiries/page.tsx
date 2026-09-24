"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { Search, Phone, Mail, Clock, Trash2, CheckCircle2, MessageSquare, Filter, Building2, MapPin } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/enquiries?status=${statusFilter}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setEnquiries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this customer lead?")) return;
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries(prev => prev.filter(e => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = enquiries.filter(e =>
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.email?.toLowerCase().includes(search.toLowerCase()) ||
    e.phone?.includes(search) ||
    e.projectId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <AdminHeader
        title="Buyer Leads & Enquiries"
        description="Review inbound client requests from website forms, contact forms, and project page enquiry modals."
      />

      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client, email, phone, or project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto">
            {["ALL", "NEW", "CONTACTED", "IN_PROGRESS", "CLOSED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  statusFilter === status
                    ? "bg-[#0b1528] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Layout with Leads Table and Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${selectedEnquiry ? "lg:col-span-2" : "lg:col-span-3"} bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/80 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Client Name</th>
                    <th className="px-6 py-4">Interest & Budget</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-sm">
                        Loading customer leads...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-sm">
                        No customer leads found under this filter.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((enq) => {
                      const isSelected = selectedEnquiry?.id === enq.id;
                      return (
                        <tr
                          key={enq.id}
                          onClick={() => setSelectedEnquiry(enq)}
                          className={`hover:bg-slate-50/70 cursor-pointer transition ${
                            isSelected ? "bg-amber-50/50" : ""
                          }`}
                        >
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-900">{enq.name}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-slate-500 mt-1">
                              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {enq.phone}</span>
                              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {enq.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-slate-800">{enq.projectId || "General Property"}</p>
                            <p className="text-xs text-slate-500">{enq.budget || "Budget not specified"}</p>
                          </td>
                          <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={enq.status || "NEW"}
                              onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full border focus:outline-none ${
                                enq.status === "NEW" ? "bg-amber-50 text-amber-900 border-amber-200" :
                                enq.status === "CONTACTED" ? "bg-blue-50 text-blue-900 border-blue-200" :
                                enq.status === "IN_PROGRESS" ? "bg-purple-50 text-purple-900 border-purple-200" :
                                "bg-emerald-50 text-emerald-900 border-emerald-200"
                              }`}
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="IN_PROGRESS">IN_PROGRESS</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleDelete(enq.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lead Detail View Panel */}
          {selectedEnquiry && (
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{selectedEnquiry.name}</h3>
                  <span className="text-xs text-slate-400">Lead ID: {selectedEnquiry.id}</span>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="text-xs text-slate-400 hover:text-slate-700"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Contact Details</p>
                  <p className="flex items-center gap-2 font-medium text-slate-800">
                    <Phone className="w-4 h-4 text-[#c69c6d]" /> {selectedEnquiry.phone}
                  </p>
                  <p className="flex items-center gap-2 font-medium text-slate-800 mt-1">
                    <Mail className="w-4 h-4 text-[#c69c6d]" /> {selectedEnquiry.email}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Property & Preference</p>
                  <p className="flex items-center gap-2 text-slate-800 font-semibold">
                    <Building2 className="w-4 h-4 text-slate-500" /> {selectedEnquiry.projectId || "General Property"}
                  </p>
                  {selectedEnquiry.location && (
                    <p className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {selectedEnquiry.location}
                    </p>
                  )}
                  {selectedEnquiry.budget && (
                    <p className="text-xs text-slate-600 mt-1">
                      Budget: <span className="font-semibold text-slate-800">{selectedEnquiry.budget}</span>
                    </p>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Client Message / Requirement</p>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/70 text-slate-700 text-xs leading-relaxed">
                    {selectedEnquiry.message || "No specific message provided."}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Source: {selectedEnquiry.source || "Website"}</span>
                  <span>Received: {new Date(selectedEnquiry.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
