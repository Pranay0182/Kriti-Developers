import { AdminHeader } from "@/components/AdminHeader";
import { ProjectForm } from "@/components/ProjectForm";
import pool from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let project = null;
  try {
    const projRes = await pool.query('SELECT * FROM "project" WHERE id = $1', [id]);
    if (projRes.rows.length === 0) {
      notFound();
    }
    project = projRes.rows[0];

    const [amenities, landmarks, floorPlans, specs] = await Promise.all([
      pool.query('SELECT * FROM "amenity" WHERE "projectId" = $1', [id]),
      pool.query('SELECT * FROM "landmark" WHERE "projectId" = $1', [id]),
      pool.query('SELECT * FROM "floorPlan" WHERE "projectId" = $1', [id]),
      pool.query('SELECT * FROM "specification" WHERE "projectId" = $1', [id]),
    ]);

    project.amenities = amenities.rows;
    project.landmarks = landmarks.rows;
    project.floorPlans = floorPlans.rows;
    project.specifications = specs.rows;
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <AdminHeader
        title={`Edit: ${project.title}`}
        description="Update property details, pricing, floor plans, and amenities."
      />
      <div className="p-8 max-w-5xl mx-auto">
        <ProjectForm initialData={project} isEditing={true} />
      </div>
    </div>
  );
}
