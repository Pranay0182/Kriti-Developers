"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interestedIn: "Kriti Heights",
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
          project: formData.interestedIn,
          location: "Ranchi",
          message: formData.message,
          source: "CONTACT_PAGE",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          interestedIn: "Kriti Heights",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header matching mockup Image 6 */}
      <section className="relative h-[42vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#070e1c]/80 backdrop-blur-[1px]" />
        </div>

        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="text-[#c69c6d] font-bold tracking-[0.25em] uppercase text-xs mb-3 block">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-4 tracking-tight">
            Let's Talk
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto font-light text-base md:text-lg">
            We're here to help you find your next home.
          </p>
        </div>
      </section>

      {/* Main Split Layout matching mockup Image 6 */}
      <section className="py-20 lg:py-28 bg-[#fafbfc]">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Contact Information & Map */}
            <div className="space-y-10">
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs space-y-8">
                <div>
                  <span className="text-[#c69c6d] font-bold tracking-[0.2em] uppercase text-xs block mb-2">
                    REACH OUT
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-slate-900">
                    Contact Information
                  </h2>
                </div>

                <div className="space-y-6 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#c69c6d] flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">Office Address</p>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Kriti Developers, Circular Road, Lalpur, Ranchi, Jharkhand - 834001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#c69c6d] flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">Phone</p>
                      <a href="tel:+919570822345" className="text-slate-700 hover:text-[#c69c6d] mt-1 block font-medium">
                        +91 95708 22345
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#c69c6d] flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">Email</p>
                      <a href="mailto:info@kritidevelopers.in" className="text-slate-700 hover:text-[#c69c6d] mt-1 block font-medium">
                        info@kritidevelopers.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#c69c6d] flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">Working Hours</p>
                      <p className="text-slate-600 mt-1">Mon - Sat: 9:00 AM - 7:00 PM</p>
                      <p className="text-slate-500 text-xs mt-0.5">Sun: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Find Us Section matching mockup */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="font-serif text-2xl font-bold text-slate-900">Find Us</h3>
                <div className="h-64 rounded-xl overflow-hidden border border-slate-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117223.77977461939!2d85.25134731802955!3d23.343204812836267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104aa5db7dd%3A0xdc09d49d6899f43e!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: "Send Us a Message" Form matching mockup */}
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[#c69c6d] font-bold tracking-[0.2em] uppercase text-xs block mb-2">
                INQUIRY FORM
              </span>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-slate-500 text-sm mb-8">
                Fill the details below and an executive will contact you within 24 hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">Message Delivered!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you for contacting Kriti Developers. Our dedicated property consultant will be in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-bold uppercase tracking-wider text-[#c69c6d] hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Srikant Mohanty"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 95708 22345"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="srikant@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Interested In
                    </label>
                    <select
                      value={formData.interestedIn}
                      onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
                    >
                      <option value="Kriti Heights">Kriti Heights (Morabadi, Ranchi)</option>
                      <option value="Kriti Greens">Kriti Greens (Bariatu, Ranchi)</option>
                      <option value="Kriti Urban">Kriti Urban (Kanke Road, Ranchi)</option>
                      <option value="Kriti Enclave">Kriti Enclave (Lalpur, Ranchi)</option>
                      <option value="General Query">General Query / Investment Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you find your dream home?..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold py-4 rounded-lg text-sm tracking-wider uppercase transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
