# G.O.A.T. Alliance

Network of Vetted Professionals - Connect with the Greatest Of All Time contractors and service providers.

## Project Structure

This is a full-stack application with:

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, deployed to Vercel
- **Backend**: Go service using Encore framework, deployed to Encore Cloud
- **E2E Testing**: Playwright for comprehensive end-to-end testing
- **CI/CD**: GitHub Actions with automated testing and deployment

## Features

### Landing Page
- Hero section with call-to-action buttons
- Featured contractor directory with ratings and contact information
- Responsive design for desktop, tablet, and mobile
- Accessibility compliance with proper ARIA labels and keyboard navigation

### Compliance Page
- Professional standards and verification process information
- Contact form for compliance inquiries

### Backend API
- Health check endpoint
- Contractor directory API
- Encore-based microservice architecture

## Development

### Prerequisites
- Node.js 18.x
- Go 1.21
- Yarn package manager

### Frontend Development
```bash
yarn install
yarn dev          # Start development server
yarn build        # Build for production
yarn test         # Run Jest tests
yarn lint         # Run ESLint
yarn type-check   # TypeScript checking
```

### Backend Development
```bash
cd backend
go test ./...     # Run Go tests
```

### E2E Testing
```bash
yarn playwright install --with-deps
yarn playwright test
# G.O.A.T. ALLIANCE

**NETWORK OF VETTED PROFESSIONALS**

A production-ready Next.js 15 + TypeScript SaaS platform connecting clients with vetted professionals through a comprehensive directory system, premium contractor features, and subscription-based services.

## Features

- 🚀 **Next.js 15** with TypeScript and App Router
- 🎨 **Modern UI** with Tailwind CSS and shadcn/ui components
- 🔐 **Authentication** with NextAuth.js
- 💾 **Database** with Prisma and PostgreSQL
- 💳 **Payments** with Stripe (subscriptions & one-time)
- 📱 **Responsive** design for all devices
- 🏢 **Professional Directory** with search and filtering
- 👑 **Premium Contractor** pages and features
- 📊 **Admin Dashboard** for management
- 📝 **Blog System** with Markdown CMS and SSR
- ⚡ **Performance** optimized with caching and SEO

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Set up the database:**
   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** with your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (marketing)/       # Landing page, blog
│   ├── admin/             # Admin dashboard
│   ├── directory/         # Professional listings
│   ├── contractor/        # Contractor premium pages
│   └── api/               # API routes
├── components/            # Reusable UI components
├── lib/                   # Utilities, database, auth config
├── prisma/               # Database schema and migrations
├── content/              # Blog markdown files
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Tech Stack

- **Framework:** Next.js 15 with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Prisma + PostgreSQL
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Content:** Markdown with gray-matter
- **Deployment:** Vercel (recommended)

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run stripe:listen # Listen for Stripe webhooks (dev)
```

## Deployment

### Frontend (Vercel)
Automatically deployed on push to main branch using Vercel GitHub integration.

Environment variables required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Backend (Encore)
Automatically deployed on push to main branch using Encore CLI.

Environment variables required:
- `ENCORE_TOKEN`

## CI/CD Pipeline

The GitHub Actions workflow includes:
1. Frontend testing (lint, type-check, unit tests, build)
2. Backend testing (Go tests with PostgreSQL)
3. E2E testing (Playwright across multiple browsers)
4. Deployment to production (Vercel + Encore)
5. Discord notification on successful deployment

## Testing Strategy

- **Unit Tests**: Jest with React Testing Library for component testing
- **Integration Tests**: Go testing framework for backend API testing
- **E2E Tests**: Playwright covering user flows, accessibility, and performance
- **Type Safety**: TypeScript with strict configuration

## Performance & Accessibility

- Optimized Next.js build with static generation
- Responsive design with Tailwind CSS
- WCAG compliance with semantic HTML and ARIA labels
- Performance monitoring with Core Web Vitals
- Mobile-first responsive design
This app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
