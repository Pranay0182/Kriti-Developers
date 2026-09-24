"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Loader2, Sparkles, Building2, MapPin, DollarSign } from "lucide-react";

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project: "Kriti Heights",
    location: "Ranchi",
    budget: "₹75L - ₹1 Cr",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          project: formData.project,
          location: formData.location,
          budget: formData.budget,
          message: formData.message,
          source: "ENQUIRY_PAGE",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Enquiry failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending enquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6">
      {/* Full-bleed luxury background matching mockup Image 7 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif"
          alt="Luxury Architecture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070e1c]/90 via-[#070e1c]/80 to-[#070e1c]/95 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <span className="text-[#c69c6d] font-bold tracking-[0.25em] uppercase text-xs block">
            EXCLUSIVE INVITATION
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-tight">
            Find Your Next Address
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Tell us what you're looking for and our experts will curate the perfect match.
          </p>
        </div>

        {/* Card Form matching mockup Image 7 */}
        <div className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/20">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">Enquiry Submitted!</h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you, {formData.name}. Your preferences have been forwarded to our senior property consultant. We will reach out to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-[#c69c6d] hover:underline"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Srikant Mohanty"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="srikant@example.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Interested Project
                </label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                >
                  <option value="Kriti Heights">Kriti Heights (Morabadi, Ranchi)</option>
                  <option value="Kriti Greens">Kriti Greens (Bariatu, Ranchi)</option>
                  <option value="Kriti Urban">Kriti Urban (Kanke Road, Ranchi)</option>
                  <option value="Kriti Enclave">Kriti Enclave (Lalpur, Ranchi)</option>
                  <option value="Kriti Prime">Kriti Prime (Harmu / Argora, Ranchi)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Preferred Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                >
                  <option value="Ranchi">Ranchi (General)</option>
                  <option value="Morabadi">Morabadi</option>
                  <option value="Bariatu">Bariatu</option>
                  <option value="Kanke Road">Kanke Road / Ring Road</option>
                  <option value="Lalpur">Lalpur / Circular Road</option>
                  <option value="Harmu / Argora">Harmu / Argora</option>
                  <option value="Namkum / Hinoo">Namkum / Hinoo / Airport</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                >
                  <option value="₹50L - ₹75L">₹50 Lakh - ₹75 Lakh</option>
                  <option value="₹75L - ₹1 Cr">₹75 Lakh - ₹1 Crore</option>
                  <option value="₹1 Cr - ₹1.5 Cr">₹1 Crore - ₹1.5 Crore</option>
                  <option value="₹1.5 Cr - ₹2.5 Cr">₹1.5 Crore - ₹2.5 Crore</option>
                  <option value="Above ₹2.5 Cr">Above ₹2.5 Crore (Ultra Luxury)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Specific Requirements / Message
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Preferred floor, vaastu direction, timeline..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold py-3.5 rounded-lg text-xs uppercase tracking-widest transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
