import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Building2, Download, Play, CheckCircle2, Waves, Dumbbell, ShieldCheck, Trees, Home, Sparkles, Navigation } from "lucide-react";
import pool from "@/lib/db";
import { ProjectDetailInteractive } from "./ProjectDetailInteractive";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  try {
    const res = await pool.query('SELECT slug FROM "project"');
    return res.rows.map((p) => ({ slug: p.slug }));
  } catch {
    return [
      { slug: "kriti-heights" },
      { slug: "kriti-greens" },
      { slug: "kriti-urban" },
      { slug: "kriti-enclave" },
      { slug: "kriti-residency" },
      { slug: "kriti-gardens" },
    ];
  }
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let project: any = null;

  try {
    const decodedSlug = decodeURIComponent(slug);
    const hyphenSlug = decodedSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const projRes = await pool.query(
      `SELECT * FROM "project" 
       WHERE slug = $1 
          OR slug = $2 
          OR LOWER(slug) = LOWER($2) 
          OR LOWER(REPLACE(slug, ' ', '-')) = $3
          OR LOWER(title) = LOWER($2)
       LIMIT 1`,
      [slug, decodedSlug, hyphenSlug]
    );
    if (projRes.rows.length > 0) {
      project = projRes.rows[0];

      const [amenities, landmarks, floorPlans, specs, images] = await Promise.all([
        pool.query('SELECT * FROM "amenity" WHERE "projectId" = $1', [project.id]),
        pool.query('SELECT * FROM "landmark" WHERE "projectId" = $1', [project.id]),
        pool.query('SELECT * FROM "floorPlan" WHERE "projectId" = $1', [project.id]),
        pool.query('SELECT * FROM "specification" WHERE "projectId" = $1', [project.id]),
        pool.query('SELECT * FROM "projectImage" WHERE "projectId" = $1', [project.id]),
      ]);

      project.amenities = amenities.rows.map(a => a.name);
      project.landmarks = landmarks.rows;
      project.floorPlans = floorPlans.rows;
      project.specifications = specs.rows;
      project.images = images.rows.map(i => i.url);
    }
  } catch (err) {
    console.error("DB fetch error in project detail:", err);
  }

  // Fallback if not found or DB empty
  if (!project) {
    if (slug === "kriti-heights" || slug === "kriti-greens" || slug === "kriti-urban") {
      project = {
        title: slug === "kriti-heights" ? "Kriti Heights" : slug === "kriti-greens" ? "Kriti Greens" : "Kriti Urban",
        slug,
        subtitle: slug === "kriti-heights" ? "Premium Residences in Morabadi, Ranchi" : slug === "kriti-greens" ? "Eco-Luxury Homes in Bariatu, Ranchi" : "Smart Living on Kanke Road, Ranchi",
        status: "ONGOING",
        type: "Residential",
        location: slug === "kriti-heights" ? "Morabadi, Ranchi" : slug === "kriti-greens" ? "Bariatu, Ranchi" : "Kanke Road, Ranchi",
        configuration: "2 & 3 BHK",
        possession: "2027",
        description: "Kriti Heights is a premium residential development designed for modern living in Ranchi. With thoughtfully planned spaces, world-class amenities, and excellent connectivity to Morabadi Ground and Tagore Hill, it offers the perfect blend of comfort and convenience.",
        heroImage: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif",
        brochureUrl: "#",
        videoUrl: "#",
        amenities: ["Swimming Pool", "Clubhouse", "Landscaped Gardens", "24/7 Security", "Gymnasium", "Kids Play Area"],
        landmarks: [
          { name: "Birsa Munda Airport (IXR)", distance: "8 km" },
          { name: "Ranchi Railway Station", distance: "5 km" },
          { name: "RIMS Hospital, Bariatu", distance: "3 km" },
          { name: "Morabadi Ground & Stadium", distance: "1.5 km" },
          { name: "Tagore Hill", distance: "2.5 km" },
        ],
        floorPlans: [
          { name: "2 BHK - Floor Plan", planType: "2 BHK", size: "1200 Sq. Ft.", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" },
          { name: "3 BHK - Floor Plan", planType: "3 BHK", size: "1650 Sq. Ft.", url: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop" },
        ],
        specifications: [
          { category: "Structure", details: "RCC framed earthquake resistant structure with high-grade solid block masonry." },
          { category: "Flooring", details: "Premium vitrified tiles in living, dining, and bedrooms; anti-skid ceramic tiles in bathrooms and balconies." },
          { category: "Kitchen", details: "Polished granite platform with stainless steel sink and 2 ft dado ceramic tiles above counter." },
          { category: "Doors & Windows", details: "Teak wood main door with digital smart lock; UPVC sliding windows with bug mesh." },
          { category: "Electrical", details: "Concealed copper wiring with modular switches (Schneider/Legrand) and MCB protection." },
        ],
        images: [
          "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif",
          "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif",
          "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196626089-whatsapp-image-2026-09-22-at-5.10.48-pm.avif",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
        ]
      };
    } else {
      notFound();
    }
  }

  return <ProjectDetailInteractive project={project} />;
}
