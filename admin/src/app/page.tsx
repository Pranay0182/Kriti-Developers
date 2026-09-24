import Link from "next/link";
import { AdminHeader } from "@/components/AdminHeader";
import { Building2, MessageSquareText, Image as ImageIcon, TrendingUp, Plus, ArrowUpRight, CheckCircle2, Clock, Phone, Mail, ExternalLink } from "lucide-react";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let projectsCount = 0;
  let enquiriesCount = 0;
  let galleryCount = 0;
  let recentEnquiries: any[] = [];
  let projects: any[] = [];

  try {
    const [projRes, enqRes, totalEnqRes, galRes] = await Promise.all([
      pool.query('SELECT * FROM "project" ORDER BY "createdAt" DESC'),
      pool.query('SELECT * FROM "enquiry" ORDER BY "createdAt" DESC LIMIT 5'),
      pool.query('SELECT COUNT(*) FROM "enquiry"'),
      pool.query('SELECT COUNT(*) FROM "galleryItem"')
    ]);
    projects = projRes.rows;
    projectsCount = projects.length;
    recentEnquiries = enqRes.rows;
    enquiriesCount = parseInt(totalEnqRes.rows[0]?.count || "0", 10);
    galleryCount = parseInt(galRes.rows[0]?.count || "0", 10);
  } catch (err) {
    console.error("Dashboard fetch error:", err);
  }

  const ongoingCount = projects.filter(p => p.status === 'ONGOING').length;
  const upcomingCount = projects.filter(p => p.status === 'UPCOMING').length;
  const completedCount = projects.filter(p => p.status === 'COMPLETED').length;

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <AdminHeader
        title="Executive Overview"
        description="Monitor real-time project metrics, inbound buyer enquiries, and Cloudflare media assets."
        action={
          <Link
            href="/projects/new"
            className="flex items-center gap-2 bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm shadow transition"
          >
            <Plus className="w-4 h-4" /> Add Project
          </Link>
        }
      />

      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Properties Portfolio</span>
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-[#c69c6d]">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900 mt-4">{projectsCount}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">{ongoingCount} Ongoing</span>
              <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">{upcomingCount} Upcoming</span>
              <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">{completedCount} Delivered</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inbound Enquiries</span>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <MessageSquareText className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900 mt-4">{enquiriesCount}</p>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Across web forms & project pages
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">R2 Gallery Assets</span>
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900 mt-4">{galleryCount}</p>
            <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Cloudflare R2 bucket synchronized
            </p>
          </div>

          <div className="bg-[#0b1528] text-white p-6 rounded-xl border border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c69c6d]">Customer Trust</span>
              <p className="text-2xl font-bold mt-2">500+ Families</p>
              <p className="text-xs text-slate-300 mt-1">2M+ Sq. Ft. developed across Ranchi</p>
            </div>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-between text-xs text-[#c69c6d] hover:text-white font-medium transition"
            >
              <span>Preview Live Portal</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Inbound Buyer Enquiries Section */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Buyer Enquiries</h2>
              <p className="text-xs text-slate-500">High-intent client requests received from the website</p>
            </div>
            <Link
              href="/enquiries"
              className="text-xs font-semibold text-[#c69c6d] hover:text-[#b58b5c] transition flex items-center gap-1"
            >
              View All Enquiries <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Client Details</th>
                  <th className="px-6 py-3.5">Interested In</th>
                  <th className="px-6 py-3.5">Budget</th>
                  <th className="px-6 py-3.5">Message / Note</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400 text-sm">
                      No customer enquiries yet. Test enquiries will appear here automatically.
                    </td>
                  </tr>
                ) : (
                  recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50/60 transition">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{enq.name}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {enq.phone}</span>
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {enq.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-800">{enq.projectId || "General Enquiry"}</span>
                        <p className="text-xs text-slate-500">{enq.location || "Ranchi"}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {enq.budget || "Unspecified"}
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate text-xs text-slate-600">
                        {enq.message || "No notes provided"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          enq.status === "NEW" ? "bg-amber-100 text-amber-800" :
                          enq.status === "CONTACTED" ? "bg-blue-100 text-blue-800" :
                          enq.status === "IN_PROGRESS" ? "bg-purple-100 text-purple-800" :
                          "bg-emerald-100 text-emerald-800"
                        }`}>
                          {enq.status || "NEW"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href="/enquiries"
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                        >
                          Review Lead
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Projects Portfolio Table */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Properties Portfolio</h2>
              <p className="text-xs text-slate-500">Live developments showcased on the public website</p>
            </div>
            <Link
              href="/projects"
              className="text-xs font-semibold text-[#c69c6d] hover:text-[#b58b5c] transition flex items-center gap-1"
            >
              Manage All Projects <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Property</th>
                  <th className="px-6 py-3.5">Type & Config</th>
                  <th className="px-6 py-3.5">Location</th>
                  <th className="px-6 py-3.5">Possession</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                          {proj.heroImage ? (
                            <img src={proj.heroImage} alt={proj.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <Building2 className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{proj.title}</p>
                          <p className="text-xs text-slate-500">{proj.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-800">{proj.type || "Residential"}</p>
                      <p className="text-xs text-slate-500">{proj.configuration}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {proj.location}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {proj.possession}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        proj.status === "ONGOING" ? "bg-amber-100 text-amber-900" :
                        proj.status === "UPCOMING" ? "bg-blue-100 text-blue-900" :
                        "bg-slate-100 text-slate-800"
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <a
                        href={`http://localhost:3000/projects/${proj.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 rounded hover:bg-slate-100 transition"
                      >
                        <ExternalLink className="w-3 h-3" /> View
                      </a>
                      <Link
                        href={`/projects/${proj.id}`}
                        className="inline-flex items-center gap-1 text-xs text-[#c69c6d] hover:text-[#b58b5c] font-semibold px-2 py-1 rounded hover:bg-amber-50 transition"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
