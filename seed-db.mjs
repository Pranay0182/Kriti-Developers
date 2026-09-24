import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function seed() {
  console.log("Seeding Supabase DB with exact mockup properties and gallery items for Ranchi, Jharkhand...");

  // Clear existing records
  await pool.query('DELETE FROM "specification"');
  await pool.query('DELETE FROM "landmark"');
  await pool.query('DELETE FROM "floorPlan"');
  await pool.query('DELETE FROM "amenity"');
  await pool.query('DELETE FROM "projectImage"');
  await pool.query('DELETE FROM "galleryItem"');
  await pool.query('DELETE FROM "project"');

  // Insert Projects
  const projects = [
    {
      id: 'proj-heights',
      title: 'Kriti Heights',
      slug: 'kriti-heights',
      subtitle: 'Premium Residences in Morabadi, Ranchi',
      description: 'Kriti Heights is a premium residential development designed for modern living in Morabadi, Ranchi. With thoughtfully planned spaces, world-class amenities, and excellent connectivity to Morabadi Ground and Tagore Hill, it offers the perfect blend of comfort and convenience.',
      status: 'ONGOING',
      type: 'Residential',
      location: 'Morabadi, Ranchi',
      configuration: '2 & 3 BHK',
      possession: '2027',
      heroImage: 'https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif',
      brochureUrl: '#',
      videoUrl: 'https://www.youtube.com',
      isFeatured: true,
      amenities: ['Swimming Pool', 'Clubhouse', 'Landscaped Gardens', '24/7 Security', 'Gymnasium', 'Kids Play Area'],
      landmarks: [
        { name: 'Birsa Munda Airport (IXR)', distance: '8 km' },
        { name: 'Ranchi Railway Station', distance: '5 km' },
        { name: 'RIMS Hospital, Bariatu', distance: '3 km' },
        { name: 'Morabadi Ground & Stadium', distance: '1.5 km' },
        { name: 'Tagore Hill', distance: '2.5 km' },
      ],
      floorPlans: [
        { name: '2 BHK - Floor Plan', planType: '2 BHK', size: '1200 Sq. Ft.', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
        { name: '3 BHK - Floor Plan', planType: '3 BHK', size: '1650 Sq. Ft.', url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop' },
      ],
      images: [
        'https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
      ],
      specs: [
        { category: 'Structure', details: 'RCC framed earthquake resistant structure with high-grade solid block masonry.' },
        { category: 'Flooring', details: 'Premium vitrified tiles in living, dining, and bedrooms; anti-skid ceramic tiles in bathrooms and balconies.' },
        { category: 'Kitchen', details: 'Polished granite platform with stainless steel sink and 2 ft dado ceramic tiles above counter.' },
        { category: 'Doors & Windows', details: 'Teak wood main door with digital smart lock; UPVC sliding windows with bug mesh.' },
        { category: 'Electrical', details: 'Concealed copper wiring with modular switches (Schneider/Legrand) and MCB protection.' },
      ]
    },
    {
      id: 'proj-greens',
      title: 'Kriti Greens',
      slug: 'kriti-greens',
      subtitle: 'Eco-Luxury Homes in Bariatu, Ranchi',
      description: 'Experience pure tranquility at Kriti Greens in Bariatu, Ranchi. Nestled amidst expansive greenery and fresh air, these luxury homes bring refreshing open spaces, solar energy efficiency, and refined interiors.',
      status: 'ONGOING',
      type: 'Residential',
      location: 'Bariatu, Ranchi',
      configuration: '3 BHK Luxury Homes',
      possession: '2026',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
      brochureUrl: '#',
      videoUrl: 'https://www.youtube.com',
      isFeatured: false,
      amenities: ['Solar Power Integration', 'Jogging Track', 'Organic Garden', 'Infinity Pool', 'Yoga Pavilion', '24/7 CCTV'],
      landmarks: [
        { name: 'RIMS Hospital, Bariatu', distance: '1.5 km' },
        { name: 'Tagore Hill', distance: '2 km' },
        { name: 'Birsa Munda Airport', distance: '9 km' },
        { name: 'Ranchi Railway Station', distance: '6 km' },
      ],
      floorPlans: [
        { name: '3 BHK Premium Plan', planType: '3 BHK', size: '1850 Sq. Ft.', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
      ],
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
      ],
      specs: [
        { category: 'Structure', details: 'Seismic Zone III compliant RCC framed design.' },
        { category: 'Power Backup', details: '100% DG backup for common areas and 1.5 kW for each residence.' },
      ]
    },
    {
      id: 'proj-urban',
      title: 'Kriti Urban',
      slug: 'kriti-urban',
      subtitle: 'Smart Living on Kanke Road, Ranchi',
      description: 'Kriti Urban represents the pinnacle of metropolitan design with automated home systems, high-speed elevator access, and bespoke architecture on prestigious Kanke Road, Ranchi.',
      status: 'UPCOMING',
      type: 'Residential',
      location: 'Kanke Road, Ranchi',
      configuration: 'Premium Residences',
      possession: '2028',
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
      brochureUrl: '#',
      videoUrl: '',
      isFeatured: false,
      amenities: ['Smart Home Automation', 'Rooftop Lounge', 'Electric Car Charging', 'Co-working Pods', 'Gymnasium'],
      landmarks: [
        { name: 'Kanke Dam & Promenade', distance: '1.5 km' },
        { name: 'Rock Garden', distance: '2.5 km' },
        { name: 'Ranchi Ring Road', distance: '4 km' },
      ],
      floorPlans: [
        { name: 'Urban Elite Suite', planType: '3 BHK', size: '1500 Sq. Ft.', url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop' },
      ],
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop',
      ],
      specs: [
        { category: 'Smart Tech', details: 'App-controlled lighting, climate control, and digital door access.' },
      ]
    },
    {
      id: 'proj-enclave',
      title: 'Kriti Enclave',
      slug: 'kriti-enclave',
      subtitle: 'Private Gated Villa Estates in Lalpur, Ranchi',
      description: 'Exclusive gated residential enclave in Lalpur, Ranchi offering private individual villas with generous lawns, double-height living spaces, and resort-inspired amenities.',
      status: 'UPCOMING',
      type: 'Residential Plots & Villas',
      location: 'Lalpur, Ranchi',
      configuration: 'Residential Plots & Villas',
      possession: '2028',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
      brochureUrl: '#',
      videoUrl: '',
      isFeatured: false,
      amenities: ['Private Clubhouse', 'Tennis Court', 'Wide Boulevard Roads', 'Underground Cabling', '24/7 Security'],
      landmarks: [
        { name: 'Nucleus Mall, Circular Road', distance: '1.2 km' },
        { name: 'Ranchi Railway Station', distance: '3.5 km' },
      ],
      floorPlans: [],
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
      ],
      specs: []
    },
    {
      id: 'proj-residency',
      title: 'Kriti Residency',
      slug: 'kriti-residency',
      subtitle: 'Delivered in Harmu Housing Colony, Ranchi',
      description: 'Delivered in 2024, Kriti Residency stands tall in Harmu, Ranchi as an iconic community known for its enduring construction quality and vibrant family neighborhood.',
      status: 'COMPLETED',
      type: 'Residential',
      location: 'Harmu, Ranchi',
      configuration: '2 & 3 BHK Apartments',
      possession: '2024',
      heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop',
      brochureUrl: '#',
      videoUrl: '',
      isFeatured: false,
      amenities: ['Grand Lobby', 'Rooftop Garden', 'Intercom Facility', 'Children Play Zone'],
      landmarks: [
        { name: 'Harmu Housing Colony Park', distance: '500 m' },
        { name: 'Ranchi Railway Station', distance: '4 km' },
      ],
      floorPlans: [],
      images: [
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
      ],
      specs: []
    },
    {
      id: 'proj-gardens',
      title: 'Kriti Gardens',
      slug: 'kriti-gardens',
      subtitle: 'Bespoke Luxury Villas Delivered in Namkum, Ranchi',
      description: 'A distinguished community of independent luxury villas delivered to discerning homeowners in Namkum, Ranchi in 2021.',
      status: 'COMPLETED',
      type: 'Luxury Villas',
      location: 'Namkum, Ranchi',
      configuration: 'Luxury Villas',
      possession: '2021',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
      brochureUrl: '#',
      videoUrl: '',
      isFeatured: false,
      amenities: ['Clubhouse', 'Perimeter Security', 'Lush Parks', 'Wide Paved Streets'],
      landmarks: [
        { name: 'Tata-Ranchi Highway', distance: '1 km' },
        { name: 'Birsa Munda Airport', distance: '6 km' },
      ],
      floorPlans: [],
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
      ],
      specs: []
    }
  ];

  for (const p of projects) {
    await pool.query(
      `INSERT INTO "project" (id, title, slug, subtitle, description, status, type, location, configuration, possession, "heroImage", "brochureUrl", "videoUrl", "isFeatured", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())`,
      [p.id, p.title, p.slug, p.subtitle, p.description, p.status, p.type, p.location, p.configuration, p.possession, p.heroImage, p.brochureUrl, p.videoUrl, p.isFeatured]
    );

    for (const am of p.amenities) {
      await pool.query(
        `INSERT INTO "amenity" (id, name, "projectId") VALUES (gen_random_uuid(), $1, $2)`,
        [am, p.id]
      );
    }

    for (const lm of p.landmarks) {
      await pool.query(
        `INSERT INTO "landmark" (id, name, distance, "projectId") VALUES (gen_random_uuid(), $1, $2, $3)`,
        [lm.name, lm.distance, p.id]
      );
    }

    for (const fp of p.floorPlans) {
      await pool.query(
        `INSERT INTO "floorPlan" (id, name, "planType", size, url, "projectId") VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)`,
        [fp.name, fp.planType, fp.size, fp.url, p.id]
      );
    }

    for (const img of p.images) {
      await pool.query(
        `INSERT INTO "projectImage" (id, url, "projectId") VALUES (gen_random_uuid(), $1, $2)`,
        [img, p.id]
      );
    }

    for (const spec of p.specs) {
      await pool.query(
        `INSERT INTO "specification" (id, category, details, "projectId") VALUES (gen_random_uuid(), $1, $2, $3)`,
        [spec.category, spec.details, p.id]
      );
    }
  }

  // Insert Gallery Items (Projects, Interiors, Amenities, Construction)
  const galleryItems = [
    { title: 'Kriti Heights Façade', category: 'PROJECTS', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Living Room Architecture', category: 'INTERIORS', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Lush Landscaped Courtyard', category: 'AMENITIES', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Infinity Edge Swimming Pool', category: 'AMENITIES', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Structural Reinforced Framework', category: 'CONSTRUCTION', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Designer Kitchen Suite', category: 'INTERIORS', url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Kriti Greens Boulevard', category: 'PROJECTS', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Master Bedroom Suite', category: 'INTERIORS', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Kids Play Zone & Lawn', category: 'AMENITIES', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop' },
  ];

  for (const item of galleryItems) {
    await pool.query(
      `INSERT INTO "galleryItem" (id, title, category, url, "createdAt") VALUES (gen_random_uuid(), $1, $2, $3, NOW())`,
      [item.title, item.category, item.url]
    );
  }

  // Insert Sample Leads
  const sampleLeads = [
    { name: 'Amitabh Mishra', phone: '+91 94370 12345', email: 'amitabh.m@gmail.com', project: 'Kriti Heights', location: 'Morabadi, Ranchi', budget: '₹75L - ₹1 Cr', message: 'Looking for a 3 BHK facing east on a higher floor in Morabadi.', source: 'ENQUIRY_PAGE', status: 'NEW' },
    { name: 'Priyanka Das', phone: '+91 98611 67890', email: 'p.das@outlook.com', project: 'Kriti Greens', location: 'Bariatu, Ranchi', budget: '₹1 Cr - ₹1.5 Cr', message: 'Interested in visiting the sample flat this coming Saturday in Bariatu.', source: 'PROJECT_MODAL', status: 'CONTACTED' },
    { name: 'Rohit Agarwal', phone: '+91 94311 22334', email: 'rohit.a@yahoo.com', project: 'Kriti Urban', location: 'Kanke Road, Ranchi', budget: 'Above ₹1.5 Cr', message: 'Want pre-launch booking details for Kriti Urban on Kanke Road.', source: 'CONTACT_PAGE', status: 'IN_PROGRESS' },
  ];

  for (const lead of sampleLeads) {
    await pool.query(
      `INSERT INTO "enquiry" (id, name, phone, email, "projectId", location, budget, message, source, status, "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
      [lead.name, lead.phone, lead.email, lead.project, lead.location, lead.budget, lead.message, lead.source, lead.status]
    );
  }

  console.log("Seeding completed successfully for Ranchi, Jharkhand!");
  await pool.end();
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
