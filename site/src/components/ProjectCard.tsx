import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";

export type ProjectStatus = "ONGOING" | "UPCOMING" | "COMPLETED";

export interface ProjectCardProps {
  title: string;
  slug: string;
  location: string;
  configuration: string;
  status: ProjectStatus;
  imageUrl: string;
}

export function ProjectCard({
  title,
  slug,
  location,
  configuration,
  status,
  imageUrl,
}: ProjectCardProps) {
  const isCompleted = status === "COMPLETED";
  const isUpcoming = status === "UPCOMING";

  return (
    <div className="group flex flex-col bg-white rounded-3xl border border-slate-200/80 hover:border-[#c69c6d]/50 hover:shadow-[0_22px_45px_-12px_rgba(198,156,109,0.2)] transition-all duration-500 overflow-hidden">
      {/* Image Container with Zoom and Glass Badging */}
      <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900">
        <Image
          src={imageUrl}
          alt={title}
          fill
          loading="lazy"
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Subtle Vignette Gradient on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />

        {/* Floating Frosted Glass Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className={`backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase shadow-lg border flex items-center gap-1.5 ${
            isCompleted 
              ? "bg-slate-950/75 text-slate-200 border-white/20" 
              : isUpcoming 
                ? "bg-slate-950/75 text-amber-200 border-amber-400/40"
                : "bg-slate-950/80 text-[#dfba8e] border-[#c69c6d]/50"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-slate-400" : isUpcoming ? "bg-amber-400" : "bg-emerald-400 animate-pulse"}`} />
            <span>{status}</span>
          </div>
        </div>

        {/* Configuration Pill at Bottom-Left of Image */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="backdrop-blur-md bg-white/90 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-md border border-white/50">
            {configuration}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-7 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-[#c69c6d] transition-colors duration-300 mb-2.5">
            {title}
          </h3>

          <div className="flex items-center text-slate-500 text-xs font-medium mb-6">
            <MapPin className="h-3.5 w-3.5 mr-1.5 text-[#c69c6d] shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <Link
          href={`/projects/${slug}`}
          prefetch={true}
          className="group/btn w-full border border-[#c69c6d]/70 text-slate-900 hover:text-slate-950 hover:bg-gold-gradient font-bold uppercase tracking-[0.15em] text-xs py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-2xs hover:shadow-md hover:border-amber-300/40"
        >
          <span>Explore Residences</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
