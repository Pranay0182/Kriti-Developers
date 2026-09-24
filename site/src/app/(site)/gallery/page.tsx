import pool from "@/lib/db";
import { GalleryInteractive } from "./GalleryInteractive";

export const revalidate = 60;

export const metadata = {
  title: "Media Gallery | Kriti Developers",
  description: "Explore our projects, luxury interiors, lifestyle amenities, and live construction updates through captivating images.",
};

export default async function GalleryPage() {
  let items: any[] = [];
  try {
    const res = await pool.query('SELECT * FROM "galleryItem" ORDER BY "createdAt" DESC');
    items = res.rows;
  } catch (err) {
    console.error("Gallery DB query error:", err);
  }

  // Fallback if DB empty
  if (items.length === 0) {
    items = [
      { id: "g1", title: "Kriti Heights Façade", category: "PROJECTS", url: "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif" },
      { id: "g2", title: "Living Room Architecture", category: "INTERIORS", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" },
      { id: "g3", title: "Swimming Pool & Deck", category: "AMENITIES", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop" },
      { id: "g4", title: "Foundation & Framing Site", category: "CONSTRUCTION", url: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop" },
      { id: "g5", title: "Master Bedroom Suite", category: "INTERIORS", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" },
      { id: "g6", title: "Kriti Greens Aerial View", category: "PROJECTS", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop" },
      { id: "g7", title: "State-of-the-Art Fitness Center", category: "AMENITIES", url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop" },
      { id: "g8", title: "Reinforcement & Pillar Casting", category: "CONSTRUCTION", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop" },
      { id: "g9", title: "Kids Play Ground & Park", category: "AMENITIES", url: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1200&auto=format&fit=crop" },
    ];
  }

  return <GalleryInteractive initialItems={items} />;
}
