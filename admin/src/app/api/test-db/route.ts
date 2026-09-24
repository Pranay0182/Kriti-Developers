import { NextResponse } from "next/server";
import { Pool } from "pg";

export const dynamic = "force-dynamic";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function GET() {
  try {
    const res = await pool.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename");
    return NextResponse.json({
      ok: true,
      tables: res.rows.map(r => r.tablename)
    });
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      error: err?.message || String(err)
    }, { status: 500 });
  }
}
