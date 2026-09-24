import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const projRes = await pool.query('SELECT * FROM "project" WHERE id = $1', [id]);
    if (projRes.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const project = projRes.rows[0];

    const [amenities, landmarks, floorPlans, specs, images] = await Promise.all([
      pool.query('SELECT * FROM "amenity" WHERE "projectId" = $1', [id]),
      pool.query('SELECT * FROM "landmark" WHERE "projectId" = $1', [id]),
      pool.query('SELECT * FROM "floorPlan" WHERE "projectId" = $1', [id]),
      pool.query('SELECT * FROM "specification" WHERE "projectId" = $1', [id]),
      pool.query('SELECT * FROM "projectImage" WHERE "projectId" = $1', [id]),
    ]);

    return NextResponse.json({
      ...project,
      amenities: amenities.rows,
      landmarks: landmarks.rows,
      floorPlans: floorPlans.rows,
      specifications: specs.rows,
      images: images.rows,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const {
      title,
      slug,
      subtitle,
      description,
      status,
      type,
      location,
      configuration,
      possession,
      heroImage,
      brochureUrl,
      videoUrl,
      isFeatured,
      amenities = [],
      landmarks = [],
      floorPlans = [],
      specifications = [],
    } = body;

    await pool.query(
      `UPDATE "project"
       SET title = $1, slug = $2, subtitle = $3, description = $4, status = $5, type = $6,
           location = $7, configuration = $8, possession = $9, "heroImage" = $10,
           "brochureUrl" = $11, "videoUrl" = $12, "isFeatured" = $13, "updatedAt" = NOW()
       WHERE id = $14`,
      [title, slug, subtitle, description, status, type, location, configuration, possession, heroImage, brochureUrl, videoUrl, isFeatured, id]
    );

    // Replace child relations
    await pool.query('DELETE FROM "amenity" WHERE "projectId" = $1', [id]);
    for (const am of amenities) {
      const name = typeof am === "string" ? am : am.name;
      if (name && name.trim()) {
        await pool.query('INSERT INTO "amenity" (id, name, "projectId") VALUES (gen_random_uuid(), $1, $2)', [name.trim(), id]);
      }
    }

    await pool.query('DELETE FROM "landmark" WHERE "projectId" = $1', [id]);
    for (const lm of landmarks) {
      if (lm.name) {
        await pool.query('INSERT INTO "landmark" (id, name, distance, "projectId") VALUES (gen_random_uuid(), $1, $2, $3)', [lm.name, lm.distance || "", id]);
      }
    }

    await pool.query('DELETE FROM "floorPlan" WHERE "projectId" = $1', [id]);
    for (const fp of floorPlans) {
      if (fp.name) {
        await pool.query('INSERT INTO "floorPlan" (id, name, "planType", size, url, "projectId") VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)', [fp.name, fp.planType || "2 BHK", fp.size || "", fp.url || "", id]);
      }
    }

    await pool.query('DELETE FROM "specification" WHERE "projectId" = $1', [id]);
    for (const sp of specifications) {
      if (sp.category && sp.details) {
        await pool.query('INSERT INTO "specification" (id, category, details, "projectId") VALUES (gen_random_uuid(), $1, $2, $3)', [sp.category, sp.details, id]);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Update project error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await pool.query('DELETE FROM "project" WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
