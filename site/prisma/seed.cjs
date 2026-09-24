const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Check if projects already exist
  const existingProjects = await prisma.project.count()
  if (existingProjects > 0) {
    console.log('Database already seeded. Skipping...')
    return
  }

  console.log('Seeding database with initial projects...')

  // Create Project 1: Kriti Heights (Ongoing)
  await prisma.project.create({
    data: {
      title: 'Kriti Heights',
      slug: 'kriti-heights',
      description: 'A thoughtfully planned residential development designed for modern living. Kriti Heights offers panoramic views of the city skyline, state-of-the-art amenities, and unparalleled luxury.',
      status: 'ONGOING',
      location: 'Patia, Bhubaneswar',
      configuration: '3 BHK & 4 BHK Premium Apartments',
      possession: 'December 2026',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop', altText: 'Kriti Heights Exterior' },
          { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop', altText: 'Kriti Heights Interior' }
        ]
      },
      amenities: {
        create: [
          { name: 'Swimming Pool' },
          { name: 'Gymnasium' },
          { name: 'Clubhouse' },
          { name: 'Landscaped Gardens' }
        ]
      }
    }
  })

  // Create Project 2: Kriti Elegance (Upcoming)
  await prisma.project.create({
    data: {
      title: 'Kriti Elegance',
      slug: 'kriti-elegance',
      description: 'Experience the pinnacle of sophisticated living at Kriti Elegance. Where every detail is crafted to perfection to offer you a life of unmatched comfort and style.',
      status: 'UPCOMING',
      location: 'Khandagiri, Bhubaneswar',
      configuration: '2 BHK & 3 BHK Luxury Apartments',
      possession: 'June 2027',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', altText: 'Kriti Elegance Rendering' }
        ]
      },
      amenities: {
        create: [
          { name: '24/7 Security' },
          { name: 'Children Play Area' },
          { name: 'Jogging Track' }
        ]
      }
    }
  })

  // Create Project 3: Kriti Residency (Completed)
  await prisma.project.create({
    data: {
      title: 'Kriti Residency',
      slug: 'kriti-residency',
      description: 'Our flagship completed project that redefined community living. A vibrant neighborhood filled with happy families and world-class facilities.',
      status: 'COMPLETED',
      location: 'Nayapalli, Bhubaneswar',
      configuration: '3 BHK Apartments',
      possession: 'Delivered 2024',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', altText: 'Kriti Residency Exterior' }
        ]
      }
    }
  })

  console.log('Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
