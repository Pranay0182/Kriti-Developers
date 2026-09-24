import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // A simple query to wake up and keep the database active
    const result = await query("SELECT 1 as keep_alive;");
    
    return NextResponse.json({ 
      status: "Database is awake", 
      data: result.rows[0],
      timestamp: new Date().toISOString() 
    });
  } catch (error: any) {
    console.error("Keep-alive error:", error);
    return NextResponse.json(
      { error: "Failed to connect to database", details: error.message }, 
      { status: 500 }
    );
  }
}
