import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM "project" ORDER BY "createdAt" DESC');
    return NextResponse.json(res.rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      subtitle,
      description,
      status = "ONGOING",
      type = "Residential",
      location,
      configuration,
      possession,
      heroImage,
      brochureUrl,
      videoUrl,
      isFeatured = false,
      amenities = [],
      landmarks = [],
      floorPlans = [],
      specifications = [],
    } = body;

    const projectId = `proj-${Date.now()}`;

    await pool.query(
      `INSERT INTO "project" (id, title, slug, subtitle, description, status, type, location, configuration, possession, "heroImage", "brochureUrl", "videoUrl", "isFeatured", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())`,
      [projectId, title, slug, subtitle, description, status, type, location, configuration, possession, heroImage, brochureUrl, videoUrl, isFeatured]
    );

    // Insert amenities
    for (const am of amenities) {
      if (typeof am === "string" && am.trim()) {
        await pool.query('INSERT INTO "amenity" (id, name, "projectId") VALUES (gen_random_uuid(), $1, $2)', [am.trim(), projectId]);
      }
    }

    // Insert landmarks
    for (const lm of landmarks) {
      if (lm.name) {
        await pool.query('INSERT INTO "landmark" (id, name, distance, "projectId") VALUES (gen_random_uuid(), $1, $2, $3)', [lm.name, lm.distance || "", projectId]);
      }
    }

    // Insert floor plans
    for (const fp of floorPlans) {
      if (fp.name) {
        await pool.query('INSERT INTO "floorPlan" (id, name, "planType", size, url, "projectId") VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)', [fp.name, fp.planType || "2 BHK", fp.size || "", fp.url || "", projectId]);
      }
    }

    // Insert specs
    for (const sp of specifications) {
      if (sp.category && sp.details) {
        await pool.query('INSERT INTO "specification" (id, category, details, "projectId") VALUES (gen_random_uuid(), $1, $2, $3)', [sp.category, sp.details, projectId]);
      }
    }

    return NextResponse.json({ success: true, id: projectId, slug });
  } catch (err: any) {
    console.error("Create project error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
