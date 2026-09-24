import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let queryStr = 'SELECT * FROM "galleryItem"';
    const params: any[] = [];

    if (category && category !== "ALL") {
      queryStr += ' WHERE category = $1';
      params.push(category);
    }

    queryStr += ' ORDER BY "createdAt" DESC';

    const res = await pool.query(queryStr, params);
    return NextResponse.json(res.rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category = "PROJECTS", url } = body;

    if (!url) {
      return NextResponse.json({ error: "Missing image url" }, { status: 400 });
    }

    const res = await pool.query(
      `INSERT INTO "galleryItem" (id, title, category, url, "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, NOW()) RETURNING *`,
      [title || "Gallery Photo", category, url]
    );

    return NextResponse.json(res.rows[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await pool.query('DELETE FROM "galleryItem" WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
