import { NextRequest, NextResponse } from "next/server";
import { ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_COOKIE_NAME, createSessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail !== ADMIN_EMAIL.toLowerCase() || cleanPassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials. Please verify your admin ID and password." }, { status: 401 });
    }

    const token = await createSessionToken(cleanEmail);

    const response = NextResponse.json({
      success: true,
      user: {
        email: ADMIN_EMAIL,
        name: "Kriti Developers Admin",
        role: "Super Administrator",
      },
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json({ error: err.message || "Authentication failed" }, { status: 500 });
  }
}
