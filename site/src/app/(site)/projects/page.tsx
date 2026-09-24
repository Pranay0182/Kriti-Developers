import Image from "next/image";
import Link from "next/link";
import { ProjectCard, ProjectStatus } from "@/components/ProjectCard";
import pool from "@/lib/db";

export const revalidate = 60;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter: filterParam } = await searchParams;
  const currentFilter = filterParam?.toUpperCase() || "ALL";

  let projects: any[] = [];
  try {
    const res = await pool.query('SELECT * FROM "project" ORDER BY "createdAt" DESC');
    projects = res.rows.map(p => ({
      title: p.title,
      slug: p.slug,
      location: p.location,
      configuration: p.configuration,
      status: p.status as ProjectStatus,
      imageUrl: p.heroImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    }));
  } catch (err) {
    console.error("Error fetching projects from DB:", err);
  }

  const filteredProjects = projects.filter((project) => {
    if (currentFilter === "ALL") return true;
    return project.status === currentFilter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd]">
      {/* Page Header matching mockup 2 */}
      <section className="relative h-[48vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif"
            alt="Our Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#070e1c]/75 backdrop-blur-[1px]" />
        </div>
        
        <div className="container relative z-10 text-center">
          <span className="text-[#c69c6d] font-bold tracking-[0.25em] uppercase text-xs mb-3 block">
            PORTFOLIO
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4 tracking-tight">
            Our Projects
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto font-light text-base md:text-lg">
            Thoughtfully planned developments for modern living.
          </p>
        </div>
      </section>

      {/* Projects Filter & Grid */}
      <section className="py-16 md:py-24">
        <div className="container max-w-[1536px] mx-auto px-6 lg:px-12">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {[
              { label: "All", value: "ALL", href: "/projects" },
              { label: "Ongoing", value: "ONGOING", href: "/projects?filter=ongoing" },
              { label: "Upcoming", value: "UPCOMING", href: "/projects?filter=upcoming" },
              { label: "Completed", value: "COMPLETED", href: "/projects?filter=completed" },
            ].map((tab) => {
              const active = currentFilter === tab.value;
              return (
                <Link
                  key={tab.value}
                  href={tab.href}
                  className={`px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? "bg-[#c69c6d] text-slate-950 shadow-md border border-[#c69c6d]"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900 shadow-2xs"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          {/* Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={i} {...project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 p-8 max-w-xl mx-auto">
              <h3 className="text-2xl font-serif text-slate-800 mb-2">No projects found</h3>
              <p className="text-slate-500 text-sm">We don't have any developments matching that filter right now.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
