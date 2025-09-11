import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@goatalliance.com' },
    update: {},
    create: {
      email: 'admin@goatalliance.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  // Create test contractor
  const contractorUser = await prisma.user.upsert({
    where: { email: 'contractor@example.com' },
    update: {},
    create: {
      email: 'contractor@example.com',
      name: 'John Contractor',
      role: 'CONTRACTOR',
    },
  })

  // Create contractor profile
  await prisma.contractor.upsert({
    where: { userId: contractorUser.id },
    update: {},
    create: {
      userId: contractorUser.id,
      businessName: 'John\'s Web Solutions',
      description: 'Professional web development services with 10+ years experience.',
      website: 'https://johnwebsolutions.com',
      phone: '(555) 123-4567',
      city: 'New York',
      state: 'NY',
      country: 'US',
      status: 'APPROVED',
      isPremium: true,
      rating: 4.8,
      reviewCount: 42,
      skills: ['React', 'Node.js', 'TypeScript', 'Next.js'],
      experience: 10,
      certifications: ['AWS Certified', 'React Certified Developer'],
    },
  })

  // Create categories
  const webDevCategory = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Professional web development services',
      icon: '💻',
    },
  })

  const designCategory = await prisma.category.upsert({
    where: { slug: 'design' },
    update: {},
    create: {
      name: 'Design',
      slug: 'design',
      description: 'UI/UX and graphic design services',
      icon: '🎨',
    },
  })

  // Create sample blog posts
  await prisma.blogPost.upsert({
    where: { slug: 'welcome-to-goat-alliance' },
    update: {},
    create: {
      title: 'Welcome to G.O.A.T. Alliance',
      slug: 'welcome-to-goat-alliance',
      excerpt: 'Connecting clients with the greatest of all time professionals.',
      content: '# Welcome to G.O.A.T. Alliance\n\nWe are excited to launch our platform connecting clients with vetted professionals.',
      published: true,
      featured: true,
      authorId: adminUser.id,
      publishedAt: new Date(),
      metaTitle: 'Welcome to G.O.A.T. Alliance',
      metaDescription: 'Professional directory platform for vetted contractors and freelancers.',
    },
  })

  console.log('Seed data created successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })