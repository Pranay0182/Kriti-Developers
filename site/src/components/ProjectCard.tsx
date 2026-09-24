import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

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

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative h-72 overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-4 right-4 text-[10px] font-extrabold uppercase px-3 py-1 rounded shadow ${
          isCompleted ? "bg-slate-900 text-white" : "bg-[#c69c6d] text-slate-950"
        }`}>
          {status}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-[#c69c6d] transition mb-1">
            {title}
          </h3>
          <p className="text-xs font-semibold text-slate-500 mb-2">{configuration}</p>
          <div className="flex items-center text-slate-400 text-xs mb-6">
            <MapPin className="h-3.5 w-3.5 mr-1 text-[#c69c6d] shrink-0" />
            <span>{location}</span>
          </div>
        </div>
        <Link
          href={`/projects/${slug}`}
          prefetch={true}
          className="w-full border border-[#c69c6d] text-[#c69c6d] hover:bg-[#c69c6d] hover:text-slate-950 font-bold uppercase tracking-wider text-xs py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs"
        >
          View Project →
        </Link>
      </div>
    </div>
  );
}
