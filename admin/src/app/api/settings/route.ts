import { NextResponse } from "next/server";
import { Pool } from "pg";

export const dynamic = "force-dynamic";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Default settings
const DEFAULT_SETTINGS = {
  hero: {
    title: "Creating\nSpaces.\nShaping\nLifestyles.",
    subtitle: "Thoughtfully designed homes for a better tomorrow.",
    heroImage: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif",
    exploreBtnText: "Explore Projects",
    contactBtnText: "Contact Us",
  },
  featured: {
    tag: "Featured Project",
    title: "KRITI HEIGHTS",
    subtitle: "Premium Residences in Morabadi, Ranchi",
    description: "A thoughtfully planned residential development. Designed for modern living with panoramic views and world-class leisure.",
    image: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196617030-whatsapp-image-2026-09-22-at-5.09.49-pm.avif",
    slug: "kriti-heights",
  },
  findYourNext: {
    title: "Find Your Next Address\nwith Kriti Developers.",
    image: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196626089-whatsapp-image-2026-09-22-at-5.10.48-pm.avif",
    ctaText: "Enquire Now",
  },
  milestones: {
    yearsExperience: "40+",
    ranchiExperience: "20+",
    projectsDelivered: "50+",
    qualityConstruction: "100%",
    happyFamilies: "50+",
    sqftDeveloped: "Duplex, Simplex & Apartments",
  },
  contact: {
    officeAddress: "Kriti Developers, Ground Floor, Hotel Ganga Ashram, Kutchery Chowk Ranchi",
    phone: "+91 95708 22345",
    email: "kritidevelopersrnc@gmail.com",
    workingHoursMonSat: "Mon - Sat: 9:00 AM - 7:00 PM",
    workingHoursSun: "Sun: 10:00 AM - 4:00 PM",
  },
};

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "site_setting" (
      "key" TEXT PRIMARY KEY,
      "value" JSONB NOT NULL,
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
}

export async function GET() {
  try {
    await ensureTable();
    const res = await pool.query('SELECT "key", "value" FROM "site_setting"');
    
    const settings: Record<string, any> = { ...DEFAULT_SETTINGS };
    for (const row of res.rows) {
      settings[row.key] = { ...(DEFAULT_SETTINGS as any)[row.key], ...row.value };
    }

    return NextResponse.json({ ok: true, settings });
  } catch (err: any) {
    console.error("Error fetching site settings:", err);
    return NextResponse.json({ ok: true, settings: DEFAULT_SETTINGS });
  }
}

export async function POST(req: Request) {
  try {
    await ensureTable();
    const body = await req.json();

    const keys = ["hero", "featured", "findYourNext", "milestones", "contact"];
    for (const key of keys) {
      if (body[key]) {
        await pool.query(
          `INSERT INTO "site_setting" ("key", "value", "updatedAt")
           VALUES ($1, $2, NOW())
           ON CONFLICT ("key") DO UPDATE SET "value" = $2, "updatedAt" = NOW()`,
          [key, JSON.stringify(body[key])]
        );
      }
    }

    return NextResponse.json({ ok: true, message: "Settings saved successfully" });
  } catch (err: any) {
    console.error("Error saving site settings:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
