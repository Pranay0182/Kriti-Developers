export const metadata = {
  title: "Privacy Policy | Kriti Developers",
  description: "Learn how Kriti Developers protects your personal information and privacy.",
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "collect",
      title: "Information We Collect",
      content:
        "We collect personal information such as your name, phone number, email address, property preferences, and budget when you submit forms on our website or contact our sales specialists.",
    },
    {
      id: "usage",
      title: "How We Use Information",
      content:
        "Your data is strictly utilized to provide you with property details, schedule site visits, deliver brochures, and send updates regarding new real estate launches by Kriti Developers. We do not sell or rent your information to third-party advertisers.",
    },
    {
      id: "cookies",
      title: "Cookies & Analytics",
      content:
        "Our digital platform utilizes cookies and secure analytics cookies to measure page traffic, optimize browsing speeds, and personalize your experience across desktop and mobile devices.",
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      content:
        "We may engage trusted third-party providers (such as Cloudflare for asset delivery, Supabase for secure database storage, and map providers) who operate under strict non-disclosure and security commitments.",
    },
    {
      id: "security",
      title: "Data Security",
      content:
        "We implement industry-standard encryption protocols (SSL/TLS) to safeguard your customer records and communication history against unauthorized access or disclosure.",
    },
    {
      id: "changes",
      title: "Changes & Contact Information",
      content:
        "We may update this Privacy Policy periodically. If you have questions regarding your data privacy, please reach us at info@kritidevelopers.in or call +91 95708 22345.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc]">
      {/* Header */}
      <section className="bg-[#0b1528] text-white py-20 border-b border-slate-800 text-center">
        <div className="container max-w-4xl mx-auto px-6">
          <span className="text-[#c69c6d] font-bold tracking-[0.25em] uppercase text-xs mb-2 block">
            LEGAL & PRIVACY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-sm font-light">
            Your privacy is important to us. Please read these terms carefully.
          </p>
        </div>
      </section>

      {/* Content matching mockup Image 9 */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {sections.map((sec, idx) => (
              <div key={sec.id} className="p-8 sm:p-10 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#c69c6d]">
                  0{idx + 1}. SECTION
                </span>
                <h2 className="font-serif text-2xl font-bold text-slate-900">{sec.title}</h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
