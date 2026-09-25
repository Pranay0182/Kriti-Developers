import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Building2, Bell } from "lucide-react";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Upcoming Projects | Kriti Developers",
  description: "Coming Soon - A New Address is Taking Shape across Ranchi, Jharkhand.",
};

export default async function UpcomingProjectsPage() {
  let projects: any[] = [];
  try {
    const res = await pool.query('SELECT * FROM "project" WHERE status = \'UPCOMING\' ORDER BY "createdAt" DESC');
    projects = res.rows;
  } catch (err) {
    console.error(err);
  }

  // Fallback if none in DB
  if (projects.length === 0) {
    projects = [
      {
        title: "Kriti Urban",
        slug: "kriti-urban",
        subtitle: "Premium Residences",
        location: "Kanke Road, Ranchi",
        heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      },
      {
        title: "Kriti City",
        slug: "kriti-city",
        subtitle: "Integrated Township",
        location: "Ranchi Ring Road, Ranchi",
        heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      },
      {
        title: "Kriti Prime",
        slug: "kriti-prime",
        subtitle: "Luxury Apartments",
        location: "Morabadi, Ranchi",
        heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
      },
    ];
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd]">
      {/* Hero Header matching mockup Image 8 */}
      <section className="relative h-[48vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
            alt="Upcoming Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#070e1c]/80 backdrop-blur-[1px]" />
        </div>

        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="text-[#c69c6d] font-bold tracking-[0.25em] uppercase text-xs mb-3 block">
            FUTURE COMMUNITIES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-4 tracking-tight">
            Coming Soon
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto font-light text-base md:text-lg">
            A New Address is Taking Shape.
          </p>
        </div>
      </section>

      {/* Upcoming Developments Grid matching mockup Image 8 */}
      <section className="py-20 lg:py-28">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-72 overflow-hidden bg-slate-100">
                    <Image
                      src={proj.heroImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#c69c6d] text-slate-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded shadow">
                      Coming Soon
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-[#c69c6d] transition">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">{proj.subtitle || "Premium Residences"}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c69c6d]" /> {proj.location || "Ranchi"}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/enquiry?project=${encodeURIComponent(proj.title)}`}
                    className="w-full bg-[#c69c6d] hover:bg-[#b58b5c] text-slate-950 font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
                  >
                    Register Interest <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
