export const metadata = {
  title: "Terms & Conditions | Kriti Developers",
  description: "Terms and Conditions governing the use of the Kriti Developers website and property offerings.",
};

export default function TermsPage() {
  const terms = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing this website, you agree to be bound by these Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.",
    },
    {
      title: "2. Information & Accuracy",
      content:
        "The visuals, floor plans, dimensions, and specifications displayed are artistic impressions and indicative in nature. Kriti Developers reserves the right to make modifications in compliance with RERA and municipal approvals.",
    },
    {
      title: "3. Intellectual Property",
      content:
        "All brand assets, photography, architectural renderings, logos, and digital designs are the exclusive intellectual property of Kriti Developers.",
    },
    {
      title: "4. Enquiries & Representation",
      content:
        "Submitting an enquiry through our digital portal does not constitute a formal booking, allotment, or sales deed. Official sales agreements are executed at our registered sales offices.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc]">
      <section className="bg-[#0b1528] text-white py-20 border-b border-slate-800 text-center">
        <div className="container max-w-4xl mx-auto px-6">
          <span className="text-[#c69c6d] font-bold tracking-[0.25em] uppercase text-xs mb-2 block">
            LEGAL NOTICE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Terms & Conditions
          </h1>
          <p className="text-slate-300 text-sm font-light">
            Please read these terms carefully before browsing our developments.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {terms.map((t, idx) => (
              <div key={idx} className="p-8 sm:p-10 space-y-3">
                <h2 className="font-serif text-2xl font-bold text-slate-900">{t.title}</h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  {t.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
