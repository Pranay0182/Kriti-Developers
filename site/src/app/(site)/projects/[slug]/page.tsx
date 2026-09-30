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
    return [];
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

  if (!project) {
    notFound();
  }

  return <ProjectDetailInteractive project={project} />;
}
