import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      project = "General Enquiry",
      location = "Ranchi",
      budget = "",
      message = "",
      source = "WEBSITE_ENQUIRY",
    } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone number are required" }, { status: 400 });
    }

    const res = await pool.query(
      `INSERT INTO "enquiry" (id, name, phone, email, "projectId", location, budget, message, source, status, "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, 'NEW', NOW())
       RETURNING *`,
      [name, phone, email || "", project, location, budget, message, source]
    );

    return NextResponse.json({ success: true, enquiry: res.rows[0] });
  } catch (err: any) {
    console.error("Enquiry submission error:", err);
    return NextResponse.json({ error: err.message || "Failed to submit enquiry" }, { status: 500 });
  }
}
